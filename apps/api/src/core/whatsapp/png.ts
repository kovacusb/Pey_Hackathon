// Convierte un PNG en escala de grises o con paleta (p. ej. el QR de pey: 1 bit, grises) a PNG RGB de 8 bits.
// WhatsApp rechaza imágenes que no sean RGB/RGBA de 8 bits por canal (error 131053 "Media upload error",
// visto el 2026-11-14 con el qrImage de pey). Sin dependencias: node:zlib para inflate/deflate y crc32.
import { crc32, deflateSync, inflateSync } from "node:zlib";

const FIRMA = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function paeth(a: number, b: number, c: number) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

function trozo(tipo: string, datos: Buffer): Buffer {
  const largo = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length);
  const tipoYDatos = Buffer.concat([Buffer.from(tipo, "latin1"), datos]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(tipoYDatos) >>> 0);
  return Buffer.concat([largo, tipoYDatos, crc]);
}

/** Devuelve el mismo PNG si ya es RGB/RGBA de 8 bits; si es gris o paleta, lo convierte y le agrega un margen blanco
 *  (zona de silencio del QR: sin ella, en WhatsApp con modo oscuro el QR queda pegado al fondo y cuesta escanearlo). */
export function aPngRgb(png: Buffer, margen = 48): Buffer {
  if (png.length < 8 || !png.subarray(0, 8).equals(FIRMA)) return png;
  let ancho = 0, alto = 0, bits = 0, tipoColor = 0, entrelazado = 0;
  let paleta: Buffer | null = null;
  const idat: Buffer[] = [];
  for (let i = 8; i + 8 <= png.length; ) {
    const largo = png.readUInt32BE(i);
    const tipo = png.toString("latin1", i + 4, i + 8);
    const datos = png.subarray(i + 8, i + 8 + largo);
    if (tipo === "IHDR") {
      ancho = datos.readUInt32BE(0);
      alto = datos.readUInt32BE(4);
      bits = datos[8];
      tipoColor = datos[9];
      entrelazado = datos[12];
    } else if (tipo === "PLTE") paleta = datos;
    else if (tipo === "IDAT") idat.push(datos);
    else if (tipo === "IEND") break;
    i += 12 + largo;
  }
  if ((tipoColor === 2 || tipoColor === 6) && bits === 8) return png; // ya es RGB/RGBA de 8 bits
  if (entrelazado !== 0 || !(tipoColor === 0 || tipoColor === 3) || ![1, 2, 4, 8].includes(bits)) return png; // no soportado: se manda tal cual

  const crudo = inflateSync(Buffer.concat(idat));
  const bpp = Math.max(1, bits / 8); // bytes por pixel para el filtrado (1 canal)
  const paso = Math.ceil((ancho * bits) / 8);
  const filas = Buffer.alloc(alto * paso);
  for (let y = 0; y < alto; y++) {
    const filtro = crudo[y * (paso + 1)];
    const ent = crudo.subarray(y * (paso + 1) + 1, (y + 1) * (paso + 1));
    const off = y * paso;
    for (let x = 0; x < paso; x++) {
      const a = x >= bpp ? filas[off + x - bpp] : 0;
      const b = y > 0 ? filas[off - paso + x] : 0;
      const c = x >= bpp && y > 0 ? filas[off - paso + x - bpp] : 0;
      const v = ent[x];
      filas[off + x] = (filtro === 0 ? v : filtro === 1 ? v + a : filtro === 2 ? v + b : filtro === 3 ? v + ((a + b) >> 1) : v + paeth(a, b, c)) & 0xff;
    }
  }

  const max = (1 << bits) - 1;
  const anchoF = ancho + 2 * margen, altoF = alto + 2 * margen;
  const fila = 1 + anchoF * 3;
  const salida = Buffer.alloc(altoF * fila, 0xff); // fondo blanco
  for (let y = 0; y < altoF; y++) salida[y * fila] = 0; // filtro "ninguno" en cada fila
  for (let y = 0; y < alto; y++) {
    const o = (y + margen) * fila + margen * 3;
    for (let x = 0; x < ancho; x++) {
      const bit = x * bits;
      const valor = (filas[y * paso + (bit >> 3)] >> (8 - bits - (bit & 7))) & max;
      let r: number, g: number, b: number;
      if (tipoColor === 3 && paleta) {
        r = paleta[valor * 3];
        g = paleta[valor * 3 + 1];
        b = paleta[valor * 3 + 2];
      } else {
        r = g = b = Math.round((valor * 255) / max);
      }
      salida[o + 1 + x * 3] = r;
      salida[o + 2 + x * 3] = g;
      salida[o + 3 + x * 3] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(anchoF, 0);
  ihdr.writeUInt32BE(altoF, 4);
  ihdr[8] = 8; // bits por canal
  ihdr[9] = 2; // RGB
  return Buffer.concat([FIRMA, trozo("IHDR", ihdr), trozo("IDAT", deflateSync(salida, { level: 9 })), trozo("IEND", Buffer.alloc(0))]);
}

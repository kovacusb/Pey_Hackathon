// WhatsApp rechaza PNG que no sean RGB/RGBA de 8 bits (error 131053). El QR de pey llega en grises de 1 bit.
import { test } from "node:test";
import assert from "node:assert/strict";
import { crc32, deflateSync, inflateSync } from "node:zlib";
import { aPngRgb } from "../src/core/whatsapp/png.ts";

const FIRMA = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
function trozo(tipo: string, datos: Buffer) {
  const l = Buffer.alloc(4);
  l.writeUInt32BE(datos.length);
  const td = Buffer.concat([Buffer.from(tipo), datos]);
  const c = Buffer.alloc(4);
  c.writeUInt32BE(crc32(td) >>> 0);
  return Buffer.concat([l, td, c]);
}

/** PNG gris de 1 bit, 8×2: fila 0 = 10101010, fila 1 = 01010101 (1 = blanco). */
function png1bit() {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(8, 0);
  ihdr.writeUInt32BE(2, 4);
  ihdr[8] = 1;
  ihdr[9] = 0;
  const crudo = Buffer.from([0, 0b10101010, 0, 0b01010101]);
  return Buffer.concat([FIRMA, trozo("IHDR", ihdr), trozo("IDAT", deflateSync(crudo)), trozo("IEND", Buffer.alloc(0))]);
}

function leer(png: Buffer) {
  let i = 8;
  const idat: Buffer[] = [];
  let ancho = 0, alto = 0, bits = 0, tipo = 0;
  while (i < png.length) {
    const largo = png.readUInt32BE(i);
    const t = png.toString("latin1", i + 4, i + 8);
    const d = png.subarray(i + 8, i + 8 + largo);
    if (t === "IHDR") [ancho, alto, bits, tipo] = [d.readUInt32BE(0), d.readUInt32BE(4), d[8], d[9]];
    if (t === "IDAT") idat.push(d);
    assert.equal(png.readUInt32BE(i + 8 + largo), crc32(png.subarray(i + 4, i + 8 + largo)) >>> 0, `CRC de ${t}`);
    i += 12 + largo;
  }
  return { ancho, alto, bits, tipo, crudo: inflateSync(Buffer.concat(idat)) };
}

test("convierte gris de 1 bit a RGB de 8 bits con margen blanco", () => {
  const r = leer(aPngRgb(png1bit(), 2));
  assert.deepEqual([r.ancho, r.alto, r.bits, r.tipo], [12, 6, 8, 2]);
  const fila = 1 + 12 * 3;
  const pixel = (x: number, y: number) => r.crudo[y * fila + 1 + x * 3];
  assert.equal(pixel(0, 0), 255); // margen blanco
  assert.equal(pixel(2, 2), 255); // primer pixel de la imagen: bit 1 → blanco
  assert.equal(pixel(3, 2), 0); // bit 0 → negro
  assert.equal(pixel(2, 3), 0); // fila 1 empieza en 0
  assert.equal(pixel(3, 3), 255);
});

test("un PNG que ya es RGB de 8 bits se deja igual; lo que no es PNG también", () => {
  const rgb = aPngRgb(png1bit());
  assert.equal(aPngRgb(rgb), rgb);
  const otro = Buffer.from("no soy png");
  assert.equal(aPngRgb(otro), otro);
});

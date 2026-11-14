// Generador mínimo de PDF de una página (solo texto, Helvetica), sin dependencias.
// Formato según la especificación PDF 1.4: objetos, flujo de contenido, tabla xref y trailer.

export interface Linea {
  texto: string;
  x: number;
  y: number; // desde abajo; carta = 612 × 792 pt
  tam?: number;
  negrita?: boolean;
  gris?: number; // 0 = negro, 1 = blanco
  rojo?: boolean;
  /** Ángulo en grados (marca de agua). */
  angulo?: number;
}

// WinAnsiEncoding: latin1 + algunos signos tipográficos comunes.
const EXTRA: Record<string, number> = { "•": 0x95, "—": 0x97, "–": 0x96, "“": 0x93, "”": 0x94, "‘": 0x91, "’": 0x92, "€": 0x80 };

function codificar(texto: string): string {
  let salida = "";
  for (const ch of texto) {
    const cod = EXTRA[ch] ?? ch.codePointAt(0)!;
    const c = cod <= 0xff ? cod : 0x3f; // fuera de WinAnsi → "?"
    const s = String.fromCharCode(c);
    salida += s === "\\" || s === "(" || s === ")" ? "\\" + s : s;
  }
  return salida;
}

function operaciones(l: Linea): string {
  const fuente = l.negrita ? "F2" : "F1";
  const color = l.rojo ? "0.75 0.1 0.1 rg" : `${l.gris ?? 0} g`;
  const rad = ((l.angulo ?? 0) * Math.PI) / 180;
  const [c, s] = [Math.cos(rad), Math.sin(rad)].map((n) => n.toFixed(4));
  return `BT /${fuente} ${l.tam ?? 10} Tf ${color} ${c} ${s} ${(-Number(s)).toFixed(4)} ${c} ${l.x} ${l.y} Tm (${codificar(l.texto)}) Tj ET`;
}

/** Líneas horizontales opcionales (x1, x2, y). */
export function crearPdf(lineas: Linea[], reglas: { x1: number; x2: number; y: number }[] = []): Buffer {
  const contenido = [
    ...reglas.map((r) => `0.8 G 0.5 w ${r.x1} ${r.y} m ${r.x2} ${r.y} l S`),
    ...lineas.map(operaciones),
  ].join("\n");
  const flujo = Buffer.from(contenido, "latin1");

  const objetos = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

  const partes: Buffer[] = [Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1")];
  const desplazamientos: number[] = [];
  let largo = partes[0].length;
  const agregar = (b: Buffer) => {
    partes.push(b);
    largo += b.length;
  };
  objetos.forEach((o, i) => {
    desplazamientos.push(largo);
    agregar(Buffer.from(`${i + 1} 0 obj\n${o}\nendobj\n`, "latin1"));
  });
  desplazamientos.push(largo);
  agregar(Buffer.concat([Buffer.from(`6 0 obj\n<< /Length ${flujo.length} >>\nstream\n`, "latin1"), flujo, Buffer.from("\nendstream\nendobj\n", "latin1")]));

  const inicioXref = largo;
  const xref = ["xref", `0 ${desplazamientos.length + 1}`, "0000000000 65535 f ", ...desplazamientos.map((d) => `${String(d).padStart(10, "0")} 00000 n `)].join("\n");
  agregar(Buffer.from(`${xref}\ntrailer\n<< /Size ${desplazamientos.length + 1} /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF\n`, "latin1"));
  return Buffer.concat(partes);
}

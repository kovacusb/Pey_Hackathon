// Facturación (CFDI 4.0) detrás de una interfaz:
//   - Facturama (sandbox o producción) si hay FACTURAMA_USUARIO y FACTURAMA_CLAVE.
//   - SIMULACIÓN en otro caso: PDF propio marcado "SIN VALIDEZ FISCAL" (AGENTS.md §3).
// Fuente Facturama: https://facturama.mx/docs/es/api-web/crear-cfdi (consultada el 2026-11-14): POST /3/cfdis.
import crypto from "node:crypto";
import { mxn } from "../dinero.ts";
import { crearPdf, type Linea } from "./pdf.ts";

export interface Receptor {
  rfc: string;
  nombre: string; // como aparece en la constancia de situación fiscal
  cp: string; // domicilio fiscal
  regimen: string; // c_RegimenFiscal
  uso: string; // c_UsoCFDI
}

export interface SolicitudFactura {
  folio: string;
  receptor: Receptor;
  concepto: string;
  totalCentavos: number; // IVA incluido
  rastreo: string | null;
}

export interface Factura {
  uuid: string;
  folio: string;
  pdf: Buffer;
  simulada: boolean;
  totalCentavos: number;
}

export interface Facturador {
  readonly nombre: string;
  emitir(s: SolicitudFactura): Promise<Factura>;
}

// --- Catálogos del SAT que ofrece el bot (subconjunto) ---
export const REGIMENES: { clave: string; titulo: string }[] = [
  { clave: "605", titulo: "Sueldos y salarios" },
  { clave: "612", titulo: "Act. empresarial y prof." },
  { clave: "626", titulo: "RESICO" },
  { clave: "616", titulo: "Sin obligaciones fiscales" },
  { clave: "606", titulo: "Arrendamiento" },
  { clave: "601", titulo: "General personas morales" },
  { clave: "603", titulo: "PM sin fines de lucro" },
];

export const USOS: { clave: string; titulo: string }[] = [
  { clave: "G03", titulo: "Gastos en general" },
  { clave: "D01", titulo: "Honorarios médicos" },
  { clave: "G01", titulo: "Adquisición de mercancías" },
  { clave: "S01", titulo: "Sin efectos fiscales" },
];

export const RFC_VALIDO = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;

/** Desglose con IVA 16 % a partir de un total con IVA incluido. */
export function desglose(totalCentavos: number) {
  const subtotal = Math.round(totalCentavos / 1.16);
  const iva = Math.round(subtotal * 0.16);
  return { subtotal, iva, total: subtotal + iva };
}

const titulo = (lista: { clave: string; titulo: string }[], clave: string) => `${clave} ${lista.find((x) => x.clave === clave)?.titulo ?? ""}`.trim();

// --- SIMULACIÓN ---
export const facturadorSimulado: Facturador = {
  nombre: "SIMULACIÓN",
  async emitir(s) {
    const { subtotal, iva, total } = desglose(s.totalCentavos);
    const uuid = crypto.randomUUID().toUpperCase();
    const fecha = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City", dateStyle: "long", timeStyle: "short" });
    const L: Linea[] = [];
    const t = (texto: string, x: number, y: number, extra: Partial<Linea> = {}) => L.push({ texto, x, y, ...extra });

    // Marca de agua
    t("SIMULACIÓN", 120, 330, { tam: 90, negrita: true, gris: 0.9, angulo: 35 });

    t("Factura electrónica (CFDI 4.0)", 50, 740, { tam: 18, negrita: true });
    t("SIMULACIÓN · SIN VALIDEZ FISCAL · no fue timbrada ante el SAT", 50, 720, { tam: 10, negrita: true, rojo: true });
    t(`Folio: PF-${s.folio}`, 400, 740, { tam: 10, negrita: true });
    t(`Fecha: ${fecha}`, 400, 726, { tam: 9 });
    t(`UUID (ficticio): ${uuid}`, 50, 700, { tam: 8, gris: 0.35 });

    t("EMISOR", 50, 670, { tam: 9, negrita: true, gris: 0.4 });
    t("Profesionista de demostración (datos ficticios)", 50, 656, { tam: 10 });
    t("RFC: XAXX010101000 · Régimen: 612", 50, 642, { tam: 9 });

    t("RECEPTOR", 320, 670, { tam: 9, negrita: true, gris: 0.4 });
    t(s.receptor.nombre.slice(0, 48), 320, 656, { tam: 10 });
    t(`RFC: ${s.receptor.rfc} · CP: ${s.receptor.cp}`, 320, 642, { tam: 9 });
    t(`Régimen: ${titulo(REGIMENES, s.receptor.regimen)}`, 320, 628, { tam: 9 });
    t(`Uso CFDI: ${titulo(USOS, s.receptor.uso)}`, 320, 614, { tam: 9 });

    t("Clave", 50, 580, { tam: 9, negrita: true });
    t("Descripción", 110, 580, { tam: 9, negrita: true });
    t("Cant.", 360, 580, { tam: 9, negrita: true });
    t("Valor unitario", 410, 580, { tam: 9, negrita: true });
    t("Importe", 510, 580, { tam: 9, negrita: true });
    t("01010101", 50, 562, { tam: 9 });
    t(s.concepto.slice(0, 45), 110, 562, { tam: 9 });
    t("1 E48", 360, 562, { tam: 9 });
    t(mxn(subtotal), 410, 562, { tam: 9 });
    t(mxn(subtotal), 510, 562, { tam: 9 });

    t("Subtotal", 410, 520, { tam: 10 });
    t(mxn(subtotal), 510, 520, { tam: 10 });
    t("IVA 16 %", 410, 504, { tam: 10 });
    t(mxn(iva), 510, 504, { tam: 10 });
    t("Total", 410, 484, { tam: 12, negrita: true });
    t(mxn(total), 510, 484, { tam: 12, negrita: true });

    t("Forma de pago: 03 Transferencia electrónica de fondos (CoDi)", 50, 520, { tam: 9 });
    t("Método de pago: PUE Pago en una sola exhibición", 50, 506, { tam: 9 });
    t("Moneda: MXN · Exportación: 01 No aplica", 50, 492, { tam: 9 });
    if (s.rastreo) t(`Clave de rastreo CoDi: ${s.rastreo}`, 50, 478, { tam: 9 });

    t("Documento de demostración generado por Paga Fácil (proyecto independiente; no es un producto de pey ni del SAT).", 50, 80, { tam: 8, gris: 0.4 });
    t("Para facturas reales se conecta un proveedor de timbrado (PAC) con FACTURAMA_USUARIO y FACTURAMA_CLAVE.", 50, 68, { tam: 8, gris: 0.4 });

    const pdf = crearPdf(L, [
      { x1: 50, x2: 562, y: 595 },
      { x1: 50, x2: 562, y: 550 },
      { x1: 400, x2: 562, y: 497 },
    ]);
    return { uuid, folio: `PF-${s.folio}`, pdf, simulada: true, totalCentavos: total };
  },
};

// --- Facturama ---
export function crearFacturama(o: { usuario: string; clave: string; base: string; lugarExpedicion: string; fetch?: typeof fetch }): Facturador {
  const hacerFetch = o.fetch ?? fetch;
  const auth = "Basic " + Buffer.from(`${o.usuario}:${o.clave}`).toString("base64");
  const pesos = (c: number) => Number((c / 100).toFixed(2));

  async function llamar(metodo: string, ruta: string, cuerpo?: object) {
    const r = await hacerFetch(o.base + ruta, {
      method: metodo,
      headers: { authorization: auth, accept: "application/json", ...(cuerpo ? { "content-type": "application/json" } : {}) },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
      signal: AbortSignal.timeout(30_000),
    });
    const texto = await r.text();
    const datos = texto ? JSON.parse(texto) : {};
    if (!r.ok) {
      // Facturama regresa los errores de validación del SAT en ModelState o Message (⚪ forma no documentada en la página consultada).
      const detalle = datos?.Message ?? Object.values(datos?.ModelState ?? {}).flat().join(" ") ?? "";
      throw new Error(`Facturama ${r.status}: ${String(detalle).slice(0, 200)}`);
    }
    return datos;
  }

  return {
    nombre: o.base.includes("sandbox") ? "Facturama (sandbox)" : "Facturama",
    async emitir(s) {
      const { subtotal, iva, total } = desglose(s.totalCentavos);
      const cfdi = await llamar("POST", "/3/cfdis", {
        NameId: "1",
        Currency: "MXN",
        Folio: s.folio, // con Date, identifica la operación (idempotencia según la página de Facturama)
        Serie: "PF",
        CfdiType: "I",
        PaymentForm: "03", // transferencia electrónica de fondos: CoDi liquida por SPEI
        PaymentMethod: "PUE",
        ExpeditionPlace: o.lugarExpedicion,
        Exportation: "01",
        Receiver: { Rfc: s.receptor.rfc, CfdiUse: s.receptor.uso, Name: s.receptor.nombre, FiscalRegime: s.receptor.regimen, TaxZipCode: s.receptor.cp },
        Items: [
          {
            ProductCode: "01010101",
            Description: s.concepto,
            Unit: "Servicio",
            UnitCode: "E48",
            UnitPrice: pesos(subtotal),
            Quantity: 1,
            Subtotal: pesos(subtotal),
            TaxObject: "02",
            Taxes: [{ Total: pesos(iva), Name: "IVA", Base: pesos(subtotal), Rate: 0.16, IsRetention: false }],
            Total: pesos(total),
          },
        ],
      });
      // TODO(⚪): ruta de descarga del PDF no encontrada en la documentación consultada; es la que usan sus SDK.
      const archivo = await llamar("GET", `/cfdi/pdf/issued/${encodeURIComponent(cfdi.Id)}`);
      return {
        uuid: cfdi?.Complement?.TaxStamp?.Uuid ?? cfdi.Id,
        folio: `PF-${cfdi.Folio ?? s.folio}`,
        pdf: Buffer.from(String(archivo.Content ?? ""), "base64"),
        simulada: false,
        totalCentavos: total,
      };
    },
  };
}

export function facturadorConfigurado(): Facturador {
  const usuario = process.env.FACTURAMA_USUARIO ?? "";
  const clave = process.env.FACTURAMA_CLAVE ?? "";
  if (!usuario || !clave) return facturadorSimulado;
  return crearFacturama({
    usuario,
    clave,
    base: process.env.FACTURAMA_URL || "https://apisandbox.facturama.mx",
    lugarExpedicion: process.env.FACTURAMA_LUGAR_EXPEDICION ?? "",
  });
}

// Panel del comercio: pagos y pedidos en tiempo real. Solo local o con ?clave=<PANEL_CLAVE>.
// Muestra datos mínimos: últimos 4 dígitos del cliente, nunca el número completo ni la CLABE (AGENTS.md §4).
import { Router } from "express";
import { readFileSync } from "node:fs";
import { soloEquipo } from "../core/acceso.ts";
import { cobrosRecientes, type FilaPanel } from "../core/cobros.ts";

const html = readFileSync(new URL("./panel.html", import.meta.url), "utf8");

const NOMBRES: Record<string, string> = { svc: "Servicios", tienda: "Tiendita", p2p: "Cobro rápido" };

function detalle(c: FilaPanel): { texto: string; realCentavos: number } {
  const p = c.payload as any;
  if (c.modulo === "svc" && p.orden) {
    const o = p.orden;
    const ref = String(o.referencia ?? "");
    return { texto: `${o.emoji ?? ""} ${o.tipo === "recarga" ? "Recarga " : ""}${o.nombre} •••• ${ref.slice(-4)}`.trim(), realCentavos: Number(o.centavosReal ?? c.centavos) };
  }
  if (c.modulo === "tienda" && Array.isArray(p.partidas)) {
    return { texto: p.partidas.map((x: any) => `${x.cantidad} × ${x.nombre}`).join(", "), realCentavos: c.centavos };
  }
  if (c.modulo === "p2p") return { texto: String(p.concepto ?? c.concepto), realCentavos: Number(p.centavosReal ?? c.centavos) };
  return { texto: c.concepto, realCentavos: c.centavos };
}

function inicioDelDiaCdmx(): number {
  // Medianoche en la Ciudad de México (UTC-6, sin horario de verano desde 2022).
  const ahora = new Date(Date.now() - 6 * 3_600_000);
  return Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()) + 6 * 3_600_000;
}

export function rutasPanel(): Router {
  const r = Router();
  r.use(soloEquipo("PANEL_CLAVE", "panel_clave"));

  r.get("/", (req, res) => {
    // La página pide "api/resumen" relativo: necesita la diagonal final (/panel/).
    const [ruta, query] = req.originalUrl.split("?");
    if (!ruta.endsWith("/")) return res.redirect(301, `${ruta}/${query ? `?${query}` : ""}`);
    res.type("html").send(html);
  });

  r.get("/api/resumen", (req, res) => {
    const modulo = typeof req.query.modulo === "string" && NOMBRES[req.query.modulo] ? req.query.modulo : undefined;
    const filas = cobrosRecientes(200, modulo);
    const hoy = inicioDelDiaCdmx();
    const pagadosHoy = filas.filter((c) => c.estado === "pagado" && (c.pagadoEn ?? 0) >= hoy);
    res.json({
      ahora: Date.now(),
      kpis: {
        pagosHoy: pagadosHoy.length,
        cobradoHoyCentavos: pagadosHoy.filter((c) => !c.simulado).reduce((s, c) => s + c.centavos, 0),
        pendientes: filas.filter((c) => c.estado === "pendiente" && !c.cancelado).length,
        ultimoPago: pagadosHoy[0]?.pagadoEn ?? null,
      },
      cobros: filas.slice(0, 60).map((c) => {
        const d = detalle(c);
        const factura = (c.payload as any).factura;
        return {
          id: c.id,
          folio: c.numRef,
          modulo: NOMBRES[c.modulo] ?? c.modulo,
          detalle: d.texto,
          realCentavos: d.realCentavos,
          cobradoCentavos: c.centavos,
          metodo: c.metodo === "pn" ? "Push" : "QR",
          estado: c.cancelado && c.estado === "pendiente" ? "cancelado" : c.estado,
          simulado: c.simulado,
          cliente: c.waId.replace(/\D/g, "").slice(-4),
          rastreo: c.rastreo ? `…${c.rastreo.slice(-6)}` : null,
          factura: factura ? { folio: factura.folio, simulada: Boolean(factura.simulada) } : null,
          creadoEn: c.creadoEn,
          pagadoEn: c.pagadoEn,
        };
      }),
    });
  });

  return r;
}

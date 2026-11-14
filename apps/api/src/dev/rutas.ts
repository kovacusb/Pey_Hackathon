// Chat de pruebas en el navegador (/dev). Usa el mismo bot y los mismos cobros reales de pey;
// solo el canal es distinto. "Simular pago" marca el cobro como SIMULACIÓN, visible en el comprobante.
import express, { Router } from "express";
import { readFileSync } from "node:fs";
import { procesarMensaje } from "../core/bot.ts";
import { pendientesDe, simularPago } from "../core/cobros.ts";
import { buzon, esUsuarioDev } from "../core/whatsapp/enviar.ts";
import { soloEquipo } from "../core/acceso.ts";

const html = readFileSync(new URL("./chat.html", import.meta.url), "utf8");

export function rutasDev(): Router {
  const r = Router();
  // Solo local o con DEV_CLAVE: evita que un desconocido mande cobros reales a cualquier celular (K01.8).
  r.use(soloEquipo("DEV_CLAVE", "dev_clave"));
  r.use(express.json());

  r.get("/", (_req, res) => {
    res.type("html").send(html);
  });

  r.post("/api/mensaje", async (req, res) => {
    const { waId, texto, id } = req.body ?? {};
    if (typeof waId !== "string" || !esUsuarioDev(waId)) {
      res.status(400).json({ error: "waId debe empezar con 'dev'" });
      return;
    }
    const entrada = typeof id === "string" ? { tipo: "boton" as const, id } : { tipo: "texto" as const, texto: String(texto ?? "") };
    await procesarMensaje(waId, "Prueba", entrada);
    res.json({ ok: true });
  });

  r.get("/api/buzon", (req, res) => {
    const waId = String(req.query.waId ?? "");
    res.json({ mensajes: esUsuarioDev(waId) ? buzon(waId, Number(req.query.desde ?? 0)) : [] });
  });

  r.get("/api/pendientes", (req, res) => {
    const waId = String(req.query.waId ?? "");
    if (!esUsuarioDev(waId)) {
      res.json({ cobros: [] });
      return;
    }
    res.json({ cobros: pendientesDe(waId).map((c) => ({ id: c.id, concepto: c.concepto, centavos: c.centavos, metodo: c.metodo })) });
  });

  r.post("/api/simular/:id", async (req, res) => {
    const c = pendientesDe(String(req.query.waId ?? "")).find((x) => x.id === req.params.id);
    if (!c) {
      res.status(404).json({ error: "cobro no encontrado o no es de este usuario de prueba" });
      return;
    }
    res.json({ resultado: await simularPago(c.id) });
  });

  return r;
}

// Chat de pruebas en el navegador (/dev). Usa el mismo bot y los mismos cobros reales de pey;
// solo el canal es distinto. "Simular pago" marca el cobro como SIMULACIÓN, visible en el comprobante.
import express, { Router } from "express";
import { readFileSync } from "node:fs";
import { procesarMensaje } from "../core/bot.ts";
import { pendientesDe, simularPago } from "../core/cobros.ts";
import { buzon, esUsuarioDev } from "../core/whatsapp/enviar.ts";

const html = readFileSync(new URL("./chat.html", import.meta.url), "utf8");

/** /dev solo desde esta máquina. Desde fuera (túnel o Render) pide ?clave=<DEV_CLAVE>; sin DEV_CLAVE, nadie de fuera entra.
 *  Evita que un desconocido mande solicitudes de cobro reales a cualquier celular (K01.8 prohíbe cobros no solicitados). */
export function soloAutorizados(req: express.Request, res: express.Response, next: express.NextFunction) {
  const viaProxy = Boolean(req.get("cf-connecting-ip") || req.get("x-forwarded-for"));
  const local = !viaProxy && ["localhost", "127.0.0.1", "::1"].includes(req.hostname);
  if (local) return next();
  const clave = process.env.DEV_CLAVE ?? "";
  const dada = String(req.query.clave ?? "") || (req.get("cookie") ?? "").match(/(?:^|;\s*)dev_clave=([^;]+)/)?.[1] || "";
  if (clave.length >= 12 && dada === clave) {
    res.cookie?.("dev_clave", clave, { httpOnly: true, sameSite: "strict", secure: true });
    return next();
  }
  res.status(403).type("text/plain").send("Chat de pruebas disponible solo para el equipo.");
}

export function rutasDev(): Router {
  const r = Router();
  r.use(soloAutorizados);
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

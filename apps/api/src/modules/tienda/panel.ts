// Panel web del comercio (/panel): manejar el bot de la tienda y ver pedidos y pagos en vivo.
// Reemplaza a la app Android en la demo. Junto al panel, un WhatsApp simulado que usa las rutas de /dev.
// Solo se monta con DEV_TOOLS=1 (como /dev): todavía no tiene inicio de sesión.
import express, { Router } from "express";
import { readFileSync } from "node:fs";
import { config } from "../../config.ts";
import { actualizarProducto, borrarProducto, crearProducto, DatoInvalido, guardarAjustes, leerAjustes, listarPedidos, listarProductos, resumen } from "./datos.ts";

const html = readFileSync(new URL("./panel.html", import.meta.url), "utf8");

export function rutasPanel(): Router {
  const r = Router();
  r.use(express.json({ limit: "20kb" }));

  r.get("/", (_req, res) => {
    res.type("html").send(html);
  });

  r.get("/api/estado", (_req, res) => {
    res.json({
      ajustes: leerAjustes(),
      productos: listarProductos(),
      pedidos: listarPedidos(30),
      resumen: resumen(),
      topeCentavos: config.maxCobroCentavos,
      peyConectado: Boolean(config.pey.apiKey),
    });
  });

  const manejar = (fn: (req: express.Request) => unknown): express.RequestHandler => (req, res) => {
    try {
      res.json({ ok: true, dato: fn(req) });
    } catch (e) {
      if (e instanceof DatoInvalido) {
        res.status(400).json({ error: e.message });
        return;
      }
      console.error("[panel] error", (e as Error).message);
      res.status(500).json({ error: "Algo falló de nuestro lado." });
    }
  };

  r.put("/api/ajustes", manejar((req) => guardarAjustes(req.body ?? {})));
  r.post("/api/productos", manejar((req) => crearProducto(req.body ?? {})));
  r.put("/api/productos/:sku", manejar((req) => actualizarProducto(String(req.params.sku), req.body ?? {})));
  r.delete("/api/productos/:sku", manejar((req) => {
    if (!borrarProducto(String(req.params.sku))) throw new DatoInvalido("Ese producto ya no existe.");
    return true;
  }));

  return r;
}

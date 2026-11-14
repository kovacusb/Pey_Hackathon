// Acceso a páginas internas (/dev, /panel): libre desde esta máquina; desde fuera (túnel, Render) con ?clave=<VARIABLE>.
// Sin la variable (o con menos de 12 caracteres) nadie de fuera entra. La clave se recuerda en una cookie httpOnly.
import type { NextFunction, Request, Response } from "express";

export function soloEquipo(variable: string, cookie: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const viaProxy = Boolean(req.get("cf-connecting-ip") || req.get("x-forwarded-for"));
    if (!viaProxy && ["localhost", "127.0.0.1", "::1"].includes(req.hostname)) return next();
    const clave = process.env[variable] ?? "";
    const dada = String(req.query.clave ?? "") || (req.get("cookie") ?? "").match(new RegExp(`(?:^|;\\s*)${cookie}=([^;]+)`))?.[1] || "";
    if (clave.length >= 12 && dada === clave) {
      res.cookie(cookie, clave, { httpOnly: true, sameSite: "strict", secure: true });
      return next();
    }
    res.status(403).type("text/plain").send("Disponible solo para el equipo.");
  };
}

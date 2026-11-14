// Punto de entrada: `npm run dev` (recarga al guardar) o `npm start`. Lee ../../.env si existe.

import { serve } from "@hono/node-server";
import { AlmacenMemoria } from "./almacen.ts";
import { crearApp } from "./app.ts";
import { leerConfig, variablesFaltantes } from "./config.ts";

const faltan = variablesFaltantes();
if (faltan.length) {
  console.warn(`⚠️  Faltan en .env: ${faltan.join(", ")}. El bot no responderá hasta que estén (nunca las pegues en el chat).`);
}

const app = crearApp({ config: leerConfig(), almacen: new AlmacenMemoria() });
const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`peybot API escuchando en http://localhost:${info.port}`);
});

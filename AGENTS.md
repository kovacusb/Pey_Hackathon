# AGENTS.md

Instrucciones para cualquier agente (Claude Code, Codex, Cursor, ChatGPT) que trabaje en este repo. Léelas completas antes de actuar.

## 1. Misión
Construir un proyecto para el **Hackatón México** (14 nov–12 dic 2026, CoDi + API de pey; reglas oficiales resumidas en K01.8). El proyecto arrancó desde cero el 14-nov-2026. Qué construimos (**peybot**), su alcance, su arquitectura y el plan por tareas están en `docs/PRD.md`: léelo antes de construir.

## 2. Cómo usar la base de conocimiento
1. Empieza por `README.md` y `conocimiento/INDICE.md` (qué archivo responde cada pregunta).
2. Lee solo lo que tu tarea necesita:

| Si tu tarea toca… | Lee |
|---|---|
| El hackatón, quién lo organiza, qué buscan pey y sus aliados, preguntas abiertas | K01 |
| La ley de pagos digitales y el plazo bancario del 14-dic | K02 |
| Cobros con pey (síntesis, código de referencia, plan B, IA como herramienta) | K03 y luego `pey/` (empieza en `pey/README.md`) |
| Qué es CoDi, cómo funciona, reglas de Banxico, cifras y marca | `codi/` (empieza en `codi/README.md`) |
| Efectivo, comisiones de tarjeta, adopción de CoDi, fraude, brecha digital, personas y datos para el pitch | K04 |
| El producto, su alcance y el plan por tareas | `docs/PRD.md` |
| La API y el bot de WhatsApp | `apps/api/README.md` |

3. En la descripción del PR o del commit, cita los IDs que usaste ("según K03.4…").
4. Lo marcado ⚪ no está verificado. Si necesitas un dato que no está (endpoint, campo, error, precio), **no lo inventes**: consulta la documentación oficial; si no puedes, deja `TODO(⚪): …` visible en el código y dilo.
5. Los datos se consultaron entre el 5 y el 7 de noviembre de 2026. Antes de una demo, revisa el changelog y la versión del OpenAPI de pey ([pey/13](pey/13-registro-de-cambios.md)).

## 3. Reglas de dinero (pey cobra de verdad)
- **pey solo tiene producción:** no hay sandbox, todo cobro es real y lo que se paga a la cuenta de prueba no se devuelve. En pruebas y en la demo se cobran montos de $0.01 a $1, con un tope que impone el servidor (K03.3, K03.6).
- **Confirmación humana:** ningún cobro sin que la persona lo confirme explícitamente. El servidor impone el monto máximo, diga lo que diga la interfaz o un modelo de IA (K03.9).
- **Verdad de pago:** "pagado" solo si pey lo confirma: `PAID` vinculado al cobro con el monto y la moneda esperados, o un webhook con firma válida. Nunca por una captura de pantalla, un recibo ni la redirección de una liga de pago (K03.4, K03.5, [pey/06](pey/06-api-ligas-de-pago.md)).
- **SIMULACIÓN visible:** si existe un modo de simulación, la interfaz dice "SIMULACIÓN" de forma visible y nunca se presenta como pago real.
- **Sin reintentos a ciegas:** no repitas la creación de un QR o de una push tras un timeout sin reconciliar antes; pey no documenta idempotencia (K03.8).
- **Para la entrega:** el demo crea al menos un Mensaje de Cobro CoDi real en producción y reacciona a su resultado; la simulación solo sirve como plan B y no cuenta como integración (K01.8).
- **Montos:** pey recibe pesos con decimales, no centavos. Internamente, conviene manejar centavos enteros y convertir solo al llamar a pey ([docs/REVISION-PEY-2026-11-07.md](docs/REVISION-PEY-2026-11-07.md)).

## 4. Reglas de seguridad y datos
- Las llaves viven solo en el servidor como variables de entorno (nombres en `.env.example`). **Nunca** en el navegador, en el repo, en los logs ni en el chat.
- El repo es público: `PEY_API_KEY`, `PEY_WEBHOOK_SECRET` y `MAX_MONTO_MXN` están como **secretos cifrados de GitHub** (Codespaces y Actions; se cargan con `scripts/cargar_secretos.sh`). Un agente los lee de `process.env` y nunca los imprime, los copia a un archivo versionado ni los manda a un modelo. Si un secreto falta, detente y pídele a la persona que lo cargue; no lo pidas en el chat.
- Las llamadas a pey (y a cualquier proveedor de IA) viven en funciones de servidor. El navegador solo habla con tu propia API.
- Webhooks: verifica la firma Standard Webhooks sobre el cuerpo **crudo**, rechaza timestamps viejos y deduplica por `webhook-id` y `transactionId` en almacenamiento persistente (K03.5, K03.7).
- No guardes el celular, la CLABE ni el nombre de quien paga si no hace falta. En los logs, solo IDs (`codiQrId`, `transactionId`, `requestId`) ([codi/05](codi/05-seguridad-y-proteccion.md)).
- Marca: usa solo los archivos oficiales de pey y de CoDi, descargados y sin redibujar ([pey/12](pey/12-recursos-de-marca.md), [codi/09](codi/09-marca-logotipos-y-material.md)). No afirmes patrocinio ni aval de pey ni de Banxico.
- Ley: no afirmes que aceptar pagos digitales o QR ya es obligatorio (K02.4).

## 5. Código
- Cada app vive en `apps/<nombre>` con su README, `npm test` y `npm run typecheck`. Los dos pasan antes de cada commit.
- TypeScript que Node 24+ ejecuta sin compilar; nombres, comentarios y textos para usuarios en español de México.
- La lógica de negocio es pura y se prueba sola (`apps/api/src/bot.ts`); la red vive en adaptadores (`whatsapp.ts` y, en la tarea 2, el cliente de pey).
- Las pruebas no usan la red: Meta, pey y la IA se simulan con un `fetch` falso y datos ficticios.
- Cada API externa lleva en el código la URL de su documentación y la fecha de consulta; lo no verificado queda como `TODO(⚪)`.
- La integración con pey se escribe nueva en este repo: K03.7 es documentación, no código para copiar (K01.8).

## 6. Mantener la base
- No modifiques `conocimiento/`, `pey/` ni `codi/` salvo que la tarea lo pida. Si agregas un dato, agrega su fuente (tabla "## Fuentes" en `conocimiento/`, línea "Fuente:" en `pey/` y `codi/`).
- Después de editar la base, corre:
  ```bash
  python3 scripts/construir_indice.py        # regenera conocimiento/INDICE.md
  python3 scripts/construir_todo_en_uno.py   # regenera conocimiento/TODO-EN-UNO.md
  python3 scripts/verificar_conocimiento.py  # formato, fuentes, enlaces, IDs repetidos y secretos
  ```
- Antes de terminar una tarea: corre las pruebas (cuando existan) y revisa que el diff no tenga llaves.

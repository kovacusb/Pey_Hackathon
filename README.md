# Pey_Hackathon

Proyecto para el **Hackatón México** (14 nov–12 dic 2026): construir con **CoDi®** (Cobro Digital de Banxico) y la API de **pey**. Arrancamos el 14 de noviembre de 2026 desde cero. Lo que construimos es **peybot**: un bot de WhatsApp que toma pedidos de una tiendita y cobra con CoDi vía pey, más una app Android para el comercio ([PRD](docs/PRD.md)). La base del proyecto son dos cosas:

1. **Una base de conocimiento** sobre pey, CoDi, la ley de pagos digitales y el contexto de los comercios en México. Está en español de México, cada dato trae su fuente y lo no verificado está marcado con ⚪. La investigación se hizo entre el 5 y el 7 de noviembre de 2026 y no se ha reconsultado.
2. **Una forma de trabajar con agentes de IA** (Claude Code, Codex, Cursor, ChatGPT): reglas en [`AGENTS.md`](AGENTS.md) y [`CLAUDE.md`](CLAUDE.md), más scripts que mantienen la base verificable.

## Estado (14-nov-2026)
- **Idea:** peybot ([docs/PRD.md](docs/PRD.md)). Tarea 1 lista: el bot de WhatsApp muestra el catálogo, arma el carrito y pide confirmación ([apps/api](apps/api/README.md)); el cobro real es la tarea 2.
- **Hackatón:** Hackatón México: postulación hasta el 10-dic y entregas hasta el 12-dic (23:59, hora de la Ciudad de México); resultados el 14-dic. Reglas oficiales resumidas en K01.8.
- **Cobros reales con pey:** ninguno todavía. Lo de pey sale de su documentación, no de pruebas en producción.

## Cómo trabajamos
1. **Todo agente empieza por [`AGENTS.md`](AGENTS.md)** y por el [índice](conocimiento/INDICE.md); lee solo los archivos que su tarea necesita.
2. **Una tarea a la vez:** plan corto → construir → verificar → evidencia → commit. "Creo que funciona" no es evidencia.
3. **Cada dato dice de dónde salió** (K03.4, pey/04…). Lo no verificado se marca ⚪, o `TODO(⚪)` en el código; nada se inventa.
4. **Dinero real:** pey solo tiene producción. Montos de $0.01 a $1, tope impuesto por el servidor, confirmación humana y "pagado" solo si pey lo confirma.
5. **Llaves fuera del repo y del chat:** solo como secretos del entorno (nombres en [`.env.example`](.env.example)).

## Lo esencial en 12 líneas
1. **CoDi** cobra con QR o con notificación al celular sobre SPEI, 24/7, sin comisión y sin contracargos; quien paga autoriza en la app de su banco ([codi/](codi/README.md)).
2. **pey:** API REST en `https://api.pey.mx` con `Authorization: Bearer <PEY_API_KEY>`. Gratuita por ahora, funciona con cualquier banco y deposita directo en la cuenta del comercio (K03.2).
3. **Solo producción, sin sandbox:** todo cobro es real. Prueba con $0.01 a $1 y pon un tope en el servidor (K03.3).
4. **Alta:** portal.mipey.mx → Finanzas (cuenta `codi`) → Desarrollador → "Crear API Key". Tu CLABE tarda 5 días hábiles; la cuenta de prueba se activa al instante, pero lo que le pagues no se devuelve ([pey/02](pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)).
5. **QR:** `POST /codi/qr` responde 201. `amount` en pesos, `expiration` de 0 o al menos 360, `numRef` de 1 a 7 dígitos; con `generateImage: true` llega `qrImage` ([pey/04](pey/04-api-codi-qr-y-push.md)).
6. **Push al celular:** `POST /codi/pn` responde 200 y pide un celular de 10 dígitos; se sigue con `GET /transaction/{transactionId}` ([pey/04](pey/04-api-codi-qr-y-push.md), [pey/07](pey/07-api-transacciones.md)).
7. **Confirmar el pago:** `GET /transaction/codi/qr/{id}` hasta ver `PAID` con el monto esperado, o un webhook `codi.qr.payment_received` / `codi.pn.payment_received` con firma Standard Webhooks válida (K03.4, K03.5).
8. **Lo que pey no tiene:** cancelar un QR o una push, devoluciones por API, idempotencia documentada, límite de peticiones publicado y eventos de pago rechazado o vencido ([pey/README](pey/README.md)).
9. **Marca:** solo los 5 archivos oficiales de pey, sin redibujar ([pey/12](pey/12-recursos-de-marca.md)).
10. **El reto real es la adopción:** hay millones de cuentas CoDi validadas, pero pocas personas han pagado o cobrado con ellas (K01.4, K04.4).
11. **Fechas:** el 14-dic-2026 vence el plazo de Banxico para que los bancos homologuen sus apps, incluido el pago de cobros CoDi. La nueva ley de pagos digitales **no** obliga hoy a los comercios (K02).
12. **Qué buscan pey y los organizadores:** integración real de la API, comisión 0 %, dinero directo al comercio e IA útil y acotada (K01.5).

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| [`conocimiento/INDICE.md`](conocimiento/INDICE.md) | Qué archivo responde cada pregunta (generado). |
| [`conocimiento/TODO-EN-UNO.md`](conocimiento/TODO-EN-UNO.md) | Toda la base en un solo archivo, para cargarla en un LLM (generado). |
| [K01 · Hackatón México y ecosistema de pey](conocimiento/01-hackaton-mexico-y-ecosistema-pey.md) | El evento, pey, AI Builders y SpaceXAI; qué conquista, qué aleja y preguntas abiertas. |
| [K02 · Ley de pagos digitales y 14-dic](conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md) | Qué dice la ley, qué no se puede afirmar y el plazo bancario del 14-dic. |
| [K03 · CoDi y API de pey](conocimiento/03-codi-y-api-pey.md) | Síntesis con código de referencia en Node, plan B de demo y la API como herramienta de un agente de IA. |
| [K04 · Contexto de pagos y comercios](conocimiento/04-contexto-pagos-y-comercios-mx.md) | Efectivo, comisiones de tarjeta, adopción de CoDi, fraude, brecha digital, personas, datos para el pitch y oportunidades. |
| [`pey/`](pey/README.md) | Documentación de pey en Markdown: 11 endpoints, 4 webhooks, tipos, errores, marca, changelog y tutoriales. |
| [`codi/`](codi/README.md) | Documentación de CoDi: qué es, flujo, actores, seguridad, regulación, cifras, marca, SPEI y DiMo, y cómo encaja pey. |
| [`docs/PRD.md`](docs/PRD.md) | Qué construimos: peybot, alcance del demo, arquitectura, plan por tareas y entregables. |
| [`apps/api`](apps/api/README.md) | API de peybot: webhook de WhatsApp y motor del bot (Node + TypeScript). |
| [`docs/REVISION-PEY-2026-11-07.md`](docs/REVISION-PEY-2026-11-07.md) | Revisión de pey: decisiones de ingeniería para un checkout y preguntas para pey. |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Reglas para agentes: dinero real, llaves, webhooks, datos personales y marca. |
| [`.env.example`](.env.example) | Nombres de las variables de pey (sin valores). |
| [`scripts/`](scripts/) | Mantenimiento de la base: índice, archivo único y verificador. |

## Mantenimiento

```bash
python3 scripts/construir_indice.py        # regenera conocimiento/INDICE.md
python3 scripts/construir_todo_en_uno.py   # regenera conocimiento/TODO-EN-UNO.md
python3 scripts/verificar_conocimiento.py  # formato, fuentes, enlaces, IDs repetidos y secretos
```

## Marcas
pey® y CoDi® son marcas de sus dueños. Este repo no está patrocinado ni avalado por pey ni por Banxico. La documentación de pey y de CoDi está redactada con palabras propias: no es documentación oficial y, ante cualquier duda, manda la fuente enlazada.

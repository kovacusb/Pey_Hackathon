# Pey_Hackathon

Base de conocimiento sobre **pey** (la API de cobros CoDi) y **CoDi®** (Cobro Digital de Banxico) para construir el proyecto del hackatón de pey. Se extrajo el 2026-11-14 de `~/HackathonOpenAi`; los datos se consultaron entre el 5 y el 7 de noviembre de 2026 y no se reconsultaron. Todo en español de México; cada dato trae su fuente y lo no verificado está marcado con ⚪.

## Estado
- **Proyecto:** por definir. El PRD irá en `docs/PRD.md`.
- **Hackatón:** muy probablemente el Hackatón México (14 nov–12 dic 2026, con CoDi y la API de pey). ⚪ Sus bases no están verificadas (K01).
- **Cobros reales con pey:** ninguno todavía. En el repo anterior tampoco se hizo un cobro real, así que lo de pey sale de su documentación, no de pruebas en producción.

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
10. **El reto real es la adopción:** hay millones de cuentas CoDi validadas, pero pocas personas han pagado o cobrado con ellas (K01.4, K06.4).
11. **Fechas:** el 14-dic-2026 vence el plazo de Banxico para que los bancos homologuen sus apps, incluido el pago de cobros CoDi. La nueva ley de pagos digitales **no** obliga hoy a los comercios (K02).
12. **Qué buscan pey y los organizadores:** integración real de la API, comisión 0 %, dinero directo al comercio e IA útil y acotada (K01.5).

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| [`conocimiento/INDICE.md`](conocimiento/INDICE.md) | Qué archivo responde cada pregunta (generado). |
| [`conocimiento/TODO-EN-UNO.md`](conocimiento/TODO-EN-UNO.md) | Toda la base en un solo archivo, para cargarla en un LLM (generado). |
| [K01 · Hackatón México y ecosistema de pey](conocimiento/01-hackaton-mexico-y-ecosistema-pey.md) | El evento, pey, AI Builders y SpaceXAI; qué conquista, qué aleja y preguntas abiertas. |
| [K02 · Ley de pagos digitales y 14-dic](conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md) | Qué dice la ley, qué no se puede afirmar y el plazo bancario del 14-dic. |
| [K03 · CoDi y API de pey](conocimiento/03-codi-y-api-pey.md) | Síntesis con código probado en Node, plan B de demo y la API como herramienta de un agente de IA. |
| [K06 · Contexto de pagos y comercios](conocimiento/06-contexto-pagos-y-comercios-mx.md) | Efectivo, comisiones de tarjeta, adopción de CoDi, fraude, brecha digital, personas, datos para el pitch y oportunidades. |
| [`pey/`](pey/README.md) | Documentación de pey en Markdown: 11 endpoints, 4 webhooks, tipos, errores, marca, changelog y tutoriales. |
| [`codi/`](codi/README.md) | Documentación de CoDi: qué es, flujo, actores, seguridad, regulación, cifras, marca, SPEI y DiMo, y cómo encaja pey. |
| [`docs/REVISION-PEY-2026-11-07.md`](docs/REVISION-PEY-2026-11-07.md) | Revisión de pey: decisiones de ingeniería para un checkout y preguntas para pey. |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Reglas para agentes: dinero real, llaves, webhooks, datos personales y marca. |
| [`.env.example`](.env.example) | Nombres de las variables de pey (sin valores). |
| [`scripts/`](scripts/) | Mantenimiento de la base: índice, archivo único y verificador. |

K03 y K06 conservan el número que tenían en `~/HackathonOpenAi`; K01 y K02 son nuevos y se armaron con partes de K00, K01 y K02 de ese repo.

## Mantenimiento

```bash
python3 scripts/construir_indice.py        # regenera conocimiento/INDICE.md
python3 scripts/construir_todo_en_uno.py   # regenera conocimiento/TODO-EN-UNO.md
python3 scripts/verificar_conocimiento.py  # formato, fuentes, enlaces, IDs repetidos y secretos
```

## Lo que no se trajo (y dónde está)
- **El prototipo del 7-nov** (punto de venta con NFC por mesa y sus versiones anteriores, «Tócale» y «¿Ya cayó?»): está en `~/HackathonOpenAi` y su historial de git. Su cliente de pey (`lib/pey.js`) y su verificador de webhooks (`lib/webhook.js`) pueden servir de referencia.
- **Lo propio del DevDay Exchange del 7-nov:** bases, ficha del evento y criterios (K00, K01 y K08 de ese repo).
- **OpenAI, Codex y Codespaces, ideas puntuadas y pitch:** están en el historial de git de ese repo (commit anterior a `85f4b31`).
- **El registro global de fuentes** (`fuentes/REGISTRO.md`): aquí cada archivo trae su propia tabla de fuentes.

## Marcas
pey® y CoDi® son marcas de sus dueños. Este repo no está patrocinado ni avalado por pey ni por Banxico. La documentación de pey y de CoDi está redactada con palabras propias: no es documentación oficial y, ante cualquier duda, manda la fuente enlazada.

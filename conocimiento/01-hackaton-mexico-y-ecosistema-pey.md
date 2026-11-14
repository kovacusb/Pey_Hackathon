---
id: K01
titulo: "Hackatón México y el ecosistema de pey: qué se sabe del reto y qué buscan pey y sus aliados"
resumen: "Lo que se sabía al 7-nov-2026 del Hackatón México (14 nov–12 dic) y de quién lo organiza; qué es pey, por qué abrió su API y qué éxito busca; qué busca AI Builders México; por qué CoDi no ha despegado; qué conquista, qué aleja y qué falta preguntar. Léelo antes de elegir la idea."
responde:
  - "¿Qué es el Hackatón México, cuándo es y quién lo organiza?"
  - "¿Qué es pey, qué ofrece y qué éxito busca con su API abierta?"
  - "¿Qué buscan AI Builders México y SpaceXAI?"
  - "¿Por qué CoDi importa y por qué no ha despegado?"
  - "¿Qué conquista a pey y a los organizadores, y qué los aleja?"
  - "¿Qué falta confirmar con pey y con los organizadores?"
actualizado: 2026-11-14
confianza: media
fuentes: [SA03, SA12, SA32, SA33, SA34, SA35, SA36, SA37, SA38, SA39, SA40, SA41, SA42, SA45, SA53, SA54, SB01, SB02, SB03, SB04, SB05, SB24, SB37, SB38, SD64]
---

# K01 · Hackatón México y el ecosistema de pey

> Investigación previa al arranque. Los datos se consultaron entre el 2026-11-05 y el 2026-11-07 y **no se han reconsultado**. Lo del Hackatón México viene sobre todo de un newsletter del 31-oct y de prensa: confianza **baja** hasta abrir el sitio oficial.

## TL;DR

- **Hackatón México** (hackatonmexico.com): del 14 de noviembre al 12 de diciembre de 2026, con CoDi y la API de pey; individual o en equipo; más de 1 millón de pesos en premios, créditos y recursos; lo organizan AI Builders México, pey y SpaceXAI; entregas el 12-dic y resultados el 14-dic [SA03][SB37]. ⚪ Bases, criterios, jurado y herramientas permitidas: no verificados.
- **pey** es una API CoDi autoservicio, gratuita «por el momento», que funciona con cualquier banco y deposita directo en la cuenta del comercio. Se presenta como certificada por Banxico y quiere ser el procesador de pagos de los negocios informales [SB01][SB03][SA12][SB38].
- **Qué buscan:** integraciones reales de la API de pey, comisión 0 %, dinero directo al comercio y herramientas con IA, hechas por builders mexicanos, que acerquen CoDi a comercios y personas [SA03].
- **El problema de fondo es la adopción, no la tecnología:** CoDi tiene millones de cuentas validadas, pero pocas personas han pagado o cobrado con él (K01.4, K04.4).
- **Los aleja:** cobro simulado sin decirlo, IA decorativa o que decide montos, datos inventados, llaves expuestas y afirmaciones falsas sobre la ley (K01.6).

## K01.1 · Hackatón México: lo que se sabe (al 7-nov-2026)

| Dato | Valor | Fuente |
|---|---|---|
| Nombre y sitio | Hackatón México · hackatonmexico.com (⚪ el sitio no se abrió) | [SA03] |
| Fechas | 14 de noviembre a 12 de diciembre de 2026 | [SA03][SB37] |
| Reto | Construir con CoDi y la API de pey | [SA03] |
| Participación | Individual o en equipo | [SA03] |
| Premios | Más de 1 millón de pesos en premios, créditos y recursos | [SA03][SB37] |
| Organizan | AI Builders México, pey y SpaceXAI | [SA03][SB37] |
| Entregas / resultados | 12 de diciembre / 14 de diciembre | [SA03] |
| Arranque | Sábado 14 de noviembre: arranque presencial del "Cursor Hackatón México" en 7 ciudades | [SA03] |
| Evento relacionado | Hackatón de Cursor en Mérida (13–14 nov), registrado en Luma con una dirección que incluye "spacexai" | [SA39] |

- ⚪ No está claro si el arranque presencial del "Cursor Hackatón México" del 14-nov es el inicio del mismo Hackatón México o un evento aparte. La fuente los lista por separado.
- El día de resultados (14-dic) coincide con la fecha límite de Banxico para que los bancos homologuen sus apps, incluido el pago de mensajes de cobro CoDi (K02.5).

**Recomendación:** antes de elegir la idea, abre hackatonmexico.com y anota en este archivo las bases, los criterios, el jurado, las herramientas exigidas o permitidas, el formato de entrega, qué se permite traer de antes del arranque y si es presencial o en línea (K01.7).

## K01.2 · Quién organiza: AI Builders México y SpaceXAI

**AI Builders México**
- Es una comunidad que convierte ideas en productos digitales con IA. Su sitio declara más de 5,000 builders, más de 45 eventos y más de 2,500 asistentes (cifras autodeclaradas) [SA32].
- Su misión, según el newsletter del 31-oct: que cobrar no cueste un porcentaje de la venta. Subraya que CoDi cobra y paga al instante entre cuentas con 0 % de comisión, y busca herramientas con IA, hechas por builders mexicanos, que acerquen esos pagos a más comercios, negocios y personas [SA03].
- Aliados en su sitio: Cursor, Reve, Stripe, v0, OpenAI, Gemini y SpaceXAI [SA32]. En sus eventos aparecen como organizadores Ben Kim, Javier Rivero y Ricardo García [SA33][SA34][SA35].
- Inferencia: es una comunidad que trabaja con varias herramientas y premia construir y lanzar productos reales rápido.

**SpaceXAI**
- Es el nuevo nombre de xAI tras su fusión con SpaceX. La fusión se anunció en febrero de 2026 y el cambio de nombre en mayo [SA36].
- SpaceX anunció en junio de 2026 la compra de Cursor (Anysphere) por 60 mil millones de dólares en acciones [SA38] y la completó el 14 de agosto de 2026 [SA37].
- Coorganiza el Hackatón México con AI Builders y pey [SA03]. Inferencia (⚪): esa relación explicaría el nombre "Cursor Hackatón México".

**Recomendación:** usa el vocabulario de los organizadores: comisión 0 %, dinero directo a la cuenta del comercio, builder mexicano, herramienta que un comercio puede usar hoy. No hables mal de herramientas de la competencia. ⚪ Revisa qué herramientas exige o permite el Hackatón México.

## K01.3 · pey: empresa, API y qué éxito busca

**Empresa**
- pey® es una empresa de tecnología enfocada en integrar CoDi a negocios [SB02]. El pie de su documentación dice Koshi SA de CV [SB24].
- Afirma que Banxico aprobó su integración con CoDi [SB03], requisito para terceros desarrolladores ([codi/03](../codi/03-actores-y-participantes.md)).
- mipey.mx se presenta como certificada por Banxico, con la visión de ser el procesador de pagos digitales de los negocios informales de México [SA12]. ⚪ No verificado: tipo exacto de certificación, fundadores, financiamiento y tamaño.

**API CoDi** (detalle técnico en K03 y en [pey/README](../pey/README.md))
- Es autoservicio, funciona con cualquier banco y es gratuita «por el momento» [SB01]. Que sea gratis es una condición comercial vigente, no permanente [SB38].
- El dinero llega directo a la cuenta bancaria del comercio, sin cuenta en pey [SB37][SB38].
- Ofrece QR, notificación push, registro de CLABEs para cobrar a nombre de cada comercio, ligas de pago y consulta de transacciones. Sus webhooks van firmados con Standard Webhooks [SB01].

**Otros productos:** la app pey (iOS y Android) reúne los pagos CoDi de cualquier banco y comparte la vista de cobros sin dar credenciales [SB04]. Además hay soluciones para restaurantes, una boletera y un portal de negocios [SB02][SB05].

**Por qué abrió su API** (inferencia ⚪, pey no lo declara así)
- Gratis, autoservicio y para cualquier banco: así pone la barrera mínima para integradores [SB01].
- Cada builder se vuelve un canal de distribución hacia comercios que pey no alcanzaría solo.
- Su éxito probable se mide en comercios activos cobrando con CoDi vía pey, volumen de cobros, casos de uso nuevos (voz, chat, QR impresos, cobro a domicilio) y retroalimentación sobre la API y su documentación.
- Lo dicen así: «ahora falta facilitar la experiencia de quien recibe el dinero» [SB37].

**Recomendación:** en la demo, muestra el ciclo completo: crear cobro → QR o solicitud al celular → pago → confirmación de pey (webhook verificado o consulta) → la IA actúa (registra la venta, avisa al comercio, concilia). Menciona métricas que le importan a pey: minutos para que un comercio reciba su primer cobro, pasos necesarios y comisión 0 %. Si encuentras huecos en la documentación, repórtalos con cortesía: la lista de lo que no existe está en [pey/README](../pey/README.md).

## K01.4 · Por qué CoDi importa y por qué no ha despegado

- Cobrar con tarjeta cuesta a los negocios hasta 1.91 % con crédito y 1.15 % con débito. El promedio en México es 1.36 %, frente a cerca de 0.2 % en otros países. CoDi transfiere al instante entre cuentas con QR o NFC, sin comisiones y a cualquier hora, pero requiere internet y una app bancaria compatible [SA40].
- El 85.2 % de las personas usa efectivo en compras menores a 500 pesos (dato de la CNBV citado por El Cronista) [SA41].
- En 2022 Banxico reportaba más de 14 millones de cuentas validadas en CoDi, pero solo un poco más de 1 millón con al menos un pago. Se mencionaban como causas el lanzamiento en pandemia y la desconfianza [SA42].
- Cifras más recientes (sep-2025: 21.8 M de cuentas validadas, 2.47 M han pagado y 1.08 M han cobrado), costo de las tarjetas por giro y causas: K04.3, K04.4 y [codi/07](../codi/07-cifras-de-uso.md).

**Recomendación:** ataca la adopción: fricción, desconfianza y hábito del efectivo. Eso toca el dolor real que AI Builders y pey quieren resolver: alta del comercio en minutos, confirmación de pago clara para quien cobra y para quien paga, conciliación automática y explicaciones en español sencillo.

## K01.5 · Lo que conquista

Síntesis; las fuentes van en cada punto:
- Un problema real de un comercio o servicio mexicano, del que sea, dicho en una frase.
- Una solución creativa.
- Cobro CoDi de punta a punta con pey, confirmado por pey (webhook con firma válida o consulta de estado) [SB01] (K03.4, K03.5).
- IA con un papel necesario y acotado: el código determinista maneja montos y estados, el modelo interpreta y explica y la persona confirma. Es el patrón de los ganadores de OpenAI Build Week [SA45].
- Narrativa de comisión 0 % y dinero directo al comercio [SA03][SB37].
- Que aproveche la ley de pagos digitales con datos correctos: adopción voluntaria y preparación, no obligaciones inventadas [SD64] (K02).

**Recomendación:** suma tres detalles que casi nadie cuida: diseño para personas no expertas (texto grande, voz, español coloquial), limitaciones declaradas con honestidad y un siguiente paso creíble (por ejemplo, un piloto con un comercio).

## K01.6 · Lo que aleja

Síntesis de riesgos; las fuentes van en cada punto:
- Un proyecto sin pey ni CoDi, o con cobro solo simulado sin decirlo [SA03].
- Un chat genérico sin conexión con el cobro ni con el comercio.
- Un modelo que decide montos sin validación determinista ni confirmación humana [SA45].
- Datos, comercios o testimonios inventados presentados como reales.
- Llaves expuestas en un repo público: GitHub detecta llaves de OpenAI en repos públicos y OpenAI las desactiva, lo que además rompe la demo [SA54][SA53].
- Una demo sin respaldo para cuando falla el internet (plan B en K03.6).
- Presumir alianzas con gobierno, bancos o pey que no existen.
- Exponer datos personales (CLABE, teléfonos) de personas reales.
- Afirmar que la ley ya obliga a aceptar QR o pagos digitales, o dar fechas que la ley no tiene [SD64] (K02.4).

**Recomendación:** antes de entregar, revisa esta lista contra el repo y la demo, y corrige cualquier punto en rojo antes de pulir lo visual.

## K01.7 · Preguntas abiertas (⚪)

**A los organizadores del Hackatón México**
1. Bases, criterios de evaluación con sus pesos, y jurado.
2. Herramientas exigidas o permitidas (¿Cursor, OpenAI, Claude, SpaceXAI/Grok?) y cómo quieren la evidencia de uso.
3. Formato y lugar de la entrega: repo, demo desplegada, video (¿duración?), presentación o formulario.
4. ¿Qué se permite traer de antes del arranque del 14-nov (código, investigación, diseños) y cómo hay que declararlo?
5. ¿Es presencial, en línea o mixto? ¿En qué ciudades? ¿Hay mentorías o demo day?
6. Elegibilidad, reparto de premios y créditos, y política de datos de comercios reales.

**A pey** (también en [docs/REVISION-PEY-2026-11-07.md](../docs/REVISION-PEY-2026-11-07.md) y K03.6)
1. ¿Hay sandbox o llaves de prueba para el hackatón? La página comercial las menciona y la documentación técnica no (K03.3).
2. ¿Qué monto usar en la demo? Con la cuenta de prueba, lo pagado no se devuelve.
3. Límite de peticiones, idempotencia al crear cobros, y reintentos y orden de los webhooks.
4. ¿Hay eventos de pago rechazado o vencido? ¿Se puede cancelar un QR o una push, o devolver por API?
5. ¿Qué pasa con una push si el celular del cliente no tiene CoDi activo? pey no documenta el error ([pey/04](../pey/04-api-codi-qr-y-push.md)).
6. Requisitos y plazo para dar de alta comercios reales (la CLABE propia tarda 5 días hábiles) y la comisión por tarjeta en las ligas de pago.

**Recomendación:** anota cada respuesta aquí con su fecha y su fuente, y actualiza K03 si pey cambia algo de la API.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA03 | Newsletter de AI Builders, 31 oct 2026 | (correo; sin URL pública) | 2026-11-06 (previo) |
| SA12 | mipey.mx | https://mipey.mx | 2026-11-06 (previo) |
| SA32 | AI Builders México (sitio oficial) | https://aibuilders.mx/ | 2026-11-07 |
| SA33 | OpenAI Codex: Mexico City (AI Builders Mexico, T1) | https://luma.com/suipk589 | 2026-11-06 |
| SA34 | Zero to Agent: Mexico City | https://luma.com/wp947zvj | 2026-11-06 |
| SA35 | v0 Prompt to Production, Mexico City | https://luma.com/fdg8riz2 | 2026-11-06 |
| SA36 | Mezha: xAI is now SpaceXAI | https://mezha.ua/en/news/xai-now-spacexai-312996/ | 2026-11-06 |
| SA37 | Cursor: Joining SpaceX | https://cursor.com/hi/blog/joining-spacex | 2026-11-06 |
| SA38 | Built In: SpaceX plans to acquire AI coding startup Cursor for $60B | https://builtin.com/articles/spacex-acquires-cursor-60b-20260616 | 2026-11-06 |
| SA39 | vibecoding.app: Cursor Hackathon Mérida (nov 2026) | https://vibecoding.app/ai-events/cursor-hackathon-merida-2026-11 | 2026-11-06 |
| SA40 | El Imparcial: Negocios pueden evitar pagar hasta 1.91% por cobrar con tarjeta (CoDi) | https://www.elimparcial.com/dinero/2026/04/11/negocios-en-mexico-pueden-evitar-el-pago-de-hasta-191-por-cobrar-con-tarjeta-con-esta-solucion-del-banco-de-mexico-que-elimina-cargos-y-entrega-el-dinero-en-segundos/ | 2026-11-06 |
| SA41 | El Cronista: La guerra contra el efectivo, más pagos digitales en 2026 | https://www.cronista.com/mexico/finanzas-economia/la-guerra-en-contra-del-efectivo-autoridades-en-mexico-van-por-mas-pagos-digitales-en-2026 | 2026-11-06 |
| SA42 | DPL News: México, desestiman a CoDi población y comercios (2022) | https://dplnews.com/?p=173032 | 2026-11-06 |
| SA45 | OpenAI Developers Blog: Build Week winners | https://developers.openai.com/blog/build-week-winners | 2026-11-06 |
| SA53 | GitHub Blog: Keeping secrets out of public repositories (29 feb 2024) | https://github.blog/2024-02-29-keeping-secrets-out-of-public-repositories | 2026-11-06 |
| SA54 | GitHub Changelog: RubyGems, Adobe and OpenAI are now secret scanning integrators (8 jun 2021) | https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators | 2026-11-06 |
| SB01 | pey®: API CoDi® (página de producto) | https://pey.mx/api-codi | 2026-11-06 |
| SB02 | pey®: página de inicio | https://pey.mx/ | 2026-11-06 |
| SB03 | pey®: CoDi® | https://pey.mx/codi | 2026-11-06 |
| SB04 | pey®: Personas y PyMEs (app) | https://pey.mx/personas-pymes | 2026-11-06 |
| SB05 | pey®: Accede a pey® (app y portal de negocios) | https://pey.mx/acceso | 2026-11-06 |
| SB24 | Documentación de pey: registro de cambios, Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SD64 | DOF · Ley de Economía Digital: texto y transitorios | https://sidof.segob.gob.mx/notas/docFuente/5803017 | 2026-11-07 |

(previo) = dato verificado antes de la sesión del 6-nov y no reconsultado.

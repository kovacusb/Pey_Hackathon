# Base de conocimiento completa — Pey_Hackathon (pey y CoDi)

> Archivo generado por `scripts/construir_todo_en_uno.py` el 2026-11-14. No lo edites a mano: edita los archivos de `conocimiento/`, `pey/`, `codi/` o `docs/` y vuelve a correr el script.
> Úsalo cuando un asistente (por ejemplo ChatGPT) necesite leer todo de una vez. Cada sección conserva su ID (K03.4, etc.) para citarla.

## Contenido
- `conocimiento/INDICE.md` — Índice de la base de conocimiento
- `conocimiento/01-hackaton-mexico-y-ecosistema-pey.md` — Hackatón México y el ecosistema de pey: qué se sabe del reto y qué buscan pey y sus aliados
- `conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md` — Ley de pagos digitales y plazo bancario del 14-dic-2026: qué dicen y qué no se puede afirmar
- `conocimiento/03-codi-y-api-pey.md` — CoDi y API de Pey
- `conocimiento/04-contexto-pagos-y-comercios-mx.md` — Contexto: pagos, comercios y personas en México
- `docs/REVISION-PEY-2026-11-07.md` — Revisión de pey y plan de integración
- `pey/README.md` — Documentación de pey (API CoDi) en Markdown
- `pey/01-que-es-pey-y-codi.md` — Qué es pey y su API CoDi
- `pey/02-primeros-pasos-cuenta-llaves-y-prueba.md` — Primeros pasos: perfil, cuenta de pago, API key y prueba en producción
- `pey/03-referencia-api-convenciones.md` — Referencia de la API: convenciones generales
- `pey/04-api-codi-qr-y-push.md` — API CoDi: crear QR y notificación push
- `pey/05-api-cuentas-bancarias.md` — API de cuentas bancarias: registrar y consultar CLABEs
- `pey/06-api-ligas-de-pago.md` — API de links de pago: crear, actualizar monto y consultar
- `pey/07-api-transacciones.md` — API de transacciones: consultar pagos
- `pey/08-tipos-de-datos.md` — Tipos de datos de pey
- `pey/09-webhooks.md` — Webhooks de pey: configuración, firma y eventos
- `pey/10-tutorial-mostrar-qr-codi.md` — Tutorial: mostrar un QR CoDi
- `pey/11-errores-y-limites.md` — Errores y límites de la API de pey
- `pey/12-recursos-de-marca.md` — Recursos de marca de pey y CoDi
- `pey/13-registro-de-cambios.md` — Registro de cambios de la API de pey
- `pey/14-tutoriales-paso-a-paso.md` — Tutoriales oficiales de pey, paso a paso
- `codi/README.md` — CoDi® (Cobro Digital de Banco de México) en Markdown
- `codi/01-que-es-codi.md` — 01 · Qué es CoDi y para qué sirve
- `codi/02-como-funciona.md` — 02 · Cómo funciona CoDi
- `codi/03-actores-y-participantes.md` — 03 · Actores y participantes
- `codi/04-como-paga-y-cobra-una-persona.md` — 04 · Cómo paga (y cómo cobra) una persona, paso a paso
- `codi/05-seguridad-y-proteccion.md` — 05 · Seguridad y protección del usuario
- `codi/06-regulacion-y-plazos.md` — 06 · Regulación y plazos
- `codi/07-cifras-de-uso.md` — 07 · Cifras de uso de CoDi (con fecha)
- `codi/08-preguntas-frecuentes.md` — 08 · Preguntas frecuentes
- `codi/09-marca-logotipos-y-material.md` — 09 · Marca, logotipos y material de difusión
- `codi/10-codi-spei-dimo.md` — 10 · CoDi, SPEI y DiMo comparados
- `codi/11-como-encaja-pey.md` — 11 · Cómo encaja pey
- `AGENTS.md` — AGENTS.md

<!-- ===== INICIO: conocimiento/INDICE.md ===== -->

# Índice de la base de conocimiento

> Generado por `scripts/construir_indice.py` el 2026-11-14. No lo edites a mano.

## Cómo usar este índice (agentes y personas)
1. Busca tu pregunta en **Preguntas → archivo** o el tema en **Archivos**.
2. Abre solo el archivo o la sección que necesitas. Cada sección tiene un ID (`K03.4`) para citarla.
3. ⚪ = dato no verificado: confírmalo antes de usarlo en código o en el pitch.
4. ¿Necesitas todo de una vez (por ejemplo, en ChatGPT)? Abre [`TODO-EN-UNO.md`](TODO-EN-UNO.md).
5. De dónde sale cada dato: la tabla "## Fuentes" de cada archivo; en `pey/` y `codi/`, la línea "Fuente:" al pie de cada sección.

## Archivos
| ID | Archivo | Qué cubre | Confianza | Marcas ⚪ |
|---|---|---|---|---|
| **K01** | [Hackatón México y el ecosistema de pey: qué se sabe del reto y qué buscan pey y sus aliados](01-hackaton-mexico-y-ecosistema-pey.md) | Lo que se sabía al 7-nov-2026 del Hackatón México (14 nov–12 dic) y de quién lo organiza; qué es pey, por qué abrió su API y qué éxito busca; qué busca AI Builders México; por qué CoDi no ha despegado; qué conquista, qué aleja y qué falta preguntar. Léelo antes de elegir la idea. | media | 8 |
| **K02** | [Ley de pagos digitales y plazo bancario del 14-dic-2026: qué dicen y qué no se puede afirmar](02-ley-pagos-digitales-y-plazo-14-dic.md) | La Ley de Economía Digital para Pagos Digitales y Electrónicos (decreto del 4-nov-2026) en lo esencial: qué es, transitorios, qué no obliga y lo que no se puede afirmar. Además, el plazo distinto del 14-dic-2026 de las Circulares 9/2026 y 10/2026 de Banxico. Léelo antes de mencionar la ley en el producto o en el pitch. | media | 3 |
| **K03** | [CoDi y API de Pey](03-codi-y-api-pey.md) | Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos de referencia en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro. | media | 23 |
| **K04** | [Contexto: pagos, comercios y personas en México](04-contexto-pagos-y-comercios-mx.md) | Cifras verificadas (INEGI, Banxico, DOF, Condusef y prensa seria) sobre efectivo, informalidad, costo de cobrar con tarjeta, uso real de CoDi, lo que cambia el 14-dic-2026, fraude, brecha digital y la CDMX; léelo al definir problema, 'por qué ahora', personas y datos del pitch. | media | 19 |

## Preguntas → archivo
| Pregunta | Abre |
|---|---|
| ¿Qué es el Hackatón México, cuándo es y quién lo organiza? | K01 |
| ¿Qué es pey, qué ofrece y qué éxito busca con su API abierta? | K01 |
| ¿Qué buscan AI Builders México y SpaceXAI? | K01 |
| ¿Por qué CoDi importa y por qué no ha despegado? | K01 |
| ¿Qué conquista a pey y a los organizadores, y qué los aleja? | K01 |
| ¿Qué falta confirmar con pey y con los organizadores? | K01 |
| ¿Qué es la Ley de Economía Digital para Pagos Digitales y Electrónicos y desde cuándo rige? | K02 |
| ¿La ley obliga a los comercios a aceptar QR o pagos digitales? | K02 |
| ¿Qué pasa el 14 de diciembre de 2026 y en qué se distingue de la ley? | K02 |
| ¿Qué se puede decir de la ley en un pitch sin equivocarse? | K02 |
| ¿Qué es CoDi y cómo paga un cliente con QR o con notificación? | K03 |
| ¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero? | K03 |
| ¿Cómo saco hoy una API key de Pey y cuánto tarda en activarse? | K03 |
| ¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi? | K03 |
| ¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app? | K03 |
| ¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces? | K03 |
| ¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B? | K03 |
| ¿Qué errores y límites debo manejar? | K03 |
| ¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos? | K03 |
| ¿Qué tan dominante es el efectivo en México y hacia dónde va? | K04 |
| ¿Qué tan grande es la informalidad y cuántos negocios son micro? | K04 |
| ¿Cuánto le cuesta a un comercio pequeño cobrar con tarjeta frente a CoDi? | K04 |
| ¿Cuánto se usa CoDi realmente y por qué no despegó? | K04 |
| ¿Qué cambia exactamente el 14 de diciembre de 2026 y qué es la Ley de Economía Digital? | K04 |
| ¿Qué fraudes frenan los pagos digitales y cómo diseñar confianza en un producto? | K04 |
| ¿Qué barreras digitales tienen las personas mayores y qué canal conviene usar? | K04 |
| ¿Qué datos de la CDMX (mercados, tianguis, personas mayores, programas) sirven al producto? | K04 |
| ¿Qué personas, datos y oportunidades de IA + CoDi usar en el pitch? | K04 |

## Secciones de cada archivo

### K01 · Hackatón México y el ecosistema de pey: qué se sabe del reto y qué buscan pey y sus aliados
Archivo: [`01-hackaton-mexico-y-ecosistema-pey.md`](01-hackaton-mexico-y-ecosistema-pey.md)

- `K01.1` Hackatón México: lo que se sabe (al 7-nov-2026)
- `K01.2` Quién organiza: AI Builders México y SpaceXAI
- `K01.3` pey: empresa, API y qué éxito busca
- `K01.4` Por qué CoDi importa y por qué no ha despegado
- `K01.5` Lo que conquista
- `K01.6` Lo que aleja
- `K01.7` Preguntas abiertas (⚪)

### K02 · Ley de pagos digitales y plazo bancario del 14-dic-2026: qué dicen y qué no se puede afirmar
Archivo: [`02-ley-pagos-digitales-y-plazo-14-dic.md`](02-ley-pagos-digitales-y-plazo-14-dic.md)

- `K02.1` Qué es la ley
- `K02.2` Fechas y transitorios
- `K02.3` Qué dice para comercios, gobierno y QR
- `K02.4` Lo que NO se puede afirmar
- `K02.5` El otro plazo: 14-dic-2026 (Banxico, no esta ley)
- `K02.6` Cómo usarla en el producto y el pitch

### K03 · CoDi y API de Pey
Archivo: [`03-codi-y-api-pey.md`](03-codi-y-api-pey.md)

- `K03.1` Qué es CoDi y cómo paga un cliente
- `K03.2` Qué es Pey y su API CoDi
- `K03.3` Alta y llaves
- `K03.4` Endpoints, formato del QR y estados
- `K03.5` Webhooks
- `K03.6` Desarrollo vs producción: demo con pago real y plan B
- `K03.7` Ejemplos mínimos en Node.js 20+ (de referencia)
- `K03.8` Errores comunes y límites
- `K03.9` La API como herramienta de un agente de IA
- `K03.10` Documentación completa de pey (carpeta `pey/`)

### K04 · Contexto: pagos, comercios y personas en México
Archivo: [`04-contexto-pagos-y-comercios-mx.md`](04-contexto-pagos-y-comercios-mx.md)

- `K04.1` Efectivo vs. pagos digitales en México
- `K04.2` Economía informal y micronegocios
- `K04.3` Costo de cobrar con tarjeta para un comercio pequeño
- `K04.4` CoDi: adopción real y por qué no despegó
- `K04.5` Qué cambia el 14 de diciembre de 2026
- `K04.6` Fraude y desconfianza
- `K04.7` Brecha digital: personas mayores, voz y WhatsApp
- `K04.8` Contexto local: CDMX
- `K04.9` Personas (situaciones típicas; personas ficticias)
- `K04.10` Diez datos para el pitch
- `K04.11` Oportunidades donde IA + CoDi resuelven algo real

<!-- ===== FIN: conocimiento/INDICE.md ===== -->

<!-- ===== INICIO: conocimiento/01-hackaton-mexico-y-ecosistema-pey.md ===== -->

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

<!-- ===== FIN: conocimiento/01-hackaton-mexico-y-ecosistema-pey.md ===== -->

<!-- ===== INICIO: conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md ===== -->

---
id: K02
titulo: "Ley de pagos digitales y plazo bancario del 14-dic-2026: qué dicen y qué no se puede afirmar"
resumen: "La Ley de Economía Digital para Pagos Digitales y Electrónicos (decreto del 4-nov-2026) en lo esencial: qué es, transitorios, qué no obliga y lo que no se puede afirmar. Además, el plazo distinto del 14-dic-2026 de las Circulares 9/2026 y 10/2026 de Banxico. Léelo antes de mencionar la ley en el producto o en el pitch."
responde:
  - "¿Qué es la Ley de Economía Digital para Pagos Digitales y Electrónicos y desde cuándo rige?"
  - "¿La ley obliga a los comercios a aceptar QR o pagos digitales?"
  - "¿Qué pasa el 14 de diciembre de 2026 y en qué se distingue de la ley?"
  - "¿Qué se puede decir de la ley en un pitch sin equivocarse?"
actualizado: 2026-11-14
confianza: media
fuentes: [SA43, SD01, SD02, SD64]
---

# K02 · Ley de pagos digitales y plazo del 14-dic

> Investigación previa al arranque. Las fuentes se leyeron el 2026-11-06 y el 2026-11-07 y **no se han reconsultado**. No es asesoría legal. El detalle de las circulares de Banxico está en [codi/06](../codi/06-regulacion-y-plazos.md).

## TL;DR

- La **Ley de Economía Digital para Pagos Digitales y Electrónicos** promueve que se adopten y usen los pagos digitales. El decreto se expidió el 4-nov-2026 y entra en vigor al día siguiente de su publicación en el DOF (⚪ fecha de publicación no verificada al 7-nov) [SD64].
- **No obliga hoy a ningún comercio.** El artículo 11 dice que los proveedores "podrán implementar" pagos digitales; la obligación de aceptar solo pagos digitales aplicará en los sectores que designe la SHCP (artículo 13), y la ley no nombra ninguno [SD64].
- **El 14-dic-2026 es otra cosa:** es el plazo de Banxico para que los participantes del SPEI homologuen las transferencias desde el celular, incluido procesar los mensajes de cobro CoDi (Circulares 9/2026 y 10/2026) [SD01][SD02][SA43].
- **Cómo usarla:** como ayuda para adoptar pagos digitales de forma voluntaria y prepararse antes de que se definan sectores y reglas. Sin prometer cumplimiento legal (K02.6).

## K02.1 · Qué es la ley

- Es la Ley de Economía Digital para Pagos Digitales y Electrónicos. Es de orden público, aplica en todo el país y su objeto es promover que se adopten y usen los medios de pago digitales y electrónicos [SD64].
- **No menciona** CoDi ni DiMo por nombre [SD64].

## K02.2 · Fechas y transitorios

- Las mesas directivas del Congreso firmaron el decreto el 20 de octubre de 2026 y la presidenta lo expidió el 4 de noviembre de 2026 [SD64].
- Entra en vigor al día siguiente de su publicación en el DOF. ⚪ La versión del SIDOF consultada el 7-nov no muestra la fecha de publicación, y tampoco la encontré en prensa [SD64].
- **Lo que sigue:** desde que entre en vigor, la SHCP tiene 15 días hábiles para determinar los sectores estratégicos y las actividades donde el pago digital podrá ser la única forma aceptada. Cuando publique esa determinación, las autoridades tienen otros 15 días hábiles para emitir reglas generales con condiciones y plazos de transición gradual [SD64].
- La ley no trae presupuesto adicional [SD64].

**Recomendación:** busca en el DOF la fecha de publicación y, si ya pasó, la determinación de sectores de la SHCP. Anótalas aquí con su fuente.

## K02.3 · Qué dice para comercios, gobierno y QR

- **Comercios y servicios:** el artículo 11 dice que los proveedores "podrán implementar" medios de pago digitales, así que no hay una obligación general. Aceptar solo pagos digitales será obligatorio únicamente en los sectores que designe la SHCP (artículo 13) [SD64].
- **Gobierno:** los tres órdenes de gobierno deben tomar medidas para aceptar pagos digitales en trámites y servicios (artículo 10) [SD64].
- **QR:** el artículo 19, fracción IV, faculta a Banxico, con la CNBV como supervisora, para emitir reglas que obliguen a quien ofrece terminales punto de venta a aceptar pagos con QR conforme a sus especificaciones. Es una facultad, no una regla ya emitida [SD64].
- **Contingencias:** se permite efectivo o cheque durante una contingencia (artículo 15), pero eso no exime para siempre (artículo 16) [SD64].

## K02.4 · Lo que NO se puede afirmar

- Que aceptar QR o pagos digitales ya es obligatorio para los comercios, o que lo será en una fecha concreta: depende de la SHCP y de reglas que todavía no existen [SD64].
- Que la ley rige desde una fecha concreta, mientras no se confirme su publicación en el DOF (⚪).
- Que exista una obligación general de QR en la CDMX el 19 de noviembre: esa fecha no aparece en el texto [SD64].
- Que "CoDi será obligatorio para los comercios": no lo dice esta ley ni las circulares de Banxico ([codi/06](../codi/06-regulacion-y-plazos.md)).

## K02.5 · El otro plazo: 14-dic-2026 (Banxico, no esta ley)

- El 14 de diciembre de 2026 vence el plazo para que los participantes del SPEI cumplan las Circulares 9/2026 y 10/2026 de Banxico, que homologan las transferencias desde el celular. La 9/2026 incluye procesar los mensajes de cobro de CoDi y fija ese plazo en su segundo transitorio [SD01][SD02].
- Según la prensa, antes de esa fecha los bancos deben permitir recibir transferencias con el número de celular, y la CLABE sigue funcionando [SA43].
- La 9/2026 ya rige desde el 18-jun-2026: el 14-dic es la fecha límite para cumplir, no la "entrada en vigor" [SD01]. Detalle por numeral, Guías de homologación y línea de tiempo: [codi/06](../codi/06-regulacion-y-plazos.md). Qué deberán tener todas las apps: K04.5.
- Ese mismo día salen los resultados del Hackatón México (K01.1).

## K02.6 · Cómo usarla en el producto y el pitch

- **Sí se puede decir:** "Antes del 14 de diciembre de 2026, los bancos deben homologar en sus apps el pago de mensajes de cobro CoDi y las transferencias por celular" (Circulares 9/2026 y 10/2026) [SD01][SD02].
- **Sí se puede decir:** la nueva ley promueve los pagos digitales, y la SHCP definirá los sectores donde serán la única forma aceptada [SD64].
- **No se puede decir:** que la ley ya obliga a los comercios a aceptar pagos digitales o QR (K02.4).

**Recomendación:** presenta el proyecto como una ayuda para adoptar pagos digitales de forma voluntaria y prepararse antes de que se definan sectores y reglas. Cita la ley por su nombre, apóyate en este archivo y no prometas cumplimiento legal.

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SA43 | ADN40: Nuevas reglas para transferencias bancarias; fecha límite 14 de diciembre | https://www.adn40.mx/mexico/2026-09-12/nuevas-reglas-para-hacer-transferencias-bancarias-en-mexico-la-fecha-limite-es-el-14-de-diciembre/ | 2026-11-06 |
| SD01 | DOF · Circular 9/2026 de Banxico (modifica la 14/2017; homologación de transferencias móviles) | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 | 2026-11-07 |
| SD02 | SIDOF · Circular 10/2026 de Banxico (modifica la 3/2012), DOF 17-jun-2026 | https://sidof.segob.gob.mx/notas/5790863 | 2026-11-06 (previo) |
| SD64 | DOF · Ley de Economía Digital: texto y transitorios | https://sidof.segob.gob.mx/notas/docFuente/5803017 | 2026-11-07 |

(previo) = dato verificado antes de la sesión del 6-nov y no reconsultado.

<!-- ===== FIN: conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md ===== -->

<!-- ===== INICIO: conocimiento/03-codi-y-api-pey.md ===== -->

---
id: K03
titulo: "CoDi y API de Pey"
resumen: "Qué es CoDi y cómo se usa la API CoDi de Pey (alta, llaves, endpoints, estados, webhooks, pagos reales de prueba, errores), con ejemplos de referencia en Node/Vercel y reglas para usarla desde un agente. Léelo completo antes de escribir código de cobro."
responde:
  - "¿Qué es CoDi y cómo paga un cliente con QR o con notificación?"
  - "¿Qué es Pey, cuánto cuesta su API CoDi y a dónde llega el dinero?"
  - "¿Cómo saco hoy una API key de Pey y cuánto tarda en activarse?"
  - "¿Cuál es la URL base, el header de autenticación y los campos para crear y consultar un cobro CoDi?"
  - "¿En qué formato llega el QR y cómo se mapean los estados de Pey a los de la app?"
  - "¿Cómo verifico la firma de los webhooks de Pey en una Vercel Function o en Codespaces?"
  - "¿Hay sandbox? ¿Cómo hago un pago real en la demo y cuál es el plan B?"
  - "¿Qué errores y límites debo manejar?"
  - "¿Cómo expongo la API de Pey como herramientas de un agente de IA sin riesgos?"
actualizado: 2026-11-07
confianza: media
fuentes: [SB01, SB02, SB03, SB04, SB05, SB06, SB07, SB08, SB09, SB10, SB11, SB12, SB13, SB14, SB15, SB16, SB17, SB18, SB19, SB20, SB21, SB22, SB23, SB24, SB25, SB26, SB27, SB28, SB29, SB30, SB31, SB32, SB33, SB34, SB35, SB36, SB37, SB38, SB39, SB40, SB41, SB42, SB43, SB44, SB45, SB46, SB47, SB48, SB49, SB50, SB51, SB52, SB53, SB54, SB55, SB56, SB57, SB58, SB59, SB60, SB61, SB62]
---

# K03 · CoDi y API de Pey

## TL;DR

- **CoDi** (Banxico) cobra con QR o con notificación al celular sobre SPEI, 24/7, sin comisión para quien paga ni para quien cobra; el cliente autoriza en la app de su banco [SB29][SB31].
- **API de Pey**: REST en `https://api.pey.mx`, el único entorno documentado (producción), con `Authorization: Bearer <API key>`; gratuita por ahora, self-service, y el dinero llega directo a la cuenta bancaria del comercio [SB01][SB10][SB38].
- **Alta**: portal.mipey.mx → Finanzas (cuenta `codi`) → Desarrollador → "Crear API Key". Tu CLABE tarda 5 días hábiles con Banxico; para probar ya, registra la cuenta de prueba publicada en la guía: se activa al instante, pero lo que le pagues NO se devuelve (usa $0.01 a $1) [SB07].
- **Flujo de demo**: `POST /codi/qr` (monto en pesos) con `generateImage: true` → muestras `qrImage` (PNG en base64) → confirmas con `GET /transaction/codi/qr/{id}` (`PAID`) o con el webhook `codi.qr.payment_received` [SB10][SB17].
- **Webhooks**: firmados con Standard Webhooks (HMAC-SHA256 sobre `id.timestamp.cuerpo`), uno por API key; regístralo como `<dominio de producción>/api/webhook-pey`, nunca con un preview [SB08][SB39][SB43].
- **Seguridad**: el repo es público, así que la llave y el secreto viven solo en variables de entorno del servidor; el agente propone, la persona confirma y el servidor impone `MAX_MONTO_MXN`.
- **Documentación completa de pey en Markdown** (11 endpoints, 4 webhooks, tipos, errores y marca; consultada el 2026-11-07): [pey/README.md](../pey/README.md) [SB47]. Ver K03.10.

## K03.1 · Qué es CoDi y cómo paga un cliente

CoDi® (Cobro Digital) es la plataforma de Banco de México para cobrar y pagar con transferencias desde el celular: corre sobre SPEI, opera 24/7, liquida de inmediato y no cobra comisión ni a quien paga ni a quien cobra [SB29][SB35]. El pagador autoriza cada operación, así que no hay contracargos [SB26].

**Canales.** QR (fijo en el negocio o generado por venta), NFC [SB26] y notificación al celular del pagador [SB30].

**Cómo paga el cliente con QR.** App de su banco → CoDi → pagar → escanea el QR o lo importa de la galería → escribe el monto si el QR no lo trae → autoriza con NIP, huella o token → ambos reciben confirmación [SB31]. El menú cambia por banco (en BBVA: "Pagar con CoDi") y permiten pagar BBVA, Santander, Banamex, Banorte, HSBC, Scotiabank, Banco Azteca e Inbursa, entre otros [SB33]. Nu, Mercado Pago y similares: ⚪ no verificado.

**Quién cobra.** Cualquiera con cuenta en un banco participante y app compatible, como la app CoDi Banxico [SB26][SB30]. Un software de terceros, como Pey, debe certificarse ante Banxico [SB27].

**Devoluciones.** Quien cobró puede devolver parcial o totalmente [SB28]; la API de Pey no tiene endpoint para eso (K03.4).

**Límites.** Cada banco fija su máximo; en 2019 Banxico pedía que no fuera menor a $8,000 MXN [SB32]. Desde el 23-feb-2026 los participantes del SPEI deben aceptar mensajes de cobro de hasta 6,000 UDIS (o más, si el banco quiere) y también sin monto, según la Circular 2/2025; detalle y fuentes en [`codi/02-como-funciona.md`](../codi/02-como-funciona.md).

**Contexto 2026 (pitch).** Los bancos deben homologar sus transferencias móviles, CoDi incluido, a más tardar el 14 de diciembre de 2026; además existe la cuenta "nivel 2 Bis", sin RFC, para micro y pequeños comercios [SB36][SB38].

## K03.2 · Qué es Pey y su API CoDi

Pey (pey®) es una empresa de tecnología enfocada en integrar CoDi a negocios [SB02]; el pie de su documentación dice Koshi SA de CV [SB24]. Afirma que Banxico aprobó su integración con CoDi [SB03], requisito para terceros desarrolladores [SB27].

**API CoDi.** Self-service, con cualquier banco y gratuita «por el momento» [SB01]: sin cuota ni cobro por solicitud [SB06], por condiciones comerciales vigentes, no permanentes [SB38]. El dinero llega directo a la cuenta bancaria del comercio, sin cuenta en Pey [SB37][SB38]; Banxico prohíbe cuentas concentradoras [SB27].

**Qué hace** [SB06][SB10]: QR CoDi; push CoDi a un celular; registro de CLABEs de personas o empresas para cobrar a nombre de cada una (`bankAccountId`); links de pago (CoDi, tarjetas, Apple Pay y Google Pay); consulta de transacciones.

**Otros productos.** App pey (iOS y Android) que reúne los pagos CoDi de cualquier banco y comparte la vista de cobros sin dar credenciales [SB04]; soluciones para restaurantes y boletera; portal de negocios [SB02][SB05].

**Sin documentar:** la comisión por tarjeta en links de pago (⚪ no verificado) y la visión de procesador para negocios informales, que viene de los organizadores (⚪ no verificado en pey.mx).

**Dato extra.** Pey co-organiza el "Hackatón México" (14 nov a 12 dic 2026), con más de un millón de pesos en premios y créditos [SB37]. Lo que se sabe del evento y de sus organizadores: K01.

**Recomendación:** ángulo multi-comercio: registra la CLABE de cada puesto (`POST /bank-account`, `entity: "PERSON"`) y cobra con su `bankAccountId`: sin comisión y con dinero directo. Pey lo resume: «ahora falta facilitar la experiencia de quien recibe el dinero» [SB37].

## K03.3 · Alta y llaves

Todo pasa en `portal.mipey.mx` [SB07][SB08]:

1. **Perfil.** Qué datos pide (correo, RFC, INE…): ⚪ no verificado. Ten tu CLABE a la mano.
2. **Finanzas → cuenta de pago `codi`** (solo cuentas mexicanas). Tu CLABE tarda 5 días hábiles en registrarse ante Banxico: no estará lista para el concurso. Mientras, registra la **cuenta de prueba** que publica la guía dentro del paso "2. Agrega una cuenta de pago"; la sección "Prueba en producción" solo la menciona y enlaza a ese paso [SB58]. Se activa de inmediato, pero lo que se le pague no se devuelve; usa montos como $0.01 MXN [SB07][SB58]. También hay registro por API: `POST /bank-account` [SB13].
3. **Desarrollador → "Crear API Key"**: nombre y cuenta vinculada (una `codi`; una `stripe` si quieres tarjetas) [SB07]. Si la llave se muestra una sola vez: ⚪ no verificado; cópiala de inmediato.
4. **Webhook**: engrane de la llave → URL → crear; guarda el secreto de firma (rotable). Un webhook por llave [SB08].
5. **Secretos** en Vercel y Codespaces: `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`. Nunca en el repo.

**Entornos.** Pey solo documenta producción (`https://api.pey.mx`); el entorno de pruebas está "próximamente" [SB09][SB10]. La landing menciona llaves de prueba y de producción [SB01], pero la referencia técnica no (⚪ pregúntalo a Pey en el evento). Por eso no conviene una variable `PEY_ENV`: la URL base es siempre la de producción. **Recomendación:** lo que sí debe verse en pantalla es el modo de cobro (simulación, prueba con monto mínimo o cobro real), por ejemplo con una variable `MODO_PAGO`.

**Recomendación:** antes de la demo, activa CoDi en la app bancaria con la que pagarás (algunos bancos validan con un depósito de un centavo y un SMS) [SB34], paga $0.01 de punta a punta con el `curl` de abajo y graba la pantalla. Con la cuenta de prueba, pon en el servidor un tope de monto bajo (en pruebas, $0.01 a $1).

```bash
# Prueba de humo: crea un QR de 1 centavo. La llave sale de tu variable de entorno, nunca del repo.
curl -sS https://api.pey.mx/codi/qr \
  -H "Authorization: Bearer $PEY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"amount":0.01,"concept":"Prueba hackaton","expiration":600,"numRef":"1","generateImage":false}'
# Esperado: HTTP 201 con {"id": "...", "qrString": "..."}. Convierte qrString en QR y págalo desde tu app.
```

## K03.4 · Endpoints, formato del QR y estados

Base `https://api.pey.mx`; headers `Authorization: Bearer <PEY_API_KEY>`, `Content-Type: application/json` y `Accept: application/json` [SB10][SB23]. Los esquemas completos están en el OpenAPI (`docs.pey.mx/openapi.json`, versión 2026-10-20), no en las páginas de referencia [SB10][SB11][SB12]. El 2026-11-07 seguía la misma versión, con 11 rutas en 5 grupos [SB10][SB57]; campo por campo en [pey/03](../pey/03-referencia-api-convenciones.md).

| Método y ruta | Uso | Éxito |
|---|---|---|
| `POST /codi/qr` | Crear QR | 201 |
| `POST /codi/pn` | Push a un celular | 200 |
| `GET /transaction/codi/qr/{id}` | Pagos de un QR (20/página) | 200 |
| `GET /transaction/{id}` | Una transacción | 200 |
| `GET /transaction/api-key` | Todo lo cobrado (80/página) | 200 |
| `GET /transaction/bank-account/{id}` | Pagos `PAID` de una cuenta registrada (80/página) | 200 |
| `POST /bank-account`, `GET /bank-account/{id}` | CLABEs | 200 |
| `POST /payment-link/create`, `/update`, `GET /payment-link/{id}` | Links de pago | 200 |

**Monto:** pesos como número con decimales (150.00, 0.01), no centavos [SB07][SB10].

**Revisión 2026-11-07:** `GET /transaction/bank-account/{id}` regresa solo pagos `PAID` de QR y push creados con ese `bankAccountId`, de la más reciente a la más antigua; cuenta ajena o inexistente → 404 `BANK_ACCOUNT_NOT_FOUND` [SB10][SB48]. `GET /bank-account/{id}` también da 404 con cuentas de otra llave [SB50]; `codiStatus` va de `PENDING` a `PROCESSING` y a `ACTIVE` (o `ERROR`, con `errorMessage`) [SB51]. `GET /transaction/api-key` toma la llave del header `Authorization` [SB49]. En transacciones, `amountBreakdown.fee` lo paga quien paga y `payableType` vale `PAYMENT_LINK`, `API_CODI_QR` o `API_CODI_PN` [SB10]; `applicationFee` es la comisión que retiene pey y puede ser `null` [SB52].

**QR:** la respuesta trae `id` (IDC de Banxico), `qrString` y, con `generateImage: true`, `qrImage` (PNG base64; puede tardar o venir `null`). Muéstralo como `data:image/png;base64,…`; si es `null`, convierte `qrString` en QR con una librería [SB10][SB23]. Pey no regresa el vencimiento: calcúlalo con `expiration` [SB10].

**Estados:** un QR no es una transacción; sus pagos salen de `GET /transaction/codi/qr/{id}`, cada uno con `status` `PENDING` o `PAID` y los campos del bloque de abajo [SB10][SB14][SB15][SB21][SB22]. Una push se sigue con su `transactionId` en `GET /transaction/{id}` [SB10].

| Respuesta de Pey | Estado sugerido |
|---|---|
| `PAID` vinculado al cobro, con monto esperado y moneda MXN | `pagado`; validar del lado servidor |
| Lista vacía o solo `PENDING` | `pendiente` |
| 404 `NOT_FOUND` | `no_verificable` + aviso visible: según la doc, el QR no existe o es de **otra llave** [SB15]. Causa típica: un QR de respaldo creado con una llave distinta a la de Production |
| Pasó `expiraEn` sin `PAID` | `expirado` (lo calcula la app) |

**Cancelar o devolver:** no hay endpoint (⚪ no verificado si hay otra vía); usa `expiration` corta y devuelve desde la app bancaria del titular [SB10][SB28].

```jsonc
// POST /codi/qr: cuerpo (ejemplo propio con los campos del OpenAPI)
{
  "amount": 25.5,            // pesos MXN, obligatorio, >= 0; 0 = el cliente escribe el monto
  "concept": "2 tacos",      // lo ve el cliente en su app
  "expiration": 600,         // segundos; 0 = no vence (default); si se usa, mínimo 360
  "numRef": "1234",          // 1 a 7 dígitos; default "0"
  "generateImage": true,     // default false; agrega qrImage
  "bankAccountId": "01J...", // opcional: cuenta registrada y ACTIVE; sin él usa la cuenta codi de la llave
  "metadata": { "pedidoId": "A-17" } // hasta 50 claves; clave <= 40 y valor <= 500 caracteres; regresan como texto
}
// Respuesta 201
{ "id": "<IDC asignado por Banxico>", "qrString": "<texto a convertir en QR>", "qrImage": "<base64 PNG o null>" }

// GET /transaction/codi/qr/{id}: respuesta 200 (cada item es un objeto transacción)
{ "items": [ { "id": "<ULID>", "status": "PAID", "amount": 25.5, "currency": "MXN", "paymentMethod": "CODI",
               "amountBreakdown": { "base": 25.5, "tip": 0, "fee": 0 }, "dateCreated": 1794000000,
               "datePaid": 1794000060, "metadata": { "trackingKey": "...", "externalMetadata": { "pedidoId": "A-17" } } } ],
  "nextToken": null }

// POST /codi/pn: cuerpo (amount > 0 y <= 1,000,000; phoneNumber de 10 dígitos; expiration >= 360, default 360)
{ "amount": 25.5, "phoneNumber": "5500000000", "concept": "2 tacos", "expiration": 360, "numRef": "1234" }
// Respuesta 200
{ "transactionId": "<ULID para seguir el pago>", "codiId": "<folio CoDi de 20 dígitos>" }

// Errores 4xx/5xx (todas las rutas)
{ "error": { "message": "...", "type": "INVALID_AMOUNT", "requestId": "..." } }
```

## K03.5 · Webhooks

**Eventos** (payload plano con `type`; no hay eventos documentados de pago rechazado o vencido) [SB17][SB18][SB19][SB20]:
- `codi.qr.payment_received`: `amount`, `apiKeyId`, `bankAccountId` (si lo mandaste), `codiQrId` (el `id` del QR), `concept`, `datePaid` (Unix en segundos), `metadata`, `numRef`, `transactionId` y `type`.
- `codi.pn.payment_received`: igual, sin `codiQrId`.
- `bank.account.updated`: solo al pasar a `ACTIVE`; trae `bankAccountId`, `name`, `ownerType` (`API_KEY`), `ownerId`, `taxId` (opcional), `codiStatus`, `clabe` y `entity`, sin `alias` ni `dateCreated` [SB19].
- `payment_link.status_updated`: `apiKeyId`, `paymentLinkId`, `status`, `clientReferenceId` y `transactions`. El webhook documenta `status` `paid`, `pending` o `processing`; `GET /payment-link/{id}` además admite `partial` (⚪ significado no documentado) [SB20][SB55].

**Firma.** Standard Webhooks [SB08][SB16]: headers `webhook-id`, `webhook-timestamp` y `webhook-signature` (`v1,<base64>`, quizá varias separadas por espacio) [SB06][SB39]. Se firma `id.timestamp.cuerpo` con HMAC-SHA256; la llave es el secreto sin `whsec_`, decodificado de base64 [SB39][SB40]. Compara en tiempo constante y rechaza timestamps viejos (la especificación no fija tolerancia; **Recomendación:** 5 minutos) [SB39]. Lee el cuerpo crudo con `await request.text()` [SB42].

**Respuesta.** Cualquier 2xx es entrega exitosa [SB39]; el ejemplo de Pey responde 200 [SB16]. pey llama a `webhook-id` llave de idempotencia y su ejemplo responde 500 ante firma inválida (aquí se usa 401; ambos cuentan como entrega fallida) [SB16][SB39]. Reintentos y timeout de Pey: ⚪ no verificado. Deduplica por `webhook-id`; depura en Desarrollador → engrane → "Webhook Logs" [SB16].

**URL pública.**
- Vercel: `https://<proyecto>.vercel.app/api/webhook-pey` [SB41], siempre con el dominio de producción: la protección estándar bloquea previews y URLs de deployment [SB43].
- Codespaces: PORTS → clic derecho → Port Visibility → Public (o `gh codespace ports visibility <puerto>:public`); URL `https://<codespace>-<puerto>.app.github.dev`. Un puerto privado exige token y Pey no entraría [SB44].
- Un webhook por llave: al cambiar de Codespaces a Vercel, edita la URL en el portal [SB08].

Código del handler: K03.7.

## K03.6 · Desarrollo vs producción: demo con pago real y plan B

**No hay sandbox:** Pey recomienda probar en producción, con bancos y webhooks reales, montos como $0.01 MXN [SB07][SB09]; no documenta simulador de pagos (⚪ no verificado).

**Guion de pago real (Recomendación):**
1. Antes de la demo: CoDi activo en tu app bancaria [SB33], un pago de $0.01 de punta a punta y video de la pantalla.
2. Demo: QR de $1 con `expiration: 600`, en grande; pagas desde tu celular; la UI pasa a "Pagado" por polling o webhook.
3. Con la cuenta de prueba ese dinero no regresa [SB07]; di en el pitch que en producción cae directo en la CLABE del comercio [SB38].
4. Prefiere QR: la push depende de que el celular del pagador esté ligado a CoDi [SB28][SB30] (⚪ no verificado en detalle).
5. UI: usa los archivos oficiales de "Recursos de marca": `pey_codi_light.svg` en fondo claro, `pey_codi_dark.svg` en fondo oscuro y `loading_codi.gif` ("Animación de pago CoDi") mientras esperas el pago [SB25]. La única regla publicada es descargarlos en vez de recrearlos. Ni la página en español ni la inglesa publican colores, tipografía, área de respeto, tamaño mínimo o usos prohibidos, así que no inventes un color de marca (⚪) [SB25][SB62]. Detalle y guía propia: [pey/12](../pey/12-recursos-de-marca.md).

**Plan B escalonado:**
- **B1, no llega el webhook:** polling a `GET /transaction/codi/qr/{id}` cada 2 a 5 s mientras el QR siga vigente (límite de peticiones: ⚪ no verificado) [SB10][SB15].
- **B2, Pey da 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`) o falla la red:** QR de respaldo creado antes de la demo con `expiration: 0` (no vence) y el video [SB10]; no subas ese QR al repo.
- **B3, todo falla:** modo SIMULACIÓN con la etiqueta visible que exige AGENTS.md, nunca presentado como pago real. El script firmado de K03.7 prueba tu webhook sin pagar.

**Recomendación:** pregunta a los mentores de Pey si hay llaves o entorno especial para el hackatón (⚪ no verificado). La documentación del 2026-11-07 tampoco resuelve límite de peticiones, idempotencia de creación, reintentos y orden de webhooks ni requisitos para dar de alta comercios reales: pregúntalos también [SB10][SB16].

## K03.7 · Ejemplos mínimos en Node.js 20+ (de referencia)

> Revisión 2026-11-07: estos ejemplos no son un checkout completo. Antes de producción, asociar el QR a un pedido del servidor y validar monto, moneda y destinatario; no basta encontrar cualquier PAID. Tratar un 404 como `no_verificable` es una decisión documental: no se ha ejecutado como aplicación. Si hay efectos de negocio, deduplica `webhook-id` y `transactionId` en almacenamiento persistente (la memoria de una función serverless no dura) y no repitas una creación tras un timeout sin reconciliar: pey no documenta idempotencia (⚪).

Node 20+ ya trae `fetch`. Vercel crea una función por archivo dentro de `api/`; exportas `GET` o `POST`, que reciben un `Request` web. Para módulos ES usa `.mjs` o `"type": "module"` en el `package.json` más cercano [SB41]. No encontré un SDK oficial de Pey (⚪ no verificado). Pey sugiere los SDK de Standard Webhooks [SB16]; aquí se usa `node:crypto` para no depender de nada [SB40].

Las rutas son de ejemplo (`app/` como raíz del proyecto en Vercel): adáptalas a la estructura que elija el proyecto. Si el proyecto ya tiene helpers de respuesta y configuración, úsalos en lugar de los de aquí. La UI no necesita base de datos: hace polling a `/api/estado?id=…`, que consulta a Pey. El webhook sirve para bitácora o automatizaciones.

⚪ Estos ejemplos todavía no se han ejecutado en este repo. Al copiarlos al proyecto, corre primero sus pruebas (el extracto de abajo usa `fetch` simulado; para la firma, compara con el vector de ejemplo de Svix [SB40]) y solo después prueba con dinero real ($0.01 a $1, K03.3). Corre las pruebas con `node --test "app/tests/*.test.js"` o con `npm test --prefix app`.

```js
// app/api/_lib/pey.js: cliente mínimo de la API CoDi de Pey (Node.js 20+, ESM, sin dependencias).
// Necesita "type": "module" en app/package.json (o archivos .mjs). Campos según openapi.json 2026-10-20 (K03.4).
const BASE = "https://api.pey.mx"; // único entorno documentado (producción) (K03.3)
const MAX_MONTO = Number(process.env.MAX_MONTO_MXN ?? 500); // tope del producto (AGENTS.md), no es límite de Pey

export class PeyError extends Error {
  constructor(status, cuerpo) {
    super(cuerpo?.error?.message ?? `Pey respondió HTTP ${status}`);
    this.status = status;
    this.tipo = cuerpo?.error?.type;           // p. ej. INVALID_AMOUNT, INVALID_STATE, SERVICE_UNAVAILABLE
    this.requestId = cuerpo?.error?.requestId; // guárdalo para pedir soporte a Pey
  }
}

async function pey(ruta, { method = "GET", body } = {}) {
  if (!process.env.PEY_API_KEY) throw new Error("Falta la variable PEY_API_KEY");
  const res = await fetch(`${BASE}${ruta}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.PEY_API_KEY}`,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20_000), // generateImage puede hacer lenta la respuesta
  });
  const texto = await res.text();
  let datos = null;
  try { datos = texto ? JSON.parse(texto) : null; } catch { datos = { crudo: texto }; }
  if (!res.ok) throw new PeyError(res.status, datos);
  return datos;
}

/** Crea un QR CoDi. Monto en PESOS (número con decimales), no en centavos.
 *  Devuelve { id (IDC de Banxico), qrString, qrImage (base64 PNG o null) }. */
export async function crearCobroQR({ monto, concepto, referencia = "0", vigenciaSeg = 600, metadata = {} }) {
  if (!(Number.isFinite(monto) && monto > 0 && monto <= MAX_MONTO)) throw new Error(`El monto debe ser mayor que 0 y hasta ${MAX_MONTO} pesos`);
  if (!/^[0-9]{1,7}$/.test(referencia)) throw new Error("La referencia debe tener de 1 a 7 dígitos");
  if (!(vigenciaSeg === 0 || vigenciaSeg >= 360)) throw new Error("La vigencia debe ser 0 (no vence) o de al menos 360 s");
  return pey("/codi/qr", {
    method: "POST",
    body: {
      amount: Math.round(monto * 100) / 100,
      concept: String(concepto).slice(0, 40), // ⚪ Pey no documenta largo máximo; 40 es decisión propia
      expiration: vigenciaSeg,
      numRef: referencia,
      generateImage: true, // pide la imagen PNG en base64 (qrImage)
      metadata,            // regresa como metadata.externalMetadata, con valores convertidos a texto
    },
  });
}

/** Pagos de un QR (20 por página). Un QR no es una transacción: se consulta con su IDC. */
export function consultarCobrosDeQR(idc, nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/codi/qr/${encodeURIComponent(idc)}${qs}`);
}

/** Detalle de una transacción (ULID), p. ej. el transactionId de una notificación push. */
export const consultarTransaccion = (id) => pey(`/transaction/${encodeURIComponent(id)}`);

/** Todas las transacciones de tu llave: 80 por página, de la más reciente a la más antigua. */
export function listarTransacciones(nextToken) {
  const qs = nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : "";
  return pey(`/transaction/api-key${qs}`);
}

/** Convierte cualquier error en una respuesta en español, sin detalles internos ni secretos. */
export function respuestaDeError(e) {
  if (e instanceof PeyError) {
    console.error("Pey", e.status, e.tipo, e.requestId); // nunca registres la llave ni cuerpos completos
    // ⚪ Pey no documenta el código exacto de llave inválida; INVALID_STATE aparece como "CoDi no habilitado".
    const noHabilitada = e.status === 401 || e.status === 403 || e.tipo === "INVALID_STATE";
    const mensaje = noHabilitada
      ? "Tu cuenta de Pey todavía no está habilitada para cobrar."
      : "Pey no pudo procesar la solicitud. Intenta de nuevo.";
    return Response.json({ error: mensaje }, { status: e.status >= 500 ? 502 : 400 });
  }
  return Response.json({ error: e.message }, { status: 400 });
}
```

```js
// app/api/cobros.js: POST {monto, concepto} -> 201 con el QR. Vercel Function (Node.js, firma Web estándar).
import { crearCobroQR, respuestaDeError } from "./_lib/pey.js";

const VIGENCIA_SEG = 600; // 10 minutos

export async function POST(request) {
  try {
    const { monto, concepto } = await request.json();
    const qr = await crearCobroQR({ monto: Number(monto), concepto: concepto ?? "Cobro", vigenciaSeg: VIGENCIA_SEG });
    const ahora = Date.now();
    return Response.json({
      id: qr.id, // IDC de Banxico: con él se consulta el estado
      qrImage: qr.qrImage ? `data:image/png;base64,${qr.qrImage}` : null, // puede venir null
      qrString: qr.qrString, // respaldo: conviértelo en QR si no hubo imagen
      creadoEn: new Date(ahora).toISOString(),
      expiraEn: new Date(ahora + VIGENCIA_SEG * 1000).toISOString(), // Pey no regresa el vencimiento: se calcula
    }, { status: 201 });
  } catch (e) {
    return respuestaDeError(e);
  }
}
```

```js
// app/api/estado.js: GET ?id=<IDC> -> {id, estado: "pendiente" | "pagado"}. Pey es la fuente de verdad (sin BD).
import { consultarCobrosDeQR, PeyError, respuestaDeError } from "./_lib/pey.js";

export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Falta el id del cobro" }, { status: 400 });
  try {
    const { items = [] } = await consultarCobrosDeQR(id);
    const pago = items.find((t) => t.status === "PAID"); // estados de Pey: PENDING | PAID
    return Response.json({ id, estado: pago ? "pagado" : "pendiente", transactionId: pago?.id ?? null });
  } catch (e) {
    // 404 no demuestra falta de pago: mostrar no_verificable y revisar QR/llave [SB15].
    if (e instanceof PeyError && e.status === 404) {
      return Response.json({ id, estado: "no_verificable", transactionId: null, aviso: "qr_no_encontrado_con_esta_llave" });
    }
    return respuestaDeError(e);
  }
}
// "expirado" lo decide el navegador comparando la hora actual con expiraEn: Pey no tiene ese estado.
```

```js
// app/api/webhook-pey.js: eventos de Pey firmados con Standard Webhooks (HMAC-SHA256).
import crypto from "node:crypto";

const TOLERANCIA_SEG = 300; // decisión propia: la especificación no fija un valor

export function verificarFirma({ secreto, id, timestamp, firmas, cuerpo }) {
  if (!secreto || !id || !timestamp || !firmas) return false;
  const ts = Number(timestamp);
  if (!Number.isInteger(ts) || Math.abs(Date.now() / 1000 - ts) > TOLERANCIA_SEG) return false;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64"); // secreto sin prefijo, decodificado
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${timestamp}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    if (version !== "v1" || !b64) return false;
    const recibida = Buffer.from(b64, "base64");
    return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}

export async function POST(request) {
  const cuerpo = await request.text(); // cuerpo CRUDO: no lo parsees ni lo reformatees antes de verificar
  if (!cuerpo) return new Response("cuerpo vacío", { status: 400 });
  const ok = verificarFirma({
    secreto: process.env.PEY_WEBHOOK_SECRET,
    id: request.headers.get("webhook-id"),
    timestamp: request.headers.get("webhook-timestamp"), // ⚪ viene del estándar; Pey no lo muestra explícitamente
    firmas: request.headers.get("webhook-signature"),
    cuerpo,
  });
  if (!ok) return new Response("firma inválida", { status: 401 });

  let evento;
  try { evento = JSON.parse(cuerpo); } catch { return new Response("JSON inválido", { status: 400 }); }
  // Payload plano con "type". Registra solo identificadores, nunca el cuerpo completo ni datos personales.
  console.log("webhook", request.headers.get("webhook-id"), evento.type, evento.codiQrId ?? evento.transactionId ?? "");
  // Idempotente: aquí no se guarda nada (el estado se consulta en Pey); si algún día guardas, deduplica por webhook-id.
  return new Response("ok", { status: 200 }); // responde rápido: cualquier 2xx cuenta como entregado
}
```

```js
// scripts/simular-webhook.mjs: prueba TU endpoint con un evento falso firmado con TU secreto (solo desarrollo).
// Uso: PEY_WEBHOOK_SECRET=whsec_... node scripts/simular-webhook.mjs https://<tu-app>/api/webhook-pey <IDC>
import crypto from "node:crypto";

const [url, idc = "SIMULADO"] = process.argv.slice(2);
const secreto = process.env.PEY_WEBHOOK_SECRET;
if (!url || !secreto) throw new Error("Falta la URL o PEY_WEBHOOK_SECRET");

const ahora = Math.floor(Date.now() / 1000);
const cuerpo = JSON.stringify({
  type: "codi.qr.payment_received",
  amount: 1,
  codiQrId: idc,
  concept: "(SIMULACIÓN) demo",
  numRef: "1",
  datePaid: ahora,
  transactionId: `SIM${ahora}`,
  apiKeyId: "SIMULADO",
  metadata: { externalMetadata: { simulacion: "true" } },
});
const id = `msg_sim_${ahora}`;
const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
const firma = crypto.createHmac("sha256", llave).update(`${id}.${ahora}.${cuerpo}`).digest("base64");

const res = await fetch(url, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "webhook-id": id,
    "webhook-timestamp": String(ahora),
    "webhook-signature": `v1,${firma}`,
  },
  body: cuerpo,
});
console.log(res.status, await res.text());
```

```js
// app/tests/pey.test.js (extracto): fetch simulado + firma de webhooks. Corre con: npm test --prefix app
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

process.env.PEY_API_KEY = "llave_de_prueba";
process.env.PEY_WEBHOOK_SECRET = `whsec_${crypto.randomBytes(32).toString("base64")}`;
const respuestas = [];
globalThis.fetch = async () => { const r = respuestas.shift(); return new Response(JSON.stringify(r.body), { status: r.status }); };

const estado = await import("../api/estado.js");
const webhook = await import("../api/webhook-pey.js");

function firmar(cuerpo, secreto = process.env.PEY_WEBHOOK_SECRET, ts = Math.floor(Date.now() / 1000)) {
  const id = `msg_${crypto.randomUUID()}`;
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const firma = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest("base64");
  return { "webhook-id": id, "webhook-timestamp": String(ts), "webhook-signature": `v1,${firma}` };
}

test("estado: PAID → pagado; lista vacía → pendiente", async () => {
  respuestas.push({ status: 200, body: { items: [{ id: "01T", status: "PAID", amount: 1 }], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pagado");
  respuestas.push({ status: 200, body: { items: [], nextToken: null } });
  assert.equal((await (await estado.GET(new Request("http://x/api/estado?id=a1b2c3d4e5"))).json()).estado, "pendiente");
});

test("webhook: válido 200, repetido 200, firma ajena 401, sin firma 401, vacío 400", async () => {
  const cuerpo = JSON.stringify({ type: "codi.qr.payment_received", codiQrId: "a1b2c3d4e5", amount: 1, transactionId: "01T" });
  const h = firmar(cuerpo);
  const enviar = (headers, body = cuerpo) => webhook.POST(new Request("http://x/api/webhook-pey", { method: "POST", headers, body }));
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(h)).status, 200);
  assert.equal((await enviar(firmar(cuerpo, `whsec_${crypto.randomBytes(32).toString("base64")}`))).status, 401);
  assert.equal((await enviar({})).status, 401);
  assert.equal((await enviar(h, "")).status, 400);
});
```

## K03.8 · Errores comunes y límites

**Formato de error:** `{ "error": { "message", "type", "requestId" } }` [SB10]. Tipos:
- **400:** `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER` (o `INVALID_PARAMETERS` en transacciones), `INVALID_AMOUNT`, `INVALID_STATE` (p. ej. CoDi no habilitado), `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST`, `INVALID_CLABE`; en links de pago además `AUTH_ERROR`, `REQUEST_PARSING_ERROR`, `INVALID_URL`, `INVALID_HAS_TIP` e `INVALID_CLIENT_REFERENCE_ID` [SB10][SB53].
- **403** (links): `FORBIDDEN`, link de otra llave [SB54][SB55]. **404:** `NOT_FOUND`, `BANK_ACCOUNT_NOT_FOUND`. **409** (links): `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE` [SB54]. **500:** `INTERNAL_SERVER_ERROR`. **503:** `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`. Tabla por endpoint: [pey/11](../pey/11-errores-y-limites.md).
- Llave ausente o inválida: código ⚪ no verificado. Los ejemplos `authError` del OpenAPI dan 400 (`INVALID_REQUEST` en transacciones, "apiKeyId not included in request"; `AUTH_ERROR` en links); el 403 de los links es por un link ajeno, no por llave inválida [SB10][SB55]. **Recomendación:** trata 401, 403 e `INVALID_STATE` como "Tu cuenta de Pey todavía no está habilitada para cobrar." (así lo hace `respuestaDeError` de K03.7).

**Límites documentados** [SB10][SB08]: QR `amount` >= 0 sin máximo publicado; push `amount` > 0 y <= 1,000,000; `phoneNumber` de 10 dígitos; `expiration` 0 o >= 360 s (push: >= 360, default 360); `numRef` de 1 a 7 dígitos; `metadata` hasta 50 claves (40/500 caracteres); páginas de 80, o 20 en QR; un webhook por llave; `bankAccountId` solo `ACTIVE`. Links: `amount` > 0, `successUrl` y `backUrl` HTTPS, `clientReferenceId` <= 255 y monto editable solo en `pending` [SB10][SB54]. Cuentas: `alias` y `name` de 1 a 255 caracteres, `clabe` de 18 dígitos con dígito verificador válido y banco con CoDi habilitado [SB10][SB13]; una cuenta `codi` y una `stripe` por llave [SB07].

**No documentado (⚪ no verificado):** límite de peticiones, idempotencia, largo de `concept`, máximo por banco, qué ve el cliente con un QR vencido y reintentos de webhooks.

**Recomendaciones:**
- QR vencido: cuenta regresiva y QR nuevo.
- No reintentes a ciegas `POST /codi/qr` ni `/codi/pn` tras un timeout (la push llegaría dos veces); revisa antes `GET /transaction/api-key`. Deduplica webhooks por `webhook-id` [SB16] y pagos por `transactionId`.
- Ante 503, reintenta solo los GET, con espera creciente.
- Errores típicos: parsear antes de verificar la firma, webhook con URL de preview, puerto privado en Codespaces, `numRef` con letras, `expiration` de 60, montos en centavos.

## K03.9 · La API como herramienta de un agente de IA

En la Responses API cada herramienta lleva `type: "function"`, `name`, `description`, `parameters` (JSON Schema) y `strict` [SB45]. El modelo responde con items `function_call` (`call_id`, `name` y `arguments` como texto JSON) y tú devuelves un `function_call_output` con el mismo `call_id` [SB45]. Los ejemplos con `strict: true` listan todo en `required`, usan `additionalProperties: false` y modelan lo opcional con `["string", "null"]` [SB46]. Qué palabras clave se respetan en modo estricto: ⚪ no verificado; valida otra vez en el servidor. `crear_cobro` usa dos campos (`monto`, `concepto`). La herramienta solo propone: el servidor crea el QR hasta que la persona confirma.

**Reglas de seguridad (Recomendación):**
1. **Confirmación humana:** `crear_cobro` no cobra; devuelve una propuesta. Solo el botón "Confirmar" de la UI llama `POST /api/cobros`, fuera del control del modelo.
2. **Tope en el servidor:** `MAX_MONTO_MXN`, diga lo que diga el modelo.
3. **Llaves fuera del navegador:** todas las llamadas a Pey salen del servidor; nunca uses prefijos públicos como `NEXT_PUBLIC_` o `VITE_` para `PEY_API_KEY`.
4. **Texto no confiable:** el concepto, la metadata y los mensajes de clientes son datos, no instrucciones; nunca deben disparar herramientas.
5. **Verdad de pago:** el agente solo dice "pagado" si `consultar_cobro` lo confirma o llegó un webhook con firma válida.
6. **Bitácora:** registra cada llamada con `requestId`, sin datos personales, y limita llamadas por sesión.

```json
[
  {
    "type": "function",
    "name": "crear_cobro",
    "description": "Prepara un cobro CoDi con QR en pesos mexicanos. NO cobra: devuelve una propuesta que la persona debe confirmar en pantalla.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "monto": { "type": "number", "description": "Monto en pesos MXN, mayor que 0 y menor o igual al máximo configurado." },
        "concepto": { "type": "string", "description": "Concepto corto que verá quien paga, p. ej. '2 tacos al pastor'." }
      },
      "required": ["monto", "concepto"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "consultar_cobro",
    "description": "Dice si un cobro con QR ya fue pagado. Usa el id que regresó la creación del cobro.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "id": { "type": "string", "description": "Identificador del QR asignado por Banxico (campo id del cobro)." }
      },
      "required": ["id"],
      "additionalProperties": false
    }
  },
  {
    "type": "function",
    "name": "resumen_de_ventas",
    "description": "Resume los pagos recibidos (estado PAID) en un rango de fechas: total, número de pagos y ticket promedio.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "desde": { "type": "string", "description": "Fecha inicial YYYY-MM-DD, hora de Ciudad de México." },
        "hasta": { "type": "string", "description": "Fecha final YYYY-MM-DD, inclusive." },
        "metodo": { "type": ["string", "null"], "enum": ["CODI", "CARD", null], "description": "Filtra por método de pago; null = todos." }
      },
      "required": ["desde", "hasta", "metodo"],
      "additionalProperties": false
    }
  }
]
```

```js
// Fragmento para app/api/_lib/agente.js: ejecutor de herramientas (servidor; el modelo nunca ve PEY_API_KEY).
import { consultarCobrosDeQR, listarTransacciones, PeyError } from "./pey.js";

export async function resumenDeVentas({ desde, hasta, metodo = null }) {
  // CDMX usa UTC-6 todo el año desde 2022 (sin horario de verano).
  const ini = Date.parse(`${desde}T00:00:00-06:00`) / 1000;
  const fin = Date.parse(`${hasta}T23:59:59-06:00`) / 1000;
  if (!Number.isFinite(ini) || !Number.isFinite(fin) || ini > fin) throw new Error("Rango de fechas inválido");
  let total = 0, pagos = 0, nextToken = null, paginas = 0;
  do {
    const r = await listarTransacciones(nextToken ?? undefined);
    const items = r.items ?? [];
    for (const t of items) {
      const f = t.datePaid ?? t.dateCreated;
      if (t.status !== "PAID" || f < ini || f > fin) continue;
      if (metodo && t.paymentMethod !== metodo) continue;
      total += t.amount;
      pagos += 1;
    }
    if (items.length && items.at(-1).dateCreated < ini) break; // vienen de la más reciente a la más antigua
    nextToken = r.nextToken;
  } while (nextToken && ++paginas < 20); // tope de seguridad: 20 páginas
  const r2 = (n) => Math.round(n * 100) / 100;
  return { desde, hasta, metodo, pagos, total_mxn: r2(total), ticket_promedio_mxn: pagos ? r2(total / pagos) : 0 };
}

export async function ejecutarHerramienta(nombre, args) {
  switch (nombre) {
    case "crear_cobro":
      // NO cobra. La UI muestra la propuesta con un botón "Confirmar"; solo ese botón llama POST /api/cobros,
      // y el servidor vuelve a validar el monto contra MAX_MONTO_MXN.
      return { estado: "requiere_confirmacion_humana", propuesta: { monto: args.monto, concepto: args.concepto } };
    case "consultar_cobro":
      try {
        const { items = [] } = await consultarCobrosDeQR(args.id);
        const pago = items.find((t) => t.status === "PAID");
        return pago ? { estado: "pagado", monto: pago.amount, transactionId: pago.id } : { estado: "pendiente" };
      } catch (e) {
        if (e instanceof PeyError && e.status === 404) return { estado: "no_verificable", aviso: "qr_no_encontrado_con_esta_llave" };
        throw e;
      }
    case "resumen_de_ventas":
      return resumenDeVentas(args);
    default:
      return { error: `Herramienta desconocida: ${nombre}` };
  }
}
// Devuelve cada resultado al modelo como {type: "function_call_output", call_id, output: JSON.stringify(resultado)}.
```

## K03.10 · Documentación completa de pey (carpeta `pey/`)

Toda la documentación pública de pey quedó en Markdown, con redacción propia, en [pey/README.md](../pey/README.md): las 37 URL del mapa del sitio [SB47], el OpenAPI completo (11 rutas) [SB10] y la página comercial [SB01], consultados el 2026-11-07. Úsala para campos, tipos, errores y ejemplos endpoint por endpoint; este archivo sigue siendo la síntesis con decisiones y código probado.

| Necesitas… | Archivo |
|---|---|
| Alta, llaves, cuenta de prueba y entornos | [pey/02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| QR y push | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Cuentas bancarias (multi-cuenta) | [pey/05](../pey/05-api-cuentas-bancarias.md) |
| Links de pago | [pey/06](../pey/06-api-ligas-de-pago.md) |
| Consultar pagos | [pey/07](../pey/07-api-transacciones.md) |
| Tipos y enumeraciones | [pey/08](../pey/08-tipos-de-datos.md) |
| Webhooks y sus campos | [pey/09](../pey/09-webhooks.md) |
| Errores y límites | [pey/11](../pey/11-errores-y-limites.md) |
| Logos y changelog | [pey/12](../pey/12-recursos-de-marca.md), [pey/13](../pey/13-registro-de-cambios.md) |
| Los 3 tutoriales oficiales en su orden (encabezados, avisos, valores del ejemplo) | [pey/14](../pey/14-tutoriales-paso-a-paso.md) |
| Lista práctica de lo que necesita el producto y lo que pey no tiene | [pey/README.md](../pey/README.md#lo-que-vamos-a-necesitar-para-el-producto) |

Fuentes revisadas por primera vez hoy: [SB48] a [SB57]. El changelog no tiene entradas generales ni política de versiones [SB56]; los tipos de transacción y de cuenta bancaria están en [SB51] y [SB52].

**Segunda pasada (2026-11-07).** Se abrieron una por una todas las páginas de Tutoriales, Referencia de la API, Registro de cambios y Recursos de marca. Resultados:
- Hay 3 tutoriales: "Crear una API key" y "Configurar webhooks" en Primeros pasos, y "Mostrar un QR CoDi" en Ejemplos [SB59].
- El changelog tiene solo 2 entradas: "Introducción", sin cambios, y "Cuentas bancarias". **Ninguna trae fecha**, ni en su página ni en la etiqueta "general", y el sitemap no tiene `lastmod` [SB60][SB61][SB47].
- La versión en inglés de Recursos de marca tiene los mismos 5 archivos y tampoco publica reglas [SB62].
- Corrección: la cuenta de prueba está en el paso 2 del tutorial, no en "Prueba en producción" (K03.3) [SB58].

## Fuentes

| ID | Título | URL | Consultado |
|---|---|---|---|
| SB01 | pey®: API CoDi® (página de producto) | https://pey.mx/api-codi | 2026-11-06 |
| SB02 | pey®: página de inicio | https://pey.mx/ | 2026-11-06 |
| SB03 | pey®: CoDi® | https://pey.mx/codi | 2026-11-06 |
| SB04 | pey®: Personas y PyMEs (app) | https://pey.mx/personas-pymes | 2026-11-06 |
| SB05 | pey®: Accede a pey® (app y portal de negocios) | https://pey.mx/acceso | 2026-11-06 |
| SB06 | Documentación de pey: inicio | https://docs.pey.mx | 2026-11-06 |
| SB07 | Documentación de pey: Crear una API key | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/ | 2026-11-06 |
| SB08 | Documentación de pey: Configurar webhooks | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/ | 2026-11-06 |
| SB09 | Documentación de pey: CoDi API, introducción | https://docs.pey.mx/docs/api/codi-api | 2026-11-06 |
| SB10 | CoDi API: especificación OpenAPI (versión 2026-10-20) | https://docs.pey.mx/openapi.json | 2026-11-06 |
| SB11 | Documentación de pey: Create QR | https://docs.pey.mx/docs/api/create-qr | 2026-11-06 |
| SB12 | Documentación de pey: Create Push Notification | https://docs.pey.mx/docs/api/create-push-notification | 2026-11-06 |
| SB13 | Documentación de pey: Register Bank Account | https://docs.pey.mx/docs/api/register-bank-account | 2026-11-06 |
| SB14 | Documentación de pey: Get Transaction | https://docs.pey.mx/docs/api/get-transaction | 2026-11-06 |
| SB15 | Documentación de pey: Get CoDi QR Transactions | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 2026-11-06 |
| SB16 | Documentación de pey: Webhooks, introducción | https://docs.pey.mx/docs/webhooks/introduction | 2026-11-06 |
| SB17 | Documentación de pey: webhook CoDi QR, pago recibido | https://docs.pey.mx/docs/webhooks/codi/qr | 2026-11-06 |
| SB18 | Documentación de pey: webhook CoDi notificación push, pago recibido | https://docs.pey.mx/docs/webhooks/codi/pn | 2026-11-06 |
| SB19 | Documentación de pey: webhook cuenta bancaria actualizada | https://docs.pey.mx/docs/webhooks/bank-account/updated | 2026-11-06 |
| SB20 | Documentación de pey: webhook actualización de estado del link de pago | https://docs.pey.mx/docs/webhooks/payment-link/status-update | 2026-11-06 |
| SB21 | Documentación de pey: tipo Respuesta de metadata | https://docs.pey.mx/docs/types/metadata-response | 2026-11-06 |
| SB22 | Documentación de pey: tipo Desglose del monto | https://docs.pey.mx/docs/types/amount-breakdown | 2026-11-06 |
| SB23 | Documentación de pey: tutorial Mostrar un QR CoDi | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 2026-11-06 |
| SB24 | Documentación de pey: registro de cambios, Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | 2026-11-06 |
| SB25 | Documentación de pey: Recursos de marca | https://docs.pey.mx/brand-assets | 2026-11-06 |
| SB26 | Banco de México: CoDi, Cobro Digital | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html | 2026-11-06 |
| SB27 | Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (actualizada 2 may 2023) | https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf | 2026-11-06 |
| SB28 | CoDi (codi.org.mx): Preguntas frecuentes | https://www.codi.org.mx/secundarias/preguntas_frecuentes.html | 2026-11-06 |
| SB29 | CoDi (codi.org.mx): ¿Qué es CoDi®? | https://www.codi.org.mx/secundarias/que_es_codi.html | 2026-11-06 |
| SB30 | CoDi (codi.org.mx): CoDi® para cobrar | https://www.codi.org.mx/secundarias/cobrar.html | 2026-11-06 |
| SB31 | CoDi (codi.org.mx): CoDi® para pagar | https://www.codi.org.mx/secundarias/pagar.html | 2026-11-06 |
| SB32 | Xataka México: CoDi, la guía definitiva (2019) | https://www.xataka.com.mx/aplicaciones/codi-guia-definitiva-como-pagar-como-vender-que-no-solo-codigos-qr-que-bancos-participan-mexico | 2026-11-06 |
| SB33 | Expansión: cómo pagar con CoDi en BBVA, Santander y otros bancos (2026) | https://expansion.mx/finanzas-personales/2026/07/27/como-pagar-codi-bba-santander-bancos | 2026-11-06 |
| SB34 | Expansión: cobrar sin comisiones con CoDi (abril 2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SB35 | Publimetro: CoDi y DiMo mueven tu dinero desde tu celular (junio 2026) | https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/ | 2026-11-06 |
| SB36 | Bloomberg Línea: Banxico emite medidas para simplificar pagos digitales (junio 2026) | https://www.bloomberglinea.com/latinoamerica/mexico/banxico-emite-medidas-para-simplificar-pagos-digitales-y-ampliar-limite-en-cuentas-sin-registro-ante-el-sat/ | 2026-11-06 |
| SB37 | Merca2.0: Pey, AI Builders México y SpaceXAI realizarán hackatón de pagos digitales (noviembre 2026) | https://www.merca20.com/pey-ai-builders-mexico-y-spacexai-realizaran-hackaton-de-pagos-digitales-en-mexico/ | 2026-11-06 |
| SB38 | InformaBTL: el 14 de diciembre cambiarán las transferencias; Pey apuesta por pagos QR sin comisiones (noviembre 2026) | https://www.informabtl.com/pagos-qr-mexico-14-diciembre-2026-pey-codi/ | 2026-11-06 |
| SB39 | Standard Webhooks: especificación | https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md | 2026-11-06 |
| SB40 | Svix: Verifying Webhooks Manually | https://docs.svix.com/receiving/verifying-payloads/how-manual | 2026-11-06 |
| SB41 | Vercel: Using the Node.js Runtime with Vercel Functions | https://vercel.com/docs/functions/runtimes/node-js | 2026-11-06 |
| SB42 | Vercel KB: How do I get the raw body of a Serverless Function? | https://vercel.com/kb/guide/how-do-i-get-the-raw-body-of-a-serverless-function | 2026-11-06 |
| SB43 | Vercel: Deployment Protection | https://vercel.com/docs/deployment-protection | 2026-11-06 |
| SB44 | GitHub Docs: Forwarding ports in your codespace | https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace | 2026-11-06 |
| SB45 | OpenAI: Function calling | https://developers.openai.com/api/docs/guides/function-calling | 2026-11-06 |
| SB46 | OpenAI: Structured model outputs | https://developers.openai.com/api/docs/guides/structured-outputs | 2026-11-06 |
| SB47 | Documentación de pey: mapa del sitio (37 URL) | https://docs.pey.mx/sitemap.xml | 2026-11-07 |
| SB48 | Documentación de pey: Get Bank Account Transactions | https://docs.pey.mx/docs/api/get-bank-account-transactions | 2026-11-07 |
| SB49 | Documentación de pey: Get API Key Transactions | https://docs.pey.mx/docs/api/get-api-key-transactions | 2026-11-07 |
| SB50 | Documentación de pey: Get Bank Account | https://docs.pey.mx/docs/api/get-bank-account | 2026-11-07 |
| SB51 | Documentación de pey: tipo Cuenta bancaria | https://docs.pey.mx/docs/types/bank-account | 2026-11-07 |
| SB52 | Documentación de pey: tipo Objeto de transacción | https://docs.pey.mx/docs/types/transaction-object | 2026-11-07 |
| SB53 | Documentación de pey: Create Payment Link | https://docs.pey.mx/docs/api/create-payment-link | 2026-11-07 |
| SB54 | Documentación de pey: Update Payment Link | https://docs.pey.mx/docs/api/update-payment-link | 2026-11-07 |
| SB55 | Documentación de pey: Get Payment Link | https://docs.pey.mx/docs/api/get-payment-link | 2026-11-07 |
| SB56 | Documentación de pey: registro de cambios, introducción | https://docs.pey.mx/docs/changelog/introduction | 2026-11-07 |
| SB57 | Documentación de pey: Referencia de la API (categoría) | https://docs.pey.mx/docs/category/api-reference | 2026-11-07 |
| SB58 | Documentación de pey: Crear una API key, paso "2. Agrega una cuenta de pago" (cuenta de prueba) | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago | 2026-11-07 |
| SB59 | Documentación de pey: Tutoriales (categoría) | https://docs.pey.mx/docs/category/tutorials | 2026-11-07 |
| SB60 | Documentación de pey: Registro de cambios (categoría) | https://docs.pey.mx/docs/category/changelog | 2026-11-07 |
| SB61 | Documentación de pey: etiqueta "general" del registro de cambios | https://docs.pey.mx/docs/tags/general | 2026-11-07 |
| SB62 | Documentación de pey: Brand assets (versión en inglés de Recursos de marca) | https://docs.pey.mx/en/brand-assets | 2026-11-07 |

<!-- ===== FIN: conocimiento/03-codi-y-api-pey.md ===== -->

<!-- ===== INICIO: conocimiento/04-contexto-pagos-y-comercios-mx.md ===== -->

---
id: K04
titulo: "Contexto: pagos, comercios y personas en México"
resumen: "Cifras verificadas (INEGI, Banxico, DOF, Condusef y prensa seria) sobre efectivo, informalidad, costo de cobrar con tarjeta, uso real de CoDi, lo que cambia el 14-dic-2026, fraude, brecha digital y la CDMX; léelo al definir problema, 'por qué ahora', personas y datos del pitch."
responde:
  - "¿Qué tan dominante es el efectivo en México y hacia dónde va?"
  - "¿Qué tan grande es la informalidad y cuántos negocios son micro?"
  - "¿Cuánto le cuesta a un comercio pequeño cobrar con tarjeta frente a CoDi?"
  - "¿Cuánto se usa CoDi realmente y por qué no despegó?"
  - "¿Qué cambia exactamente el 14 de diciembre de 2026 y qué es la Ley de Economía Digital?"
  - "¿Qué fraudes frenan los pagos digitales y cómo diseñar confianza en un producto?"
  - "¿Qué barreras digitales tienen las personas mayores y qué canal conviene usar?"
  - "¿Qué datos de la CDMX (mercados, tianguis, personas mayores, programas) sirven al producto?"
  - "¿Qué personas, datos y oportunidades de IA + CoDi usar en el pitch?"
actualizado: 2026-11-07
confianza: media
fuentes: [SD01, SD02, SD03, SD04, SD05, SD06, SD07, SD08, SD09, SD10, SD11, SD12, SD13, SD14, SD15, SD16, SD17, SD18, SD19, SD20, SD21, SD22, SD23, SD24, SD25, SD26, SD27, SD28, SD29, SD30, SD31, SD32, SD33, SD34, SD35, SD36, SD37, SD38, SD39, SD40, SD41, SD42, SD43, SD44, SD45, SD46, SD47, SD48, SD49, SD53, SD54, SD55, SD56, SD57, SD58, SD59, SD60, SD61, SD62, SD63]
---

# K04 · Contexto: pagos, comercios y personas en México

## TL;DR
- **El efectivo manda en lo cotidiano:** ~85 % de los adultos usa sobre todo efectivo en compras de hasta $500 y solo 4.4 % usa transferencias o apps (2024) [SD10, SD18].
- **El mercado es informal y micro:** 54.3 % de las personas ocupadas (32.6 millones) es informal (sep-2026) [SD20]; 95.4 % de los negocios tiene de 0 a 10 personas (2023) [SD21].
- **Cobrar con tarjeta cuesta un porcentaje; CoDi no:** una miscelánea paga de 1.15 % a 3.95 % por cobro con débito, y con Clip 3.00–3.60 % (jul-2026) [SD24]; CoDi no cobra comisión y el dinero llega en segundos (2026) [SD31].
- **CoDi existe, pero casi no se usa:** 21.8 M cuentas validadas y solo 2.5 M han pagado alguna vez (sep-2025) [SD33]; 21.5 M operaciones en casi 7 años contra 833.5 M de SPEI en un solo mes (2026) [SD32, SD12].
- **Por qué ahora:** a más tardar el **14-dic-2026** todas las apps bancarias deben homologar sus transferencias (celular de 10 dígitos, resumen con nombre del beneficiario, comprobante con rastreo) y procesar los cobros CoDi con el mismo estándar [SD01, SD03, SD06]; además, el Congreso aprobó la Ley de Economía Digital (oct-2026) [SD10, SD11].
- **La confianza es el cuello de botella:** 2.48 M reclamaciones por posible fraude en un semestre (2025) [SD38] y 39 % no cree que su dinero esté seguro en el banco (2024) [SD18]. Gana el producto que confirma el pago real, entrega recibo y habla por WhatsApp o voz.

## K04.1 · Efectivo vs. pagos digitales en México
**Cuánto se usa el efectivo (ENIF 2024, INEGI-CNBV, publicada en marzo de 2025)**
- Compras de hasta $500: ~85 % de los adultos usa sobre todo efectivo (85.2 % según [SD10]; 85.3 % según [SD18]). Compras mayores a $500: 73.5 % [SD18].
- Transferencias o apps en compras de hasta $500: de 1.6 % (2021) a 4.4 % (2024) [SD10]. En compras mayores a $500 subieron 4.8 puntos frente a 2021 [SD16].
- 76.5 % de las personas de 18 a 70 años tiene algún producto financiero y 63.0 % una cuenta de ahorro formal; entre quienes tienen cuenta, el uso de app pasó de 54.3 % (2021) a 69.1 % (2024) [SD16].

**Por qué se prefiere el efectivo (Banxico, estudio de efectivo 2024, localidades de 50 mil habitantes o más)** [SD17]
- 91 % suele pagar sus gastos diarios en efectivo; solo 3 % usa pagos electrónicos o SPEI.
- Razones: es práctico y rápido (52 %), es el único medio que tienen (16 %), lo sienten más seguro (13 %).

**Tendencia**
- SPEI registró 833.5 millones de operaciones en septiembre de 2026, por ~21.6 billones de pesos (Banxico, citado por la prensa) [SD12].
- Una proyección de Banxico citada por la prensa indica que SPEI podría superar en volumen a los pagos con tarjeta a finales de 2026 [SD19].
- Meta de la política de inclusión financiera: pagos digitales en 50 % del gasto de consumo privado en 2030 [SD61].

**Recomendación (lectura para el pitch):** la gente ya se transfiere dinero entre personas; el "último metro" (pagar en el puesto, la fonda o al prestador de servicios) sigue en efectivo.

## K04.2 · Economía informal y micronegocios
**Informalidad laboral (ENOE, INEGI, septiembre de 2026; publicada el 22-oct-2026)** [SD20]
- Tasa de informalidad laboral (TIL1): **54.3 %** de la población ocupada, es decir, **32.6 millones** de personas.
- Ocupación en el sector informal (negocios de los hogares sin registro): 17.6 millones (29.4 %).
- Población ocupada: 60.0 millones; desocupación: 2.8 %.

**Micronegocios (Censos Económicos 2024, INEGI; dato 2023)**
- País: 7,093,631 establecimientos y 36.6 millones de personas ocupadas. Los micro (0 a 10 personas) son **95.4 %** de las unidades y 41.4 % del empleo del sector privado [SD21].
- Solo 1.44 millones de unidades usaron internet en su actividad (≈26 % si la base son 5.47 millones de unidades; cálculo propio, ⚪ INEGI no indica la base) [SD21].
- CDMX: 456,102 establecimientos; los micro son 93.4 % de las unidades y 26.1 % del empleo [SD22]. El comercio al por menor es 48.4 % de las unidades (205,511) [SD23]. Coyoacán concentra 5.3 % de las unidades de la ciudad (≈22,500, cálculo propio) [SD23].
- La Asociación de Bancos de México (ABM) ubica a los micronegocios en 95.5 % de las empresas y 41.5 % del empleo (2026) [SD37].

**Implicaciones**
- Para quien no está inscrito en el SAT, la nueva cuenta Nivel 2 Bis (sin RFC; ver K04.5) baja la barrera para recibir pagos digitales [SD09].
- El segmento coincide con la visión de Pey de procesar pagos de negocios informales (contexto del evento; ⚪ no verificado de forma externa).

**Recomendación:** frente a usuarios y jueces, hablar de "negocios de barrio" o "changarros" en lugar de "informales", porque "informal" puede sonar a ilegal.

## K04.3 · Costo de cobrar con tarjeta para un comercio pequeño
**Tasa de descuento** (lo que paga el comercio por cada venta; Banxico la publica por giro)
- Miscelánea con **débito**, julio de 2026: de **1.15 %** a **3.95 %** según el adquirente; Clip 3.00–3.60 %; varios agregadores 3.50 % [SD24, SD25]. ⚪ No verifiqué si incluyen IVA.
- Con **crédito** (tabla por giro; ⚪ periodo no indicado, archivo de 2025; confianza media): restaurantes 2.55–5.84 %; misceláneas 2.29–3.60 % [SD63].
- Ejemplo comercial: Clip anuncia 3.6 % + IVA por cobro, dinero disponible a partir de 24 horas y sin renta mensual (jul-2026) [SD26]. Cálculo propio: vender $1,000 diarios con tarjeta cuesta ≈$41.76 al día, ≈$1,250 en 30 días.

**Por qué es caro**
- Cuotas de intercambio ponderadas: 0.45 % en débito y 1.30 % en crédito, arriba de economías comparables (Unión Europea: 0.2 % y 0.3 %) (jun-2024 a jun-2025) [SD27].
- Banxico y la CNBV proponen topes a esas cuotas (2ª versión, 27-ago-2026): 1.30 % en crédito y $10.80 por operación en débito, con transición de 3 años; **en consulta, no vigente** [SD28, SD09].

**Señales del mercado**
- Tiendas 3B suspendió tarjetas en algunas sucursales al perder la cuota de intercambio cero y probó CoDi (sep-2026) [SD29].
- Quien traslada la comisión suele cobrar 3 % a 5 % extra; Profeco lo considera ilegal (2025) [SD30].
- Analistas advierten un "golpe de flujo de caja" para negocios de márgenes estrechos al migrar a digital (2026) [SD61].

**Alternativa:** CoDi no cobra comisión por operación, funciona 24/7 y el dinero llega en segundos (2026) [SD31]; el Gobierno lo reiteró al presentar la Ley de Economía Digital [SD15].

**Recomendación:** en el pitch, traducir porcentajes a pesos del día ("$40 diarios que se quedan en tu bolsa").

## K04.4 · CoDi: adopción real y por qué no despegó
CoDi (Cobro Digital) es la plataforma de Banxico, lanzada el 30-sep-2019, para cobrar con QR o NFC sobre SPEI y sin comisión; su meta era 18.1 M usuarios en 2020 [SD33, SD31, SD01].

**Números**
- Sep-2025: 21.79 M cuentas validadas (a la baja); solo **2.47 M** han pagado alguna vez y **1.08 M** han cobrado (Banxico) [SD33]: ≈11 % pagó y ≈5 % cobró (cálculo propio).
- Oct-2019 a jul-2026: 21.5 M operaciones acumuladas; 34.8 M apps habilitadas; DiMo sin datos actualizados (Banxico) [SD32]. Como SPEI hizo 833.5 M operaciones solo en sep-2026 [SD12], todo CoDi equivale a ≈2.6 % de un mes de SPEI (cálculo propio).
- ENIF 2024: 38.0 % conoce CoDi y 12.8 % de ellos lo ha usado (≈4.9 % de los adultos); DiMo: 18.5 % y 6.8 % (≈1.3 %) (cálculos propios) [SD16].

**Por qué no despegó**
- Incentivos: los bancos ganan con las comisiones de tarjeta y CoDi no cobra; la Presidenta dijo "la banca no quiere que se use" (2025) [SD33].
- Poca promoción del sector (2026) [SD32] y verificación de identidad engorrosa [SD36].
- Experiencia: en una prueba de lanzamiento solo 2 de 8 asociaciones de cuenta se validaron y las apps probadas no avisaban del pago (2019) [SD35].
- Uso concentrado en altos ingresos; Pix (Brasil) y SINPE Móvil (Costa Rica) ganaron con bajo costo de adopción, efectos de red, integración coordinada y difusión temprana (2025) [SD34]. Mercado Pago dejó su pago con QR en 2023 [SD14].
- Gobierno y ABM acordaron relanzar CoDi y DiMo; su fusión es un rumor no confirmado (abr-2026) [SD62].

**Recomendación:** no vender "CoDi", sino el beneficio: "cobra sin comisión y sabe al instante que ya te pagaron".

## K04.5 · Qué cambia el 14 de diciembre de 2026
**Qué es:** la **fecha límite** para que bancos y participantes del SPEI cumplan las Circulares 9/2026 y 10/2026 de Banxico (DOF, 17-jun-2026) y sus Guías de homologación de transferencias móviles [SD01, SD02, SD09]. La 9/2026 ya rige; el 14-dic es su plazo de cumplimiento (segundo transitorio) [SD01], no la entrada en vigor de una ley.

**Qué deberán tener todas las apps**
1. Máximo cuatro etapas: botón visible de "Transferencias"; captura (cuenta, destinatario, monto, concepto); resumen con nombre del beneficiario, importe y banco; resultado con comprobante, clave de rastreo y liga al CEP [SD04, SD05, SD06].
2. Celular de 10 dígitos como identificador: obligatorio en cuentas de nivel 2 a 4 si el titular lo pide, gratuito, con aviso en un día hábil; la CLABE sigue [SD03].
3. **CoDi:** procesar los mensajes de cobro conforme a las Guías y mantener apps que permitan atenderlos [SD01].
4. Sanciones a quien incumpla [SD06]; alcance: más de 80 M personas que transfieren [SD07].

**En paralelo**
- Circular 11/2026: cuenta Nivel 2 Bis de hasta 15,000 UDIs al mes (≈$130–132 mil; hasta 3,000 UDIs en efectivo), sin RFC y con apertura remota [SD09, SD08, SD37]. ⚪ Fecha de oferta en cada banco: no verificada.
- Ley de Economía Digital para Pagos Digitales y Electrónicos: el Ejecutivo firmó el decreto el 4-nov-2026 y su texto ya aparece en el SIDOF; entra en vigor al día siguiente de su publicación en el DOF (⚪ la copia consultada no muestra la fecha de publicación) [SD64]. Transitorios tercero y cuarto: 15 días hábiles para la determinación de sectores por SHCP y otros 15 tras publicarla para reglas sectoriales. No acredita una obligación general de QR en CDMX el 19-nov. Artículo 19-IV: disposiciones Banxico/CNBV sobre QR en terminales [SD64]. ⚪ Sectores y calendarios concretos: pendientes de verificar. Lo esencial y lo que no se puede afirmar: K02.

**Recomendación (por qué ahora):** ayudar al comercio a adoptar cobros digitales; distinguir el plazo bancario del 14-dic de las reglas sectoriales pendientes. El plazo normativo no demuestra implementación efectiva en todas las apps.

## K04.6 · Fraude y desconfianza
**Datos (Condusef y ENIF)**
- Ene–jun 2025: 2.48 M reclamaciones por posible fraude (+5.2 % anual): $10,714 millones reclamados y $2,556 millones devueltos (≈24 %, cálculo propio); el fraude digital supera 60 % de las quejas [SD38].
- Ene–sep 2025: 3.82 M reclamaciones (~14 mil diarias); las personas de 60 años o más suman 32 % de las quejas por posible fraude (⚪ año del dato no indicado) [SD39].
- CDMX 2025: 40,688 quejas, 31.6 % ligadas a fraude [SD40].
- ENIF 2024: 39 % no cree que su dinero esté seguro en bancos y 46.7 % dice que no resuelven sus quejas [SD18].

**Modalidades que golpean al comercio**
- Comprobante falso: imagen o PDF de una transferencia que nunca llegó o que se revierte; circulan plantillas. Se verifica con el CEP de Banxico (clave de rastreo) o revisando el saldo real (2026) [SD41].
- QR falso: la SSC-CDMX alertó por códigos en espacios públicos que llevan a sitios falsos (2025) [SD42].

**Protecciones recientes**
- MTU: límite de monto que fija el usuario, obligatorio desde el 1-oct-2025; arriba de él se pide autenticación extra [SD43].
- DiMo muestra el nombre del destinatario antes de autorizar [SD03]; las Guías exigen resumen con nombre del beneficiario y comprobante con rastreo [SD06].

**Recomendación (diseño de confianza)**
1. Nunca validar con captura: solo cuenta el pago confirmado por webhook o consulta de estado de Pey (según K03.4 y K03.5).
2. Recibo automático (WhatsApp o voz): monto, comercio, hora y clave de rastreo.
3. QR dinámico por venta, no un QR estático pegado.
4. Anunciar en voz alta: "Cobro de $85 para Frutas Lupita".
5. Botón "¿Ya me pagaron?" que consulte el estado real.

## K04.7 · Brecha digital: personas mayores, voz y WhatsApp
**Conectividad (ENDUTIH 2025, INEGI, publicada el 16-jun-2026)**
- 86.1 % de las personas de 6 años o más usa internet (104.9 M); urbano 88.9 % y rural 75.2 %; 84.6 % usa celular [SD44]. 97.3 % de los usuarios se conecta con smartphone [SD45].
- Por edad: 55–64 años, 78.8 %; 65–74 años, 57.8 %; 75 o más, 30.3 % [SD45].
- 17.0 M no usan internet; la razón principal es no saber usarlo (7.5 % de la población, más de la mitad de los no usuarios, cálculo propio) [SD45].
- Usos: comunicarse 93.0 %, operaciones bancarias 32.9 %, pagos 35.6 % (lectura de gráfica; confianza media) [SD45].

**Personas mayores**
- Solo 21 % de los hombres y 15 % de las mujeres de 60 años o más hacen pagos digitales; ~10 % usa apps bancarias y ~47 % opera en sucursal o cajero (ENIF 2024, citada por la prensa) [SD47].
- Suelen depender de familiares para operar [SD48] y son 32 % de las quejas por posible fraude [SD39].
- Pensión del Bienestar (65 años o más): $6,400 por bimestre en 2026, depositada en tarjeta del Banco del Bienestar [SD49].

**WhatsApp y voz**
- WhatsApp es la plataforma más usada: 95.3 % de los usuarios (reporte Digital 2024 citado por la prensa; ⚪ base exacta no verificada) [SD46].
- ⚪ No encontré un dato verificado sobre preferencia por notas de voz en México; conviene validarlo observando a usuarios reales.

**Recomendación:** canal WhatsApp + voz; una sola acción por pantalla; letra grande; confirmación hablada ("ya llegó tu dinero"); opción de mandar copia del recibo a un familiar.

## K04.8 · Contexto local: CDMX
**Mercados, tianguis y programas**
- 339 mercados públicos donde trabajan ~300 mil personas (2025) [SD55]; 1,367 tianguis (Sedeco, 2024) [SD56] con ~50 mil tianguistas [SD57].
- Mercomuna (vales de despensa canjeables en comercios de barrio): 335 mil familias en 2025 y más de 30 mil comercios registrados (dic-2025); meta de 700 mil familias en 2026 [SD58, SD59]. ⚪ Formato del vale y pago al comercio: no verificados.
- 2021: Sedeco y Mercado Pago anunciaron tarjeta y QR en 335 mercados y 51 tianguis, con meses sin comisión; ⚪ no encontré resultados [SD60].
- ⚪ No encontré un programa vigente de la CDMX para que comercios cobren con CoDi.

**Ejemplo de alcaldía: Coyoacán**
- 22 mercados públicos (2025) [SD53].
- 14.7 % de sus habitantes tiene 65 años o más, la proporción más alta entre alcaldías (nota de 2024; ⚪ fuente primaria no indicada) [SD54].

**Recomendación:** si el producto apunta a mercados y tianguis, valida el problema con comercios reales antes de construir; las cifras de arriba sirven para dimensionar, no para describir a un usuario concreto.

## K04.9 · Personas (situaciones típicas; personas ficticias)
| Persona | Dolores | Trabajos por hacer | Momento de pago |
|---|---|---|---|
| **Tianguista de fruta** (vende 3 días a la semana en distintos tianguis) | Montos chicos ($20–$150, ilustrativo); terminal cara para su volumen (débito hasta 3.95 % [SD24]); "ya te transferí" con captura [SD41]; señal intermitente | Cobrar en segundos, saber que sí llegó, cuadrar la venta del día | Fila de cuatro clientes; uno pregunta "¿le transfiero?" y enseña su pantalla |
| **Fonda familiar** (menú del día, clientes oficinistas) | Clientes sin efectivo; con crédito un restaurante paga hasta 5.84 % (⚪ periodo) [SD63]; cuentas divididas; pedidos por WhatsApp | Cobrar mesas y pedidos para llevar, cerrar caja sin errores | Al terminar la comida, varios pagan por separado al mismo tiempo |
| **Prestadora de servicios a domicilio** (limpieza, uñas o costura) | Comprobante falso o reversa cuando ya se fue [SD41]; sin RFC; "luego te pago" | Mandar el cobro antes o al terminar, recordar pendientes, demostrar ingresos (cuenta Nivel 2 Bis [SD09]) | En la puerta, al terminar el servicio |
| **Cliente adulto mayor** (jubilada, compra en el mercado de su colonia) | Cobra su pensión en tarjeta [SD49]; casi no usa apps (~10 % de 60+ [SD47]); miedo al fraude (32 % de quejas [SD39]); depende de sus hijos | Pagar sin equivocarse, saber a quién y cuánto paga, tener un comprobante que entienda | En el puesto, sin lentes y con el vendedor apurado |

## K04.10 · Diez datos para el pitch
Confianza: alta en datos de INEGI, Banxico y DOF; media en cifras citadas por la prensa.
1. ~85 % de los adultos usa sobre todo efectivo en compras de hasta $500 — ENIF 2024 [SD10, SD18].
2. Solo 4.4 % usa transferencias o apps en esas compras (1.6 % en 2021) — ENIF 2024 [SD10].
3. 54.3 % de las personas ocupadas (32.6 millones) trabaja en la informalidad — ENOE, sep-2026 [SD20].
4. 95.4 % de los negocios del país son micro (0 a 10 personas) — Censos Económicos 2024, dato 2023 [SD21].
5. Una miscelánea paga hasta 3.95 % por cobro con débito; Clip, 3.00–3.60 % — Banxico, jul-2026 [SD24].
6. CoDi: 21.8 M cuentas validadas, pero solo 2.5 M han pagado alguna vez — Banxico, sep-2025 [SD33].
7. 21.5 M operaciones CoDi en casi 7 años contra 833.5 M operaciones SPEI en un solo mes — Banxico, jul-2026 y sep-2026 [SD32, SD12].
8. 2.48 M reclamaciones por posible fraude en un semestre; los bancos devolvieron ~24 % del monto — Condusef, ene–jun 2025 [SD38].
9. Solo 57.8 % de las personas de 65 a 74 años usa internet (30.3 % de 75 o más) — ENDUTIH 2025 [SD45].
10. 14-dic-2026: fecha límite para que todas las apps homologuen transferencias y procesen cobros CoDi — Banxico, Circular 9/2026 [SD01].

**Recomendación:** abrir con los datos 1, 6 y 10 (problema, paradoja y urgencia) y cerrar con el 5 traducido a pesos.

## K04.11 · Oportunidades donde IA + CoDi resuelven algo real
**Recomendación:** ordenadas por impacto y por factibilidad para un primer demo funcional (el Hackatón México dura cuatro semanas, K01.1). Lo técnico de pey sale de K03. ⚪ Lo de voz e IA no está verificado en esta base: el proveedor de IA está por definir.

| # | Idea | Dolor (dato) | Impacto | Factibilidad | Dependencias |
|---|---|---|---|---|---|
| 1 | **"Cóbrale" por voz o WhatsApp:** dictas "cóbrale 85 de jitomate"; la IA arma el cobro CoDi (QR dinámico) y avisa "ya llegó" con recibo | Comisión de tarjeta [SD24]; no saber usar apps [SD45] | Alto | Alta | QR + webhook de Pey (K03.4, K03.5); voz (⚪ proveedor de IA por definir) |
| 2 | **Detector de comprobante falso:** la IA lee monto y clave de rastreo de la captura y los compara con cobros confirmados | Comprobantes falsos [SD41]; fraude [SD38] | Alto | Alta (solo cobros propios) | Estado y `trackingKey` en Pey (K03.4) |
| 3 | **Recibo hablado + modo familiar:** audio y letra grande, con copia opcional a un familiar | Personas mayores [SD47, SD39] | Medio-alto | Alta | WhatsApp o web simple |
| 4 | **Corte de caja conversacional:** "¿cuánto vendí hoy?" + resumen diario | Sin registros; historial para crédito [SD09] | Medio | Alta | Datos locales |
| 5 | **Alta guiada:** la IA explica Nivel 2 Bis, alta del celular y primer cobro de prueba | Registro engorroso [SD35, SD36] | Medio | Media | ⚪ oferta de Nivel 2 Bis por banco |
| 6 | **Cobro a domicilio:** cobro al celular del cliente, QR o liga por WhatsApp + recordatorio | "Luego te pago" | Medio | Media | `POST /codi/pn`, vigencia y liga de pago (K03.4, K03.5); ⚪ requisitos del celular del cliente |

**Combinación candidata (por validar antes de elegir la idea):** unir 1 + 2 + 3: dictar → QR → un juez paga con su app → "ya llegó" en voz → recibo. Pey no tiene sandbox (K03.6): si algo falla, plan B de K03.6 con "SIMULACIÓN" visible (AGENTS.md). Fuera de alcance: terminales, NFC, crédito y facturación.

## Fuentes
| ID | Título | URL | Consultado |
|---|---|---|---|
| SD01 | DOF · Circular 9/2026 de Banxico (modifica la 14/2017; homologación de transferencias móviles) | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 | 2026-11-06 |
| SD02 | SIDOF · Circular 10/2026 de Banxico (modifica la 3/2012), DOF 17-jun-2026 | https://sidof.segob.gob.mx/notas/5790863 | 2026-11-06 |
| SD03 | Expansión · La CLABE no desaparece: Banco de México cambiará las transferencias (6-sep-2026) | https://expansion.mx/finanzas-personales/2026/09/06/clabe-no-desaparece-banco-de-mexico-cambiara-transferencias | 2026-11-06 |
| SD04 | N+ · Banxico ordena cambios obligatorios en transferencias antes de que termine 2026 | https://www.nmas.com.mx/economia/banxico-cambia-las-reglas-estas-son-modificaciones-transferencias-antes-termine-el-2026/ | 2026-11-06 |
| SD05 | Grupo Animal · Transferencias bancarias sin CLABE: las nuevas reglas de Banxico | https://grupoanimal.mx/explicaciones/transferencias-bancarias-clabe-nuevas-reglas-banxico | 2026-11-06 |
| SD06 | Ruptura360 · Banxico le dice adiós a la CLABE obligatoria (10-sep-2026) | https://ruptura360.mx/periodismo-de-servicio/banxico-nuevas-reglas-transferencias-bancarias-2026/ | 2026-11-06 |
| SD07 | DPL News · Banxico publica guías para homologar experiencia de usuario en transferencias (18-jun-2026) | https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/ | 2026-11-06 |
| SD08 | Bloomberg Línea · Banxico emite medidas para simplificar pagos digitales y ampliar límite en cuentas sin registro ante el SAT (jun-2026) | https://www.bloomberglinea.com/latinoamerica/mexico/banxico-emite-medidas-para-simplificar-pagos-digitales-y-ampliar-limite-en-cuentas-sin-registro-ante-el-sat/ | 2026-11-06 |
| SD09 | BBVA Research · México: regulación financiera, octubre 2026 | https://www.bbvaresearch.com/wp-content/uploads/2026/10/20261015_MexicoRegFinOct2026-1.pdf | 2026-11-06 |
| SD10 | Expansión · Diputados aprueban Ley de Economía Digital (6-oct-2026) | https://expansion.mx/economia/2026/10/06/diputados-aprueban-ley-de-economia-digital | 2026-11-06 |
| SD11 | Excélsior · Así será la transición de pagos con la ley de economía digital | https://www.excelsior.com.mx/nacional/sera-transicion-pagos-con-ley-economia-digital | 2026-11-06 |
| SD12 | Xataka México · El Senado aprueba una nueva ley de pagos digitales (21-oct-2026) | https://www.xataka.com.mx/legislacion-y-derechos/mexico-quiere-que-pagues-tarjeta-transferencias-qr-senado-aprueba-nueva-ley-pagos-digitales | 2026-11-06 |
| SD13 | Expansión · Ley de Economía Digital no será draconiana, dicen banqueros (28-oct-2026) | https://expansion.mx/economia/2026/10/28/ley-de-economia-digital-no-sera-draconiana-la-implementacion-de-pagos-digitales-sera-paulatina-dicen-banqueros | 2026-11-06 |
| SD14 | DPL News · FinTech México respalda Ley de Pagos Digitales, pero plantea reservas sobre el QR (21-sep-2026) | https://dplnews.com/?p=330888 | 2026-11-06 |
| SD15 | Por Esto · Gobierno plantea pagos con CoDi sin comisiones y cuentas de hasta 135 mil pesos (24-sep-2026) | https://www.poresto.com/mexico/2026/9/24/ley-de-economia-digital-gobierno-plantea-pagos-con-codi-sin-comisiones-y-cuentas-de-hasta-135-mil-pesos.html | 2026-11-06 |
| SD16 | INEGI-CNBV · Comunicado 49/25, ENIF 2024 (13-mar-2025) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enif/ENIF2024_CP.pdf | 2026-11-06 |
| SD17 | El Financiero · Víctor Piz, "Cash: el peso del efectivo en México" (30-may-2025) | https://www.elfinanciero.com.mx/opinion/victor-piz/2025/05/30/cash-el-peso-del-efectivo-en-mexico/ | 2026-11-06 |
| SD18 | Publimetro · 40 % de mexicanos cree que su dinero no está seguro en bancos (mar-2025) | https://www.publimetro.com.mx/noticias/2025/03/14/desconfianza-total-40-de-mexicanos-cree-que-su-dinero-no-esta-seguro-en-bancos/ | 2026-11-06 |
| SD19 | IDC Online · SPEI, cerca de superar a las tarjetas como medio de pago digital en 2026 (14-ago-2026) | https://idconline.mx/finanzas/2026/08/14/spei-cerca-de-superar-a-las-tarjetas-como-medio-de-pago-digital-en-mexico-durante-2026 | 2026-11-06 |
| SD20 | INEGI · Indicadores de ocupación y empleo, septiembre de 2026 (22-oct-2026) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/iooe/IOE2026_10.pdf | 2026-11-06 |
| SD21 | INEGI · Censos Económicos 2024, resultados definitivos (24-jul-2025) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/ce/CE2024_def.pdf | 2026-11-06 |
| SD22 | INEGI · Censos Económicos 2024, resultados definitivos Ciudad de México | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/ce/CE_2024_Def_CdMx.pdf | 2026-11-06 |
| SD23 | INEGI · Censos Económicos 2024, monografía Ciudad de México | https://www.inegi.org.mx/contenidos/programas/ce/2024/doc/mcdmx_ce24.pdf | 2026-11-06 |
| SD24 | Banxico · Tasas de descuento con tarjeta de débito, giro Miscelánea (julio 2026) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-debito-por-gir/%7BCE998D24-7B96-F2C4-AF17-C29673DC35D2%7D.pdf | 2026-11-06 |
| SD25 | Banxico · Tasas de descuento en tarjetas (información vigente a julio de 2026) | https://www.banxico.org.mx/servicios/tasas-descuento-tarjetas-banc.html | 2026-11-06 |
| SD26 | Tiendanube · Comisiones de Clip en 2026 (14-jul-2026; contenido comercial) | https://www.tiendanube.com/mx/blog/clip | 2026-11-06 |
| SD27 | Diario de Yucatán (El Universal) · Cuotas cobradas a pagos con tarjeta son las más altas (8-ene-2026) | https://www.yucatan.com.mx/mexico/2026/01/08/cuotas-cobradas-a-pagos-con-tarjeta-son-las-mas-altas.html | 2026-11-06 |
| SD28 | Expansión · Banxico y CNBV suavizan propuesta de cuotas por pagos con tarjeta (27-ago-2026) | https://expansion.mx/economia/2026/08/27/banxico-cnbv-suaviza-propuesta-cuotas-por-pagos-con-tarjeta | 2026-11-06 |
| SD29 | El Imparcial · ¿Por qué Tiendas 3B suspendió el pago con tarjetas? (11-sep-2026) | https://www.elimparcial.com/mexico/2026/09/11/por-que-tiendas-3b-suspendio-el-pago-con-tarjetas/ | 2026-11-06 |
| SD30 | Xataka México · Bancos aceptan bajar costos por pagos con tarjeta a tienditas, con una condición (25-nov-2025) | https://www.xataka.com.mx/banca-digital/bancos-aceptan-bajar-costos-pagos-tarjeta-a-tienditas-mexico-solo-condicion | 2026-11-06 |
| SD31 | Expansión · ¿Te cobran comisión al aceptar tarjeta? Banxico tiene una alternativa (9-abr-2026) | https://expansion.mx/finanzas-personales/2026/04/09/cobrar-con-tarjeta-sin-comisiones-codi-banxico | 2026-11-06 |
| SD32 | Expansión · Ley de economía digital: pagos con CoDi y DiMo (18-sep-2026) | https://expansion.mx/economia/2026/09/18/sheinbaum-ley-economia-digital-pagos-codi-dimo | 2026-11-06 |
| SD33 | La Razón · Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025) | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ | 2026-11-06 |
| SD34 | NBER WP 34280 · Drivers of Digital Payment Adoption: Lessons from Brazil, Costa Rica, and Mexico (2025) | https://ideas.repec.org/p/nbr/nberwo/34280.html | 2026-11-06 |
| SD35 | Xataka México · Probamos CoDi: lo que nos encanta y lo que odiamos (1-oct-2019) | https://www.xataka.com.mx/banca-digital/probamos-codi-que-nos-encanta-que-odiamos-que-tiene-que-resolver-banxico-para-su-implementacion-mexico | 2026-11-06 |
| SD36 | Excélsior · José Yuste, "Cruzada bancaria: a digitalizar" (29-may-2026) | https://www.excelsior.com.mx/opinion/jose-yuste/cruzada-bancaria-digitalizar | 2026-11-06 |
| SD37 | ABM · Comunicado de prensa 14/2026 (26-ago-2026) | https://abm.org.mx/sala-de-prensa/img/fotogaleria/Comunicado_de_prensa_ABM_26082026.pdf | 2026-11-06 |
| SD38 | Vanguardia · Más de 2.4 millones de fraudes bancarios en México durante 2025 (3-nov-2025) | https://vanguardia.com.mx/noticias/mexico/crece-la-estafa-digital-mas-de-24-millones-de-fraudes-bancarios-en-mexico-durante-2025-MK17956794 | 2026-11-06 |
| SD39 | Xataka México · Fraudes bancarios encontraron su objetivo vulnerable: adultos mayores (19-abr-2026) | https://www.xataka.com.mx/banca-digital/fraudes-bancarios-mexico-encontraron-su-objetivo-vulnerable-adultos-mayores/amp | 2026-11-06 |
| SD40 | La Crónica · Asociados a fraudes, 30 % de los expedientes en Condusef (17-mar-2026) | https://www.cronica.com.mx/negocios/2026/03/17/asociados-a-fraudes-30-por-ciento-de-los-expedientes-en-condusef/ | 2026-11-06 |
| SD41 | Grupo Animal · ¿Recibiste una supuesta transferencia bancaria? Así verifícala (28-jul-2026) | https://grupoanimal.mx/explicaciones/transferencia-bancaria-falsa-comprobante | 2026-11-06 |
| SD42 | UnoTV · Policía Cibernética de CDMX alerta por fraudes con QR (23-may-2025) | https://www.unotv.com/estados/ciudad-de-mexico/policia-cibernetica-de-cdmx-alerta-por-fraudes-con-qr-protegete-asi/ | 2026-11-06 |
| SD43 | El Cronista · Qué ocurre si supera el límite del MTU en transferencias (1-oct-2025) | https://www.cronista.com/mexico/finanzas-economia/ya-no-hay-tiempo-que-ocurre-si-supera-el-limite-del-mtu-en-transferencias-bancarias-a-partir-de-este-1-de-octubre | 2026-11-06 |
| SD44 | INEGI · ENDUTIH 2025, comunicado de prensa (16-jun-2026) | https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25.pdf | 2026-11-06 |
| SD45 | INEGI · ENDUTIH 2025, presentación de resultados | https://www.inegi.org.mx/contenidos/programas/endutih/2025/doc/presentacion_endutih2025.pdf | 2026-11-06 |
| SD46 | Excélsior · Día de las Redes Sociales en México (29-jun-2025) | https://www.excelsior.com.mx/hacker/redes-sociales-en-mexico-2025/1724290 | 2026-11-06 |
| SD47 | Xataka México · México quiere despedirse del efectivo en carreteras y gasolineras (27-abr-2026) | https://www.xataka.com.mx/politica/mexico-quiere-despedirse-efectivo-carreteras-gasolineras-problema-que-millones-necesitan/amp | 2026-11-06 |
| SD48 | Xataka México · Solo 4 de cada 10 personas pagan con tarjeta o transferencia (28-nov-2025) | https://www.xataka.com.mx/banca-digital/solo-4-cada-10-personas-mexico-pagan-tarjeta-transferencia-motivo-claro-no-confian-instituciones | 2026-11-06 |
| SD49 | UnoTV · Pensión del Bienestar 2026: 6,400 pesos (19-ene-2026) | https://www.unotv.com/pensiones/pension-del-bienestar-2026-apellidos-que-reciben-6400-pesos-del-19-al-23-de-enero/ | 2026-11-06 |
| SD53 | Alcaldía Coyoacán · Boletín 037, inversión en mercados (22-ene-2025) | https://coyoacan.cdmx.gob.mx/boletines/files/2024_2027/BOLET%C3%8DN%20037%20COYOAC%C3%81N%2C%20QUIEN%20M%C3%81S%20INVIERTE%20EN%20MEJORAMIENTO%20DE%20MERCADOS%20-%2022ENE25.pdf | 2026-11-06 |
| SD54 | Expansión Política · BJ, Coyoacán y Azcapotzalco concentran retos para población de 65+ (23-nov-2024) | https://politica.expansion.mx/cdmx/2024/11/23/bj-coyoacan-y-azcapotzalco-concentran-retos-para-poblacion-de-65-anos-y-mas | 2026-11-06 |
| SD55 | Expansión Política · Las 14 acciones de la CDMX para mejorar los mercados (12-feb-2025) | https://politica.expansion.mx/cdmx/2025/02/12/las-14-acciones-que-emprendera-la-cdmx-para-mejorar-los-mercados | 2026-11-06 |
| SD56 | Expansión Política · ¿Cuántos tianguis hay en la CDMX? (12-sep-2024) | https://politica.expansion.mx/cdmx/2024/09/12/cuantos-tianguis-hay-en-la-cdmx-y-que-alcaldias-tienen-mas | 2026-11-06 |
| SD57 | La Razón · Coparmex CDMX promueve la formalización de tianguistas (16-oct-2024) | https://www.razon.com.mx/negocios/coparmex-cdmx-promover-formalizacion-tianguistas-597731 | 2026-11-06 |
| SD58 | Chilango · Vales Mercomuna: CDMX entregará 700 mil apoyos en 2026 | https://www.chilango.com/noticias/vales-mercomuna-cdmx-entregara-700-mil-apoyos-2026/amp/ | 2026-11-06 |
| SD59 | Chilango · Mercomuna beneficia a 335 mil familias y más de 30 mil comercios (13-dic-2025) | https://www.chilango.com/noticias/educacion/mercomuna-beneficia-a-335-mil-familias-y-fortalece-mas-de-30-mil-comercios-en-la-cdmx/amp/ | 2026-11-06 |
| SD60 | Chilango · Aceptarán pago con tarjeta en mercados y tianguis (13-oct-2021) | https://www.chilango.com/noticias/pago-con-tarjeta-en-mercados-y-tianguis/ | 2026-11-06 |
| SD61 | El CEO · Ley de Economía Digital carga con obstáculos por conectividad y costos (10-sep-2026) | https://elceo.com/negocios/ley-de-economia-digital-carga-con-obstaculos-para-pagos-sin-efectivo-por-conectividad-y-costos/ | 2026-11-06 |
| SD62 | El CEO · CoDi y DiMo se fusionan: lo que se sabe (7-abr-2026) | https://elceo.com/economia/codi-y-dimo-se-fusionan-esto-es-lo-que-se-sabe-del-impulso-a-la-digitalizacion-de-pagos-en-mexico/ | 2026-11-06 |
| SD63 | Banxico · Tasas de descuento con tarjeta de crédito por giro (periodo no indicado; archivo de 2025) | https://www.banxico.org.mx/servicios/tasas-de-descuento-para-tarjetas-de-credito/%7BA896D818-3D13-4922-B54B-4B6D58E99479%7D.pdf | 2026-11-06 |
| SD64 | DOF · Ley de Economía Digital: texto y transitorios | https://sidof.segob.gob.mx/notas/docFuente/5803017 | 2026-11-07 |

<!-- ===== FIN: conocimiento/04-contexto-pagos-y-comercios-mx.md ===== -->

<!-- ===== INICIO: docs/REVISION-PEY-2026-11-07.md ===== -->

# Revisión de pey y plan de integración

Fecha: 2026-11-07. Alcance: documentación y decisiones para construir; no acredita una integración desplegada ni pagos probados.

## Hallazgos verificados

- La [página comercial](https://pey.mx/api-codi) anuncia API gratuita por ahora, autoservicio y webhooks firmados. No extrapolar la gratuidad a tarjetas o a condiciones comerciales futuras.
- Contradicción: la página comercial menciona test/live; la [guía técnica](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/) indica pruebas reales y sandbox próximo. Usar producción con montos mínimos y confirmación humana; consultar a pey antes de asumir un sandbox.
- La misma guía estima cinco días hábiles para registrar cuenta propia. Su cuenta de prueba recibe dinero real que no se devuelve. No presentarla como cuenta del comercio.
- [OpenAPI](https://docs.pey.mx/openapi.json), versión observada 2026-10-20: POST /codi/qr crea el QR; amount está en MXN. La API admite cero, pero nuestro checkout requiere importe positivo. expiration: cero o mínimo 360 segundos. numRef: entre uno y siete dígitos. generateImage permite PNG base64; qrImage puede ser null y qrString permite generarlo. bankAccountId selecciona una cuenta ACTIVE; si falta, se usa la vinculada a la llave.
- [Webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/): uno por llave, con secreto de firma. Verificar con Standard Webhooks antes de procesar.
- [Pago recibido](https://docs.pey.mx/docs/webhooks/codi/qr/): codiQrId relaciona el QR y transactionId identifica la operación; datePaid usa segundos Unix. bankAccountId solo aparece cuando se proporcionó al generar el QR.

## Decisiones para cualquier checkout con pey (propuestas de ingeniería)

1. Crear un pedido en servidor con importe en centavos, moneda, destinatario y referencia interna. Convertir a pesos únicamente al llamar a pey.
2. Si hay IA, la IA propone el cobro; la persona confirma; el servidor valida y crea el QR. La IA nunca declara un pago confirmado.
3. Guardar la asociación pedido–QR. Consultar pagos por QR desde el servidor o recibir webhook verificado. Comparar importe, moneda y vinculación antes de confirmar.
4. Deduplicar webhook-id y transactionId de forma persistente si hay efectos de negocio. No confiar en memoria de una función efímera.
5. Distinguir pendiente, confirmado, vencido local y no_verificable. Un 404 o fallo de red no demuestra que el cliente no pagó. Revisar pagos tardíos antes de cerrar una venta.
6. No reintentar automáticamente creación tras un timeout sin reconciliar: la solicitud pudo haber creado el QR. ⚪ Garantías de idempotencia de pey pendientes.
7. Recibos e imágenes aportan información; nunca son evidencia bancaria suficiente ni permiten acusar fraude.

## Criterios de aceptación pendientes

- [ ] Cuenta, llave y destinatario confirmados; secretos solo en servidor.
- [ ] QR generado, visible y utilizable desde un teléfono.
- [ ] Pago real mínimo autorizado por la persona responsable de la cuenta y evidencia sin datos personales.
- [ ] Importe distinto, firma inválida y evento repetido no cierran incorrectamente una venta.
- [ ] Error de proveedor muestra no_verificable; QR vencido permite reconciliación.
- [ ] Demo etiquetada SIMULACIÓN cuando corresponda.

## Marco normativo y preguntas al mentor

El detalle legal actualizado está en [K02](../conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md). No basar el pitch en una fecha obligatoria de QR aún no demostrada (K02.4).

Preguntar a pey: sandbox del evento; disponibilidad de cuenta; límites de consultas; reintentos y orden de webhooks; idempotencia de creación; alcance de consulta de pagos; plazo y requisitos para incorporar comercios reales.

Prioridad de construcción, sea cual sea la idea: primero el checkout QR completo con estado confiable; después, lo que distinga al proyecto. Registro multi-comercio y links con tarjeta conviene dejarlos fuera del primer demo.

<!-- ===== FIN: docs/REVISION-PEY-2026-11-07.md ===== -->

<!-- ===== INICIO: pey/README.md ===== -->

# Documentación de pey (API CoDi) en Markdown

Versión de trabajo, en español de México y con redacción propia, de toda la documentación pública de pey, consultada el **2026-11-07**. Es la base RAG para agentes que construyan con pey. **No es documentación oficial:** ante cualquier duda, manda la página oficial enlazada al final de cada sección.

- **Qué se recorrió:** las 37 URL del [mapa del sitio](https://docs.pey.mx/sitemap.xml), el [OpenAPI completo](https://docs.pey.mx/openapi.json) (versión `2026-10-20`, 11 rutas) y la [página comercial de la API](https://pey.mx/api-codi). En una segunda pasada del mismo día se abrieron una por una todas las páginas de Tutoriales, Referencia de la API, Registro de cambios y Recursos de marca, incluidos sus índices, las etiquetas y la versión en inglés de Recursos de marca.
- **Marcas:** ⚪ = no confirmado en la fuente. "Recomendación" = decisión de ingeniería, no dicho por pey. Los ejemplos de código y JSON son propios, con valores ficticios.
- **Síntesis con código probado y decisiones:** [K03 · CoDi y API de pey](../conocimiento/03-codi-y-api-pey.md).
- **Datos personales:** no se copian la CLABE ni el titular de la cuenta de prueba, ni correos o teléfonos de personas; se enlaza la página oficial.

## Cómo usar esta carpeta (agentes)

1. ¿Vas a cobrar con QR? Lee [04](../pey/04-api-codi-qr-y-push.md) → [07](../pey/07-api-transacciones.md) → [09](../pey/09-webhooks.md).
2. ¿Dudas de alta, llaves o pruebas? [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md).
3. ¿Un error de la API? Busca su `error.type` en [11](../pey/11-errores-y-limites.md).
4. No inventes campos: si algo no está aquí ni en el OpenAPI, márcalo `TODO(⚪)`.

## Lo que vamos a necesitar para el producto

Lista corta para construir sobre pey en el hackatón. Cada punto enlaza al archivo que lo detalla.

1. **Cuenta y llave.** Perfil en portal.mipey.mx → **Finanzas**: cuenta de pago `codi` → **Desarrollador**: "Crear API Key" vinculada a esa cuenta. La llave vive solo en `PEY_API_KEY`, en el servidor. → [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md), [14](../pey/14-tutoriales-paso-a-paso.md)
2. **Cuenta de prueba y montos.** Tu CLABE tarda 5 días hábiles. Para probar hoy, registra la cuenta de prueba que publica el paso 2 del tutorial: se activa al instante. Todo se cobra de verdad y lo pagado **no se devuelve**, así que usa de $0.01 a $1, con tope en el servidor. No hay sandbox. → [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)
3. **Crear el cobro.** QR: `POST /codi/qr` responde 201; `amount` va en pesos, `expiration` es 0 o al menos 360, `numRef` lleva de 1 a 7 dígitos y `generateImage: true` agrega `qrImage`. Push: `POST /codi/pn` responde 200 y pide un celular de 10 dígitos. Para la demo conviene el QR. → [04](../pey/04-api-codi-qr-y-push.md)
4. **Mostrar el QR.** Muestra `qrImage` como `data:image/png;base64,…` o dibuja `qrString` sin modificarlo. → [10](../pey/10-tutorial-mostrar-qr-codi.md)
5. **Confirmar el pago por consulta.** QR: `GET /transaction/codi/qr/{id}` hasta ver un `PAID` con el monto esperado. Push: `GET /transaction/{transactionId}`. → [07](../pey/07-api-transacciones.md)
6. **Confirmar el pago por webhook firmado.** Hay uno por llave y se crea desde el engrane de la llave con "Crear Webhook". El secreto va en `PEY_WEBHOOK_SECRET`. Verifica la firma Standard Webhooks con el cuerpo crudo, deduplica por `webhook-id` y espera el evento `codi.qr.payment_received`. → [09](../pey/09-webhooks.md)
7. **Ligas de pago (opcional).** `POST /payment-link/create` pide `successUrl` y `backUrl` con HTTPS. Confirma con `GET /payment-link/{id}` (`paid`) o con `payment_link.status_updated`; la redirección no prueba el pago. → [06](../pey/06-api-ligas-de-pago.md)
8. **Cobrar a nombre de varios comercios (opcional).** Registra cada cuenta con `POST /bank-account` y cobra con su `bankAccountId`, que solo sirve en `ACTIVE` (hasta 5 días hábiles). → [05](../pey/05-api-cuentas-bancarias.md)
9. **Errores frecuentes.** `INVALID_STATE` (la llave no tiene CoDi habilitado), `PEY_CONSISTENCY_ERROR` (llave sin cuenta vinculada), `INVALID_PARAMETER` (`expiration` menor que 360), `INVALID_AMOUNT`, y 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE` (reintenta solo los GET). Programa contra `error.type`. → [11](../pey/11-errores-y-limites.md)
10. **Marca permitida.** Solo los cinco archivos oficiales, descargados y sin redibujar: `pey_codi_light.svg` o `pey_codi_dark.svg` en la pantalla de cobro y `loading_codi.gif` mientras esperas el pago. pey no publica colores, tipografía ni reglas de uso. → [12](../pey/12-recursos-de-marca.md)
11. **Lo que NO existe en la documentación del 2026-11-07.**
    - Sandbox: está "próximamente". La página comercial menciona llaves de prueba, pero la referencia no ([01](../pey/01-que-es-pey-y-codi.md)).
    - Cancelar un QR o una push, y devoluciones por API.
    - Endpoints para listar cuentas o links, y para administrar el webhook por API ([03](../pey/03-referencia-api-convenciones.md)).
    - Idempotencia al crear cobros (solo los webhooks traen `webhook-id`), límite de peticiones y código de error para una llave inválida ([11](../pey/11-errores-y-limites.md)).
    - Eventos de pago rechazado o vencido, y política de reintentos de webhooks ([09](../pey/09-webhooks.md)).
    - Fechas en el changelog y política de versiones ([13](../pey/13-registro-de-cambios.md)).
    - Manual de marca ([12](../pey/12-recursos-de-marca.md)).

## Archivos

| Archivo | Tema | Páginas oficiales |
|---|---|---|
| [01-que-es-pey-y-codi.md](../pey/01-que-es-pey-y-codi.md) | Qué es pey, qué hace la API, dos formas de cobrar, precio, contradicción sobre llaves de prueba | [Inicio](https://docs.pey.mx/) · [API CoDi®](https://pey.mx/api-codi) · [Introducción](https://docs.pey.mx/docs/api/codi-api) |
| [02-primeros-pasos-cuenta-llaves-y-prueba.md](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) | Portal, perfil, cuentas `codi`/`stripe`, crear API key, prueba en producción, entornos | [Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) |
| [03-referencia-api-convenciones.md](../pey/03-referencia-api-convenciones.md) | URL base, autenticación, IDs, montos, fechas, paginación, metadata, errores, mapa de endpoints | [Referencia de la API](https://docs.pey.mx/docs/category/api-reference) · [OpenAPI](https://docs.pey.mx/openapi.json) |
| [04-api-codi-qr-y-push.md](../pey/04-api-codi-qr-y-push.md) | `POST /codi/qr`, `POST /codi/pn` | [Create QR](https://docs.pey.mx/docs/api/create-qr) · [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) |
| [05-api-cuentas-bancarias.md](../pey/05-api-cuentas-bancarias.md) | `POST /bank-account`, `GET /bank-account/{id}`, `codiStatus`, multi-cuenta | [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) · [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) |
| [06-api-ligas-de-pago.md](../pey/06-api-ligas-de-pago.md) | `POST /payment-link/create`, `/update`, `GET /payment-link/{id}` | [Create](https://docs.pey.mx/docs/api/create-payment-link) · [Update](https://docs.pey.mx/docs/api/update-payment-link) · [Get](https://docs.pey.mx/docs/api/get-payment-link) |
| [07-api-transacciones.md](../pey/07-api-transacciones.md) | Las 4 rutas `/transaction/...` y cuál usar para confirmar un pago | [Get Transaction](https://docs.pey.mx/docs/api/get-transaction) · [API Key](https://docs.pey.mx/docs/api/get-api-key-transactions) · [CoDi QR](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) · [Bank Account](https://docs.pey.mx/docs/api/get-bank-account-transactions) |
| [08-tipos-de-datos.md](../pey/08-tipos-de-datos.md) | Transacción, desglose del monto, metadata, cuenta bancaria, error, enumeraciones | [Tipos](https://docs.pey.mx/docs/category/types) |
| [09-webhooks.md](../pey/09-webhooks.md) | Registro, firma Standard Webhooks, historial, 4 eventos con todos sus campos | [Webhooks](https://docs.pey.mx/docs/webhooks/introduction) · [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) |
| [10-tutorial-mostrar-qr-codi.md](../pey/10-tutorial-mostrar-qr-codi.md) | Tutorial oficial de QR y versión propia en JavaScript | [Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) |
| [11-errores-y-limites.md](../pey/11-errores-y-limites.md) | `error.type` por endpoint, cómo reaccionar, límites, lo no documentado | [OpenAPI](https://docs.pey.mx/openapi.json) |
| [12-recursos-de-marca.md](../pey/12-recursos-de-marca.md) | Los 5 archivos oficiales (nombres, formatos, descargas), versión en inglés, lo que no se publica y guía propia de uso | [Recursos de marca](https://docs.pey.mx/brand-assets) · [Brand assets](https://docs.pey.mx/en/brand-assets) |
| [13-registro-de-cambios.md](../pey/13-registro-de-cambios.md) | Las 2 entradas del changelog en orden (sin fechas publicadas), etiqueta "general", versionado y diferencias con K03 | [Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [Etiqueta general](https://docs.pey.mx/docs/tags/general) |
| [14-tutoriales-paso-a-paso.md](../pey/14-tutoriales-paso-a-paso.md) | Los 3 tutoriales oficiales en su orden, con encabezados, anclas, avisos y valores del ejemplo | [Tutoriales](https://docs.pey.mx/docs/category/tutorials) |

## Endpoints (11)

| Método | Ruta | Éxito | Archivo |
|---|---|---|---|
| POST | `/codi/qr` | 201 | [04](../pey/04-api-codi-qr-y-push.md) |
| POST | `/codi/pn` | 200 | [04](../pey/04-api-codi-qr-y-push.md) |
| POST | `/bank-account` | 200 | [05](../pey/05-api-cuentas-bancarias.md) |
| GET | `/bank-account/{id}` | 200 | [05](../pey/05-api-cuentas-bancarias.md) |
| POST | `/payment-link/create` | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| POST | `/payment-link/update` | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| GET | `/payment-link/{id}` | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| GET | `/transaction/{id}` | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/api-key` | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/codi/qr/{id}` | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/bank-account/{id}` | 200 | [07](../pey/07-api-transacciones.md) |

Eventos de webhook (4): `codi.qr.payment_received`, `codi.pn.payment_received`, `bank.account.updated`, `payment_link.status_updated` → [09](../pey/09-webhooks.md).

## Cobertura del mapa del sitio (37 URL, consultado 2026-11-07)

Todas las URL quedaron abiertas y cubiertas; ninguna está pendiente. Las de las cuatro secciones del menú superior (Tutoriales, Documentación, Registro de cambios y Recursos de marca) se abrieron por segunda vez el 2026-11-07, una por una.

| Sección | URL | Dónde quedó |
|---|---|---|
| Tutoriales | https://docs.pey.mx/docs/category/tutorials | 14 (índice: Primeros pasos y Ejemplos) |
| Tutoriales | https://docs.pey.mx/docs/category/getting-started | 14 (índice: 2 tutoriales) |
| Tutoriales | https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key | 02, 14 |
| Tutoriales | https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks | 09, 14 |
| Tutoriales | https://docs.pey.mx/docs/category/examples | 10, 14 (índice: un solo ejemplo) |
| Tutoriales | https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr | 10, 14 |
| Referencia de la API | https://docs.pey.mx/docs/category/api-reference | 03 (índice y tabla por página) |
| Referencia de la API | https://docs.pey.mx/docs/api/codi-api | 01, 03 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-qr | 03, 04 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-push-notification | 03, 04 |
| Referencia de la API | https://docs.pey.mx/docs/api/register-bank-account | 03, 05 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-bank-account | 03, 05 |
| Referencia de la API | https://docs.pey.mx/docs/api/create-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/update-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-payment-link | 03, 06 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-transaction | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-api-key-transactions | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-co-di-qr-transactions | 03, 07 |
| Referencia de la API | https://docs.pey.mx/docs/api/get-bank-account-transactions | 03, 07 |
| Registro de cambios | https://docs.pey.mx/docs/category/changelog | 13 (índice: 2 entradas) |
| Registro de cambios | https://docs.pey.mx/docs/changelog/introduction | 13 |
| Registro de cambios | https://docs.pey.mx/docs/changelog/bank-accounts | 13 |
| Registro de cambios | https://docs.pey.mx/docs/tags | 13 (una sola etiqueta: general) |
| Registro de cambios | https://docs.pey.mx/docs/tags/general | 13 (las 2 entradas del changelog) |
| Recursos de marca | https://docs.pey.mx/brand-assets | 12 |
| Webhooks | https://docs.pey.mx/docs/category/webhooks | 09 (índice) |
| Webhooks | https://docs.pey.mx/docs/webhooks/introduction | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/codi/qr | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/codi/pn | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/bank-account/updated | 09 |
| Webhooks | https://docs.pey.mx/docs/webhooks/payment-link/status-update | 09 |
| Tipos | https://docs.pey.mx/docs/category/types | 08 (índice: 4 tipos; abierto el 2026-11-07) |
| Tipos | https://docs.pey.mx/docs/types/transaction-object | 08 |
| Tipos | https://docs.pey.mx/docs/types/amount-breakdown | 08 |
| Tipos | https://docs.pey.mx/docs/types/metadata-response | 08 |
| Tipos | https://docs.pey.mx/docs/types/bank-account | 05, 08 |
| Inicio | https://docs.pey.mx/ | 01 |

**Fuera del mapa del sitio:**

| URL | Dónde quedó |
|---|---|
| https://docs.pey.mx/openapi.json | 03 a 08, 11 |
| https://docs.pey.mx/en/brand-assets | 12 (mismos 5 archivos; sus descargas apuntan a `/en/img/design/…`, ⚪ no verificadas) |
| https://docs.pey.mx/img/design/pey_blue.svg y los otros 4 archivos de marca | 12 (enlazados; ⚪ su contenido no se pudo leer: el lector web dio error) |
| Las demás páginas en inglés (`/en/...`) | ⚪ No se recorrieron por separado. Las páginas en español enlazan su versión en inglés. |

Notas del recorrido: las páginas `/docs/api/...` se dibujan en el navegador desde el OpenAPI. Leídas como texto solo traen descripción y códigos HTTP (resumidos en [03](../pey/03-referencia-api-convenciones.md)), así que los campos salen del OpenAPI. El sitemap no trae `lastmod`. docs.pey.mx no respondió a `curl` desde este entorno (el proxy regresa 403), así que todo se leyó con un lector web.

## Contradicciones y huecos principales

- **Llaves de prueba:** la página comercial dice que hay llaves de prueba y productivas; la documentación técnica solo tiene producción y un sandbox "próximamente" ([01](../pey/01-que-es-pey-y-codi.md)).
- **Estados de link de pago:** la API incluye `partial`; el webhook no ([06](../pey/06-api-ligas-de-pago.md)).
- **Respuesta ante firma inválida:** el ejemplo de pey responde 500; K03 usa 401. Ambos son "no 2xx" ([09](../pey/09-webhooks.md)).
- **Dónde está la cuenta de prueba:** en el paso "2. Agrega una cuenta de pago" del tutorial, no en "Prueba en producción", que solo la menciona. Se corrigió en [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) y en K03.3.
- **Changelog sin fechas:** ninguna entrada trae fecha y el sitemap no tiene `lastmod` ([13](../pey/13-registro-de-cambios.md)).
- **⚪ Sin documentar:** límite de peticiones, idempotencia, código de llave inválida, reintentos y orden de webhooks, cancelación y devoluciones, comisión por tarjeta ([11](../pey/11-errores-y-limites.md)).

Fuente: [pey: mapa del sitio](https://docs.pey.mx/sitemap.xml) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: API CoDi®](https://pey.mx/api-codi) · [pey: Tutoriales](https://docs.pey.mx/docs/category/tutorials) · [pey: Referencia de la API](https://docs.pey.mx/docs/category/api-reference) · [pey: Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07

<!-- ===== FIN: pey/README.md ===== -->

<!-- ===== INICIO: pey/01-que-es-pey-y-codi.md ===== -->

---
titulo: "Qué es pey y su API CoDi"
resumen: "Quién está detrás de pey, qué hace su API (CoDi con QR y push, cuentas bancarias, links de pago, transacciones), cuánto cuesta, a dónde llega el dinero y la contradicción sobre llaves de prueba."
actualizado: 2026-11-07
fuentes:
  - https://pey.mx/api-codi
  - https://docs.pey.mx/
  - https://docs.pey.mx/docs/api/codi-api
---

# 01 · Qué es pey y su API CoDi

## Quién es pey

- pey (se escribe en minúsculas, con ®) ofrece una API pública para cobrar en México con CoDi® y con tarjeta. La documentación vive en `docs.pey.mx`, en español (predeterminado) y en inglés (rutas con `/en/`).
- El pie de la documentación muestra el copyright 2026 de **Koshi SA de CV**.
- pey.mx enlaza otros productos que no son parte de la API: Restaurantes, Boletera y Personas/PyMEs (app). Aquí solo se documenta la API.
- La portada de la documentación muestra logotipos de empresas (CMR, Grupo Presidente, Office Depot, SEDECO del Gobierno de la CDMX y El Micky). ⚪ No hay detalle de qué usa cada una: no lo presentes como testimonio ni cifra.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Qué hace la API

La especificación se llama **CoDi API**, versión `2026-10-20`. Según su descripción, sirve para:

| Capacidad | Endpoints | Archivo |
|---|---|---|
| Cobrar con un **QR CoDi** generado vía Banxico | `POST /codi/qr` | [04](../pey/04-api-codi-qr-y-push.md) |
| Pedir un pago con una **notificación push CoDi** al celular del cliente | `POST /codi/pn` | [04](../pey/04-api-codi-qr-y-push.md) |
| **Registrar CLABEs** para cobrar a nombre de cada cuenta | `POST /bank-account`, `GET /bank-account/{id}` | [05](../pey/05-api-cuentas-bancarias.md) |
| Crear y consultar **links de pago** (checkout alojado) | `POST /payment-link/create`, `POST /payment-link/update`, `GET /payment-link/{id}` | [06](../pey/06-api-ligas-de-pago.md) |
| Consultar **transacciones** | `GET /transaction/{id}`, `GET /transaction/api-key`, `GET /transaction/codi/qr/{id}`, `GET /transaction/bank-account/{id}` | [07](../pey/07-api-transacciones.md) |
| Recibir **webhooks** firmados | 4 eventos | [09](../pey/09-webhooks.md) |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07

## Dos formas de cobrar

Las dos usan **la misma API key** y **el mismo endpoint de webhooks**:

1. **CoDi®**: transferencias por la red CoDi® de Banxico, liquidadas en pesos (MXN). Puedes mostrar un QR o mandar la solicitud de pago al número de celular del cliente.
2. **Links de pago**: una página de cobro alojada por pey que acepta CoDi, tarjetas, Apple Pay y Google Pay; al terminar (o cancelar) regresa al cliente a las URL de tu sitio.

El flujo base que muestra la portada: creas el cobro (QR o push) → lo compartes con tu cliente → recibes un webhook cuando llega el pago.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · consultado 2026-11-07

## Precio y destino del dinero

- **Precio de la API:** la documentación dice que hoy no hay cuota de alta, plan mensual ni cobro por solicitud. La página comercial lo matiza: gratis «por el momento» y «100% gratuita» en sus preguntas frecuentes. No hay tabla de precios publicada.
- **Destino del dinero:** vinculas la cuenta bancaria que ya tienes (de cualquier banco); no necesitas abrir cuenta ni monedero en pey. La tecnología no depende de una institución financiera.
- **Comisiones con tarjeta:** ⚪ no publicadas. Lo único documentado es que las transacciones traen `applicationFee` (comisión retenida por pey; puede ser `null`) y `amountBreakdown.fee` (comisión que paga quien paga) — ver [08](../pey/08-tipos-de-datos.md).

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: API CoDi®](https://pey.mx/api-codi) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Lo que promete la página comercial

pey.mx/api-codi presenta la API para empresas y equipos de desarrollo con cinco atributos: funciona con cualquier banco; sin costo por ahora; autoservicio (creas tus llaves sin esperar a que pey te contacte); infraestructura en la nube; y webhooks REST firmados con Standard Webhooks.

Sus tres pasos: preparar el acceso (guía del portal y una API key), conectar tu sistema (implementar las peticiones) y configurar webhooks (registrar la URL y validar firmas con el secreto). Enlaza a dos guías: [Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key/) y [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks/).

Contacto comercial para la API: [formulario con servicio "api-codi"](https://pey.mx/contacto?servicio=api-codi); la página también tiene un botón de WhatsApp (número no copiado aquí).

Fuente: [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Contradicción: ¿hay llaves de prueba?

| Fuente | Qué dice |
|---|---|
| Página comercial (pey.mx/api-codi) | En sus preguntas frecuentes afirma que la documentación distingue llaves de prueba (desarrollo) y llaves productivas; su paso 1 habla de crear una API key "para el ambiente de desarrollo". |
| Documentación técnica (docs.pey.mx) | Solo existe producción (`https://api.pey.mx`); el entorno de pruebas aparece como "Próximamente" y recomienda probar en producción con montos pequeños como $0.01 MXN. La guía para crear llaves no menciona llaves de prueba. |

**Cómo actuar:** trata toda llave como productiva y todo pago como real. ⚪ Pregunta a pey si hay llaves de prueba para el hackatón. Detalle en [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md).

Fuente: [pey: API CoDi®](https://pey.mx/api-codi) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07

<!-- ===== FIN: pey/01-que-es-pey-y-codi.md ===== -->

<!-- ===== INICIO: pey/02-primeros-pasos-cuenta-llaves-y-prueba.md ===== -->

---
titulo: "Primeros pasos: perfil, cuenta de pago, API key y prueba en producción"
resumen: "Cómo darse de alta en portal.mipey.mx, qué cuentas de pago existen (codi y stripe), cómo crear la API key, cuánto tarda la CLABE y cómo probar sin sandbox."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key
  - https://docs.pey.mx/docs/api/codi-api
  - https://docs.pey.mx/
---

# 02 · Primeros pasos: cuenta, llaves y prueba

## El portal

Todo el alta pasa en **portal.mipey.mx**:

| Sección del portal | URL | Para qué |
|---|---|---|
| Inicio / perfil | https://portal.mipey.mx/ | Crear tu perfil |
| Finanzas | https://portal.mipey.mx/finance | Crear cuentas de pago |
| Desarrollador | https://portal.mipey.mx/developers | Crear API keys, configurar el webhook y ver sus registros |

⚪ La guía no dice qué datos pide el perfil (correo, RFC, identificación…).

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Paso 1 · Crea un perfil

Entra a portal.mipey.mx y crea tu perfil. Si ya tienes uno, sáltate este paso.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Paso 2 · Agrega una cuenta de pago

En **Finanzas** creas una cuenta de pago. Hay dos tipos:

| Tipo | Qué recibe | Cómo se da de alta |
|---|---|---|
| `codi` | Pagos CoDi® | Capturas directamente los datos de tu cuenta bancaria existente. Solo cuentas bancarias mexicanas. |
| `stripe` | Tarjetas, Apple Pay y Google Pay | Agregas tus datos bancarios por medio de la integración con Stripe. |

- **Tiempo:** el registro de una cuenta bancaria ante Banxico tarda **5 días hábiles** (la referencia de tipos dice "hasta 5 días hábiles").
- **Alternativa por API:** puedes registrar y consultar cuentas con `POST /bank-account` y `GET /bank-account/{id}`, y mandar su `id` como `bankAccountId` al crear un QR o una push. Ver [05](../pey/05-api-cuentas-bancarias.md).

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · consultado 2026-11-07

## Paso 3 · Crea una API key

1. Con la cuenta de pago lista, entra a **Desarrollador** (menú lateral del portal).
2. Da clic en **"Crear API Key"** y ponle un nombre.
3. Vincula una de tus cuentas de pago ya creadas.

Reglas: cada llave puede tener **una cuenta `codi` y una `stripe` al mismo tiempo**, y necesita **al menos una**. La cuenta `codi` vinculada es la que recibe los cobros CoDi cuando no mandas `bankAccountId`.

⚪ No documentado: si la llave se muestra una sola vez, si caduca, si hay permisos por llave o cuántas llaves puedes tener. Cópiala al crearla y guárdala como secreto del servidor.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Prueba en producción y cuenta de prueba

- **No hay sandbox.** pey dice que tendrá un entorno de pruebas dedicado "pronto"; mientras, recomienda probar en producción con bancos, notificaciones CoDi y webhooks reales, usando montos pequeños como **$0.01 MXN**.
- **Cuenta de prueba:** la guía publica una cuenta bancaria de prueba (CLABE y titular) **dentro del paso "2. Agrega una cuenta de pago"**, en el texto destacado "Comienza a probar de inmediato". La sección "Prueba en producción" solo la menciona y enlaza de regreso a ese paso. Se activa **de inmediato**, así que puedes probar el mismo día mientras se activa tu CLABE. **Lo que se le pague no se devuelve.**
- Por privacidad, esta carpeta **no copia** la CLABE ni el nombre del titular: tómalos del [paso 2 oficial](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago).
- Orden completo del tutorial, con sus avisos: [14](../pey/14-tutoriales-paso-a-paso.md).

Fuente: [pey: Crear una API key, paso 2](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago) · [pey: Crear una API key, Prueba en producción](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#test-in-production) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · consultado 2026-11-07

## Entornos

| Entorno | API | Portal |
|---|---|---|
| Producción | `https://api.pey.mx` | `portal.mipey.mx` |
| Pruebas | Próximamente | Próximamente |

El esquema de seguridad del OpenAPI se llama `dev-PublicApiLambdaAuthorizer`, pero el único servidor declarado es producción; no deduzcas un entorno "dev" de ese nombre. Sobre las llaves de prueba que menciona la página comercial, ver la contradicción en [01](../pey/01-que-es-pey-y-codi.md).

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Lista para un agente (Recomendación)

1. La llave y el secreto del webhook van solo en variables de entorno del servidor (en este repo: `PEY_API_KEY` y `PEY_WEBHOOK_SECRET`). Nunca en el navegador, el repo ni los logs.
2. Prueba de humo con 1 centavo (ejemplo propio; espera HTTP 201 con `id` y `qrString`):

```bash
curl -sS https://api.pey.mx/codi/qr \
  -H "Authorization: Bearer $PEY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"amount":0.01,"concept":"Prueba de humo","expiration":600,"numRef":"42"}'
```

3. Convierte `qrString` en QR, págalo desde la app de tu banco y confirma con `GET /transaction/codi/qr/{id}` ([07](../pey/07-api-transacciones.md)) o con el webhook ([09](../pey/09-webhooks.md)).
4. Mientras uses la cuenta de prueba, pon un tope de monto bajo en tu servidor: ese dinero no regresa.

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

<!-- ===== FIN: pey/02-primeros-pasos-cuenta-llaves-y-prueba.md ===== -->

<!-- ===== INICIO: pey/03-referencia-api-convenciones.md ===== -->

---
titulo: "Referencia de la API: convenciones generales"
resumen: "URL base, autenticación Bearer, headers, identificadores (ULID, IDC, folio CoDi), montos, fechas, paginación con nextToken, metadata, formato de error, propiedad de recursos y mapa de los 11 endpoints."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/codi-api
  - https://docs.pey.mx/docs/category/api-reference
---

# 03 · Referencia de la API: convenciones

## Especificación y servidor

- **Especificación:** OpenAPI 3.1.1, título "CoDi API", versión `2026-10-20`. Descarga: https://docs.pey.mx/openapi.json
- **Servidor único:** `https://api.pey.mx` (producción).
- Las páginas de referencia (`/docs/api/...`) se generan del OpenAPI y se dibujan en el navegador; leídas como texto solo muestran descripción y códigos de respuesta. **El OpenAPI es la fuente completa** de campos, tipos y errores.
- La sección `webhooks` del OpenAPI está vacía: los eventos solo se documentan en páginas ([09](../pey/09-webhooks.md)).
- La referencia agrupa los endpoints en: Introduction, CoDi (2), Bank Account (2), Payment Link (3) y Transaction (4).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [Referencia de la API (categoría)](https://docs.pey.mx/docs/category/api-reference) · consultado 2026-11-07

## Autenticación y headers

- Esquema `http`, tipo `bearer`: la API key va en el header `Authorization: Bearer <API key>`. Todas las rutas usan el mismo esquema (`dev-PublicApiLambdaAuthorizer`).
- El tutorial agrega `Content-Type: application/json` y `Accept: application/json`.
- **Sin llave o con llave inválida** no hay un 401 documentado. Lo que sí aparece en ejemplos de error: en transacciones, un 400 `INVALID_REQUEST` (ejemplo `authError`, "apiKeyId no incluido"); en links de pago, un 400 `AUTH_ERROR` (ejemplo `authError`). ⚪ El código real ante una llave mala no está confirmado: maneja 400, 401 y 403.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Identificadores

| Identificador | Formato | Dónde aparece |
|---|---|---|
| IDC del QR | texto asignado por Banxico (el tutorial muestra uno de 10 caracteres hexadecimales) | `id` de `POST /codi/qr`; `codiQrId` en el webhook; ruta de `GET /transaction/codi/qr/{id}` |
| Transacción | ULID | `transactionId` (push y webhooks), `id` de transacciones |
| Folio CoDi de la push | 20 dígitos, asignado por Banxico | `codiId` de `POST /codi/pn` |
| Cuenta bancaria | ULID | `id` / `bankAccountId` |
| Link de pago | ULID | `id` / `paymentLinkId` |
| API key | texto | `apiKeyId` en webhooks; `ownerId` en `bank.account.updated` |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Montos, moneda y fechas

- **Montos en pesos MXN** como número con decimales (`150`, `25.5`, `0.01`), **no en centavos**.
- `POST /payment-link/update` redondea a 2 decimales (mitad hacia arriba) antes de guardar; ⚪ el redondeo en los demás endpoints no está documentado: manda siempre 2 decimales.
- `currency` en transacciones usa códigos ISO 4217 (en la práctica `MXN`).
- **Fechas** (`dateCreated`, `datePaid`): marca de tiempo Unix **en segundos**.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Paginación

- Las listas regresan `{ "items": [...], "nextToken": "<texto o null>" }`, de la más reciente a la más antigua.
- Para la página siguiente manda `?nextToken=<valor>`; omítelo en la primera. `nextToken` es `null` cuando ya no hay más.
- Tamaño: **80** por página en `/transaction/api-key` y `/transaction/bank-account/{id}`; **20** en `/transaction/codi/qr/{id}`.
- Un `nextToken` inválido da 400 `INVALID_PARAMETERS` (ejemplo `invalidNextToken`).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## metadata propia

- `POST /codi/qr`, `POST /codi/pn` y `POST /payment-link/create` aceptan `metadata`: hasta **50** pares; claves de hasta **40** caracteres; valores **escalares** (texto, número, booleano o null; sin objetos ni arreglos) de hasta **500** caracteres.
- Todo se guarda y regresa **como texto** (`12345` → `"12345"`, `false` → `"false"`, `null` → `"null"`).
- En transacciones y webhooks CoDi regresa dentro de `metadata.externalMetadata`; en `GET /payment-link/{id}` regresa en `metadata` del link. Ver [08](../pey/08-tipos-de-datos.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: tipo Respuesta de metadata](https://docs.pey.mx/docs/types/metadata-response) · consultado 2026-11-07

## Formato de error y propiedad de recursos

Todas las rutas responden errores con la misma forma (ejemplo propio):

```json
{ "error": { "message": "Texto legible", "type": "INVALID_AMOUNT", "requestId": "req-ficticio-123" } }
```

- Programa contra `error.type` (enumeración estable por endpoint), no contra `message`. Guarda `requestId` para soporte.
- **Propiedad:** solo ves recursos creados o registrados con tu llave. Un QR, transacción o cuenta de otra llave responde **404** (igual que si no existiera); un link de pago de otra llave puede responder **403** `FORBIDDEN`.
- Catálogo completo por endpoint: [11](../pey/11-errores-y-limites.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Mapa de endpoints (11)

| Método | Ruta | Resumen en el OpenAPI | Éxito | Archivo |
|---|---|---|---|---|
| POST | `/codi/qr` | Create QR | 201 | [04](../pey/04-api-codi-qr-y-push.md) |
| POST | `/codi/pn` | Create Push Notification | 200 | [04](../pey/04-api-codi-qr-y-push.md) |
| POST | `/bank-account` | Register Bank Account | 200 | [05](../pey/05-api-cuentas-bancarias.md) |
| GET | `/bank-account/{id}` | Get Bank Account | 200 | [05](../pey/05-api-cuentas-bancarias.md) |
| POST | `/payment-link/create` | Create Payment Link | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| POST | `/payment-link/update` | Update Payment Link | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| GET | `/payment-link/{id}` | Get Payment Link | 200 | [06](../pey/06-api-ligas-de-pago.md) |
| GET | `/transaction/{id}` | Get Transaction | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/api-key` | Get API Key Transactions | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/codi/qr/{id}` | Get CoDi QR Transactions | 200 | [07](../pey/07-api-transacciones.md) |
| GET | `/transaction/bank-account/{id}` | Get Bank Account Transactions | 200 | [07](../pey/07-api-transacciones.md) |

No hay endpoints para cancelar un QR o una push, devolver un pago, listar cuentas bancarias, listar links de pago ni administrar el webhook.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Qué muestra cada página de la referencia (revisadas una por una)

La categoría "Referencia de la API" muestra cinco tarjetas: Introduction, CoDi (2 artículos), Bank Account (2), Payment Link (3) y Transaction (4). Las tarjetas de grupo abren directo su primer artículo: no hay páginas de grupo aparte. Las páginas escriben el parámetro de ruta como `:id` (por ejemplo `GET /bank-account/:id`); el OpenAPI lo escribe como `{id}`. Todas enlazan el OpenAPI ("Descargar especificación OpenAPI").

| Página | Método y ruta | Códigos que lista | Lo que agrega su texto |
|---|---|---|---|
| [Introduction](https://docs.pey.mx/docs/api/codi-api) | — | — | Versión `2026-10-20`; URL base solo de producción, `https://api.pey.mx`; consejo de probar en producción con $0.01 MXN y sandbox "pronto"; autenticación "Bearer Auth" (HTTP bearer en `Authorization`). Trae un contacto (no se copia aquí) y no trae licencia. |
| [Create QR](https://docs.pey.mx/docs/api/create-qr) | `POST /codi/qr` | 201, 400, 500, 503 | Crea un QR CoDi vía Banxico para recibir pagos. |
| [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) | `POST /codi/pn` | 200, 400, 500, 503 | Manda vía Banxico una notificación de cobro a un teléfono. |
| [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) | `POST /bank-account` | 200, 400, 500, 503 | Registra una CLABE bajo tu llave en `PENDING`; pasa a `ACTIVE` en hasta 5 días hábiles; revísala con Get Bank Account o espera el webhook; ya `ACTIVE`, usa su `id` como `bankAccountId`. |
| [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) | `GET /bank-account/{id}` | 200, 400, 404, 500, 503 | Solo cuentas de tu llave; una inexistente o de otra llave da 404; sirve para ver el paso de `PENDING` a `ACTIVE`. |
| [Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) | `POST /payment-link/create` | 200, 400, 500 | Crea un link; al terminar o cancelar, el cliente regresa a tus URL. |
| [Update Payment Link](https://docs.pey.mx/docs/api/update-payment-link) | `POST /payment-link/update` | 200, 400, 403, 404, 409, 500 | Solo cambia `amount`, solo links de tu llave y solo en `pending`. |
| [Get Payment Link](https://docs.pey.mx/docs/api/get-payment-link) | `GET /payment-link/{id}` | 200, 400, 403, 404, 500 | Solo links creados con tu llave. |
| [Get Transaction](https://docs.pey.mx/docs/api/get-transaction) | `GET /transaction/{id}` | 200, 400, 404, 500 | Solo transacciones de tu llave; 404 si no existe o es de otra; un QR no es una transacción. |
| [Get API Key Transactions](https://docs.pey.mx/docs/api/get-api-key-transactions) | `GET /transaction/api-key` | 200, 400, 500 | Todas las de tu llave, 80 por página; la llave sale del header `Authorization`; sigue con `nextToken`. |
| [Get CoDi QR Transactions](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) | `GET /transaction/codi/qr/{id}` | 200, 400, 404, 500 | Pagos de un QR de tu llave, 20 por página, con `nextToken`; 404 si no existe o es de otra. |
| [Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions) | `GET /transaction/bank-account/{id}` | 200, 400, 404, 500, 503 | Solo pagadas, de la más reciente a la más antigua, 80 por página; QR y push creados con ese `bankAccountId`; sigue con `nextToken`; 404 si es ajena. |

Los campos, tipos y errores de cada ruta no aparecen como texto en estas páginas: salen del OpenAPI ([04](../pey/04-api-codi-qr-y-push.md) a [07](../pey/07-api-transacciones.md) y [11](../pey/11-errores-y-limites.md)).

Fuente: [Referencia de la API (categoría)](https://docs.pey.mx/docs/category/api-reference) · [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · páginas de cada endpoint enlazadas en la tabla · consultado 2026-11-07

## Lo que la referencia no documenta (⚪)

Límite de peticiones (rate limit), idempotencia o llaves de idempotencia, encabezado de versión, CORS (asume que solo se llama desde servidor), tiempos de respuesta garantizados, largo máximo de `concept` y política de compatibilidad entre versiones.

Fuente: [CoDi API: introducción](https://docs.pey.mx/docs/api/codi-api) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

<!-- ===== FIN: pey/03-referencia-api-convenciones.md ===== -->

<!-- ===== INICIO: pey/04-api-codi-qr-y-push.md ===== -->

---
titulo: "API CoDi: crear QR y notificación push"
resumen: "POST /codi/qr y POST /codi/pn campo por campo: tipos, reglas, valores por defecto, respuestas, errores con ejemplos y cuándo usar cada uno."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/create-qr
  - https://docs.pey.mx/docs/api/create-push-notification
---

# 04 · CoDi: QR y notificación push

## POST /codi/qr · Crear QR

Genera vía Banxico un QR CoDi para recibir un pago. Respuesta exitosa: **201**.

**Cuerpo (JSON):**

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `>= 0` | — | Monto en pesos MXN. Con `0`, quien paga escribe el monto al escanear. Sin máximo publicado. |
| `concept` | string | no | largo máximo ⚪ no documentado | — | Concepto que ve quien paga. |
| `expiration` | integer | no | `0`, o `>= 360` | `0` | Vigencia en segundos. `0` = no vence. Si la usas, mínimo 360 (6 min). |
| `numRef` | string | no | `^[0-9]{1,7}$` | `"0"` | Referencia numérica de 1 a 7 dígitos, solo números. |
| `generateImage` | boolean | no | — | `false` | Si es `true`, la respuesta trae `qrImage`. Generarla hace más lenta la respuesta; para ir rápido, pey sugiere dibujar el QR en tu lado a partir de `qrString`. |
| `bankAccountId` | string (ULID) | no | cuenta con `codiStatus: ACTIVE` | — | Cuenta registrada que recibe el pago. Sin él, se usa la cuenta `codi` vinculada a la API key. |
| `metadata` | object | no | hasta 50 pares; clave `<= 40`; valor escalar `<= 500` | — | Datos tuyos; regresan como texto en `metadata.externalMetadata`. |

**Respuesta 201:**

| Campo | Tipo | Qué es |
|---|---|---|
| `id` | string | IDC: identificador único que asigna Banxico. Con él consultas los pagos del QR. |
| `qrString` | string | Contenido que debes codificar como imagen QR. |
| `qrImage` | string o null | PNG en base64. Solo viene con `generateImage: true`; es `null` si falló la imagen (el QR sí se creó). |

**Errores:** 400 (`INVALID_REQUEST`, `PEY_CONSISTENCY_ERROR`, `INVALID_STATE`, `INVALID_AMOUNT`, `INVALID_PARAMETER`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`). Ejemplos con nombre del OpenAPI:

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `invalidAmount` | 400 | `INVALID_AMOUNT` | Monto no numérico o negativo |
| `invalidExpiration` | 400 | `INVALID_PARAMETER` | Vigencia distinta de 0 y menor a 360 s |
| `codiNotEnabled` | 400 | `INVALID_STATE` | La API key no tiene CoDi habilitado |
| `missingBankAccount` | 400 | `PEY_CONSISTENCY_ERROR` | La API key no tiene cuenta bancaria vinculada |
| `invalidRequest` | 400 | `INVALID_REQUEST` | Cuerpo que no es JSON válido |
| `maintenance` | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento; reintenta después |
| `invokeError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación del QR |
| `requestIdError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la obtención del ID de solicitud |

**Ejemplo propio (valores ficticios):**

```json
// Petición
{ "amount": 85.5, "concept": "Pedido 318", "expiration": 900, "numRef": "318",
  "generateImage": true, "metadata": { "pedido": "318", "mesa": 4 } }
// Respuesta 201
{ "id": "a0b1c2d3e4", "qrString": "<contenido CoDi a codificar>", "qrImage": "<PNG en base64 o null>" }
```

Notas: pey no devuelve la hora de vencimiento (calcúlala con `expiration`); no hay endpoint para cancelar un QR.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create QR](https://docs.pey.mx/docs/api/create-qr) · consultado 2026-11-07

## POST /codi/pn · Crear notificación push

Manda vía Banxico una solicitud de pago CoDi al celular de quien paga. Respuesta exitosa: **200**.

**Cuerpo (JSON):**

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `> 0` y `<= 1,000,000` | — | Monto en pesos MXN. |
| `phoneNumber` | string | sí | `^[0-9]{10}$` | — | Celular de 10 dígitos que recibe la notificación. |
| `concept` | string | no | largo ⚪ no documentado | — | Concepto que ve quien paga. |
| `expiration` | integer | no | `>= 360` | `360` | Vigencia de la notificación en segundos. |
| `numRef` | string | no | `^[0-9]{1,7}$` | `"0"` | Referencia numérica de 1 a 7 dígitos. |
| `bankAccountId` | string (ULID) | no | cuenta `ACTIVE` | — | Cuenta que recibe; sin él, la cuenta `codi` de la llave. |
| `metadata` | object | no | igual que en QR | — | Datos tuyos, regresan como texto. |

**Respuesta 200:**

| Campo | Tipo | Qué es |
|---|---|---|
| `transactionId` | string (ULID) | ID interno para seguir el pago con `GET /transaction/{id}`. |
| `codiId` | string | Folio CoDi de 20 dígitos asignado por Banxico. |

**Errores:** 400 (`INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT`, `INVALID_STATE`, `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`).

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `missingPhone` | 400 | `INCOMPLETE_PARAMETERS` | Falta `phoneNumber` |
| `invalidPhone` | 400 | `INVALID_PARAMETER` | `phoneNumber` no es texto de 10 dígitos |
| `invalidAmount` | 400 | `INVALID_AMOUNT` | Monto no mayor que 0 |
| `codiNotEnabled` | 400 | `INVALID_STATE` | La llave no tiene CoDi habilitado |
| `maintenance` | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento |
| `invokeError` | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación de la push |

**Ejemplo propio:**

```json
// Petición
{ "amount": 120, "phoneNumber": "5500000000", "concept": "Mensualidad", "expiration": 600, "numRef": "77" }
// Respuesta 200
{ "transactionId": "01JD0000000000000000000000", "codiId": "00000000000000000000" }
```

⚪ No documentado: qué pasa si el celular no está ligado a CoDi en ningún banco, y si existe un evento de push rechazada o vencida (solo hay evento de pago recibido).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification) · consultado 2026-11-07

## QR o push: cuál usar (Recomendación)

| Criterio | QR (`/codi/qr`) | Push (`/codi/pn`) |
|---|---|---|
| Requiere conocer al cliente | No | Sí, su celular |
| Monto abierto (`amount: 0`) | Sí | No (`> 0`) |
| Vigencia mínima | 0 (no vence) o 360 s | 360 s |
| Cómo confirmar | `GET /transaction/codi/qr/{id}` o webhook `codi.qr.payment_received` | `GET /transaction/{transactionId}` o webhook `codi.pn.payment_received` |
| Riesgo de reintento | Un QR duplicado no cobra dos veces por sí solo | Reintentar tras un timeout puede mandar dos solicitudes al cliente |

Para una demo en vivo conviene el QR: no depende de datos del cliente. No reintentes a ciegas ninguna creación tras un timeout: la API no documenta idempotencia (⚪).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

<!-- ===== FIN: pey/04-api-codi-qr-y-push.md ===== -->

<!-- ===== INICIO: pey/05-api-cuentas-bancarias.md ===== -->

---
titulo: "API de cuentas bancarias: registrar y consultar CLABEs"
resumen: "POST /bank-account y GET /bank-account/{id}: campos, ciclo de vida de codiStatus (PENDING, PROCESSING, ACTIVE, ERROR), errores y cómo cobrar a nombre de cada cuenta con bankAccountId."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/register-bank-account
  - https://docs.pey.mx/docs/api/get-bank-account
  - https://docs.pey.mx/docs/types/bank-account
  - https://docs.pey.mx/docs/changelog/bank-accounts
---

# 05 · Cuentas bancarias

## POST /bank-account · Registrar una cuenta

Registra una CLABE bajo tu API key para que pueda recibir pagos CoDi. La cuenta nace en `PENDING`; pey la registra ante Banxico (hasta 5 días hábiles) y la pasa a `ACTIVE`. Respuesta exitosa: **200**.

**Cuerpo (JSON), los cuatro campos son obligatorios:**

| Campo | Tipo | Reglas | Qué es |
|---|---|---|---|
| `alias` | string | 1 a 255 caracteres | Nombre amigable de la cuenta. |
| `name` | string | 1 a 255 caracteres | Nombre legal completo del titular (persona física o moral). |
| `clabe` | string | `^[0-9]{18}$` y dígito verificador válido | CLABE de 18 dígitos. El banco debe tener CoDi habilitado. |
| `entity` | string (enum) | `BUSINESS` o `PERSON` | Tipo de titular. |

**Respuesta 200:** `id` (ULID de la cuenta en pey) y `codiStatus` (`PENDING` | `PROCESSING` | `ACTIVE` | `ERROR`).

**Errores:** 400 (`INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_CLABE`), 503 (`SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE`), 500 (`INTERNAL_SERVER_ERROR`).

| Ejemplo | HTTP | `error.type` | Causa (parafraseada) |
|---|---|---|---|
| `missingFields` | 400 | `INCOMPLETE_PARAMETERS` | Faltan campos obligatorios |
| `invalidClabe` | 400 | `INVALID_CLABE` | CLABE inválida |
| `invalidEntity` | 400 | `INVALID_PARAMETER` | `entity` distinto de `BUSINESS` o `PERSON` |
| (sin nombre) | 503 | `SERVICE_UNAVAILABLE` | Endpoint en mantenimiento |
| (sin nombre) | 500 | `INTERNAL_SERVER_ERROR` | Falló la creación de la cuenta |

**Ejemplo propio (datos ficticios):**

```json
// Petición
{ "alias": "Puesto de tamales", "name": "Nombre Legal Ficticio", "clabe": "<CLABE de 18 dígitos>", "entity": "PERSON" }
// Respuesta 200
{ "id": "01JE0000000000000000000000", "codiStatus": "PENDING" }
```

⚪ La cuenta puede traer `taxId` (RFC) "si se proporcionó al registrar", pero el cuerpo de este endpoint no tiene campo `taxId`: no está documentado cómo se envía.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account) · consultado 2026-11-07

## GET /bank-account/{id} · Consultar una cuenta

Regresa una cuenta registrada con `POST /bank-account` y su estado CoDi; sirve para ver cuándo pasa de `PENDING` a `ACTIVE`. Solo ves cuentas registradas con tu llave: las de otra llave o inexistentes dan **404**.

- **Parámetro de ruta:** `id` (obligatorio, ULID de la cuenta).
- **Respuesta 200:** el objeto Cuenta bancaria completo: `id`, `alias`, `name`, `clabe`, `entity`, `taxId` (opcional), `codiStatus`, `errorMessage` (solo con `ERROR`) y `dateCreated` (Unix en segundos). Detalle en [08](../pey/08-tipos-de-datos.md).
- **Errores:** 400 `INVALID_REQUEST` o `INCOMPLETE_PARAMETERS` (falta el id en la ruta); 404 `BANK_ACCOUNT_NOT_FOUND`; 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE`; 500 `INTERNAL_SERVER_ERROR` (falló la lectura de la cuenta).

```json
// Respuesta 200 (ejemplo propio)
{ "id": "01JE0000000000000000000000", "alias": "Puesto de tamales", "name": "Nombre Legal Ficticio",
  "clabe": "<CLABE de 18 dígitos>", "entity": "PERSON", "codiStatus": "ACTIVE", "dateCreated": 1794000000 }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account) · consultado 2026-11-07

## Ciclo de vida de codiStatus

| Valor | Significado | Qué hacer |
|---|---|---|
| `PENDING` | Recibida; aún no se manda a Banxico | Esperar |
| `PROCESSING` | Registro ante Banxico en curso | Esperar (hasta 5 días hábiles en total) |
| `ACTIVE` | Registrada; ya puede recibir pagos CoDi | Usar su `id` como `bankAccountId` |
| `ERROR` | Falló el registro | Leer `errorMessage` y corregir |

- Solo las cuentas `ACTIVE` reciben pagos.
- Al pasar a `ACTIVE`, pey manda el webhook `bank.account.updated` (único aviso: `PENDING`, `PROCESSING` y `ERROR` no generan evento; consúltalos con `GET /bank-account/{id}`). Ver [09](../pey/09-webhooks.md).

Fuente: [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · [pey: webhook Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated) · consultado 2026-11-07

## Cobrar a nombre de cada cuenta (multi-cuenta)

1. Registra la CLABE de cada persona o negocio con `POST /bank-account` y guarda el `id`.
2. Espera `ACTIVE` (webhook o consulta).
3. Crea el QR o la push con `bankAccountId: <id>`: el pago va a esa cuenta. Sin `bankAccountId`, va a la cuenta `codi` vinculada a la llave.
4. Los webhooks de pago traen `bankAccountId` solo si lo mandaste al crear el cobro.
5. Para ver lo cobrado por esa cuenta: `GET /transaction/bank-account/{id}` ([07](../pey/07-api-transacciones.md)).

No hay endpoint para listar, editar ni borrar cuentas registradas (⚪ ni vía documentada para hacerlo).

Fuente: [pey: registro de cambios, Cuentas bancarias](https://docs.pey.mx/docs/changelog/bank-accounts) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

<!-- ===== FIN: pey/05-api-cuentas-bancarias.md ===== -->

<!-- ===== INICIO: pey/06-api-ligas-de-pago.md ===== -->

---
titulo: "API de links de pago: crear, actualizar monto y consultar"
resumen: "POST /payment-link/create, POST /payment-link/update y GET /payment-link/{id}: campos, estados (pending, processing, paid, partial), errores 400/403/404/409 y diferencias con el webhook."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/create-payment-link
  - https://docs.pey.mx/docs/api/update-payment-link
  - https://docs.pey.mx/docs/api/get-payment-link
---

# 06 · Links de pago

## Qué es un link de pago

Una página de cobro alojada por pey. Acepta CoDi, tarjetas, Apple Pay y Google Pay; al terminar o cancelar, regresa al cliente a tus URL. Para tarjetas, la API key necesita una cuenta `stripe` vinculada ([02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)). ⚪ Comisión por tarjeta no publicada.

Fuente: [pey: documentación, inicio](https://docs.pey.mx/) · [pey: Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) · consultado 2026-11-07

## POST /payment-link/create · Crear

Respuesta exitosa: **200**.

| Campo | Tipo | Obligatorio | Reglas | Default | Qué hace |
|---|---|---|---|---|---|
| `amount` | number | sí | `> 0` | — | Monto en pesos MXN. |
| `successUrl` | string (uri) | sí | HTTPS | — | A dónde regresa el cliente tras pagar. |
| `backUrl` | string (uri) | sí | HTTPS | — | A dónde regresa si cancela o se regresa. |
| `hasTip` | boolean | no | — | `false` | Activa propina en la página de pago. |
| `clientReferenceId` | string | no | hasta 255 caracteres | — | Tu referencia (p. ej. número de pedido); regresa en el webhook. |
| `metadata` | object | no | 50 pares; clave `<= 40`; valor escalar `<= 500` | — | Regresa como texto. |

**Respuesta 200:** `id` (ULID del link) y `url` (dirección completa para pagar).

**Errores:** 400 (`AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_AMOUNT`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID`) y 500 (`INTERNAL_SERVER_ERROR`). No declara 503.

| Ejemplo | `error.type` | Causa (parafraseada) |
|---|---|---|
| `missingFields` | `INCOMPLETE_PARAMETERS` | Falta `amount`, `successUrl` o `backUrl` |
| `invalidUrl` | `INVALID_URL` | Alguna URL no es HTTPS |
| `invalidAmount` | `INVALID_AMOUNT` | Monto no mayor que 0 |
| `authError` | `AUTH_ERROR` | No se pudo leer la autenticación |
| `parseError` | `REQUEST_PARSING_ERROR` | Cuerpo ilegible |
| `missingApiKeyId` | `PEY_CONSISTENCY_ERROR` | Falta el id de la llave en la autenticación |
| `missingBankAccount` | `PEY_CONSISTENCY_ERROR` | La llave no tiene cuenta bancaria ni de Stripe |
| `invalidHasTip` | `INVALID_HAS_TIP` | `hasTip` no es booleano |
| `invalidClientReferenceId` | `INVALID_CLIENT_REFERENCE_ID` | Referencia no es texto o pasa de 255 |
| `ulidError`, `dbError`, `requestIdError` | `INTERNAL_SERVER_ERROR` (500) | Fallas internas |

```json
// Petición (ejemplo propio)
{ "amount": 349, "successUrl": "https://mi-tienda.example/gracias", "backUrl": "https://mi-tienda.example/carrito",
  "hasTip": false, "clientReferenceId": "pedido-2041" }
// Respuesta 200
{ "id": "01JF0000000000000000000000", "url": "https://<url de pago que entrega pey>" }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Create Payment Link](https://docs.pey.mx/docs/api/create-payment-link) · consultado 2026-11-07

## POST /payment-link/update · Cambiar el monto

Solo cambia `amount`; ningún otro atributo. Solo para links creados con tu llave y **solo mientras el estado sea `pending`**: en cuanto un pago empieza a procesarse o se completa, el monto queda fijo. Respuesta exitosa: **200**.

| Campo | Tipo | Obligatorio | Reglas |
|---|---|---|---|
| `paymentLinkId` | string (ULID) | sí | Link a modificar |
| `amount` | number | sí | `> 0`; se redondea a 2 decimales (mitad hacia arriba) |

El cuerpo no admite otros campos (`additionalProperties: false`). **Respuesta 200:** `id` y `amount` (nuevo monto).

| HTTP | `error.type` | Ejemplo y causa (parafraseada) |
|---|---|---|
| 400 | `INCOMPLETE_PARAMETERS` | `missingFields`: falta `paymentLinkId` o `amount` |
| 400 | `INVALID_PARAMETER` | `unexpectedField`: mandaste un campo extra (p. ej. `successUrl`) |
| 400 | `INVALID_AMOUNT` | `invalidAmount`: monto no mayor que 0 |
| 400 | `INVALID_REQUEST` | `invalidRequest`: la petición no trae el id de la llave |
| 400 | `REQUEST_PARSING_ERROR` | `notAnObject`: el cuerpo no es un objeto JSON |
| 403 | `FORBIDDEN` | Sin permiso sobre ese link |
| 404 | `NOT_FOUND` | El link no existe |
| 409 | `PAYMENT_LINK_NOT_PENDING` | `notPending`: ya no está `pending` |
| 409 | `CONCURRENT_UPDATE` | `concurrentUpdate`: dejó de estar `pending` (o perdiste permiso) durante la actualización |
| 500 | `INTERNAL_SERVER_ERROR` | `retrieveError`, `updateError` |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Update Payment Link](https://docs.pey.mx/docs/api/update-payment-link) · consultado 2026-11-07

## GET /payment-link/{id} · Consultar

Detalle de un link creado con tu llave. Parámetro de ruta `id` (ULID). Respuesta exitosa: **200**.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID |
| `amount` | number | MXN |
| `status` | enum | `pending` \| `processing` \| `paid` \| `partial` (significados ⚪ no definidos) |
| `successUrl`, `backUrl` | string (uri) | |
| `hasTip` | boolean | |
| `paymentMethods` | array de string | Métodos disponibles; sin enumeración formal (el ejemplo muestra `CODI` y `CARD`) |
| `dateCreated` | integer | Unix |
| `clientReferenceId` | string | |
| `metadata` | object | Valores como texto |
| `transactions` | array | Pagos del link: `transactionId`, `paymentMethod`, `datePaid`, `amount`, `amountBreakdown` (solo componentes distintos de cero), `applicationFee` (number o null), `metadata` |

Esta respuesta **no** incluye `url`: guárdala al crear el link.

**Errores:** 400 `AUTH_ERROR` (`authError`), `PEY_CONSISTENCY_ERROR` (`missingApiKeyId`), `INCOMPLETE_PARAMETERS` (`missingId`: falta el id en la ruta); 403 `FORBIDDEN`; 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR` (`retrieveError`, `requestIdError`).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Payment Link](https://docs.pey.mx/docs/api/get-payment-link) · consultado 2026-11-07

## Estados: diferencia entre la API y el webhook

| Fuente | Valores de `status` |
|---|---|
| `GET /payment-link/{id}` (OpenAPI) | `pending`, `processing`, `paid`, `partial` |
| Webhook `payment_link.status_updated` | `paid`, `pending`, `processing` |

⚪ `partial` no aparece en el webhook y ninguna fuente explica su significado. Recomendación: trata cualquier valor desconocido como "no pagado" y confirma con `GET /payment-link/{id}`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhook Actualización de estado del link de pago](https://docs.pey.mx/docs/webhooks/payment-link/status-update) · consultado 2026-11-07

## Flujo típico (Recomendación)

1. Tu servidor crea el link con `clientReferenceId` = id de tu pedido y guarda `id` y `url`.
2. Rediriges al cliente a `url`.
3. Llega `payment_link.status_updated` con `status: "paid"` → verificas la firma y confirmas con `GET /payment-link/{id}`.
4. La redirección a `successUrl` no prueba el pago: el cliente puede abrir esa URL a mano.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

<!-- ===== FIN: pey/06-api-ligas-de-pago.md ===== -->

<!-- ===== INICIO: pey/07-api-transacciones.md ===== -->

---
titulo: "API de transacciones: consultar pagos"
resumen: "GET /transaction/{id}, /transaction/api-key, /transaction/codi/qr/{id} y /transaction/bank-account/{id}: campos, paginación, errores y cuál usar para confirmar un pago."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
  - https://docs.pey.mx/docs/api/get-transaction
  - https://docs.pey.mx/docs/api/get-api-key-transactions
  - https://docs.pey.mx/docs/api/get-co-di-qr-transactions
  - https://docs.pey.mx/docs/api/get-bank-account-transactions
---

# 07 · Transacciones

## Campos de una transacción (forma completa)

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID |
| `status` | enum | `PENDING` \| `PAID` |
| `amount` | number | Total en MXN |
| `amountBreakdown` | object | `base`, `tip`, `fee`; el `fee` lo paga quien paga |
| `currency` | string | ISO 4217 |
| `paymentMethod` | enum | `CARD` \| `CODI` |
| `payableType` | enum | Qué se pagó: `PAYMENT_LINK` \| `API_CODI_QR` \| `API_CODI_PN` |
| `payableId` | string | ID del recurso pagado, si existe |
| `description` | string | Concepto o descripción, si existe |
| `applicationFee` | number | Comisión de la operación, si existe |
| `dateCreated` | integer | Unix |
| `datePaid` | integer | Unix; solo cuando ya está pagada |
| `metadata` | object | Depende del método y flujo; ver [08](../pey/08-tipos-de-datos.md) |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## GET /transaction/{id} · Una transacción

- Una transacción recibida con tu llave. Si no existe o es de otra llave: **404** (no se distinguen los dos casos).
- **Un QR no es una transacción:** para los pagos de un QR usa `GET /transaction/codi/qr/{id}`.
- Sirve para seguir una push: usa el `transactionId` que regresó `POST /codi/pn`.
- **Ruta:** `id` (ULID). **Respuesta 200:** un objeto con los campos de arriba.
- **Errores:** 400 `INVALID_REQUEST` (`authError`: no viene el id de la llave) o `INCOMPLETE_PARAMETERS` (`missingId`); 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Transaction](https://docs.pey.mx/docs/api/get-transaction) · consultado 2026-11-07

## GET /transaction/api-key · Todo lo de tu llave

- Todas las transacciones recibidas por tu llave (la llave sale del header `Authorization`), **80 por página**, de la más reciente a la más antigua.
- **Query:** `nextToken` (opcional). **Respuesta 200:** `{ items: [transacción completa…], nextToken }`; `nextToken` es `null` al final.
- **Errores:** 400 `INVALID_REQUEST` (`authError`) o `INVALID_PARAMETERS` (`invalidNextToken`); 500 `INTERNAL_SERVER_ERROR`.
- No hay filtros por fecha, estado ni método: filtra en tu servidor.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get API Key Transactions](https://docs.pey.mx/docs/api/get-api-key-transactions) · consultado 2026-11-07

## GET /transaction/codi/qr/{id} · Pagos de un QR

- Pagos de un QR creado con tu llave, **20 por página**, de la más reciente a la más antigua. QR inexistente o de otra llave: **404** `NOT_FOUND`.
- **Ruta:** `id` = IDC del QR (el `id` que regresó `POST /codi/qr`). **Query:** `nextToken`.
- **Cada item:** `id`, `status` (`PENDING` | `PAID`), `amount`, `amountBreakdown`, `currency`, `paymentMethod` (`CODI`), `description`, `applicationFee`, `dateCreated`, `datePaid` (solo pagada) y `metadata`. El esquema de esta ruta no lista `payableType` ni `payableId`.
- **Errores:** 400 `INVALID_REQUEST` (`authError`), `INCOMPLETE_PARAMETERS` (`missingId`) o `INVALID_PARAMETERS` (`invalidNextToken`); 404 `NOT_FOUND`; 500 `INTERNAL_SERVER_ERROR`.

```json
// Respuesta 200 (ejemplo propio)
{ "items": [ { "id": "01JG0000000000000000000000", "status": "PAID", "amount": 85.5, "currency": "MXN",
               "paymentMethod": "CODI", "amountBreakdown": { "base": 85.5, "tip": 0, "fee": 0 },
               "description": "Pedido 318", "dateCreated": 1794000000, "datePaid": 1794000042,
               "metadata": { "externalMetadata": { "pedido": "318", "mesa": "4" } } } ],
  "nextToken": null }
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get CoDi QR Transactions](https://docs.pey.mx/docs/api/get-co-di-qr-transactions) · consultado 2026-11-07

## GET /transaction/bank-account/{id} · Lo cobrado por una cuenta registrada

- Transacciones **pagadas** que recibió una cuenta registrada con `POST /bank-account`: QR y push CoDi creados con ese `bankAccountId`. **80 por página**, de la más reciente a la más antigua. Cuenta inexistente o de otra llave: **404**.
- **Ruta:** `id` (ULID de la cuenta). **Query:** `nextToken`.
- **Cada item:** `id`, `status` (solo `PAID`), `amount`, `amountBreakdown`, `currency`, `paymentMethod` (solo `CODI`), `payableType` (`API_CODI_QR` | `API_CODI_PN`), `payableId`, `description`, `applicationFee`, `dateCreated`, `datePaid`, `metadata` (con `externalMetadata` de texto a texto; admite más campos).
- **Errores:** 400 `INVALID_REQUEST` (`authError`), `INCOMPLETE_PARAMETERS` (`missingId`) o `INVALID_PARAMETERS` (`invalidNextToken`); 404 `BANK_ACCOUNT_NOT_FOUND`; 503 `SERVICE_UNAVAILABLE` o `FLAGS_UNAVAILABLE`; 500 `INTERNAL_SERVER_ERROR`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions) · consultado 2026-11-07

## Cuál usar para confirmar un pago (Recomendación)

| Cobraste con… | Confirma con… | Pagado si… |
|---|---|---|
| QR | `GET /transaction/codi/qr/{id}` (IDC) | algún item tiene `status: "PAID"` y el `amount` esperado |
| Push | `GET /transaction/{transactionId}` | `status: "PAID"` |
| Link de pago | `GET /payment-link/{id}` | `status: "paid"` ([06](../pey/06-api-ligas-de-pago.md)) |
| Cuenta registrada | `GET /transaction/bank-account/{id}` | aparece el pago con su `payableId` |

- Un 404 no prueba que no pagaron: puede ser un ID equivocado o de otra llave.
- Compara monto y moneda en tu servidor; no basta con encontrar cualquier `PAID`.
- La ruta de pagos de un QR regresa una lista paginada, lo que sugiere que un QR puede tener más de un pago (⚪ no confirmado): revisa todos los items.
- ⚪ Límite de peticiones no documentado: si haces polling, espacia las consultas (p. ej. cada 3 a 5 s) y detente al vencer el cobro.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

<!-- ===== FIN: pey/07-api-transacciones.md ===== -->

<!-- ===== INICIO: pey/08-tipos-de-datos.md ===== -->

---
titulo: "Tipos de datos de pey"
resumen: "Objeto de transacción (forma resumida y completa), desglose del monto, respuesta de metadata (campos CoDi y externalMetadata), cuenta bancaria, objeto de error y todas las enumeraciones."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/types/transaction-object
  - https://docs.pey.mx/docs/types/amount-breakdown
  - https://docs.pey.mx/docs/types/metadata-response
  - https://docs.pey.mx/docs/types/bank-account
  - https://docs.pey.mx/openapi.json
---

# 08 · Tipos de datos

## Objeto de transacción (forma resumida)

Es la forma corta que aparece en `GET /payment-link/{id}` y en el webhook `payment_link.status_updated`. La forma completa (con estado, moneda y recurso pagado) sale de `GET /transaction/{id}` ([07](../pey/07-api-transacciones.md)).

| Campo | Tipo | Notas |
|---|---|---|
| `transactionId` | string | ULID |
| `paymentMethod` | string | Método usado (el ejemplo muestra `CARD`; la forma completa enumera `CARD` y `CODI`) |
| `datePaid` | number | Unix en segundos |
| `amount` | number | Total cobrado; incluye propina y comisión |
| `amountBreakdown` | object | Ver "Desglose del monto" |
| `applicationFee` | number o null | Comisión de aplicación que retiene pey |
| `metadata` | object | Depende del método y el flujo; ver "Respuesta de metadata" |

Fuente: [pey: tipo Objeto de transacción](https://docs.pey.mx/docs/types/transaction-object) · consultado 2026-11-07

## Desglose del monto (amountBreakdown)

| Campo | Tipo | Qué es |
|---|---|---|
| `base` | number | Monto base |
| `tip` | number | Propina incluida |
| `fee` | number | Comisión incluida; según el OpenAPI la paga quien paga |

- La página del tipo no da fórmula; el objeto de transacción dice que `amount` incluye propina y comisión, y el ejemplo del webhook de links es consistente con `amount = base + tip + fee` (⚪ inferencia, no regla escrita).
- En los links de pago, el desglose solo incluye componentes distintos de cero: trata un campo ausente como 0.

Fuente: [pey: tipo Desglose del monto](https://docs.pey.mx/docs/types/amount-breakdown) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Respuesta de metadata

Los campos dependen del método de pago y del flujo:

| Campo | Tipo | Cuándo viene | Qué es |
|---|---|---|---|
| `clabe` | string | método `CODI` | CLABE (18 dígitos) que recibe |
| `bankCode` | number | método `CODI` | Código de banco de Banxico (5 dígitos) |
| `accountType` | number | método `CODI` | Código de tipo de cuenta de Banxico (2 dígitos) |
| `description` | string | método `CODI` | Descripción de la transacción |
| `trackingKey` | string | método `CODI` | Clave de rastreo interna de Banxico |
| `externalMetadata` | object | solo si mandaste `metadata` al crear el recurso por la API REST | Tus pares clave/valor, **todos como texto** |

- ⚪ No documentado: qué campos trae `metadata` en pagos con tarjeta.
- `clabe` y `trackingKey` son datos bancarios: no los registres en logs públicos.

Fuente: [pey: tipo Respuesta de metadata](https://docs.pey.mx/docs/types/metadata-response) · consultado 2026-11-07

## Cuenta bancaria

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | ULID; úsalo como `bankAccountId` |
| `alias` | string | Nombre amigable |
| `name` | string | Nombre legal completo del titular |
| `clabe` | string | 18 dígitos |
| `entity` | string | `BUSINESS` \| `PERSON` |
| `taxId` | string | RFC; solo si se dio al registrar |
| `codiStatus` | string | `PENDING` \| `PROCESSING` \| `ACTIVE` \| `ERROR` |
| `errorMessage` | string | Solo con `ERROR` |
| `dateCreated` | number | Unix en segundos |

`POST /bank-account` solo regresa `id` y `codiStatus`; el objeto completo sale de `GET /bank-account/{id}`. Ciclo de vida en [05](../pey/05-api-cuentas-bancarias.md).

Fuente: [pey: tipo Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account) · consultado 2026-11-07

## Objeto de error

| Campo | Tipo | Qué es |
|---|---|---|
| `error.message` | string | Texto legible (no programes contra él) |
| `error.type` | string (enum por endpoint) | Código para tu lógica |
| `error.requestId` | string | ID para soporte |

Catálogo completo en [11](../pey/11-errores-y-limites.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Enumeraciones (resumen)

| Campo | Valores | Dónde |
|---|---|---|
| `status` (transacción) | `PENDING`, `PAID` | `/transaction/*` (`/transaction/bank-account/{id}` solo `PAID`) |
| `paymentMethod` | `CARD`, `CODI` | transacciones |
| `payableType` | `PAYMENT_LINK`, `API_CODI_QR`, `API_CODI_PN` | `/transaction/{id}`, `/transaction/api-key`, `/transaction/bank-account/{id}` |
| `status` (link de pago) | `pending`, `processing`, `paid`, `partial` | `GET /payment-link/{id}` (el webhook solo lista `paid`, `pending`, `processing`) |
| `codiStatus` | `PENDING`, `PROCESSING`, `ACTIVE`, `ERROR` | cuentas bancarias |
| `entity` | `BUSINESS`, `PERSON` | cuentas bancarias |
| `ownerType` | `API_KEY` (cuentas registradas por API) | webhook `bank.account.updated` |
| `type` (evento) | `codi.qr.payment_received`, `codi.pn.payment_received`, `bank.account.updated`, `payment_link.status_updated` | webhooks |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

<!-- ===== FIN: pey/08-tipos-de-datos.md ===== -->

<!-- ===== INICIO: pey/09-webhooks.md ===== -->

---
titulo: "Webhooks de pey: configuración, firma y eventos"
resumen: "Cómo se registra el webhook (uno por API key), cómo verificar la firma Standard Webhooks con el cuerpo crudo, historial de entregas y los cuatro eventos con todos sus campos."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/webhooks/introduction
  - https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks
  - https://docs.pey.mx/docs/webhooks/codi/qr
  - https://docs.pey.mx/docs/webhooks/codi/pn
  - https://docs.pey.mx/docs/webhooks/bank-account/updated
  - https://docs.pey.mx/docs/webhooks/payment-link/status-update
---

# 09 · Webhooks

## Cómo funcionan

- pey te avisa en tiempo real cuando pasa algo en tu cuenta, en lugar de que consultes la API a cada rato.
- El webhook se liga a la **API key**: **una llave tiene un solo webhook** (una sola URL). CoDi y links de pago llegan al mismo endpoint.
- Todas las peticiones van **firmadas con Standard Webhooks** (https://www.standardwebhooks.com/).
- La sección `webhooks` del OpenAPI está vacía: los eventos solo se documentan en las páginas de abajo.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · [pey: documentación, inicio](https://docs.pey.mx/) · consultado 2026-11-07

## Configurar el webhook en el portal

1. Ten una API key ([02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)).
2. En **Desarrollador** (https://portal.mipey.mx/developers), busca tu llave y da clic en su **ícono de engrane**.
3. En la ventana, escribe la URL que recibirá los eventos y da clic en **"Crear Webhook"**.
4. Se muestra el **secreto de firma**: guárdalo (lo necesitas para verificar). Puedes **rotarlo** cuando quieras desde el mismo engrane.

La URL debe ser pública y estable. ⚪ No documentado: si exige HTTPS, si se puede cambiar la URL sin borrar el webhook y si hay API para administrarlo.

Fuente: [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## Firma: Standard Webhooks

Lo que dice pey:
- Verifica la firma para confirmar que el evento viene de pey; recomienda los **SDK oficiales de Standard Webhooks** ([lista de implementaciones](https://github.com/standard-webhooks/standard-webhooks?tab=readme-ov-file#reference-implementations)).
- Verifica con el **cuerpo crudo**, sin parsear ni reformatear.
- El header **`webhook-id`** es la llave de idempotencia: úsalo para descartar entregas repetidas.
- Su ejemplo (Python con la librería de Standard Webhooks, en AWS Lambda detrás de API Gateway) lee el secreto de una variable de entorno o gestor de secretos (marcador con prefijo `whsec_`), responde 400 si el JSON no se puede leer, 200 si la firma es válida y **500** si no lo es.

Lo que viene de la especificación Standard Webhooks (pey no lo repite en sus páginas, ⚪ en pey): headers `webhook-id`, `webhook-timestamp` y `webhook-signature` (`v1,<firma en base64>`, puede haber varias separadas por espacio); la firma es HMAC-SHA256 de `id.timestamp.cuerpo` con el secreto sin `whsec_` decodificado de base64. Detalle y fuentes en [K03.5](../conocimiento/03-codi-y-api-pey.md).

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Ejemplo propio de verificación (Node.js 20+, sin dependencias)

```js
// Verifica un webhook de pey (Standard Webhooks). `cuerpo` es el texto crudo: await request.text().
import crypto from "node:crypto";

export function firmaValida({ secreto, headers, cuerpo, toleranciaSeg = 300 }) {
  const id = headers.get("webhook-id");
  const ts = headers.get("webhook-timestamp");
  const firmas = headers.get("webhook-signature");
  if (!secreto || !id || !ts || !firmas) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > toleranciaSeg) return false; // evita repeticiones viejas
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${ts}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    const recibida = Buffer.from(b64 ?? "", "base64");
    return version === "v1" && recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}
```

Una versión equivalente con pruebas automatizadas está en [K03.7](../conocimiento/03-codi-y-api-pey.md). La tolerancia de 5 minutos es decisión propia.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Respuesta, reintentos e historial

- Responde rápido con 2xx cuando la firma sea válida; el ejemplo de pey responde 200.
- **Historial:** Desarrollador → engrane de la llave → botón **"Webhook Logs"**. Muestra cada intento de entrega, el payload enviado, la respuesta de tu endpoint y otros datos. Úsalo para depurar.
- ⚪ No documentado: política y calendario de reintentos, tiempo máximo de espera, orden de entrega y si hay eventos duplicados. Diseña para entregas repetidas y fuera de orden.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

## Evento codi.qr.payment_received

Se dispara cuando entra un pago a un QR CoDi creado por la API.

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `codi.qr.payment_received` |
| `amount` | number | MXN |
| `apiKeyId` | string | Llave dueña del webhook |
| `bankAccountId` | string | Solo si lo mandaste al crear el QR |
| `codiQrId` | string | IDC del QR (el `id` de `POST /codi/qr`) |
| `concept` | string | Concepto que vio quien pagó |
| `datePaid` | number | Unix en **segundos** |
| `metadata` | object | Campos CoDi (`clabe`, `bankCode`, `accountType`, `description`, `trackingKey`) y `externalMetadata` ([08](../pey/08-tipos-de-datos.md)) |
| `numRef` | string | Número de referencia (la página dice que lo asigna Banxico) |
| `transactionId` | string | ULID de la transacción |

```json
{ "type": "codi.qr.payment_received", "amount": 85.5, "apiKeyId": "llave-ficticia", "codiQrId": "a0b1c2d3e4",
  "concept": "Pedido 318", "datePaid": 1794000042, "numRef": "318", "transactionId": "01JG0000000000000000000000",
  "metadata": { "trackingKey": "<clave de rastreo>", "externalMetadata": { "pedido": "318" } } }
```

Fuente: [pey: webhook QR CoDi, pago recibido](https://docs.pey.mx/docs/webhooks/codi/qr) · consultado 2026-11-07

## Evento codi.pn.payment_received

Se dispara cuando se completa un pago de notificación push CoDi. Mismos campos que el evento de QR **sin `codiQrId`**: `type` (`codi.pn.payment_received`), `amount`, `apiKeyId`, `bankAccountId` (solo si lo mandaste al crear la push), `concept`, `datePaid`, `metadata`, `numRef` y `transactionId` (el mismo que regresó `POST /codi/pn`).

Fuente: [pey: webhook notificación push CoDi, pago recibido](https://docs.pey.mx/docs/webhooks/codi/pn) · consultado 2026-11-07

## Evento bank.account.updated

Se manda **solo** cuando una cuenta registrada por API pasa a `ACTIVE` (no por `PENDING`, `PROCESSING` ni `ERROR`).

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `bank.account.updated` |
| `bankAccountId` | string | ULID; úsalo como `bankAccountId` en cobros |
| `name` | string | Nombre legal del titular |
| `ownerType` | string | `API_KEY` si se registró por API |
| `ownerId` | string | ID de la llave cuando `ownerType` es `API_KEY` |
| `taxId` | string | RFC; opcional |
| `codiStatus` | string | Siempre `ACTIVE` aquí |
| `clabe` | string | 18 dígitos |
| `entity` | string | `BUSINESS` \| `PERSON` |

No trae `alias`, `errorMessage` ni `dateCreated`: pídelos con `GET /bank-account/{id}`. Trae datos personales y bancarios: no los registres completos.

Fuente: [pey: webhook Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated) · consultado 2026-11-07

## Evento payment_link.status_updated

Se dispara cuando cambia el estado de un link de pago.

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | `payment_link.status_updated` |
| `apiKeyId` | string | Llave dueña |
| `paymentLinkId` | string | ULID del link |
| `status` | string | `paid` \| `pending` \| `processing` (la API además tiene `partial`; ver [06](../pey/06-api-ligas-de-pago.md)) |
| `clientReferenceId` | string | La referencia que mandaste al crear |
| `transactions` | array | Objetos de transacción resumidos: `transactionId`, `paymentMethod`, `datePaid`, `amount`, `amountBreakdown`, `applicationFee`, `metadata` |

No trae el monto del link: si lo necesitas, usa `GET /payment-link/{id}`.

Fuente: [pey: webhook Actualización de estado del link de pago](https://docs.pey.mx/docs/webhooks/payment-link/status-update) · consultado 2026-11-07

## Reglas para el handler (Recomendación)

1. Lee el cuerpo crudo, verifica la firma y solo después parsea.
2. Deduplica por `webhook-id` (y por `transactionId` si generas efectos de negocio), en almacenamiento persistente: la memoria de una función serverless no dura.
3. Enruta por `type`; ignora con 2xx los tipos que no conozcas.
4. No confíes solo en el evento para dinero: confirma con la API ([07](../pey/07-api-transacciones.md)) y compara monto y moneda.
5. Registra solo identificadores (`webhook-id`, `type`, `transactionId`), nunca CLABE, nombre ni el cuerpo completo.
6. El secreto vive en una variable de entorno del servidor; si se filtra, rótalo desde el engrane.

Fuente: [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

<!-- ===== FIN: pey/09-webhooks.md ===== -->

<!-- ===== INICIO: pey/10-tutorial-mostrar-qr-codi.md ===== -->

---
titulo: "Tutorial: mostrar un QR CoDi"
resumen: "Los tres pasos del tutorial oficial (crear el QR, dibujar la imagen desde qrString, esperar el webhook) y una versión propia en JavaScript para navegador y servidor."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr
  - https://docs.pey.mx/openapi.json
---

# 10 · Tutorial: mostrar un QR CoDi

## Requisito

Una API key ligada a una cuenta de pago con acceso `codi` ([02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)). Es el único ejemplo de la categoría "Ejemplos" de la documentación. Encabezados oficiales, anclas y valores exactos del ejemplo: [14](../pey/14-tutoriales-paso-a-paso.md).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Paso 1 · Crear el QR

- `POST https://api.pey.mx/codi/qr` con `Authorization: Bearer <llave>`, `Content-Type: application/json` y `Accept: application/json`.
- El ejemplo oficial (Python con `requests`) manda monto, concepto, `expiration: 0` (sin vencimiento) y un `numRef`, y guarda la respuesta.
- La respuesta trae `id` (identificador del QR) y `qrString`. El `qrString` del ejemplo es un texto largo con forma de JSON y campos cifrados (claves como `TYP`, `v`, `ic`, `CRY`): **no lo modifiques**, solo codifícalo.
- Opción: `generateImage: true` agrega `qrImage` en base64 (PNG según el OpenAPI). El tutorial sugiere un decodificador base64 en línea para verlo; no subas QRs reales a sitios de terceros.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Paso 2 · Generar la imagen

- El tutorial usa la librería de Python `qrcode` (https://pypi.org/project/qrcode/): tamaño automático, corrección de errores nivel M, módulos de 10 px y borde de 4 módulos; negro sobre blanco; guarda un PNG.
- Cualquier app bancaria compatible con CoDi puede escanear la imagen resultante.
- No da guía de tamaño mínimo ni de contraste. **Recomendación:** muéstralo grande (al menos ~250 px de lado en pantalla), negro sobre blanco y con el borde blanco intacto.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Paso 3 · Esperar el pago

Cuando el cliente escanea y paga, pey manda el webhook `codi.qr.payment_received` ([09](../pey/09-webhooks.md)). Como respaldo puedes consultar `GET /transaction/codi/qr/{id}` ([07](../pey/07-api-transacciones.md)).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · consultado 2026-11-07

## Versión propia en JavaScript

El tutorial solo trae Python. Equivalente propio: el servidor crea el QR y el navegador lo dibuja.

```js
// Servidor (Node 20+): crea el QR. La llave sale de una variable de entorno.
const r = await fetch("https://api.pey.mx/codi/qr", {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.PEY_API_KEY}`, "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({ amount: 1, concept: "Demo", expiration: 600, numRef: "1", generateImage: true }),
});
const { id, qrString, qrImage } = await r.json(); // manda al navegador solo id, qrString y qrImage

// Navegador: usa la imagen de pey si vino; si no, dibuja qrString con una librería de QR.
const img = document.querySelector("#qr");
if (qrImage) img.src = `data:image/png;base64,${qrImage}`;
// else: genera el QR desde qrString con la librería que elijas (⚪ pey no recomienda ninguna en JS).
img.alt = "Código QR CoDi para pagar";
```

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

<!-- ===== FIN: pey/10-tutorial-mostrar-qr-codi.md ===== -->

<!-- ===== INICIO: pey/11-errores-y-limites.md ===== -->

---
titulo: "Errores y límites de la API de pey"
resumen: "Catálogo de error.type por endpoint y código HTTP, cómo reaccionar a cada familia, límites documentados (montos, vigencias, referencias, metadata, paginación) y lo que no está documentado."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/openapi.json
---

# 11 · Errores y límites

## Errores por endpoint

Forma común: `{ "error": { "message", "type", "requestId" } }`. Valores exactos del OpenAPI:

| Endpoint | 400 | 403 | 404 | 409 | 503 | 500 |
|---|---|---|---|---|---|---|
| `POST /codi/qr` | `INVALID_REQUEST`, `PEY_CONSISTENCY_ERROR`, `INVALID_STATE`, `INVALID_AMOUNT`, `INVALID_PARAMETER` | — | — | — | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` | `INTERNAL_SERVER_ERROR` |
| `POST /codi/pn` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT`, `INVALID_STATE`, `PEY_CONSISTENCY_ERROR`, `BAD_REQUEST` | — | — | — | igual | igual |
| `POST /bank-account` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_CLABE` | — | — | — | igual | igual |
| `GET /bank-account/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS` | — | `BANK_ACCOUNT_NOT_FOUND` | — | igual | igual |
| `POST /payment-link/create` | `AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_AMOUNT`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID` | — | — | — | — | igual |
| `POST /payment-link/update` | `INVALID_REQUEST`, `REQUEST_PARSING_ERROR`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETER`, `INVALID_AMOUNT` | `FORBIDDEN` | `NOT_FOUND` | `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE` | — | igual |
| `GET /payment-link/{id}` | `AUTH_ERROR`, `PEY_CONSISTENCY_ERROR`, `INCOMPLETE_PARAMETERS` | `FORBIDDEN` | `NOT_FOUND` | — | — | igual |
| `GET /transaction/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS` | — | `NOT_FOUND` | — | — | igual |
| `GET /transaction/api-key` | `INVALID_REQUEST`, `INVALID_PARAMETERS` | — | — | — | — | igual |
| `GET /transaction/codi/qr/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETERS` | — | `NOT_FOUND` | — | — | igual |
| `GET /transaction/bank-account/{id}` | `INVALID_REQUEST`, `INCOMPLETE_PARAMETERS`, `INVALID_PARAMETERS` | — | `BANK_ACCOUNT_NOT_FOUND` | — | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` | igual |

Ojo con la ortografía: CoDi y cuentas usan `INVALID_PARAMETER` (singular); las rutas de transacciones usan `INVALID_PARAMETERS` (plural). Los ejemplos con nombre de cada error están en [04](../pey/04-api-codi-qr-y-push.md), [05](../pey/05-api-cuentas-bancarias.md), [06](../pey/06-api-ligas-de-pago.md) y [07](../pey/07-api-transacciones.md).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Cómo reaccionar (Recomendación)

| Familia | Ejemplos de `type` | Qué hacer |
|---|---|---|
| Datos inválidos | `INVALID_AMOUNT`, `INVALID_PARAMETER(S)`, `INCOMPLETE_PARAMETERS`, `INVALID_URL`, `INVALID_CLABE`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID`, `INVALID_REQUEST`, `REQUEST_PARSING_ERROR`, `BAD_REQUEST` | No reintentes igual: corrige la entrada y muestra un mensaje claro. Valida antes en tu servidor. |
| Cuenta o llave mal configurada | `INVALID_STATE` (CoDi no habilitado), `PEY_CONSISTENCY_ERROR` (llave sin cuenta vinculada), `AUTH_ERROR` | Revisa el portal: cuenta `codi` activa y vinculada a la llave. Mensaje sugerido: "Tu cuenta de pey todavía no está habilitada para cobrar." |
| No existe o no es tuyo | `NOT_FOUND`, `BANK_ACCOUNT_NOT_FOUND`, `FORBIDDEN` | Revisa el ID y que uses la misma llave con la que lo creaste. Un 404 no prueba que no hubo pago. |
| Estado no permite la acción | `PAYMENT_LINK_NOT_PENDING`, `CONCURRENT_UPDATE` | Vuelve a leer el link; no reintentes la actualización. |
| Servicio | `SERVICE_UNAVAILABLE`, `FLAGS_UNAVAILABLE` (503), `INTERNAL_SERVER_ERROR` (500) | Reintenta solo lecturas (GET) con espera creciente. Antes de repetir una creación, verifica si la primera sí se creó. |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Límites documentados

| Dato | Límite |
|---|---|
| `amount` en QR | `>= 0` (0 = monto abierto); sin máximo publicado |
| `amount` en push | `> 0` y `<= 1,000,000` |
| `amount` en links | `> 0`; al actualizar se redondea a 2 decimales |
| `expiration` en QR | `0` (no vence, default) o `>= 360` s |
| `expiration` en push | `>= 360` s (default 360) |
| `numRef` | 1 a 7 dígitos (`^[0-9]{1,7}$`), default `"0"` |
| `phoneNumber` | 10 dígitos |
| `metadata` | 50 pares; clave `<= 40`; valor escalar `<= 500`; regresa como texto |
| `clientReferenceId` | `<= 255` caracteres |
| `successUrl`, `backUrl` | HTTPS obligatorio |
| `alias`, `name` (cuenta) | 1 a 255 caracteres |
| `clabe` | 18 dígitos con dígito verificador válido; banco con CoDi habilitado |
| `bankAccountId` | solo cuentas `ACTIVE` |
| Página de resultados | 80 (`/transaction/api-key`, `/transaction/bank-account/{id}`); 20 (`/transaction/codi/qr/{id}`) |
| Webhook | uno por API key |
| Cuentas por llave | una `codi` y una `stripe`, mínimo una |
| Registro de CLABE | hasta 5 días hábiles |

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## No documentado (⚪)

- Límite de peticiones por minuto y qué código regresa al excederlo.
- Idempotencia de `POST /codi/qr`, `POST /codi/pn` y `POST /payment-link/create`.
- Código HTTP exacto con una llave ausente o inválida (los ejemplos muestran 400 `INVALID_REQUEST` o `AUTH_ERROR`).
- Largo máximo de `concept`; monto máximo de un QR; límites por banco.
- Reintentos, timeout y orden de los webhooks; eventos de pago rechazado, vencido o devuelto.
- Cancelación de QR o push y devoluciones por API.
- Significado de `partial` en links y de `FLAGS_UNAVAILABLE`.

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · consultado 2026-11-07

<!-- ===== FIN: pey/11-errores-y-limites.md ===== -->

<!-- ===== INICIO: pey/12-recursos-de-marca.md ===== -->

---
titulo: "Recursos de marca de pey y CoDi"
resumen: "Todo lo que publica la página oficial de recursos de marca: cinco archivos con nombre, formato y URL de descarga, la versión en inglés y la única regla publicada. También lo que no publica (colores, tipografía, área de respeto, tamaño mínimo, usos prohibidos) y una guía propia para el hackatón."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/brand-assets
  - https://docs.pey.mx/en/brand-assets
  - https://pey.mx/api-codi
---

# 12 · Recursos de marca

## La página

- **URL:** https://docs.pey.mx/brand-assets, con el título "Recursos de marca" y enlace en el menú superior de la documentación. Versión en inglés: https://docs.pey.mx/en/brand-assets ("Brand assets").
- **Para qué es:** ofrece los logotipos oficiales de pey y de CoDi para usarlos en tu integración: checkout, app o documentación.
- **Única indicación de uso:** descarga los archivos **en lugar de recrearlos**.
- Pie de la página: "Copyright © 2026 Koshi SA de CV".

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07

## Archivos oficiales (5)

| Nombre en la página | Archivo | Formato | Descarga oficial |
|---|---|---|---|
| Logotipo pey - azul | `pey_blue.svg` | SVG | https://docs.pey.mx/img/design/pey_blue.svg |
| Logotipo pey - blanco | `pey-logo-blanco.svg` | SVG | https://docs.pey.mx/img/design/pey-logo-blanco.svg |
| pey + CoDi - fondo claro | `pey_codi_light.svg` | SVG | https://docs.pey.mx/img/design/pey_codi_light.svg |
| pey + CoDi - fondo oscuro | `pey_codi_dark.svg` | SVG | https://docs.pey.mx/img/design/pey_codi_dark.svg |
| Animación de pago CoDi | `loading_codi.gif` | GIF | https://docs.pey.mx/img/design/loading_codi.gif |

- Solo los dos logos combinados dicen para qué fondo son (claro u oscuro). Para el logo de pey solo, la página dice el color (azul o blanco), no el fondo.
- La vista previa de la animación en la página usa `loading_codi_preview.gif` (https://docs.pey.mx/img/design/loading_codi_preview.gif); el botón de descarga apunta a `loading_codi.gif`.
- No hay PNG, PDF ni ZIP: solo cuatro SVG y un GIF.
- Esta carpeta **no guarda copias** de los archivos: enlaza los oficiales.
- ⚪ No pude leer el interior de los SVG (colores exactos y proporciones): el lector web dio error al abrirlos el 2026-11-07 y el proxy de este entorno bloquea `curl` a docs.pey.mx.

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · consultado 2026-11-07

## Versión en inglés

Tiene los mismos cinco recursos: "pey logo - blue", "pey logo - white", "pey + CoDi - light background", "pey + CoDi - dark background" y "CoDi payment animation". Sus botones de descarga apuntan a `/en/img/design/<mismo archivo>` (por ejemplo, https://docs.pey.mx/en/img/design/pey_blue.svg). ⚪ No verifiqué que las rutas con `/en/` descarguen: usa las de la página en español. Tampoco publica reglas, colores ni tipografía.

Fuente: [pey: Brand assets (inglés)](https://docs.pey.mx/en/brand-assets) · consultado 2026-11-07

## Lo que la página no publica (⚪)

Revisado en español y en inglés el 2026-11-07:

- **Colores:** no hay paleta (ni hex, RGB, CMYK o Pantone). Solo aparecen las palabras "azul" y "blanco" en los nombres.
- **Tipografía:** no se menciona.
- **Área de respeto y tamaño mínimo:** no se mencionan.
- **Usos permitidos y prohibidos:** no hay lista (deformar, recolorear, rotar, efectos, fondos con poco contraste).
- **Aviso legal o licencia:** no hay aviso de marcas, licencia ni reglas para poner el logo junto a otra marca.
- **Marca CoDi® de Banxico:** la página no da reglas propias de CoDi; ⚪ no consulté si Banxico publica un manual de uso.
- pey.mx usa además `https://pey.mx/pey.svg` y `https://pey.mx/pey-white.svg` en su sitio. No aparecen en la página de recursos (⚪ no están confirmados como recursos para terceros).

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · [pey: Brand assets (inglés)](https://docs.pey.mx/en/brand-assets) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

## Guía propia para el producto (Recomendación, no es regla de pey)

**Permitido según la página:** usar estos cinco archivos oficiales en el checkout, la app o la documentación, descargados y sin recrearlos.

**Recomendaciones:**
1. En la pantalla de cobro con fondo claro usa `pey_codi_light.svg`; con fondo oscuro, `pey_codi_dark.svg`. Si solo va pey: el azul sobre fondo claro y el blanco sobre fondo oscuro.
2. Usa los SVG tal cual: sin deformar, recolorear, recortar, rotar ni agregar sombras, y escálalos de forma proporcional.
3. Mientras esperas la confirmación del pago, `loading_codi.gif` encaja con su nombre ("Animación de pago CoDi"). Acompáñalo de texto ("Esperando tu pago…") y ofrece una alternativa sin movimiento para quien tiene activado `prefers-reduced-motion`.
4. Pon texto alternativo en español, por ejemplo `alt="pey y CoDi"`.
5. No inventes un "azul pey" en hex para botones: no está publicado (⚪). Usa tu propia paleta con contraste AA.
6. No des a entender que pey o Banxico patrocinan o avalan el proyecto. En textos formales escribe "pey®" y "CoDi®", como lo hace pey en su sitio.

Fuente: [pey: Recursos de marca](https://docs.pey.mx/brand-assets) · [pey: API CoDi®](https://pey.mx/api-codi) · consultado 2026-11-07

<!-- ===== FIN: pey/12-recursos-de-marca.md ===== -->

<!-- ===== INICIO: pey/13-registro-de-cambios.md ===== -->

---
titulo: "Registro de cambios de la API de pey"
resumen: "Las dos entradas del changelog oficial (Introducción y Cuentas bancarias) en su orden, con lo que agregó y cambió cada una. Incluye la etiqueta 'general', la falta de fechas (ni en las páginas ni en el sitemap), la versión del OpenAPI y las diferencias con K03."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/category/changelog
  - https://docs.pey.mx/docs/changelog/introduction
  - https://docs.pey.mx/docs/changelog/bank-accounts
  - https://docs.pey.mx/docs/tags
  - https://docs.pey.mx/docs/tags/general
  - https://docs.pey.mx/sitemap.xml
  - https://docs.pey.mx/openapi.json
---

# 13 · Registro de cambios

## Cómo está organizado

| Página | URL | Qué contiene |
|---|---|---|
| Registro de cambios (categoría) | https://docs.pey.mx/docs/category/changelog | Lista dos entradas, en este orden: "Introducción" y "Cuentas bancarias", cada una con una línea de descripción. |
| Introducción | https://docs.pey.mx/docs/changelog/introduction | Entrada 1 |
| Cuentas bancarias | https://docs.pey.mx/docs/changelog/bank-accounts | Entrada 2, la última (no tiene página siguiente) |
| Etiquetas | https://docs.pey.mx/docs/tags | Una sola etiqueta: "general" |
| Etiqueta "general" | https://docs.pey.mx/docs/tags/general | "2 documentos etiquetados": las dos entradas |

**Fechas: ninguna.** Ninguna entrada publica fecha, versión ni autor. La página de la etiqueta tampoco, y el sitemap no trae `lastmod` (sus 37 URL solo dicen `changefreq` semanal y prioridad 0.5). ⚪ No se puede saber cuándo salió cada cambio. El único dato con forma de fecha es la versión del OpenAPI, `2026-10-20`, que versiona la especificación; ⚪ no está confirmado que corresponda a la entrada "Cuentas bancarias".

Fuente: [pey: Registro de cambios](https://docs.pey.mx/docs/category/changelog) · [pey: etiqueta general](https://docs.pey.mx/docs/tags/general) · [pey: etiquetas](https://docs.pey.mx/docs/tags) · [pey: mapa del sitio](https://docs.pey.mx/sitemap.xml) · consultado 2026-11-07

## Entrada 1 · Introducción (sin fecha)

- Da la bienvenida a la documentación pública de pey.
- Dice que esta sección llevará el registro general de cambios conforme evolucione la API, y que por ahora no tiene contenido.
- Etiqueta: general. **No registra ningún cambio.**

Fuente: [pey: registro de cambios, Introducción](https://docs.pey.mx/docs/changelog/introduction) · consultado 2026-11-07

## Entrada 2 · Cuentas bancarias (sin fecha)

En resumen: ya puedes registrar cuentas bancarias CoDi por API y elegir qué cuenta recibe cada pago CoDi. Etiqueta: general.

**Nuevos endpoints** (así se llama la sección oficial):

| Elemento | Qué agrega | Detalle |
|---|---|---|
| Register Bank Account (`POST /bank-account`) | Registra una CLABE bajo tu API key. Empieza en `PENDING` y pasa a `ACTIVE` cuando pey termina el registro ante Banxico. | [05](../pey/05-api-cuentas-bancarias.md) |
| Get Bank Account (`GET /bank-account/{id}`) | Regresa una cuenta registrada con su `codiStatus`. | [05](../pey/05-api-cuentas-bancarias.md) |
| Tipo "Cuenta bancaria" | Describe el objeto y sus valores de estado. | [08](../pey/08-tipos-de-datos.md) |
| Webhook "Cuenta bancaria actualizada" (`bank.account.updated`) | Se manda cuando una cuenta registrada por API pasa a `ACTIVE`. | [09](../pey/09-webhooks.md) |

**Cambios:**

| Elemento | Qué cambió | Detalle |
|---|---|---|
| Create QR (`POST /codi/qr`) y Create Push Notification (`POST /codi/pn`) | Aceptan `bankAccountId` opcional. Si no lo mandas, el pago va a la cuenta CoDi vinculada a tu API key. | [04](../pey/04-api-codi-qr-y-push.md) |
| Webhooks "Notificación push" (`codi.pn.payment_received`) y "QR" (`codi.qr.payment_received`) | Incluyen `bankAccountId` cuando se mandó en la petición. | [09](../pey/09-webhooks.md) |
| Get Bank Account Transactions (`GET /transaction/bank-account/{id}`) | Ahora documenta `externalMetadata` y solo lista transacciones CoDi. | [07](../pey/07-api-transacciones.md) |

No lista eliminaciones, pasos de migración ni avisos de cambios incompatibles.

Enlaces de la entrada: [Register Bank Account](https://docs.pey.mx/docs/api/register-bank-account), [Get Bank Account](https://docs.pey.mx/docs/api/get-bank-account), [Cuenta bancaria](https://docs.pey.mx/docs/types/bank-account), [Cuenta bancaria actualizada](https://docs.pey.mx/docs/webhooks/bank-account/updated), [Create QR](https://docs.pey.mx/docs/api/create-qr), [Create Push Notification](https://docs.pey.mx/docs/api/create-push-notification), [Notificación push](https://docs.pey.mx/docs/webhooks/codi/pn), [QR](https://docs.pey.mx/docs/webhooks/codi/qr) y [Get Bank Account Transactions](https://docs.pey.mx/docs/api/get-bank-account-transactions).

Fuente: [pey: registro de cambios, Cuentas bancarias](https://docs.pey.mx/docs/changelog/bank-accounts) · consultado 2026-11-07

## Versionado

- El OpenAPI (3.1.1) declara la versión `2026-10-20` y seguía igual el 2026-11-07.
- ⚪ No documentado: un header para fijar la versión, la política de compatibilidad y cómo se avisan los cambios incompatibles.
- **Recomendación:** antes de la demo, vuelve a abrir la categoría del changelog y revisa la versión del OpenAPI. Si cambió algo, compáralo contra [03](../pey/03-referencia-api-convenciones.md) a [11](../pey/11-errores-y-limites.md).

Fuente: [pey: registro de cambios, Introducción](https://docs.pey.mx/docs/changelog/introduction) · [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · consultado 2026-11-07

## Diferencias frente a K03 (consultas del 2026-11-06)

- Endpoint que K03 no listaba: `GET /transaction/bank-account/{id}`.
- Errores de links de pago que K03 no listaba: `AUTH_ERROR`, `REQUEST_PARSING_ERROR`, `INVALID_URL`, `INVALID_HAS_TIP`, `INVALID_CLIENT_REFERENCE_ID` y `FORBIDDEN` (403 por un link de otra llave, no por una llave inválida).
- `amountBreakdown.fee` lo paga quien paga; en links, el desglose omite los componentes en cero.
- Según pey, `webhook-id` es la llave de idempotencia; su ejemplo responde 500 ante una firma inválida.
- Sigue publicada la misma versión del OpenAPI (`2026-10-20`).
- La cuenta de prueba está en el paso "2. Agrega una cuenta de pago" del tutorial, no en "Prueba en producción" (corregido en K03.3 y en [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md)).

Fuente: [CoDi API: especificación OpenAPI](https://docs.pey.mx/openapi.json) · [pey: webhooks, introducción](https://docs.pey.mx/docs/webhooks/introduction) · [pey: Crear una API key, paso 2](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key#2-agrega-una-cuenta-de-pago) · consultado 2026-11-07

<!-- ===== FIN: pey/13-registro-de-cambios.md ===== -->

<!-- ===== INICIO: pey/14-tutoriales-paso-a-paso.md ===== -->

---
titulo: "Tutoriales oficiales de pey, paso a paso"
resumen: "Los tres tutoriales de docs.pey.mx (Crear una API key, Configurar webhooks y Mostrar un QR CoDi) en su orden oficial: encabezados, anclas, pasos, avisos, enlaces e imágenes, con redacción propia y avisos para el hackatón."
actualizado: 2026-11-07
fuentes:
  - https://docs.pey.mx/docs/category/tutorials
  - https://docs.pey.mx/docs/category/getting-started
  - https://docs.pey.mx/docs/category/examples
  - https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key
  - https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks
  - https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr
---

# 14 · Tutoriales oficiales, paso a paso

Este archivo sigue el orden y los encabezados de cada tutorial oficial. El detalle técnico y el código propio están en [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md), [09](../pey/09-webhooks.md) y [10](../pey/10-tutorial-mostrar-qr-codi.md).

## Cómo está organizada la sección

| Página | URL | Qué contiene |
|---|---|---|
| Tutoriales (categoría) | https://docs.pey.mx/docs/category/tutorials | Solo dos tarjetas: "Primeros pasos" (2 artículos) y "Ejemplos" (1 artículo). No tiene texto propio. |
| Primeros pasos (categoría) | https://docs.pey.mx/docs/category/getting-started | Tarjetas de "Crear una API key" y "Configurar webhooks". |
| Ejemplos (categoría) | https://docs.pey.mx/docs/category/examples | Una tarjeta: "Mostrar un QR CoDi". |

- **Orden de la paginación del sitio:** Tutoriales → Primeros pasos → Crear una API key → Configurar webhooks → Ejemplos → Mostrar un QR CoDi.
- El tutorial de QR vive en `/docs/tutorials/use-cases/...`, aunque su categoría se llame "Ejemplos".
- Cada página tiene versión en inglés bajo `/en/...` (por ejemplo, https://docs.pey.mx/en/docs/category/tutorials). No se recorrieron por separado.
- **No hay tutoriales** de notificación push, links de pago, registro de cuentas por API ni consulta de pagos: para eso usa [04](../pey/04-api-codi-qr-y-push.md), [05](../pey/05-api-cuentas-bancarias.md), [06](../pey/06-api-ligas-de-pago.md) y [07](../pey/07-api-transacciones.md).

Fuente: [pey: Tutoriales](https://docs.pey.mx/docs/category/tutorials) · [pey: Primeros pasos](https://docs.pey.mx/docs/category/getting-started) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Tutorial 1 · Crear una API key

URL: https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key. La página abre diciendo que lo primero es generar una API key en el portal de pey. Su esquema real es un título y cuatro secciones H2; "Comienza a probar de inmediato" y "Registra cuentas bancarias a través de la API" son textos destacados dentro del paso 2, no encabezados.

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 1 | "1. Crea un perfil" (`#1-crea-un-perfil`) | Entra a https://portal.mipey.mx/ y crea tu perfil. Si ya tienes uno, sigue al paso 2. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2 | "2. Agrega una cuenta de pago" (`#2-agrega-una-cuenta-de-pago`) | En **Finanzas** (https://portal.mipey.mx/finance) crea una cuenta de pago. Tabla de tipos: `stripe` (tus datos bancarios por la integración con Stripe, para tarjetas, Apple Pay y Google Pay) y `codi` (solo cuentas bancarias mexicanas; capturas tus datos directo, para pagos CoDi®). | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.1 | Recuadro "aviso" | Registrar una cuenta bancaria ante Banxico tarda **5 días hábiles**. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.2 | "Comienza a probar de inmediato" | La página publica una **cuenta bancaria de prueba** (CLABE y titular; aquí no se copian) que se activa al momento, para probar en producción el mismo día. Lo que se le pague **no se devuelve**; usa montos pequeños como $0.01 MXN. Puedes registrarla mientras se activa la tuya. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 2.3 | "Registra cuentas bancarias a través de la API" | Alternativa: registra cuentas CoDi con Register Bank Account, revisa su estado con Get Bank Account y manda su `id` como `bankAccountId` al crear un QR o una push. | [05](../pey/05-api-cuentas-bancarias.md) |
| 2.4 | Imagen | Captura de la pantalla de Finanzas con las opciones para aceptar pagos (texto alternativo oficial: "Elegir una opción de finanzas para aceptar pagos"). | — |
| 3 | "3. Crea una API key" (`#3-crea-una-api-key`) | Con la cuenta de pago lista, entra a **Desarrollador** en la barra lateral (https://portal.mipey.mx/developers), da clic en **"Crear API Key"**, ponle nombre y vincula una de tus cuentas de pago. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 3.1 | Recuadro "info" | Cada llave puede tener a la vez una cuenta `codi` y una `stripe`; necesita al menos una. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |
| 4 | "Prueba en producción" (`#test-in-production`) | pey recomienda probar directo en producción, con bancos, notificaciones CoDi® y webhooks reales, para ver el mismo flujo que tus clientes; montos como $0.01 MXN; no esperes a que se active tu cuenta: usa la de prueba (el enlace regresa a `#2-agrega-una-cuenta-de-pago`). Recuadro "nota": un sandbox dedicado llegará "pronto"; mientras, producción es la forma más confiable de validar de punta a punta. | [02](../pey/02-primeros-pasos-cuenta-llaves-y-prueba.md) |

Navegación: anterior "Primeros pasos", siguiente "Configurar webhooks".

Fuente: [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

## Tutorial 2 · Configurar webhooks

URL: https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 0 | Recuadro "info" inicial | Tres consideraciones: el webhook se liga a una API key; cada llave tiene **un solo** webhook; las peticiones se firman con la especificación [Standard Webhooks](https://www.standardwebhooks.com/). | [09](../pey/09-webhooks.md) |
| 0.1 | Recuadro de aviso (requisito) | Necesitas una API key antes de empezar; si no la tienes, ve al tutorial 1. | — |
| 1 | "1. Configura un webhook" (`#1-configura-un-webhook`) | En **Desarrollador** (https://portal.mipey.mx/developers) busca tu llave en la lista y da clic en su **ícono de engrane**; en la ventana emergente escribe la URL que recibirá los eventos y da clic en **"Crear Webhook"**. Imagen con texto alternativo "Configuración de la API key para configurar el webhook". | [09](../pey/09-webhooks.md) |
| 2 | "2. Guarda el secreto del webhook" (`#2-guarda-el-secreto-del-webhook`) | Al crear el webhook aparece el **secreto de firma**: guárdalo, tu endpoint lo necesita. Recuadro "info": puedes **rotar** el secreto cuando quieras desde el mismo engrane de la llave. | [09](../pey/09-webhooks.md) |
| 3 | "3. Crea tu endpoint de webhooks" (`#3-crea-tu-endpoint-de-webhooks`) | Construye tu endpoint; para verificar firmas pey recomienda los SDK de Standard Webhooks ([implementaciones de referencia](https://github.com/standard-webhooks/standard-webhooks?tab=readme-ov-file#reference-implementations)); el resto está en la [introducción de Webhooks](https://docs.pey.mx/docs/webhooks/introduction). | [09](../pey/09-webhooks.md) |

Esta página **no trae** código, nombres de headers, eventos, códigos HTTP ni política de reintentos: todo eso está en [09](../pey/09-webhooks.md). Navegación: anterior "Crear una API key", siguiente "Ejemplos".

Fuente: [pey: Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks) · consultado 2026-11-07

## Tutorial 3 · Mostrar un QR CoDi

URL: https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr (ruta de migas: Inicio › Tutoriales › Ejemplos › Mostrar un QR CoDi). Explica cómo crear un QR CoDi por API y mostrarlo como imagen escaneable. Recuadro de aviso: necesitas una API key vinculada a una cuenta de pago `codi`.

| # | Sección oficial (ancla) | Qué se hace, en orden | Detalle |
|---|---|---|---|
| 1 | "1. Crea un QR CoDi" (`#1-crea-un-qr-codi`) | `POST https://api.pey.mx/codi/qr` (enlace a [Create QR](https://docs.pey.mx/docs/api/create-qr)) con `Content-Type: application/json`, `Accept: application/json` y `Authorization: Bearer <tu llave>`. El ejemplo es Python con `requests`; cuerpo: `amount` 150, `concept` "Order #9423", `expiration` 0 y `numRef` "9423". Respuesta de ejemplo: `id` (10 caracteres hexadecimales) y `qrString` (texto con forma de JSON, recortado en la página). | [04](../pey/04-api-codi-qr-y-push.md), [10](../pey/10-tutorial-mostrar-qr-codi.md) |
| 1.1 | Recuadro "info" | Si usas `generateImage` y quieres ver el `qrImage` en base64 en el navegador, sugiere un decodificador en línea (https://base64.guru/converter/decode/file). | [10](../pey/10-tutorial-mostrar-qr-codi.md) |
| 2 | "2. Genera la imagen del QR" (`#2-genera-la-imagen-del-qr`) | `pip install qrcode` ([qrcode en PyPI](https://pypi.org/project/qrcode/)); lee `qrString` de la respuesta; `qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4)`, luego `add_data(...)`, `make(fit=True)`, `make_image(fill_color="black", back_color="white")` y `save("codi-qr.png")`. Cualquier app bancaria compatible con CoDi puede escanear la imagen. Imagen de muestra con texto alternativo "Ejemplo de QR CoDi". | [10](../pey/10-tutorial-mostrar-qr-codi.md) |
| 3 | "3. Recibe la notificación del pago" | Cuando el cliente escanea y paga, llega el webhook `codi.qr.payment_received` (enlace a "Pago de QR CoDi recibido": https://docs.pey.mx/docs/webhooks/codi/qr). | [09](../pey/09-webhooks.md) |

Navegación: anterior "Ejemplos"; no hay página siguiente en la sección.

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Ejemplos](https://docs.pey.mx/docs/category/examples) · consultado 2026-11-07

## Avisos para el hackatón (Recomendación)

- El ejemplo oficial cobra **$150**: en producción es dinero real. En este repo, pruebas y demo van de $0.01 a $1 con tope en el servidor ([AGENTS.md](../AGENTS.md), sección 3).
- `expiration: 0` crea un QR que no vence: úsalo solo para el QR de respaldo; en la demo, `expiration` de 600.
- No pegues `qrImage` ni `qrString` reales en decodificadores de terceros: muéstralo en tu propia página como `data:image/png;base64,…` ([10](../pey/10-tutorial-mostrar-qr-codi.md)).
- Los tutoriales están en Python; la versión propia en JavaScript para Vercel está en [10](../pey/10-tutorial-mostrar-qr-codi.md) y el handler de webhook verificado en [09](../pey/09-webhooks.md).

Fuente: [pey: tutorial Mostrar un QR CoDi](https://docs.pey.mx/docs/tutorials/use-cases/display-codi-qr) · [pey: Crear una API key](https://docs.pey.mx/docs/tutorials/getting-started/create-an-api-key) · consultado 2026-11-07

<!-- ===== FIN: pey/14-tutoriales-paso-a-paso.md ===== -->

<!-- ===== INICIO: codi/README.md ===== -->

# CoDi® (Cobro Digital de Banco de México) en Markdown

Versión de trabajo, en español de México y con redacción propia, de la documentación pública de CoDi y de su regulación, **consultada el 2026-11-07**. Es la base RAG para agentes que construyan sobre la API de pey. **No es documentación oficial ni asesoría legal:** ante cualquier duda, manda la fuente enlazada al final de cada sección.

- **Marcas:** ⚪ = no confirmado en una fuente leída hoy. "Recomendación" = decisión de ingeniería, no lo dice Banxico. Los ejemplos usan datos ficticios.
- **Datos personales:** no se copian correos ni teléfonos de personas; solo contactos institucionales de Banxico.
- **Relación con el resto del repo:** la API de pey está en [pey/README.md](../pey/README.md); la síntesis con código de referencia, en [K03](../conocimiento/03-codi-y-api-pey.md); la ley de pagos digitales y el plazo del 14-dic, en [K02](../conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md).

## Resumen para quien construye (10 líneas)

1. CoDi es una plataforma de Banxico para **cobrar**: quien cobra manda un mensaje de cobro y quien paga lo autoriza en la app de su banco. El dinero viaja por SPEI.
2. Canales: **QR** con o sin monto, **notificación al celular** de quien paga y NFC. pey ofrece QR (`/codi/qr`) y notificación (`/codi/pn`).
3. Funciona 24/7, **sin comisión** para nadie y **sin contracargos**. Quien cobró puede devolver el pago completo o en parte.
4. **Monto:** desde el 23-feb-2026, los bancos deben aceptar mensajes de cobro de hasta **6,000 UDIS** (Circular 2/2025). Tu servidor pone su propio tope.
5. **Tu app no puede pagar**, solo cobrar. Pagar es función exclusiva de los participantes del SPEI.
6. **Sin cuentas concentradoras ni recargos** por pagar con CoDi: el dinero va directo a la CLABE de cada comercio (`bankAccountId`).
7. **Pagado** solo cuando pey dice `PAID` o llega un webhook con firma válida. El formato del QR no es público: usa el `qrString` de pey.
8. **14-dic-2026:** vence el plazo para que bancos y participantes homologuen sus apps, incluido el pago de mensajes de cobro CoDi (Circular 9/2026). Las cuentas de nivel 2 a 4 deben poder recibir transferencias con el número celular (Circular 10/2026).
9. **Uso real:** más de 21 millones de cuentas validadas (sep-2025), pero ~2.9 millones han pagado y ~1.1 millones han cobrado; 11,375 operaciones el 20-oct-2026 (preliminar).
10. Push de pey ≠ DiMo: DiMo es para **enviar** dinero al celular de quien recibe; CoDi es para **cobrar**.

Fuente: síntesis de los archivos 01 a 11 de esta carpeta, cada uno con sus fuentes · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Archivos

| Archivo | Tema | Enlace oficial principal |
|---|---|---|
| [01-que-es-codi.md](../codi/01-que-es-codi.md) | Qué es, beneficios, requisitos, qué no es | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) |
| [02-como-funciona.md](../codi/02-como-funciona.md) | Flujo, canales (QR, notificación, NFC), montos en UDIS, horarios, acreditación, Folio CoDi, devoluciones | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: cobrar](https://www.codi.org.mx/secundarias/cobrar.html) |
| [03-actores-y-participantes.md](../codi/03-actores-y-participantes.md) | Banxico, SPEI, 34 participantes obligados, terceros desarrolladores, reglas y certificación | [Banxico: avances](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · [Guía de participación](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) |
| [04-como-paga-y-cobra-una-persona.md](../codi/04-como-paga-y-cobra-una-persona.md) | Paso a paso en la app: pagar por QR o notificación, cobrar, app CoDi® Banxico | [codi.org.mx: pagar](https://www.codi.org.mx/secundarias/pagar.html) |
| [05-seguridad-y-proteccion.md](../codi/05-seguridad-y-proteccion.md) | Autorización, abuso, requisitos de apps, aclaraciones, privacidad | [Términos de la Plataforma](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) |
| [06-regulacion-y-plazos.md](../codi/06-regulacion-y-plazos.md) | Circulares 14/2017, 2/2025, 9/2026 y 10/2026; Guías de homologación; línea de tiempo | [SIDOF: 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [SIDOF: 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) |
| [07-cifras-de-uso.md](../codi/07-cifras-de-uso.md) | Cuentas validadas, operaciones y montos con fecha; contradicción de "cifras estimadas" | [codi.org.mx: estadísticas](https://www.codi.org.mx/secundarias/estadisticas.html) |
| [08-preguntas-frecuentes.md](../codi/08-preguntas-frecuentes.md) | Preguntas oficiales y preguntas de quien construye | [codi.org.mx: preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) |
| [09-marca-logotipos-y-material.md](../codi/09-marca-logotipos-y-material.md) | Licencia de la marca, logos, PDF y video oficiales | [Términos de la Plataforma](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) |
| [10-codi-spei-dimo.md](../codi/10-codi-spei-dimo.md) | Comparación CoDi, SPEI y DiMo; confusiones comunes | [Banxico: CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) |
| [11-como-encaja-pey.md](../codi/11-como-encaja-pey.md) | pey como tercero desarrollador, mapa CoDi → API de pey, reglas para el producto, argumentos de pitch | [codi.org.mx: desarrolladores](https://www.codi.org.mx/secundarias/desarrolladores.html) · [pey/README](../pey/README.md) |

Fuente: [codi.org.mx](https://www.codi.org.mx/index.html) · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Fuentes consultadas el 2026-11-07

| Fuente | Tipo | URL |
|---|---|---|
| Banco de México: CoDi® Cobro Digital | Oficial | https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html |
| Banco de México: avances de las instituciones en CoDi® (act. 10-jul-2026) | Oficial | https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html |
| Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023) | Oficial | https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf |
| Banco de México: Términos y condiciones de la Plataforma CoDi® | Oficial | https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf |
| Banco de México: modificaciones a la Circular 14/2017 (texto anterior y reformado) | Oficial | https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf |
| Banxico SIE: cuadros CF881, CF882, CF884 y CF885 | Oficial | https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es (cambia `idCuadro`) |
| SIDOF: Circular 9/2026 (texto) | Oficial | https://sidof.segob.gob.mx/notas/docFuente/5790862 |
| DOF: Circular 9/2026 (ya registrada como SD01) | Oficial | https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862 |
| SIDOF: Circular 10/2026 (ficha y texto; ficha registrada como SD02) | Oficial | https://sidof.segob.gob.mx/notas/5790863 · https://sidof.segob.gob.mx/notas/docFuente/5790863 |
| codi.org.mx: qué es, cobrar, pagar, preguntas frecuentes, estadísticas, instituciones, desarrolladores | Oficial (sitio de Banxico) | https://www.codi.org.mx/index.html |
| RegAlert: texto de la Circular 2/2025 | Transcripción de terceros | https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text |
| DPL News: Banxico publica guías (18-jun-2026) | Prensa | https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/ |
| La Razón: falta de promoción de CoDi (30-sep-2025) | Prensa | https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/ |
| El Financiero: SPEI, CoDi y DiMo (13-ago-2023) | Prensa | https://www.elfinanciero.com.mx/mis-finanzas/2023/08/13/spei-codi-y-dimo-banxico-diferencias-en-herramientas-de-transferencias-elecronicas/ |
| Expansión: DiMo ya está disponible (28-abr-2023) | Prensa | https://expansion.mx/finanzas-personales/2023/04/28/dimo-de-banxico-ya-esta-disponible-como-funciona |
| Publimetro: CoDi y DiMo (jun-2026; ya registrada como SB35) | Prensa | https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/ |

Fuente: las URL de esta tabla · consultado 2026-11-07

## Huecos y contradicciones principales

- **⚪ Guías de homologación:** no encontré su URL en banxico.org.mx ni leí su contenido. Solo las conozco por las circulares y por DPL News.
- **⚪ Plazo de acreditación (numeral 19a):** mis dos lecturas muestran 1,500 y 6,000 UDIS para supuestos parecidos. Falta leer la Circular 14/2017 compilada.
- **"Cifras estimadas" de Banxico vs. La Razón:** la tabla de la página de CoDi parece de metas, no de uso real ([07](../codi/07-cifras-de-uso.md)).
- **"Entrada en vigor" del 14-dic-2026:** DPL News lo llama así; las circulares dicen que es el plazo para cumplir ([06](../codi/06-regulacion-y-plazos.md)).
- **⚪ No leídos:** funciones por banco (tablas en imagen), tablas de voluntarios y no participantes, Circular 13/2017, página oficial de DiMo, descarga oficial de logos y los PDF de difusión.
- **Acceso:** banxico.org.mx, dof.gob.mx y sidof.segob.gob.mx no respondieron a `curl` desde este entorno (proxy 403); todo se leyó con un lector web.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx](https://www.codi.org.mx/index.html) · consultado 2026-11-07

<!-- ===== FIN: codi/README.md ===== -->

<!-- ===== INICIO: codi/01-que-es-codi.md ===== -->

# 01 · Qué es CoDi y para qué sirve

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## Definición

- **CoDi®** (Cobro Digital) es una plataforma de **Banco de México (Banxico)** para cobrar y pagar con transferencias electrónicas desde el celular.
- Funciona **sobre el SPEI®** (Sistema de Pagos Electrónicos Interbancarios), que también opera Banxico. CoDi no mueve dinero por su cuenta: el dinero se mueve con una transferencia SPEI o con una transferencia entre cuentas del mismo banco.
- Lo inicia **quien cobra**: genera un **mensaje de cobro**; quien paga lo revisa y lo **autoriza** en la app de su banco. Por eso no hay contracargos.
- Opera **24/7**, todos los días del año, y **no cobra comisión** ni a quien paga ni a quien cobra.
- Banxico describe dos tecnologías para entregar el mensaje de cobro: **código QR** (fijo en el negocio o generado por venta) y **NFC** (acercar dos celulares). El sitio de CoDi describe además el cobro **por notificación** al número celular de quien paga (ver [02](../codi/02-como-funciona.md)).

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: ¿Qué es CoDi®?](https://www.codi.org.mx/secundarias/que_es_codi.html) · consultado 2026-11-07

## Para qué sirve (beneficios que declara Banxico)

| Para quien cobra | Para quien paga |
|---|---|
| Recibe el dinero en segundos, también en fin de semana | Paga rápido, a cualquier hora, solo con el celular |
| Sin contracargos: cada pago lo acepta quien paga | Sin comisiones |
| Dinero disponible de inmediato, como el efectivo | Menos necesidad de efectivo y de ir al cajero |
| Sin comisiones adicionales | Historial de operaciones que puede abrir acceso a servicios financieros |
| Historial de operaciones y mejor control de ingresos; menos costo y riesgo de manejar efectivo | |

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: ¿Qué es CoDi®?](https://www.codi.org.mx/secundarias/que_es_codi.html) · consultado 2026-11-07

## Qué se necesita

- **Para pagar:** una cuenta de depósito en una institución financiera, un celular con Internet y la app de esa institución con CoDi.
- **Para cobrar:** una cuenta de depósito y una aplicación que genere mensajes de cobro. Puede ser la app del banco, el software de un desarrollador (como pey) o la app **CoDi® Banxico**.
- La cuenta puede ser de las que se abren en línea con identificación oficial o de las que piden ir a sucursal; Banxico dice que cualquiera sirve, y que conviene preguntar al banco si pide algo más.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: ¿Qué es CoDi®?](https://www.codi.org.mx/secundarias/que_es_codi.html) · consultado 2026-11-07

## Fechas clave

- **Lanzamiento:** 30 de septiembre de 2019, según La Razón (2025). ⚪ No lo confirmé en una página de Banxico hoy.
- **Contexto 2026:** los Participantes del SPEI deben procesar los mensajes de cobro CoDi conforme a las nuevas Guías de homologación a más tardar el **14 de diciembre de 2026** (Circular 9/2026; ver [06](../codi/06-regulacion-y-plazos.md)).

Fuente: [La Razón: Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · consultado 2026-11-07

## Lo que CoDi no es

- **No es una cartera ni guarda dinero:** el dinero va de la cuenta de quien paga a la de quien cobra. Banxico no vende bienes ni servicios y no responde por ellos.
- **No es DiMo:** DiMo sirve para *enviar* dinero con el número celular de quien recibe; en CoDi *cobra* quien recibe. Comparación en [10](../codi/10-codi-spei-dimo.md).
- **El mensaje de cobro no es una transferencia:** es una solicitud. La transferencia ocurre hasta que quien paga la autoriza.

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [Expansión: DiMo de Banxico ya está disponible (28-abr-2023)](https://expansion.mx/finanzas-personales/2023/04/28/dimo-de-banxico-ya-esta-disponible-como-funciona) · consultado 2026-11-07

<!-- ===== FIN: codi/01-que-es-codi.md ===== -->

<!-- ===== INICIO: codi/02-como-funciona.md ===== -->

# 02 · Cómo funciona CoDi

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## El flujo en tres pasos

1. **Quien cobra genera un mensaje de cobro** desde su app o sistema.
2. **Quien paga lo recibe y lo acepta.** Esa aceptación dispara una transferencia electrónica, interbancaria (SPEI) o dentro del mismo banco.
3. **CoDi notifica a los dos** que el pago se hizo.

```text
Comercio (app/sistema)            Banxico (CoDi + SPEI)             Persona (app de su banco)
   | 1. mensaje de cobro -------------->|----------------------------->| (QR, NFC o notificación)
   |                                    |<----- 2. autoriza (NIP/huella/token)
   |                                    |  transferencia SPEI o mismo banco
   |<------- 3. confirmación ---------- | ------- 3. confirmación ---->|
```

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## Canales para entregar el mensaje de cobro

| Canal | Cómo llega a quien paga | Notas |
|---|---|---|
| **QR con monto** | Quien paga lo escanea o lo importa de su galería | Se genera por venta |
| **QR sin monto** | Igual; quien paga escribe la cantidad | Se puede imprimir o compartir como imagen y usar muchas veces |
| **Notificación al celular** | Quien cobra captura el número celular de quien paga; a esa persona le llega una notificación que abre la app de su banco | Quien paga debe dar su número antes |
| **NFC** | Se acercan dos celulares | Banxico lo menciona; ⚪ no encontré qué apps lo ofrecen hoy |

La guía de Banxico para desarrolladores llama al tercer canal "vía Internet": solicitudes que llegan directo al dispositivo, parecidas a la mensajería instantánea.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023)](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Montos

- **Límite regulatorio actual:** desde el **23 de febrero de 2026**, los Participantes del SPEI deben permitir mensajes de cobro de **hasta 6,000 UDIS por mensaje**, o más si el banco lo decide. También deben permitir mensajes **sin monto**. Lo fijó la Circular 2/2025, que modificó el numeral 9a. Bis de la Circular 14/2017 (transitorio tercero).
- **Límite anterior:** el documento de Banxico con el texto antes y después de cada cambio muestra **1,500 UDIS** como límite previo. La transcripción de RegAlert no muestra el texto anterior. ⚪ La UDI cambia a diario: convierte a pesos con el valor del día publicado por Banxico, no con un número fijo.
- [K03.1](../conocimiento/03-codi-y-api-pey.md) cita una nota de 2019 con un mínimo de $8,000 MXN. Este dato regulatorio de 2026 la actualiza.

Fuente: [Banco de México: modificaciones a la Circular 14/2017 (texto anterior y reformado)](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · consultado 2026-11-07

## Horarios y tiempos

- **Horario:** 24 horas, todos los días del año. La Circular 2/2025 obliga a que las apps puedan recibir mensajes de cobro las 24 horas.
- **Día operativo SPEI:** para estadísticas, Banxico cuenta el día de las 18:00 h de un día a las 18:00 h del siguiente. Tenlo en cuenta si cuadras ventas contra cifras de Banxico.
- **Acreditación (numeral 19a, fr. I):** la Circular 2/2025 fija **5 segundos**, desde que Banxico pone el aviso de liquidación a disposición, para que una institución de crédito acredite transferencias de hasta 1,500 UDIS. Hay excepciones desde 6,000 UDIS. El documento de Banxico menciona además **30 segundos** como plazo general. ⚪ Mis dos lecturas muestran montos distintos para el mismo supuesto: verifícalo en la Circular 14/2017 compilada.
- **Tiempos reales por banco:** Banxico publica tiempos promedio de procesamiento en su página de avances y un PDF histórico de tiempos de entrega de avisos de abono. ⚪ Vienen en imágenes y PDF que no leí.

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · [Banxico SIE: cuadro CF882](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF882&locale=es) · [Banco de México: avances de CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · consultado 2026-11-07

## Confirmación, folio, posponer y devolución

- **Confirmación:** si el pago se procesa bien, las dos apps lo notifican y el estado se puede consultar en CoDi.
- **Folio CoDi:** la Circular 2/2025 cambió el nombre "Folio de Operación" por **"Folio CoDi"**, definido en el Apéndice AD del Manual del SPEI. Para cualquier aclaración, guarda el folio y la fecha. En la transferencia SPEI, el campo "Folio del Esquema Cobro Digital" se llena según la sección 8 del Manual.
- **Posponer:** la app puede guardar un mensaje de cobro para que quien paga lo acepte o lo rechace después, si el Apéndice AD lo permite.
- **Devolución:** quien recibió el pago puede devolverlo completo o en parte.
- **Formato técnico (QR, campos, vigencia):** no es público. Banxico entrega la documentación técnica después de firmar un convenio de confidencialidad. **Recomendación:** no armes tu propio QR CoDi; usa el `qrString` o la `qrImage` que devuelve pey ([pey/04](../pey/04-api-codi-qr-y-push.md)).

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Servicios web de la plataforma

Según los términos y condiciones de Banxico, la Plataforma CoDi ofrece servicios web para: registrar comercios, recibir mensajes de cobro, consultar el estado de un mensaje, pedir la validación de una cuenta y consultar el estado de esa validación. Se entra por un portal de registro de comercios y desde dispositivos móviles autorizados. Un proveedor como pey usa estos servicios por ti. ⚪ Banxico no publica sus especificaciones.

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

<!-- ===== FIN: codi/02-como-funciona.md ===== -->

<!-- ===== INICIO: codi/03-actores-y-participantes.md ===== -->

# 03 · Actores y participantes

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy. No se copian correos ni teléfonos de personas: consulta las páginas oficiales.

## Mapa de actores

| Actor | Qué hace en CoDi |
|---|---|
| **Banco de México (Banxico)** | Dueño de la plataforma y de la marca CoDi®. Opera el SPEI, emite las reglas (Circular 14/2017 y sus cambios) y registra y certifica a los terceros desarrolladores |
| **SPEI®** | Infraestructura por la que viajan las transferencias que dispara un mensaje de cobro aceptado |
| **Participantes del SPEI** (bancos y otras entidades) | Procesan mensajes de cobro y órdenes CoDi en sus apps. **Solo ellos pueden ofrecer al público la función de pagar** |
| **Participantes indirectos** | Entidades que llegan al SPEI por medio de un participante; su contrato debe incluir la recepción y el envío de operaciones CoDi |
| **Comercio** | Cobra con CoDi. Si no desarrolla software, solo sigue las instrucciones de cobro de Banxico |
| **Comercio desarrollador** | Integra CoDi en sus propios sistemas o puntos de venta; obtiene la documentación técnica y certifica su desarrollo |
| **Tercero desarrollador** (como pey) | Hace software con **función de cobro** para otros. Se registra y certifica ante Banxico, y puede comercializarlo |
| **Persona que paga** | Autoriza cada mensaje de cobro en la app de su banco |
| **App CoDi® Banxico** | App de Banxico para cobrar desde uno o varios celulares con una misma cuenta |

Fuente: [Banco de México: Guía de participación en CoDi® para comercios y terceros desarrolladores (2-may-2023)](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · consultado 2026-11-07

## Participantes obligados (34, actualizado al 10-jul-2026)

Según la página de avances de Banxico: UALÁ, ACTINVER, AFIRME, ALBO, KAPITAL, AZTECA, BABIEN, BAJIO, BANCOPPEL, BANJERCITO, BANORTE, BANREGIO, BANSI, BBASE, BANAMEX, BBVA MÉXICO, BMONEX, COMPARTAMOS, CONSUBANCO, DONDE, HSBC, INBURSA, INMOBILIARIO, INTERCAM, INVEX, MIFEL, MULTIVA BANCO, PAGATODO, SABADELL, SANTANDER, SCOTIABANK, SPIN BY OXXO, VE POR MÁS y STP.

- **Voluntarios y no participantes del SPEI:** Banxico los lista en tablas de imagen y PDF. ⚪ No las leí. La página llama "no participantes" a las empresas que quieren generar mensajes de cobro sin ser participantes del SPEI.
- **Funciones por banco** (pagar, cobrar, QR, notificación): ⚪ también vienen en imágenes que no leí.
- **Restricción temporal:** codi.org.mx dice que ASP INTEGRA OPC, INTERCAM, KAPITAL y MULTIVA no pueden procesar por ahora mensajes de cobro ni de pago CoDi. ⚪ La página no tiene fecha. Que un banco esté obligado no garantiza que hoy funcione: prueba con el banco real antes de la demo.

Fuente: [Banco de México: avances de las instituciones en la implantación de CoDi®](https://www.banxico.org.mx/sistemas-de-pago/codi-avances-banco-mexico.html) · [codi.org.mx: Instituciones financieras](https://www.codi.org.mx/secundarias/instituciones.html) · consultado 2026-11-07

## Qué puede y qué no puede hacer un tercero desarrollador

- **Puede:** dar a comercios la función de **cobro** (QR, NFC o vía Internet) y ofrecer servicios adicionales que el usuario contrate si quiere.
- **No puede:**
  - ofrecer la función de **pago** (solo los participantes del SPEI);
  - usar **cuentas concentradoras** ni intermediarios: el dinero va directo a la cuenta del beneficiario final, en un participante del SPEI inscrito en CoDi;
  - cobrar a sus clientes por la mensajería CoDi;
  - fijar tarifas según el número o el monto de mensajes;
  - poner un **recargo** al precio cuando alguien paga con CoDi.
- **Si comercializa su software:** debe describir cómo identifica a clientes que operen con activos virtuales.

**Recomendación para el producto:** no cobres un extra por pagar con CoDi y no juntes el dinero de varios comercios en una cuenta. Con pey, cada comercio cobra a su propia CLABE (`bankAccountId`, ver [pey/05](../pey/05-api-cuentas-bancarias.md)).

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Cómo se vuelve tercero desarrollador (resumen del proceso)

1. **Carta de intención** con el formato de Banxico, la documentación del Anexo 1 (acta constitutiva, RFC, opinión de cumplimiento del SAT, reporte del Buró de Crédito, poder del representante, entre otros) y el caso de negocio del Anexo 2. Si Banxico hace comentarios, hay hasta 4 meses para atenderlos.
2. **Convenio de confidencialidad.**
3. **Documentación técnica**, carta de instrucciones y requisitos de seguridad informática.
4. **Convenio de licencia de uso de marca** con Banxico.
5. **Desarrollo** con acceso a un *sandbox* y a una mesa de ayuda.
6. **Pre-check:** el producto opera y no tiene anomalías graves.
7. **Certificación** para producción. La certificación de seguridad informática se puede pedir en paralelo.

El registro de terceros desarrolladores se rige también por el Capítulo III Bis de la Circular 13/2017. ⚪ No la leí.

**Para el hackatón:** no te certificas tú; cobras por medio de pey. pey dice que Banxico aprobó su integración con CoDi ([K03.2](../conocimiento/03-codi-y-api-pey.md)) y aparece en la lista de terceros desarrolladores de codi.org.mx ([11](../codi/11-como-encaja-pey.md)). ⚪ No vi un registro de Banxico que diga "certificada".

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · consultado 2026-11-07

## Terceros desarrolladores listados en codi.org.mx

- La página lista **25 empresas**; entre ellas aparecen **pey**, Aspel, National Soft (Soft Restaurant) y ANTAD.
- El sitio no dice que estén "certificadas": las presenta como terceros desarrolladores, con los comercios que tienen enrolados.
- Para un comercio, el camino es: contactar al desarrollador, registrarse ante Banxico, verificar la función con el desarrollador y empezar a cobrar.

Fuente: [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · consultado 2026-11-07

<!-- ===== FIN: codi/03-actores-y-participantes.md ===== -->

<!-- ===== INICIO: codi/04-como-paga-y-cobra-una-persona.md ===== -->

# 04 · Cómo paga (y cómo cobra) una persona, paso a paso

> Redacción propia, consultada el 2026-11-07. Los menús cambian por banco: estos son los pasos genéricos del sitio oficial. Los ejemplos usan datos ficticios.

## Antes del primer pago: activar CoDi

- La persona necesita la app de su banco con CoDi y una cuenta de depósito validada.
- Para validar la cuenta se puede registrar la **CLABE** (18 dígitos), el número de **tarjeta de débito** (16 dígitos) o el **número celular** asociado a la cuenta.
- Si la app tiene CoDi pero no deja usarlo, hay que llamar al banco.
- ⚪ Cada banco valida a su manera. K03.1 cita una nota de prensa sobre bancos que validan con un depósito de un centavo y un SMS ([K03](../conocimiento/03-codi-y-api-pey.md)).

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · consultado 2026-11-07

## Pagar con QR

1. Abrir la app del banco → CoDi → **pagar**.
2. **Escanear** el QR o **importarlo** de la galería.
3. **Revisar** los datos del cobro. Si el QR no trae monto, escribir la cantidad.
4. **Autorizar** con NIP, huella o token.
5. La persona que paga y la que cobra reciben una **notificación** de confirmación.

*Ejemplo ficticio:* la tiendita "Abarrotes La Esquina" muestra un QR de $37.50 con el concepto "2 refrescos". La clienta lo escanea, ve el monto y el nombre del comercio, pone su huella y las dos pantallas muestran "Pago realizado".

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · consultado 2026-11-07

## Pagar por notificación (a distancia)

1. Dar el **número celular** a quien va a cobrar.
2. Tocar la **notificación** que llega; abre la app del banco.
3. Revisar los datos y **autorizar** con NIP, huella o token.
4. Las dos partes reciben la confirmación.

Banxico tiene un PDF con este caso: "Paga con CoDi® a distancia desde tu institución financiera". ⚪ No lo abrí.

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [Banco de México: Paga con CoDi® a distancia (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B650AD156-3CCC-C2CC-8278-B6F50804B691%7D.pdf) · consultado 2026-11-07

## Cobrar desde la app del banco

- **Por QR:** CoDi → **cobrar** → datos del cobro → generar QR. Sin monto, el QR se puede imprimir o compartir como imagen y usar varias veces.
- **Por notificación:** CoDi → cobrar → datos del cobro → **número celular** de quien paga. Esa persona recibe la notificación y autoriza.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Cobra con CoDi® desde tu institución financiera (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B81FB2D16-65D3-E5E0-A677-645B5432A7E0%7D.pdf) · consultado 2026-11-07

## Cobrar con la app CoDi® Banxico

1. Descargar la app.
2. Registrar la cuenta donde llegarán los pagos (CLABE, tarjeta de débito o celular) y esperar el aviso de validación.
3. Capturar los datos del cobro, con monto o con la opción **"sin monto"**.
4. Mostrar el QR o enviarlo al celular de quien paga.
5. Quien paga revisa y autoriza; las dos partes reciben la confirmación.

La app permite cobrar desde **uno o varios teléfonos** ligados a la misma cuenta, y solo el titular controla los ingresos.

Fuente: [codi.org.mx: CoDi® para cobrar](https://www.codi.org.mx/secundarias/cobrar.html) · [Banco de México: Cobra con la app CoDi® Banxico (PDF)](https://www.banxico.org.mx/sistemas-de-pago/d/%7B02A0AA3D-449C-CD59-7C4D-6D6131002AD3%7D.pdf) · consultado 2026-11-07

## Qué cambia cuando el cobro sale de un producto hecho con pey

- La persona hace exactamente los mismos pasos: escanea el QR que muestra tu app o toca la notificación que manda pey.
- Tu app **no ve** el NIP ni los datos bancarios de quien paga. Sabes que pagó cuando pey reporta `PAID` o llega el webhook firmado.
- **Recomendación de UX:** pon el monto y el concepto en grande junto al QR, un contador de vigencia y el texto "Paga desde la app de tu banco, en la opción CoDi". Detalle técnico en [pey/10](../pey/10-tutorial-mostrar-qr-codi.md).

Fuente: [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07

<!-- ===== FIN: codi/04-como-paga-y-cobra-una-persona.md ===== -->

<!-- ===== INICIO: codi/05-seguridad-y-proteccion.md ===== -->

# 05 · Seguridad y protección del usuario

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## Protecciones del diseño

- **Autorización explícita:** cada pago lo acepta quien paga, con NIP, huella o token en la app de su banco. Por eso no hay contracargos.
- **Confirmación a las dos partes:** pagador y cobrador reciben la confirmación del pago.
- **Bloqueo:** quien recibe mensajes de cobro puede bloquearlos desde su app, y Banxico puede bloquear mensajes abusivos y los certificados con los que se enviaron.
- **El mensaje de cobro no mueve dinero:** solo la aceptación dispara la transferencia.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [codi.org.mx: CoDi® para pagar](https://www.codi.org.mx/secundarias/pagar.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Qué cuenta como abuso (términos de Banxico)

- El monto que se muestra no coincide con el monto real.
- La persona recibe un cobro que no pidió.
- El nombre del beneficiario no coincide con el del comercio.
- El dinero se deposita en la cuenta de un tercero.

Obligaciones de quien usa la plataforma: cuidar sus certificados y contraseñas, mandar cobros **solo a clientes que lo autorizaron**, describir con verdad lo que vende, hacer las pruebas que pida Banxico, no hacer ingeniería inversa y cumplir sus obligaciones fiscales.

**Recomendación para el producto:** el agente de IA nunca envía cobros por notificación a números que la persona no capturó y confirmó. El concepto debe describir de verdad lo que se cobra.

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Requisitos de seguridad para apps (Circular 2/2025)

El numeral 58a, fracción I, apartado C de la Circular 14/2017 exige procesos documentados a quien procese mensajes de cobro y órdenes CoDi en apps móviles:

- instalación y actualización seguras;
- cifrado;
- autenticación;
- manejo de sesiones;
- control de sistemas modificados;
- integridad de las apps.

Además, el contrato de participación indirecta debe pedir usuario y contraseña para enviar órdenes (9a. Bis 4, fr. XI Bis). Los terceros desarrolladores pasan una certificación de seguridad informática ante Banxico.

Fuente: [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Si algo sale mal: aclaraciones

- **Pagué y no llegó:** si el pago se procesó, las dos apps lo notifican y el estado se puede ver en CoDi. Si no hubo aviso ni se refleja el dinero, hay que ir a la atención a clientes del banco, con el **folio** y la **fecha** de la operación.
- **Contactos institucionales de CoDi:** 800 BANXICO (800 226 9426, opción 3), 800-POR-CODI (800 767 2634) y el correo de CoDi publicado en las preguntas frecuentes.
- **No reconozco una operación:** se aclara con la **Unidad Especializada** del banco, como cualquier transferencia. CONDUSEF publica el directorio de esas unidades.
- **Controversias:** los términos de Banxico dicen que las reclamaciones por transferencias se resuelven con el banco que envía y el que recibe; Banxico no responde por los bienes o servicios.

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Datos personales

- Los datos de la Plataforma CoDi se rigen por el aviso de privacidad de Banxico, que tiene versión integral y simplificada, conforme a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.
- Según los términos, a la app bancaria del cliente se pueden transferir datos de identificación, de contacto, bancarios y patrimoniales.
- La app CoDi® Banxico tiene una página para eliminar datos. ⚪ No la abrí.

**Recomendación para el producto:** no guardes el número celular ni el nombre de quien paga si no hace falta. En logs, registra solo IDs (`codiQrId`, `transactionId`), como ya pide [K03.5](../conocimiento/03-codi-y-api-pey.md).

Fuente: [Banco de México: Aviso de privacidad de la Plataforma CoDi® (integral)](https://transparencia.banxico.org.mx/documentos/%7B0D1619CD-0515-8BC7-F33C-0A08CAFD686D%7D.pdf) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [codi.org.mx: Eliminación de datos app CoDi® Banxico](https://www.codi.org.mx/secundarias/datos.html) · consultado 2026-11-07

<!-- ===== FIN: codi/05-seguridad-y-proteccion.md ===== -->

<!-- ===== INICIO: codi/06-regulacion-y-plazos.md ===== -->

# 06 · Regulación y plazos

> Redacción propia, consultada el 2026-11-07. No es asesoría legal. ⚪ = no confirmado en una fuente leída hoy. Los números de circular y de numeral van exactos.

## Línea de tiempo

| Fecha | Qué pasó | Fuente |
|---|---|---|
| 30-sep-2019 | Arranca CoDi | La Razón (⚪ no lo confirmé en Banxico) |
| 21-feb-2025 | DOF publica la **Circular 2/2025**, que modifica la 14/2017 (firmada el 13-feb-2025) | RegAlert (⚪ el índice de RegAlert dice 20-feb) |
| 24-mar-2025 | Entra en vigor la Circular 2/2025 (transitorio primero) | RegAlert |
| 25-nov-2025 | Entran en vigor sus cambios a participación indirecta: 9a. Bis 4 y 9a. Bis 10 (transitorio cuarto) | RegAlert |
| 23-feb-2026 | Mensajes de cobro de hasta **6,000 UDIS** (transitorio tercero) | Banxico y RegAlert |
| 8-jun-2026 | Banxico firma las Circulares **9/2026** y **10/2026** | SIDOF |
| 17-jun-2026 | DOF publica las dos circulares | SIDOF y DPL News |
| 18-jun-2026 | Entra en vigor la 9/2026 (día hábil bancario siguiente a la publicación) | Banxico |
| **14-dic-2026** | Vence el plazo para cumplir la 9/2026, la 10/2026 y las **Guías** | SIDOF |

Fuente: [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · [DPL News: Banxico publica guías (18-jun-2026)](https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/) · [La Razón (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · consultado 2026-11-07

## Circular 14/2017: reglas del SPEI, en lo que toca a CoDi

Es la regla base de CoDi. Numerales clave según el texto vigente de Banxico, que muestra cada cambio:

- **9a. Bis:** obligaciones CoDi de los participantes.
  - **Fr. III, inc. a):** procesar mensajes de cobro y órdenes de transferencia CoDi conforme a las Guías (cambio de la 9/2026). Los programas deben tener las características del **Apéndice AD** del Manual.
  - **Fr. IV, inc. b):** permitir mensajes de cobro de hasta 6,000 UDIS (antes 1,500).
  - **Fr. V:** recibir mensajes 24/7, con o sin monto; "Folio CoDi"; posponer mensajes.
- **9a. Bis 4 y 9a. Bis 10:** participación indirecta y transferencias entre participantes indirectos que vengan de mensajes de cobro. Desde la 2/2025 deben incluir el RFC o la CURP de quien envía.
- **19a, fr. I:** plazos de acreditación (5 segundos; ver ⚪ en [02](../codi/02-como-funciona.md)).
- **58a, fr. I, apdo. C:** seguridad de las apps que procesan CoDi.
- **83a, fr. I, inc. i):** campo "Folio del Esquema Cobro Digital" en las transferencias CoDi.

⚪ Leí el documento de Banxico con los cambios, no la versión compilada completa. Las definiciones formales ("Mensaje de Cobro", "Orden de Transferencia CoDi") y el Apéndice AD no venían en el extracto.

Fuente: [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · consultado 2026-11-07

## Circular 9/2026 (modifica la 14/2017; dirigida a participantes del SPEI)

- **Objetivo:** que las transferencias desde el celular tengan una experiencia de usuario homologada: intuitiva, fácil y rápida.
- **2a., fr. XXVII Quáter:** agrega la definición de **"Guías"**. Las fracciones que seguían se recorren.
- **7a.:** Banxico, como Administrador, publica las Guías con fecha, versión y entrada en vigor. Avisa los cambios con anticipación y conserva las versiones anteriores.
- **9a. Bis, fr. III, inc. a):** los mensajes de cobro y las órdenes CoDi se procesan conforme a las Guías.
- **9a. Bis 10, fr. I; 10a., fr. II y párrafo segundo; 71a., fr. V:** formularios, identificadores y solicitudes de envío desde el celular también siguen las Guías.
- **98a.:** ajusta qué comunicaciones van por correo al Centro de Atención.
- **Transitorios:** entra en vigor el día hábil bancario siguiente a su publicación. Participantes y participantes indirectos tienen **hasta el 14-dic-2026** para cumplir la circular y las Guías.
- **No menciona** DiMo, QR, montos ni tiempos en segundos.

Fuente: [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [DOF: Circular 9/2026](https://dof.gob.mx/nota_detalle_popup.php?codigo=5790862) · consultado 2026-11-07

## Circular 10/2026 (modifica la 3/2012; dirigida a instituciones de crédito)

- **Destinatarios:** instituciones de crédito, sofomes reguladas con vínculos patrimoniales con bancos y la Financiera Nacional de Desarrollo Agropecuario, Rural, Forestal y Pesquero.
- **Art. 17, párrafo tercero:** solo ofrecen transferencias desde el celular las instituciones que participan en un sistema de transferencias del mismo día, y deben cumplir las Guías sin importar el canal.
- **Art. 17 Ter, fr. II Bis:** cumplir las Guías.
- **Art. 17 Ter, fr. III:** a petición del titular, las cuentas de **niveles 2, 3 y 4** deben asociarse a los **10 dígitos de un celular** para recibir transferencias. En nivel 1 es opcional.
- **Art. 17 Ter, fr. IV:** una orden puede identificar la cuenta con esos 10 dígitos más el banco (3 dígitos o nombre), además de la CLABE o la tarjeta de débito de 16 dígitos.
- **Transitorios:** entra en vigor el día hábil bancario siguiente a su publicación en el DOF (17-jun-2026). Hay plazo **hasta el 14-dic-2026**.
- **No menciona** CoDi ni DiMo por nombre.

Fuente: [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · [SIDOF: ficha de la Circular 10/2026](https://sidof.segob.gob.mx/notas/5790863) · consultado 2026-11-07

## Las Guías de homologación

- **Nombre:** "Guías para la homologación de la experiencia de usuario en transferencias electrónicas de fondos a través de dispositivos móviles".
- **Qué fijan:** especificaciones técnicas para que la interacción y la navegación sean homogéneas, con base en usabilidad, comunicación y estandarización.
- **Etapas:** según DPL News, los requisitos mínimos se ordenan en cuatro: **inicio, ingreso de información, consistencia e integridad, y notificación**.
- **Impacto:** DPL News cita a Banxico: las medidas buscan beneficiar a más de 80 millones de personas que transfieren dinero en forma digital.
- **Contradicción:** DPL News llama "entrada en vigor" al 14-dic-2026. El texto de las circulares dice que entran en vigor al día hábil siguiente a su publicación y que el 14-dic es la **fecha límite para cumplir**.
- ⚪ No encontré hoy la URL del documento de las Guías en banxico.org.mx ni leí su contenido. Si tu producto promete algo sobre las Guías, búscalas primero.

Fuente: [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [DPL News: Banxico publica guías (18-jun-2026)](https://dplnews.com/banxico-publica-guias-para-homologar-experiencia-de-usuario-en-transferencias-electronicas/) · consultado 2026-11-07

## Otras normas y la ley de pagos digitales

- **Circular 13/2017, Capítulo III Bis:** registro de terceros desarrolladores, citado en la guía de participación de Banxico. ⚪ No la leí.
- **Ley de Economía Digital para Pagos Digitales y Electrónicos (2026):** no menciona CoDi ni DiMo. Lo esencial y lo que no se puede afirmar está en [K02](../conocimiento/02-ley-pagos-digitales-y-plazo-14-dic.md).
- **Para el pitch:** "Antes del 14 de diciembre de 2026, los bancos deben homologar en sus apps el pago de mensajes de cobro CoDi y las transferencias por celular" es cierto (9/2026 y 10/2026). "CoDi será obligatorio para los comercios" no lo dice ninguna de estas normas.

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · consultado 2026-11-07

<!-- ===== FIN: codi/06-regulacion-y-plazos.md ===== -->

<!-- ===== INICIO: codi/07-cifras-de-uso.md ===== -->

# 07 · Cifras de uso de CoDi (con fecha)

> Consultado el 2026-11-07. Cada cifra lleva su fecha de corte. ⚪ = interpretación no confirmada. Para el pitch, cita la fuente y la fecha tal cual.

## Últimos datos diarios de Banxico (SIE, corte 20-oct-2026)

| Cuadro | 18-oct-2026 | 19-oct-2026 | 20-oct-2026 (preliminar) | Qué mide |
|---|---|---|---|---|
| **CF881** Cuentas validadas | 7,154 | 8,220 | 7,988 | Cuentas **nuevas** validadas ese día (flujo) |
| **CF884** Operaciones | 8,273 | 14,298 | 11,375 | Operaciones CoDi del día (enviadas = recibidas) |
| **CF885** Monto procesado | $5,057,935 | $13,926,706 | $9,892,381 | Pesos del día (no miles) |
| **CF882** Cuentas con al menos un pago | 2,910,134 | 2,911,718 | 2,913,322 | ⚪ Parece acumulado: sube poco cada día |
| **CF882** Cuentas con al menos un cobro | 1,141,070 | 1,141,303 | 1,141,539 | ⚪ Igual |

- **Cálculo propio:** el ticket promedio, monto entre operaciones, fue de $611.38 el 18-oct, $974.03 el 19-oct y $869.66 el 20-oct-2026.
- **Notas de Banxico:**
  - El último día de cada cuadro es preliminar y puede corregirse.
  - CF881 solo cuenta cuentas asociadas a un dispositivo enrolado (desde el 8-jun-2020) y, desde el 25-ago-2020, solo altas nuevas; las cifras negativas son cuentas que dejaron de estar validadas.
  - CF882 se calcula por día operativo SPEI, de 18:00 a 18:00 h.
- **Por banco (20-oct-2026):** en operaciones **enviadas**, BBVA lidera con 2,948, seguido de Banco Azteca con 2,795. En **recibidas**, lidera HSBC con 3,665, seguido de BBVA con 2,532 e Inbursa con 2,516.
- ⚪ La consulta solo mostró tres días. Para series largas, cambia el periodo en el SIE o descarga el Excel de codi.org.mx.

Fuente: [Banxico SIE: CF881 Cuentas validadas](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es) · [CF882](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF882&locale=es) · [CF884 Operaciones](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF884&locale=es) · [CF885 Monto](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF885&locale=es) · consultado 2026-11-07

## Acumulados y contexto

| Dato | Cifra | Corte | Fuente |
|---|---|---|---|
| Cuentas validadas acumuladas | 2,643,974 | 23-may-2020 | Nota del cuadro CF881 (Banxico) |
| Cuentas validadas acumuladas | 21.79 millones | sep-2025 | La Razón, con datos de Banxico |
| Cuentas que han pagado al menos una vez | 2.47 millones | ⚪ sin fecha en la nota (2025) | La Razón |
| Cuentas que han recibido al menos un pago | 1.08 millones | ⚪ sin fecha en la nota (2025) | La Razón |

- **Lectura:** se validaron más de 21 millones de cuentas, pero solo unos 2.9 millones han pagado y unos 1.1 millones han cobrado (CF882, oct-2026). Hay muchas cuentas registradas y poco uso. Esto es lo que un producto puede atacar: hacer más fácil cobrar.
- La Razón dice que las validaciones van a la baja.

Fuente: [Banxico SIE: CF881](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es) · [La Razón: Acusan falta de promoción y voluntad en impulso de CoDi (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · consultado 2026-11-07

## Contradicción: la tabla de "cifras estimadas" en la página de Banxico

- La página de CoDi de Banxico muestra una tabla rotulada "cifras estimadas":
  - dic-2019: **1,389** miles de usuarios registrados y **1,886** miles de transferencias;
  - sep-2020: **18,121** miles de usuarios y **27,934** miles de transferencias.
- La Razón (2025) dice que las metas del lanzamiento eran **18.1 millones de usuarios en 2020** y **28 millones de transferencias** un año después, y que **no se cumplieron**.
- ⚪ Todo indica que la tabla de Banxico son proyecciones, no datos observados. **No la uses como uso real.** Para uso real, usa los cuadros del SIE de arriba.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [La Razón (30-sep-2025)](https://www.razon.com.mx/negocios/2025/09/30/acusan-falta-de-promocion-y-voluntad-en-impulso-de-codi/) · consultado 2026-11-07

## Dónde actualizar las cifras

- **Cuadros SIE:**
  - CF881: cuentas validadas.
  - CF882: cuentas con al menos una transacción.
  - CF883: apps de participantes enrolados.
  - CF884: operaciones.
  - CF885: monto.
- **Excel de cuentas validadas por cada mil habitantes**, por entidad, acumulado al cierre de cada trimestre: ver la página de estadísticas de codi.org.mx.
- **Recomendación:** si la app muestra una cifra de CoDi, guárdala con su fecha de corte y su cuadro, por ejemplo: "11,375 operaciones el 20-oct-2026 (Banxico, CF884, preliminar)".

Fuente: [codi.org.mx: Estadísticas](https://www.codi.org.mx/secundarias/estadisticas.html) · [Banxico: Excel de cuentas validadas por entidad](https://www.banxico.org.mx/sistemas-de-pago/d/%7BE50C9EF7-B0D3-99A9-0B62-F95B57CF0529%7D.xlsx) · [Banxico SIE: CF883](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF883&locale=es) · consultado 2026-11-07

<!-- ===== FIN: codi/07-cifras-de-uso.md ===== -->

<!-- ===== INICIO: codi/08-preguntas-frecuentes.md ===== -->

# 08 · Preguntas frecuentes

> Respuestas con redacción propia, consultadas el 2026-11-07. La primera parte resume las preguntas oficiales de codi.org.mx; la segunda responde las que surgen al construir con pey.

## Preguntas oficiales (resumen)

| Pregunta | Respuesta corta |
|---|---|
| ¿En qué horario funciona? | Las 24 horas, todos los días del año |
| ¿Necesito Internet? | Sí, datos móviles o Wi-Fi |
| ¿Cobra comisión? | No, sin importar el monto |
| ¿Puedo pagar con tarjeta de crédito? | CoDi usa una **cuenta de depósito** (con o sin tarjeta de débito). Se valida con CLABE (18 dígitos), tarjeta de débito (16) o celular asociado |
| ¿Hay devoluciones? | Sí. Quien recibió el pago puede devolverlo completo o en parte |
| Mi app tiene CoDi pero no me deja usarlo | Hay que llamar al banco |
| Pagué y no llegó | Si se procesó, las dos apps lo notifican. Si no, ve a atención a clientes del banco con el folio y la fecha; también hay líneas de Banxico (ver [05](../codi/05-seguridad-y-proteccion.md)) |
| No reconozco una operación | Se aclara con la Unidad Especializada del banco (directorio de CONDUSEF) |
| ¿Para qué sirve la app CoDi® Banxico? | Para cobrar desde el celular registrando la cuenta donde llegará el dinero |

Fuente: [codi.org.mx: Preguntas frecuentes](https://www.codi.org.mx/secundarias/preguntas_frecuentes.html) · consultado 2026-11-07

## Preguntas de quien construye

**¿Necesito ser banco o certificarme para cobrar con CoDi en mi app?**
No. Un tercero desarrollador, como pey, genera los mensajes de cobro por ti ([03](../codi/03-actores-y-participantes.md), [11](../codi/11-como-encaja-pey.md)).

**¿Puedo hacer que mi app *pague* con CoDi?**
No. Solo los participantes del SPEI ofrecen la función de pago. Tu app cobra y quien paga autoriza en la app de su banco.

**¿Cuál es el monto máximo?**
Desde el 23-feb-2026, los bancos deben permitir mensajes de cobro de hasta 6,000 UDIS, o más si el banco quiere. pey publica sus propios límites: push de hasta 1,000,000 y QR sin máximo publicado ([pey/11](../pey/11-errores-y-limites.md)). Además, tu servidor impone su propio tope (`MAX_MONTO_MXN`).

**¿El dinero pasa por pey o por mi app?**
No debe pasar. Banxico prohíbe a terceros las cuentas concentradoras: el dinero va directo a la cuenta del beneficiario ([03](../codi/03-actores-y-participantes.md)).

**¿Puedo cobrar un extra por pagar con CoDi?**
La guía de Banxico pide a los terceros desarrolladores no poner recargos por pagar con CoDi ni cobrar por la mensajería. **Recomendación:** no lo hagas.

**¿Hay contracargos?**
No. Cada pago lo autoriza quien paga. Sí puede haber devoluciones que inicia quien cobró.

**¿Cuánto tarda?**
Segundos. La regla de acreditación pide 5 segundos en ciertos casos ([02](../codi/02-como-funciona.md)). ⚪ El tiempo real depende del banco.

**¿Cómo sé que me pagaron?**
Por la notificación de CoDi en la app del banco. En tu producto, por pey: `PAID` en la consulta o el webhook firmado ([pey/07](../pey/07-api-transacciones.md), [pey/09](../pey/09-webhooks.md)).

**¿Qué pasa el 14 de diciembre de 2026?**
Vence el plazo para que bancos y participantes homologuen sus apps (Circulares 9/2026 y 10/2026). Desde entonces, las cuentas de nivel 2 a 4 deben poder recibir transferencias con el número celular si el titular lo pide. La CLABE sigue funcionando ([06](../codi/06-regulacion-y-plazos.md)).

**¿El "push" de pey es DiMo?**
No. `POST /codi/pn` manda un **mensaje de cobro CoDi** al celular de quien paga. DiMo es para **enviar** dinero a un número celular ([10](../codi/10-codi-spei-dimo.md)).

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · consultado 2026-11-07

<!-- ===== FIN: codi/08-preguntas-frecuentes.md ===== -->

<!-- ===== INICIO: codi/09-marca-logotipos-y-material.md ===== -->

# 09 · Marca, logotipos y material de difusión

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## La marca CoDi®

- **CoDi** es marca de Banco de México. Los términos de la plataforma dan una **licencia gratuita, no exclusiva, intransferible y revocable** de la marca, en la **clase 36 de Niza**, en forma nominativa y como logotipo.
- **Reglas:**
  - no modificar la marca;
  - usarla con la imagen que proporciona Banxico;
  - no ponerla junto a contenidos ofensivos, políticos o religiosos, entre otras restricciones.
- **Revocación y defensa:** Banxico puede revocar la licencia sin aviso, y solo Banxico ejerce las acciones legales para proteger la marca.
- Los comercios desarrolladores y los terceros desarrolladores firman con Banxico un **convenio de licencia de uso de marca** como parte de su proceso.
- **Recomendación de redacción:** escribe "CoDi®", con C y D mayúsculas y el símbolo ® al menos en la primera mención, como lo hacen los sitios de Banxico. Igual con "SPEI®".

Fuente: [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · consultado 2026-11-07

## Logotipos: de dónde tomarlos

- ⚪ En las páginas públicas de Banxico y codi.org.mx que leí no encontré una descarga pública del logotipo CoDi ni un manual de identidad.
- **Para el prototipo:** usa los logos **pey + CoDi** que pey publica en su página de recursos de marca ([pey/12](../pey/12-recursos-de-marca.md)). pey es el tercero que tiene la relación con Banxico. ⚪ Si dudas del uso permitido, pregunta a los mentores de pey.
- **No hagas** tu propia versión del logo ni lo deformes: la licencia lo prohíbe.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Material de difusión oficial (PDF y video)

Banxico enlaza este material desde su página de CoDi. ⚪ Solo se abrió el de participación; los demás se listan sin leer su contenido.

| Material | Para quién |
|---|---|
| [Presentación "CoDi®: la nueva forma de pagar en México"](https://www.banxico.org.mx/publicaciones-y-prensa/presentaciones/%7B1CA33D18-A38C-EE29-41BF-6302A641D617%7D.pdf) | Público general (presentación institucional) |
| [Cobra con CoDi® desde tu institución financiera](https://www.banxico.org.mx/sistemas-de-pago/d/%7B81FB2D16-65D3-E5E0-A677-645B5432A7E0%7D.pdf) | Quien cobra |
| [Cobra con la app CoDi® Banxico](https://www.banxico.org.mx/sistemas-de-pago/d/%7B02A0AA3D-449C-CD59-7C4D-6D6131002AD3%7D.pdf) | Quien cobra |
| [Paga con CoDi® desde tu institución financiera](https://www.banxico.org.mx/sistemas-de-pago/d/%7BE645D1AD-2502-0FB2-3A36-0EEB7962DAA6%7D.pdf) | Quien paga |
| [Paga con CoDi® a distancia desde tu institución financiera](https://www.banxico.org.mx/sistemas-de-pago/d/%7B650AD156-3CCC-C2CC-8278-B6F50804B691%7D.pdf) | Quien paga |
| [Tiempos históricos de entrega de avisos de abono](https://www.banxico.org.mx/sistemas-de-pago/d/%7B593E43FC-11D3-593E-9B69-96A8B862D70B%7D.pdf) | Análisis por banco |
| [Términos y condiciones de la Aplicación CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7B39D5CB27-08ED-44C8-807F-BA11A75D237C%7D.pdf) | Usuarios de la app CoDi® Banxico |
| [Video institucional](https://www.youtube.com/embed/O98tHixAWLc) | Público general |

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

<!-- ===== FIN: codi/09-marca-logotipos-y-material.md ===== -->

<!-- ===== INICIO: codi/10-codi-spei-dimo.md ===== -->

# 10 · CoDi, SPEI y DiMo comparados

> Redacción propia, consultada el 2026-11-07. ⚪ = no confirmado en una fuente leída hoy.

## Tabla comparativa

| | **SPEI®** | **CoDi®** (Cobro Digital) | **DiMo** (Dinero Móvil) |
|---|---|---|---|
| Qué es | El sistema de transferencias interbancarias de Banxico; sobre él corren los otros dos | Plataforma de **cobro**: quien recibe pide el pago | Esquema para **enviar** dinero con el número celular de quien recibe |
| Quién inicia | Quien envía | **Quien cobra** genera el mensaje de cobro; quien paga lo autoriza | **Quien envía** |
| Cómo se identifica el destino | CLABE o tarjeta de débito | QR, NFC o notificación al celular de quien **paga** | 10 dígitos del celular de quien **recibe**, más su banco |
| Dónde se usa | App o banca en línea | App del banco (pagar); app del banco, app CoDi® Banxico o software de terceros como pey (cobrar) | App del banco |
| Desde cuándo | ⚪ no lo revisé | 30-sep-2019 (La Razón) | Disponible desde fines de feb-2023, según la gobernadora de Banxico citada por Expansión |
| Comisión | ⚪ depende del banco | Sin comisión (Banxico) | Sin comisión (Publimetro, 2026) ⚪ no confirmado en Banxico |
| Horario | ⚪ | 24/7 | ⚪ |
| ¿Sirve para un comercio? | Sí, pero hay que dictar la CLABE y conciliar a mano | **Sí: está hecho para cobrar**, con monto, concepto y confirmación | Para recibir envíos, sin mensaje de cobro |

Fuente: [El Financiero: SPEI, CoDi y DiMo, diferencias (13-ago-2023)](https://www.elfinanciero.com.mx/mis-finanzas/2023/08/13/spei-codi-y-dimo-banxico-diferencias-en-herramientas-de-transferencias-elecronicas/) · [Expansión: DiMo de Banxico ya está disponible (28-abr-2023)](https://expansion.mx/finanzas-personales/2023/04/28/dimo-de-banxico-ya-esta-disponible-como-funciona) · [Publimetro: CoDi y DiMo mueven tu dinero (jun-2026)](https://www.publimetro.com.mx/noticias/2026/06/29/aun-pagas-en-efectivo-codi-y-dimo-mueven-tu-dinero-desde-tu-celular/) · [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · consultado 2026-11-07

## DiMo y las Circulares de 2026

- Las Circulares 9/2026 y 10/2026 **no nombran a DiMo**.
- La 10/2026 obliga a las instituciones de crédito a asociar, a petición del titular, los **10 dígitos de un celular** a las cuentas de nivel 2, 3 y 4 para recibir transferencias, con plazo al **14-dic-2026**. Ese es el mecanismo que la prensa asocia con DiMo. ⚪ La relación formal entre DiMo y esa regla no la vi en un texto de Banxico.
- La Circular 2/2025 ya preveía solicitudes de envío en las que quien envía solo indica los 10 dígitos de un celular (numerales 9a. Bis 4 y 58a de la 14/2017).
- ⚪ No encontré hoy una página oficial de Banxico dedicada a DiMo. Las fuentes de DiMo de este archivo son prensa.

Fuente: [SIDOF: Circular 10/2026](https://sidof.segob.gob.mx/notas/docFuente/5790863) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · [RegAlert: texto de la Circular 2/2025](https://regalert.today/document/circular-2-2025-modifies-circular-14-2017-3e69eebd-1140-46c9-8b49-6e43b16cb5b0/text) · consultado 2026-11-07

## Confusiones comunes al construir

- **"Push" de pey ≠ DiMo.** `POST /codi/pn` manda un *mensaje de cobro* CoDi al celular de quien **paga**; esa persona autoriza. En DiMo, el celular es el de quien **recibe** y quien envía no recibe ninguna solicitud ([pey/04](../pey/04-api-codi-qr-y-push.md)).
- **CoDi también es SPEI.** Cuando se acepta un cobro CoDi, la transferencia viaja por SPEI o dentro del mismo banco. Por eso aparece en el estado de cuenta como una transferencia, con su folio.
- **Para un comercio, CoDi da algo que DiMo no:** el monto y el concepto los fija quien cobra, y la confirmación llega por pey (consulta o webhook). Así se concilia sin capturar nada a mano.

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07

<!-- ===== FIN: codi/10-codi-spei-dimo.md ===== -->

<!-- ===== INICIO: codi/11-como-encaja-pey.md ===== -->

# 11 · Cómo encaja pey

> Redacción propia, consultada el 2026-11-07. La documentación técnica de pey está en [pey/README.md](../pey/README.md); la síntesis con código probado, en [K03](../conocimiento/03-codi-y-api-pey.md).

## pey en el ecosistema CoDi

- pey aparece en la lista de **terceros desarrolladores** de codi.org.mx, con cinco comercios enrolados.
- Un tercero desarrollador hace software de **cobro**, se registra y certifica ante Banxico y no puede usar cuentas concentradoras ([03](../codi/03-actores-y-participantes.md)). Eso cuadra con lo que pey dice de sí misma: el dinero llega directo a la cuenta del comercio ([K03.2](../conocimiento/03-codi-y-api-pey.md)).
- **Lo que pey hace por ti:** generar el mensaje de cobro (QR o notificación), hablar con la plataforma CoDi de Banxico y avisarte cuando se pagó. **Lo que no hace:** la función de pago, que es de los bancos.

Fuente: [codi.org.mx: Contacta a tu desarrollador](https://www.codi.org.mx/secundarias/desarrolladores.html) · [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [pey: documentación en Markdown](../pey/README.md) · consultado 2026-11-07

## Conceptos de CoDi → API de pey

| Concepto CoDi (Banxico) | En la API de pey | Dónde leer |
|---|---|---|
| Mensaje de cobro por QR | `POST /codi/qr` → `id`, `qrString`, `qrImage` | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| QR sin monto (quien paga escribe la cantidad) | `amount: 0` en `POST /codi/qr` | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Mensaje de cobro por notificación al celular | `POST /codi/pn` con `phoneNumber` de 10 dígitos | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Folio CoDi | `codiId` (folio de 20 dígitos) en la respuesta de la push. ⚪ No verifiqué que sea el mismo "Folio CoDi" del Apéndice AD | [pey/04](../pey/04-api-codi-qr-y-push.md) |
| Confirmación de pago | `status: PAID` en `/transaction/...` o webhook `codi.qr.payment_received` / `codi.pn.payment_received` | [pey/07](../pey/07-api-transacciones.md) · [pey/09](../pey/09-webhooks.md) |
| Validación de la cuenta del beneficiario | `POST /bank-account` → `codiStatus` `PENDING` → `PROCESSING` → `ACTIVE` | [pey/05](../pey/05-api-cuentas-bancarias.md) |
| Abono directo al beneficiario (sin cuenta concentradora) | `bankAccountId` por comercio | [pey/05](../pey/05-api-cuentas-bancarias.md) |
| Devolución (la inicia quien cobró) | No hay endpoint; se hace desde la app bancaria del titular | [K03.4](../conocimiento/03-codi-y-api-pey.md) |
| NFC | No aparece entre las 11 rutas de la API de pey | [pey/README](../pey/README.md) |
| Límite de 6,000 UDIS por mensaje (regla de bancos) | pey no lo menciona. Pon tu propio tope en el servidor | [02](../codi/02-como-funciona.md) |

Fuente: [pey: documentación en Markdown](../pey/README.md) · [Banco de México: modificaciones a la Circular 14/2017](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-14-2017/%7B33EFD864-87F6-89BF-9F19-35E4D80E4CF4%7D.pdf) · consultado 2026-11-07

## Reglas de Banxico que tu producto debe respetar

1. **Sin recargo por pagar con CoDi** y sin cobrar por la mensajería: así lo pide la guía de participación a los terceros desarrolladores.
2. **Sin cuenta concentradora:** cada comercio cobra a su propia CLABE (`bankAccountId`).
3. **Cobrar solo a quien lo autorizó:** no mandes notificaciones de cobro a números que la persona no confirmó. Mandar cobros no pedidos es abuso según los términos de Banxico.
4. **Concepto verdadero:** que el nombre y la descripción coincidan con lo que se cobra.
5. **El pago lo confirma el banco:** muestra "Pagado" solo con `PAID` o con un webhook de firma válida.
6. **Marca:** usa los logos pey + CoDi de [pey/12](../pey/12-recursos-de-marca.md) sin modificarlos.

Fuente: [Banco de México: Guía de participación en CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BA21AA19F-C855-9E64-98A4-832D9A51B2B0%7D.pdf) · [Banco de México: Términos y condiciones de la Plataforma CoDi®](https://www.banxico.org.mx/sistemas-de-pago/d/%7BC501F0E5-FC10-666F-C849-8C369FEE510F%7D.pdf) · consultado 2026-11-07

## Argumentos de pitch con fuente

- CoDi cobra sin comisión, 24/7, con el dinero en segundos y sin contracargos (Banxico; [01](../codi/01-que-es-codi.md)).
- Hay más de 21 millones de cuentas validadas (sep-2025), pero solo unos 2.9 millones de cuentas han pagado y unos 1.1 millones han cobrado (oct-2026). El hueco está en la experiencia de quien cobra ([07](../codi/07-cifras-de-uso.md)).
- El 20-oct-2026 se hicieron 11,375 operaciones CoDi por $9.89 millones, cifra preliminar del SIE de Banxico ([07](../codi/07-cifras-de-uso.md)).
- Antes del 14-dic-2026, los bancos deben homologar en sus apps el pago de mensajes de cobro CoDi ([06](../codi/06-regulacion-y-plazos.md)).

Fuente: [Banco de México: CoDi® Cobro Digital](https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html) · [Banxico SIE: CF884](https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF884&locale=es) · [SIDOF: Circular 9/2026](https://sidof.segob.gob.mx/notas/docFuente/5790862) · consultado 2026-11-07

<!-- ===== FIN: codi/11-como-encaja-pey.md ===== -->

<!-- ===== INICIO: AGENTS.md ===== -->

# AGENTS.md

Instrucciones para cualquier agente (Claude Code, Codex, Cursor, ChatGPT) que trabaje en este repo. Léelas completas antes de actuar.

## 1. Misión
Construir un proyecto para el **Hackatón México** (14 nov–12 dic 2026, CoDi + API de pey; ⚪ bases por confirmar, K01). El proyecto arrancó desde cero el 14-nov-2026: el problema, el alcance y el stack **están por definir** y, cuando existan, vivirán en `docs/PRD.md`.

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

3. En la descripción del PR o del commit, cita los IDs que usaste ("según K03.4…").
4. Lo marcado ⚪ no está verificado. Si necesitas un dato que no está (endpoint, campo, error, precio), **no lo inventes**: consulta la documentación oficial; si no puedes, deja `TODO(⚪): …` visible en el código y dilo.
5. Los datos se consultaron entre el 5 y el 7 de noviembre de 2026. Antes de una demo, revisa el changelog y la versión del OpenAPI de pey ([pey/13](../pey/13-registro-de-cambios.md)).

## 3. Reglas de dinero (pey cobra de verdad)
- **pey solo tiene producción:** no hay sandbox, todo cobro es real y lo que se paga a la cuenta de prueba no se devuelve. En pruebas y en la demo se cobran montos de $0.01 a $1, con un tope que impone el servidor (K03.3, K03.6).
- **Confirmación humana:** ningún cobro sin que la persona lo confirme explícitamente. El servidor impone el monto máximo, diga lo que diga la interfaz o un modelo de IA (K03.9).
- **Verdad de pago:** "pagado" solo si pey lo confirma: `PAID` vinculado al cobro con el monto y la moneda esperados, o un webhook con firma válida. Nunca por una captura de pantalla, un recibo ni la redirección de una liga de pago (K03.4, K03.5, [pey/06](../pey/06-api-ligas-de-pago.md)).
- **SIMULACIÓN visible:** si existe un modo de simulación, la interfaz dice "SIMULACIÓN" de forma visible y nunca se presenta como pago real.
- **Sin reintentos a ciegas:** no repitas la creación de un QR o de una push tras un timeout sin reconciliar antes; pey no documenta idempotencia (K03.8).
- **Montos:** pey recibe pesos con decimales, no centavos. Internamente, conviene manejar centavos enteros y convertir solo al llamar a pey ([docs/REVISION-PEY-2026-11-07.md](../docs/REVISION-PEY-2026-11-07.md)).

## 4. Reglas de seguridad y datos
- Las llaves viven solo en el servidor como variables de entorno (nombres en `.env.example`). **Nunca** en el navegador, en el repo, en los logs ni en el chat.
- Las llamadas a pey (y a cualquier proveedor de IA) viven en funciones de servidor. El navegador solo habla con tu propia API.
- Webhooks: verifica la firma Standard Webhooks sobre el cuerpo **crudo**, rechaza timestamps viejos y deduplica por `webhook-id` y `transactionId` en almacenamiento persistente (K03.5, K03.7).
- No guardes el celular, la CLABE ni el nombre de quien paga si no hace falta. En los logs, solo IDs (`codiQrId`, `transactionId`, `requestId`) ([codi/05](../codi/05-seguridad-y-proteccion.md)).
- Marca: usa solo los archivos oficiales de pey y de CoDi, descargados y sin redibujar ([pey/12](../pey/12-recursos-de-marca.md), [codi/09](../codi/09-marca-logotipos-y-material.md)). No afirmes patrocinio ni aval de pey ni de Banxico.
- Ley: no afirmes que aceptar pagos digitales o QR ya es obligatorio (K02.4).

## 5. Mantener la base
- No modifiques `conocimiento/`, `pey/` ni `codi/` salvo que la tarea lo pida. Si agregas un dato, agrega su fuente (tabla "## Fuentes" en `conocimiento/`, línea "Fuente:" en `pey/` y `codi/`).
- Después de editar la base, corre:
  ```bash
  python3 scripts/construir_indice.py        # regenera conocimiento/INDICE.md
  python3 scripts/construir_todo_en_uno.py   # regenera conocimiento/TODO-EN-UNO.md
  python3 scripts/verificar_conocimiento.py  # formato, fuentes, enlaces, IDs repetidos y secretos
  ```
- Antes de terminar una tarea: corre las pruebas (cuando existan) y revisa que el diff no tenga llaves.

<!-- ===== FIN: AGENTS.md ===== -->

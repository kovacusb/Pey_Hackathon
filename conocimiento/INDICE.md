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

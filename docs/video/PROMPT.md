# Prompt · Video explicativo de Paga Fácil

Pega este archivo completo como instrucción para crear el video. Todo lo que el video afirma tiene que salir de esta carpeta: no inventes funciones, cifras ni pantallas.

---

## Encargo

Crea un **video explicativo animado como una sola página HTML** (sin dependencias de red salvo Google Fonts) que se reproduce solo, en **16:9 (lienzo de 1920×1080 escalado a la ventana)**, de **90 a 120 segundos**. Debe poder grabarse con la grabación de pantalla de la Mac para subirlo como video. Lleva controles discretos: reproducir/pausa, reiniciar, barra de progreso y teclas (espacio = pausa, ← → = escena anterior/siguiente).

**Para quién:** jueces de un hackatón de pagos digitales (CoDi + API de pey) y público general. Deben entender en dos minutos qué es Paga Fácil, cómo funciona y por qué importa.

**Tono:** fintech mexicana, seria y confiable, nada infantil. Como el lanzamiento de un producto de pagos, no como un meme. Español de México, frases cortas.

## Estética

- **Tipografía grande e imponente:** titulares de 120–200 px en una grotesca pesada (por ejemplo *Inter Tight* 800 o *Space Grotesk* 700) y texto de apoyo de 36–48 px. Una idea por pantalla. Los números clave van enormes.
- **Color:** fondo casi negro (`#0b0f14`) con acento verde azulado de la marca del panel (`#2dd4bf` en oscuro, `#0f766e` en claro), blanco cálido para el texto y un ámbar (`#fbbf24`) solo para avisos de SIMULACIÓN. Nada de arcoíris.
- **Movimiento:** entradas con desplazamiento corto y desvanecido (300–600 ms, `cubic-bezier(.2,.8,.2,1)`), contadores numéricos que suben y los mensajes de chat apareciendo uno por uno con indicador de "escribiendo…". Sin rebotes caricaturescos.
- **Teléfono:** una maqueta de celular dibujada con CSS, sin marca de Apple ni de WhatsApp, con un chat estilo mensajería: burbujas, botones y listas. Los textos de las burbujas se cargan **tal cual** desde `conversaciones/*.json` (respeta `*negritas*` y `_cursivas_`).
- **Panel del negocio:** recréalo con estilo parecido a `apps/api/src/panel/panel.html` (tarjetas de KPI, filas con estado «Esperando pago» → «Pagado»). Usa los datos de `conversaciones/07-panel.json`.
- **Accesible:** contraste alto, nada parpadeante y ningún texto de menos de 28 px en el lienzo.

## Guion (escenas y textos en pantalla)

| # | Duración | Pantalla | Texto grande | Apoyo |
|---|---|---|---|---|
| 1 | 6 s | Negro, aparece el número | **21.8 millones** | de cuentas tienen CoDi activo… |
| 2 | 6 s | El número cae a otro | **2.5 millones** | …y solo ellas lo han usado alguna vez. (Banxico, sep-2025) |
| 3 | 7 s | Íconos de terminal y porcentaje | **Hasta 3.95 %** | es lo que cuesta cobrar con tarjeta en una miscelánea. CoDi: **0 %** |
| 4 | 6 s | Logo tipográfico «Paga Fácil» | **Paga Fácil** | Cobros CoDi desde WhatsApp. Sin apps, sin comisiones, con cualquier banco. |
| 5 | 18 s | Teléfono: `02-cobro-rapido-push-y-factura.json` (pasos 1–14) | **Cobra en segundos** | El doctor escribe el monto, elige el concepto y manda la solicitud al celular de su paciente. |
| 6 | 8 s | Recuadro de la app del banco (genérico): «Solicitud CoDi · $650.00 · Autorizar» con huella | **El cliente autoriza en su banco** | Con NIP o huella. Nadie ve sus datos bancarios. |
| 7 | 10 s | Comprobante en el chat + panel que se ilumina en «Pagado» | **Confirmado por pey** | Webhook firmado y la clave de rastreo de Banxico. El negocio lo ve al instante. |
| 8 | 10 s | Teléfono: pasos de factura + `capturas/factura-ejemplo.png` deslizándose | **Y la factura, en el chat** | RFC, régimen y uso → PDF. *(Etiqueta ámbar: «Demo: factura simulada · conector de PAC listo»)* |
| 9 | 9 s | Teléfono: `03-cobro-rapido-qr.json` con el QR dibujado como cuadrícula estilizada | **¿Sin celular a la mano? QR** | Se escanea desde la app del banco, no con la cámara. |
| 10 | 9 s | Teléfono: `04-servicios-cfe.json` | **Luz, agua, recargas** | Cobro CoDi real de $0.01; el pago a CFE es una SIMULACIÓN hasta conectar al agregador. *(Etiqueta ámbar)* |
| 11 | 7 s | Teléfono: `06-aprende-codi.json` | **Aprende CoDi** | Guías cortas para quien nunca lo ha usado. |
| 12 | 8 s | Cuatro tarjetas grandes | **Seguro por diseño** | «Pagado» solo si pey lo confirma · una orden se entrega una vez · tope por cobro · antispam · sin datos personales en registros |
| 13 | 8 s | Diagrama simple: WhatsApp → Paga Fácil → API de pey → banco → webhook → comprobante | **Integración real con la API de pey** | `POST /codi/pn` · `POST /codi/qr` · webhooks Standard Webhooks |
| 14 | 6 s | Cierre | **Paga Fácil** | Cobra hoy, con CoDi, desde WhatsApp. *(pie: Proyecto independiente · no es un producto de pey ni de Banxico)* |

Duración total ≈ 118 s. Si hay que recortar, quita la escena 11 antes que cualquier otra.

## Reglas de contenido (no negociables)

1. **Honestidad sobre la simulación:** factura sin PAC y pago al proveedor de servicios = **SIMULACIÓN**, siempre con etiqueta visible. El cobro CoDi sí es real.
2. **Marcas:** no dibujes ni recrees los logotipos de pey, CoDi, Banxico, WhatsApp, CFE ni de bancos. Usa solo texto. Si quieres los logos oficiales de pey y CoDi, descárgalos de las fuentes de `pey/12-recursos-de-marca.md` y `codi/09-marca-logotipos-y-material.md` sin modificarlos.
3. **No afirmes** que aceptar CoDi o pagos digitales ya es obligatorio (K02.4), ni que hay aval o patrocinio de pey o Banxico.
4. **Datos:** solo los de `datos.md`, con su fuente en letra pequeña cuando aparezca una cifra.
5. **Nada personal:** usa solo los nombres, RFC y números ficticios de las conversaciones. Ningún teléfono, CLABE ni llave real.
6. **Montos:** muestra los de las conversaciones ($650 consulta, $480 plomería). No prometas montos máximos.

## Material en esta carpeta

| Archivo | Qué es |
|---|---|
| `conversaciones/01-menu.json` … `06-aprende-codi.json` | Conversaciones **reales** del bot (las generó el código). Cada paso es `persona`, `bot` (mensaje con `tipo`: texto, botones, lista, imagen o documento) o `banco` (lo que pasa en la app bancaria, para animarlo aparte) |
| `conversaciones/07-panel.json` | Filas para el panel del negocio |
| `capturas/factura-ejemplo.png` / `.pdf` | Factura de ejemplo tal como la genera el bot (simulada, datos ficticios) |
| `datos.md` | Cifras con fuente |
| `generar-conversaciones.ts` | Regenera las conversaciones si cambian los textos del bot |
| `../../apps/api/src/panel/panel.html` | Estilo de referencia del panel |

## Entregable

Un archivo `docs/video/paga-facil-video.html` autocontenido. Debe verse bien a 1920×1080 y también escalado en una laptop, y no debe tener texto cortado.

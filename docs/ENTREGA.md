# Entrega · Paga Fácil

Textos para el formulario de entrega del Hackatón México (reglas resumidas en K01.8). Antes de pegarlos, cambia los marcadores `‹…›` por los datos reales: número de WhatsApp, URL de la demo e integrantes.

## Descripción (≤ 500 palabras)

**Paga Fácil** lleva los pagos CoDi a WhatsApp: sin instalar nada, sin comisiones y con botones. Quien paga autoriza en la app de su banco y el dinero llega directo a la cuenta de quien cobra.

**El problema.** Hay 21.8 millones de cuentas con CoDi validado, pero solo 2.5 millones han pagado alguna vez (K04.4). La luz y las recargas se pagan en efectivo, la tiendita "comprueba" transferencias con capturas y el profesionista evita la terminal, que cuesta hasta 3.95 % por venta.

**Qué hace.** Un solo bot con cuatro módulos:

1. **Servicios y recargas:** la persona elige CFE, agua, Telmex, izzi y otros, escribe su referencia, ve su adeudo y toca **Pagar**. Le llega una solicitud CoDi a la app de su banco (`POST /codi/pn`) o, si prefiere, un QR para importar desde la galería (`POST /codi/qr`). Al confirmarse el pago recibe su comprobante en el chat.
2. **Tiendita:** el cliente arma su carrito desde el catálogo y paga igual. El dueño ve el pedido pagado al instante en el **panel del negocio**.
3. **Cobro rápido con factura:** un profesionista (doctor, plomero, mecánico) escribe el monto y el concepto. Le muestra un QR a su cliente o le manda la solicitud a su celular, siempre con aceptación explícita. Al confirmarse el pago, captura RFC, nombre, código postal, régimen y uso del CFDI, y la factura en PDF llega al chat.
4. **Centro de ayuda:** guías cortas para activar CoDi, pagar con QR o notificación, seguridad y qué hacer si algo falla.

**Cómo usa la API de pey.** Toda la integración es nueva, escrita desde el 14-nov:
- Crea Mensajes de Cobro reales en producción, por QR y por notificación push.
- Confirma cada pago con el **webhook firmado** (Standard Webhooks, con ventana de tiempo y deduplicación por `webhook-id`) y, como respaldo, consultando `GET /transaction/{id}` y `GET /transaction/codi/qr/{id}`.
- Solo marca "pagado" cuando pey confirma el monto esperado, y entrega cada orden una sola vez aunque se paguen push y QR.
- El servidor impone un tope por cobro, nada se cobra sin un botón de confirmación y los registros solo guardan identificadores.

**Qué es real y qué es simulación.** El cobro CoDi es **real**: probamos una push de $0.01 pagada desde BBVA y confirmada por la API. El pago al proveedor del servicio (CFE, Telcel…) y la factura sin credenciales de un PAC son **SIMULACIÓN**, y el bot y el PDF lo dicen de forma visible. Ambas viven detrás de interfaces listas para un agregador y para Facturama, cuyo conector ya está escrito. En la demo se cobran $0.01 reales y el monto completo se muestra como referencia.

**Impacto.** Sin descargar nada, la conversación guía la primera vez con CoDi, justo cuando los bancos deben homologar el pago de cobros CoDi (14-dic-2026, K02.5). Comercios y profesionistas cobran sin comisión, con comprobante y factura automáticos.

Paga Fácil es un proyecto independiente: no es un producto de pey ni de Banxico.

## Instrucciones de prueba (≤ 1000 palabras)

**Opción A · WhatsApp**
1. Escribe «hola» al ‹número de WhatsApp del bot›. El número de prueba de Meta solo responde a números registrados: pídenos que agreguemos el tuyo.
2. Necesitas CoDi activo en la app de tu banco (BBVA, Banorte, Santander, etc.). Todos los cobros de la demo son de **$0.01 a $1**.
3. **Servicios:** Pagar un servicio → CFE → escribe `123456789012` → verás un adeudo (simulado) → **Pagar**. Abre la notificación de tu banco y autoriza $0.01. En segundos llega el comprobante, con la clave de rastreo de Banxico. Si la notificación no llega, toca **Mejor un QR**, guarda la imagen e impórtala en tu banco (CoDi → Pagar → galería).
4. **Tiendita:** Tiendita (demo) → elige productos → Pagar → «A mi número» o «Mándame QR».
5. **Cobro rápido:** escribe un monto (ej. `350`) → Consulta médica → «QR en mi pantalla». Escanéalo con otro celular, o elige «A su celular» con otro número que acepte el cobro. Al confirmarse, toca **Facturar** → «Público en general» (o captura un RFC) → **Emitir factura**. Llega un PDF marcado SIMULACIÓN.
6. **Aprende CoDi:** guías cortas desde el menú.
7. Escribe «menú» en cualquier momento para volver al inicio.

**Opción B · Panel del negocio y chat web**
- Panel: ‹URL›/panel/?clave=‹clave› muestra cada cobro en tiempo real: módulo, detalle, monto, método (push o QR), estado («Esperando pago» → «Pagado») y factura. Déjalo abierto mientras pagas desde WhatsApp.
- Chat web (plan B si WhatsApp falla): ‹URL›/dev/?clave=‹clave›. Es el mismo bot en el navegador. Escribe tu celular arriba y la push CoDi real llega a tu banco. El botón «Simular pago» existe solo para pruebas y el comprobante dice SIMULACIÓN.

**Qué observar**
- «Pagado» aparece solo después de que pey confirma el cobro, nunca antes.
- Si tocas **Mejor un QR** después de la push y pagas las dos, la orden se entrega una sola vez y el bot avisa del pago duplicado.
- Si un cobro vence (6 a 10 min), el bot ofrece generar otro.

**Correr el código**
```bash
cp .env.example .env    # PEY_API_KEY y, opcional, credenciales de WhatsApp
cd apps/api && npm install
npm test                # 29 pruebas sin red
npm run dev             # http://localhost:3000/dev y /panel/
```

## Declaración de componentes previos y de terceros

**Previo al arranque (14-nov-2026), creado por el equipo:** base de conocimiento en `conocimiento/`, `pey/`, `codi/` y `docs/REVISION-PEY-2026-11-07.md`. Es investigación consultada del 5 al 7 de noviembre. Sus ejemplos de código (K03.7) no se copiaron: la integración con pey se escribió nueva.

**Construido durante el hackatón (desde el 14-nov):** todo el código de `apps/api`. Incluye el núcleo de conversación, el cliente de pey, la verificación de webhooks, el motor de cobros, los cuatro módulos, el panel, el chat web, el generador de PDF y las pruebas.

**Terceros:**
- Express 5 (MIT).
- Node.js y `node:sqlite`.
- WhatsApp Cloud API de Meta.
- API CoDi de pey.
- Facturama API, opcional.
- cloudflared, para el túnel de desarrollo.

Los nombres de servicios (CFE, Telmex, Telcel…) solo identifican qué se paga; no implican relación con esas empresas.

**IA:** usamos asistentes de programación con IA para escribir código y documentación; el equipo revisó y probó el resultado.

**Integrantes:** ‹nombres y correos›

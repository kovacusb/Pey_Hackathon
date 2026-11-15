# Entrega · Paga Fácil

Textos para el formulario de entrega del Hackatón México (reglas resumidas en K01.8). Antes de pegarlos, cambia los marcadores `‹…›` por los datos reales: número de WhatsApp, URL de la demo e integrantes.

## Descripción (≤ 500 palabras)

**Paga Fácil** lleva los pagos CoDi a WhatsApp: sin instalar nada, sin comisiones y con botones. Quien paga autoriza en la app de su banco y el dinero llega directo a la cuenta de quien cobra.

**El problema.** Hay 21.8 millones de cuentas con CoDi validado, pero solo 2.5 millones han pagado alguna vez (K04.4). La luz y las recargas se pagan en efectivo, y el doctor, el plomero o el mecánico cobran en efectivo o con transferencias que se "comprueban" con capturas, porque la terminal cuesta hasta 3.95 % por venta.

**Qué hace.** Un solo bot con tres módulos y un panel:

1. **Cobro rápido con factura:** un profesionista (doctor, plomero, mecánico) escribe el monto y el concepto. Le muestra un QR a su cliente (`POST /codi/qr`) o le manda la solicitud a su celular (`POST /codi/pn`), siempre con aceptación explícita. El cliente autoriza en la app de **cualquier banco**. Al confirmarse el pago llega el comprobante y, si lo pide, la factura en PDF al chat.
2. **Servicios y recargas:** la persona elige CFE, agua, Telmex, izzi o una recarga, escribe su referencia, ve su adeudo, paga y recibe su comprobante.
3. **Centro de ayuda:** guías cortas para activar CoDi, pagar con QR o notificación, seguridad y qué hacer si algo falla.
4. **Panel del negocio:** cada cobro en tiempo real, de «Esperando pago» a «Pagado».

**Cómo usa la API de pey.** Toda la integración es nueva, escrita desde el 14-nov:
- Crea Mensajes de Cobro reales en producción, por QR y por notificación push.
- Confirma cada pago con el **webhook firmado** (Standard Webhooks, con ventana de tiempo y deduplicación por `webhook-id`) y, como respaldo, consultando `GET /transaction/{id}` y `GET /transaction/codi/qr/{id}`.
- Solo marca "pagado" cuando pey confirma el monto esperado, y entrega cada orden una sola vez aunque se paguen push y QR.
- El servidor impone un tope por cobro, nada se cobra sin un botón de confirmación y los registros solo guardan identificadores.

**Qué es real y qué es simulación.** El **cobro rápido es real**: cobra el monto que se escriba (hasta un tope configurable en el servidor) y lo probamos con push y QR desde varios bancos. En **servicios y recargas el pago al proveedor es SIMULACIÓN** (falta contratar un agregador), pero el **cobro CoDi sí es real por $0.01**, para mostrar el flujo completo sin cobrar un recibo que no se pagaría; el bot lo dice antes de cobrar y en el comprobante. La factura sin credenciales de un PAC también es simulada y el PDF lo indica. Ambas piezas viven detrás de interfaces: un interruptor activa el cobro real de servicios cuando haya proveedor, y el conector de Facturama ya está escrito.

**Impacto.** Sin descargar nada, la conversación guía la primera vez con CoDi, justo cuando los bancos deben homologar el pago de cobros CoDi (14-dic-2026, K02.5). Comercios y profesionistas cobran sin comisión, con comprobante y factura automáticos.

Paga Fácil es un proyecto independiente: no es un producto de pey ni de Banxico.

## Instrucciones de prueba (≤ 1000 palabras)

**Opción A · WhatsApp**
1. Escribe «hola» al ‹número de WhatsApp del bot›. El número de prueba de Meta solo responde a números registrados: pídenos que agreguemos el tuyo.
2. Necesitas CoDi activo en la app de tu banco (funciona con cualquier banco participante). Los cobros son **reales** y llegan a la cuenta de prueba del proyecto: usa montos chicos (el servidor tiene un tope de ‹tope› por cobro).
3. **Cobro rápido (real):** ⚡ Cobro rápido → escribe un monto (ej. `25`) → Consulta médica → «A su celular» → escribe tu propio número y confirma → abre la notificación de tu banco y autoriza. En segundos llega el comprobante con la clave de rastreo de Banxico. Para probar el QR, elige «QR en mi pantalla» y escanéalo **desde la app de tu banco** (CoDi → Pagar; la cámara normal no lo paga) o impórtalo desde la galería. Después toca **Facturar** → «Público en general» → **Emitir factura**: llega un PDF marcado SIMULACIÓN.
4. **Servicios (pago al proveedor simulado):** Pagar un servicio → CFE → `123456789012` → verás un adeudo → **Pagar**. Tu banco recibe un cobro CoDi **real de $0.01**; al autorizarlo llega el comprobante, que aclara que el pago a CFE es una SIMULACIÓN.
5. **Aprende CoDi:** guías cortas desde el menú.
6. Escribe «menú» en cualquier momento para volver al inicio.

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
npm test                # 33 pruebas sin red
npm run dev             # http://localhost:3000/dev y /panel/
```

## Declaración de componentes previos y de terceros

**Previo al arranque (14-nov-2026), creado por el equipo:** base de conocimiento en `conocimiento/`, `pey/`, `codi/` y `docs/REVISION-PEY-2026-11-07.md`. Es investigación consultada del 5 al 7 de noviembre. Sus ejemplos de código (K03.7) no se copiaron: la integración con pey se escribió nueva.

**Construido durante el hackatón (desde el 14-nov):** todo el código de `apps/api`. Incluye el núcleo de conversación, el cliente de pey, la verificación de webhooks, el motor de cobros, los módulos, el panel, el chat web, el generador de PDF y las pruebas.

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

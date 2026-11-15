# Guion de demo · Paga Fácil

Para el equipo. Una demo en vivo de unos 4 minutos y un video de hasta 3 minutos (K01.8 pide un cobro CoDi completo, desde el Mensaje de Cobro hasta la reacción del proyecto).

## Checklist 30 minutos antes

- [ ] `curl <URL>/salud` → `pey`, `whatsapp` y `peyWebhook` en `true`. Si `peyWebhook` está en `false`, los pagos igual se confirman por polling, con 4 s de retraso.
- [ ] Mándale «hola» al bot desde el celular de la demo (el token de Meta ya es permanente).
- [ ] Celular con CoDi activo (cualquier banco) y saldo para los montos de la demo.
- [ ] Laptop: panel abierto en `<URL>/panel/?clave=…`, sonido activado (🔔) y pantalla proyectada.
- [ ] Segundo celular (para el QR del cobro rápido) o un compañero listo para escanear.
- [ ] Plan B abierto en otra pestaña: `<URL>/dev/?clave=…`.
- [ ] Si usan Render: abre `/salud` 5 minutos antes, porque el plan gratis se duerme.
- [ ] No mostrar en pantalla `.env`, llaves, CLABEs ni números completos (K01.8).

## Demo en vivo (~4 min)

| Tiempo | Qué se ve | Qué se dice |
|---|---|---|
| 0:00 | Diapositiva o panel vacío | «21.8 millones de cuentas tienen CoDi y solo 2.5 millones lo han usado. La gente no va a bajar otra app, pero sí usa WhatsApp.» |
| 0:20 | Celular proyectado: «hola» → menú | «Paga Fácil es un bot de WhatsApp: cobros CoDi sin comisión, directo de banco a banco.» |
| 0:40 | ⚡ Cobro rápido → `150` → Consulta médica → «A su celular» → número del juez o del compañero → «Sí, enviar» | «Soy un doctor y cobro la consulta. Pregunto si mi paciente acepta y le mando la solicitud a su celular.» |
| 1:00 | Llega la notificación del banco (cualquier banco) → autorizar con huella | «Le llega la solicitud CoDi de pey a la app de su banco. Autoriza con su huella.» |
| 1:15 | Comprobante en WhatsApp + **el panel suena** y la fila pasa a «Pagado» | «pey confirma el pago con un webhook firmado y en el mismo segundo llega el comprobante con la clave de rastreo de Banxico. El negocio lo ve en su panel.» |
| 1:40 | **Facturar** → Público en general → Emitir → llega el PDF | «Y si el paciente quiere factura, sale en el chat. Hoy es simulada; con un PAC se timbra de verdad.» |
| 2:10 | Otro cobro con «QR en mi pantalla» → un compañero lo escanea desde su app bancaria | «Si no tiene a la mano su celular, le muestro el QR.» |
| 2:40 | Menú → Pagar un servicio → CFE → Pagar → autorizar $0.01 | «También la luz y las recargas: el cobro CoDi es real, de un centavo, y el pago a CFE todavía es simulado porque falta conectar al agregador.» |
| 3:10 | Aprende CoDi → «¿Es seguro?» | «Para quien nunca ha usado CoDi: guías en lenguaje claro.» |
| 3:30 | Cierre | «Sin apps, sin comisiones, dinero directo a la cuenta, con cualquier banco. Integración real con la API de pey: push, QR, webhooks firmados y confirmación antes de entregar.» |

**Frases a evitar:** «es obligatorio aceptar CoDi» (K02.4) y «somos pey» o «avalado por Banxico» (AGENTS.md §4).

## Video (≤ 3 min)

Grábenlo con pantalla dividida: el WhatsApp del celular (QuickTime → Nueva grabación de película → elegir el iPhone, o grabación de pantalla del celular) a la izquierda y el panel a la derecha.
1. 0:00–0:15: problema en una frase.
2. 0:15–1:30: **cobro completo** con Cobro rápido: solicitud → notificación del banco → autorizar → comprobante + panel en «Pagado». Esto es lo que exige la regla.
3. 1:30–2:30: cobro con QR + factura PDF.
4. 2:30–3:00: servicios (cobro real de $0.01, pago a CFE simulado) y ayuda en cámara rápida, más el cierre.

## Plan B

| Si falla… | Hagan esto |
|---|---|
| WhatsApp (token vencido, Meta caído) | Abran `/dev/?clave=…`: es el mismo bot en el navegador, con push CoDi real al celular que escriban. |
| No llega la push | Toquen **Mejor un QR** y escanéenlo o impórtenlo desde la app del banco (no con la cámara). |
| El webhook de pey | El polling confirma solo, cada 4 s. |
| pey (503 o sin red) | Muestren el video grabado. Como último recurso, «Simular pago» en `/dev`, diciendo en voz alta que es SIMULACIÓN. |
| Internet del lugar | Datos del celular para la laptop (hotspot). |

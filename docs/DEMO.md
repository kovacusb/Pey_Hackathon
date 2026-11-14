# Guion de demo · Paga Fácil

Para el equipo. Una demo en vivo de unos 4 minutos y un video de hasta 3 minutos (K01.8 pide un cobro CoDi completo, desde el Mensaje de Cobro hasta la reacción del proyecto).

## Checklist 30 minutos antes

- [ ] `curl <URL>/salud` → `pey`, `whatsapp` y `peyWebhook` en `true`. Si `peyWebhook` está en `false`, los pagos igual se confirman por polling, con 4 s de retraso.
- [ ] Token de Meta vigente (el temporal dura 24 h). Mándale «hola» al bot desde el celular de la demo.
- [ ] Celular con **BBVA** y CoDi activo, con saldo de al menos $5.
- [ ] Laptop: panel abierto en `<URL>/panel/?clave=…`, sonido activado (🔔) y pantalla proyectada.
- [ ] Segundo celular (para el QR del cobro rápido) o un compañero listo para escanear.
- [ ] Plan B abierto en otra pestaña: `<URL>/dev/?clave=…`.
- [ ] Si usan Render: abre `/salud` 5 minutos antes, porque el plan gratis se duerme.
- [ ] No mostrar en pantalla `.env`, llaves, CLABEs ni números completos (K01.8).

## Demo en vivo (~4 min)

| Tiempo | Qué se ve | Qué se dice |
|---|---|---|
| 0:00 | Diapositiva o panel vacío | «21.8 millones de cuentas tienen CoDi y solo 2.5 millones lo han usado. La gente no va a bajar otra app, pero sí usa WhatsApp.» |
| 0:20 | Celular proyectado: «hola» → menú | «Paga Fácil es un bot de WhatsApp: pagos CoDi sin comisión, directo de banco a banco.» |
| 0:40 | Pagar un servicio → CFE → referencia → adeudo → **Pagar** | «Escribo mi número de servicio, veo el adeudo y toco Pagar. Para la demo cobramos un centavo real.» |
| 1:00 | Llega la notificación de BBVA → autorizo con huella | «Me llega la solicitud CoDi de pey a la app de mi banco. Autorizo con mi huella.» |
| 1:15 | Comprobante en WhatsApp + **el panel suena** y la fila pasa a «Pagado» | «pey confirma el pago con un webhook firmado y, en el mismo segundo, llega el comprobante con la clave de rastreo de Banxico. El negocio lo ve en su panel.» |
| 1:40 | Menú → Tiendita → 2 productos → Pagar → Mándame QR | «Lo mismo para una tiendita: carrito, cobro y pedido pagado sin capturas de pantalla.» (Pueden no pagarlo para ahorrar tiempo.) |
| 2:10 | Menú → Cobro rápido → 350 → Consulta médica → QR en mi pantalla → un compañero escanea y paga | «Un doctor o un plomero cobra al momento: le muestra el QR al cliente.» |
| 2:50 | Facturar → Público en general → Emitir → llega el PDF | «Y la factura llega al chat. Hoy es simulada; con credenciales de un PAC se timbra de verdad.» |
| 3:20 | Aprende CoDi → «¿Es seguro?» | «Para quien nunca ha usado CoDi: guías en lenguaje claro.» |
| 3:40 | Cierre | «Sin apps, sin comisiones, dinero directo a la cuenta. Integración real con la API de pey: push, QR, webhooks firmados y confirmación antes de entregar.» |

**Frases a evitar:** «es obligatorio aceptar CoDi» (K02.4) y «somos pey» o «avalado por Banxico» (AGENTS.md §4).

## Video (≤ 3 min)

Grábenlo con pantalla dividida: el WhatsApp del celular (QuickTime → Nueva grabación de película → elegir el iPhone, o grabación de pantalla del celular) a la izquierda y el panel a la derecha.
1. 0:00–0:15: problema en una frase.
2. 0:15–1:30: **cobro completo** de servicios: Pagar → notificación del banco → autorizar → comprobante + panel en «Pagado». Esto es lo que exige la regla.
3. 1:30–2:30: cobro rápido con QR + factura PDF.
4. 2:30–3:00: tiendita y ayuda en cámara rápida, más el cierre.

## Plan B

| Si falla… | Hagan esto |
|---|---|
| WhatsApp (token vencido, Meta caído) | Abran `/dev/?clave=…`: es el mismo bot en el navegador, con push CoDi real al celular que escriban. |
| No llega la push | Toquen **Mejor un QR**, guarden la imagen e impórtenla en BBVA. |
| El webhook de pey | El polling confirma solo, cada 4 s. |
| pey (503 o sin red) | Muestren el video grabado. Como último recurso, «Simular pago» en `/dev`, diciendo en voz alta que es SIMULACIÓN. |
| Internet del lugar | Datos del celular para la laptop (hotspot). |

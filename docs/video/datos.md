# Datos para el video (con fuente)

Solo estas cifras pueden aparecer en el video. Todas salen de la base de conocimiento del repo, consultada entre el 5 y el 7 de noviembre de 2026.

| Dato | Valor | Fuente en el repo |
|---|---|---|
| Cuentas con CoDi validado | 21.8 millones | K04 (`conocimiento/04-contexto-pagos-y-comercios-mx.md`), fuente SD33, sep-2025 |
| Cuentas que han pagado con CoDi alguna vez | 2.5 millones | K04, SD33, sep-2025 |
| Comisión por cobrar con débito en una miscelánea | 1.15 % a 3.95 % según el adquirente | K04, SD24, jul-2026 |
| Comisión de CoDi | 0 % | `codi/08-preguntas-frecuentes.md` |
| Disponibilidad de CoDi | 24/7, en segundos | `codi/08-preguntas-frecuentes.md` |
| Informalidad laboral | 54.3 % (32.6 millones de personas) | K04, SD20, sep-2026 |
| Negocios de 0 a 10 personas | 95.4 % | K04, SD21, 2023 |

## Lo que hace Paga Fácil (verificado el 14 y 15 de noviembre de 2026)

- Cobro CoDi **real** por notificación push y por QR desde WhatsApp, pagado desde varios bancos y confirmado por la API de pey.
- Comprobante con la clave de rastreo de Banxico y panel del negocio en tiempo real.
- Factura PDF en el chat: **simulada** sin credenciales de un PAC; el conector de Facturama ya está escrito.
- Servicios y recargas: **cobro CoDi real de $0.01**, con el pago al proveedor **simulado**.
- Seguridad: firma de webhooks, una entrega por orden, tope por cobro configurable, antispam (máximo 3 solicitudes al mismo celular en 10 minutos) y solo identificadores en los registros.

# Manual de uso · Paga Fácil

Video de unos 2 minutos y medio que explica cómo usar el bot, paso a paso. Está pensado para quien recibe Paga Fácil por primera vez: comerciantes, profesionistas y sus clientes.

| Archivo | Qué es |
|---|---|
| `manual-paga-facil.mp4` | El manual en video (1080p, voz de Marlene en ElevenLabs) |
| `manual-paga-facil.html` | La misma pieza como página autocontenida: ábrela en el navegador. Teclas: espacio = pausa, ← → = escena |

**Qué cubre:**
1. Empezar con «hola» y el menú.
2. Cobro rápido con notificación al celular del cliente.
3. El cliente autoriza en su banco.
4. Cobro con QR.
5. La factura en el chat (simulada).
6. Pago de servicios y recargas (pago al proveedor simulado, cobro CoDi real de $0.01).
7. Mis pagos.
8. Aprende CoDi, con sus mini videos.
9. El panel del negocio.
10. Consejos.

Los chats que aparecen son **conversaciones reales del bot**, generadas con el código (`docs/video/generar-conversaciones.ts`), con nombres y números ficticios.

**Regenerarlo** después de cambiar textos del bot o del guion (`docs/video/manual/narracion.json`):

```bash
cd apps/api && node ../../docs/video/generar-conversaciones.ts   # conversaciones al día
cd ../../docs/video/herramientas && npm install --cache /tmp/npm-cache && node manual.mjs
```

Necesita `ELEVENLABS_API_KEY` en el `.env` de la raíz y Chrome instalado.

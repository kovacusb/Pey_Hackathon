# PRD · Pey en WhatsApp

**Problema.** Millones de personas tienen CoDi validado en su banco, pero casi nadie lo usa (K01.4, K04.4). Siguen pagando servicios y recargas en efectivo, en ventanilla o en la tiendita, y los comercios pierden ventas o pagan comisiones de terminal.

**Propuesta.** Pey dentro de WhatsApp, la app que todos ya usan. Sin instalar nada, sin comisiones y con botones en lugar de menús eternos.

## Módulos

| # | Módulo | Para quién | Estado (15-nov) |
|---|---|---|---|
| 1 | **Servicios y recargas** + Centro de ayuda | Consumidor | Funcional: cobro CoDi real con pey, liquidación al servicio SIMULADA |
| 2 | **Pey Negocios** (mesas, cajas, cobro directo) | Comercio | En construcción |
| 3 | **Cobro rápido P2P + factura express** | Profesionistas independientes | Por definir (factura detrás de una interfaz; PAC sandbox) |

## Flujo del Módulo 1

1. "Hola" → menú (lista de WhatsApp).
2. Elige el servicio (CFE, agua, Telmex, izzi…) → escribe su referencia → ve periodo, vencimiento y total.
3. **Pagar** → pey manda una solicitud CoDi a su app bancaria (`POST /codi/pn`). Si no le llega, toca **Mejor un QR** (`POST /codi/qr`) y paga escaneándolo o importándolo de la galería.
4. pey confirma (webhook firmado o `PAID` por polling) → se liquida con el agregador → comprobante en el chat.

## Decisiones

- **Un número y un backend** para los tres módulos, con router por prefijo de botón. Ver [MODULOS.md](MODULOS.md).
- **Push primero:** quien está en el chat casi siempre paga desde ese mismo celular, y un QR en la misma pantalla no se puede escanear. El QR queda como respaldo (importar de galería).
- **Demo con dinero real mínimo:** se cobra $0.01 (`DEMO_COBRO_MXN`) y se muestra el monto real del recibo, con la etiqueta de demo visible. El pago al servicio y el folio dicen SIMULACIÓN.
- **Agregador y facturación detrás de interfaces** (`agregador.ts`), listos para cambiarse por proveedores reales.
- **Plan B de demo:** `/dev` (el mismo bot en el navegador) y polling si el webhook de pey no llega (K03.6).

## Pendiente

- ⚪ Confirmar que la push CoDi llega a BBVA con el número de WhatsApp de la persona.
- Plantillas de Meta para avisos fuera de la ventana de 24 h (Módulo 2).
- Persistencia en una base administrada (hoy SQLite; en Render gratis el disco se borra al reiniciar).

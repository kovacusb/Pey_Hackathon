// Genera las conversaciones REALES del bot (mismos textos que ve el usuario en WhatsApp) para usarlas en el video.
// Corre el bot en memoria con un pey falso: no hay red, no se cobra nada y no hay números reales.
// Uso:  cd apps/api && node ../../docs/video/generar-conversaciones.ts
import { writeFileSync } from "node:fs";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1000";
process.env.DEMO_COBRO_MXN = "0";
process.env.WHATSAPP_TOKEN = "";
delete process.env.FACTURAMA_USUARIO;

const API = new URL("../../apps/api/src/", import.meta.url).pathname;
const SALIDA = new URL("./conversaciones/", import.meta.url).pathname;

const bot = await import(API + "core/bot.ts");
const cobros = await import(API + "core/cobros.ts");
const { buzon } = await import(API + "core/whatsapp/enviar.ts");
for (const [ruta, nombre] of [["modules/servicios/index.ts", "servicios"], ["modules/p2p/index.ts", "p2p"], ["modules/ayuda/index.ts", "ayuda"]] as const) {
  bot.registrarModulo((await import(API + ruta))[nombre]);
}
let n = 0;
cobros.usarClientePey({
  async crearQr() {
    return { id: `QR${++n}`, qrString: "{}", qrImage: Buffer.from("png").toString("base64") };
  },
  async crearPush() {
    return { transactionId: `TX${++n}`, codiId: "0".repeat(20) };
  },
  async pagosDelQr() {
    return [];
  },
  async transaccion(id) {
    return { id, status: "PENDING", amount: 0 };
  },
});

type Paso = { de: "persona"; texto: string } | { de: "bot"; mensaje: unknown } | { de: "banco"; texto: string };

async function grabar(archivo: string, titulo: string, waId: string, guion: (p: (e: any, eco: string) => Promise<void>, banco: (t: string) => void) => Promise<void>) {
  const pasos: Paso[] = [];
  let visto = 0;
  const recoger = () => {
    for (const c of buzon(waId, visto)) {
      visto = Math.max(visto, c.n);
      const m: any = { ...c.mensaje };
      if (m.dataUrl) m.dataUrl = m.tipo === "imagen" ? "[imagen del QR CoDi]" : `[${m.nombre}]`;
      pasos.push({ de: "bot", mensaje: m });
    }
  };
  const persona = async (e: any, eco: string) => {
    pasos.push({ de: "persona", texto: eco });
    await bot.procesarMensaje(waId, "Ana", e);
    recoger();
  };
  const banco = (t: string) => pasos.push({ de: "banco", texto: t });
  await guion(persona, banco);
  recoger();
  writeFileSync(SALIDA + archivo, JSON.stringify({ titulo, nota: "Textos reales del bot (generados con el código). Nombres y números ficticios.", pasos }, null, 2));
  console.log(`✓ ${archivo}: ${pasos.length} pasos`);
}

const confirmar = async (tipo: "qr" | "pn", id: string, pesos: number) =>
  cobros.procesarEventoPey(
    tipo === "qr"
      ? { type: "codi.qr.payment_received", codiQrId: id, transactionId: `01DEMO${id}`, amount: pesos, metadata: { trackingKey: "MBAN01002611150000123" } }
      : { type: "codi.pn.payment_received", transactionId: id, amount: pesos, metadata: { trackingKey: "MBAN01002611150000456" } },
  );

await grabar("01-menu.json", "Saludo y menú principal", "dev5510000001", async (p) => {
  await p({ tipo: "texto", texto: "hola" }, "hola");
});

await grabar("02-cobro-rapido-push-y-factura.json", "Cobro rápido: el doctor cobra la consulta por notificación y factura", "dev5510000002", async (p, banco) => {
  await p({ tipo: "boton", id: "p2p:inicio" }, "⚡ Cobro rápido");
  await p({ tipo: "texto", texto: "650" }, "650");
  await p({ tipo: "boton", id: "p2p:con:consulta" }, "Consulta médica");
  await p({ tipo: "boton", id: "p2p:metodo:pn" }, "📲 A su celular");
  await p({ tipo: "texto", texto: "55 1234 5678" }, "55 1234 5678");
  await p({ tipo: "boton", id: "p2p:enviar" }, "Sí, enviar");
  banco("📲 Al paciente le llega a su app bancaria: «Solicitud de cobro CoDi · $650.00 · Consulta médica» → autoriza con su huella");
  await confirmar("pn", `TX${n}`, 650);
  const id = cobros.cobrosRecientes(1)[0].id;
  await p({ tipo: "boton", id: `p2p:fac:${id}` }, "🧾 Facturar");
  await p({ tipo: "texto", texto: "GODE561231GR8" }, "GODE561231GR8");
  await p({ tipo: "texto", texto: "Emilio González Durán" }, "Emilio González Durán");
  await p({ tipo: "texto", texto: "06000" }, "06000");
  await p({ tipo: "boton", id: "p2p:reg:612" }, "Act. empresarial y prof.");
  await p({ tipo: "boton", id: "p2p:uso:D01" }, "Honorarios médicos");
  await p({ tipo: "boton", id: "p2p:emitir" }, "✅ Emitir factura");
});

await grabar("03-cobro-rapido-qr.json", "Cobro rápido con QR: el plomero le muestra el QR al cliente", "dev5510000003", async (p, banco) => {
  await p({ tipo: "boton", id: "p2p:inicio" }, "⚡ Cobro rápido");
  await p({ tipo: "texto", texto: "480" }, "480");
  await p({ tipo: "boton", id: "p2p:con:plomeria" }, "Plomería");
  await p({ tipo: "boton", id: "p2p:metodo:qr" }, "📷 QR en mi pantalla");
  banco("📷 El cliente abre la app de su banco → CoDi → Pagar → escanea el QR → autoriza");
  await confirmar("qr", `QR${n}`, 480);
});

await grabar("04-servicios-cfe.json", "Pagar la luz (cobro CoDi real de $0.01; pago a CFE simulado)", "dev5510000004", async (p, banco) => {
  await p({ tipo: "boton", id: "svc:servicios" }, "💡 Pagar un servicio");
  await p({ tipo: "boton", id: "svc:srv:cfe" }, "💡 CFE");
  await p({ tipo: "texto", texto: "123456789012" }, "123456789012");
  await p({ tipo: "boton", id: "svc:pagar:pn" }, "✅ Pagar");
  banco("📲 Llega la solicitud CoDi de $0.01 a la app del banco → autoriza");
  await confirmar("pn", `TX${n}`, 0.01);
});

await grabar("05-recarga.json", "Recarga de saldo", "dev5510000005", async (p) => {
  await p({ tipo: "boton", id: "svc:recargas" }, "📱 Recarga de saldo");
  await p({ tipo: "boton", id: "svc:rec:telcel" }, "📱 Telcel");
  await p({ tipo: "boton", id: "svc:recnum:yo" }, "A este número");
  await p({ tipo: "boton", id: "svc:recmonto:100" }, "$100");
});

await grabar("06-aprende-codi.json", "Centro de ayuda: aprender CoDi", "dev5510000006", async (p) => {
  await p({ tipo: "boton", id: "ayuda:temas" }, "📚 Aprende CoDi");
  await p({ tipo: "boton", id: "ayuda:g:seguridad" }, "¿Es seguro?");
});

// Panel: lo que vería el negocio después de esos cobros (mismo formato que /panel/api/resumen, sin datos personales).
const panel = cobros.cobrosRecientes(20).map((c) => ({
  modulo: c.modulo,
  concepto: (c.payload as any).concepto ?? (c.payload as any).orden?.nombre ?? c.concepto,
  montoCentavos: Number((c.payload as any).centavosReal ?? (c.payload as any).orden?.centavosReal ?? c.centavos),
  cobradoCentavos: c.centavos,
  metodo: c.metodo,
  estado: c.estado,
  factura: (c.payload as any).factura?.folio ?? null,
}));
writeFileSync(SALIDA + "07-panel.json", JSON.stringify({ titulo: "Panel del negocio después de los cobros", cobros: panel }, null, 2));
console.log("✓ 07-panel.json");
process.exit(0);

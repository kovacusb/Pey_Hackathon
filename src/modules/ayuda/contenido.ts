// Centro de ayuda: guías cortas para personas acostumbradas al efectivo.
// Fuentes: codi/01, codi/04, codi/05, codi/08 (redacción propia). Cada guía puede llevar video_url (fase futura).
// Regla: no afirmar que pagar con QR ya es obligatorio (K02.4) ni aval de Banxico o pey.

export interface Guia {
  id: string;
  titulo: string; // <= 24 caracteres (fila de lista de WhatsApp)
  resumen: string; // <= 72 caracteres
  texto: string; // mensaje corto; los pasos van numerados
  video_url?: string | null;
}

export const GUIAS: Guia[] = [
  {
    id: "que-es",
    titulo: "¿Qué es CoDi?",
    resumen: "Pagar desde tu celular, sin efectivo y sin comisión",
    texto:
      "*CoDi* es el Cobro Digital del Banco de México.\n\n" +
      "• Pagas desde la *app de tu banco*, sin tarjeta y sin efectivo.\n" +
      "• *Sin comisión*, sin importar el monto.\n" +
      "• Funciona *24/7* y el dinero llega en segundos.\n" +
      "• Solo necesitas internet (datos o Wi-Fi).",
    video_url: null,
  },
  {
    id: "activar",
    titulo: "Activar CoDi",
    resumen: "Lo haces una sola vez en la app de tu banco",
    texto:
      "*Activa CoDi en 4 pasos:*\n\n" +
      "1. Abre la *app de tu banco*.\n" +
      "2. Busca la opción *CoDi* (a veces está en Transferir o Pagar).\n" +
      "3. Registra tu cuenta con tu *CLABE*, tu *tarjeta de débito* o tu *celular*.\n" +
      "4. Sigue la validación que te pida tu banco.\n\n" +
      "Si tu app tiene CoDi pero no te deja usarlo, llama a tu banco.",
    video_url: null,
  },
  {
    id: "pagar-notificacion",
    titulo: "Pagar con notificación",
    resumen: "La forma más fácil: te llega la solicitud a tu celular",
    texto:
      "*Pagar con notificación:*\n\n" +
      "1. En Pey toca *Pagar*.\n" +
      "2. Te llega una *notificación* de tu banco.\n" +
      "3. Revisa el monto y el concepto.\n" +
      "4. Autoriza con tu *NIP o huella*.\n\n" +
      "Listo: aquí mismo te llega tu comprobante ✅",
    video_url: null,
  },
  {
    id: "pagar-qr",
    titulo: "Pagar con QR",
    resumen: "Escanea o importa el QR desde tu galería",
    texto:
      "*Pagar con QR:*\n\n" +
      "1. Abre la app de tu banco → *CoDi* → *Pagar*.\n" +
      "2. *Escanea* el QR. Si lo tienes en este mismo celular, guárdalo e *impórtalo desde tu galería*.\n" +
      "3. Revisa los datos del cobro.\n" +
      "4. Autoriza con tu *NIP o huella*.",
    video_url: null,
  },
  {
    id: "seguridad",
    titulo: "¿Es seguro?",
    resumen: "Tú autorizas cada pago; nadie ve tu NIP",
    texto:
      "*Tu dinero está protegido:*\n\n" +
      "• *Nada se cobra sin tu autorización*: una solicitud de cobro no mueve dinero hasta que tú aceptas.\n" +
      "• Pey *no ve* tu NIP ni los datos de tu cuenta.\n" +
      "• Puedes *bloquear* cobros que no pediste desde tu app.\n\n" +
      "🚩 No autorices si el *monto* o el *nombre* no coinciden con lo que vas a pagar.",
    video_url: null,
  },
  {
    id: "limites",
    titulo: "Costos y límites",
    resumen: "Sin comisiones; cuánto puedes pagar",
    texto:
      "*Costos y límites:*\n\n" +
      "• CoDi *no cobra comisión*.\n" +
      "• Los bancos deben permitir cobros CoDi de hasta *6,000 UDIS*; algunos permiten más.\n" +
      "• Se paga desde una *cuenta de depósito* (débito), no con tarjeta de crédito.",
    video_url: null,
  },
  {
    id: "no-llego",
    titulo: "Pagué y no llegó",
    resumen: "Qué hacer si algo sale mal",
    texto:
      "*Si pagaste y no se reflejó:*\n\n" +
      "1. Revisa en la app de tu banco si el pago aparece como realizado.\n" +
      "2. Si no hubo aviso, acude a *atención a clientes de tu banco* con el *folio* y la *fecha*.\n" +
      "3. También puedes llamar a *800 BANXICO* (800 226 9426, opción 3).\n\n" +
      "Si te cobraron algo que no reconoces, acláralo con la Unidad Especializada de tu banco.",
    video_url: null,
  },
  {
    id: "devoluciones",
    titulo: "Devoluciones",
    resumen: "Cómo funciona si necesitas que te regresen dinero",
    texto:
      "*Devoluciones:*\n\n" +
      "• Quien recibió el pago puede *devolverlo* completo o en parte.\n" +
      "• En CoDi *no hay contracargos*, porque tú autorizas cada pago.\n" +
      "• Si hay un problema con un servicio, contacta a quien te cobró.",
    video_url: null,
  },
];

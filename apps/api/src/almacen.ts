// Conversaciones e IDs ya procesados. Meta reintenta un webhook hasta por 36 horas, así que hay que deduplicar.

import type { Estado } from "./bot.ts";

export interface Almacen {
  /** Registra el ID; devuelve false si ya se había procesado. */
  marcarProcesado(id: string): Promise<boolean>;
  leerEstado(clave: string): Promise<Estado | undefined>;
  guardarEstado(clave: string, estado: Estado): Promise<void>;
}

// TODO(tarea 2): AlmacenPostgres. En memoria todo se pierde al reiniciar. Sirve mientras no haya cobros, porque la
// deduplicación con efectos de dinero debe ser persistente (AGENTS.md §4).
export class AlmacenMemoria implements Almacen {
  #procesados = new Set<string>();
  #estados = new Map<string, Estado>();

  async marcarProcesado(id: string): Promise<boolean> {
    if (this.#procesados.has(id)) return false;
    this.#procesados.add(id);
    if (this.#procesados.size > 10_000) {
      const masViejo = this.#procesados.values().next().value;
      if (masViejo !== undefined) this.#procesados.delete(masViejo);
    }
    return true;
  }

  async leerEstado(clave: string): Promise<Estado | undefined> {
    return this.#estados.get(clave);
  }

  async guardarEstado(clave: string, estado: Estado): Promise<void> {
    this.#estados.set(clave, estado);
  }
}

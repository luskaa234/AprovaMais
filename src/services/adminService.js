import { isSupabaseConfigured, requireSupabase, supabase } from "../lib/supabase";

async function invokeAdminFunction(name, body = {}) {
  const client = requireSupabase();
  const { data, error } = await client.functions.invoke(name, { body });
  if (error) {
    let payload = null;
    if (error.context?.json) {
      try {
        payload = await error.context.clone().json();
      } catch {
        payload = null;
      }
    }
    const message = payload?.error || error.message || "Acao administrativa recusada.";
    const wrapped = new Error(message);
    wrapped.status = error.context?.status;
    throw wrapped;
  }
  if (data?.error) {
    const wrapped = new Error(data.error);
    wrapped.status = data.status;
    throw wrapped;
  }
  return data;
}

export const adminService = {
  async getStats() {
    const { usuarios = [], count = 0 } = await this.getUsuarios({ limit: 500 });
    const ativos = usuarios.filter((user) => user.plano_ativo).length;
    const vitalicios = usuarios.filter((user) => user.vitalicio).length;
    return { usuarios: count || usuarios.length, ativos, vitalicios };
  },

  async getUsuarios({ search = "", page = 1, limit = 100 } = {}) {
    const data = await invokeAdminFunction("admin-listar-usuarios", { search, page, limit });
    return data;
  },

  async tornarVitalicio(userId) {
    return invokeAdminFunction("admin-set-vitalicio", { userId });
  },

  async cancelarAcesso(userId) {
    return invokeAdminFunction("admin-cancelar-acesso", { userId });
  },

  async definirPlano(userId, payload) {
    return invokeAdminFunction("admin-set-plano", { userId, ...payload });
  },

  async getMaintenance() {
    if (!isSupabaseConfigured || !supabase) {
      return { enabled: false, message: "" };
    }
    const { data, error } = await supabase
      .from("app_config")
      .select("value")
      .eq("key", "maintenance_mode")
      .maybeSingle();
    if (error) return { enabled: false, message: "" };
    return {
      enabled: Boolean(data?.value?.enabled),
      message: data?.value?.message || "",
    };
  },

  async setMaintenance({ enabled, message }) {
    const data = await invokeAdminFunction("admin-set-manutencao", { enabled, message });
    return {
      enabled: Boolean(data?.config?.value?.enabled),
      message: data?.config?.value?.message || "",
    };
  },
};

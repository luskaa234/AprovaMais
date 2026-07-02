import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useTafStore } from "../stores";
import tafExerciciosData from "../data/taf_exercicios.json";

// Mapeia cada exercicio do dataset local pro "tipo" oficial usado pelo resto
// do app (TAF_TESTS em src/pages/TAF/index.jsx, tabela de notas em
// calcularNota). Exercicios de preparo (prancha, burpee) nao correspondem a
// nenhuma prova oficial, entao usam o proprio id como tipo.
const TIPO_POR_ID = {
  "taf-001": "flexao",
  "taf-002": "barra",
  "taf-003": "barra",
  "taf-004": "abdominal",
  "taf-005": "corrida",
  "taf-007": "flexao",
};

function isComplementar(item) {
  return String(item.taf?.prova || "").toLowerCase().includes("preparo");
}

function adaptLocalExercise(item) {
  return {
    id: item.id,
    name: item.name,
    gifUrl: item.gif || "",
    equipment: item.equipment || "peso corporal",
    target: item.target || "geral",
    secondaryMuscles: item.secondaryMuscles || [],
    instructions: item.instructions || [],
    tafLabel: item.taf?.prova || item.name,
    tafGoal: item.description || "",
    tafTipo: TIPO_POR_ID[item.id] || item.id,
    complementar: isComplementar(item),
  };
}

/**
 * Future REST contract:
 * GET /taf/editais
 * POST /taf/simulados
 * GET /taf/historico
 * POST /taf/plano/gerar
 */
export const tafService = {
  async getEditais() { return useTafStore.getState().editais; },
  async buscarExercicios() {
    return (tafExerciciosData.exercicios || []).map(adaptLocalExercise);
  },
  async getHistorico(userId = null) {
    if (isSupabaseConfigured) {
      const uid = userId || await getCurrentUserId();
      if (!uid) return [];
      const { data, error } = await supabase.from("taf_testes").select("*").eq("user_id", uid).order("data", { ascending: true });
      if (error) throw error;
      return data.map((item) => ({ id: item.id, data: item.data, concurso: item.concurso, ...item.resultados, nota: item.nota, situacao: item.situacao }));
    }
    return useTafStore.getState().historico;
  },
  async getPlano() { return useTafStore.getState().plano; },
  async getDicas() { return useTafStore.getState().dicas; },
  async getTreinos(userId = null) {
    if (isSupabaseConfigured) {
      const uid = userId || await getCurrentUserId();
      if (!uid) return [];
      const { data, error } = await supabase.from("taf_treinos").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(30);
      if (error) throw error;
      return data;
    }
    return useTafStore.getState().treinos;
  },
  async registrarTreino(tipo, valor, unidade = "repeticoes", userId = null) {
    if (isSupabaseConfigured) {
      const uid = userId || await getCurrentUserId();
      if (!uid) return null;
      const { error } = await supabase.from("taf_treinos").insert({ user_id: uid, tipo, valor: Number(valor), unidade });
      if (error) throw error;
      return true;
    }
    useTafStore.getState().registrarTreino(tipo, valor);
    return true;
  },
  async registrarTeste(resultados, concurso = "PMSP", userId = null) {
    if (isSupabaseConfigured) {
      const uid = userId || await getCurrentUserId();
      if (uid) {
        const { nota, situacao } = this.calcularNota(resultados, concurso);
        const { error } = await supabase.from("taf_testes").insert({ user_id: uid, concurso, nota, situacao, resultados });
        if (error) throw error;
        await supabase.from("profiles").update({ taf_nota: nota }).eq("id", uid);
        useTafStore.getState().registrarTeste(resultados);
        return { nota, situacao };
      }
    }
    const nota = useTafStore.getState().registrarTeste(resultados);
    return { nota, situacao: nota >= 7 ? "Aprovado" : "Reprovado" };
  },
  calcularNota(resultados, concurso = "PMSP") {
    const tabela = {
      PMSP: {
        corrida: [[2400, 10], [2300, 9], [2200, 8], [2100, 7], [2000, 6], [1900, 5], [0, 0]],
        flexao: [[35, 10], [30, 9], [25, 8], [20, 7], [15, 6], [10, 5], [0, 0]],
        abdominal: [[45, 10], [40, 9], [35, 8], [30, 7], [25, 6], [20, 5], [0, 0]],
        barra: [[10, 10], [8, 9], [6, 8], [5, 7], [4, 6], [3, 5], [0, 0]],
      },
      PRF: {
        corrida: [[2700, 10], [2600, 9], [2500, 8], [2400, 7], [2300, 6], [2100, 5], [0, 0]],
        flexao: [[40, 10], [35, 9], [30, 8], [25, 7], [20, 6], [15, 5], [0, 0]],
        abdominal: [[50, 10], [45, 9], [40, 8], [35, 7], [30, 6], [25, 5], [0, 0]],
        barra: [[12, 10], [10, 9], [8, 8], [6, 7], [5, 6], [4, 5], [0, 0]],
      },
    }[concurso] || {};
    const notas = Object.entries(resultados).flatMap(([tipo, valor]) => {
      const linha = tabela[tipo]?.find(([min]) => Number(valor) >= min);
      return linha ? [linha[1]] : [];
    });
    const nota = notas.length ? Number((notas.reduce((sum, value) => sum + value, 0) / notas.length).toFixed(1)) : 0;
    return { nota, situacao: nota >= 6 ? "Aprovado" : "Reprovado" };
  },
  calcularPontuacao(prova, valor) {
    const row = prova.tabela.find((item) => valor >= item.min && valor <= item.max) || prova.tabela[0];
    return { pontos: row.pontos, situacao: row.eliminatorio ? "Eliminatório" : row.pontos >= 7 ? "Aprovado" : "Na média", minimo: prova.minimo };
  },
};

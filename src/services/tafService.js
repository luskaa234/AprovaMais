import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useTafStore } from "../stores";

const EXERCISE_BASE = "https://oss.exercisedb.dev/api/v1";

const TAF_EXERCISES = {
  corrida: {
    bodyPart: "cardio",
    label: "Corrida 12 min",
    goal: "ganhar ritmo, resistencia e controle respiratorio",
    keywords: ["run", "running", "jumping jack", "high knee", "mountain climber", "burpee", "skater"],
    avoid: ["dumbbell", "barbell", "kettlebell", "weighted", "band", "medicine ball"],
  },
  flexao: {
    bodyPart: "chest",
    label: "Flexao de braco",
    goal: "melhorar repeticoes validas com tronco alinhado",
    keywords: ["push-up", "push up", "press-up", "chest dip"],
    avoid: ["bench", "dumbbell", "barbell", "machine", "cable", "bosu", "ball", "suspended"],
  },
  abdominal: {
    bodyPart: "waist",
    label: "Abdominal",
    goal: "fortalecer core para abdominal remador/supra",
    keywords: ["sit-up", "sit up", "crunch", "leg raise", "plank", "v-up", "mountain climber"],
    avoid: ["cable", "machine", "dumbbell", "barbell", "band", "ball", "weighted"],
  },
  barra: {
    bodyPart: "back",
    label: "Barra fixa",
    goal: "desenvolver puxada, escapulas e pegada",
    keywords: ["pull-up", "pull up", "chin-up", "chin up", "inverted row"],
    avoid: ["cable", "machine", "dumbbell", "barbell", "lever", "band"],
  },
  natacao: {
    bodyPart: "cardio",
    label: "Natacao",
    goal: "condicionamento aerobico geral",
    keywords: ["swim", "jumping jack", "burpee", "mountain climber"],
    avoid: ["dumbbell", "barbell", "kettlebell", "weighted", "band", "medicine ball"],
  },
};

function adaptExercise(item, tipo) {
  const taf = TAF_EXERCISES[tipo] || TAF_EXERCISES.corrida;
  return {
    ...item,
    id: item.exerciseId || item.id || `${tipo}-${item.name}`,
    equipment: item.equipment || item.equipments?.[0] || "peso corporal",
    target: item.target || item.targetMuscles?.[0] || item.bodyParts?.[0] || "geral",
    secondaryMuscles: item.secondaryMuscles || item.targetMuscles || [],
    instructions: item.instructions || [],
    tafLabel: taf.label,
    tafGoal: taf.goal,
    tafTipo: tipo,
  };
}

function scoreExercise(item, taf) {
  const text = `${item.name || ""} ${(item.equipments || []).join(" ")} ${(item.targetMuscles || []).join(" ")}`.toLowerCase();
  const hasAvoided = taf.avoid.some((word) => text.includes(word));
  const keywordScore = taf.keywords.reduce((score, word) => score + (text.includes(word) ? 4 : 0), 0);
  const bodyWeightScore = text.includes("body weight") ? 2 : 0;
  const gifScore = item.gifUrl ? 1 : 0;
  return keywordScore + bodyWeightScore + gifScore - (hasAvoided ? 20 : 0);
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
  async buscarExercicios(tipo) {
    const taf = TAF_EXERCISES[tipo] || TAF_EXERCISES.corrida;

    try {
      const res = await fetch(`${EXERCISE_BASE}/exercises?bodyParts=${taf.bodyPart}&limit=80`);
      if (!res.ok) throw new Error("ExerciseDB indisponivel.");
      const data = await res.json();
      const items = data.exercises || data.data || data;
      const ranked = items
        .map((item) => ({ item, score: scoreExercise(item, taf) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ item }) => adaptExercise(item, tipo));
      return ranked.length ? ranked : tafService.getExerciciosEstaticos(tipo);
    } catch {
      return tafService.getExerciciosEstaticos(tipo);
    }
  },
  getExerciciosEstaticos(tipo) {
    const estaticos = {
      corrida: [
        {
          id: "fb-cardio-1",
          name: "corrida estacionaria",
          gifUrl: "",
          equipment: "peso corporal",
          target: "cardiovascular",
          secondaryMuscles: ["quadriceps", "panturrilhas"],
          instructions: ["Aqueca por 5 minutos.", "Mantenha postura alta.", "Alterne ritmo moderado e forte.", "Desacelere ao final."],
          tafTipo: "corrida",
        },
      ],
      flexao: [
        {
          id: "fb-chest-1",
          name: "flexao de braco",
          gifUrl: "",
          equipment: "peso corporal",
          target: "peitoral",
          secondaryMuscles: ["triceps", "deltoides"],
          instructions: ["Alinhe as maos abaixo dos ombros.", "Desca com tronco firme.", "Suba sem travar os cotovelos.", "Mantenha o abdomen contraido."],
          tafTipo: "flexao",
        },
      ],
      abdominal: [
        {
          id: "fb-waist-1",
          name: "abdominal remador",
          gifUrl: "",
          equipment: "peso corporal",
          target: "abdomen",
          secondaryMuscles: ["flexores do quadril"],
          instructions: ["Deite com pernas estendidas.", "Suba tronco e joelhos juntos.", "Toque os pes proximos ao corpo.", "Retorne controlando a descida."],
          tafTipo: "abdominal",
        },
      ],
      barra: [
        {
          id: "fb-back-1",
          name: "barra fixa",
          gifUrl: "",
          equipment: "barra",
          target: "dorsal",
          secondaryMuscles: ["biceps", "antebraco"],
          instructions: ["Segure a barra com pegada firme.", "Inicie com bracos estendidos.", "Puxe ate o queixo passar da barra.", "Desca com controle."],
          tafTipo: "barra",
        },
      ],
    };
    return estaticos[tipo] || estaticos.corrida;
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

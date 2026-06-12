const BASE_URL = "https://oss.exercisedb.dev/api/v1";

function adaptExercise(item) {
  return {
    ...item,
    id: item.exerciseId || item.id || item.name,
    equipment: item.equipment || item.equipments?.[0] || "peso corporal",
    target: item.target || item.targetMuscles?.[0] || item.bodyParts?.[0] || "geral",
    secondaryMuscles: item.secondaryMuscles || item.targetMuscles || [],
    instructions: item.instructions || [],
  };
}

const fallback = {
  cardio: [
    { id: "fb-cardio-1", name: "corrida estacionaria", gifUrl: "", equipment: "peso corporal", target: "cardiovascular", secondaryMuscles: ["quadriceps", "panturrilhas"], instructions: ["Aqueca por 5 minutos.", "Mantenha postura alta.", "Alterne ritmo moderado e forte.", "Desacelere ao final."] },
  ],
  chest: [
    { id: "fb-chest-1", name: "flexao de braco", gifUrl: "", equipment: "peso corporal", target: "peitoral", secondaryMuscles: ["triceps", "deltoides"], instructions: ["Alinhe as maos abaixo dos ombros.", "Desca com tronco firme.", "Suba sem travar os cotovelos.", "Mantenha o abdomen contraido."] },
  ],
  waist: [
    { id: "fb-waist-1", name: "abdominal remador", gifUrl: "", equipment: "peso corporal", target: "abdomen", secondaryMuscles: ["flexores do quadril"], instructions: ["Deite com pernas estendidas.", "Suba tronco e joelhos juntos.", "Toque os pés próximos ao corpo.", "Retorne controlando a descida."] },
  ],
  back: [
    { id: "fb-back-1", name: "barra fixa", gifUrl: "", equipment: "barra", target: "dorsal", secondaryMuscles: ["biceps", "antebraco"], instructions: ["Segure a barra com pegada firme.", "Inicie com bracos estendidos.", "Puxe ate o queixo passar da barra.", "Desca com controle."] },
  ],
};

export const exerciseDbService = {
  async getByBodyPart(bodyPart) {
    try {
      const res = await fetch(`${BASE_URL}/exercises?bodyParts=${bodyPart}&limit=4`);
      if (!res.ok) throw new Error("ExerciseDB indisponível.");
      const data = await res.json();
      const items = data.exercises || data.data || data;
      return items.map(adaptExercise);
    } catch {
      return fallback[bodyPart] || [];
    }
  },
  getTafExercicios() {
    return {
      corrida: { bodyPart: "cardio", nome: "Corrida / Aerobico" },
      flexao: { bodyPart: "chest", nome: "Flexao de Braco" },
      abdominal: { bodyPart: "waist", nome: "Abdominal" },
      barra: { bodyPart: "back", nome: "Barra Fixa" },
      natacao: { bodyPart: "cardio", nome: "Natacao" },
    };
  },
};

import { usePlanoStore } from "../stores";

const dayIndexToName = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function slug(value = "") {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function subjectsForUser(user = {}) {
  const target = normalize(`${user.targetContest || ""} ${user.objective || ""} ${user.contestName || ""} ${user.diagnosticPlan?.objective || ""}`);
  if (target.includes("oab")) {
    return ["Etica Profissional", "Constitucional", "Civil", "Processo Civil", "Penal", "Trabalho"];
  }
  if (target.includes("pm") || target.includes("policia") || target.includes("militar")) {
    return ["Portugues", "Matematica/RL", "Constitucional", "Penal", "Processual Penal", "Legislacao Especial", "Informatica", "TAF"];
  }
  return ["Portugues", "Constitucional", "Administrativo", "Informatica", "Raciocinio Logico", "Atualidades"];
}

function availableDaysForUser(user = {}) {
  const explicit = user.availableDays || user.diasDisponiveis || user.daysAvailable;
  if (Array.isArray(explicit) && explicit.length) return explicit.map(normalize);
  const daysPerWeek = Number(user.daysPerWeek || 6);
  return dayIndexToName.slice(1, Math.min(7, daysPerWeek + 1));
}

function buildSmartWeek(user = {}, startDate = new Date()) {
  const start = addDays(startDate, -startDate.getDay());
  const subjects = subjectsForUser(user);
  const availableDays = new Set(availableDaysForUser(user));
  const weeklyHours = Number(user.horasSemanais || user.hoursPerWeek || (user.hoursPerDay && user.daysPerWeek ? user.hoursPerDay * user.daysPerWeek : 18));
  const studyDays = Array.from({ length: 7 }, (_, index) => addDays(start, index)).filter((date) => availableDays.has(dayIndexToName[date.getDay()]));
  const days = studyDays.length ? studyDays : Array.from({ length: 6 }, (_, index) => addDays(start, index + 1));
  const minutesPerDay = Math.max(45, Math.round((weeklyHours * 60) / days.length));
  const blocksPerDay = minutesPerDay >= 180 ? 3 : minutesPerDay >= 100 ? 2 : 1;
  const blockMinutes = Math.max(35, Math.round(minutesPerDay / blocksPerDay));
  const targetContest = user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || "PM";

  return days.flatMap((date, dayIndex) => Array.from({ length: blocksPerDay }, (_, blockIndex) => {
    const subject = subjects[(dayIndex * blocksPerDay + blockIndex) % subjects.length];
    const isLastBlock = blockIndex === blocksPerDay - 1;
    const type = date.getDay() === 6 && isLastBlock ? "Simulado" : isLastBlock ? "Questoes" : blockIndex === 0 ? "Estudo" : "Revisao";
    const hour = `${String(8 + blockIndex * 2).padStart(2, "0")}:00`;
    return {
      id: `smart-${isoDate(date)}-${blockIndex}-${slug(subject)}`,
      date: isoDate(date),
      hour,
      title: `${type} - ${subject}`,
      materia: subject,
      type,
      duration: type === "Simulado" ? Math.max(90, blockMinutes) : blockMinutes,
      status: "Pendente",
      concurso: targetContest,
      generated: true,
    };
  }));
}

/**
 * Future REST contract:
 * GET /plano
 * POST /plano/gerar
 * PUT /plano/progresso
 */
export const planoService = {
  async getPlano() {
    return usePlanoStore.getState().getPlano();
  },
  async gerarSemanaInteligente({ user = {}, startDate = new Date() } = {}) {
    return buildSmartWeek(user, startDate);
  },
  async getSugestao() {
    return "Redistribua 20 min de Informatica para Constitucional nesta semana.";
  },
};

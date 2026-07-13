function normalizeFocusValue(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function isOabFocus(user = {}) {
  const objective = normalizeFocusValue(user.objective || user.diagnosticPlan?.objective);
  const target = normalizeFocusValue(user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || user.customObjective);
  return objective === "oab" || target.includes("oab");
}

export function isTafFocus(user = {}) {
  const objective = normalizeFocusValue(user.objective || user.diagnosticPlan?.objective);
  const target = normalizeFocusValue(user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || user.customObjective);
  return objective === "taf" || target.includes("taf");
}

export function isOabMaterial(item = {}) {
  const text = normalizeFocusValue([
    item.id,
    item.titulo,
    item.materia,
    item.descricao,
    item.source,
    item.chapters?.[0]?.contest,
    item.chapters?.[0]?.materialTitle,
  ].filter(Boolean).join(" "));
  return text.includes("oab") || text.includes("exame de ordem");
}

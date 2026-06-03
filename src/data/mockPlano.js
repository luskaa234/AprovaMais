const dias = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta"];
const materiasPlano = ["Constitucional", "Portugues", "Informatica", "Raciocinio", "Administrativo"];

export const mockPlano = dias.map((dia, index) => ({
  dia,
  blocos: ["08:00", "14:00", "19:00"].map((hora, slot) => ({ hora, materia: materiasPlano[(index + slot) % materiasPlano.length], duracao: 60 + slot * 30 })),
  tarefas: ["Ler teoria", "Resolver questoes", "Revisar erros"].map((titulo, task) => ({ id: `${index}-${task}`, titulo, minutos: 30 + task * 15, done: task === 0 })),
}));

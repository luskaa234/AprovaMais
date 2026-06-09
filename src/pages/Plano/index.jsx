import { useCallback, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Dumbbell, FileQuestion, Layers, Sparkles } from "lucide-react";
import { AIPanel } from "../../ai";
import { Badge, Button, Card, ProgressBar, Tabs, cx } from "../../components";
import { useAsyncData } from "../../hooks";
import { planoService } from "../../services";

const views = ["Dia", "Semana", "Mes"];

function buildCalendar(plano = [], view = "Semana") {
  const base = view === "Dia" ? plano.slice(0, 1) : view === "Semana" ? plano.slice(0, 5) : Array.from({ length: 20 }, (_, index) => plano[index % Math.max(plano.length, 1)]).filter(Boolean);
  return base.map((dia, index) => ({
    ...dia,
    label: view === "Mes" ? `${index + 1}` : dia.dia,
    events: [
      ...(dia.blocos || []).map((bloco, blocoIndex) => ({
        id: `${dia.dia}-${bloco.hora}-${blocoIndex}`,
        type: blocoIndex === 1 ? "Revisao" : "Estudo",
        title: bloco.materia,
        meta: `${bloco.hora} · ${bloco.duracao} min`,
        icon: blocoIndex === 1 ? Layers : Clock,
      })),
      index % 3 === 0 ? { id: `${dia.dia}-simulado`, type: "Simulado", title: "Simulado direcionado", meta: "20 questoes", icon: FileQuestion } : null,
      index < 3 ? { id: `${dia.dia}-taf`, type: "TAF", title: "Corrida intervalada", meta: "45 min", icon: Dumbbell } : null,
    ].filter(Boolean),
  }));
}

function eventTone(type) {
  if (type === "TAF") return "border-amber-400/50 bg-amber-500/10 text-amber-100";
  if (type === "Simulado") return "border-blue-400/50 bg-blue-500/10 text-blue-100";
  if (type === "Revisao") return "border-indigo-400/50 bg-indigo-500/10 text-indigo-100";
  return "border-gray-800 bg-gray-900 text-gray-200";
}

export default function PlanoPage() {
  const load = useCallback(() => planoService.getPlano(), []);
  const { data = [] } = useAsyncData(load, [load]);
  const plano = data || [];
  const [done, setDone] = useState({});
  const [view, setView] = useState("Semana");
  const days = useMemo(() => buildCalendar(plano, view), [plano, view]);
  const today = plano[0];

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Plano de estudos</p>
          <h1 className="text-3xl font-black text-white">Calendario de estudos</h1>
          <p className="mt-1 text-sm text-gray-400">Estudos, revisoes, simulados, questoes e TAF organizados por periodo.</p>
        </div>
        <Tabs items={views} activeTab={view} onChange={setView} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Card hover={false}>
          <div className={cx("grid gap-3", view === "Mes" ? "sm:grid-cols-2 xl:grid-cols-5" : "md:grid-cols-2 xl:grid-cols-5")}>
            {days.map((dia, index) => (
              <section key={`${dia.dia}-${index}`} className="min-h-64 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{view === "Mes" ? dia.dia : index === 0 ? "Hoje" : "Dia"}</p>
                    <h2 className="text-lg font-black text-white">{dia.label}</h2>
                  </div>
                  <CalendarDays className="text-blue-300" size={18} />
                </div>

                <div className="space-y-2">
                  {dia.events.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className={cx("rounded-lg border p-3 text-sm", eventTone(event.type))}>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <Badge variant={event.type === "TAF" ? "warning" : "neutral"}>{event.type}</Badge>
                          <Icon size={15} />
                        </div>
                        <strong className="block text-white">{event.title}</strong>
                        <span className="mt-1 block text-xs opacity-80">{event.meta}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card hover={false}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="font-bold text-white">Estudos do dia</h2>
              <Badge variant="success">{today?.dia || "Hoje"}</Badge>
            </div>
            {(today?.tarefas || []).map((task) => (
              <label className="flex items-center gap-3 border-b border-gray-800 py-3 text-gray-300" key={task.id}>
                <input checked={done[task.id] || task.done} onChange={(event) => setDone((current) => ({ ...current, [task.id]: event.target.checked }))} type="checkbox" />
                <span className="min-w-0 flex-1">{task.titulo}</span>
                <span className="text-xs text-gray-500">{task.minutos} min</span>
              </label>
            ))}
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-blue-300" />
              <h2 className="font-bold text-white">Progresso por disciplina</h2>
            </div>
            {["Constitucional", "Portugues", "Informatica", "Raciocinio"].map((item, index) => <ProgressBar key={item} label={item} value={52 + index * 10} />)}
          </Card>

          <AIPanel text="Sugestao: antecipe revisao de Constitucional antes do proximo simulado e mantenha 3 treinos TAF." action={<Button size="sm" icon={Sparkles}>Aplicar</Button>} />
        </div>
      </div>
    </div>
  );
}

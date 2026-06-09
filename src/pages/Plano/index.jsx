import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, Filter, MoreVertical, Plus, RotateCcw, Target, TrendingUp } from "lucide-react";
import { Badge, Button, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { planoService } from "../../services";

const views = ["Dia", "Semana", "Mes", "Agenda", "Cronograma"];
const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const dayKeyByIndex = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
const dayNameToIndex = { domingo: 0, segunda: 1, terca: 2, terça: 2, quarta: 3, quinta: 4, sexta: 5, sabado: 6, sábado: 6 };
const typeOptions = ["Estudo", "Revisao", "Questoes", "Simulado", "Descanso"];
const statusOptions = ["Pendente", "Em andamento", "Concluida", "Reagendada"];
const contestOptions = ["PRF", "PM", "PF", "TJ", "Geral"];

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

function normalizeDayName(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function inferType(title = "", materia = "") {
  const text = `${title} ${materia}`.toLowerCase();
  if (text.includes("simulado")) return "Simulado";
  if (text.includes("quest")) return "Questoes";
  if (text.includes("revis")) return "Revisao";
  if (text.includes("descanso")) return "Descanso";
  return "Estudo";
}

function typeTone(type) {
  const tones = {
    Estudo: "bg-emerald-500",
    Revisao: "bg-violet-500",
    Questoes: "bg-amber-500",
    Simulado: "bg-orange-500",
    Descanso: "bg-slate-400",
  };
  return tones[type] || "bg-blue-500";
}

function typeBadge(type) {
  if (type === "Simulado" || type === "Questoes") return "warning";
  if (type === "Revisao") return "neutral";
  if (type === "Descanso") return "neutral";
  return "success";
}

function buildMonthGrid(currentMonth) {
  const first = startOfMonth(currentMonth);
  const start = addDays(first, -first.getDay());
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

function buildActivities(plano = [], monthDate, extraActivities = []) {
  const monthGrid = buildMonthGrid(monthDate);
  const sourceByDay = new Map();
  plano.forEach((day) => {
    sourceByDay.set(normalizeDayName(day.dia), day);
  });

  const activities = [];
  monthGrid.forEach((date) => {
    const dayKey = dayKeyByIndex[date.getDay()];
    const source = sourceByDay.get(dayKey);
    if (!source) return;
    const tasks = source.tarefas || [];
    const blocks = source.blocos || [];
    tasks.forEach((task, index) => {
      const block = blocks[index] || blocks[0] || {};
      const type = inferType(task.titulo, block.materia);
      activities.push({
        id: `${task.id}-${isoDate(date)}`,
        sourceId: task.id,
        date: isoDate(date),
        hour: block.hora || "08:00",
        title: task.titulo || block.materia || "Atividade do plano",
        materia: block.materia || task.materia || "Geral",
        type,
        duration: task.minutos || block.duracao || 60,
        status: task.done ? "Concluida" : "Pendente",
        concurso: "PRF",
      });
    });
  });

  return [...activities, ...extraActivities].sort((a, b) => `${a.date}-${a.hour}`.localeCompare(`${b.date}-${b.hour}`));
}

function applyFilters(activities, filters) {
  return activities.filter((item) => {
    if (filters.materia && item.materia !== filters.materia) return false;
    if (filters.tipo && item.type !== filters.tipo) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.concurso && item.concurso !== filters.concurso) return false;
    if (filters.periodo === "semana") {
      const now = new Date();
      const start = addDays(now, -now.getDay());
      const end = addDays(start, 6);
      const current = new Date(item.date);
      if (current < start || current > end) return false;
    }
    if (filters.periodo === "mes" && item.date.slice(0, 7) !== isoDate(new Date()).slice(0, 7)) return false;
    return true;
  });
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function ActivityRow({ activity, onStatus }) {
  return (
    <div className="grid gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 md:grid-cols-[86px_1fr_120px_92px_40px] md:items-center">
      <div className="text-sm font-semibold text-slate-700">
        <span className="block">{activity.hour}</span>
        <span className="text-xs font-normal text-slate-400">{activity.duration} min</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cx("size-2 rounded-full", typeTone(activity.type))} />
          <h3 className="truncate font-bold text-slate-950">{activity.title}</h3>
        </div>
        <p className="mt-1 text-sm text-slate-500">{activity.materia} · {activity.concurso}</p>
      </div>
      <Badge variant={typeBadge(activity.type)}>{activity.type}</Badge>
      <span className={cx("rounded-full px-2 py-1 text-xs font-bold", activity.status === "Concluida" ? "bg-emerald-50 text-emerald-700" : activity.status === "Em andamento" ? "bg-blue-50 text-blue-700" : activity.status === "Reagendada" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600")}>{activity.status}</span>
      <div className="flex gap-1">
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={() => onStatus(activity.id, activity.status === "Concluida" ? "Reagendada" : "Concluida")} type="button">
          {activity.status === "Concluida" ? <RotateCcw size={16} /> : <CheckCircle2 size={16} />}
        </button>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={() => onStatus(activity.id, activity.status === "Em andamento" ? "Pendente" : "Em andamento")} type="button"><MoreVertical size={16} /></button>
      </div>
    </div>
  );
}

function MiniBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-500"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={cx("h-full rounded-full", color)} style={{ width: `${Math.min(100, value)}%` }} /></div>
    </div>
  );
}

export default function PlanoPage() {
  const load = useCallback(() => planoService.getPlano(), []);
  const { data = [] } = useAsyncData(load);
  const plano = data || [];
  const now = new Date();
  const [view, setView] = useState("Mes");
  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(isoDate(now));
  const [filters, setFilters] = useState({ materia: "", tipo: "", status: "", concurso: "", periodo: "" });
  const [localStatus, setLocalStatus] = useState(() => readStorage("aprova-plano-status", {}));
  const [extraActivities, setExtraActivities] = useState(() => readStorage("aprova-plano-atividades", []));
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState({ title: "", materia: "", type: "Estudo", hour: "08:00", duration: 60, concurso: "PRF", status: "Pendente" });

  const baseActivities = useMemo(() => buildActivities(plano, month, extraActivities), [extraActivities, month, plano]);
  const activities = useMemo(() => baseActivities.map((item) => ({ ...item, status: localStatus[item.id] || item.status })), [baseActivities, localStatus]);
  const filteredActivities = useMemo(() => applyFilters(activities, filters), [activities, filters]);
  const monthDays = useMemo(() => buildMonthGrid(month), [month]);
  const selectedActivities = useMemo(() => filteredActivities.filter((item) => item.date === selectedDate), [filteredActivities, selectedDate]);
  const materias = useMemo(() => [...new Set(activities.map((item) => item.materia).filter(Boolean))], [activities]);
  const weekActivities = useMemo(() => {
    const selected = new Date(selectedDate);
    const start = addDays(selected, -selected.getDay());
    const end = addDays(start, 6);
    return filteredActivities.filter((item) => {
      const current = new Date(item.date);
      return current >= start && current <= end;
    });
  }, [filteredActivities, selectedDate]);

  const viewActivities = useMemo(() => {
    if (view === "Dia") return selectedActivities;
    if (view === "Semana") return weekActivities;
    if (view === "Agenda") return filteredActivities.slice(0, 18);
    if (view === "Cronograma") return filteredActivities.filter((item) => item.status !== "Concluida").slice(0, 18);
    return selectedActivities;
  }, [filteredActivities, selectedActivities, view, weekActivities]);

  const completed = activities.filter((item) => item.status === "Concluida");
  const weeklyGoal = 30 * 60;
  const studiedMinutes = completed.reduce((sum, item) => sum + item.duration, 0);
  const weeklyMinutes = weekActivities.reduce((sum, item) => sum + item.duration, 0);
  const progress = weeklyMinutes ? Math.round((weekActivities.filter((item) => item.status === "Concluida").reduce((sum, item) => sum + item.duration, 0) / weeklyMinutes) * 100) : 0;
  const remaining = Math.max(0, weeklyGoal - studiedMinutes);
  const focus = [...new Set(weekActivities.map((item) => item.materia))].slice(0, 4);
  const distribution = typeOptions.map((type) => ({ type, value: weekActivities.filter((item) => item.type === type).length }));

  useEffect(() => {
    localStorage.setItem("aprova-plano-status", JSON.stringify(localStatus));
  }, [localStatus]);

  useEffect(() => {
    localStorage.setItem("aprova-plano-atividades", JSON.stringify(extraActivities));
  }, [extraActivities]);

  const updateActivityStatus = useCallback((id, status) => setLocalStatus((current) => ({ ...current, [id]: status })), []);
  const goToday = useCallback(() => {
    const current = new Date();
    setMonth(new Date(current.getFullYear(), current.getMonth(), 1));
    setSelectedDate(isoDate(current));
  }, []);
  const createActivity = useCallback(() => {
    setExtraActivities((current) => [{
      id: `local-${Date.now()}`,
      date: selectedDate,
      hour: draft.hour,
      title: draft.title || "Nova atividade",
      materia: draft.materia || "Geral",
      type: draft.type,
      duration: Number(draft.duration || 60),
      status: draft.status,
      concurso: draft.concurso,
    }, ...current]);
    setModal(false);
    setDraft({ title: "", materia: "", type: "Estudo", hour: "08:00", duration: 60, concurso: "PRF", status: "Pendente" });
  }, [draft, selectedDate]);

  return (
    <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-[1500px] overflow-visible pb-10 text-slate-900">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg border border-blue-100 bg-white text-blue-600 shadow-sm"><CalendarDays size={22} /></span>
          <div>
            <h1 className="text-3xl font-black text-white md:text-slate-950">Plano de Estudos</h1>
            <p className="mt-1 text-sm text-slate-500">Calendario inteligente com atividades reais do seu plano semanal.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={goToday}>Hoje</Button>
          <Button icon={Plus} onClick={() => setModal(true)}>Nova atividade</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-5">
        <Select label="Materia" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
        <Select label="Tipo" placeholder="Todos" options={typeOptions} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
        <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
        <Select label="Concurso" placeholder="Todos" options={contestOptions} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
        <Select label="Periodo" placeholder="Livre" options={[{ value: "semana", label: "Semana atual" }, { value: "mes", label: "Mes atual" }]} value={filters.periodo} onChange={(event) => setFilters((current) => ({ ...current, periodo: event.target.value }))} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {views.map((item) => (
          <button key={item} onClick={() => setView(item)} className={cx("min-h-10 rounded-lg border px-5 text-sm font-semibold transition", view === item ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-blue-100 bg-white text-slate-600 hover:border-blue-300")}>{item}</button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <main className="space-y-4">
          <section className="rounded-lg border border-blue-100 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))} type="button"><ChevronLeft size={18} /></button>
                <h2 className="min-w-44 text-xl font-black capitalize text-slate-950">{formatDate(month, { month: "long", year: "numeric" })}</h2>
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))} type="button"><ChevronRight size={18} /></button>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"><Filter size={15} /> Filtros ativos</span>
            </div>

            {view === "Mes" ? (
              <div className="overflow-x-auto">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-7 border-b border-slate-100">
                    {weekDays.map((day) => <div key={day} className="px-3 py-3 text-center text-xs font-black text-slate-500">{day}</div>)}
                  </div>
                  <div className="grid grid-cols-7">
                    {monthDays.map((date) => {
                      const dateKey = isoDate(date);
                      const dayActivities = filteredActivities.filter((item) => item.date === dateKey);
                      const selected = selectedDate === dateKey;
                      const inMonth = date.getMonth() === month.getMonth();
                      return (
                        <button key={dateKey} type="button" onClick={() => setSelectedDate(dateKey)} className={cx("min-h-28 border-b border-r border-slate-100 p-3 text-left transition hover:bg-blue-50/50", selected && "bg-blue-50 ring-2 ring-inset ring-blue-500", !inMonth && "bg-slate-50 text-slate-400")}>
                          <span className={cx("grid size-8 place-items-center rounded-full text-sm font-bold", selected ? "bg-blue-600 text-white" : "text-slate-700")}>{date.getDate()}</span>
                          <div className="mt-4 flex flex-wrap gap-1">
                            {typeOptions.map((type) => dayActivities.some((item) => item.type === type) ? <span key={type} className={cx("size-2 rounded-full", typeTone(type))} title={type} /> : null)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap gap-4 p-4 text-xs text-slate-500">
                    {typeOptions.map((type) => <span key={type} className="inline-flex items-center gap-2"><i className={cx("size-2 rounded-full", typeTone(type))} />{type}</span>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className={cx("grid gap-3", view === "Dia" ? "grid-cols-1" : "md:grid-cols-2 xl:grid-cols-3")}>
                  {viewActivities.map((item) => (
                    <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-2"><Badge variant={typeBadge(item.type)}>{item.type}</Badge><span className="text-xs font-semibold text-slate-500">{item.date}</span></div>
                      <h3 className="mt-3 font-black text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.hour} · {item.materia} · {item.duration} min</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-blue-100 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
              <div>
                <h2 className="font-black text-slate-950">{formatDate(new Date(selectedDate), { weekday: "long", day: "2-digit", month: "long" })}</h2>
                <p className="text-sm text-slate-500">Atividades do dia selecionado</p>
              </div>
              <Button size="sm" variant="ghost" icon={Plus} onClick={() => setModal(true)}>Adicionar atividade</Button>
            </div>
            {selectedActivities.length ? selectedActivities.map((activity) => <ActivityRow key={activity.id} activity={activity} onStatus={updateActivityStatus} />) : <div className="p-8 text-center text-sm text-slate-500">Nenhuma atividade para este dia com os filtros atuais.</div>}
          </section>

          <section className="grid gap-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm md:grid-cols-5">
            {[
              ["Meta semanal", "30h"],
              ["Horas estudadas", `${Math.floor(studiedMinutes / 60)}h ${studiedMinutes % 60}m`],
              ["Horas restantes", `${Math.floor(remaining / 60)}h ${remaining % 60}m`],
              ["Produtividade", `${Math.min(100, progress + 12)}%`],
              ["Concluidas", String(completed.length)],
            ].map(([label, value]) => <div key={label} className="text-center"><strong className="block text-xl text-blue-600">{value}</strong><span className="text-xs text-slate-500">{label}</span></div>)}
          </section>
        </main>

        <aside className="space-y-4">
          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="font-black text-slate-950">Progresso semanal</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid size-24 place-items-center rounded-full border-[10px] border-blue-600 text-xl font-black text-slate-950">{progress}%</div>
              <div className="text-sm text-slate-500">
                <p>Meta: 30h</p>
                <p>Estudado: {Math.floor(studiedMinutes / 60)}h {studiedMinutes % 60}m</p>
                <p>Faltam: {Math.floor(remaining / 60)}h {remaining % 60}m</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-black text-slate-950">Distribuicao da semana</h2>
            <div className="space-y-3">
              {distribution.map((item) => <MiniBar key={item.type} label={item.type} value={weekActivities.length ? Math.round((item.value / weekActivities.length) * 100) : 0} color={typeTone(item.type)} />)}
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-black text-slate-950">Proximas atividades</h2>
            <div className="space-y-3">
              {filteredActivities.filter((item) => item.date >= isoDate(now)).slice(0, 4).map((item) => (
                <div key={item.id} className="flex gap-3 rounded-lg bg-slate-50 p-3">
                  <span className={cx("mt-1 size-2 shrink-0 rounded-full", typeTone(item.type))} />
                  <div><strong className="block text-sm text-slate-950">{item.title}</strong><span className="text-xs text-slate-500">{item.date} · {item.hour}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2"><TrendingUp className="text-blue-600" size={18} /><h2 className="font-black text-slate-950">Sequencia de estudos</h2></div>
            <strong className="text-3xl text-slate-950">12</strong>
            <span className="ml-2 text-sm text-slate-500">dias seguidos</span>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2"><Target className="text-blue-600" size={18} /><h2 className="font-black text-slate-950">Materias em foco</h2></div>
            <div className="flex flex-wrap gap-2">{focus.map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{item}</span>)}</div>
          </section>
        </aside>
      </div>

      <Modal open={modal} title="Nova atividade" onClose={() => setModal(false)} footer={<Button onClick={createActivity}>Salvar atividade</Button>}>
        <div className="grid gap-3">
          <Input label="Titulo" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Materia" value={draft.materia} onChange={(event) => setDraft((current) => ({ ...current, materia: event.target.value }))} />
            <Select label="Tipo" options={typeOptions} value={draft.type} onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value }))} />
            <Input label="Horario" type="time" value={draft.hour} onChange={(event) => setDraft((current) => ({ ...current, hour: event.target.value }))} />
            <Input label="Duracao" type="number" value={draft.duration} onChange={(event) => setDraft((current) => ({ ...current, duration: event.target.value }))} />
            <Select label="Concurso" options={contestOptions} value={draft.concurso} onChange={(event) => setDraft((current) => ({ ...current, concurso: event.target.value }))} />
            <Select label="Status" options={statusOptions} value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

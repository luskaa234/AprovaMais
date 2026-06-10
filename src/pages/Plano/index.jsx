import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, Filter, PauseCircle, PlayCircle, Plus, RotateCcw, Target, TrendingUp } from "lucide-react";
import { Badge, Button, Input, Mascot, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { planoService } from "../../services";

const views = ["Dia", "Semana", "Mes", "Agenda", "Cronograma"];
const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const dayKeyByIndex = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
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
    Estudo: "bg-blue-600",
    Revisao: "bg-blue-400",
    Questoes: "bg-sky-500",
    Simulado: "bg-blue-800",
    Descanso: "bg-slate-400",
  };
  return tones[type] || "bg-blue-500";
}

function typeBadge(type) {
  if (type === "Simulado" || type === "Questoes") return "info";
  if (type === "Revisao") return "neutral";
  if (type === "Descanso") return "neutral";
  return "info";
}

function statusTone(status) {
  const tones = {
    Concluida: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Em andamento": "border-blue-200 bg-blue-50 text-blue-700",
    Reagendada: "border-amber-200 bg-amber-50 text-amber-700",
    Pendente: "border-slate-200 bg-slate-100 text-slate-600",
  };
  return tones[status] || tones.Pendente;
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

function elapsedSeconds(timer = {}, nowMs = Date.now()) {
  const saved = Number(timer.elapsedSeconds || 0);
  if (!timer.startedAt) return saved;
  return saved + Math.max(0, Math.floor((nowMs - Number(timer.startedAt)) / 1000));
}

function formatElapsed(totalSeconds = 0) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return [hours, minutes, rest].map((part) => String(part).padStart(2, "0")).join(":");
}

function ActivityRow({ activity, onStatus }) {
  const isDone = activity.status === "Concluida";
  const isRunning = activity.status === "Em andamento";
  const timerProgress = Math.min(100, Math.round((activity.elapsedSeconds / Math.max(1, activity.duration * 60)) * 100));

  return (
    <div className={cx("relative overflow-hidden rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md", isDone ? "border-emerald-100" : "border-slate-100 hover:border-blue-200")}>
      <span className={cx("absolute left-0 top-0 h-full w-1", typeTone(activity.type))} />
      <div className="grid gap-3 pl-2 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center">
        <div className={cx("rounded-lg border px-3 py-2", isDone ? "border-emerald-100 bg-emerald-50 text-emerald-800" : "border-blue-100 bg-blue-50 text-blue-800")}>
          <span className="block text-xl font-black leading-none">{activity.hour}</span>
          <span className={cx("mt-1 flex items-center gap-1 text-xs font-semibold", isDone ? "text-emerald-600" : "text-blue-500")}><Clock size={13} />{activity.duration} min</span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cx("size-2.5 shrink-0 rounded-full", typeTone(activity.type))} />
            <h3 className="truncate text-base font-black text-slate-950">{activity.title}</h3>
          </div>
          <p className="mt-1 text-sm text-slate-500">{activity.materia} - {activity.concurso}</p>
          <div className="mt-3 max-w-sm">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className={cx("font-black", isRunning ? "text-blue-700" : activity.elapsedSeconds ? "text-slate-600" : "text-slate-400")}>
                Cronometro {formatElapsed(activity.elapsedSeconds)}
              </span>
              {isRunning ? <span className="rounded-full bg-blue-100 px-2 py-0.5 font-bold text-blue-700">rodando</span> : null}
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className={cx("h-full rounded-full transition-all", isDone ? "bg-emerald-500" : isRunning ? "bg-blue-600" : "bg-slate-300")} style={{ width: `${timerProgress}%` }} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 md:hidden">
            <Badge variant={typeBadge(activity.type)}>{activity.type}</Badge>
            <span className={cx("inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-bold", statusTone(activity.status))}>{activity.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <Badge variant={typeBadge(activity.type)}>{activity.type}</Badge>
            <span className={cx("inline-flex min-h-8 min-w-28 items-center justify-center rounded-full border px-3 text-xs font-bold", statusTone(activity.status))}>{activity.status}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={cx("inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition", isRunning ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" : "border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100")} onClick={() => onStatus(activity.id, isRunning ? "Pendente" : "Em andamento")} type="button">
              {isRunning ? <PauseCircle size={15} /> : <PlayCircle size={15} />}
              {isRunning ? "Pausar" : "Iniciar"}
            </button>
            <button className={cx("inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition", isDone ? "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100" : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100")} onClick={() => onStatus(activity.id, isDone ? "Reagendada" : "Concluida")} type="button">
              {isDone ? <RotateCcw size={15} /> : <CheckCircle2 size={15} />}
              {isDone ? "Reabrir" : "Concluir"}
            </button>
          </div>
        </div>
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
  const { data: plano = [] } = useAsyncData(load);
  const now = new Date();
  const [view, setView] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? "Agenda" : "Mes"));
  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(isoDate(now));
  const [filters, setFilters] = useState({ materia: "", tipo: "", status: "", concurso: "", periodo: "" });
  const [localStatus, setLocalStatus] = useState(() => readStorage("aprova-plano-status", {}));
  const [timers, setTimers] = useState(() => readStorage("aprova-plano-timers", {}));
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [extraActivities, setExtraActivities] = useState(() => readStorage("aprova-plano-atividades", []));
  const [modal, setModal] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", materia: "", type: "Estudo", hour: "08:00", duration: 60, concurso: "PRF", status: "Pendente" });

  const baseActivities = useMemo(() => buildActivities(plano, month, extraActivities), [extraActivities, month, plano]);
  const activities = useMemo(() => baseActivities.map((item) => {
    const timer = timers[item.id] || {};
    return {
      ...item,
      status: localStatus[item.id] || item.status,
      elapsedSeconds: elapsedSeconds(timer, nowMs),
      timerStartedAt: timer.startedAt || null,
    };
  }), [baseActivities, localStatus, nowMs, timers]);
  const filteredActivities = useMemo(() => applyFilters(activities, filters), [activities, filters]);
  const monthDays = useMemo(() => buildMonthGrid(month), [month]);
  const selectedActivities = useMemo(() => filteredActivities.filter((item) => item.date === selectedDate), [filteredActivities, selectedDate]);
  const selectedMinutes = selectedActivities.reduce((sum, item) => sum + item.duration, 0);
  const selectedDone = selectedActivities.filter((item) => item.status === "Concluida").length;
  const selectedProgress = selectedActivities.length ? Math.round((selectedDone / selectedActivities.length) * 100) : 0;
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
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <Select label="Materia" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
      <Select label="Tipo" placeholder="Todos" options={typeOptions} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
      <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
      <Select label="Concurso" placeholder="Todos" options={contestOptions} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
      <Select label="Periodo" placeholder="Livre" options={[{ value: "semana", label: "Semana atual" }, { value: "mes", label: "Mes atual" }]} value={filters.periodo} onChange={(event) => setFilters((current) => ({ ...current, periodo: event.target.value }))} />
    </div>
  );

  useEffect(() => {
    localStorage.setItem("aprova-plano-status", JSON.stringify(localStatus));
  }, [localStatus]);

  useEffect(() => {
    localStorage.setItem("aprova-plano-timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    if (!Object.values(timers).some((timer) => timer?.startedAt)) return undefined;
    const interval = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("aprova-plano-atividades", JSON.stringify(extraActivities));
  }, [extraActivities]);

  const updateActivityStatus = useCallback((id, status) => {
    const now = Date.now();
    setTimers((current) => {
      const timer = current[id] || { elapsedSeconds: 0, startedAt: null };
      const elapsed = elapsedSeconds(timer, now);

      if (status === "Em andamento") {
        return { ...current, [id]: { elapsedSeconds: elapsed, startedAt: timer.startedAt || now } };
      }

      if (status === "Pendente" || status === "Concluida" || status === "Reagendada") {
        return { ...current, [id]: { elapsedSeconds: elapsed, startedAt: null } };
      }

      return current;
    });
    setLocalStatus((current) => ({ ...current, [id]: status }));
    setNowMs(now);
  }, []);
  const goToday = useCallback(() => {
    const current = new Date();
    setMonth(new Date(current.getFullYear(), current.getMonth(), 1));
    setSelectedDate(isoDate(current));
  }, []);
  const createActivity = () => {
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
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-[1500px] overflow-visible pb-10 text-slate-900">
      <div className="mb-5 flex flex-col gap-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg border border-blue-100 bg-white text-blue-600 shadow-sm"><CalendarDays size={22} /></span>
          <div>
            <h1 className="text-3xl font-black text-slate-950">Plano de Estudos</h1>
            <p className="mt-1 text-sm text-slate-500">Calendario inteligente com atividades reais do seu plano semanal.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 md:flex">
            <Mascot size="sm" pose="motivacao" framed={false} />
            {progress}% da semana
          </div>
          <div className="flex flex-wrap gap-2">
          <Button className="md:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{activeFilterCount ? ` · ${activeFilterCount}` : ""}</Button>
          <Button variant="secondary" onClick={goToday}>Hoje</Button>
          <Button icon={Plus} onClick={() => setModal(true)}>Nova atividade</Button>
          </div>
        </div>
      </div>

      <div className="mb-4 hidden gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm md:grid">
        {filtersContent}
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

          <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
            <div className="border-b border-blue-100 bg-gradient-to-r from-slate-50 to-blue-50/70 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-black capitalize text-slate-950">{formatDate(new Date(selectedDate), { weekday: "long", day: "2-digit", month: "long" })}</h2>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-500">
                    <span>{selectedActivities.length} atividade{selectedActivities.length === 1 ? "" : "s"}</span>
                    <span className="text-slate-300">|</span>
                    <span>{Math.floor(selectedMinutes / 60)}h {selectedMinutes % 60}min planejados</span>
                    <span className="text-slate-300">|</span>
                    <span>{selectedDone} concluida{selectedDone === 1 ? "" : "s"}</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" icon={Plus} onClick={() => setModal(true)}>Adicionar atividade</Button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="h-2 overflow-hidden rounded-full bg-white ring-1 ring-blue-100">
                  <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${selectedProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-blue-700">{selectedProgress}% do dia concluido</span>
              </div>
            </div>
            {selectedActivities.length ? (
              <div className="grid gap-3 bg-slate-50/60 p-3">
                {selectedActivities.map((activity) => <ActivityRow key={activity.id} activity={activity} onStatus={updateActivityStatus} />)}
              </div>
            ) : (
              <div className="grid place-items-center gap-2 p-8 text-center text-sm text-slate-500">
                <Mascot size="lg" pose="feedback" framed={false} />
                Nenhuma atividade para este dia com os filtros atuais.
              </div>
            )}
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
      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>
    </div>
  );
}

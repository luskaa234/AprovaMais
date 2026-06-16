import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, Edit3, ExternalLink, Filter, PauseCircle, PlayCircle, Plus, RotateCcw, Target, Trash2, TrendingUp } from "lucide-react";
import { Badge, Button, Input, Select, cx } from "../../components";
import { useInternalRouter, useNotifications, useUser } from "../../contexts";
import { Modal } from "../../modals";
import { planoService } from "../../services";

const views = ["Dia", "Semana", "Mês", "Agenda"];
const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const dayKeyByIndex = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
const typeOptions = ["Questões", "Revisão", "Leitura", "Flashcards", "TAF", "Simulado"];
const statusOptions = ["Pendente", "Em andamento", "Concluida", "Reagendada"];
const contestOptions = ["Geral", "PM", "CBM", "OAB", "PRF", "PF", "TJ"];
const planDayOptions = [
  ["segunda", "Seg"],
  ["terca", "Ter"],
  ["quarta", "Qua"],
  ["quinta", "Qui"],
  ["sexta", "Sex"],
  ["sabado", "Sab"],
  ["domingo", "Dom"],
];

function defaultPlanPrefs(user = {}) {
  return {
    weeklyHours: Number(user.horasSemanais || user.diagnosticPlan?.weeklyHours || 18),
    dailyStart: user.preferredStart || "08:00",
    sessionLength: 60,
    focusSubject: "",
    examDate: user.dataProva || user.examDate || "",
    includeTaf: true,
    availableDays: ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"],
  };
}

function readPlanPrefs(user = {}) {
  const fallback = defaultPlanPrefs(user);
  try {
    const stored = JSON.parse(localStorage.getItem("aprova-plano-preferencias") || "null");
    return stored ? { ...fallback, ...stored } : fallback;
  } catch {
    return fallback;
  }
}

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
  if (text.includes("taf")) return "TAF";
  if (text.includes("flash")) return "Flashcards";
  if (text.includes("lei") || text.includes("leitura")) return "Leitura";
  if (text.includes("quest")) return "Questões";
  if (text.includes("revis")) return "Revisão";
  return "Questões";
}

function typeTone(type) {
  const tones = {
    Estudo: "bg-blue-600",
    Revisão: "bg-blue-400",
    Questões: "bg-sky-500",
    Leitura: "bg-indigo-500",
    Flashcards: "bg-cyan-500",
    TAF: "bg-emerald-500",
    Simulado: "bg-blue-800",
    Descanso: "bg-slate-400",
  };
  return tones[type] || "bg-blue-500";
}

function typeBadge(type) {
  if (type === "Simulado" || type === "Questões" || type === "TAF") return "info";
  if (type === "Revisão" || type === "Leitura" || type === "Flashcards") return "neutral";
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
        concurso: block.concurso || task.concurso || "Geral",
      });
    });
  });

  return [...activities, ...extraActivities].sort((a, b) => `${a.date}-${a.hour}`.localeCompare(`${b.date}-${b.hour}`));
}

function applyFilters(activities, filters, viewedMonth) {
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
    if (filters.periodo === "mes" && item.date.slice(0, 7) !== isoDate(viewedMonth || new Date()).slice(0, 7)) return false;
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

function ActivityRow({ activity, onStatus, onOpen, onEdit, onDelete }) {
  const isDone = activity.status === "Concluida";
  const isRunning = activity.status === "Em andamento";
  const timerProgress = Math.min(100, Math.round((activity.elapsedSeconds / Math.max(1, activity.duration * 60)) * 100));

  return (
    <div data-generated={activity.generated ? "true" : undefined} className={cx("relative overflow-hidden rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md", isDone ? "border-emerald-100" : "border-slate-100 hover:border-blue-200")}>
      <span className={cx("absolute left-0 top-0 h-full w-1", typeTone(activity.type))} />
      <div className="grid gap-3 pl-2 md:grid-cols-[auto_96px_minmax(0,1fr)_auto] md:items-center">
        <button
          aria-label={isDone ? "Marcar como pendente" : "Marcar como concluida"}
          className={cx("grid size-10 place-items-center rounded-lg border transition", isDone ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-blue-100 bg-white text-slate-400 hover:text-blue-700")}
          onClick={() => onStatus(activity.id, isDone ? "Pendente" : "Concluida")}
          type="button"
        >
          <CheckCircle2 size={20} />
        </button>
        <div className={cx("rounded-lg border px-3 py-2", isDone ? "border-emerald-100 bg-emerald-50 text-emerald-800" : "border-blue-100 bg-blue-50 text-blue-800")}>
          <span className="block text-xl font-black leading-none">{activity.hour}</span>
          <span className={cx("mt-1 flex items-center gap-1 text-xs font-semibold", isDone ? "text-emerald-600" : "text-blue-500")}><Clock size={13} />{activity.duration} min</span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cx("size-2.5 shrink-0 rounded-full", typeTone(activity.type))} />
            <button className="min-w-0 text-left" onClick={() => onOpen(activity)} type="button">
              <h3 className="truncate text-base font-black text-slate-950">{activity.title}</h3>
            </button>
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
          <div className="mt-3 flex flex-wrap gap-2 xl:hidden">
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
            <button className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-3 text-xs font-bold text-blue-700 transition hover:bg-blue-50" onClick={() => onOpen(activity)} type="button">
              <ExternalLink size={15} />
              Abrir
            </button>
            <button className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50" onClick={() => onEdit(activity)} type="button">
              <Edit3 size={15} />
              Editar
            </button>
            <button className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-600 transition hover:bg-red-100" onClick={() => onDelete(activity.id)} type="button">
              <Trash2 size={15} />
              Excluir
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
  const { user } = useUser();
  const { navigate } = useInternalRouter();
  const { addNotification } = useNotifications();
  const now = new Date();
  const [planPrefs, setPlanPrefs] = useState(() => readPlanPrefs(user));
  const [view, setView] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? "Agenda" : "Mês"));
  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(isoDate(now));
  const [filters, setFilters] = useState({ materia: "", tipo: "", status: "", concurso: "", periodo: "" });
  const [timers, setTimers] = useState(() => readStorage("aprova-plano-timers", {}));
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [planActivities, setPlanActivities] = useState([]);
  const [smartPlanGenerated, setSmartPlanGenerated] = useState(() => readStorage("aprova-plano-inteligente-gerado", false));
  const [modal, setModal] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [draft, setDraft] = useState({ title: "", materia: "", type: "Questões", date: isoDate(now), hour: "08:00", duration: 60, concurso: user?.targetContest || "Geral", status: "Pendente" });

  const baseActivities = useMemo(() => buildActivities([], month, planActivities), [month, planActivities]);
  const activities = useMemo(() => baseActivities.map((item) => {
    const timer = timers[item.id] || {};
    return {
      ...item,
      elapsedSeconds: elapsedSeconds(timer, nowMs),
      timerStartedAt: timer.startedAt || null,
    };
  }), [baseActivities, nowMs, timers]);
  const filteredActivities = useMemo(() => applyFilters(activities, filters, month), [activities, filters, month]);
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
    return selectedActivities;
  }, [filteredActivities, selectedActivities, view, weekActivities]);

  const completed = activities.filter((item) => item.status === "Concluida");
  const weeklyGoal = Math.max(1, Number(planPrefs.weeklyHours || 18)) * 60;
  const studiedMinutes = completed.reduce((sum, item) => sum + item.duration, 0);
  const weeklyMinutes = weekActivities.reduce((sum, item) => sum + item.duration, 0);
  const progress = weeklyMinutes ? Math.round((weekActivities.filter((item) => item.status === "Concluida").reduce((sum, item) => sum + item.duration, 0) / weeklyMinutes) * 100) : 0;
  const remaining = Math.max(0, weeklyGoal - studiedMinutes);
  const focus = [...new Set(weekActivities.map((item) => item.materia))].slice(0, 4);
  const distribution = typeOptions.map((type) => ({ type, value: weekActivities.filter((item) => item.type === type).length }));
  const studyStreak = useMemo(() => {
    const dates = new Set(completed.map((item) => item.date).filter(Boolean));
    let streak = 0;
    const cursor = new Date();
    while (dates.has(isoDate(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }, [completed]);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const updatePlanPref = useCallback((key, value) => {
    setPlanPrefs((current) => ({ ...current, [key]: value }));
  }, []);
  const togglePlanDay = useCallback((day) => {
    setPlanPrefs((current) => {
      const days = new Set(current.availableDays || []);
      if (days.has(day)) days.delete(day);
      else days.add(day);
      return { ...current, availableDays: [...days] };
    });
  }, []);
  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <Select label="Matéria" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
      <Select label="Tipo" placeholder="Todos" options={typeOptions} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
      <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
      <Select label="Concurso" placeholder="Todos" options={contestOptions} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
      <Select label="Periodo" placeholder="Livre" options={[{ value: "semana", label: "Semana atual" }, { value: "mes", label: "Mes atual" }]} value={filters.periodo} onChange={(event) => setFilters((current) => ({ ...current, periodo: event.target.value }))} />
    </div>
  );

  useEffect(() => {
    let active = true;
    planoService.getAtividades().then((items) => {
      if (active) {
        setPlanActivities(items);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("aprova-plano-timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("aprova-plano-preferencias", JSON.stringify(planPrefs));
  }, [planPrefs]);

  useEffect(() => {
    if (!Object.values(timers).some((timer) => timer?.startedAt)) return undefined;
    const interval = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("aprova-plano-inteligente-gerado", JSON.stringify(smartPlanGenerated));
  }, [smartPlanGenerated]);

  const updateActivityStatus = useCallback(async (id, status) => {
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
    setPlanActivities((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setNowMs(now);
    await planoService.atualizarAtividade(id, { status }).catch(() => {
      addNotification({ type: "warning", title: "Plano salvo localmente", message: "Não foi possível salvar na nuvem agora. Tente novamente mais tarde." });
    });
  }, [addNotification]);
  const goToday = useCallback(() => {
    const current = new Date();
    setMonth(new Date(current.getFullYear(), current.getMonth(), 1));
    setSelectedDate(isoDate(current));
  }, []);
  const openNewActivity = useCallback(() => {
    setEditingId("");
    setDraft({ title: "", materia: "", type: "Questões", date: selectedDate, hour: "08:00", duration: 60, concurso: user?.targetContest || "Geral", status: "Pendente" });
    setModal(true);
  }, [selectedDate, setDraft, setEditingId, setModal, user?.targetContest]);
  const createActivity = async () => {
    const payload = {
      ...draft,
      date: draft.date || selectedDate,
      title: draft.title || `${draft.type} - ${draft.materia || "Geral"}`,
      materia: draft.materia || "Geral",
      duration: Number(draft.duration || 60),
    };
    if (editingId) {
      setPlanActivities((current) => current.map((item) => item.id === editingId ? { ...item, ...payload } : item));
      await planoService.atualizarAtividade(editingId, payload);
    } else {
      const created = await planoService.criarAtividade(payload);
      setPlanActivities((current) => [created, ...current.filter((item) => item.id !== created.id)]);
    }
    setModal(false);
    setEditingId("");
    setDraft({ title: "", materia: "", type: "Questões", date: selectedDate, hour: "08:00", duration: 60, concurso: user?.targetContest || "Geral", status: "Pendente" });
  };

  const gerarPlanoInteligente = useCallback(async ({ replace = false } = {}) => {
    const personalizedUser = {
      ...user,
      horasSemanais: Number(planPrefs.weeklyHours || user?.horasSemanais || 18),
      availableDays: planPrefs.availableDays?.length ? planPrefs.availableDays : undefined,
      preferredStart: planPrefs.dailyStart,
      sessionLength: Number(planPrefs.sessionLength || 60),
      dataProva: planPrefs.examDate || user?.dataProva,
      focusSubject: planPrefs.focusSubject,
      includeTaf: planPrefs.includeTaf,
    };
    const generated = await planoService.gerarSemanaInteligente({ user: personalizedUser, startDate: new Date(selectedDate) });
    const saved = await planoService.criarAtividadesEmLote(generated);
    setPlanActivities((current) => {
      const kept = replace ? current.filter((item) => !item.generated) : current;
      const existing = new Set(kept.map((item) => item.id));
      return [...saved.filter((item) => !existing.has(item.id)), ...kept];
    });
    setSmartPlanGenerated(true);
    addNotification({ type: "success", title: "Plano gerado", message: `${saved.length} atividades foram criadas no seu calendário.` });
  }, [addNotification, planPrefs, selectedDate, user]);

  const editActivity = useCallback((activity) => {
    setEditingId(activity.id);
    setDraft({
      title: activity.title || "",
      materia: activity.materia || "",
      type: activity.type || "Questões",
      date: activity.date || selectedDate,
      hour: activity.hour || "08:00",
      duration: activity.duration || 60,
      concurso: activity.concurso || user?.targetContest || "Geral",
      status: activity.status || "Pendente",
    });
    setModal(true);
  }, [selectedDate, setDraft, setEditingId, setModal, user]);

  const deleteActivity = useCallback(async (id) => {
    setPlanActivities((current) => current.filter((item) => item.id !== id));
    await planoService.removerAtividade(id);
    addNotification({ type: "success", title: "Atividade removida", message: "Seu plano foi atualizado." });
  }, [addNotification]);

  const openActivity = useCallback((activity) => {
    const type = String(activity.type || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (type.includes("quest")) {
      sessionStorage.setItem("aprova-questoes-artigo-filter", JSON.stringify({ materia: activity.materia, search: activity.materia }));
      navigate("questoes");
      return;
    }
    if (type.includes("revis")) return navigate("revisao");
    if (type.includes("taf")) return navigate("taf");
    if (type.includes("leitura")) return navigate("leis");
    if (type.includes("flash")) return navigate("flashcards");
    if (type.includes("simulado")) return navigate("simulados");
    navigate("dashboard");
  }, [navigate]);

  return (
    <div className="plano-page mx-auto min-h-[calc(100vh-9rem)] max-w-[1500px] overflow-visible pb-10 text-slate-900">
      <div className="plano-header mb-5 flex flex-col gap-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between" data-tour="tour-studies-header">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg border border-blue-100 bg-white text-blue-600 shadow-sm"><CalendarDays size={22} /></span>
          <div>
            <h1 className="text-3xl font-black text-slate-950">Plano de Estudos</h1>
            <p className="mt-1 text-sm text-slate-500">Calendario inteligente com atividades reais do seu plano semanal.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="hidden items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 xl:flex">{progress}% da semana</div>
          <div className="flex flex-wrap gap-2">
          <Button className="xl:hidden" data-tour="tour-studies-filters" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{activeFilterCount ? ` · ${activeFilterCount}` : ""}</Button>
          <Button className="whitespace-nowrap" variant="secondary" onClick={goToday}>Hoje</Button>
          <Button className="whitespace-nowrap" variant="secondary" icon={RotateCcw} onClick={() => gerarPlanoInteligente({ replace: true })}>Gerar</Button>
          <Button className="whitespace-nowrap" icon={Plus} onClick={openNewActivity}>Nova</Button>
          </div>
        </div>
      </div>

      <section className="plano-personalizacao mb-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm" data-tour="tour-studies-personalization">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-wide text-blue-600">Personalização ativa</span>
            <h2 className="mt-1 text-lg font-black text-slate-950">Seu calendário se adapta à sua rotina</h2>
            <p className="mt-1 text-sm text-slate-500">Altere os dados abaixo e toque em Gerar para recriar a semana com essas preferências.</p>
          </div>
          <Badge variant="success">Salvo automaticamente</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <Input label="Horas por semana" type="number" min="1" value={planPrefs.weeklyHours} onChange={(event) => updatePlanPref("weeklyHours", event.target.value)} />
          <Input label="Começar às" type="time" value={planPrefs.dailyStart} onChange={(event) => updatePlanPref("dailyStart", event.target.value)} />
          <Select label="Bloco de estudo" options={[45, 60, 75, 90, 120].map((value) => ({ value, label: `${value} min` }))} value={planPrefs.sessionLength} onChange={(event) => updatePlanPref("sessionLength", Number(event.target.value))} />
          <Input label="Matéria foco" placeholder="Ex: Constitucional" value={planPrefs.focusSubject} onChange={(event) => updatePlanPref("focusSubject", event.target.value)} />
          <Input label="Data da prova" type="date" value={planPrefs.examDate} onChange={(event) => updatePlanPref("examDate", event.target.value)} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {planDayOptions.map(([day, label]) => {
            const active = planPrefs.availableDays?.includes(day);
            return (
              <button
                key={day}
                className={cx("min-h-9 rounded-lg border px-3 text-xs font-black transition", active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-100 bg-white text-slate-600 hover:border-blue-300")}
                onClick={() => togglePlanDay(day)}
                type="button"
              >
                {label}
              </button>
            );
          })}
          <button
            className={cx("min-h-9 rounded-lg border px-3 text-xs font-black transition", planPrefs.includeTaf ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-500")}
            onClick={() => updatePlanPref("includeTaf", !planPrefs.includeTaf)}
            type="button"
          >
            {planPrefs.includeTaf ? "TAF incluído" : "Sem TAF"}
          </button>
        </div>
      </section>

      <div className="plano-desktop-filters mb-4 hidden gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm xl:grid" data-tour="tour-studies-filters">
        {filtersContent}
      </div>

      <div className="plano-view-tabs mb-4 flex flex-wrap gap-2">
        {views.map((item) => (
          <button key={item} onClick={() => setView(item)} className={cx("min-h-10 rounded-lg border px-5 text-sm font-semibold transition", view === item ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-blue-100 bg-white text-slate-600 hover:border-blue-300")}>{item}</button>
        ))}
      </div>

      <div className="plano-layout grid gap-4 xl:grid-cols-[1fr_360px]">
        <main className="plano-main space-y-4">
          <section className="plano-calendar rounded-lg border border-blue-100 bg-white shadow-sm" data-tour="tour-studies-calendar">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))} type="button"><ChevronLeft size={18} /></button>
                <h2 className="min-w-44 text-xl font-black capitalize text-slate-950">{formatDate(month, { month: "long", year: "numeric" })}</h2>
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" onClick={() => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))} type="button"><ChevronRight size={18} /></button>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"><Filter size={15} /> Filtros ativos</span>
            </div>

            {view === "Mês" ? (
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

          <section className="plano-activities overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm" data-tour="tour-studies-activities">
            <div className="border-b border-blue-100 bg-slate-50 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-black capitalize text-slate-950">{formatDate(new Date(selectedDate), { weekday: "long", day: "2-digit", month: "long" })}</h2>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-500">
                    <span>{selectedActivities.length} atividade{selectedActivities.length === 1 ? "" : "s"}</span>
                    <span className="text-slate-300">|</span>
                    <span>{Math.floor(selectedMinutes / 60)}h {selectedMinutes % 60}min planejados</span>
                    <span className="text-slate-300">|</span>
                    <span>{selectedDone} concluída{selectedDone === 1 ? "" : "s"}</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" icon={Plus} onClick={openNewActivity}>Adicionar atividade</Button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="h-2 overflow-hidden rounded-full bg-white ring-1 ring-blue-100">
                  <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${selectedProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-blue-700">{selectedProgress}% do dia concluído</span>
              </div>
            </div>
            {selectedActivities.length ? (
              <div className="grid gap-3 bg-slate-50/60 p-3">
                {selectedActivities.map((activity) => (
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                    onDelete={deleteActivity}
                    onEdit={editActivity}
                    onOpen={openActivity}
                    onStatus={updateActivityStatus}
                  />
                ))}
              </div>
            ) : (
              <div className="grid place-items-center gap-2 p-8 text-center text-sm text-slate-500">
                Nenhuma atividade para este dia com os filtros atuais.
              </div>
            )}
          </section>

          <section className="plano-stats grid gap-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm md:grid-cols-5">
            {[
              ["Meta semanal", `${Math.floor(weeklyGoal / 60)}h`],
              ["Horas estudadas", `${Math.floor(studiedMinutes / 60)}h ${studiedMinutes % 60}m`],
              ["Horas restantes", `${Math.floor(remaining / 60)}h ${remaining % 60}m`],
              ["Produtividade", `${progress}%`],
              ["Concluídas", String(completed.length)],
            ].map(([label, value]) => <div key={label} className="text-center"><strong className="block text-xl text-blue-600">{value}</strong><span className="text-xs text-slate-500">{label}</span></div>)}
          </section>
        </main>

        <aside className="plano-side-summary space-y-4" data-tour="tour-studies-progress">
          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="font-black text-slate-950">Progresso semanal</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid size-24 place-items-center rounded-full border-[10px] border-blue-600 text-xl font-black text-slate-950">{progress}%</div>
              <div className="text-sm text-slate-500">
                <p>Meta: {Math.floor(weeklyGoal / 60)}h</p>
                <p>Estudado: {Math.floor(studiedMinutes / 60)}h {studiedMinutes % 60}m</p>
                <p>Faltam: {Math.floor(remaining / 60)}h {remaining % 60}m</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-black text-slate-950">Distribuição da semana</h2>
            <div className="space-y-3">
              {distribution.map((item) => <MiniBar key={item.type} label={item.type} value={weekActivities.length ? Math.round((item.value / weekActivities.length) * 100) : 0} color={typeTone(item.type)} />)}
            </div>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 font-black text-slate-950">Próximas atividades</h2>
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
            <div className="mb-3 flex items-center gap-2"><TrendingUp className="text-blue-600" size={18} /><h2 className="font-black text-slate-950">Sequência de estudos</h2></div>
            <strong className="text-3xl text-slate-950">{studyStreak}</strong>
            <span className="ml-2 text-sm text-slate-500">dias seguidos</span>
          </section>

          <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2"><Target className="text-blue-600" size={18} /><h2 className="font-black text-slate-950">Matérias em foco</h2></div>
            <div className="flex flex-wrap gap-2">{focus.map((item) => <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{item}</span>)}</div>
          </section>
        </aside>
      </div>

      <Modal open={modal} title={editingId ? "Editar atividade" : "Nova atividade"} onClose={() => setModal(false)} footer={<Button onClick={createActivity}>Salvar atividade</Button>}>
        <div className="grid gap-3">
          <Input label="Título" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Matéria" value={draft.materia} onChange={(event) => setDraft((current) => ({ ...current, materia: event.target.value }))} />
            <Select label="Tipo" options={typeOptions} value={draft.type} onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value }))} />
            <Input label="Data" type="date" value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} />
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

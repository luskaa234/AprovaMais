import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Flag,
  Flame,
  LayoutGrid,
  ListChecks,
  MoreVertical,
  PauseCircle,
  PlayCircle,
  Plus,
  RotateCcw,
  SearchCheck,
  Settings2,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { Button, Input, Select, Textarea, cx } from "../../components";

function formatMinutes(total = 0) {
  const minutes = Math.max(0, Number(total) || 0);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}min`;
  if (!rest) return `${hours}h`;
  return `${hours}h ${String(rest).padStart(2, "0")}min`;
}

function formatDateLabel(value, options = {}) {
  const date = parseLocalDate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function relativeDay(value) {
  const date = parseLocalDate(value);
  if (!date) return "";
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.round((date.getTime() - todayStart.getTime()) / 86400000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  if (diff === -1) return "Ontem";
  return formatDateLabel(value, { weekday: "long", day: "numeric", month: "long" });
}

function compactTime(value = "08:00") {
  const [hours = "08", minutes = "00"] = String(value).split(":");
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function endTime(hour = "08:00", duration = 60) {
  const [h, m] = compactTime(hour).split(":").map(Number);
  const date = new Date(2000, 0, 1, h || 0, m || 0);
  date.setMinutes(date.getMinutes() + Number(duration || 0));
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function statusMeta(activity) {
  const status = activity.status || "Pendente";
  const isPast = activity.date < isoDate(new Date()) && status !== "Concluida";
  if (status === "Concluida") return { label: "Concluída", icon: CheckCircle2, className: "is-done" };
  if (status === "Em andamento") return { label: "Em andamento", icon: PlayCircle, className: "is-running" };
  if (status === "Reagendada") return { label: "Reagendada", icon: RotateCcw, className: "is-rescheduled" };
  if (status === "Cancelada") return { label: "Cancelada", icon: X, className: "is-canceled" };
  if (isPast) return { label: "Atrasada", icon: Clock3, className: "is-late" };
  return { label: "Pendente", icon: Clock3, className: "is-pending" };
}

function TypeGlyph({ type }) {
  const key = String(type).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (key.includes("quest")) return <SearchCheck size={16} />;
  if (key.includes("revis")) return <RotateCcw size={16} />;
  if (key.includes("flash")) return <ListChecks size={16} />;
  if (key.includes("lei") || key.includes("leitura")) return <FileText size={16} />;
  if (key.includes("simulado")) return <Flag size={16} />;
  if (key.includes("redacao")) return <Edit3 size={16} />;
  if (key.includes("taf")) return <Dumbbell size={16} />;
  if (key.includes("video")) return <Video size={16} />;
  return <BookOpen size={16} />;
}

function StatusGlyph({ className }) {
  if (className === "is-done") return <CheckCircle2 size={13} />;
  if (className === "is-running") return <PlayCircle size={13} />;
  if (className === "is-rescheduled") return <RotateCcw size={13} />;
  if (className === "is-canceled") return <X size={13} />;
  return <Clock3 size={13} />;
}

function typeClass(type = "") {
  const key = String(type).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (key.includes("quest")) return "type-questions";
  if (key.includes("revis")) return "type-review";
  if (key.includes("flash")) return "type-flash";
  if (key.includes("lei") || key.includes("leitura")) return "type-reading";
  if (key.includes("simulado")) return "type-exam";
  if (key.includes("taf")) return "type-taf";
  return "type-study";
}

export function StudyPlanHeader({ objectiveLabel, daysToExam, onSettings, onGenerate }) {
  return (
    <header className="study-plan-header">
      <div className="study-plan-title-row">
        <span className="study-plan-app-icon" aria-hidden="true"><CalendarDays size={21} /></span>
        <div className="min-w-0">
          <h1>Plano de Estudos</h1>
          <p>{objectiveLabel || "Objetivo não selecionado"}{daysToExam ? ` · ${daysToExam} dias para a prova` : ""}</p>
        </div>
      </div>
      <div className="study-plan-header-actions">
        <button aria-label="Configurar plano" onClick={onSettings} type="button"><Settings2 size={19} /></button>
        <button aria-label="Gerar plano" onClick={onGenerate} type="button"><MoreVertical size={19} /></button>
      </div>
    </header>
  );
}

export function WeeklyProgressCard({ studiedMinutes, weeklyGoalMinutes, progress, streak, onAdjust }) {
  return (
    <section className="weekly-progress-card" aria-label="Resumo semanal">
      <div className="weekly-progress-top">
        <div>
          <span>Resumo semanal</span>
          <strong>{formatMinutes(studiedMinutes)} de {formatMinutes(weeklyGoalMinutes)}</strong>
          <p>{progress}% da meta semanal</p>
        </div>
        <div className="study-streak-pill"><Flame size={15} />{streak} dias</div>
      </div>
      <div className="weekly-progress-bar"><span style={{ width: `${Math.min(100, progress)}%` }} /></div>
      <button onClick={onAdjust} type="button">Ajustar meta</button>
    </section>
  );
}

export function QuickActions({ activeFilterCount, generating, onGenerate, onNew, onFilter }) {
  return (
    <nav className="study-quick-actions" aria-label="Ações rápidas">
      <button disabled={generating} onClick={onGenerate} type="button"><CalendarDays size={16} />Gerar plano</button>
      <button onClick={onNew} type="button"><Plus size={16} />Nova atividade</button>
      <button onClick={onFilter} type="button"><Filter size={16} />Filtros{activeFilterCount ? ` · ${activeFilterCount}` : ""}</button>
    </nav>
  );
}

export function ViewSwitcher({ view, onChange }) {
  const items = ["Hoje", "Semana", "Agenda"];
  return (
    <div className="study-view-switcher" role="tablist" aria-label="Visualização do plano">
      {items.map((item) => (
        <button aria-selected={view === item} className={view === item ? "is-active" : ""} key={item} onClick={() => onChange(item)} role="tab" type="button">{item}</button>
      ))}
      <button aria-label="Abrir calendário mensal" className={view === "Mês" ? "is-active compact" : "compact"} onClick={() => onChange("Mês")} type="button"><LayoutGrid size={16} />Mês</button>
    </div>
  );
}

export function WeekDayStrip({ selectedDate, onSelect }) {
  const selected = parseLocalDate(selectedDate) || new Date();
  const mondayOffset = (selected.getDay() + 6) % 7;
  const start = addDays(selected, -mondayOffset);
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
  const todayKey = isoDate(new Date());
  return (
    <div className="week-day-strip" aria-label="Dias da semana">
      {days.map((date) => {
        const key = isoDate(date);
        const active = key === selectedDate;
        return (
          <button className={cx(active && "is-active", key === todayKey && "is-today")} key={key} onClick={() => onSelect(key)} type="button">
            <span>{formatDateLabel(key, { weekday: "short" }).replace(".", "")}</span>
            <strong>{date.getDate()}</strong>
            {key === todayKey ? <small>Hoje</small> : null}
          </button>
        );
      })}
    </div>
  );
}

export function DaySummary({ selectedDate, count, minutes, progress }) {
  return (
    <section className="day-summary">
      <div>
        <h2>{formatDateLabel(selectedDate, { weekday: "long", day: "numeric", month: "long" })}</h2>
        <p>{count} atividade{count === 1 ? "" : "s"} · {formatMinutes(minutes)} planejadas</p>
      </div>
      <span>{progress}%</span>
      <div className="day-summary-bar"><i style={{ width: `${Math.min(100, progress)}%` }} /></div>
    </section>
  );
}

export function StudyActivityCard({ activity, onStatus, onOpen, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const status = statusMeta(activity);
  const isDone = activity.status === "Concluida";
  const isRunning = activity.status === "Em andamento";

  return (
    <article className={cx("study-activity-card", status.className, typeClass(activity.type), isRunning && "is-expanded", open && "is-menu-open")} data-generated={activity.generated ? "true" : undefined}>
      <button
        aria-label={isDone ? "Marcar atividade como pendente" : "Marcar atividade como concluída"}
        className="activity-check"
        onClick={() => onStatus(activity.id, isDone ? "Pendente" : "Concluida")}
        type="button"
      >
        <CheckCircle2 size={19} />
      </button>
      <div className="activity-time">
        <strong>{compactTime(activity.hour)}</strong>
        <span>{endTime(activity.hour, activity.duration)}</span>
      </div>
      <div className="activity-main">
        <div className="activity-title-line">
          <TypeGlyph type={activity.type} />
          <h3>{activity.title}</h3>
        </div>
        <p>{activity.materia} · {activity.type} · {formatMinutes(activity.duration)}</p>
        <span className="activity-status"><StatusGlyph className={status.className} />{status.label}</span>
        {isRunning ? (
          <div className="active-timer-inline">
            <strong>{activity.elapsedLabel || "00:00:00"}</strong>
            <button onClick={() => onStatus(activity.id, "Pendente")} type="button"><PauseCircle size={15} />Pausar</button>
            <button onClick={() => onStatus(activity.id, "Concluida")} type="button">Finalizar</button>
          </div>
        ) : null}
      </div>
      <div className="activity-actions">
        <button className="primary-action" onClick={() => onStatus(activity.id, isRunning ? "Pendente" : isDone ? "Pendente" : "Em andamento")} type="button">
          {isRunning ? <PauseCircle size={15} /> : isDone ? <RotateCcw size={15} /> : <PlayCircle size={15} />}
          {isRunning ? "Pausar" : isDone ? "Reabrir" : "Iniciar"}
        </button>
        <button aria-label="Mais ações" className="activity-menu-button" onClick={() => setOpen((value) => !value)} type="button"><MoreVertical size={18} /></button>
        {open ? (
          <div className="activity-menu">
            <button onClick={() => { setOpen(false); onOpen(activity); }} type="button"><ExternalLink size={15} />Abrir conteúdo</button>
            <button onClick={() => { setOpen(false); onStatus(activity.id, "Concluida"); }} type="button"><CheckCircle2 size={15} />Marcar concluída</button>
            <button onClick={() => { setOpen(false); onEdit(activity); }} type="button"><Edit3 size={15} />Editar</button>
            <button onClick={() => { setOpen(false); onStatus(activity.id, "Reagendada"); }} type="button"><RotateCcw size={15} />Reagendar</button>
            <button className="danger" onClick={() => { setOpen(false); onDelete(activity.id); }} type="button"><Trash2 size={15} />Excluir</button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function EmptyDayState({ filtered, onGenerate, onNew }) {
  return (
    <section className="empty-day-state">
      <CalendarDays size={26} />
      <h3>{filtered ? "Nenhuma atividade filtrada" : "Seu dia está livre"}</h3>
      <p>{filtered ? "Ajuste os filtros para voltar a ver suas atividades." : "Adicione uma atividade ou deixe o plano inteligente organizar seus estudos."}</p>
      <div>
        <Button icon={CalendarDays} onClick={onGenerate}>Gerar atividade</Button>
        <Button icon={Plus} variant="secondary" onClick={onNew}>Adicionar manualmente</Button>
      </div>
    </section>
  );
}

export function StudyPlanStats({ weeklyGoal, studied, remaining, completed }) {
  const items = [
    ["Meta", formatMinutes(weeklyGoal)],
    ["Estudado", formatMinutes(studied)],
    ["Restante", formatMinutes(remaining)],
    ["Concluídas", String(completed)],
  ];
  return (
    <section className="study-plan-stats">
      {items.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
    </section>
  );
}

export function WeeklyDistribution({ distribution, total }) {
  const visible = distribution.filter((item) => item.value > 0);
  return (
    <section className="weekly-distribution">
      <div className="section-heading"><h2>Distribuição da semana</h2><span>por quantidade de atividades</span></div>
      <div className="distribution-list">
        {(visible.length ? visible : distribution.slice(0, 3)).map((item) => {
          const value = total ? Math.round((item.value / total) * 100) : 0;
          return <div key={item.type}><span>{item.type}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>;
        })}
      </div>
    </section>
  );
}

export function UpcomingActivities({ activities, selectedDate, onAgenda }) {
  const next = activities.filter((item) => item.date > selectedDate).slice(0, 3);
  return (
    <section className="upcoming-activities">
      <div className="section-heading"><h2>Próximas revisões</h2><button onClick={onAgenda} type="button">Ver agenda completa</button></div>
      {next.length ? next.map((item) => (
        <div className="upcoming-item" key={item.id}>
          <span>{relativeDay(item.date)}</span>
          <strong>{item.title}</strong>
          <small>{compactTime(item.hour)} · {item.materia}</small>
        </div>
      )) : <p className="muted-empty">Nenhuma próxima atividade fora do dia selecionado.</p>}
    </section>
  );
}

export function AgendaList({ activities, onStatus, onOpen, onEdit, onDelete }) {
  const groups = useMemo(() => {
    const map = new Map();
    activities.forEach((item) => {
      const label = relativeDay(item.date);
      map.set(label, [...(map.get(label) || []), item]);
    });
    return [...map.entries()];
  }, [activities]);
  return (
    <section className="agenda-list">
      {groups.map(([label, rows]) => (
        <div className="agenda-group" key={label}>
          <h2>{label}</h2>
          {rows.map((activity) => <StudyActivityCard activity={activity} key={activity.id} onDelete={onDelete} onEdit={onEdit} onOpen={onOpen} onStatus={onStatus} />)}
        </div>
      ))}
    </section>
  );
}

export function WeeklyCalendar({ days, activities, onSelect, onNew }) {
  return (
    <section className="weekly-calendar">
      {days.map((date) => {
        const key = isoDate(date);
        const rows = activities.filter((item) => item.date === key).slice(0, 4);
        const minutes = rows.reduce((sum, item) => sum + Number(item.duration || 0), 0);
        return (
          <article key={key}>
            <button className="week-column-header" onClick={() => onSelect(key)} type="button">
              <span>{formatDateLabel(key, { weekday: "short" })}</span>
              <strong>{date.getDate()}</strong>
              <small>{formatMinutes(minutes)}</small>
            </button>
            <div className="week-mini-list">
              {rows.map((item) => <button key={item.id} onClick={() => onSelect(item.date)} type="button"><b>{compactTime(item.hour)}</b><span>{item.title}</span></button>)}
              <button className="add-week-activity" onClick={() => { onSelect(key); onNew(); }} type="button"><Plus size={14} />Adicionar</button>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function MonthlyCalendar({ month, days, selectedDate, activities, onPrev, onNext, onSelect }) {
  return (
    <section className="monthly-calendar">
      <div className="monthly-header">
        <button aria-label="Mês anterior" onClick={onPrev} type="button"><ChevronLeft size={18} /></button>
        <h2>{formatDateLabel(isoDate(month), { month: "long", year: "numeric" })}</h2>
        <button aria-label="Próximo mês" onClick={onNext} type="button"><ChevronRight size={18} /></button>
      </div>
      <div className="month-grid-labels">{["D", "S", "T", "Q", "Q", "S", "S"].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
      <div className="month-grid">
        {days.map((date) => {
          const key = isoDate(date);
          const count = activities.filter((item) => item.date === key).length;
          return <button className={cx(key === selectedDate && "is-selected", date.getMonth() !== month.getMonth() && "is-muted")} key={key} onClick={() => onSelect(key)} type="button"><span>{date.getDate()}</span>{count ? <i /> : null}</button>;
        })}
      </div>
    </section>
  );
}

function Sheet({ open, title, children, footer, onClose }) {
  if (!open) return null;
  return (
    <div className="study-sheet-overlay" role="presentation" onClick={onClose}>
      <section aria-modal="true" className="study-sheet" role="dialog" onClick={(event) => event.stopPropagation()}>
        <div className="study-sheet-handle" />
        <header>
          <h2>{title}</h2>
          <button aria-label="Fechar" onClick={onClose} type="button"><X size={18} /></button>
        </header>
        <div className="study-sheet-body">{children}</div>
        {footer ? <footer>{footer}</footer> : null}
      </section>
    </div>
  );
}

export function NewActivitySheet({ draft, editing, open, typeOptions, statusOptions, contestOptions, onChange, onClose, onSave }) {
  const [more, setMore] = useState(false);
  return (
    <Sheet
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button onClick={onSave}>{editing ? "Salvar alterações" : "Criar atividade"}</Button></>}
      onClose={onClose}
      open={open}
      title={editing ? "Editar atividade" : "Nova atividade"}
    >
      <div className="sheet-form-section">
        <Input label="Título" value={draft.title} onChange={(event) => onChange("title", event.target.value)} />
        <Input label="Disciplina" value={draft.materia} onChange={(event) => onChange("materia", event.target.value)} />
        <div className="sheet-grid-2">
          <Select label="Tipo" options={typeOptions} value={draft.type} onChange={(event) => onChange("type", event.target.value)} />
          <Input label="Duração" type="number" value={draft.duration} onChange={(event) => onChange("duration", event.target.value)} />
          <Input label="Data" type="date" value={draft.date} onChange={(event) => onChange("date", event.target.value)} />
          <Input label="Horário" type="time" value={draft.hour} onChange={(event) => onChange("hour", event.target.value)} />
        </div>
      </div>
      <button className="more-options-toggle" onClick={() => setMore((value) => !value)} type="button">{more ? "Ocultar opções" : "Mais opções"}</button>
      {more ? (
        <div className="sheet-form-section">
          <Select label="Objetivo/concurso" options={contestOptions} value={draft.concurso} onChange={(event) => onChange("concurso", event.target.value)} />
          <Select label="Status" options={statusOptions} value={draft.status} onChange={(event) => onChange("status", event.target.value)} />
          <Textarea label="Observações" rows={3} value={draft.notes || ""} onChange={(event) => onChange("notes", event.target.value)} />
        </div>
      ) : null}
    </Sheet>
  );
}

export function StudyPlanFiltersSheet({ open, filters, materias, typeOptions, statusOptions, contestOptions, onChange, onClear, onClose }) {
  const periods = [{ value: "semana", label: "Semana atual" }, { value: "mes", label: "Mês atual" }];
  return (
    <Sheet
      footer={<><Button variant="secondary" onClick={onClear}>Limpar</Button><Button onClick={onClose}>Aplicar filtros</Button></>}
      onClose={onClose}
      open={open}
      title="Filtros"
    >
      <div className="filter-chip-grid">
        <Select label="Disciplina" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => onChange("materia", event.target.value)} />
        <Select label="Tipo" placeholder="Todos" options={typeOptions} value={filters.tipo} onChange={(event) => onChange("tipo", event.target.value)} />
        <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => onChange("status", event.target.value)} />
        <Select label="Período" placeholder="Livre" options={periods} value={filters.periodo} onChange={(event) => onChange("periodo", event.target.value)} />
        <Select label="Objetivo/concurso" placeholder="Todos" options={contestOptions} value={filters.concurso} onChange={(event) => onChange("concurso", event.target.value)} />
      </div>
    </Sheet>
  );
}

export function StudyPlanSettingsSheet({ open, prefs, planDayOptions, generating, generationMode, onChange, onToggleDay, onClose, onGenerate }) {
  return (
    <Sheet
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button loading={generating && generationMode !== "data"} onClick={() => onGenerate("semana")}>Gerar novo plano</Button></>}
      onClose={onClose}
      open={open}
      title="Configurar plano"
    >
      <div className="settings-steps">
        <section>
          <span>1. Meta</span>
          <div className="sheet-grid-2">
            <Input label="Horas por semana" type="number" min="1" value={prefs.weeklyHours} onChange={(event) => onChange("weeklyHours", event.target.value)} />
            <Input label="Data da prova" type="date" value={prefs.examDate} onChange={(event) => onChange("examDate", event.target.value)} />
          </div>
        </section>
        <section>
          <span>2. Disponibilidade</span>
          <div className="sheet-grid-2">
            <Input label="Horário inicial" type="time" value={prefs.dailyStart} onChange={(event) => onChange("dailyStart", event.target.value)} />
            <Select label="Duração dos blocos" options={[45, 60, 75, 90, 120].map((value) => ({ value, label: `${value} min` }))} value={prefs.sessionLength} onChange={(event) => onChange("sessionLength", Number(event.target.value))} />
          </div>
          <div className="settings-day-chips">
            {planDayOptions.map(([day, label]) => <button className={prefs.availableDays?.includes(day) ? "is-active" : ""} key={day} onClick={() => onToggleDay(day)} type="button">{label}</button>)}
          </div>
        </section>
        <section>
          <span>3. Preferências</span>
          <Input label="Matérias prioritárias ou dificuldade" placeholder="Ex: Constitucional" value={prefs.focusSubject} onChange={(event) => onChange("focusSubject", event.target.value)} />
          <label className="smart-generate-toggle">
            <input checked={Boolean(prefs.performanceBased)} onChange={(event) => onChange("performanceBased", event.target.checked)} type="checkbox" />
            Gerar automaticamente com base no meu desempenho
          </label>
          <label className="smart-generate-toggle">
            <input checked={Boolean(prefs.includeTaf)} onChange={(event) => onChange("includeTaf", event.target.checked)} type="checkbox" />
            Incluir TAF quando compatível
          </label>
        </section>
        <section className="generate-options">
          <span>4. Revisão do plano</span>
          <Button loading={generating && generationMode === "completo"} icon={CalendarDays} onClick={() => onGenerate("completo")}>Gerar plano completo</Button>
          <Button loading={generating && generationMode === "semana"} variant="secondary" icon={RotateCcw} onClick={() => onGenerate("semana")}>Gerar nova semana</Button>
          <Button loading={generating && generationMode === "data"} variant="secondary" icon={Clock3} onClick={() => onGenerate("data")}>Mudar apenas a data</Button>
        </section>
      </div>
    </Sheet>
  );
}

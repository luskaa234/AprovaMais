import { useCallback, useMemo, useState } from "react";
import { Bell, BookOpenCheck, CalendarDays, Clock3, CreditCard, LogOut, Mail, MapPin, Moon, ShieldCheck, Sun, Target, UserRound } from "lucide-react";
import { Badge, Button, Card, ProgressBar, cx } from "../../components";
import { useNotifications, usePreferences, useThemeMode, useUser } from "../../contexts";
import { ProfileForm } from "../../forms";

const tabs = [
  { key: "perfil", label: "Editar perfil" },
  { key: "config", label: "Configuracoes" },
  { key: "conta", label: "Conta" },
];

const weekDays = [
  ["domingo", "DOM"],
  ["segunda", "SEG"],
  ["terca", "TER"],
  ["quarta", "QUA"],
  ["quinta", "QUI"],
  ["sexta", "SEX"],
  ["sabado", "SAB"],
];

function initials(name = "") {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "AP";
}

function objectiveLabel(user = {}) {
  return user.contestName || user.targetContest || user.objectiveLabel || user.objective || "Defina seu objetivo";
}

function locationLabel(user = {}) {
  return [user.city, user.state, user.country].filter(Boolean).join(", ") || "Localizacao nao definida";
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function SelectField(props) {
  return <select className="min-h-11 rounded-lg border border-blue-100 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" {...props} />;
}

function ToggleButton({ active, children, onClick }) {
  return (
    <button
      className={cx(
        "min-h-11 rounded-lg border px-4 text-sm font-black transition",
        active ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-blue-100 bg-white text-slate-600 hover:border-blue-300"
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default function PerfilPage() {
  const { logout, user = {}, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();
  const { isDark, toggleTheme } = useThemeMode();
  const [activeTab, setActiveTab] = useState("perfil");
  const plan = user.diagnosticPlan || {};

  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [addNotification, updateProfile]);

  const updatePreference = useCallback((key, value) => {
    preferences.updatePreference(key, value);
    addNotification({ type: "success", title: "Configuracao atualizada", message: "Preferencia salva neste dispositivo." });
  }, [addNotification, preferences]);

  const studyDays = preferences.studyDays || ["segunda", "terca", "quarta", "quinta", "sexta"];

  const profileProgress = useMemo(() => {
    const fields = [
      user.name,
      user.email,
      user.username,
      objectiveLabel(user),
      user.nivel,
      user.horasSemanais || plan.weeklyHours,
      user.city,
      user.state,
      user.country,
      user.birthDate,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [plan.weeklyHours, user]);

  const quickStats = [
    { label: "Objetivo", value: objectiveLabel(user), icon: Target },
    { label: "Nivel", value: user.nivel || "Intermediario", icon: BookOpenCheck },
    { label: "Carga semanal", value: `${user.horasSemanais || plan.weeklyHours || 0}h`, icon: Clock3 },
    { label: "Localizacao", value: locationLabel(user), icon: MapPin },
  ];

  return (
    <div className="profile-upgrade mx-auto grid max-w-6xl gap-5 pb-10 text-slate-900">
      <section className="profile-summary-card overflow-hidden rounded-lg border border-blue-200 bg-white text-slate-950 shadow-sm" data-tour="tour-profile-summary">
        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <div className="grid size-20 shrink-0 place-items-center rounded-lg border border-white/25 bg-white/15 text-2xl font-black text-white shadow-inner">{initials(user?.name)}</div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-wide text-blue-100">Perfil do aluno</p>
                <Badge variant="success">Conta ativa</Badge>
              </div>
              <h1 className="mt-2 truncate text-3xl font-black text-white">{user?.name || "Aluno Aprova+"}</h1>
              <p className="mt-1 text-sm font-medium text-blue-50">{objectiveLabel(user)} - {user?.nivel || "intermediario"}</p>
            </div>
          </div>
          <div className="rounded-lg border border-white/25 bg-white/15 p-4 text-white shadow-inner">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Perfil completo</span>
              <strong className="text-white">{profileProgress}%</strong>
            </div>
            <ProgressBar value={profileProgress} color="bg-white" />
            <p className="mt-3 text-xs font-medium leading-5 text-blue-50">Complete dados pessoais, localizacao e objetivo para melhorar seu plano.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map(({ label, value, icon: Icon }) => (
          <Card key={label} hover={false} className="border-blue-100 bg-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-600"><Icon size={18} /></span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <strong className="mt-1 block truncate text-lg text-slate-950">{value}</strong>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="profile-tabs sticky top-[82px] z-20 flex gap-2 overflow-x-auto rounded-lg border border-blue-100 bg-white/95 p-2 shadow-sm backdrop-blur" data-tour="tour-profile-tabs">
        {tabs.map((tab) => (
          <button
            className={cx("min-h-11 shrink-0 rounded-lg px-4 text-sm font-black transition", activeTab === tab.key ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700")}
            data-tour={tab.key === "config" ? "tour-profile-settings-tab" : undefined}
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "perfil" ? (
        <Card hover={false} className="border-blue-100 bg-white shadow-sm" data-tour="tour-profile-form">
          <div className="mb-5 flex items-center gap-2">
            <UserRound className="text-blue-600" size={18} />
            <div>
              <h2 className="font-bold text-slate-950">Dados da conta</h2>
              <p className="text-sm text-slate-500">Nome, contato, cidade, estado, pais e objetivo principal.</p>
            </div>
          </div>
          <ProfileForm user={user} onSave={save} />
        </Card>
      ) : null}

      {activeTab === "config" ? (
        <div className="grid gap-5 lg:grid-cols-2" data-tour="tour-profile-settings">
          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              {isDark ? <Moon className="text-blue-600" size={18} /> : <Sun className="text-blue-600" size={18} />}
              <div>
                <h2 className="font-bold text-slate-950">Aparencia</h2>
                <p className="text-sm text-slate-500">Modo escuro discreto, sem alterar a sidebar.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleButton active={!isDark} onClick={() => { if (isDark) toggleTheme(); }}>Claro</ToggleButton>
              <ToggleButton active={isDark} onClick={() => { if (!isDark) toggleTheme(); }}>Escuro discreto</ToggleButton>
            </div>
          </Card>

          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Bell className="text-blue-600" size={18} />
              <div>
                <h2 className="font-bold text-slate-950">Rotina de estudo</h2>
                <p className="text-sm text-slate-500">Preferencias usadas em lembretes, plano e dashboard.</p>
              </div>
            </div>
            <div className="grid gap-3">
              <Field label="Lembretes">
                <div className="grid gap-2 sm:grid-cols-2">
                  <ToggleButton active={Boolean(preferences.reminderEnabled)} onClick={() => updatePreference("reminderEnabled", true)}>Ativado</ToggleButton>
                  <ToggleButton active={!preferences.reminderEnabled} onClick={() => updatePreference("reminderEnabled", false)}>Desativado</ToggleButton>
                </div>
              </Field>
              <Field label="Meta diaria">
                <SelectField value={preferences.dailyGoalHours || 3} onChange={(event) => updatePreference("dailyGoalHours", Number(event.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((hour) => <option key={hour} value={hour}>{hour}h por dia</option>)}
                </SelectField>
              </Field>
              <Field label="Modo de estudo">
                <SelectField value={preferences.studyMode || "foco"} onChange={(event) => updatePreference("studyMode", event.target.value)}>
                  <option value="foco">Foco</option>
                  <option value="revisao">Revisao</option>
                  <option value="questoes">Questoes</option>
                  <option value="simulado">Simulado</option>
                </SelectField>
              </Field>
            </div>
          </Card>

          <Card hover={false} className="border-blue-100 bg-white shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="text-blue-600" size={18} />
              <div>
                <h2 className="font-bold text-slate-950">Dias de estudo</h2>
                <p className="text-sm text-slate-500">Toque nos dias para montar sua semana padrão.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-7">
              {weekDays.map(([key, label]) => {
                const active = studyDays.includes(key);
                return (
                  <button
                    className={cx("grid min-h-16 place-items-center rounded-lg border text-sm font-black transition", active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-100 bg-white text-slate-500")}
                    key={key}
                    onClick={() => updatePreference("studyDays", active ? studyDays.filter((day) => day !== key) : [...studyDays, key])}
                    type="button"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <Field label="Primeiro dia da semana">
              <SelectField className="mt-4 min-h-11 rounded-lg border border-blue-100 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={preferences.firstWeekDay || "domingo"} onChange={(event) => updatePreference("firstWeekDay", event.target.value)}>
                <option value="domingo">Domingo</option>
                <option value="segunda">Segunda-feira</option>
              </SelectField>
            </Field>
          </Card>
        </div>
      ) : null}

      {activeTab === "conta" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-600" size={18} />
              <h2 className="font-bold text-slate-950">Plano atual</h2>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-700">Plano gratuito</p>
              <strong className="mt-1 block text-xl text-slate-950">Aprova Mais</strong>
              <p className="mt-2 text-sm text-slate-500">Recursos essenciais ativos para estudar e testar a plataforma.</p>
            </div>
          </Card>

          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Mail className="text-blue-600" size={18} />
              <h2 className="font-bold text-slate-950">Seguranca</h2>
            </div>
            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm leading-6 text-slate-700">
              <div className="mb-2 flex items-center gap-2 font-bold text-blue-700"><ShieldCheck size={16} /> Sessao ativa</div>
              Revise seus dados principais e saia da conta quando terminar de estudar.
            </div>
            <Button className="w-full" variant="danger" icon={LogOut} onClick={logout}>Sair da conta</Button>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

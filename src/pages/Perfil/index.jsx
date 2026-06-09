import { useCallback, useMemo } from "react";
import { Award, Bell, CalendarDays, ChevronRight, Dumbbell, LogOut, Mail, ShieldCheck, Target, UserRound } from "lucide-react";
import { PerformanceChart } from "../../charts";
import { Badge, Card, ProgressBar, ProgressRing, cx } from "../../components";
import { useNotifications, usePreferences, useUser } from "../../contexts";
import { ProfileForm } from "../../forms";

const preferenceLabels = {
  reminderEnabled: "Lembretes de estudo",
  dailyGoalHours: "Meta diaria",
  studyMode: "Modo de estudo",
};

const statCards = [
  ["Horas", "hours", CalendarDays, "tone-blue"],
  ["Questoes", "questions", Target, "tone-emerald"],
  ["Acertos", "accuracy", Award, "tone-violet"],
  ["TAF", "taf", Dumbbell, "tone-amber"],
];

function initials(name = "") {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("") || "AP";
}

function MobileProfile({ chart, logout, onSave, preferences, user }) {
  const stats = user?.stats || {};
  const progress = user?.studyGoal?.progress ?? 45;

  return (
    <div className="mobile-profile md:hidden">
      <section className="mobile-profile-hero">
        <div className="mobile-profile-avatar">{initials(user?.name)}</div>
        <div>
          <span>Perfil</span>
          <h1>{user?.name || "Aluno Aprova+"}</h1>
          <p>{user?.targetContest || "Concurso alvo"} · {user?.nivel || "intermediario"}</p>
        </div>
      </section>

      <section className="mobile-profile-goal">
        <div className="mobile-profile-goal-top">
          <div>
            <span>Meta de aprovacao</span>
            <strong>{progress}%</strong>
          </div>
          <ShieldCheck size={28} />
        </div>
        <ProgressBar value={progress} color="bg-blue-600" />
        <p>Data alvo: {user?.studyGoal?.date || user?.dataProva || "2026-10-23"}</p>
      </section>

      <div className="mobile-profile-stats">
        {statCards.map(([label, key, Icon, tone]) => {
          const value = key === "accuracy" ? `${stats[key] ?? 0}%` : key === "taf" ? `${stats[key] ?? 0}/10` : stats[key] ?? 0;
          return (
            <div className={cx("mobile-profile-stat", tone)} key={key}>
              <Icon size={18} />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          );
        })}
      </div>

      <section className="mobile-profile-card">
        <div className="mobile-profile-card-title"><h2>Dados da conta</h2><Mail size={18} /></div>
        <ProfileForm user={user} onSave={onSave} />
      </section>

      <section className="mobile-profile-card">
        <div className="mobile-profile-card-title"><h2>Preferencias</h2><Bell size={18} /></div>
        {Object.keys(preferenceLabels).map((key) => (
          <div className="mobile-profile-row" key={key}><span>{preferenceLabels[key]}</span><strong>{String(preferences[key])}</strong></div>
        ))}
      </section>

      <section className="mobile-profile-card">
        <div className="mobile-profile-card-title"><h2>Evolucao</h2><ChevronRight size={18} /></div>
        <PerformanceChart data={chart} />
      </section>

      <button className="mobile-profile-logout" onClick={logout} type="button"><LogOut size={18} />Sair da conta</button>
    </div>
  );
}

export default function PerfilPage() {
  const { logout, user, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();
  const stats = user?.stats || {};
  const progress = user?.studyGoal?.progress ?? 45;

  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [updateProfile, addNotification]);

  const chart = useMemo(() => ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((label, index) => ({ label, acertos: 58 + index * 6 })), []);

  return (
    <>
      <MobileProfile chart={chart} logout={logout} onSave={save} preferences={preferences} user={user} />

      <div className="hidden md:block">
        <div className="mb-5 rounded-lg border border-blue-900/40 bg-gradient-to-r from-slate-950 to-blue-700 p-6 text-white">
          <div className="flex items-center gap-5">
            <div className="grid size-20 place-items-center rounded-lg border border-white/20 bg-white/10 text-2xl font-black">{initials(user?.name)}</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-blue-100">Perfil do aluno</p>
              <h1 className="truncate text-3xl font-black">{user?.name || "Aluno Aprova+"}</h1>
              <p className="mt-1 text-sm text-blue-100">{user?.targetContest || "Concurso alvo"} · nivel {user?.nivel || "intermediario"} · {user?.horasSemanais || 0}h semanais</p>
            </div>
            <Badge variant="success"><ShieldCheck size={14} /> Meta ativa</Badge>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <Card hover={false}>
            <div className="mb-4 flex items-center gap-2"><UserRound className="text-blue-300" size={18} /><h2 className="font-bold text-white">Dados principais</h2></div>
            <ProfileForm user={user} onSave={save} />
            <div className="mt-4 grid gap-3 border-t border-gray-800 pt-4">
              <label className="grid gap-1 text-sm text-gray-300">Concurso fisico alvo<select className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3"><option>PMSP Soldado PM</option><option>PCSP Investigador</option><option>PRF Policial Rodoviario Federal</option><option>EB Sargento</option></select></label>
              <label className="grid gap-1 text-sm text-gray-300">Data da prova fisica<input className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3" defaultValue="2026-10-15" type="date" /></label>
            </div>
          </Card>

          <div className="space-y-4">
            <Card hover={false}>
              <div className="flex items-center gap-5">
                <ProgressRing value={progress} />
                <div><h2 className="font-bold text-white">Meta de aprovacao</h2><p className="text-sm text-gray-400">Intelectual: {progress}% · TAF: 72% · Data alvo: {user?.studyGoal?.date || "2026-10-23"}</p></div>
              </div>
            </Card>
            <div className="grid gap-3 md:grid-cols-4">
              {statCards.map(([label, key, Icon]) => {
                const value = key === "accuracy" ? `${stats[key] ?? 0}%` : key === "taf" ? `${stats[key] ?? 0}/10` : stats[key] ?? 0;
                return <Card hover={false} className="p-4" key={key}><Icon className="mb-3 text-blue-300" size={20} /><span className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span><strong className="mt-1 block text-xl text-white">{value}</strong></Card>;
              })}
            </div>
            <Card hover={false}><h2 className="mb-3 font-bold text-white">Historico de acertos</h2><PerformanceChart data={chart} /></Card>
            <Card hover={false}>
              <h2 className="mb-3 font-bold text-white">Preferencias</h2>
              {Object.keys(preferenceLabels).map((key) => <label className="flex items-center justify-between border-b border-gray-800 py-2 text-gray-300" key={key}>{preferenceLabels[key]}<span className="text-gray-500">{String(preferences[key])}</span></label>)}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

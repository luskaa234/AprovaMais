import { useCallback, useMemo } from "react";
import { Award, Bell, CalendarDays, ChevronRight, Dumbbell, LogOut, Mail, ShieldCheck, Target } from "lucide-react";
import { PerformanceChart } from "../../charts";
import { Card, ProgressBar, ProgressRing, cx } from "../../components";
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

function MobileProfile({ chart, logout, onSave, preferences, user }) {
  const initials = user?.name?.split(" ").map((part) => part[0]).slice(0, 2).join("") || "AP";
  const stats = user?.stats || {};
  const progress = user?.studyGoal?.progress ?? 45;

  return (
    <div className="mobile-profile md:hidden">
      <section className="mobile-profile-hero">
        <div className="mobile-profile-avatar">{initials}</div>
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
        <div className="mobile-profile-card-title">
          <h2>Dados da conta</h2>
          <Mail size={18} />
        </div>
        <ProfileForm user={user} onSave={onSave} />
      </section>

      <section className="mobile-profile-card">
        <div className="mobile-profile-card-title">
          <h2>Preferencias</h2>
          <Bell size={18} />
        </div>
        {Object.keys(preferenceLabels).map((key) => (
          <div className="mobile-profile-row" key={key}>
            <span>{preferenceLabels[key]}</span>
            <strong>{String(preferences[key])}</strong>
          </div>
        ))}
      </section>

      <section className="mobile-profile-card">
        <div className="mobile-profile-card-title">
          <h2>Evolucao</h2>
          <ChevronRight size={18} />
        </div>
        <PerformanceChart data={chart} />
      </section>

      <button className="mobile-profile-logout" onClick={logout} type="button">
        <LogOut size={18} />
        Sair da conta
      </button>
    </div>
  );
}

export default function PerfilPage() {
  const { logout, user, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();

  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [updateProfile, addNotification]);

  const chart = useMemo(() => ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((label, index) => ({ label, acertos: 58 + index * 6 })), []);
  const progress = user?.studyGoal?.progress ?? 45;
  const labels = { reminderEnabled: "Lembretes de estudo", dailyGoalHours: "Meta diaria", studyMode: "Modo de estudo" };

  return (
    <>
      <MobileProfile chart={chart} logout={logout} onSave={save} preferences={preferences} user={user} />

      <div className="hidden md:block">
        <h1 className="text-3xl font-black text-white">Perfil do aluno</h1>
        <p className="mb-5 text-sm text-gray-400">Dados, meta, histórico e preferências.</p>
        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <ProfileForm user={user} onSave={save} />
            <div className="mt-4 grid gap-3 border-t border-gray-800 pt-4">
              <label className="grid gap-1 text-sm text-gray-300">
                Concurso fisico alvo
                <select className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3">
                  <option>PMSP Soldado PM</option>
                  <option>PCSP Investigador</option>
                  <option>PRF Policial Rodoviario Federal</option>
                  <option>EB Sargento</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm text-gray-300">
                Data da prova fisica
                <input className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3" defaultValue="2026-10-15" type="date" />
              </label>
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-5">
                <ProgressRing value={progress} />
                <div>
                  <h2 className="font-bold text-white">Meta de aprovação</h2>
                  <p className="text-sm text-gray-400">Intelectual: {progress}% · TAF: 72% · Data alvo: {user?.studyGoal?.date || "2026-10-23"}</p>
                </div>
              </div>
            </Card>
            <Card>
              <h2 className="mb-3 font-bold text-white">Histórico de acertos</h2>
              <PerformanceChart data={chart} />
            </Card>
            <Card>
              <h2 className="mb-3 font-bold text-white">Preferências</h2>
              {["reminderEnabled", "dailyGoalHours", "studyMode"].map((key) => (
                <label className="flex items-center justify-between border-b border-gray-800 py-2 text-gray-300" key={key}>
                  {labels[key]}
                  <span className="text-gray-500">{String(preferences[key])}</span>
                </label>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

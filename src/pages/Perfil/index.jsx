import { useCallback, useMemo } from "react";
import { Bell, BookOpenCheck, CalendarDays, Clock3, LogOut, Mail, ShieldCheck, Target, UserRound } from "lucide-react";
import { Badge, Button, Card, ProgressBar } from "../../components";
import { useNotifications, usePreferences, useUser } from "../../contexts";
import { ProfileForm } from "../../forms";

const preferenceLabels = {
  reminderEnabled: "Lembretes de estudo",
  dailyGoalHours: "Meta diaria",
  studyMode: "Modo de estudo",
};

function initials(name = "") {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "AP";
}

function preferenceValue(key, value) {
  if (key === "reminderEnabled") return value ? "Ativado" : "Desativado";
  if (key === "dailyGoalHours") return `${value || 0}h por dia`;
  if (key === "studyMode") return String(value || "foco").replace(/^./, (letter) => letter.toUpperCase());
  return String(value ?? "-");
}

function objectiveLabel(user = {}) {
  return user.contestName || user.targetContest || user.objectiveLabel || user.objective || "Defina seu objetivo";
}

export default function PerfilPage() {
  const { logout, user = {}, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();
  const plan = user.diagnosticPlan || {};

  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [addNotification, updateProfile]);

  const profileProgress = useMemo(() => {
    const fields = [user.name, user.email, objectiveLabel(user), user.nivel, user.horasSemanais || plan.weeklyHours, plan.prioritySubjects?.length || user.difficultSubjects?.length];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [plan.prioritySubjects?.length, plan.weeklyHours, user]);

  const quickStats = [
    { label: "Objetivo", value: objectiveLabel(user), icon: Target },
    { label: "Nivel", value: user.nivel || "Intermediario", icon: BookOpenCheck },
    { label: "Carga semanal", value: `${user.horasSemanais || plan.weeklyHours || 0}h`, icon: Clock3 },
    { label: "Data da prova", value: user.dataProva ? new Date(user.dataProva).toLocaleDateString("pt-BR") : "Nao definida", icon: CalendarDays },
  ];

  const priorities = plan.prioritySubjects || user.difficultSubjects || [];

  return (
    <div className="mx-auto grid max-w-6xl gap-5 pb-10 text-slate-900">
      <section className="overflow-hidden rounded-lg border border-blue-900/40 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 text-white shadow-xl shadow-blue-950/20">
        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <div className="grid size-20 shrink-0 place-items-center rounded-lg border border-white/20 bg-white/10 text-2xl font-black shadow-inner">{initials(user?.name)}</div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-wide text-blue-100">Perfil do aluno</p>
                <Badge variant="success">Conta ativa</Badge>
              </div>
              <h1 className="mt-2 truncate text-3xl font-black">{user?.name || "Aluno Aprova+"}</h1>
              <p className="mt-1 text-sm text-blue-100">{objectiveLabel(user)} - {user?.nivel || "intermediario"}</p>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-100">Perfil completo</span>
              <strong>{profileProgress}%</strong>
            </div>
            <ProgressBar value={profileProgress} color="bg-white" />
            <p className="mt-3 text-xs leading-5 text-blue-100">Complete objetivo, carga semanal e dificuldades para melhorar o plano e o mascote.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map(({ label, value, icon: Icon }) => (
          <Card key={label} hover={false} className="bg-gray-950/80">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-600/15 text-blue-300"><Icon size={18} /></span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
                <strong className="mt-1 block truncate text-lg text-white">{value}</strong>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card hover={false} className="bg-gray-950/80">
          <div className="mb-5 flex items-center gap-2">
            <UserRound className="text-blue-300" size={18} />
            <div>
              <h2 className="font-bold text-white">Dados da conta</h2>
              <p className="text-sm text-gray-500">Atualize as informacoes usadas no plano, no dashboard e no mascote.</p>
            </div>
          </div>
          <ProfileForm user={user} onSave={save} />
        </Card>

        <div className="space-y-5">
          <Card hover={false} className="bg-gray-950/80">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="text-blue-300" size={18} />
              <h2 className="font-bold text-white">Preferencias</h2>
            </div>
            {Object.keys(preferenceLabels).map((key) => (
              <div className="flex items-center justify-between gap-4 border-b border-gray-800 py-3 text-sm text-gray-300 last:border-b-0" key={key}>
                <span>{preferenceLabels[key]}</span>
                <strong className="rounded-full bg-gray-900 px-3 py-1 text-xs text-blue-200">{preferenceValue(key, preferences[key])}</strong>
              </div>
            ))}
          </Card>

          <Card hover={false} className="bg-gray-950/80">
            <div className="mb-4 flex items-center gap-2">
              <Target className="text-blue-300" size={18} />
              <h2 className="font-bold text-white">Prioridades</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {priorities.length ? priorities.slice(0, 8).map((item) => <Badge key={item} variant="neutral">{item}</Badge>) : <p className="text-sm leading-6 text-gray-500">Nenhuma prioridade definida. Preencha o onboarding ou marque suas dificuldades.</p>}
            </div>
          </Card>

          <Card hover={false} className="bg-gray-950/80">
            <div className="mb-3 flex items-center gap-2">
              <Mail className="text-blue-300" size={18} />
              <h2 className="font-bold text-white">Seguranca</h2>
            </div>
            <div className="mb-4 rounded-lg border border-blue-900/50 bg-blue-950/30 p-3 text-sm leading-6 text-gray-300">
              <div className="mb-2 flex items-center gap-2 font-bold text-blue-200"><ShieldCheck size={16} /> Sessao ativa</div>
              Revise seus dados principais e saia da conta quando terminar de estudar.
            </div>
            <Button className="w-full" variant="danger" icon={LogOut} onClick={logout}>Sair da conta</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

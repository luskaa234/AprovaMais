import { useCallback } from "react";
import { Bell, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button, Card } from "../../components";
import { useNotifications, usePreferences, useUser } from "../../contexts";
import { ProfileForm } from "../../forms";

const preferenceLabels = {
  reminderEnabled: "Lembretes de estudo",
  dailyGoalHours: "Meta diaria",
  studyMode: "Modo de estudo",
};

function initials(name = "") {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("") || "AP";
}

export default function PerfilPage() {
  const { logout, user, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();

  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [addNotification, updateProfile]);

  return (
    <div className="mx-auto max-w-5xl pb-10">
      <section className="mb-5 rounded-lg border border-blue-900/40 bg-gradient-to-r from-slate-950 to-blue-700 p-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="grid size-16 place-items-center rounded-lg border border-white/20 bg-white/10 text-xl font-black">{initials(user?.name)}</div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-wide text-blue-100">Perfil</p>
            <h1 className="truncate text-2xl font-black">{user?.name || "Aluno Aprova+"}</h1>
            <p className="mt-1 text-sm text-blue-100">{user?.targetContest || "Concurso alvo"} · {user?.nivel || "intermediario"}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"><ShieldCheck size={14} /> Conta ativa</span>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <UserRound className="text-blue-300" size={18} />
            <h2 className="font-bold text-white">Dados da conta</h2>
          </div>
          <ProfileForm user={user} onSave={save} />
        </Card>

        <div className="space-y-4">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2">
              <Bell className="text-blue-300" size={18} />
              <h2 className="font-bold text-white">Preferencias</h2>
            </div>
            {Object.keys(preferenceLabels).map((key) => (
              <div className="flex items-center justify-between border-b border-gray-800 py-3 text-sm text-gray-300 last:border-b-0" key={key}>
                <span>{preferenceLabels[key]}</span>
                <strong className="text-gray-400">{String(preferences[key])}</strong>
              </div>
            ))}
          </Card>

          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2">
              <Mail className="text-blue-300" size={18} />
              <h2 className="font-bold text-white">Seguranca</h2>
            </div>
            <p className="text-sm text-gray-400">Use esta area apenas para revisar seus dados principais e sair da conta.</p>
            <Button className="mt-4 w-full" variant="danger" icon={LogOut} onClick={logout}>Sair da conta</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

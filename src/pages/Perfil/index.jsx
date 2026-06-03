import { useCallback, useMemo } from "react";
import { Card, ProgressRing } from "../../components";
import { PerformanceChart } from "../../charts";
import { ProfileForm } from "../../forms";
import { useNotifications, usePreferences, useUser } from "../../contexts";

export default function PerfilPage() {
  const { user, updateProfile } = useUser();
  const { addNotification } = useNotifications();
  const preferences = usePreferences();
  const save = useCallback((profile) => {
    updateProfile(profile);
    addNotification({ type: "success", title: "Perfil salvo", message: "Dados atualizados com sucesso." });
  }, [updateProfile, addNotification]);
  const chart = useMemo(() => ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((label, index) => ({ label, acertos: 58 + index * 6 })), []);
  const labels = { reminderEnabled: "Lembretes de estudo", dailyGoalHours: "Meta diaria", studyMode: "Modo de estudo" };
  return <div><h1 className="text-3xl font-black text-white">Perfil do aluno</h1><p className="mb-5 text-sm text-gray-400">Dados, meta, historico e preferencias.</p><div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]"><Card><ProfileForm user={user} onSave={save} /><div className="mt-4 grid gap-3 border-t border-gray-800 pt-4"><label className="grid gap-1 text-sm text-gray-300">Concurso fisico alvo<select className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3"><option>PMSP Soldado PM</option><option>PCSP Investigador</option><option>PRF Policial Rodoviario Federal</option><option>EB Sargento</option></select></label><label className="grid gap-1 text-sm text-gray-300">Data da prova fisica<input type="date" className="min-h-10 rounded-lg border border-gray-700 bg-gray-950 px-3" defaultValue="2026-10-15" /></label></div></Card><div className="space-y-4"><Card><div className="flex items-center gap-5"><ProgressRing value={user.studyGoal.progress} /><div><h2 className="font-bold text-white">Meta de aprovacao</h2><p className="text-sm text-gray-400">Intelectual: {user.studyGoal.progress}% · TAF: 72% · Data alvo: {user.studyGoal.date}</p></div></div></Card><Card><h2 className="mb-3 font-bold text-white">Historico de acertos</h2><PerformanceChart data={chart} /></Card><Card><h2 className="mb-3 font-bold text-white">Preferencias</h2>{["reminderEnabled", "dailyGoalHours", "studyMode"].map((key) => <label key={key} className="flex items-center justify-between border-b border-gray-800 py-2 text-gray-300">{labels[key]}<span className="text-gray-500">{String(preferences[key])}</span></label>)}</Card></div></div></div>;
}

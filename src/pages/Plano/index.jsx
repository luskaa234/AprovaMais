import { useCallback, useState } from "react";
import { Sparkles } from "lucide-react";
import { AIPanel } from "../../ai";
import { Badge, Button, Card, ProgressBar } from "../../components";
import { useUser } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { planoService } from "../../services";
import { isOabFocus } from "../../utils";

export default function PlanoPage() {
  const { user } = useUser();
  const oabStudyMode = isOabFocus(user);
  const load = useCallback(() => planoService.getPlano(), []);
  const { data: plano } = useAsyncData(load, [load]);
  const [done, setDone] = useState({});

  return (
    <div>
      <h1 className="text-3xl font-black text-white">Plano de estudos</h1>
      <p className="mb-5 text-sm text-gray-400">Grade semanal, tarefas, progresso e sugestao da IA.</p>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-white">Resumo da semana</h2>
            <label className="text-sm text-gray-400">
              <input type="checkbox" className="mr-2" />
              Incluir fins de semana
            </label>
          </div>

          <div className="grid min-w-[760px] grid-cols-5 gap-3 overflow-auto">
            {plano.map((dia, index) => (
              <div key={dia.dia} className="rounded-lg bg-gray-900 p-3">
                <h2 className="font-bold text-white">{dia.dia}</h2>
                {dia.blocos.map((bloco) => (
                  <div key={bloco.hora} className="mt-3 rounded-lg border border-gray-800 p-3 text-sm">
                    <Badge>{bloco.hora}</Badge>
                    <p className="mt-2 text-gray-200">{bloco.materia}</p>
                    <span className="text-gray-500">{bloco.duracao} min</span>
                  </div>
                ))}
                {!oabStudyMode && index < 3 ? (
                  <div className="mt-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-3 text-sm">
                    <Badge variant="warning">TAF</Badge>
                    <p className="mt-2 text-gray-200">Corrida intervalada</p>
                    <span className="text-gray-500">45 min</span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="mb-3 font-bold text-white">Tarefas do dia</h2>
            {plano[0]?.tarefas.map((task) => (
              <label key={task.id} className="flex items-center gap-3 border-b border-gray-800 py-3 text-gray-300">
                <input
                  type="checkbox"
                  checked={done[task.id] || task.done}
                  onChange={(event) => setDone((current) => ({ ...current, [task.id]: event.target.checked }))}
                />
                {task.titulo}
                <span className="ml-auto text-xs text-gray-500">{task.minutos} min</span>
              </label>
            ))}
          </Card>

          <Card>
            <h2 className="mb-3 font-bold text-white">Progresso por disciplina</h2>
            {["Constitucional", "Portugues", "Informatica", "Raciocinio"].map((item, index) => (
              <ProgressBar key={item} label={item} value={52 + index * 10} />
            ))}
          </Card>

          <AIPanel
            text={
              oabStudyMode
                ? "Sugestao: antecipe revisao de Constitucional antes do proximo simulado e mantenha treino por questoes FGV."
                : "Sugestao: antecipe revisao de Constitucional antes do proximo simulado e mantenha 3 treinos TAF."
            }
            action={
              <Button size="sm" icon={Sparkles}>
                Aplicar
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { AIChat } from "../../ai";
import { useUser } from "../../contexts";
import { useQuestoesStore } from "../../stores";

export default function IAPage() {
  const { user } = useUser();
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const questoes = useQuestoesStore((state) => state.questoes);

  const desempenho = useMemo(() => {
    const acertos = tentativas.filter((item) => item.acertou).length;
    const porMateria = tentativas.reduce((acc, tentativa) => {
      const questao = questoes.find((item) => item.id === tentativa.questaoId);
      const materia = questao?.materia || "Nao informada";
      acc[materia] ||= { acertos: 0, total: 0, erros: 0 };
      acc[materia].total += 1;
      if (tentativa.acertou) acc[materia].acertos += 1;
      else acc[materia].erros += 1;
      return acc;
    }, {});
    const materiasFracas = Object.entries(porMateria)
      .sort((a, b) => b[1].erros - a[1].erros || a[1].acertos / Math.max(a[1].total, 1) - b[1].acertos / Math.max(b[1].total, 1))
      .slice(0, 4)
      .map(([materia]) => materia);

    return {
      questoesResolvidas: tentativas.length,
      taxaAcertos: tentativas.length ? Math.round((acertos / tentativas.length) * 100) : user?.stats?.accuracy || 0,
      sequenciaDias: user?.stats?.streak || user?.rawStats?.sequenciaDias || 0,
      porMateria,
      materiasFracas,
    };
  }, [questoes, tentativas, user?.rawStats?.sequenciaDias, user?.stats?.accuracy, user?.stats?.streak]);

  return (
    <div className="flex h-[calc(100vh-130px)] flex-col">
      <h1 className="text-3xl font-black text-white">Assistente de estudos</h1>
      <p className="mb-5 text-sm text-gray-400">Conversa guiada para duvidas, revisoes e organizacao do plano.</p>
      <AIChat desempenho={desempenho} perfil={user} />
    </div>
  );
}

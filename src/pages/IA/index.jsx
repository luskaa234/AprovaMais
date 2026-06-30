import { useMemo } from "react";
import { AIChat } from "../../ai";
import { useUser } from "../../contexts";
import { useQuestoesStore } from "../../stores";

function buildDesempenho(tentativas = [], stats = {}) {
  const total = tentativas.length || Number(stats.questions || 0);
  const acertos = tentativas.filter((item) => item.acertou).length;
  const porMateria = tentativas.reduce((acc, item) => {
    const materia = item.materia || "Não informada";
    acc[materia] ||= { total: 0, acertos: 0, erros: 0 };
    acc[materia].total += 1;
    if (item.acertou) acc[materia].acertos += 1;
    else acc[materia].erros += 1;
    return acc;
  }, {});

  const materiasFracas = Object.entries(porMateria)
    .sort(([, a], [, b]) => b.erros - a.erros)
    .slice(0, 5)
    .map(([materia]) => materia);

  return {
    questoesResolvidas: total,
    taxaAcertos: total ? Math.round((acertos / total) * 100) : Number(stats.accuracy || 0),
    sequenciaDias: new Set(tentativas.map((item) => item.data?.slice(0, 10)).filter(Boolean)).size || Number(stats.streak || 0),
    materiasFracas,
    porMateria,
  };
}

export default function IAPage() {
  const { user } = useUser();
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const desempenho = useMemo(() => buildDesempenho(tentativas, user?.stats), [tentativas, user?.stats]);

  return (
    <div className="mx-auto grid min-h-[calc(100vh-150px)] max-w-5xl pb-10">
      <AIChat perfil={user || {}} desempenho={desempenho} />
    </div>
  );
}

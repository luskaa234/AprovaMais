import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Bookmark, CheckCircle2, Flag, Lightbulb, XCircle } from "lucide-react";
import { Badge, Button, Card, cx } from "../../components";

const difficultyVariant = {
  facil: "success",
  medio: "warning",
  media: "warning",
  dificil: "error",
};

export const QuestionCard = memo(({ questao, index = 0, onAnswer, onSave, onAddCaderno, onReport }) => {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = useCallback((id) => {
    setSelected(id);
    setConfirmed(false);
    setResult(null);
  }, []);

  const confirmAnswer = useCallback(async () => {
    if (!selected) return;
    const next = await onAnswer(questao.id, selected);
    setResult(next);
    setConfirmed(true);
  }, [onAnswer, questao.id, selected]);

  const isCorrect = result?.correta ?? selected === questao.gabarito;
  const difficulty = String(questao.dificuldade || "medio").toLowerCase();

  return (
    <Card hover={false} className="overflow-hidden p-0">
      <div className="border-b border-gray-800 bg-gray-900/70 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">Questao {index + 1}</Badge>
            <Badge>{questao.banca || "Banca"}</Badge>
            <Badge variant="neutral">{questao.materia}</Badge>
            <Badge variant={difficultyVariant[difficulty] || "warning"}>{questao.dificuldade || "medio"}</Badge>
          </div>
          <div className="text-xs font-semibold text-gray-500">{questao.assunto || questao.topico || "Assunto geral"}</div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-100">{questao.enunciado}</p>

        <div className="mt-5 grid gap-2">
          {questao.alternativas.map((alt) => {
            const selectedThis = selected === alt.id;
            const correctThis = confirmed && alt.correta;
            const wrongThis = confirmed && selectedThis && !alt.correta;

            return (
              <button
                key={alt.id}
                onClick={() => handleAnswer(alt.id)}
                disabled={confirmed}
                className={cx(
                  "group flex min-h-12 items-start gap-3 rounded-lg border p-3 text-left text-sm transition",
                  !confirmed && selectedThis && "border-indigo-500 bg-indigo-500/10 text-indigo-100 shadow-sm shadow-indigo-950/30",
                  !confirmed && !selectedThis && "border-gray-800 bg-gray-900 text-gray-300 hover:border-indigo-400 hover:bg-gray-900/80",
                  correctThis && "border-emerald-500 bg-emerald-500/10 text-emerald-100",
                  wrongThis && "border-red-500 bg-red-500/10 text-red-100",
                  confirmed && !correctThis && !wrongThis && "border-gray-800 bg-gray-900 text-gray-400"
                )}
              >
                <span className={cx("grid size-7 shrink-0 place-items-center rounded-full text-xs font-black", selectedThis || correctThis ? "bg-current/10" : "bg-gray-800")}>
                  {alt.id.toUpperCase()}
                </span>
                <span className="flex-1 leading-relaxed">{alt.texto}</span>
                {correctThis ? <CheckCircle2 className="shrink-0 text-emerald-300" size={18} /> : null}
                {wrongThis ? <XCircle className="shrink-0 text-red-300" size={18} /> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button disabled={!selected || confirmed} onClick={confirmAnswer}>Confirmar resposta</Button>
          <Button variant="ghost" icon={Bookmark} onClick={() => onSave(questao.id)}>Salvar</Button>
          <Button variant="ghost" icon={AlertTriangle} onClick={() => onAddCaderno?.(questao.id)}>Caderno de erros</Button>
          <Button variant="ghost" icon={Flag} onClick={() => onReport(questao.id)}>Reportar</Button>
        </div>

        {confirmed ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 grid gap-3">
            <div className={cx("rounded-lg border p-4", isCorrect ? "border-emerald-500/40 bg-emerald-500/10" : "border-red-500/40 bg-red-500/10")}>
              <p className="flex items-center gap-2 font-bold text-white">
                {isCorrect ? <CheckCircle2 className="text-emerald-300" /> : <XCircle className="text-red-300" />}
                {isCorrect ? "Correto" : "Incorreto"} - Gabarito {String(questao.gabarito).toUpperCase()}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{questao.comentario || "Comentario ainda nao disponivel."}</p>
            </div>
            <div className="rounded-lg border-l-4 border-indigo-500 bg-indigo-500/10 p-4 text-sm text-indigo-100">
              <p className="flex items-center gap-2 font-bold"><Lightbulb size={17} />Analise da IA</p>
              <p className="mt-1 leading-relaxed">Revise {questao.assunto || questao.materia}, compare o comando da banca com o gabarito e refaca mais 5 questoes do mesmo tema antes de avancar.</p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </Card>
  );
});
QuestionCard.displayName = "QuestionCard";

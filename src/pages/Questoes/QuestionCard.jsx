import { memo, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Bookmark, BookmarkCheck, CheckCircle2, Flag, Lightbulb, XCircle } from "lucide-react";
import { Badge, Button, Card, cx } from "../../components";
import { aiService } from "../../services";

const difficultyVariant = {
  facil: "success",
  medio: "warning",
  media: "warning",
  dificil: "error",
};

const difficultyLabel = {
  facil: "Fácil",
  medio: "Média",
  media: "Média",
  dificil: "Difícil",
};

export const QuestionCard = memo(({ questao, index = 0, saved = false, inErrorBook = false, onAnswer, onSave, onAddCaderno, onReport }) => {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState(null);
  const [aiExplanation, setAiExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);
  const cardRef = useRef(null);

  const handleAnswer = useCallback((id) => {
    setSelected(id);
    setConfirmed(false);
    setResult(null);
    setAiExplanation("");
  }, []);

  const confirmAnswer = useCallback(async () => {
    if (!selected || confirmed) return;
    const next = await onAnswer(questao.id, selected);
    setResult(next);
    setConfirmed(true);
  }, [confirmed, onAnswer, questao.id, selected]);

  const goNext = useCallback(() => {
    const next = cardRef.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const explainWithAI = useCallback(async () => {
    if (explaining) return;
    setExplaining(true);
    try {
      const text = await aiService.explicarQuestao(questao, selected, questao.comentario);
      setAiExplanation(text);
    } catch {
      setAiExplanation("Não consegui gerar a explicação agora. Tente novamente em instantes.");
    } finally {
      setExplaining(false);
    }
  }, [explaining, questao, selected]);

  const isCorrect = result?.correta ?? selected === questao.gabarito;
  const difficulty = String(questao.dificuldade || "medio").toLowerCase();

  return (
    <div ref={cardRef}>
    <Card hover={false} className="overflow-hidden p-0">
      <div className="border-b border-gray-800 bg-gray-900/70 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">Questão {index + 1}</Badge>
            <Badge>{questao.banca || "Banca"}</Badge>
            <Badge variant="neutral">{questao.materiaLabel || questao.materia}</Badge>
            <Badge variant={difficultyVariant[difficulty] || "warning"}>{difficultyLabel[difficulty] || questao.dificuldade || "Média"}</Badge>
          </div>
          <div className="text-xs font-semibold text-gray-500">{questao.concursoLabel || questao.concurso || "Concurso"}</div>
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
                  !confirmed && selectedThis && "border-royal bg-royal text-white shadow-sm shadow-blue-950/20",
                  !confirmed && !selectedThis && "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400 hover:bg-royal/10",
                  correctThis && "border-emerald-500 bg-emerald-50 text-slate-950",
                  wrongThis && "border-red-500 bg-red-50 text-slate-950",
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
          <Button variant={saved ? "secondary" : "ghost"} icon={saved ? BookmarkCheck : Bookmark} onClick={() => onSave(questao.id)}>{saved ? "Salva" : "Salvar"}</Button>
          {confirmed && !isCorrect ? (
            <Button variant={inErrorBook ? "secondary" : "ghost"} icon={AlertTriangle} onClick={() => onAddCaderno?.(questao.id)}>
              {inErrorBook ? "No caderno" : "Adicionar ao caderno"}
            </Button>
          ) : null}
          <Button variant="ghost" icon={Flag} onClick={() => onReport(questao.id)}>Reportar</Button>
          {confirmed ? <Button variant="secondary" icon={Lightbulb} loading={explaining} onClick={explainWithAI}>Aprovinho explica</Button> : null}
          {confirmed ? <Button variant="secondary" onClick={goNext}>Próxima questão</Button> : null}
        </div>

        {confirmed ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 grid gap-3">
            <div className={cx("rounded-lg border p-4", isCorrect ? "border-emerald-300 bg-emerald-50" : "border-red-300 bg-red-50")}>
              <div className="flex items-start gap-3">
                <div>
                  <p className="flex items-center gap-2 font-bold text-slate-950">
                    {isCorrect ? <CheckCircle2 className="text-emerald-500" /> : <XCircle className="text-red-500" />}
                    {isCorrect ? "Correto" : "Incorreto"} - Gabarito {String(questao.gabarito).toUpperCase()}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{questao.comentario || "Comentário ainda não disponível."}</p>
                </div>
              </div>
            </div>
            {aiExplanation ? <div className="rounded-lg border-l-4 border-blue-500 bg-royal/10 p-4 text-sm text-slate-700">
              <p className="flex items-center gap-2 font-bold"><Lightbulb size={17} />Análise da IA</p>
              <p className="mt-1 whitespace-pre-wrap leading-relaxed">{aiExplanation}</p>
            </div> : null}
          </motion.div>
        ) : null}
      </div>
    </Card>
    </div>
  );
});
QuestionCard.displayName = "QuestionCard";

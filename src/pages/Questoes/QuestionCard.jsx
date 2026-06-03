import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Bookmark, CheckCircle2, Flag, XCircle } from "lucide-react";
import { Badge, Button, Card, cx } from "../../components";

export const QuestionCard = memo(({ questao, onAnswer, onSave, onReport }) => {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleAnswer = useCallback((id) => {
    setSelected(id);
    setConfirmed(false);
  }, []);

  const confirmAnswer = useCallback(() => {
    if (!selected) return;
    setConfirmed(true);
    onAnswer(questao.id, selected);
  }, [onAnswer, questao.id, selected]);

  return (
    <Card>
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge>{questao.banca}</Badge>
        <Badge variant="neutral">{questao.materia}</Badge>
        <Badge variant={questao.dificuldade === "dificil" ? "error" : "warning"}>{questao.dificuldade}</Badge>
      </div>
      <p className="text-gray-100">{questao.enunciado}</p>
      <div className="mt-4 grid gap-2">
        {questao.alternativas.map((alt) => (
          <button
            key={alt.id}
            onClick={() => handleAnswer(alt.id)}
            className={cx(
              "rounded-lg border p-3 text-left text-sm transition",
              !confirmed && selected === alt.id && "border-indigo-500 bg-indigo-500/10 text-indigo-100",
              !confirmed && selected !== alt.id && "border-gray-800 bg-gray-900 text-gray-300 hover:border-indigo-400",
              confirmed && alt.correta && "border-blue-500 bg-blue-500/10 text-blue-100",
              confirmed && selected === alt.id && !alt.correta && "border-red-500 bg-red-500/10 text-red-100",
              confirmed && selected !== alt.id && !alt.correta && "border-gray-800 bg-gray-900 text-gray-400"
            )}
          >
            <span className="mr-2 font-bold">{alt.id.toUpperCase()}.</span>
            {alt.texto}
            {confirmed && alt.correta ? <CheckCircle2 className="ml-2 inline text-blue-300" size={16} /> : null}
            {confirmed && selected === alt.id && !alt.correta ? <XCircle className="ml-2 inline text-red-300" size={16} /> : null}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button disabled={!selected || confirmed} onClick={confirmAnswer}>Confirmar resposta</Button>
        <Button variant="ghost" icon={Bookmark} onClick={() => onSave(questao.id)}>Salvar</Button>
        <Button variant="ghost" icon={AlertTriangle}>Caderno de erros</Button>
        <Button variant="ghost" icon={Flag} onClick={() => onReport(questao.id)}>Reportar</Button>
      </div>
      {confirmed ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg bg-gray-900 p-4">
          <p className="font-bold text-white">
            {selected === questao.gabarito ? <CheckCircle2 className="mr-2 inline text-blue-300" /> : <XCircle className="mr-2 inline text-red-300" />}
            {selected === questao.gabarito ? "Correto!" : "Incorreto."} Gabarito: {questao.gabarito.toUpperCase()}
          </p>
          <p className="mt-2 text-sm text-gray-300">{questao.comentario}</p>
          <p className="mt-3 border-l-4 border-indigo-500 bg-indigo-500/10 p-3 text-sm text-indigo-100">IA: revise o assunto "{questao.assunto}" e refaca questoes da mesma banca.</p>
        </motion.div>
      ) : null}
    </Card>
  );
});
QuestionCard.displayName = "QuestionCard";

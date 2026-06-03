import { useCallback, useMemo, useState } from "react";
import { CheckCircle2, Flag, Play, RotateCcw, Timer, XCircle } from "lucide-react";
import { Badge, Button, Card, Select, cx } from "../../components";
import { DistributionPieChart, PerformanceChart, StudyTimeChart } from "../../charts";
import { useAsyncData, useTimer } from "../../hooks";
import { simuladosService } from "../../services";

const options = ["A", "B", "C", "D"];

function SimuladoResultado({ result, onRedo, onReview }) {
  const tone = result.percent >= 70 ? "text-blue-300" : result.percent >= 50 ? "text-amber-300" : "text-red-300";
  return (
    <div>
      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-400">Resultado final</p>
            <h1 className={cx("text-5xl font-black", tone)}>{result.percent}%</h1>
            <p className="mt-1 text-gray-300">{result.correct}/{result.total} questões corretas · tempo {result.tempo}</p>
          </div>
          <div className="flex gap-2"><Button icon={RotateCcw} onClick={onRedo}>Refazer</Button><Button variant="secondary" onClick={onReview}>Ver gabarito completo</Button></div>
        </div>
      </Card>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card><h2 className="mb-3 font-bold text-white">Acertos por matéria</h2><DistributionPieChart data={result.porMateria} /></Card>
        <Card><h2 className="mb-3 font-bold text-white">Voce vs. turma</h2><StudyTimeChart data={[{ label: "Voce", valor: result.percent }, { label: "Turma", valor: result.mediaTurma }]} /></Card>
      </div>
      <Card className="mt-4"><h2 className="mb-3 font-bold text-white">Questões</h2><div className="grid gap-2 md:grid-cols-2">{result.questoes.map((item) => <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-900 p-3 text-sm text-gray-300"><span>{item.id} · {item.materia}</span>{item.correct ? <CheckCircle2 className="text-blue-300" /> : <XCircle className="text-red-300" />}</div>)}</div></Card>
    </div>
  );
}

function SimuladoExecucao({ simulado, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const { seconds, start, stop } = useTimer(simulado.tempoMinutos * 60);
  useMemo(() => start(), [start]);
  const question = simulado.questoes[current];
  const answer = useCallback((option) => setAnswers((items) => ({ ...items, [question.id]: option })), [question.id]);
  const finish = useCallback(() => {
    stop();
    onFinish(simuladosService.calcularResultado(simulado, answers));
  }, [answers, onFinish, simulado, stop]);
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="text-2xl font-black text-white">{simulado.nome}</h1><p className="text-sm text-gray-400">Progresso {current + 1}/{simulado.questoes.length}</p></div>
          <Badge variant="error"><Timer size={14} /> {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</Badge>
        </div>
        <p className="rounded-lg bg-gray-900 p-4 text-gray-100">Questão {current + 1}: Em {question.materia}, analise o enunciado completo e escolha a alternativa correta conforme a banca.</p>
        <div className="mt-4 grid gap-2">{options.map((option) => <button key={option} onClick={() => answer(option)} className={cx("rounded-lg border p-3 text-left text-sm transition", answers[question.id] === option ? "border-indigo-500 bg-indigo-500/10 text-indigo-100" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-indigo-400")}>{option}. Alternativa do simulado</button>)}</div>
        <div className="mt-5 flex flex-wrap justify-between gap-2">
          <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>Anterior</Button>
          <Button variant="outline" icon={Flag} onClick={() => setMarked((items) => ({ ...items, [question.id]: !items[question.id] }))}>Marcar</Button>
          <Button variant="secondary" disabled={current === simulado.questoes.length - 1} onClick={() => setCurrent((value) => value + 1)}>Próxima</Button>
          <Button onClick={finish}>Finalizar</Button>
        </div>
      </Card>
      <Card><h2 className="mb-3 font-bold text-white">Paleta</h2><div className="grid grid-cols-5 gap-2">{simulado.questoes.map((item, index) => <button key={item.id} onClick={() => setCurrent(index)} className={cx("size-10 rounded-lg text-sm font-bold", marked[item.id] ? "bg-amber-500 text-gray-950" : answers[item.id] ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300", current === index && "ring-2 ring-indigo-300")}>{index + 1}</button>)}</div><div className="mt-4 space-y-2 text-xs text-gray-400"><p><i className="mr-2 inline-block size-3 rounded bg-gray-800" />Não visitada</p><p><i className="mr-2 inline-block size-3 rounded bg-blue-600" />Respondida</p><p><i className="mr-2 inline-block size-3 rounded bg-amber-500" />Marcada</p></div></Card>
    </div>
  );
}

export default function SimuladosPage() {
  const load = useCallback(() => simuladosService.getTemplates(), []);
  const { data: templates } = useAsyncData(load);
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);
  const evolution = useMemo(() => ["Fev", "Mar", "Abr", "Mai", "Jun"].map((label, index) => ({ label, acertos: 58 + index * 7 })), []);
  if (result) return <SimuladoResultado result={result} onRedo={() => { setResult(null); setActive(templates[0]); }} onReview={() => setResult({ ...result, review: true })} />;
  if (active) return <SimuladoExecucao simulado={active} onFinish={setResult} />;
  return <div><h1 className="mb-1 text-3xl font-black text-white">Simulados</h1><p className="mb-5 text-sm text-gray-400">Crie por edital, banca ou modo personalizado.</p><div className="grid gap-4 lg:grid-cols-3">{templates.map((template) => <Card key={template.id}><Badge>{template.modo}</Badge><h2 className="mt-3 text-xl font-bold text-white">{template.nome}</h2><div className="my-4 grid gap-3"><Select label="Matérias" options={["Todas", "Direito Constitucional", "Português", "Informática", "Raciocínio Lógico", "Administrativo"]} /><Select label="Número de questões" options={["20", "30", "40", "60"]} /><Select label="Tempo" options={["2h", "3h", "4h"]} /></div><Button icon={Play} onClick={() => setActive(template)}>Iniciar</Button></Card>)}</div><div className="mt-4 grid gap-4 xl:grid-cols-2"><Card><h2 className="mb-3 font-bold text-white">Meus simulados</h2>{templates.map((item) => <div key={item.id} className="flex justify-between border-b border-gray-800 py-2 text-sm text-gray-300"><span>{item.nome}</span><Badge variant="success">concluído</Badge></div>)}</Card><Card><h2 className="mb-3 font-bold text-white">Evolução</h2><PerformanceChart data={evolution} /></Card></div></div>;
}

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Activity, Dumbbell, Heart, Play, Target } from "lucide-react";
import { Badge, Button, Card, Input, ProgressBar, Tabs } from "../../components";
import { ExercicioCard } from "../../components/taf/ExercicioCard";

const PerformanceChart = lazy(() => import("../../charts").then((m) => ({ default: m.PerformanceChart })));
const RetentionRadarChart = lazy(() => import("../../charts").then((m) => ({ default: m.RetentionRadarChart })));
import { tafService } from "../../services/tafService";
import { useTafStore } from "../../stores";

const TAF_TESTS = [
  { tipo: "corrida", label: "Corrida", meta: 2400, unidade: "m", objetivo: "Ritmo para 12 minutos", min: 2100 },
  { tipo: "flexao", label: "Flexão", meta: 30, unidade: "rep", objetivo: "Repetições válidas", min: 20 },
  { tipo: "abdominal", label: "Abdominal", meta: 40, unidade: "rep", objetivo: "Core e resistência", min: 30 },
  { tipo: "barra", label: "Barra", meta: 8, unidade: "rep", objetivo: "Puxada e pegada", min: 5 },
];

const COMMON_TAF = [
  {
    title: "Barra fixa",
    detail: "Teste de forca para braços, costas e pegada. Em muitos editais, a prova é dinâmica para homens e estática/isometria para mulheres.",
  },
  {
    title: "Flexão de braço",
    detail: "Avalia peitoral, tríceps e estabilidade do tronco. O foco é executar repetições válidas, com amplitude e alinhamento.",
  },
  {
    title: "Abdominal",
    detail: "Geralmente aparece no formato remador ou supra. Mede resistência de core, flexores do quadril e controle de movimento.",
  },
  {
    title: "Corrida de resistência",
    detail: "Costuma cobrar corrida de 12 minutos, com referência comum de 2.400 m para homens e 2.000 m para mulheres, conforme edital.",
  },
];

const TAF_WEEK_TEMPLATE = [
  { dia: "Segunda", foco: "Corrida intervalada", tipos: ["corrida"], bloco: "6 x 400 m forte + 2 min trote", intensidade: "Alta" },
  { dia: "Terca", foco: "Forca de empurrar e core", tipos: ["flexao", "abdominal"], bloco: "5 series tecnicas sem falhar", intensidade: "Media" },
  { dia: "Quarta", foco: "Corrida continua", tipos: ["corrida"], bloco: "25 a 35 min em ritmo confortavel", intensidade: "Media" },
  { dia: "Quinta", foco: "Barra e resistencia muscular", tipos: ["barra", "flexao"], bloco: "Series submaximas com descanso completo", intensidade: "Alta" },
  { dia: "Sexta", foco: "Abdominal e mobilidade", tipos: ["abdominal"], bloco: "Volume controlado + alongamento", intensidade: "Leve" },
  { dia: "Sabado", foco: "Simulado TAF", tipos: ["corrida", "flexao", "abdominal", "barra"], bloco: "Teste na ordem do edital e registro real", intensidade: "Teste" },
];

function getLatestResult(historico = []) {
  return historico.at(-1) || {};
}

function getTafProgress(result = {}) {
  return TAF_TESTS.map((test) => {
    const value = Number(result[test.tipo] || 0);
    const percent = Math.min(100, Math.round((value / test.meta) * 100));
    const deficit = Math.max(0, test.meta - value);
    return { ...test, value, percent, deficit, approved: value >= test.min };
  });
}

function buildSmartWeek(result = {}) {
  const progress = getTafProgress(result);
  const weakest = [...progress].sort((a, b) => a.percent - b.percent).slice(0, 2).map((item) => item.tipo);
  return TAF_WEEK_TEMPLATE.map((day) => {
    const priority = day.tipos.some((tipo) => weakest.includes(tipo));
    return {
      ...day,
      priority,
      label: priority ? "Prioridade" : "Manutencao",
      progress: progress.filter((item) => day.tipos.includes(item.tipo)),
    };
  });
}

function TAFOverview() {
  const historico = useTafStore((state) => state.historico);
  const treinos = useTafStore((state) => state.treinos);
  const latest = historico.at(-1) || {};
  const line = historico.map((item) => ({ label: item.data.slice(5), acertos: item.nota, minimo: 7 }));
  const radar = TAF_TESTS.map((test) => ({
    label: test.label,
    valor: Math.min(100, ((latest[test.tipo] || 0) / test.meta) * 100),
    meta: 70,
  }));

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-gray-400">Último teste</p>
          <strong className="text-2xl text-white">{latest.data || "Não registrado"}</strong>
          <div className="mt-2"><Badge variant={(latest.nota || 0) >= 7 ? "success" : "warning"}>Nota {latest.nota || 0}</Badge></div>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Situação</p>
          <strong className="text-2xl text-blue-300">{latest.situacao || "Em treino"}</strong>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Treinos registrados</p>
          <strong className="text-3xl text-white">{treinos.length}</strong>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Meta atual</p>
          <strong className="text-xl text-white">Nota 7+</strong>
          <ProgressBar value={Math.min(100, (latest.nota || 0) * 10)} />
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card><h2 className="mb-3 font-bold text-white">Evolução da nota</h2><Suspense fallback={<div style={{ height: 200 }} />}><PerformanceChart data={line} /></Suspense></Card>
        <Card><h2 className="mb-3 font-bold text-white">Perfil físico</h2><Suspense fallback={<div style={{ height: 200 }} />}><RetentionRadarChart data={radar} /></Suspense></Card>
      </div>
    </div>
  );
}

function TAFCalculator() {
  const [values, setValues] = useState({ corrida: 0, flexao: 0, abdominal: 0, barra: 0 });
  const [saving, setSaving] = useState(false);
  const score = useMemo(
    () => Math.round((TAF_TESTS.reduce((sum, test) => sum + Math.min(10, (Number(values[test.tipo] || 0) / test.meta) * 10), 0) / TAF_TESTS.length) * 10) / 10,
    [values]
  );
  const saveResult = async () => {
    setSaving(true);
    try {
      await tafService.registrarTeste(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <h2 className="mb-3 font-bold text-white">Calculadora TAF</h2>
        {TAF_TESTS.map((test) => (
          <Input key={test.tipo} label={`${test.label} (${test.unidade})`} type="number" value={values[test.tipo]} onChange={(event) => setValues((current) => ({ ...current, [test.tipo]: event.target.value }))} />
        ))}
        <div className="mt-4 rounded-lg bg-gray-900 p-4">
          <strong className="text-2xl text-white">{score}/10</strong>
          <p className="text-sm text-gray-400">{score >= 7 ? "Aprovado" : "Abaixo da meta"} - ajuste os pontos abaixo da meta.</p>
          <ProgressBar value={score * 10} />
        </div>
        <Button className="mt-4" loading={saving} onClick={saveResult}>Salvar resultado</Button>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold text-white">Metas por prova</h2>
        <div className="grid gap-4">
          {TAF_TESTS.map((test) => (
            <ProgressBar key={test.tipo} label={`${test.label}: ${values[test.tipo]} / ${test.meta} ${test.unidade}`} value={Math.min(100, (Number(values[test.tipo]) / test.meta) * 100)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function TAFSimulator() {
  const [current, setCurrent] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(720);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState({});
  const [finalNota, setFinalNota] = useState(null);
  const [saving, setSaving] = useState(false);
  const test = TAF_TESTS[current];

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setSeconds((item) => Math.max(0, item - 1)), 1000);
    return () => clearInterval(timer);
  }, [running]);

  if (current >= TAF_TESTS.length) {
    return (
      <Card>
        <h2 className="text-3xl font-black text-blue-300">Nota final {finalNota ?? "..."} - {(finalNota ?? 0) >= 7 ? "APROVADO" : "REFAZER CICLO"}</h2>
        <Suspense fallback={<div style={{ height: 200 }} />}><RetentionRadarChart data={TAF_TESTS.map((item) => ({ label: item.label, valor: Number(results[item.tipo] || 0), meta: item.meta }))} /></Suspense>
        <Button className="mt-4" onClick={() => { setCurrent(0); setResults({}); setSeconds(720); setFinalNota(null); }}>Refazer</Button>
      </Card>
    );
  }

  const confirmCurrent = async () => {
    const nextResults = { ...results, [test.tipo]: Number(value) };
    setResults(nextResults);
    setValue(0);
    setSeconds(720);
    setRunning(false);
    if (current + 1 >= TAF_TESTS.length) {
      setSaving(true);
      try {
        const result = await tafService.registrarTeste(nextResults);
        setFinalNota(result?.nota ?? 0);
      } finally {
        setSaving(false);
      }
    }
    setCurrent((item) => item + 1);
  };

  return (
    <Card>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">{test.label}</h2>
          <p className="text-sm text-gray-400">{test.objetivo}</p>
        </div>
        <Badge variant="neutral">{current + 1}/{TAF_TESTS.length}</Badge>
      </div>
      <div className="my-5 text-center">
        <strong className="text-5xl text-white">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</strong>
        <ProgressBar value={((720 - seconds) / 720) * 100} />
      </div>
      <div className="flex gap-2">{!running ? <Button icon={Play} onClick={() => setRunning(true)}>Iniciar</Button> : <Button variant="secondary" onClick={() => setRunning(false)}>Pausar</Button>}</div>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <Input label={`Resultado (${test.unidade})`} type="number" value={value} onChange={(event) => setValue(event.target.value)} />
        <Button loading={saving} onClick={confirmCurrent}>Confirmar</Button>
      </div>
    </Card>
  );
}

function TAFPlan() {
  const setExerciciosHoje = useTafStore((state) => state.setExerciciosHoje);
  const historico = useTafStore((state) => state.historico);
  const treinos = useTafStore((state) => state.treinos);
  const [loading, setLoading] = useState(true);
  const [exercicios, setExercicios] = useState([]);
  const latest = getLatestResult(historico);
  const progress = getTafProgress(latest);
  const smartWeek = buildSmartWeek(latest);
  const readiness = Math.round(progress.reduce((sum, item) => sum + item.percent, 0) / progress.length);

  useEffect(() => {
    let alive = true;
    async function load() {
      const groups = await Promise.all(TAF_TESTS.map(async (test) => (await tafService.buscarExercicios(test.tipo)).slice(0, 1)));
      const next = groups.flat();
      if (alive) {
        setExercicios(next);
        setExerciciosHoje(next);
        setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, [setExerciciosHoje]);

  return (
    <div className="taf-plan-layout grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-white">Plano TAF da semana</h2>
            <p className="text-sm text-gray-400">Organizado por deficit real: a prioridade muda conforme seus resultados registrados.</p>
          </div>
          <Badge variant={readiness >= 80 ? "success" : readiness >= 60 ? "warning" : "error"}>{readiness}% pronto</Badge>
        </div>
        <div className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {progress.map((item) => (
            <div key={item.tipo} className="rounded-lg border border-blue-100 bg-white p-3 text-slate-900">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-sm text-slate-950">{item.label}</strong>
                <Badge variant={item.approved ? "success" : "warning"}>{item.value || 0}/{item.meta} {item.unidade}</Badge>
              </div>
              <ProgressBar value={item.percent} />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                {item.deficit ? `Faltam ${item.deficit} ${item.unidade} para meta cheia.` : "Acima da meta cheia. Manter desempenho."}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-4 grid gap-3">
          {smartWeek.map((day) => (
            <div key={day.dia} className="rounded-lg border border-blue-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-slate-950">{day.dia} - {day.foco}</strong>
                    <Badge variant={day.priority ? "warning" : "neutral"}>{day.label}</Badge>
                    <Badge variant="info">{day.intensidade}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{day.bloco}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {day.progress.map((item) => <span key={item.tipo} className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">{item.label} {item.percent}%</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">{TAF_TESTS.map((item) => <div key={item.tipo} className="h-80 w-full animate-pulse rounded-lg bg-gray-800" />)}</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">{exercicios.map((exercicio, index) => {
            const test = TAF_TESTS.find((item) => item.tipo === exercicio.tafTipo);
            return <ExercicioCard key={exercicio.id} exercicio={exercicio} index={index} onRegistrar={(tipo) => tafService.registrarTreino(tipo, latest[tipo] || 1, test?.unidade || "repeticoes")} />;
          })}</div>
        )}
      </Card>
      <div className="taf-secondary-panel grid gap-4">
        <Card>
          <h2 className="mb-3 font-bold text-white">Resultado real</h2>
          <div className="grid gap-3">
            <div className="rounded-lg border border-blue-100 bg-white p-3">
              <span className="text-xs font-bold uppercase text-slate-500">Ultimo simulado</span>
              <strong className="mt-1 block text-2xl text-slate-950">{latest.data || "Sem registro"}</strong>
              <p className="text-sm text-slate-500">Nota {latest.nota || 0} - {latest.situacao || "Em treino"}</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-white p-3">
              <span className="text-xs font-bold uppercase text-slate-500">Treinos registrados</span>
              <strong className="mt-1 block text-2xl text-slate-950">{treinos.length}</strong>
              <p className="text-sm text-slate-500">Use a calculadora ou simulador para alimentar o plano.</p>
            </div>
          </div>
        </Card>
        <Card className="taf-common-card">
          <h2 className="mb-2 font-bold text-white">O que costuma cair</h2>
          <p className="mb-4 text-sm text-gray-400">Os exercicios variam por cargo, estado e edital. Estes sao os mais frequentes em concursos policiais.</p>
          <div className="grid gap-3">
            {COMMON_TAF.map((item) => (
              <div key={item.title} className="taf-common-item">
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Checklist de prova</h2>
          <div className="grid gap-3">
            {TAF_TESTS.map((test) => (
              <div key={test.tipo} className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-white">{test.label}</strong>
                  <Badge variant="neutral">{test.meta} {test.unidade}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-400">{test.objetivo}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Ciclo recomendado</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <p><Activity className="mr-2 inline text-blue-300" size={16} />2 dias de corrida intervalada ou ritmo.</p>
            <p><Dumbbell className="mr-2 inline text-blue-300" size={16} />2 dias de forca para flexao, abdominal e barra.</p>
            <p><Target className="mr-2 inline text-blue-300" size={16} />1 simulado TAF por semana, sempre registrando resultado.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TAFTips() {
  const dicas = useTafStore((state) => state.dicas);
  const [favorites, setFavorites] = useState([]);
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{dicas.map((item) => <Card key={item.id}><Badge>{item.tipo}</Badge><h2 className="mt-3 font-bold text-white">{item.titulo}</h2><p className="text-sm text-gray-400">{item.resumo}</p><button className="mt-4 text-gray-300" aria-label="Favoritar dica" onClick={() => setFavorites((items) => items.includes(item.id) ? items.filter((id) => id !== item.id) : [...items, item.id])}><Heart fill={favorites.includes(item.id) ? "currentColor" : "none"} /></button></Card>)}</div>;
}

export default function TAFPage() {
  const [tab, setTab] = useState("Plano");
  const tabs = ["Plano", "Visao geral", "Simulador", "Calculadora", "Dicas"];
  return (
    <div className="taf-page">
      <div className="taf-header mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black text-white"><Dumbbell /> TAF</h1>
          <p className="text-sm text-gray-400">Treino focado nos testes fisicos de concursos: corrida, flexao, abdominal e barra.</p>
        </div>
        <Badge variant="success">Exercicios com GIF</Badge>
      </div>
      <div className="taf-tabs">
        <Tabs items={tabs} activeTab={tab} onChange={setTab} />
      </div>
      <div className="taf-content mt-4">
        {tab === "Plano" ? <TAFPlan /> : null}
        {tab === "Visao geral" ? <TAFOverview /> : null}
        {tab === "Simulador" ? <TAFSimulator /> : null}
        {tab === "Calculadora" ? <TAFCalculator /> : null}
        {tab === "Dicas" ? <TAFTips /> : null}
      </div>
    </div>
  );
}

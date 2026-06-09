import { useEffect, useMemo, useState } from "react";
import { Activity, Dumbbell, Heart, Play, Target } from "lucide-react";
import { Badge, Button, Card, Input, ProgressBar, Tabs } from "../../components";
import { ExercicioCard } from "../../components/taf/ExercicioCard";
import { PerformanceChart, RetentionRadarChart } from "../../charts";
import { tafService } from "../../services/tafService";
import { useTafStore } from "../../stores";

const TAF_TESTS = [
  { tipo: "corrida", label: "Corrida", meta: 2400, unidade: "m", objetivo: "Ritmo para 12 minutos" },
  { tipo: "flexao", label: "Flexao", meta: 30, unidade: "rep", objetivo: "Repeticoes validas" },
  { tipo: "abdominal", label: "Abdominal", meta: 40, unidade: "rep", objetivo: "Core e resistencia" },
  { tipo: "barra", label: "Barra", meta: 8, unidade: "rep", objetivo: "Puxada e pegada" },
];

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
          <p className="text-sm text-gray-400">Ultimo teste</p>
          <strong className="text-2xl text-white">{latest.data || "Nao registrado"}</strong>
          <div className="mt-2"><Badge variant={(latest.nota || 0) >= 7 ? "success" : "warning"}>Nota {latest.nota || 0}</Badge></div>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Situacao</p>
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
        <Card><h2 className="mb-3 font-bold text-white">Evolucao da nota</h2><PerformanceChart data={line} /></Card>
        <Card><h2 className="mb-3 font-bold text-white">Perfil fisico</h2><RetentionRadarChart data={radar} /></Card>
      </div>
    </div>
  );
}

function TAFCalculator() {
  const registrarTeste = useTafStore((state) => state.registrarTeste);
  const [values, setValues] = useState({ corrida: 2400, flexao: 30, abdominal: 40, barra: 8 });
  const score = useMemo(
    () => Math.round((TAF_TESTS.reduce((sum, test) => sum + Math.min(10, (Number(values[test.tipo] || 0) / test.meta) * 10), 0) / TAF_TESTS.length) * 10) / 10,
    [values]
  );

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
        <Button className="mt-4" onClick={() => registrarTeste(values)}>Salvar resultado</Button>
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
  const registrarTeste = useTafStore((state) => state.registrarTeste);
  const [current, setCurrent] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(720);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState({});
  const [finalNota, setFinalNota] = useState(null);
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
        <RetentionRadarChart data={TAF_TESTS.map((item) => ({ label: item.label, valor: Number(results[item.tipo] || 0), meta: item.meta }))} />
        <Button className="mt-4" onClick={() => { setCurrent(0); setResults({}); setSeconds(720); setFinalNota(null); }}>Refazer</Button>
      </Card>
    );
  }

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
        <Button onClick={() => {
          const nextResults = { ...results, [test.tipo]: Number(value) };
          setResults(nextResults);
          setValue(0);
          setSeconds(720);
          setRunning(false);
          if (current + 1 >= TAF_TESTS.length) setFinalNota(registrarTeste(nextResults));
          setCurrent((item) => item + 1);
        }}>Confirmar</Button>
      </div>
    </Card>
  );
}

function TAFPlan() {
  const setExerciciosHoje = useTafStore((state) => state.setExerciciosHoje);
  const [loading, setLoading] = useState(true);
  const [exercicios, setExercicios] = useState([]);

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
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-white">Exercicios reais do TAF</h2>
            <p className="text-sm text-gray-400">Selecionados apenas para corrida, flexao, abdominal e barra. Sem treino aleatorio de academia.</p>
          </div>
          <Badge variant="success">GIFs ExerciseDB</Badge>
        </div>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">{TAF_TESTS.map((item) => <div key={item.tipo} className="h-80 w-full animate-pulse rounded-lg bg-gray-800" />)}</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">{exercicios.map((exercicio, index) => <ExercicioCard key={exercicio.id} exercicio={exercicio} index={index} onRegistrar={(tipo) => tafService.registrarTreino(tipo, 1)} />)}</div>
        )}
      </Card>
      <div className="grid gap-4">
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
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black text-white"><Dumbbell /> TAF</h1>
          <p className="text-sm text-gray-400">Treino focado nos testes fisicos de concursos: corrida, flexao, abdominal e barra.</p>
        </div>
        <Badge variant="success">Exercicios com GIF</Badge>
      </div>
      <Tabs items={tabs} activeTab={tab} onChange={setTab} />
      <div className="mt-4">
        {tab === "Plano" ? <TAFPlan /> : null}
        {tab === "Visao geral" ? <TAFOverview /> : null}
        {tab === "Simulador" ? <TAFSimulator /> : null}
        {tab === "Calculadora" ? <TAFCalculator /> : null}
        {tab === "Dicas" ? <TAFTips /> : null}
      </div>
    </div>
  );
}

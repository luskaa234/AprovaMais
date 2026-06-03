import { useCallback, useState } from "react";
import { Dumbbell, Heart, Play } from "lucide-react";
import { Badge, Button, Card, Input, ProgressBar, Select, Tabs, cx } from "../../components";
import { PerformanceChart, RetentionRadarChart } from "../../charts";
import { Modal } from "../../modals";
import { useAsyncData, useTimer } from "../../hooks";
import { tafService } from "../../services";

function TAFOverview({ historico }) {
  const latest = historico.at(-1) || {};
  const line = historico.map((item) => ({ label: item.data.slice(5), acertos: item.nota, minimo: 7 }));
  const radar = [{ label: "Corrida", valor: 82, meta: 70 }, { label: "Flexão", valor: 76, meta: 70 }, { label: "Abdominal", valor: 88, meta: 70 }, { label: "Barra", valor: 64, meta: 70 }, { label: "Natacao", valor: 72, meta: 70 }];
  return <div className="grid gap-4"><div className="grid gap-4 md:grid-cols-4"><Card><p className="text-sm text-gray-400">Último teste</p><strong className="text-2xl text-white">{latest.data}</strong><Badge variant="success">Nota {latest.nota}</Badge></Card><Card><p className="text-sm text-gray-400">Situação</p><strong className="text-2xl text-blue-300">APROVADO</strong></Card><Card><p className="text-sm text-gray-400">Dias até a prova</p><strong className="text-3xl text-white">137</strong></Card><Card><p className="text-sm text-gray-400">Treinos este mês</p><strong className="text-xl text-white">12 de 16</strong><ProgressBar value={75} /></Card></div><div className="grid gap-4 xl:grid-cols-2"><Card><h2 className="mb-3 font-bold text-white">Evolução da nota</h2><PerformanceChart data={line} /></Card><Card><h2 className="mb-3 font-bold text-white">Perfil físico</h2><RetentionRadarChart data={radar} /></Card></div><Card><h2 className="mb-3 font-bold text-white">Histórico de testes</h2>{historico.map((item) => <details key={item.id} className="border-b border-gray-800 py-2 text-sm text-gray-300"><summary className="cursor-pointer">{item.data} · {item.concurso} · nota {item.nota} · {item.situacao}</summary><div className="mt-2 flex flex-wrap gap-3 text-gray-400"><span>Corrida: {item.corrida}m</span><span>Flexão: {item.flexao}</span><span>Abdominal: {item.abdominal}</span><Button size="sm">Repetir simulado</Button></div></details>)}</Card></div>;
}

function TAFSimulator({ editais }) {
  const [editalId, setEditalId] = useState("pmsp");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const edital = editais.find((item) => item.id === editalId) || editais[0];
  const prova = edital?.provas[current];
  const { seconds, running, start, stop, reset } = useTimer(prova?.tempo || 60);
  const calc = value ? tafService.calcularPontuacao(prova, Number(value)) : null;
  const final = started && current >= edital.provas.length;
  if (final) return <Card><h2 className="text-3xl font-black text-blue-300">Nota total 8.4 · APROVADO</h2><RetentionRadarChart data={results.map((item) => ({ label: item.nome, valor: item.pontos * 10, meta: 70 }))} /><div className="mt-3 grid gap-2">{results.map((item) => <div key={item.nome} className="flex justify-between rounded-lg bg-gray-900 p-3 text-sm text-gray-300"><span>{item.nome}: {item.valor}</span><Badge variant={item.pontos ? "success" : "error"}>{item.situacao}</Badge></div>)}</div><div className="mt-4 flex gap-2"><Button>Salvar no histórico</Button><Button variant="secondary">Ver plano sugerido</Button><Button variant="ghost" onClick={() => { setStarted(false); setCurrent(0); setResults([]); }}>Refazer</Button></div></Card>;
  return <Card><div className="mb-4 grid gap-3 md:grid-cols-4"><Select label="Concurso" options={editais.map((item) => ({ value: item.id, label: item.nome }))} value={editalId} onChange={(event) => setEdictalSafe(event.target.value, setEditalId)} /><Select label="Sexo" options={["Masculino", "Feminino"]} /><Select label="Faixa etária" options={["18-24", "25-30", "31-35", "36+"]} />{!started ? <Button icon={Play} onClick={() => setStarted(true)}>Iniciar simulado TAF</Button> : null}</div>{started ? <div className="rounded-lg border border-gray-800 bg-gray-900 p-4"><h2 className="text-2xl font-black text-white">{prova.nome}</h2><p className="text-sm text-gray-400">Meta mínima: {prova.minimo} {prova.unidade}</p><div className="my-5 text-center"><strong className="text-5xl text-white">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</strong><ProgressBar value={((prova.tempo - seconds) / prova.tempo) * 100} /></div><div className="flex flex-wrap gap-2">{!running ? <Button onClick={start}>Iniciar prova</Button> : <Button variant="secondary" onClick={stop}>Pausar</Button>}<Button variant="ghost" onClick={() => reset(prova.tempo)}>Cancelar</Button></div><div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><Input label={`Resultado (${prova.unidade})`} type="number" value={value} onChange={(event) => setValue(event.target.value)} /> <Button onClick={() => { setResults((items) => [...items, { nome: prova.nome, valor: value, ...calc }]); setValue(""); setCurrent((item) => item + 1); stop(); }}>Confirmar resultado</Button></div>{calc ? <p className="mt-3 text-sm text-gray-300">Pontuação: {calc.pontos}/10 · {calc.situacao} · minimo {calc.minimo}</p> : null}</div> : null}</Card>;
}

function setEdictalSafe(value, setter) {
  setter(value);
}

function TAFCalculator({ editais }) {
  const [editalId, setEditalId] = useState("pmsp");
  const [provaId, setProvaId] = useState("corrida");
  const [value, setValue] = useState(2300);
  const edital = editais.find((item) => item.id === editalId) || editais[0];
  const prova = edital?.provas.find((item) => item.id === provaId) || edital?.provas[0];
  const result = prova ? tafService.calcularPontuacao(prova, Number(value)) : null;
  return <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]"><Card><h2 className="mb-3 font-bold text-white">Calculadora rápida</h2><Select label="Concurso" options={editais.map((item) => ({ value: item.id, label: item.nome }))} value={editalId} onChange={(e) => { setEdictalSafe(e.target.value, setEditalId); setProvaId(editais.find((item) => item.id === e.target.value)?.provas[0].id); }} /><Select label="Prova" options={edital?.provas.map((item) => ({ value: item.id, label: item.nome })) || []} value={provaId} onChange={(e) => setProvaId(e.target.value)} /><Input label="Resultado" type="number" value={value} onChange={(e) => setValue(e.target.value)} /><div className="mt-4 rounded-lg bg-gray-900 p-4"><strong className="text-2xl text-white">{result?.pontos}/10</strong><p className="text-sm text-gray-400">{result?.situacao} · você está {Math.abs(value - prova.minimo)} unidades {value >= prova.minimo ? "acima" : "abaixo"} do mínimo.</p><ProgressBar value={(result?.pontos || 0) * 10} /></div></Card><Card><h2 className="mb-3 font-bold text-white">Tabela de pontuação</h2>{prova?.tabela.map((row) => <div key={`${row.min}-${row.max}`} className={cx("grid grid-cols-3 border-b border-gray-800 p-3 text-sm", value >= row.min && value <= row.max ? "bg-indigo-500/10 text-indigo-100" : row.eliminatorio ? "bg-red-500/10 text-red-100" : "text-gray-300")}><span>{row.min}</span><span>{row.max}</span><strong>{row.pontos} pts</strong></div>)}</Card></div>;
}

function TAFPlan({ plano }) {
  return <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><Card><h2 className="mb-3 font-bold text-white">Calendário semanal TAF</h2><div className="grid gap-3 md:grid-cols-4">{plano[0]?.treinos.map((treino) => <label key={treino.nome} className="rounded-lg border border-gray-800 bg-orange-500/10 p-3 text-sm text-gray-200"><input type="checkbox" defaultChecked={treino.done} className="mr-2" />{treino.dia}<strong className="mt-2 block text-white">{treino.nome}</strong><Badge variant="warning">{treino.alvo}</Badge><p>{treino.duracao} min</p></label>)}</div></Card><Card><h2 className="mb-3 font-bold text-white">Progresso por prova</h2>{["Corrida", "Flexão", "Abdominal"].map((item, index) => <ProgressBar key={item} label={`${item}: atual -> meta (${54 + index * 12}% concluído)`} value={54 + index * 12} />)}<div className="mt-4 rounded-lg bg-gray-900 p-4"><strong className="text-white">Próximo treino: Corrida intervalada</strong><p className="text-sm text-gray-400">6x 400m · pausa 90s · 45 min</p><Button className="mt-3" size="sm">Marcar como concluído</Button></div></Card></div>;
}

function TAFTips({ dicas }) {
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState(null);
  const filtered = dicas.filter((item) => category === "Todos" || item.categoria === category || (category === "Favoritos" && favorites.includes(item.id)));
  return <div><div className="mb-4 flex flex-wrap gap-2">{["Todos", "Corrida", "Musculação", "Flexibilidade", "Nutrição", "Psicológico", "Técnica", "Favoritos"].map((item) => <Button key={item} size="sm" variant={category === item ? "primary" : "secondary"} onClick={() => setCategory(item)}>{item}</Button>)}</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <Card key={item.id}><Badge>{item.tipo}</Badge><h2 className="mt-3 font-bold text-white">{item.titulo}</h2><p className="text-sm text-gray-400">{item.resumo}</p><div className="mt-4 flex justify-between"><span className="text-xs text-gray-500">{item.duracao}</span><button aria-label="Favoritar dica" onClick={() => setFavorites((items) => items.includes(item.id) ? items.filter((id) => id !== item.id) : [...items, item.id])}><Heart fill={favorites.includes(item.id) ? "currentColor" : "none"} /></button></div><Button className="mt-3" size="sm" onClick={() => setModal(item)}>Abrir</Button></Card>)}</div><Modal open={!!modal} title={modal?.titulo} onClose={() => setModal(null)}><p className="text-gray-300">{modal?.resumo} Conteúdo completo simulado com orientações de preparação física.</p></Modal></div>;
}

export default function TAFPage() {
  const [tab, setTab] = useState("Visão geral");
  const loadEditais = useCallback(() => tafService.getEditais(), []);
  const loadHistorico = useCallback(() => tafService.getHistorico(), []);
  const loadPlano = useCallback(() => tafService.getPlano(), []);
  const loadDicas = useCallback(() => tafService.getDicas(), []);
  const { data: editais } = useAsyncData(loadEditais);
  const { data: historico } = useAsyncData(loadHistorico);
  const { data: plano } = useAsyncData(loadPlano);
  const { data: dicas } = useAsyncData(loadDicas);
  const tabs = ["Visão geral", "Simulador", "Calculadora", "Plano", "Dicas"];
  return <div><div className="mb-5 flex items-center justify-between"><div><h1 className="flex items-center gap-2 text-3xl font-black text-white"><Dumbbell /> TAF</h1><p className="text-sm text-gray-400">Teste de Aptidão Física integrado ao seu plano de aprovação.</p></div><Badge variant="success">Novo</Badge></div><Tabs items={tabs} activeTab={tab} onChange={setTab} /><div className="mt-4">{tab === "Visão geral" ? <TAFOverview historico={historico} /> : null}{tab === "Simulador" ? <TAFSimulator editais={editais} /> : null}{tab === "Calculadora" ? <TAFCalculator editais={editais} /> : null}{tab === "Plano" ? <TAFPlan plano={plano} /> : null}{tab === "Dicas" ? <TAFTips dicas={dicas} /> : null}</div></div>;
}

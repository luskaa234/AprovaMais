import { useCallback, useMemo, useState } from "react";
import { BarChart3, BookOpen, ClipboardList, FileText, Library, Search, Shield, Target } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, ProgressBar, Select, Tabs } from "../../components";
import { useAsyncData } from "../../hooks";
import { militarService } from "../../services/militarService";
import { useInternalRouter, useUser } from "../../contexts";

const tabs = ["Provas", "Questões", "Estatísticas", "Simulados", "Plano"];

function formatNumber(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}

function Stat({ icon: Icon, label, value, detail }) {
  return (
    <Card hover={false} className="min-h-28">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
          <strong className="mt-1 block text-2xl text-white">{value}</strong>
          {detail ? <p className="mt-1 text-xs text-gray-400">{detail}</p> : null}
        </div>
        <span className="grid size-10 place-items-center rounded-lg bg-gray-900 text-blue-300">
          <Icon size={19} />
        </span>
      </div>
    </Card>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-black text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm text-gray-400">{description}</p> : null}
    </div>
  );
}

function ExamsView({ materials, report }) {
  const rows = materials.length ? materials : report;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((item) => (
        <Card hover={false} key={item.slug}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-white">{item.titulo || `${item.orgao} ${item.cargo} ${item.ano}`}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.banca} · {item.cargo}</p>
            </div>
            <Badge variant={item.validas || item.slug ? "success" : "neutral"}>{item.validas ? "Respondível" : item.status || "Manifesto"}</Badge>
          </div>
          <div className="mt-4 grid gap-2">
            <div className="flex justify-between rounded-lg bg-gray-900 px-3 py-2 text-sm">
              <span className="text-gray-300">Questões válidas</span>
              <strong className="text-white">{formatNumber(item.validas || 0)}</strong>
            </div>
            <div className="flex justify-between rounded-lg bg-gray-900 px-3 py-2 text-sm">
              <span className="text-gray-300">Descartadas/anuladas</span>
              <strong className="text-white">{formatNumber((item.descartadas || 0) + (item.anuladas || 0))}</strong>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">{item.motivo || item.sourcePath || "Aguardando prova e gabarito definitivo no manifesto."}</p>
        </Card>
      ))}
      {!rows.length ? <EmptyState icon={Library} title="Sem provas militares" description="Rode npm run miner:militar após preencher o manifesto com prova e gabarito definitivo." /> : null}
    </div>
  );
}

function QuestionsView({ questions, disciplines }) {
  const [filters, setFilters] = useState({ discipline: "", banca: "", search: "", officialOnly: "sim" });
  const banks = useMemo(() => [...new Set(questions.map((item) => item.banca).filter(Boolean))], [questions]);
  const disciplineOptions = useMemo(() => disciplines
    .filter((item) => item.questionCount)
    .map((item) => ({ value: item.name, label: `${item.label || item.name} (${item.questionCount})` }))
    .sort((a, b) => a.label.localeCompare(b.label, "pt-BR")), [disciplines]);
  const visible = useMemo(() => questions.filter((question) => {
    if (filters.officialOnly === "sim" && !question.official) return false;
    if (filters.discipline && question.materia !== filters.discipline) return false;
    if (filters.banca && question.banca !== filters.banca) return false;
    if (filters.search && ![question.enunciado, question.materia, question.materiaLabel, question.orgao, question.concursoLabel, question.cargo].some((field) => String(field || "").toLowerCase().includes(filters.search.toLowerCase()))) return false;
    return true;
  }).slice(0, 24), [filters, questions]);

  return (
    <div>
      <Card hover={false} className="mb-4 grid gap-3 md:grid-cols-4">
        <Select label="Apenas oficiais" options={[{ label: "Sim", value: "sim" }, { label: "Não", value: "nao" }]} value={filters.officialOnly} onChange={(event) => setFilters((current) => ({ ...current, officialOnly: event.target.value }))} />
        <Select label="Matéria" placeholder="Todas" options={disciplineOptions} value={filters.discipline} onChange={(event) => setFilters((current) => ({ ...current, discipline: event.target.value }))} />
        <Select label="Banca" placeholder="Todas" options={banks} value={filters.banca} onChange={(event) => setFilters((current) => ({ ...current, banca: event.target.value }))} />
        <Input icon={Search} label="Buscar" placeholder="PMSP, Cebraspe..." value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} />
      </Card>

      <div className="space-y-3">
        {visible.map((question) => (
          <Card hover={false} key={question.id}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="success">Oficial · {question.banca}</Badge>
              <Badge variant="neutral">{question.orgao}</Badge>
              <Badge>{question.materiaLabel || question.materia}</Badge>
              <span className="text-xs text-gray-500">Q{question.numero} · gabarito {String(question.gabarito).toUpperCase()}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">{question.enunciado}</p>
          </Card>
        ))}
        {!visible.length ? <EmptyState icon={Search} title="Nenhuma questão militar encontrada" description="Preencha prova + gabarito definitivo no manifesto e rode npm run miner:militar." /> : null}
      </div>
    </div>
  );
}

function StatsView({ stats }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card hover={false}>
        <SectionTitle title="Disciplinas mais cobradas" description="Calculado apenas pelas questões oficiais importadas." />
        <div className="space-y-3">
          {stats.topDisciplines.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold text-gray-200">{item.label}</span>
                <span className="text-gray-400">{item.total}</span>
              </div>
              <ProgressBar value={item.total} max={stats.topDisciplines[0]?.total || 1} />
            </div>
          ))}
        </div>
      </Card>
      <Card hover={false}>
        <SectionTitle title="Bancas" description="Vunesp, Cebraspe, FGV, IBFC e outras conforme o manifesto crescer." />
        <div className="space-y-3">
          {stats.topBanks.map((item) => (
            <div className="flex justify-between rounded-lg bg-gray-900 p-3 text-sm" key={item.label}>
              <strong className="text-white">{item.label}</strong>
              <span className="text-gray-400">{item.total} questões</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AssetsView({ assets, navigate, type }) {
  const rows = type === "Plano" ? assets.plan.map((item) => ({ title: item, detail: "" })) : assets.simulations;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((item, index) => (
        <Card hover={false} key={item.title}>
          <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white">{index + 1}</span>
          <h3 className="mt-3 font-black text-white">{item.title}</h3>
          {item.detail ? <p className="mt-2 text-sm text-gray-400">{item.detail}</p> : null}
        </Card>
      ))}
      {type === "Plano" ? <Button icon={Target} onClick={() => navigate("plano")}>Abrir cronograma</Button> : null}
    </div>
  );
}

export default function MilitarPage() {
  const { user } = useUser();
  const { navigate } = useInternalRouter();
  const [active, setActive] = useState("Provas");
  const load = useCallback(() => militarService.getKnowledgeBase(user), [user]);
  const { data, isLoading, error } = useAsyncData(load);

  if (isLoading) return <div className="h-72 animate-pulse rounded-lg bg-gray-900" />;
  if (error || !data?.stats) return <EmptyState icon={Shield} title="Base militar indisponível" description="Rode npm run miner:militar para construir a biblioteca militar." />;

  const { materials, questions, disciplines, stats, assets } = data;

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Biblioteca militar inteligente</p>
          <h1 className="text-3xl font-black text-white">PM e carreiras militares</h1>
          <p className="mt-1 max-w-3xl text-sm text-gray-400">Provas oficiais, gabaritos definitivos, questões respondíveis e simulados por banca.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={BookOpen} variant="secondary" onClick={() => navigate("questoes")}>Treinar questões</Button>
          <Button icon={ClipboardList} onClick={() => navigate("taf")}>Abrir TAF</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Library} label="Provas no manifesto" value={formatNumber(stats.totalExams)} detail="Processadas ou aguardando gabarito" />
        <Stat icon={BookOpen} label="Questões oficiais" value={formatNumber(stats.totalOfficial)} detail="Validadas com gabarito" />
        <Stat icon={BarChart3} label="Disciplinas" value={formatNumber(disciplines.filter((item) => item.questionCount).length)} detail="Agrupadas automaticamente" />
        <Stat icon={FileText} label="Pendências" value={formatNumber(stats.pending)} detail="Sem gabarito definitivo ou previsto" />
      </div>

      <Card hover={false} className="mb-4">
        <Tabs items={tabs} activeTab={active} onChange={setActive} />
      </Card>

      {active === "Provas" ? <ExamsView materials={materials} report={stats.report} /> : null}
      {active === "Questões" ? <QuestionsView questions={questions} disciplines={disciplines} /> : null}
      {active === "Estatísticas" ? <StatsView stats={stats} /> : null}
      {active === "Simulados" ? <AssetsView type="Simulados" assets={assets} navigate={navigate} /> : null}
      {active === "Plano" ? <AssetsView type="Plano" assets={assets} navigate={navigate} /> : null}
    </div>
  );
}

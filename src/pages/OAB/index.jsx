import { useCallback, useMemo, useState } from "react";
import { BarChart3, BookOpen, CalendarDays, ClipboardList, FileText, GraduationCap, Layers, Library, Search, Sparkles, Target } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, ProgressBar, Select, Tabs } from "../../components";
import { useAsyncData } from "../../hooks";
import { oabService } from "../../services";
import { useInternalRouter, useUser } from "../../contexts";

const tabs = ["Exames", "2a Fase", "Disciplinas", "Questoes", "Estatisticas", "Simulados", "Flashcards", "Resumos", "Plano"];
const categories = ["Primeira Fase", "Segunda Fase", "Gabaritos", "Pecas Pratico-Profissionais", "Espelhos de Correcao", "Questoes"];

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

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-4">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">{eyebrow}</p> : null}
      <h2 className="text-xl font-black text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm text-gray-400">{description}</p> : null}
    </div>
  );
}

function ExamCard({ exam }) {
  return (
    <Card hover={false} className="flex min-h-64 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">{exam.label}</h3>
          <p className="mt-1 text-sm text-gray-400">{formatNumber(exam.materialCount)} materiais oficiais e {formatNumber(exam.questionCount)} questoes extraidas.</p>
        </div>
        <Badge variant={exam.questionCount ? "success" : "neutral"}>{exam.questionCount ? "Com questoes" : "Materiais"}</Badge>
      </div>
      <div className="mt-4 grid gap-2">
        {categories.map((category) => {
          const total = category === "Questoes" ? exam.questionCount : (exam.categories[category] || []).length;
          return (
            <div className="flex items-center justify-between rounded-lg bg-gray-900 px-3 py-2 text-sm" key={category}>
              <span className="text-gray-300">{category}</span>
              <strong className="text-white">{formatNumber(total)}</strong>
            </div>
          );
        })}
      </div>
      <div className="mt-auto pt-4">
        <p className="text-xs text-gray-500">Arquivos em storage/content/oab/{exam.slug}/</p>
      </div>
    </Card>
  );
}

function ExamsView({ exams }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => exams.filter((exam) => exam.label.toLowerCase().includes(query.toLowerCase())), [exams, query]);
  return (
    <div>
      <div className="mb-4 max-w-md">
        <Input icon={Search} label="Buscar exame" placeholder="46, 2010.2..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((exam) => <ExamCard key={exam.slug} exam={exam} />)}
      </div>
    </div>
  );
}

function DisciplinesView({ disciplines }) {
  const max = Math.max(...disciplines.map((item) => item.questionCount), 1);
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {disciplines.map((discipline) => (
        <Card hover={false} key={discipline.name}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-white">{discipline.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{formatNumber(discipline.questionCount)} questoes e {formatNumber(discipline.materialCount)} materiais relacionados.</p>
            </div>
            <Badge>{discipline.questionCount ? "Questoes" : "Material"}</Badge>
          </div>
          <div className="mt-4">
            <ProgressBar value={discipline.questionCount} max={max} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function SecondPhaseView({ secondPhase }) {
  const [area, setArea] = useState(secondPhase.selectedArea || "");
  const selected = useMemo(() => secondPhase.areas.find((item) => item.name === area) || secondPhase.areas.find((item) => item.total) || secondPhase.areas[0], [area, secondPhase.areas]);
  const latest = useMemo(() => (selected?.materials || []).slice(0, 18), [selected]);
  const max = Math.max(...secondPhase.areas.map((item) => item.total), 1);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={FileText} label="Materiais de 2a fase" value={formatNumber(secondPhase.total)} detail="Cadernos, padroes e espelhos" />
        <Stat icon={Target} label="Areas mapeadas" value={formatNumber(secondPhase.areas.filter((item) => item.total).length)} detail="Agrupadas automaticamente" />
        <Stat icon={ClipboardList} label="Area em foco" value="2a fase" detail={selected?.name || "Vem do onboarding quando informado"} />
        <Stat icon={BarChart3} label="Exames recentes" value={formatNumber(secondPhase.recentExams.length)} detail="Com materiais discursivos" />
      </div>

      <Card hover={false}>
        <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle title="Escolha sua area" description="A 2a fase muda por area. Os materiais abaixo acompanham a escolha." />
            <Select label="Area da 2a fase" options={secondPhase.areas.map((item) => item.name)} value={area} onChange={(event) => setArea(event.target.value)} />
            <div className="mt-4 space-y-3">
              {secondPhase.areas.map((item) => (
                <button
                  className="block w-full rounded-lg bg-gray-900 p-3 text-left transition hover:bg-gray-800"
                  key={item.name}
                  onClick={() => setArea(item.name)}
                  type="button"
                >
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <strong className="text-white">{item.name}</strong>
                    <span className="text-gray-400">{item.total}</span>
                  </div>
                  <ProgressBar value={item.total} max={max} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle title={`Treino de ${selected?.name || "2a fase"}`} description="Use caderno, padrao e espelho como ciclo de treino: escrever, comparar, corrigir." />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-3">
                <p className="text-xs font-semibold uppercase text-gray-500">Cadernos</p>
                <strong className="mt-1 block text-2xl text-white">{selected?.cadernos || 0}</strong>
              </div>
              <div className="rounded-lg bg-gray-900 p-3">
                <p className="text-xs font-semibold uppercase text-gray-500">Padroes</p>
                <strong className="mt-1 block text-2xl text-white">{selected?.padroes || 0}</strong>
              </div>
              <div className="rounded-lg bg-gray-900 p-3">
                <p className="text-xs font-semibold uppercase text-gray-500">Espelhos</p>
                <strong className="mt-1 block text-2xl text-white">{selected?.espelhos || 0}</strong>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {secondPhase.plan.map((step, index) => (
                <div className="flex items-center gap-3 rounded-lg bg-gray-900 p-3" key={step}>
                  <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white">{index + 1}</span>
                  <span className="text-sm text-gray-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card hover={false}>
        <SectionTitle title="Materiais da area" description="Lista recente para estudar a prova prático-profissional com base oficial FGV/OAB." />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((material) => (
            <a className="rounded-lg bg-gray-900 p-3 transition hover:bg-gray-800" href={material.url} key={material.id} rel="noreferrer" target="_blank">
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>{material.exam?.label}</Badge>
                <Badge variant="neutral">{material.secondPhaseKind}</Badge>
              </div>
              <h3 className="line-clamp-2 text-sm font-bold text-white">{material.titulo}</h3>
              <p className="mt-2 text-xs text-gray-500">{material.sourcePath}</p>
            </a>
          ))}
        </div>
        {!latest.length ? <EmptyState icon={FileText} title="Sem materiais nesta area" description="Escolha outra area ou rode o miner quando novos arquivos oficiais forem publicados." /> : null}
      </Card>
    </div>
  );
}

function QuestionsView({ questions, disciplines, exams }) {
  const [filters, setFilters] = useState({ discipline: "", exam: "", number: "", search: "" });
  const visible = useMemo(() => questions.filter((question) => {
    if (filters.discipline && question.materia !== filters.discipline) return false;
    if (filters.exam && question.exam?.slug !== filters.exam) return false;
    if (filters.number && String(question.number || "") !== String(filters.number)) return false;
    if (filters.search && ![question.enunciado, question.topico, question.materia].some((field) => field.toLowerCase().includes(filters.search.toLowerCase()))) return false;
    return true;
  }).slice(0, 24), [filters, questions]);

  return (
    <div>
      <Card hover={false} className="mb-4 grid gap-3 md:grid-cols-4">
        <Select label="Disciplina" placeholder="Todas" options={disciplines.map((item) => item.name)} value={filters.discipline} onChange={(event) => setFilters((current) => ({ ...current, discipline: event.target.value }))} />
        <Select label="Exame" placeholder="Todos" options={exams.filter((exam) => exam.questionCount).map((exam) => ({ label: exam.label, value: exam.slug }))} value={filters.exam} onChange={(event) => setFilters((current) => ({ ...current, exam: event.target.value }))} />
        <Input label="Numero" placeholder="1 a 80" value={filters.number} onChange={(event) => setFilters((current) => ({ ...current, number: event.target.value }))} />
        <Input icon={Search} label="Buscar" placeholder="Palavra-chave" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} />
      </Card>

      <div className="space-y-3">
        {visible.map((question) => (
          <Card hover={false} key={question.id}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>{question.exam?.label}</Badge>
              <Badge variant="neutral">{question.materia}</Badge>
              <Badge variant="warning">Q{question.number}</Badge>
              <span className="text-xs text-gray-500">Gabarito {String(question.gabarito).toUpperCase()}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">{question.enunciado}</p>
          </Card>
        ))}
        {!visible.length ? <EmptyState icon={Search} title="Nenhuma questao encontrada" description="Ajuste disciplina, exame, numero ou busca." /> : null}
      </div>
    </div>
  );
}

function StatsView({ stats }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <Card hover={false}>
        <SectionTitle title="Disciplinas mais recorrentes" description="Ranking calculado pelas questoes oficiais ja extraidas." />
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
        <SectionTitle title="Evolucao historica" description="Exames com questoes estruturadas no banco." />
        <div className="space-y-3">
          {stats.trend.map((item) => (
            <div className="rounded-lg bg-gray-900 p-3" key={item.label}>
              <div className="flex justify-between gap-3 text-sm">
                <strong className="text-white">{item.label}</strong>
                <span className="text-gray-400">{item.questions} questoes</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Maior volume: {item.mainDiscipline}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AssetsView({ type, assets }) {
  const config = {
    Simulados: { icon: ClipboardList, items: assets.simulations, titleKey: "title", textKey: "detail" },
    Flashcards: { icon: Layers, items: assets.flashcards, titleKey: "front", textKey: "back" },
    Resumos: { icon: FileText, items: assets.summaries, titleKey: "title", textKey: "text" },
  }[type];
  const Icon = config.icon;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {config.items.map((item) => (
        <Card hover={false} key={item[config.titleKey]}>
          <Icon className="mb-3 text-blue-300" size={22} />
          <h3 className="font-black text-white">{item[config.titleKey]}</h3>
          <p className="mt-2 text-sm text-gray-400">{item[config.textKey]}</p>
        </Card>
      ))}
    </div>
  );
}

function PlanView({ assets, navigate }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
      <Card hover={false}>
        <SectionTitle title="Plano OAB personalizado" description="Baseado no onboarding, dificuldades e desempenho que a plataforma registra." />
        <div className="space-y-3">
          {assets.plan.map((item, index) => (
            <div className="flex items-center gap-3 rounded-lg bg-gray-900 p-3" key={item}>
              <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white">{index + 1}</span>
              <span className="text-sm text-gray-200">{item}</span>
            </div>
          ))}
        </div>
        <Button className="mt-4" icon={CalendarDays} onClick={() => navigate("plano")}>Abrir cronograma</Button>
      </Card>
      <Card hover={false}>
        <SectionTitle title="Prioridades" description="Materias que devem guiar seus proximos blocos." />
        <div className="flex flex-wrap gap-2">
          {assets.priority.map((item) => <Badge key={item} variant="success">{item}</Badge>)}
        </div>
      </Card>
    </div>
  );
}

export default function OABPage() {
  const { user } = useUser();
  const { navigate } = useInternalRouter();
  const [active, setActive] = useState("Exames");
  const load = useCallback(() => oabService.getKnowledgeBase(user), [user]);
  const { data, isLoading, error } = useAsyncData(load);

  if (isLoading) {
    return <div className="h-72 animate-pulse rounded-lg bg-gray-900" />;
  }

  if (error || !data?.stats) {
    return <EmptyState icon={Library} title="Base OAB indisponivel" description="Rode npm run miner:oab para reconstruir a biblioteca academica." />;
  }

  const { exams, disciplines, questions, stats, assets, secondPhase } = data;

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Biblioteca academica inteligente</p>
          <h1 className="text-3xl font-black text-white">OAB</h1>
          <p className="mt-1 max-w-3xl text-sm text-gray-400">Exames oficiais, questoes, disciplinas, estatisticas, simulados e revisoes em uma base preparada para crescer automaticamente.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={BookOpen} variant="secondary" onClick={() => navigate("questoes")}>Treinar questões</Button>
          <Button icon={Library} onClick={() => navigate("biblioteca")}>Ver PDFs</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={GraduationCap} label="Exames organizados" value={formatNumber(stats.totalExams)} detail="2010.2 ate o mais recente" />
        <Stat icon={Library} label="Materiais oficiais" value={formatNumber(stats.totalMaterials)} detail="Provas, gabaritos e padroes" />
        <Stat icon={Target} label="Questoes no banco" value={formatNumber(stats.totalQuestions)} detail="Com gabarito e disciplina" />
        <Stat icon={BarChart3} label="Disciplinas mapeadas" value={formatNumber(disciplines.length)} detail="Agrupadas automaticamente" />
      </div>

      <Card hover={false} className="mb-4">
        <Tabs items={tabs} activeTab={active} onChange={setActive} />
      </Card>

      {active === "Exames" ? <ExamsView exams={exams} /> : null}
      {active === "2a Fase" ? <SecondPhaseView secondPhase={secondPhase} /> : null}
      {active === "Disciplinas" ? <DisciplinesView disciplines={disciplines} /> : null}
      {active === "Questoes" ? <QuestionsView questions={questions} disciplines={disciplines} exams={exams} /> : null}
      {active === "Estatisticas" ? <StatsView stats={stats} /> : null}
      {active === "Simulados" ? <AssetsView type="Simulados" assets={assets} /> : null}
      {active === "Flashcards" ? <AssetsView type="Flashcards" assets={assets} /> : null}
      {active === "Resumos" ? <AssetsView type="Resumos" assets={assets} /> : null}
      {active === "Plano" ? <PlanView assets={assets} navigate={navigate} /> : null}

      <Card hover={false} className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <Sparkles className="text-blue-300" size={17} />
          <span>Novos exames entram automaticamente quando o miner encontrar prova, gabarito ou padrao oficial na FGV/OAB.</span>
        </div>
      </Card>
    </div>
  );
}

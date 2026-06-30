import { BookOpen, GitBranch, HelpCircle, Layers, LifeBuoy, MessageCircleQuestion, PlayCircle, Scale } from "lucide-react";
import { Card } from "../../components";
import TourButton from "../../components/TourButton";
import { useInternalRouter } from "../../contexts";
import { routeLabels } from "../../tours/tourUtils";

const helpItems = [
  { route: "dashboard", title: "Dashboard", description: "Entenda progresso, metas, desempenho e próximas ações.", icon: BookOpen },
  { route: "plano", title: "Plano de estudos", description: "Aprenda a usar calendário, filtros, atividades e progresso semanal.", icon: PlayCircle },
  { route: "questoes", title: "Banco de questões", description: "Veja como filtrar, responder, salvar e revisar questões.", icon: HelpCircle },
  { route: "simulados", title: "Simulados", description: "Configure treinos cronometrados e acompanhe resultados.", icon: LifeBuoy },
  { route: "redacao", title: "Redação", description: "Use o editor, correção e histórico de evolução.", icon: MessageCircleQuestion },
  { route: "ia", title: "IA Aprovinho", description: "Descubra como tirar dúvidas e gerar planos com contexto.", icon: MessageCircleQuestion },
  { route: "flashcards", title: "Flashcards", description: "Revise por cards, responda antes de virar e registre acertos ou erros.", icon: Layers },
  { route: "mapas", title: "Mapas mentais", description: "Aprenda a navegar, filtrar, estudar e transformar mapas em revisão.", icon: GitBranch },
  { route: "leis", title: "Leis Secas", description: "Veja como ler artigos, grifar, anotar e praticar questões conectadas.", icon: Scale },
];

export default function AjudaPage() {
  const { route } = useInternalRouter();
  const currentLabel = routeLabels[route] || "esta página";

  return (
    <div className="mx-auto max-w-6xl pb-10 text-slate-900" data-tour="tour-ajuda-page">
      <section className="mb-5 overflow-hidden rounded-lg border border-royal/20 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-royal">Central de Ajuda</p>
              <h1 className="text-3xl font-black text-slate-950">Tutoriais guiados do VemAprovar</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Reabra o tour geral ou veja um passo a passo específico para cada área da plataforma.
              </p>
            </div>
          </div>
          <TourButton tour="app" variant="primary" showWhenCompleted>Ver Tutorial</TourButton>
        </div>
      </section>

      <section className="mb-5 rounded-lg border border-royal/20 bg-royal/10 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-black text-slate-950">Como usar esta página?</h2>
            <p className="text-sm text-slate-500">Você está em {currentLabel}. Use este botão em qualquer tela para abrir o tutorial daquela área.</p>
          </div>
          <TourButton />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {helpItems.map(({ route: itemRoute, title, description, icon: Icon }) => (
          <Card key={itemRoute} hover={false} className="border-royal/20 bg-white shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-royal/15 text-royal">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="font-black text-slate-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            </div>
            <TourButton route={itemRoute} variant="secondary">Abrir tutorial</TourButton>
          </Card>
        ))}
      </div>
    </div>
  );
}

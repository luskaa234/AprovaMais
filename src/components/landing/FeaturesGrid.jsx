import {
  BarChart3,
  MessageCircleQuestion,
  CalendarCheck,
  ClipboardCheck,
  Dumbbell,
  FileQuestion,
  FileText,
  RefreshCw,
} from "lucide-react";

const features = [
  { icon: CalendarCheck, title: "Cronograma inteligente", text: "Agenda adaptada por prazo, peso e tempo disponível." },
  { icon: RefreshCw, title: "Revisões automáticas", text: "Ciclos de revisão para voltar antes do esquecimento." },
  { icon: ClipboardCheck, title: "Simulados completos", text: "Provas por banca, tempo e nível de dificuldade." },
  { icon: FileQuestion, title: "Banco de questões", text: "Questões filtradas por matéria, assunto e desempenho." },
  { icon: FileText, title: "Redação", text: "Temas, estrutura e checklist para treino dirigido." },
  { icon: Dumbbell, title: "TAF", text: "Metas físicas para concursos que cobram teste físico." },
  { icon: MessageCircleQuestion, title: "Tira-dúvidas guiado", text: "Explicações rápidas para destravar questões e revisões." },
  { icon: BarChart3, title: "Relatórios de desempenho", text: "Evolução por disciplina, acertos e constância." },
];

function FeaturesGrid() {
  return (
    <section className="section-shell resources-section" id="recursos">
      <div className="section-heading">
        <span className="eyebrow">Recursos da plataforma</span>
        <h2>Ferramentas para estudar, medir e ajustar sua estratégia</h2>
        <p>
          Tudo conversa com seu plano: questões, revisões, simulados, relatórios,
          redação, TAF e suporte por IA.
        </p>
      </div>

      <div className="resources-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="premium-card resource-card" key={feature.title}>
              <div className="card-icon compact">
                <Icon size={22} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          );
        })}
      </div>

      <div className="resources-cta-wrap">
        <a className="btn btn-primary btn-large resources-cta" href="#como-funciona">
          Ver como funciona na prática
        </a>
      </div>
    </section>
  );
}

export default FeaturesGrid;

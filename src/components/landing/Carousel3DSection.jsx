import { BarChart3, BookOpenCheck, CalendarDays, FileCheck2, MessageCircleQuestion, Trophy } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    description: "Metas, progresso e desempenho semanal.",
    icon: BarChart3,
    color: "#2563eb",
  },
  {
    title: "Cronograma",
    description: "Plano diario por edital e prioridade.",
    icon: CalendarDays,
    color: "#60a5fa",
  },
  {
    title: "Questoes",
    description: "Treino por banca, assunto e dificuldade.",
    icon: BookOpenCheck,
    color: "#38bdf8",
  },
  {
    title: "Simulados",
    description: "Provas completas com analise de resultado.",
    icon: FileCheck2,
    color: "#0ea5e9",
  },
  {
    title: "Assistente",
    description: "Duvidas, resumos e revisoes guiadas.",
    icon: MessageCircleQuestion,
    color: "#2563eb",
  },
  {
    title: "Resultados",
    description: "Evolucao clara ate a aprovacao.",
    icon: Trophy,
    color: "#f59e0b",
  },
];

function CarouselCard({ item, index, total }) {
  const Icon = item.icon;
  const angle = (360 / total) * index;

  return (
    <article
      className="carousel-3d-card"
      style={{
        "--card-angle": `${angle}deg`,
        "--card-color": item.color,
      }}
    >
      <div className="carousel-3d-card-top">
        <span>
          <Icon size={20} />
        </span>
        <small>Aprova+</small>
      </div>
      <strong>{item.title}</strong>
      <p>{item.description}</p>
      <div className="carousel-3d-lines">
        <i />
        <i />
        <i />
      </div>
    </article>
  );
}

function Carousel3DSection() {
  return (
    <section className="section-shell carousel-3d-section">
      <div className="section-heading">
        <span className="section-kicker">Galeria 3D</span>
        <h2>Um giro pelas principais areas da plataforma.</h2>
        <p>
          Hoje os cards sao mockups. Quando as telas finais estiverem prontas,
          este carrossel pode receber screenshots reais do sistema.
        </p>
      </div>

      <div className="carousel-3d-stage" aria-label="Carrossel 3D de telas da Aprova+">
        <div className="carousel-3d-orbit">
          {items.map((item, index) => (
            <CarouselCard item={item} index={index} total={items.length} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel3DSection;

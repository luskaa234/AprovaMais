import { BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Mensal",
    price: "R$ 39",
    period: "/mês",
    description: "Para começar agora e organizar sua rotina sem compromisso longo.",
    featured: false,
  },
  {
    name: "Anual",
    price: "R$ 297",
    period: "/ano",
    description: "Melhor custo para atravessar edital, revisões, simulados e redação.",
    featured: true,
  },
];

const benefits = [
  "Cronograma inteligente por concurso",
  "Banco de questões e simulados completos",
  "Relatórios de desempenho por matéria",
  "Revisões automáticas e metas semanais",
  "Área de redação, metas e dúvidas com IA",
];

function Pricing() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".pricing-card, .pricing-benefits", {
        y: 42,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="section-shell pricing-section" id="planos" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">Planos</span>
        <h2>Escolha o ritmo e comece sua preparação</h2>
        <p>
          Assinatura com acesso completo à plataforma, recursos de planejamento
          e acompanhamento para passar em concurso.
        </p>
      </div>

      <div className="pricing-layout">
        {plans.map((plan) => (
          <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
            {plan.featured && (
              <span className="popular-badge">
                <BadgeCheck size={16} />
                Mais escolhido
              </span>
            )}
            <div className="pricing-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>
            <a className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`} href="/criar-conta">
              Assinar {plan.name.toLowerCase()}
            </a>
          </article>
        ))}

        <div className="pricing-benefits">
          <span className="eyebrow">Incluso em todos</span>
          <h3>Preparação completa em uma única assinatura</h3>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={18} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

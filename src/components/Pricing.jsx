import { BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { startCheckout } from "../services/paymentService";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "essencial",
    name: "Mensal",
    price: "R$ 39",
    period: "/mês",
    description: "Para começar agora e organizar sua rotina sem compromisso longo.",
    featured: false,
  },
  {
    id: "pro",
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
  const [loadingPlan, setLoadingPlan] = useState("");

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

  const handleCheckout = async (plan) => {
    try {
      setLoadingPlan(plan);
      await startCheckout(plan);
    } catch (error) {
      toast.error(error.message || "Não foi possível abrir o pagamento.");
      setLoadingPlan("");
    }
  };

  return (
    <section className="section-shell pricing-section" id="planos" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">Planos</span>
        <h2>Escolha o ritmo e comece sua preparação</h2>
        <p>Assinatura com acesso completo à plataforma, recursos de planejamento e acompanhamento para passar em concurso.</p>
      </div>

      <div className="pricing-layout">
        {plans.map((plan) => (
          <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
            {plan.featured ? (
              <span className="popular-badge">
                <BadgeCheck size={16} />
                Mais escolhido
              </span>
            ) : null}
            <div className="pricing-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>
            <button
              className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
              disabled={Boolean(loadingPlan)}
              onClick={() => handleCheckout(plan.id)}
              type="button"
            >
              {loadingPlan === plan.id ? "Abrindo pagamento..." : `Assinar ${plan.name.toLowerCase()}`}
            </button>
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

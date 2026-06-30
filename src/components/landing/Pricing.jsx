import { BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { startCheckout } from "../../services/paymentService";
import SlideArrowButton from "../SlideArrowButton";

const benefits = [
  "Plano por edital com revisões automáticas",
  "Banco de questões e simulados completos",
  "Relatórios de desempenho por matéria",
  "Apoio de estudos para dúvidas e revisão",
  "Área de redação, metas e TAF",
];

function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState("");

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
    <section className="section-shell landing-pricing-section" id="planos">
      <div className="section-heading">
        <span className="section-kicker">
          <ShieldCheck size={16} />
          Planos VemAprovar
        </span>
        <h2>Comece grátis. Estude com método.</h2>
      </div>

      <div className="landing-pricing-grid">
        <article
          className="landing-price-card"
        >
          <div>
            <span className="plan-eyebrow">Mensal</span>
            <h3>VemAprovar Essencial</h3>
            <p>Organize e evolua no seu ritmo.</p>
          </div>
          <div className="plan-price">
            <span>R$</span>
            39
            <small>,90/mês</small>
          </div>
          <ul>
            {benefits.slice(0, 4).map((benefit) => (
              <li key={benefit}>
                <Check size={17} />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="plan-trial-badge">7 dias grátis</div>
          <SlideArrowButton
            disabled={Boolean(loadingPlan)}
            onClick={() => handleCheckout("essencial")}
            primaryColor="#1d63c4"
            text={loadingPlan === "essencial" ? "Abrindo pagamento..." : "Começar 7 dias grátis"}
          />
        </article>

        <article
          className="landing-price-card is-featured"
        >
          <div className="plan-badge">
            <BadgeCheck size={15} />
            Mais escolhido
          </div>
          <div>
            <span className="plan-eyebrow">Anual</span>
            <h3>VemAprovar Pro</h3>
            <p>Preparo completo, preço reduzido.</p>
          </div>
          <div className="plan-price">
            <span>R$</span>
            24
            <small>,90/mês</small>
          </div>
          <p className="plan-annual-note">R$ 298,80/ano — economize R$ 179,40</p>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={17} />
                {benefit}
              </li>
            ))}
          </ul>
          <SlideArrowButton
            disabled={Boolean(loadingPlan)}
            onClick={() => handleCheckout("pro")}
            primaryColor="#1d63c4"
            text={loadingPlan === "pro" ? "Abrindo pagamento..." : "Assinar plano anual com desconto"}
          />
        </article>
      </div>
    </section>
  );
}

export default Pricing;

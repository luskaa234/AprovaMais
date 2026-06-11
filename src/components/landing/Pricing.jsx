import { motion } from "framer-motion";
import { BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { startCheckout } from "../../services/paymentService";
import SlideArrowButton from "../SlideArrowButton";

const benefits = [
  "Plano por edital com revisoes automaticas",
  "Banco de questoes e simulados completos",
  "Relatorios de desempenho por materia",
  "Apoio de estudos para duvidas e revisao",
  "Area de redacao, metas e TAF",
];

function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState("");

  const handleCheckout = async (plan) => {
    try {
      setLoadingPlan(plan);
      await startCheckout(plan);
    } catch (error) {
      toast.error(error.message || "Nao foi possivel abrir o pagamento.");
      setLoadingPlan("");
    }
  };

  return (
    <section className="section-shell landing-pricing-section" id="planos">
      <div className="section-heading">
        <span className="section-kicker">
          <ShieldCheck size={16} />
          Planos Aprova+
        </span>
        <h2>Um plano simples para estudar com metodo ate a aprovacao.</h2>
        <p>Comece com a estrutura completa da plataforma e mantenha seu preparo organizado todos os dias.</p>
      </div>

      <div className="landing-pricing-grid">
        <motion.article
          className="landing-price-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <span className="plan-eyebrow">Mensal</span>
            <h3>Aprova+ Essencial</h3>
            <p>Para quem quer organizar os estudos sem perder ritmo.</p>
          </div>
          <div className="plan-price">
            <span>R$</span>
            39
            <small>,90/mes</small>
          </div>
          <ul>
            {benefits.slice(0, 4).map((benefit) => (
              <li key={benefit}>
                <Check size={17} />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="plan-trial-badge">7 dias gratis</div>
          <SlideArrowButton
            disabled={Boolean(loadingPlan)}
            onClick={() => handleCheckout("essencial")}
            primaryColor="#2563eb"
            text={loadingPlan === "essencial" ? "Abrindo pagamento..." : "Comecar 7 dias gratis"}
          />
        </motion.article>

        <motion.article
          className="landing-price-card is-featured"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <div className="plan-badge">
            <BadgeCheck size={15} />
            Mais escolhido
          </div>
          <div>
            <span className="plan-eyebrow">Anual</span>
            <h3>Aprova+ Pro</h3>
            <p>Para uma preparacao mais longa, com acompanhamento completo.</p>
          </div>
          <div className="plan-price">
            <span>R$</span>
            24
            <small>,90/mes</small>
          </div>
          <p className="plan-annual-note">Cobrado como R$ 298,80/ano - voce economiza R$ 179,40</p>
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
            primaryColor="#2563eb"
            text={loadingPlan === "pro" ? "Abrindo pagamento..." : "Assinar plano anual com desconto"}
          />
        </motion.article>
      </div>
    </section>
  );
}

export default Pricing;

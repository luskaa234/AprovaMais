import { motion } from "framer-motion";
import { BadgeCheck, Check, ShieldCheck } from "lucide-react";
import SlideArrowButton from "../SlideArrowButton";

const benefits = [
  "Plano por edital com revisões automáticas",
  "Banco de questões e simulados completos",
  "Relatórios de desempenho por matéria",
  "Apoio de estudos para dúvidas e revisão",
  "Área de redação, metas e TAF",
];

function Pricing() {
  return (
    <section className="section-shell landing-pricing-section" id="planos">
      <div className="section-heading">
        <span className="section-kicker">
          <ShieldCheck size={16} />
          Planos Aprova+
        </span>
        <h2>Um plano simples para estudar com método até a aprovação.</h2>
        <p>
          Comece com a estrutura completa da plataforma e mantenha seu preparo
          organizado todos os dias.
        </p>
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
          <SlideArrowButton text="Começar 7 dias grátis" primaryColor="#2563eb" />
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
            <p>Para uma preparação mais longa, com acompanhamento completo.</p>
          </div>
          <div className="plan-price">
            <span>R$</span>
            24
            <small>,90/mês</small>
          </div>
          <p className="plan-annual-note">Cobrado como R$ 298,80/ano - você economiza R$ 179,40</p>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={17} />
                {benefit}
              </li>
            ))}
          </ul>
          <SlideArrowButton text="Assinar plano anual com desconto" primaryColor="#2563eb" />
        </motion.article>
      </div>
    </section>
  );
}

export default Pricing;

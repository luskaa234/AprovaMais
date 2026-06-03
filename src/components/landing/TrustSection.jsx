import { Building2, Car, Flame, Landmark, Mail, Shield, ShieldCheck } from "lucide-react";

const exams = [
  { name: "Polícia Militar", short: "PM", icon: Shield, tone: "military" },
  { name: "Polícia Civil", short: "PC", icon: Shield, tone: "civil" },
  { name: "Bombeiros", short: "CBM", icon: Flame, tone: "fire" },
  { name: "Guarda Municipal", short: "GM", icon: Shield, tone: "guard" },
  { name: "PRF", short: "PRF", icon: Shield, tone: "road" },
  { name: "PF", short: "PF", icon: Shield, tone: "federal" },
  { name: "PCDF", short: "DF", icon: Landmark, tone: "district" },
  { name: "Polícia Penal", short: "PP", icon: Shield, tone: "penal" },
  { name: "DEPEN", short: "DP", icon: Landmark, tone: "penal" },
  { name: "Agente de Trânsito", short: "AT", icon: Car, tone: "traffic" },
  { name: "Correios", short: "COR", icon: Mail, tone: "post" },
  { name: "INSS", short: "INSS", icon: Building2, tone: "social" },
];

function TrustSection() {
  return (
    <section className="section-shell trust-section">
      <div className="trust-panel">
        <div className="trust-heading">
          <img className="trust-brand-mark" src="/favicon.svg" alt="Aprova+" />
          <span className="eyebrow">
            <ShieldCheck size={15} />
            Preparação multi-edital
          </span>
          <h2>Feita para concursos que exigem constância</h2>
        </div>

        <div className="trust-grid">
          {exams.map((exam) => {
            const Icon = exam.icon;

            return (
              <article key={exam.name}>
                <span className={`exam-logo tone-${exam.tone}`} aria-label={`Logo ${exam.name}`}>
                  <Icon size={18} aria-hidden="true" />
                  <strong>{exam.short}</strong>
                </span>
                <span>{exam.name}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;

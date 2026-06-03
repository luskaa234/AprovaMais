import { Shield, ShieldCheck } from "lucide-react";

const exams = [
  "Polícia Militar",
  "Polícia Civil",
  "Bombeiros",
  "Guarda Municipal",
  "PRF",
  "PF",
  "PCDF",
  "Polícia Penal",
  "DEPEN",
  "Agente de Trânsito",
  "Correios",
  "INSS",
];

function TrustSection() {
  return (
    <section className="section-shell trust-section">
      <div className="trust-panel">
        <div>
          <span className="eyebrow">
            <ShieldCheck size={15} />
            Preparação multi-edital
          </span>
          <h2>Feita para concursos que exigem constância</h2>
        </div>

        <div className="trust-grid">
          {exams.map((exam) => (
            <article key={exam}>
              <Shield size={19} />
              <span>{exam}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;

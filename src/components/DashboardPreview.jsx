import { CheckCircle2, Clock3, Flame, Target } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const weeklyTasks = [
  "Revisar Direito Constitucional",
  "Simulado geral - bloco 02",
  "Redação: tema de atualidades",
  "Revisar raciocínio lógico",
];

const subjectPerformance = [
  { name: "Português", value: "78%" },
  { name: "Matemática", value: "64%" },
  { name: "Direito Administrativo", value: "82%" },
  { name: "Legislação", value: "71%" },
];

function DashboardPreview() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".preview-panel", {
        y: 46,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
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
    <section className="section-shell dashboard-preview-section" id="dashboard" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">Preview do dashboard</span>
        <h2>Uma central de comando para sua preparação</h2>
        <p>
          Progresso, metas, tarefas e desempenho por matéria em uma tela criada
          para decisões rápidas.
        </p>
      </div>

      <div className="preview-dashboard">
        <div className="preview-panel progress-panel">
          <div className="panel-title">
            <div>
              <span>Progresso geral</span>
              <strong>74%</strong>
            </div>
            <Target size={24} />
          </div>
          <div className="progress-ring" aria-label="Progresso geral de 74%">
            <span>74%</span>
          </div>
          <p>Ritmo acima da meta semanal em 12 pontos.</p>
        </div>

        <div className="preview-panel chart-panel">
          <div className="panel-title">
            <div>
              <span>Desempenho nos simulados</span>
              <strong>Últimas 6 semanas</strong>
            </div>
            <Flame size={24} />
          </div>
          <div className="fake-chart" aria-hidden="true">
            <span style={{ height: "42%" }} />
            <span style={{ height: "55%" }} />
            <span style={{ height: "50%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "76%" }} />
            <span style={{ height: "84%" }} />
          </div>
        </div>

        <div className="preview-panel tasks-panel">
          <div className="panel-title">
            <div>
              <span>Tarefas da semana</span>
              <strong>4 prioridades</strong>
            </div>
            <Clock3 size={24} />
          </div>
          <ul>
            {weeklyTasks.map((task) => (
              <li key={task}>
                <CheckCircle2 size={18} />
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="preview-panel performance-panel">
          <div className="panel-title">
            <div>
              <span>Desempenho por matéria</span>
              <strong>Mapa de reforço</strong>
            </div>
          </div>
          <div className="performance-list">
            {subjectPerformance.map((subject) => (
              <div className="performance-row" key={subject.name}>
                <div>
                  <span>{subject.name}</span>
                  <strong>{subject.value}</strong>
                </div>
                <div className="performance-bar" aria-label={`${subject.name}: ${subject.value}`}>
                  <span style={{ width: subject.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;

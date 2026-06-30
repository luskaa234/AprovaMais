import {
  Calculator,
  Gavel,
  Landmark,
  Laptop,
  Newspaper,
  Scale,
  ScrollText,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  { title: "Português", icon: ScrollText, detail: "Interpretação, gramática e redação oficial." },
  { title: "Matemática", icon: Calculator, detail: "Raciocínio lógico, porcentagem e problemas." },
  { title: "Direito Administrativo", icon: Gavel, detail: "Atos, poderes, agentes públicos e administração." },
  { title: "Direito Constitucional", icon: Landmark, detail: "Direitos fundamentais e organização do Estado." },
  { title: "Informática", icon: Laptop, detail: "Sistemas, segurança, internet e produtividade." },
  { title: "Atualidades", icon: Newspaper, detail: "Temas recentes com curadoria para concursos." },
  { title: "Legislação", icon: Scale, detail: "Leis específicas, estatutos e normas do edital." },
  { title: "Redação", icon: ScrollText, detail: "Estrutura, argumentos e treino com temas prováveis." },
];

function StudyCards() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".subject-card", {
        y: 42,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
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
    <section className="section-shell study-section" id="materias" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">Matérias de alta incidência</span>
        <h2>Conteúdos organizados para você passar em concurso</h2>
        <p>
          Cada disciplina entra no cronograma com prioridade, revisão e treino
          por desempenho, para você estudar o que mais aproxima da aprovação.
        </p>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => {
          const Icon = subject.icon;

          return (
            <Tilt
              key={subject.title}
              tiltMaxAngleX={7}
              tiltMaxAngleY={7}
              glareEnable
              glareMaxOpacity={0.12}
              className="tilt-card"
            >
              <article className="premium-card subject-card">
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <h3>{subject.title}</h3>
                <p>{subject.detail}</p>
              </article>
            </Tilt>
          );
        })}
      </div>
    </section>
  );
}

export default StudyCards;

import {
  BarChart3,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  FileQuestion,
  FileText,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const planBenefits = [
  {
    icon: Target,
    title: "Edital convertido em rota",
    text: "A plataforma transforma matérias, pesos e prazos em uma sequência clara de estudo.",
  },
  {
    icon: RefreshCw,
    title: "Revisões no momento certo",
    text: "Os ciclos voltam automaticamente antes do esquecimento virar perda de desempenho.",
  },
  {
    icon: ClipboardCheck,
    title: "Simulados com diagnóstico",
    text: "Cada simulado mostra onde ganhar pontos e quais temas exigem reforço imediato.",
  },
];

const resources = [
  { icon: CalendarCheck, title: "Cronograma inteligente", text: "Agenda adaptada por prazo, peso e tempo disponível." },
  { icon: RefreshCw, title: "Revisões automáticas", text: "Ciclos de 24h, 7 dias e 30 dias para fixação." },
  { icon: ClipboardCheck, title: "Simulados completos", text: "Provas por banca, tempo e nível de dificuldade." },
  { icon: FileQuestion, title: "Banco de questões", text: "Questões filtradas por matéria, assunto e desempenho." },
  { icon: BarChart3, title: "Relatórios de desempenho", text: "Evolução por disciplina, acertos e constância." },
  { icon: FileText, title: "Área de redação", text: "Temas, estrutura e checklist para treino dirigido." },
  { icon: Target, title: "Metas de aprovação", text: "Objetivos semanais para manter constância até a prova." },
  { icon: Brain, title: "IA para tirar dúvidas", text: "Explicações rápidas para destravar questões e revisões." },
];

function Features() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".plan-copy, .benefit-card, .resource-card", {
        y: 38,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="features-section" id="recursos" ref={sectionRef}>
      <div className="section-shell plan-section">
        <div className="plan-copy">
          <span className="eyebrow">
            <Sparkles size={15} />
            Da desorganização ao plano perfeito
          </span>
          <h2>Seu edital deixa de ser uma lista enorme e vira uma rotina possível</h2>
          <p>
            A Aprova+ organiza edital, matérias, revisões e simulados em um
            plano de ataque contínuo. Você enxerga o que estudar hoje, o que
            revisar amanhã e onde precisa recuperar pontos antes da prova.
          </p>
        </div>

        <div className="benefits-grid">
          {planBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article className="premium-card benefit-card" key={benefit.title}>
                <div className="card-icon">
                  <Icon size={23} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="section-shell resources-section">
        <div className="section-heading">
          <span className="eyebrow">Recursos da plataforma</span>
          <h2>Ferramentas para estudar, medir e ajustar sua estratégia</h2>
          <p>
            Tudo conversa com o seu plano: questões, revisões, simulados,
            relatórios, redação, metas e suporte por IA.
          </p>
        </div>

        <div className="resources-grid">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <article className="premium-card resource-card" key={resource.title}>
                <div className="card-icon compact">
                  <Icon size={22} />
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;

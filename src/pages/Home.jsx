import {
  BadgeCheck,
  BookOpenCheck,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Dumbbell,
  FileQuestion,
  FileText,
  HelpCircle,
  Layers3,
  MessageCircleQuestion,
  RefreshCw,
  Scale,
  Shield,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import Navbar from "../components/Navbar";
import AiPreview from "../components/landing/AiPreview";
import FlashcardsFlipStack from "../components/landing/FlashcardsFlipStack";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HeroVideoSection from "../components/landing/HeroVideoSection";
import Pricing from "../components/landing/Pricing";

const contests = [
  { sigla: "PM", nome: "Polícia Militar", icon: Shield },
  { sigla: "CBM", nome: "Bombeiros", icon: ShieldCheck },
  { sigla: "PC", nome: "Polícia Civil", icon: BadgeCheck },
  { sigla: "PP", nome: "Polícia Penal", icon: Shield },
  { sigla: "PRF", nome: "Polícia Rodoviária Federal", icon: Target },
  { sigla: "OAB", nome: "Ordem dos Advogados", icon: Scale },
];

const contestLogos = {
  PM: { src: "/logos/concursos/pm-ma.png", alt: "Polícia Militar do Maranhão" },
  CBM: { src: "/logos/concursos/cbm-mt.png", alt: "Corpo de Bombeiros Militar de Mato Grosso" },
  PC: { src: "/logos/concursos/pc-ma.png", alt: "Polícia Civil do Maranhão" },
  PP: { src: "/logos/concursos/policia-penal.png", alt: "Polícia Penal" },
  PRF: { src: "/logos/concursos/prf.png", alt: "Polícia Rodoviária Federal" },
  OAB: { src: "/logos/concursos/oab.png", alt: "OAB Nacional" },
};

const features = [
  { icon: FileQuestion, title: "Banco de questões", text: "+3.000 questões reais, com gabarito." },
  { icon: ClipboardList, title: "Simulados", text: "Provas cronometradas por banca e nível." },
  { icon: CalendarCheck, title: "Plano de estudos", text: "Cronograma por edital, no seu ritmo." },
  { icon: RefreshCw, title: "Revisão inteligente", text: "Revise antes de esquecer." },
  { icon: Layers3, title: "Flashcards", text: "Fixe conceitos, leis e erros." },
  { icon: Scale, title: "Leis secas", text: "Texto oficial com grifos e questões." },
  { icon: Dumbbell, title: "TAF", text: "Corrida, flexão, abdominal e evolução." },
  { icon: MessageCircleQuestion, title: "Aprovinho IA", text: "Dúvidas, explicações e plano de estudos." },
  { icon: Brain, title: "Mapas mentais", text: "Resumos visuais por matéria." },
  { icon: FileText, title: "Redação", text: "Escrita com correção e histórico." },
];

const steps = [
  { icon: Target, title: "Escolha seu concurso", text: "Foque no que cai no seu edital." },
  { icon: CalendarCheck, title: "Monte seu plano", text: "Teoria, questões, revisão e TAF na semana." },
  { icon: BookOpenCheck, title: "Treine com questões", text: "Provas reais, filtradas por banca e matéria." },
  { icon: Trophy, title: "Acompanhe a evolução", text: "Acertos, constância e próximos passos." },
];

const differentials = [
  "Questões oficiais de provas reais, não inventadas por IA.",
  "TAF integrado à teoria, na mesma plataforma.",
  "Leis secas por artigo, com questões vinculadas.",
  "Plano por edital e data da prova.",
  "IA tutora dentro da rotina de estudo.",
];

const faqs = [
  {
    question: "As questões são de verdade?",
    answer: "Sim. O banco usa questões oficiais de provas reais, com banca, ano, gabarito e comentários quando disponíveis.",
  },
  {
    question: "Funciona para qual concurso?",
    answer: "Hoje o foco é OAB e carreiras policiais ou militares: PM, CBM, Polícia Civil, Polícia Penal e PRF.",
  },
  {
    question: "Preciso pagar para testar?",
    answer: "Não. Você começa com 7 dias grátis para conhecer plano, questões, simulados, revisão, TAF e IA.",
  },
  {
    question: "Tem app?",
    answer: "Funciona no celular e no computador. Também pode ser instalado na tela inicial como PWA.",
  },
  {
    question: "O Aprovinho substitui professor ou edital?",
    answer: "Não. Ele ajuda a explicar, organizar e revisar, mas o estudo continua baseado em edital, provas reais e fontes oficiais.",
  },
];

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="honest-section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="honest-landing">
        <Hero />

        <HeroVideoSection />

        <section className="honest-section honest-contests" id="concursos">
          <SectionHeading eyebrow="Concursos atendidos" title="Foco no seu concurso" />
          <div className="honest-contest-grid">
            {contests.map(({ sigla, nome }) => (
              <article className="honest-contest-card" key={sigla}>
                <span className="honest-contest-logo-wrap">
                  <img className="honest-contest-logo" src={contestLogos[sigla].src} alt={contestLogos[sigla].alt} loading="lazy" />
                </span>
                <strong>{sigla}</strong>
                <p>{nome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="honest-section" id="recursos">
          <SectionHeading eyebrow="Recursos" title="Uma plataforma. Tudo que precisa." />
          <div className="honest-feature-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <article className="honest-feature-card" key={title}>
                <span><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <FlashcardsFlipStack />

        <AiPreview />

        <section className="honest-section" id="como-funciona">
          <SectionHeading eyebrow="Como funciona" title="Ciclo simples. Resultado real." />
          <div className="honest-steps">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article className="honest-step-card" key={title}>
                <small>{index + 1}</small>
                <span><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="honest-section honest-differentials" id="diferenciais">
          <SectionHeading eyebrow="Por que VemAprovar" title="Diferente onde importa" />
          <div className="honest-differential-box">
            <div>
              {differentials.map((item) => (
                <p key={item}>
                  <CheckCircle2 size={20} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <Pricing />

        <section className="honest-section honest-faq" id="faq">
          <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" />
          <div className="honest-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span><HelpCircle size={18} />{faq.question}</span>
                  <CheckCircle2 size={18} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

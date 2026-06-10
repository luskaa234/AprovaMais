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
  Sparkles,
  Target,
  Timer,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FlashcardsFlipStack from "../components/landing/FlashcardsFlipStack";
import Footer from "../components/landing/Footer";
import HeroVideoSection from "../components/landing/HeroVideoSection";
import mascotWelcome from "../assets/mascote/mascote-boas-vindas.png";
import mascotCelebration from "../assets/mascote/mascote-comemoracao.png";

const contests = [
  { sigla: "PM", nome: "Polícia Militar", icon: Shield },
  { sigla: "CBM", nome: "Bombeiros", icon: ShieldCheck },
  { sigla: "PC", nome: "Polícia Civil", icon: BadgeCheck },
  { sigla: "PP", nome: "Polícia Penal", icon: Shield },
  { sigla: "PRF", nome: "Polícia Rodoviária Federal", icon: Target },
  { sigla: "OAB", nome: "Ordem dos Advogados", icon: Scale },
];

const features = [
  { icon: FileQuestion, title: "Banco de questões oficiais", text: "+3.000 questões de provas reais, com gabarito e comentário." },
  { icon: ClipboardList, title: "Simulados", text: "Provas cronometradas por banca, nível e objetivo." },
  { icon: CalendarCheck, title: "Plano de estudos", text: "Cronograma por edital que se adapta ao seu tempo." },
  { icon: RefreshCw, title: "Central de revisão", text: "Revise no momento certo, antes de esquecer." },
  { icon: Layers3, title: "Flashcards", text: "Memorização ativa para conceitos, leis e erros recorrentes." },
  { icon: Scale, title: "Leis secas", text: "CF, códigos e estatutos com texto oficial, grifos e questões por artigo." },
  { icon: Dumbbell, title: "TAF", text: "Treino físico com metas para corrida, flexão, abdominal e evolução real." },
  { icon: MessageCircleQuestion, title: "Aprovinho IA", text: "Tira dúvidas, explica questões e ajuda a montar seu plano." },
  { icon: Brain, title: "Mapas mentais", text: "Resumos visuais por matéria para revisão rápida." },
  { icon: FileText, title: "Redação", text: "Treino de escrita com correção, histórico e evolução." },
];

const steps = [
  { icon: Target, title: "Escolha seu concurso", text: "Defina OAB ou carreira policial e mantenha o foco no que cai." },
  { icon: CalendarCheck, title: "Monte seu plano", text: "Organize teoria, questões, revisão, simulados e TAF na semana." },
  { icon: BookOpenCheck, title: "Treine com questões", text: "Resolva provas reais, revise erros e filtre por banca ou matéria." },
  { icon: Trophy, title: "Acompanhe a evolução", text: "Veja acertos, constância, pontos fracos e próximos passos." },
];

const differentials = [
  "Questões oficiais de provas reais, não inventadas por IA.",
  "TAF integrado para treinar o físico junto com a teoria.",
  "Leis secas conectadas às questões por artigo.",
  "Plano de estudos por edital, data da prova e tempo disponível.",
  "Aprovinho IA como tutor dentro da rotina de estudo.",
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
        <section className="honest-hero" id="inicio">
          <div className="honest-hero-content">
            <span className="honest-kicker">
              <Sparkles size={16} />
              7 dias grátis para começar com método
            </span>
            <h1>Passe em concursos com método, não com sorte.</h1>
            <p>
              Planeje por edital, resolva questões oficiais, treine o TAF e acompanhe
              sua evolução com IA, tudo num lugar só.
            </p>
            <div className="honest-hero-actions">
              <Link className="honest-btn honest-btn-primary" to="/criar-conta">
                Começar 7 dias grátis
              </Link>
              <a className="honest-btn honest-btn-secondary" href="#como-funciona">
                Ver como funciona
              </a>
            </div>
            <div className="honest-proof">
              <ShieldCheck size={18} />
              <strong>+3.000 questões oficiais</strong>
              <span>de provas reais para OAB e carreiras policiais</span>
            </div>
          </div>

          <div className="honest-hero-media" aria-label="Mascote Aprovinho">
            <img src={mascotWelcome} alt="Aprovinho, mascote do Aprova+" />
          </div>
        </section>

        <HeroVideoSection />

        <section className="honest-section honest-contests" id="concursos">
          <SectionHeading eyebrow="Feita para carreiras policiais e OAB" title="Foco no que você vai prestar">
            Conteúdo organizado para os objetivos que a plataforma realmente atende hoje.
          </SectionHeading>
          <div className="honest-contest-grid">
            {contests.map(({ sigla, nome, icon: Icon }) => (
              <article className="honest-contest-card" key={sigla}>
                <span><Icon size={22} /></span>
                <strong>{sigla}</strong>
                <p>{nome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="honest-section" id="recursos">
          <SectionHeading eyebrow="Tudo que você precisa" title="Uma plataforma, a preparação completa">
            Recursos reais do Aprova+ para estudar, treinar, revisar e medir progresso.
          </SectionHeading>
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

        <section className="honest-section" id="como-funciona">
          <SectionHeading eyebrow="Como funciona" title="Um ciclo simples para estudar com precisão">
            Sem promessa mágica: você escolhe o alvo, segue o plano, pratica e ajusta pelo desempenho.
          </SectionHeading>
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
          <SectionHeading eyebrow="Por que Aprova+" title="Diferente onde importa">
            O diferencial está no que ajuda o aluno a evoluir de verdade.
          </SectionHeading>
          <div className="honest-differential-box">
            <div>
              {differentials.map((item) => (
                <p key={item}>
                  <CheckCircle2 size={20} />
                  {item}
                </p>
              ))}
            </div>
            <img src={mascotCelebration} alt="Aprovinho comemorando uma conquista" />
          </div>
        </section>

        <section className="honest-trial" id="planos">
          <div>
            <span><Timer size={17} /> Teste grátis</span>
            <h2>Experimente 7 dias grátis</h2>
            <p>Acesso completo. Sem compromisso. Cancele quando quiser.</p>
          </div>
          <Link className="honest-btn honest-btn-light" to="/criar-conta">
            Começar agora
          </Link>
        </section>

        <section className="honest-section honest-faq" id="faq">
          <SectionHeading eyebrow="FAQ" title="Perguntas frequentes">
            Respostas diretas antes de criar sua conta.
          </SectionHeading>
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

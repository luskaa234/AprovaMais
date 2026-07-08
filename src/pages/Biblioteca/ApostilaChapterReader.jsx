import { memo, useMemo, useState } from "react";
import { AlertTriangle, BookOpenCheck, Brain, CheckCircle2, ChevronLeft, ChevronRight, Clock, Layers3, ListChecks, MessageSquareText, Send, StickyNote, Target } from "lucide-react";
import { Button, cx } from "../../components";
import { aiService } from "../../services";
import { useApostilaStore } from "../../stores";

const answerLetters = ["A", "B", "C", "D", "E"];
const judgmentOptions = [
  { label: "Certo", value: true },
  { label: "Errado", value: false },
];

function formatLabel(value = "") {
  return String(value).replace(/_/g, " ");
}

function renderValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") return Object.values(value).join(" | ");
  return value;
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function firstValue(value) {
  return asArray(value).find(Boolean);
}

function normalizeTextList(value) {
  return asArray(value).flatMap((item) => {
    if (!item) return [];
    if (typeof item === "string") return [item];
    if (typeof item === "object") return Object.values(item).filter(Boolean).map(String);
    return [String(item)];
  });
}

function normalizeExplanation(value) {
  return asArray(value).flatMap((item) => {
    if (!item) return [];
    if (typeof item === "string") return [{ titulo: "Explicacao", texto: item }];
    if (typeof item === "object") {
      const titulo = item.titulo || item.title || item.nome || "Explicacao";
      const texto = item.texto || item.descricao || item.conteudo || item.explicacao || Object.values(item).filter((entry) => typeof entry === "string").join(" ");
      return texto ? [{ titulo, texto }] : [];
    }
    return [{ titulo: "Explicacao", texto: String(item) }];
  });
}

function normalizeQuickChecks(value) {
  return asArray(value).flatMap((item) => {
    if (!item) return [];
    if (typeof item === "string") return [{ pergunta: "Check rapido", resposta: item }];
    if (typeof item === "object") return [item];
    return [{ pergunta: "Check rapido", resposta: String(item) }];
  });
}

function normalizeMindMap(map) {
  if (!map) return null;

  if (Array.isArray(map)) {
    return {
      centro: "Mapa mental",
      ramos: map.map((item) => ({ titulo: String(item), itens: [] })),
    };
  }

  if (typeof map !== "object") {
    return {
      centro: "Mapa mental",
      ramos: [{ titulo: String(map), itens: [] }],
    };
  }

  const rawBranches = asArray(map.ramos || map.itens || map.fluxo);
  const ramos = rawBranches.map((branch) => {
    if (typeof branch === "string") return { titulo: branch, itens: [] };
    return {
      titulo: branch?.titulo || branch?.nome || branch?.label || "Topico",
      itens: normalizeTextList(branch?.itens || branch?.children || branch?.detalhes),
    };
  });

  return {
    centro: map.centro || map.titulo || "Mapa mental",
    ramos,
  };
}

function normalizeQuestionComments(comments = []) {
  return asArray(comments).map((item, index) => {
    if (typeof item === "string") {
      return {
        alternativa: answerLetters[index] || String(index + 1),
        comentario: item,
        correta: /^correta/i.test(item),
      };
    }
    return {
      ...item,
      alternativa: item?.alternativa || answerLetters[index] || String(index + 1),
      comentario: item?.comentario || item?.texto || "",
    };
  });
}

function normalizeAnswer(value) {
  return String(value ?? "").trim().toLowerCase();
}

function buildTutorPrompt(chapter, message) {
  const context = {
    titulo: chapter.title,
    materia: chapter.subject,
    capitulo: chapter.moduleTitle,
    objetivo: chapter.tutorIA?.objetivo,
    comportamento: chapter.tutorIA?.comportamento,
    limites: chapter.tutorIA?.limites || "Nao inventar dados; usar o conteudo do capitulo como base.",
    explicacaoSimples: chapter.explicacaoComoSeTivesse12,
    resumoFrase: chapter.resumoFrase,
    pontosChave: chapter.pontosChave,
    pegadinhas: chapter.pegadinhas,
    termosChave: chapter.termosChave,
    oQueCobra: chapter.oQueCobra,
    precisaSaberAntes: chapter.precisaSaberAntes,
    perguntasDiagnostico: chapter.tutorIA?.perguntasDiagnostico,
  };

  return `Atue como Tutor IA da VemAprovar no capitulo abaixo. Seja socratico, direto e exigente: explique simples, diagnostique a resposta do aluno e termine com uma pergunta curta para continuar o treino. Nao invente fatos, noticias, dados externos, leis ou exemplos que nao possam ser inferidos do contexto.

CONTEXTO DO CAPITULO:
${JSON.stringify(context, null, 2)}

RESPOSTA/PEDIDO DO ALUNO:
${message}`;
}

function buildLocalTutorResponse(chapter, message) {
  const normalized = normalizeAnswer(message);
  const keywords = normalizeTextList(chapter.termosChave);
  const hits = keywords.filter((keyword) => normalized.includes(normalizeAnswer(keyword)));
  const mainRule = chapter.resumoFrase || firstValue(chapter.pontosChave) || chapter.explicacaoComoSeTivesse12 || "Use a estrutura do capitulo para resolver a questao.";
  const trap = firstValue(chapter.pegadinhas) || chapter.armadilhaDaBanca || "Nao troque a regra central por uma impressao do enunciado.";
  const subject = chapter.assunto || chapter.title || "o tema";

  if (/questao|questão|parecida|inedita|inédita/.test(normalized)) {
    return [
      `Questao de treino sobre ${subject}:`,
      `Uma alternativa de prova apresenta uma situacao parecida com este capitulo. Qual postura leva a resposta mais segura?`,
      "A) Marcar a opcao que parece familiar, sem conferir o enunciado.",
      "B) Separar fato, contexto e regra central antes de escolher.",
      "C) Decorar uma frase solta e aplicar em qualquer caso.",
      "Responda com A, B ou C e justifique em uma frase. Depois eu diagnostico sua resposta.",
    ].join("\n\n");
  }

  if (/explica|explique|facil|fácil|resumo/.test(normalized)) {
    return [
      "Explicacao simples:",
      mainRule,
      `Pense assim: a banca costuma testar se voce entendeu a estrutura, nao se decorou uma frase isolada.`,
      `Cuidado com esta pegadinha: ${trap}`,
      "Agora me diga: qual detalhe do enunciado voce observaria primeiro?",
    ].join("\n\n");
  }

  if (/^(b|alternativa b|letra b)\b/.test(normalized)) {
    return [
      "Correto. A letra B e a postura mais segura.",
      `Por quê? Ela segue a regra central do capitulo: ${mainRule}`,
      `Agora suba um nivel: explique por que a alternativa A cai na pegadinha "${trap}".`,
    ].join("\n\n");
  }

  if (/^(a|c|alternativa a|alternativa c|letra a|letra c)\b/.test(normalized)) {
    return [
      "Ainda nao. Essa escolha se aproxima da pegadinha.",
      `A regra do capitulo pede analisar a estrutura antes de marcar: ${mainRule}`,
      `Tente de novo: qual alternativa separa fato, contexto e regra central?`,
    ].join("\n\n");
  }

  const diagnostic = hits.length
    ? `Bom sinal: voce tocou em ${hits.map((item) => `"${item}"`).join(", ")}.`
    : "Ainda ficou generico. Traga pelo menos uma palavra-chave do capitulo para provar dominio.";

  return [
    diagnostic,
    `Regra central: ${mainRule}`,
    `Pegadinha para vigiar: ${trap}`,
    "Agora responda em uma frase: qual palavra ou detalhe do enunciado mudaria a conclusao da alternativa?",
  ].join("\n\n");
}

function initialTutorMessages(chapter) {
  const firstQuestion = firstValue(chapter.tutorIA?.perguntasDiagnostico) || "Explique a regra central deste capitulo com suas palavras.";
  return [
    {
      role: "ai",
      text: `Vamos treinar este capitulo sem decorar mecanicamente.\n\n${chapter.tutorIA?.objetivo || "Use o conteudo do capitulo como base."}\n\nPrimeira pergunta: ${firstQuestion}`,
    },
  ];
}

function RatingDots({ value = 0 }) {
  return (
    <span className="apostila-rating" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <i key={index} className={index < Number(value || 0) ? "is-on" : ""} />
      ))}
    </span>
  );
}

function InfoBlock({ title, children, tone = "blue" }) {
  return (
    <section className={cx("apostila-info-block", `apostila-info-${tone}`)}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function KeyValueGrid({ data }) {
  if (!data) return null;
  if (typeof data !== "object") {
    return <p>{String(data)}</p>;
  }

  const entries = Object.entries(data || {}).filter(([, value]) => value);
  if (!entries.length) return null;

  return (
    <div className="apostila-key-grid">
      {entries.map(([key, value]) => (
        <span key={key}>
          <strong>{formatLabel(key)}</strong>
          {renderValue(value)}
        </span>
      ))}
    </div>
  );
}

function QuestionCard({ question, index, chapter, onAnswered }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correctIndex = Number.isInteger(question.correta) ? question.correta : null;
  const alternatives = asArray(question.alternativas);
  const isJudgment = question.tipo === "certo_errado" || typeof question.correta === "boolean";
  const isOpenAnswer = !alternatives.length && !isJudgment;
  const answer = question.gabaritoLetra || question.gabarito || (correctIndex !== null ? answerLetters[correctIndex] : question.respostaEsperada);
  const comments = normalizeQuestionComments(question.alternativasComentadas);
  const criteria = Array.isArray(question.criteriosCorrecao) ? question.criteriosCorrecao : [];
  const hasResponse = isOpenAnswer ? writtenAnswer.trim().length > 0 : selectedAnswer !== null;
  const selectedComment = comments.find((item) => normalizeAnswer(item.alternativa) === normalizeAnswer(selectedAnswer));
  const correctComment = comments.find((item) => item.correta);
  const objectiveCorrect = isJudgment
    ? selectedAnswer === question.correta
    : correctIndex !== null && selectedAnswer === answerLetters[correctIndex];
  const showObjectiveFeedback = submitted && !isOpenAnswer;

  const submitAnswer = () => {
    if (!hasResponse) return;
    setSubmitted(true);
    onAnswered?.({
      chapter,
      question,
      questionIndex: index,
      resposta: isOpenAnswer ? writtenAnswer.trim() : selectedAnswer,
      acertou: isOpenAnswer ? null : objectiveCorrect,
    });
  };

  const resetAnswer = () => {
    setSelectedAnswer(null);
    setWrittenAnswer("");
    setSubmitted(false);
  };

  return (
    <article className="apostila-question-card">
      <div className="apostila-question-head">
        <span>Q{index + 1}</span>
        <div>
          <strong>{formatLabel(question.tipo || "questao")}</strong>
          <small>{question.bancaEstilo || question.nivel || "Treino"}</small>
        </div>
      </div>

      <p className="apostila-question-enunciado">{question.enunciado}</p>

      {alternatives.length ? (
        <div className="apostila-question-options">
          {alternatives.map((option, optionIndex) => (
            <button
              className={cx(
                selectedAnswer === answerLetters[optionIndex] && "is-selected",
                submitted && optionIndex === correctIndex && "is-correct",
                submitted && selectedAnswer === answerLetters[optionIndex] && optionIndex !== correctIndex && "is-wrong",
              )}
              disabled={submitted}
              key={`${question.id || index}-${optionIndex}`}
              onClick={() => setSelectedAnswer(answerLetters[optionIndex])}
              type="button"
            >
              <b>{answerLetters[optionIndex] || optionIndex + 1}</b>
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {isJudgment ? (
        <div className="apostila-question-options apostila-judgment-options">
          {judgmentOptions.map((option) => (
            <button
              className={cx(
                selectedAnswer === option.value && "is-selected",
                submitted && option.value === question.correta && "is-correct",
                submitted && selectedAnswer === option.value && option.value !== question.correta && "is-wrong",
              )}
              disabled={submitted}
              key={option.label}
              onClick={() => setSelectedAnswer(option.value)}
              type="button"
            >
              <b>{option.label.charAt(0)}</b>
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {isOpenAnswer ? (
        <div className="apostila-written-answer">
          <label htmlFor={`${question.id || index}-answer`}>Sua resposta</label>
          <textarea
            disabled={submitted}
            id={`${question.id || index}-answer`}
            onChange={(event) => setWrittenAnswer(event.target.value)}
            placeholder="Escreva sua resposta antes de ver o espelho de correcao..."
            rows={5}
            value={writtenAnswer}
          />
        </div>
      ) : null}

      <div className="apostila-question-actions">
        <button disabled={!hasResponse || submitted} onClick={submitAnswer} type="button">
          {isOpenAnswer ? "Ver correcao" : "Responder"}
        </button>
        {submitted ? <button className="is-secondary" onClick={resetAnswer} type="button">Refazer</button> : null}
      </div>

      {showObjectiveFeedback ? (
        <div className={cx("apostila-question-feedback", objectiveCorrect ? "is-correct" : "is-wrong")}>
          <strong>{objectiveCorrect ? "Resposta certa" : "Resposta incorreta"}</strong>
          <p>Gabarito: {answer}</p>
        </div>
      ) : null}

      {submitted ? (
        <>
          {isOpenAnswer && question.respostaEsperada ? (
            <div className="apostila-question-answer">
              <strong>Resposta esperada</strong>
              <p>{question.respostaEsperada}</p>
            </div>
          ) : null}

          {!isOpenAnswer && selectedComment ? (
            <p className={cx("apostila-question-comment", selectedComment.correta && "is-correct")}>{selectedComment.comentario}</p>
          ) : null}

          {!isOpenAnswer && !selectedComment && question.comentario ? <p className="apostila-question-comment">{question.comentario}</p> : null}

          {!isOpenAnswer && !objectiveCorrect && correctComment && correctComment !== selectedComment ? (
            <p className="apostila-question-comment is-correct">{correctComment.comentario}</p>
          ) : null}

          {isOpenAnswer && question.comentario ? <p className="apostila-question-comment">{question.comentario}</p> : null}
          {question.armadilhaDaBanca ? <p className="apostila-question-warning">{question.armadilhaDaBanca}</p> : null}
        </>
      ) : null}

      {submitted && comments.length ? (
        <details className="apostila-question-details">
          <summary>Comentarios das alternativas</summary>
          <ul>
            {comments.map((item, itemIndex) => (
              <li className={item.correta ? "is-correct" : ""} key={`${item.alternativa || itemIndex}-${itemIndex}`}>
                <strong>{item.alternativa}</strong>
                {item.comentario}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {submitted && criteria.length ? (
        <details className="apostila-question-details">
          <summary>Criterios de correcao</summary>
          <ul>
            {criteria.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
          </ul>
        </details>
      ) : null}
    </article>
  );
}

function FlashcardsBlock({ flashcards = [] }) {
  const cards = asArray(flashcards);
  if (!cards.length) return null;

  return (
    <InfoBlock title="Flashcards" tone="green">
      <div className="apostila-flashcards">
        {cards.map((card, index) => (
          <article key={`${card.frente || index}-${index}`}>
            <strong>{card.frente || card.pergunta || `Flashcard ${index + 1}`}</strong>
            <p>{card.verso || card.resposta || String(card)}</p>
            {card.nivel ? <span>{card.nivel}</span> : null}
          </article>
        ))}
      </div>
    </InfoBlock>
  );
}

function MindMapBlock({ map }) {
  const normalizedMap = normalizeMindMap(map);
  if (!normalizedMap?.ramos?.length) return null;

  return (
    <InfoBlock title="Mapa mental" tone="blue">
      <div className="apostila-map">
        <strong>{normalizedMap.centro}</strong>
        {normalizedMap.ramos.map((branch, index) => (
          <section key={`${branch.titulo}-${index}`}>
            <h4>{branch.titulo}</h4>
            <ul>
              {(branch.itens || []).map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </InfoBlock>
  );
}

function ReviewPlanBlock({ chapter, review }) {
  const defaultPlan = chapter.revisaoProgramada || {};
  const hasProgress = Boolean(review);

  return (
    <InfoBlock title="Revisao programada" tone="green">
      {hasProgress ? (
        <div className="apostila-review-status">
          <div className="apostila-review-score">
            <strong>{review.taxaAcertos}%</strong>
            <span>{review.acertos} de {review.total} objetivas corretas</span>
          </div>
          <div className="apostila-review-next">
            <span>Proxima revisao</span>
            <strong>{review.proximaRevisao}</strong>
            <small>{review.urgencia}</small>
          </div>
          <div className="apostila-review-task">
            <strong>{review.gatilhoErro ? "Gatilho de erro ativado" : "Tarefa sugerida"}</strong>
            <p>{review.tarefa}</p>
          </div>
          <div className="apostila-review-task">
            <strong>Criterio de dominio</strong>
            <p>{review.criterioDominio}</p>
          </div>
        </div>
      ) : (
        <div className="apostila-review-status">
          <div className="apostila-review-task">
            <strong>Comece pelas questoes</strong>
            <p>Responda as questoes do capitulo para a revisao ser calculada pelo seu desempenho real.</p>
          </div>
          <KeyValueGrid data={{
            primeira: defaultPlan.primeira,
            segunda: defaultPlan.segunda,
            terceira: defaultPlan.terceira,
            gatilhoErro: defaultPlan.gatilhoErro,
            criterioDominio: defaultPlan.criterioDominio,
          }} />
        </div>
      )}
    </InfoBlock>
  );
}

function TutorBlock({ chapter }) {
  const quickPrompts = [
    ...normalizeTextList(chapter.tutorIA?.perguntasDiagnostico),
    "Me explica facil",
    "Gere uma questao parecida",
  ].filter(Boolean);
  const [messages, setMessages] = useState(() => initialTutorMessages(chapter));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendTutorMessage = async (message = input) => {
    const cleanMessage = String(message || "").trim();
    if (!cleanMessage || loading) return;

    setMessages((items) => [...items, { role: "user", text: cleanMessage }]);
    setInput("");
    setLoading(true);

    try {
      let text = "";
      if (aiService.isConfigured) {
        text = await aiService.gerarTexto(buildTutorPrompt(chapter, cleanMessage), {
          task: "apostila_tutor",
          maxOutputTokens: 650,
          tier: "barato",
          extraContext: {
            chapterTutor: {
              title: chapter.title,
              subject: chapter.subject,
              terms: chapter.termosChave,
              traps: chapter.pegadinhas,
              rule: chapter.resumoFrase,
            },
          },
        });
      }

      if (!text || /indisponivel|em breve|nao consegui|não consegui|preciso que voce esteja logado/i.test(text)) {
        text = buildLocalTutorResponse(chapter, cleanMessage);
      }

      setMessages((items) => [...items, { role: "ai", text }]);
    } catch {
      setMessages((items) => [...items, { role: "ai", text: buildLocalTutorResponse(chapter, cleanMessage) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfoBlock title="Tutor IA" tone="blue">
      <div className="apostila-tutor-grid">
        <span><Brain size={16} /> {chapter.tutorIA.objetivo || chapter.tutorIA.prompt || "Treinar este capitulo com base no conteudo."}</span>
        <span><MessageSquareText size={16} /> {chapter.tutorIA.comportamento || "Explicacao direta, diagnostico do erro e tarefa curta de revisao."}</span>
        {chapter.tutorIA.limites ? <span><Layers3 size={16} /> {chapter.tutorIA.limites}</span> : null}
      </div>

      <div className="apostila-tutor-chat">
        <div className="apostila-tutor-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={cx("apostila-tutor-message", message.role === "user" ? "is-user" : "is-ai")} key={`${message.role}-${index}`}>
              {message.text}
            </div>
          ))}
          {loading ? <div className="apostila-tutor-message is-ai">Pensando com base neste capitulo...</div> : null}
        </div>

        {quickPrompts.length ? (
          <div className="apostila-tutor-prompts">
            {quickPrompts.map((prompt) => (
              <button disabled={loading} key={prompt} onClick={() => sendTutorMessage(prompt)} type="button">
                <StickyNote size={14} />
                {prompt}
              </button>
            ))}
          </div>
        ) : null}

        <div className="apostila-tutor-composer">
          <textarea
            disabled={loading}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendTutorMessage();
              }
            }}
            placeholder="Responda ao tutor ou peça uma explicacao..."
            rows={3}
            value={input}
          />
          <button disabled={loading || !input.trim()} onClick={() => sendTutorMessage()} type="button">
            <Send size={16} />
            Enviar
          </button>
        </div>
      </div>
    </InfoBlock>
  );
}

function ApostilaChapterReaderBase({ chapters = [], material = null }) {
  const registrarTentativa = useApostilaStore((state) => state.registrarTentativa);
  const apostilaReviews = useApostilaStore((state) => state.revisoes);
  const [activeIndex, setActiveIndex] = useState(0);
  const chapter = chapters[activeIndex] || chapters[0] || {};
  const materialTitle = material?.titulo || chapter.materialTitle || "Apostila";
  const materialSubject = material?.materia || chapter.subject || "Geral";
  const topLine = [materialSubject, chapter.contest].filter(Boolean).join(" - ");
  const bodyParagraphs = normalizeTextList(chapter.corpo);
  const keyPoints = normalizeTextList(chapter.pontosChave);
  const explanations = normalizeExplanation(chapter.explicacao);
  const quickChecks = normalizeQuickChecks(chapter.checkRapido);
  const traps = normalizeTextList(chapter.pegadinhas);
  const questions = asArray(chapter.questoes);
  const progress = chapters.length ? Math.round(((activeIndex + 1) / chapters.length) * 100) : 0;
  const ratings = useMemo(() => Object.entries(chapter.bancaRatings || {}), [chapter.bancaRatings]);
  const chapterReview = useMemo(
    () => apostilaReviews.find((item) => item.assuntoId === `apostila-${chapter.id}`),
    [apostilaReviews, chapter.id]
  );

  if (!chapters.length) {
    return (
      <div className="library-preview-state">
        <BookOpenCheck size={34} />
        <strong>Apostila sem capitulos</strong>
        <p>Este material ainda nao possui conteudo estruturado para leitura.</p>
      </div>
    );
  }

  return (
    <div className="apostila-reader">
      <aside className="apostila-reader-sidebar">
        <div className="apostila-reader-sidebar-head">
          <strong>{materialTitle}</strong>
          <span>{chapters.length} capitulos</span>
        </div>
        <div className="apostila-progress" aria-label={`Progresso ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <nav aria-label="Capitulos da apostila">
          {chapters.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              className={cx(index === activeIndex && "is-active")}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{item.chapterIndex || index + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.assunto || item.moduleTitle}</small>
            </button>
          ))}
        </nav>
      </aside>

      <main className="apostila-reader-content">
        <div className="apostila-reader-top">
          <div>
            <p>{topLine}</p>
            <h2>{chapter.title}</h2>
          </div>
          <span className="apostila-difficulty-badge">{chapter.dificuldade || "Nivel"}</span>
        </div>

        <div className="apostila-meta-grid">
          <span><Clock size={15} /> {chapter.tempoLeituraMin || 0} min leitura</span>
          <span><ListChecks size={15} /> {chapter.tempoExercicioMin || 0} min exercicio</span>
          <span><Target size={15} /> {chapter.assunto || "Assunto"}</span>
          {chapter.riscoAtualizacao ? <span><AlertTriangle size={15} /> Risco {chapter.riscoAtualizacao}</span> : null}
        </div>

        {chapter.riscoAtualizacao === "alto" ? (
          <InfoBlock title="Conferir fonte oficial" tone="amber">
            <p>Conteudo de alta volatilidade. Confira a fonte oficial antes da prova.</p>
          </InfoBlock>
        ) : null}

        {chapter.competencia ? (
          <InfoBlock title="Competencia" tone="blue">
            <p>{chapter.competencia}</p>
          </InfoBlock>
        ) : null}

        {chapter.explicacaoComoSeTivesse12 ? (
          <InfoBlock title="Explique simples" tone="violet">
            <p>{chapter.explicacaoComoSeTivesse12}</p>
          </InfoBlock>
        ) : null}

        <article className="apostila-body">
          {bodyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </article>

        {keyPoints.length ? (
          <InfoBlock title="Pontos-chave" tone="green">
            <ul>
              {keyPoints.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </InfoBlock>
        ) : null}

        {explanations.length ? (
          <div className="apostila-explain-grid">
            {explanations.map((item, index) => (
              <InfoBlock key={`${item.titulo}-${index}`} title={item.titulo || "Explicacao"} tone="neutral">
                <p>{item.texto}</p>
              </InfoBlock>
            ))}
          </div>
        ) : null}

        {quickChecks.length ? (
          <InfoBlock title="Check rapido" tone="violet">
            {quickChecks.map((check, checkIndex) => (
              <div className="apostila-check-item" key={`${check.pergunta || checkIndex}-${checkIndex}`}>
                <p className="apostila-check-question">{check.pergunta || `Pergunta ${checkIndex + 1}`}</p>
                {asArray(check.opcoes).length ? (
                  <div className="apostila-check-options">
                    {asArray(check.opcoes).map((option, index) => (
                      <span className={index === check.correta ? "is-correct" : ""} key={`${option}-${index}`}>
                        {index === check.correta ? <CheckCircle2 size={14} /> : null}
                        {option}
                      </span>
                    ))}
                  </div>
                ) : null}
                {check.resposta ? <p>{check.resposta}</p> : null}
                {check.justificativa ? <p>{check.justificativa}</p> : null}
              </div>
            ))}
          </InfoBlock>
        ) : null}

        {traps.length ? (
          <InfoBlock title="Pegadinhas" tone="amber">
            <ul>
              {traps.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </InfoBlock>
        ) : null}

        <FlashcardsBlock flashcards={chapter.flashcards} />

        {questions.length ? (
          <InfoBlock title={`Questoes premium (${questions.length})`} tone="violet">
            <div className="apostila-questions">
              {questions.map((question, index) => (
                <QuestionCard
                  chapter={chapter}
                  key={question.id || index}
                  question={question}
                  index={index}
                  onAnswered={registrarTentativa}
                />
              ))}
            </div>
          </InfoBlock>
        ) : null}

        {ratings.length ? (
          <InfoBlock title="Incidencia por banca" tone="neutral">
            <div className="apostila-ratings-grid">
              {ratings.map(([banca, rating]) => (
                <span key={banca}>
                  <strong>{banca}</strong>
                  <RatingDots value={rating} />
                </span>
              ))}
            </div>
          </InfoBlock>
        ) : null}

        {chapter.revisaoProgramada ? (
          <ReviewPlanBlock chapter={chapter} review={chapterReview} />
        ) : null}

        <MindMapBlock map={chapter.mapaMentalTexto || chapter.mapaMentalTextual} />

        {chapter.rubricaDominio ? (
          <InfoBlock title="Dominio do capitulo" tone="neutral">
            <KeyValueGrid data={chapter.rubricaDominio} />
          </InfoBlock>
        ) : null}

        {chapter.tutorIA ? <TutorBlock key={chapter.id || chapter.title} chapter={chapter} /> : null}

        <div className="apostila-reader-actions">
          <Button variant="secondary" icon={ChevronLeft} className="apostila-reader-nav-button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}>Anterior</Button>
          <span>Capitulo {activeIndex + 1} de {chapters.length}</span>
          <Button icon={ChevronRight} className="apostila-reader-nav-button" disabled={activeIndex >= chapters.length - 1} onClick={() => setActiveIndex((index) => Math.min(chapters.length - 1, index + 1))}>Proximo</Button>
        </div>
      </main>
    </div>
  );
}

export const ApostilaChapterReader = memo(ApostilaChapterReaderBase);
ApostilaChapterReader.displayName = "ApostilaChapterReader";

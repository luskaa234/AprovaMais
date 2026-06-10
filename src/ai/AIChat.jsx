import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BookOpenCheck, Send } from "lucide-react";
import { Button, Input, Mascot } from "../components";
import { useAI } from "../hooks";
import { aiService } from "../services";

function readJsonStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(value) }));
}

function parseDays(text) {
  const explicit = [...text.matchAll(/\b([0-3]?\d)\b/g)]
    .map((match) => Number(match[1]))
    .filter((day) => day >= 1 && day <= 31);
  return [...new Set(explicit)];
}

function parseHour(text) {
  const match = text.match(/(?:as|às|horario de|horário de)\s*(\d{1,2})(?::(\d{2}))?/i) || text.match(/\b(\d{1,2})\s*h\b/i);
  if (!match) return "10:00";
  const hour = String(Math.min(23, Number(match[1]))).padStart(2, "0");
  const minute = String(Math.min(59, Number(match[2] || 0))).padStart(2, "0");
  return `${hour}:${minute}`;
}

function detectLocalAction(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes("programa") || text.includes("programacao") || text.includes("programação")) {
    return { type: "set-focus-programming" };
  }

  if ((text.includes("atualize") || text.includes("adicione") || text.includes("coloque") || text.includes("agenda")) && text.includes("plano")) {
    return { type: "schedule-study", days: parseDays(text), hour: parseHour(text) };
  }

  return null;
}

function currentMonthDate(day) {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), day).toISOString().slice(0, 10);
}

function saveProgrammingFocus() {
  const stored = readJsonStorage("aprova-user", {});
  const state = stored.state || {};
  const user = state.user || {};
  const next = {
    ...stored,
    state: {
      ...state,
      user: {
        ...user,
        objective: "programacao",
        targetContest: "Programacao",
        contestName: "Programacao",
        difficultSubjects: user.difficultSubjects?.length ? user.difficultSubjects : ["Logica de programacao", "JavaScript", "React"],
        diagnosticPlan: {
          ...(user.diagnosticPlan || {}),
          objective: "programacao",
          objectiveLabel: "Programacao",
          prioritySubjects: ["Logica de programacao", "JavaScript", "React", "Projetos praticos"],
          weakSubjects: user.difficultSubjects?.length ? user.difficultSubjects : ["Logica de programacao", "JavaScript", "React"],
          weeklyGoals: ["Construir 1 projeto pequeno", "Estudar 5 dias na semana", "Resolver exercicios de logica"],
          simulations: ["Desafio pratico semanal", "Code review do projeto"],
          evolutionForecast: "Evolucao baseada em pratica diaria e projetos curtos.",
        },
      },
    },
  };
  writeJsonStorage("aprova-user", next);
}

function saveSchedule(days, hour) {
  const validDays = days.length ? days : [10, 11, 12];
  const existing = readJsonStorage("aprova-plano-atividades", []);
  const created = validDays.map((day) => ({
    id: `ia-programacao-${currentMonthDate(day)}-${hour}`,
    date: currentMonthDate(day),
    hour,
    title: "Estudo de programacao",
    materia: "Programacao",
    type: "Estudo",
    duration: 90,
    concurso: "Programacao",
    status: "Pendente",
  }));

  const createdIds = new Set(created.map((item) => item.id));
  const next = [...created, ...existing.filter((item) => !createdIds.has(item.id))];
  writeJsonStorage("aprova-plano-atividades", next);
  return created;
}

export const AIChat = memo(({ perfil = {}, desempenho = {} }) => {
  const [messages, setMessages] = useState([
    { role: "ai", text: aiService.isConfigured ? "API Gemini ativa. Posso explicar questoes, organizar revisoes e montar planos de estudo com base no seu desempenho real." : "Configure VITE_GEMINI_API_KEY no .env para ativar a API Gemini." },
  ]);
  const [input, setInput] = useState("");
  const [aiStatus, setAiStatus] = useState(() => aiService.getStatus());
  const endRef = useRef(null);
  const { streamText, isStreaming, sendPrompt } = useAI();

  const send = useCallback(
    (prompt = input) => {
      if (!prompt.trim()) return;
      const historico = messages.map((message) => ({ role: message.role === "ai" ? "model" : "user", text: message.text }));
      setMessages((items) => [...items, { role: "user", text: prompt }]);
      setInput("");

      const localAction = detectLocalAction(prompt);
      let actionContext = "";
      if (localAction?.type === "set-focus-programming") {
        saveProgrammingFocus();
        actionContext = "Acao local ja executada: foco do aluno atualizado para Programacao.";
      }

      if (localAction?.type === "schedule-study") {
        saveProgrammingFocus();
        const created = saveSchedule(localAction.days, localAction.hour);
        const dates = created.map((item) => item.date.split("-").reverse().join("/")).join(", ");
        actionContext = `Acao local ja executada: ${created.length} blocos de Programacao criados no Plano de Estudos para ${dates}, as ${localAction.hour}.`;
      }

      sendPrompt(actionContext ? `${prompt}\n\n${actionContext}\nResponda ao aluno confirmando a acao e orientando o proximo passo.` : prompt, (text) => {
        setAiStatus(aiService.getStatus());
        setMessages((items) => [...items, { role: "ai", text }]);
      }, { perfil, desempenho, historico });
    },
    [desempenho, input, messages, perfil, sendPrompt]
  );

  const gerarRelatorio = useCallback(async () => {
    const prompt = "Gerar meu relatorio de desempenho";
    setMessages((items) => [...items, { role: "user", text: prompt }]);
    setInput("");
    const resposta = await aiService.gerarRelatorio(perfil, desempenho);
    setAiStatus(aiService.getStatus());
    setMessages((items) => [...items, { role: "ai", text: resposta }]);
  }, [desempenho, perfil]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  const quickPrompts = [
    "Montar plano de estudos",
    "Quais minhas materias mais fracas?",
    "Estrategia para reta final",
    "Explicar ultima questao errada",
    "Organizar plano de TAF",
  ];

  return (
    <div className="ai-chat flex h-full flex-col">
      <div className="ai-chat-hero mb-4 flex items-center gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-slate-800">
        <Mascot size="lg" framed={false} className="ai-chat-hero-mascot -my-4" />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">Aprova Assistente</p>
          <h2 className="text-xl font-black">Seu tutor de revisao e questoes</h2>
          <p className="text-sm text-slate-600">Peca explicacoes, planos curtos, revisoes por assunto ou analise do seu desempenho.</p>
          <span className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-200">
            {aiService.isConfigured ? `API Gemini ativa · ${aiService.modelName}` : "API nao configurada"}
          </span>
          <span className="ml-2 mt-2 inline-flex rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white">
            {aiStatus.source === "gemini" ? "Resposta via Gemini" : aiStatus.source === "quota-fallback" ? "Fallback por cota" : aiStatus.source === "error" ? "Erro na API" : "Aguardando teste"}
          </span>
        </div>
      </div>

      <div className="ai-chat-messages flex-1 overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-4">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`mb-3 flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "ai" ? <Mascot size="sm" className="ai-chat-message-mascot" /> : null}
            <div className={`max-w-[82%] whitespace-pre-wrap rounded-lg p-3 text-sm ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-900 text-gray-200"}`}>
              {message.text}
            </div>
          </div>
        ))}
        {isStreaming ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Mascot size="sm" className="ai-chat-message-mascot" />
            <div className="max-w-[82%] whitespace-pre-wrap rounded-lg bg-gray-900 p-3 text-sm text-gray-200">
              {streamText || (
                <span className="inline-flex items-center gap-2 text-gray-400">
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:150ms]">.</span>
                    <span className="animate-bounce [animation-delay:300ms]">.</span>
                  </span>
                  Assistente digitando
                </span>
              )}
              {streamText ? <span className="animate-pulse">|</span> : null}
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="ai-chat-prompts mt-3 flex flex-wrap gap-2">
        {quickPrompts.map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            className="rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-blue-600 hover:text-white"
            type="button"
          >
            {chip}
          </button>
        ))}
        <button
          onClick={gerarRelatorio}
          className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          type="button"
        >
          Gerar meu relatorio de desempenho
        </button>
      </div>

      <div className="ai-chat-composer mt-3 flex gap-2">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
          placeholder="Digite sua pergunta"
          className="flex-1"
        />
        <Button className="ai-chat-send-button" icon={Send} onClick={() => send()} aria-label="Enviar mensagem">
          Enviar
        </Button>
      </div>
    </div>
  );
});
AIChat.displayName = "AIChat";

export const AIPanel = memo(({ text, action }) => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">
    <BookOpenCheck className="mb-2 text-blue-700" />
    {text}
    <div className="mt-3">{action}</div>
  </div>
));
AIPanel.displayName = "AIPanel";

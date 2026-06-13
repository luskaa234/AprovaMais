import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BookOpenCheck, CalendarCheck, Send, Trash2 } from "lucide-react";
import { Button, Input } from "../components";
import { useAI } from "../hooks";
import { aiService, planoService } from "../services";

const welcomeMessage = {
  role: "ai",
  text: aiService.isConfigured
    ? "Aprovinho ativo. Posso explicar, resumir, gerar materiais e atualizar seu plano quando voce pedir claramente."
    : "Aprovinho indisponivel agora. Entre novamente ou tente em instantes.",
};

function readChatHistory(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(saved) && saved.length ? saved : [welcomeMessage];
  } catch {
    return [welcomeMessage];
  }
}

function shouldUpdateStudyPlan(prompt = "") {
  const text = String(prompt).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const asksPlan = /\b(plano|cronograma|calendario|agenda|rotina)\b/.test(text);
  const asksChange = /\b(atualize|atualiza|gerar|gere|monte|montar|crie|criar|organize|organizar|refaca|recrie|ajuste|ajustar)\b/.test(text);
  return asksPlan && asksChange;
}

function getStatusLabel(status = {}) {
  if (status.source === "cache") return "Resposta salva";
  if (status.source === "code") return "Calculado no app";
  if (status.source?.includes("missing-config")) return "Precisa de login";
  if (status.source?.includes("error")) return "Tentando reconectar";
  return "Pronto para responder";
}

export const AIChat = memo(({ perfil = {}, desempenho = {} }) => {
  const historyKey = `aprova-ai-chat-history:${perfil?.id || perfil?.email || "local"}`;
  const [messages, setMessages] = useState(() => readChatHistory(historyKey));
  const [input, setInput] = useState("");
  const [aiStatus, setAiStatus] = useState(() => aiService.getStatus());
  const [actionLoading, setActionLoading] = useState("");
  const endRef = useRef(null);
  const { streamText, isStreaming, sendPrompt } = useAI();
  const chatTier = aiService.chatTier || "barato";
  const busy = isStreaming || Boolean(actionLoading);

  const send = useCallback(
    async (prompt = input) => {
      if (!prompt.trim() || busy) return;
      const historico = messages.map((message) => ({ role: message.role === "ai" ? "model" : "user", text: message.text }));
      setMessages((items) => [...items, { role: "user", text: prompt }]);
      setInput("");

      let extraContext = {};
      if (shouldUpdateStudyPlan(prompt)) {
        setActionLoading("Atualizando seu plano");
        try {
          const result = await planoService.aplicarPedidoDoAssistente({
            pedido: prompt,
            user: perfil,
            startDate: new Date(),
            replaceGenerated: true,
          });
          extraContext = {
            ferramentaExecutada: {
              nome: "plano_de_estudos",
              resultado: result,
              instrucao: "Avise que o plano foi atualizado diretamente no calendario e resuma as primeiras atividades criadas. Nao diga que apenas sugeriu.",
            },
          };
        } catch (error) {
          extraContext = {
            ferramentaExecutada: {
              nome: "plano_de_estudos",
              erro: error?.message || "Falha ao atualizar plano.",
              instrucao: "Avise que tentou atualizar o plano, mas nao conseguiu salvar agora. Oriente o aluno a tentar novamente.",
            },
          };
        } finally {
          setActionLoading("");
        }
      }

      sendPrompt(prompt, (text) => {
        setAiStatus(aiService.getStatus());
        setMessages((items) => [...items, { role: "ai", text }]);
      }, { perfil, desempenho, historico, tier: chatTier, extraContext });
    },
    [busy, chatTier, desempenho, input, messages, perfil, sendPrompt]
  );

  const gerarRelatorio = useCallback(async () => {
    send("Gerar meu relatório de desempenho");
  }, [send]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(historyKey);
    setMessages([welcomeMessage]);
  }, [historyKey]);

  useEffect(() => {
    setMessages(readChatHistory(historyKey));
  }, [historyKey]);

  useEffect(() => {
    localStorage.setItem(historyKey, JSON.stringify(messages.slice(-40)));
  }, [historyKey, messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText, actionLoading]);

  const quickPrompts = [
    "Atualize meu plano de estudos",
    "Quais minhas matérias mais fracas?",
    "Estratégia para reta final",
    "Explicar última questão errada",
    "Organizar plano de TAF",
  ];

  return (
    <div className="ai-chat mx-auto flex h-full min-h-[calc(100vh-150px)] w-full max-w-5xl flex-col rounded-lg border border-blue-100 bg-white shadow-sm">
      <div className="ai-chat-hero flex flex-col gap-4 border-b border-blue-100 bg-blue-50/80 p-4 text-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-600 text-white">
          <BookOpenCheck size={24} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">Aprova Assistente</p>
          <h2 className="text-xl font-black">Seu tutor de revisão e questões</h2>
          <p className="text-sm text-slate-600">Peça explicações, planos curtos, revisões por assunto ou análise do seu desempenho.</p>
          <div className="mt-2 flex flex-wrap gap-2">
          <span className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-200">
            {aiService.isConfigured ? "Aprovinho ativo" : "Aprovinho indisponivel"}
          </span>
          <span className="mt-2 inline-flex rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white">
            {getStatusLabel(aiStatus)}
          </span>
          </div>
        </div>
        </div>
        <Button size="sm" variant="secondary" icon={Trash2} onClick={clearHistory}>Limpar</Button>
      </div>

      <div className="ai-chat-messages flex-1 overflow-auto bg-slate-50 p-3 sm:p-5">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === "user" ? "bg-blue-600 text-white" : "border border-blue-100 bg-white text-slate-800"}`}>
                {message.text}
              </div>
            </div>
          ))}
          {actionLoading ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                <CalendarCheck size={16} />
                {actionLoading}
              </div>
            </div>
          ) : null}
          {isStreaming ? (
            <div className="flex justify-start">
              <div className="max-w-[88%] whitespace-pre-wrap rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm">
                {streamText || (
                  <span className="inline-flex items-center gap-2 text-slate-500">
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
      </div>

      <div className="ai-chat-prompts border-t border-blue-100 bg-white px-3 py-3 sm:px-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
        {quickPrompts.map((chip) => (
          <button
            key={chip}
            disabled={busy}
            onClick={() => send(chip)}
            className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
          >
            {chip}
          </button>
        ))}
        <button
          disabled={busy}
          onClick={gerarRelatorio}
          className="shrink-0 rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
        >
          Gerar meu relatório de desempenho
        </button>
        </div>
      </div>

      <div className="ai-chat-composer flex gap-2 border-t border-blue-100 bg-white p-3 sm:p-5">
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
          disabled={busy}
        />
        <Button className="ai-chat-send-button" disabled={busy || !input.trim()} icon={Send} loading={busy} onClick={() => send()} aria-label="Enviar mensagem">
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

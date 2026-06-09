import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BookOpenCheck, Send } from "lucide-react";
import { Button, Input } from "../components";
import { useAI } from "../hooks";

const AssistantCharacter = memo(({ small = false }) => (
  <div className={small ? "grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50" : "grid place-items-center"}>
    <svg width={small ? 28 : 132} height={small ? 28 : 132} viewBox="0 0 132 132" role="img" aria-label="Assistente Aprova">
      <circle cx="66" cy="66" r="58" fill="#dbeafe" />
      <path d="M38 73c0-24 12-39 28-39s28 15 28 39v18c0 8-6 14-14 14H52c-8 0-14-6-14-14V73Z" fill="#2563eb" />
      <path d="M45 70c0-20 9-32 21-32s21 12 21 32v9c0 7-5 12-12 12H57c-7 0-12-5-12-12v-9Z" fill="#f8fafc" />
      <circle cx="57" cy="68" r="4" fill="#1e293b" />
      <circle cx="75" cy="68" r="4" fill="#1e293b" />
      <path d="M58 80c5 5 17 5 22 0" fill="none" stroke="#1e293b" strokeLinecap="round" strokeWidth="4" />
      <path d="M39 54c-8 2-14 9-14 18 0 8 5 15 12 18" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="8" />
      <path d="M93 54c8 2 14 9 14 18 0 8-5 15-12 18" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="8" />
      <path d="M52 31h28l-5-12H57l-5 12Z" fill="#1d4ed8" />
    </svg>
  </div>
));
AssistantCharacter.displayName = "AssistantCharacter";

export const AIChat = memo(() => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Posso explicar questões, organizar revisões e montar planos de estudo." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const { streamText, isStreaming, sendPrompt } = useAI();

  const send = useCallback(
    (prompt = input) => {
      if (!prompt.trim()) return;
      setMessages((items) => [...items, { role: "user", text: prompt }]);
      setInput("");
      sendPrompt(prompt, (text) => setMessages((items) => [...items, { role: "ai", text }]));
    },
    [input, sendPrompt]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-slate-800">
        <AssistantCharacter />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-blue-700">Aprova Assistente</p>
          <h2 className="text-xl font-black">Seu tutor de revisao e questoes</h2>
          <p className="text-sm text-slate-600">Peça explicacoes, planos curtos, mapas mentais ou revisoes por assunto.</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`mb-3 flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "ai" ? <AssistantCharacter small /> : null}
            <div
              className={`max-w-[82%] rounded-lg p-3 text-sm ${
                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-900 text-gray-200"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isStreaming ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <AssistantCharacter small />
            <div className="max-w-[82%] rounded-lg bg-gray-900 p-3 text-sm text-gray-200">
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

      <div className="mt-3 flex flex-wrap gap-2">
        {[
          "Explique essa questão",
          "Criar revisão de Constitucional",
          "Montar mapa mental de Português",
          "Organizar plano de estudos",
          "Corrigir minha redação",
          "Montar meu plano de TAF",
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            className="rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-blue-600 hover:text-white"
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
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
        <Button icon={Send} onClick={() => send()} aria-label="Enviar mensagem">
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

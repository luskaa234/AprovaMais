import { memo, useCallback, useEffect, useRef, useState } from "react";
import { BookOpenCheck, Send } from "lucide-react";
import { Avatar, Button, Input } from "../components";
import { useAI } from "../hooks";

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
      <div className="flex-1 overflow-auto rounded-lg border border-gray-800 bg-gray-950 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`mb-3 flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "ai" ? <Avatar name="AP" size="sm" /> : null}
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
          <div className="flex gap-2">
            <Avatar name="AP" size="sm" />
            <div className="max-w-[82%] rounded-lg bg-gray-900 p-3 text-sm text-gray-200">
              {streamText}
              <span className="animate-pulse">|</span>
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
          onKeyDown={(event) => event.key === "Enter" && send()}
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

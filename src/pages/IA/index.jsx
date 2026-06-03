import { AIChat } from "../../ai";

export default function IAPage() {
  return (
    <div className="flex h-[calc(100vh-130px)] flex-col">
      <h1 className="text-3xl font-black text-white">Assistente de estudos</h1>
      <p className="mb-5 text-sm text-gray-400">Conversa guiada para duvidas, revisoes e organizacao do plano.</p>
      <AIChat />
    </div>
  );
}

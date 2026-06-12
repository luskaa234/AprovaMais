import { Bot, Clock3 } from "lucide-react";
import { Badge, Card } from "../../components";

export default function IAPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-150px)] max-w-3xl place-items-center pb-10">
      <Card hover={false} className="w-full border-blue-100 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto grid size-14 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <Bot size={28} />
        </div>
        <div className="mt-4 flex justify-center">
          <Badge variant="warning"><Clock3 size={14} /> Em desenvolvimento</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-black text-slate-950">Assistente em breve</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
          O assistente de IA está temporariamente desativado enquanto a integração definitiva é definida.
        </p>
      </Card>
    </div>
  );
}

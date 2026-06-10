import { useCallback, useMemo, useState } from "react";
import { Badge, Card, ProgressBar, Select } from "../../components";
import { EssayAreaChart } from "../../charts";
import { RedacaoEditor } from "../../forms";
import { useAsyncData } from "../../hooks";
import { redacaoService } from "../../services";

export default function RedacaoPage() {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const load = useCallback(() => redacaoService.getHistorico(), []);
  const { data: historico } = useAsyncData(load, [load]);
  const chartData = useMemo(() => historico.map((item) => ({ label: item.data, valor: item.nota })), [historico]);
  const corrigir = useCallback(async () => {
    setLoading(true);
    setResultado(await redacaoService.corrigir(texto));
    setLoading(false);
  }, [texto]);

  return (
    <div>
      <div data-tour="tour-redacao-header">
        <h1 className="text-3xl font-black text-white">Redacao</h1>
        <p className="mb-5 text-sm text-gray-400">Temas, editor, correcao por IA e historico.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card data-tour="tour-redacao-editor">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>ENEM</Badge>
            <Badge variant="warning">media</Badge>
            <Select options={["ENEM", "Concurso", "OAB"]} />
          </div>
          <RedacaoEditor value={texto} onChange={setTexto} onSubmit={corrigir} loading={loading} />
          {resultado ? (
            <div className="mt-4 rounded-lg bg-gray-900 p-4">
              <h2 className="font-bold text-white">Nota: {resultado.nota}</h2>
              {resultado.competencias.map((nota, index) => (
                <ProgressBar key={index} label={`Competencia ${index + 1}`} value={nota} max={200} />
              ))}
              <p className="mt-3 text-sm text-gray-300">{resultado.comentarios}</p>
            </div>
          ) : null}
        </Card>
        <Card data-tour="tour-redacao-history">
          <h2 className="mb-3 font-bold text-white">Historico</h2>
          <EssayAreaChart data={chartData} />
          {historico.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-gray-800 py-2 text-sm">
              <span className="text-gray-300">{item.titulo}</span>
              <strong className="text-indigo-200">{item.nota}</strong>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

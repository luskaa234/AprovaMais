import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Dumbbell, Plus, Target } from "lucide-react";

export function ExercicioCard({ exercicio, tipo, index = 0, onRegistrar }) {
  const [registrado, setRegistrado] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleRegistrar = () => {
    setRegistrado(true);
    onRegistrar?.(tipo || exercicio.tafTipo, exercicio);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
    >
      <div className="relative grid aspect-[4/3] place-items-center bg-gray-950 sm:aspect-video">
        {!imgError && exercicio.gifUrl ? (
          <img src={exercicio.gifUrl} alt={exercicio.name} className="h-full w-full object-contain" onError={() => setImgError(true)} />
        ) : (
          <span className="text-sm text-gray-400">Exercicio TAF</span>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-blue-500/15 px-2 py-1 text-xs font-semibold text-blue-200">
          {exercicio.equipment || "peso corporal"}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-1 text-xs font-semibold text-indigo-200"><Target size={13} />{exercicio.tafLabel || "TAF"}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-300"><Dumbbell size={13} />{exercicio.equipment || "peso corporal"}</span>
        </div>
        <h3 className="font-bold capitalize text-white">{exercicio.name}</h3>
        <p className="mt-1 text-xs text-blue-200">{exercicio.tafGoal}</p>
        <p className="mt-2 text-xs text-gray-400">Musculos: {[exercicio.target, ...(exercicio.secondaryMuscles || [])].filter(Boolean).slice(0, 4).join(", ")}</p>
        <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-gray-300">
          {(exercicio.instructions || []).slice(0, 4).map((step) => (
            <li key={step}>{String(step).replace(/^Step:\d+\s*/i, "")}</li>
          ))}
        </ol>
        <button
          type="button"
          onClick={handleRegistrar}
          disabled={registrado}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            registrado ? "bg-green-500/15 text-green-200" : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {registrado ? <CheckCircle2 size={16} /> : <Plus size={16} />}
          {registrado ? "Treino registrado" : "Registrar treino"}
        </button>
      </div>
    </motion.article>
  );
}

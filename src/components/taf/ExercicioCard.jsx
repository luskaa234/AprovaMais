import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Dumbbell, HeartPulse, PersonStanding, Plus, Target } from "lucide-react";

const equipmentNames = {
  "body weight": "peso corporal",
  "assisted": "assistido",
  "barbell": "barra",
  "dumbbell": "halter",
  "cable": "cabo",
};

const muscleNames = {
  cardiovascular: "cardiovascular",
  "cardiovascular system": "cardiovascular",
  quadriceps: "quadríceps",
  hamstrings: "posteriores de coxa",
  calves: "panturrilhas",
  pectorals: "peitoral",
  triceps: "tríceps",
  shoulders: "ombros",
  core: "core",
  lats: "dorsais",
  forearms: "antebraços",
  "hip flexors": "flexores do quadril",
  "lower back": "lombar",
  abs: "abdômen",
  waist: "abdômen",
  back: "costas",
  biceps: "bíceps",
};

const legMuscles = new Set(["quadriceps", "hamstrings", "calves", "hip flexors", "lower back", "back"]);

function MuscleIcon({ target = "", ...props }) {
  const key = String(target).toLowerCase();
  if (key === "cardiovascular" || key === "cardiovascular system") return <HeartPulse {...props} />;
  if (legMuscles.has(key)) return <PersonStanding {...props} />;
  return <Activity {...props} />;
}

const instructionTranslations = [
  [/find an open space or a treadmill to perform the exercise/i, "Use um espaço livre ou esteira para executar o exercício."],
  [/stand tall with your feet hip-width apart/i, "Fique em pé, com postura alta e pés na largura do quadril."],
  [/start jogging in place/i, "Comece trotando no lugar, elevando levemente os joelhos e coordenando os braços."],
  [/after a few seconds/i, "Depois de alguns segundos, avance com passadas curtas, mantendo ritmo constante."],
  [/start in a push-up position/i, "Inicie em posição de flexão, com as mãos um pouco mais abertas que os ombros."],
  [/extend one arm straight out to the side/i, "Estenda um braço para o lado, paralelo ao solo, mantendo o tronco firme."],
  [/lower your body towards the ground/i, "Desça o corpo flexionando os cotovelos, sem perder o alinhamento do tronco."],
  [/push back up to the starting position/i, "Empurre o solo e retorne à posição inicial com controle."],
  [/lie flat on your back/i, "Deite de costas com os joelhos flexionados e os pés apoiados no chão."],
  [/place your hands behind your head/i, "Posicione as mãos atrás da cabeça, com os cotovelos apontados para fora."],
  [/engaging your abs/i, "Contraia o abdômen e eleve o tronco com controle."],
  [/pause for a moment/i, "Faça uma breve pausa no topo e retorne lentamente à posição inicial."],
  [/hang from a pull-up bar/i, "Segure a barra fixa com pegada neutra e braços estendidos."],
  [/squeeze your shoulder blades together/i, "Ative o core e aproxime as escápulas antes de iniciar a subida."],
  [/pull your body up towards the bar/i, "Puxe o corpo em direção à barra flexionando os cotovelos."],
  [/continue pulling until your chin is above the bar/i, "Continue a subida até o queixo ultrapassar a barra."],
];

function translateEquipment(value = "") {
  return equipmentNames[String(value).toLowerCase()] || value || "peso corporal";
}

function translateMuscle(value = "") {
  return muscleNames[String(value).toLowerCase()] || value;
}

function translateInstruction(step = "") {
  const cleaned = String(step).replace(/^Step:\d+\s*/i, "");
  const match = instructionTranslations.find(([pattern]) => pattern.test(cleaned));
  return match ? match[1] : cleaned;
}

export function ExercicioCard({ exercicio, tipo, index = 0, onRegistrar }) {
  const [registrado, setRegistrado] = useState(false);
  const [imgError, setImgError] = useState(false);
  const equipment = translateEquipment(exercicio.equipment);
  const muscles = [exercicio.target, ...(exercicio.secondaryMuscles || [])].filter(Boolean).slice(0, 4).map(translateMuscle).join(", ");

  const handleRegistrar = () => {
    setRegistrado(true);
    onRegistrar?.(tipo || exercicio.tafTipo, exercicio);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="taf-exercise-card overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
    >
      <div className="relative grid aspect-[4/3] place-items-center bg-gray-950 sm:aspect-video">
        {!imgError && exercicio.gifUrl ? (
          <img src={exercicio.gifUrl} alt={exercicio.name} className="h-full w-full object-contain" onError={() => setImgError(true)} />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <MuscleIcon target={exercicio.target} size={40} strokeWidth={1.5} className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-400">{exercicio.name}</span>
          </div>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-royal/10 px-2 py-1 text-xs font-semibold text-navy ring-1 ring-royal/30">
          {equipment}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-royal/10 px-2 py-1 text-xs font-semibold text-navy ring-1 ring-royal/30"><Target size={13} />{exercicio.tafLabel || "TAF"}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"><Dumbbell size={13} />{equipment}</span>
        </div>
        <h3 className="font-bold text-white">{exercicio.name}</h3>
        <p className="mt-1 text-xs text-royal">{exercicio.tafGoal}</p>
        <p className="mt-2 text-xs text-gray-400">Músculos trabalhados: {muscles}</p>
        <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-gray-300">
          {(exercicio.instructions || []).slice(0, 4).map((step) => (
            <li key={step}>{translateInstruction(step)}</li>
          ))}
        </ol>
        <button
          type="button"
          onClick={handleRegistrar}
          disabled={registrado}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            registrado ? "bg-green-500/15 text-green-200" : "bg-royal text-white hover:bg-royal"
          }`}
        >
          {registrado ? <CheckCircle2 size={16} /> : <Plus size={16} />}
          {registrado ? "Treino registrado" : "Registrar treino"}
        </button>
      </div>
    </motion.article>
  );
}

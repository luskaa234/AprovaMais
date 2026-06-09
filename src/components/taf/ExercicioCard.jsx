import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Dumbbell, Plus, Target } from "lucide-react";

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
  quadriceps: "quadriceps",
  hamstrings: "posteriores de coxa",
  calves: "panturrilhas",
  pectorals: "peitoral",
  triceps: "triceps",
  shoulders: "ombros",
  core: "core",
  lats: "dorsais",
  forearms: "antebracos",
  "hip flexors": "flexores do quadril",
  "lower back": "lombar",
  abs: "abdomen",
  waist: "abdomen",
  back: "costas",
  biceps: "biceps",
};

const exerciseNames = {
  "short stride run": "Corrida curta em ritmo controlado",
  "raise single arm push-up": "Flexao com apoio alternado",
  "push-up": "Flexao de braco",
  "sit-up": "Abdominal",
  "crunch": "Abdominal supra",
  "pull-up": "Barra fixa",
  "pull up (neutral grip)": "Barra fixa com pegada neutra",
  "chin-up": "Barra fixa supinada",
  "janda sit-up": "Abdominal Janda",
  "mountain climber": "Escalador",
};

const instructionTranslations = [
  [/find an open space or a treadmill to perform the exercise/i, "Use um espaco livre ou esteira para executar o exercicio."],
  [/stand tall with your feet hip-width apart/i, "Fique em pe, com postura alta e pes na largura do quadril."],
  [/start jogging in place/i, "Comece trotando no lugar, elevando levemente os joelhos e coordenando os bracos."],
  [/after a few seconds/i, "Depois de alguns segundos, avance com passadas curtas, mantendo ritmo constante."],
  [/start in a push-up position/i, "Inicie em posicao de flexao, com maos um pouco mais abertas que os ombros."],
  [/extend one arm straight out to the side/i, "Estenda um braco para o lado, paralelo ao solo, mantendo o tronco firme."],
  [/lower your body towards the ground/i, "Desca o corpo flexionando os cotovelos, sem perder o alinhamento do tronco."],
  [/push back up to the starting position/i, "Empurre o solo e retorne a posicao inicial com controle."],
  [/lie flat on your back/i, "Deite de costas com os joelhos flexionados e os pes apoiados no chao."],
  [/place your hands behind your head/i, "Posicione as maos atras da cabeca, com os cotovelos apontados para fora."],
  [/engaging your abs/i, "Contraia o abdomen e eleve o tronco com controle."],
  [/pause for a moment/i, "Faca uma breve pausa no topo e retorne lentamente a posicao inicial."],
  [/hang from a pull-up bar/i, "Segure a barra fixa com pegada neutra e bracos estendidos."],
  [/squeeze your shoulder blades together/i, "Ative o core e aproxime as escapulas antes de iniciar a subida."],
  [/pull your body up towards the bar/i, "Puxe o corpo em direcao a barra flexionando os cotovelos."],
  [/continue pulling until your chin is above the bar/i, "Continue a subida ate o queixo ultrapassar a barra."],
];

function prettify(value = "") {
  return String(value).replace(/\b\w/g, (char) => char.toUpperCase());
}

function translateEquipment(value = "") {
  return equipmentNames[String(value).toLowerCase()] || value || "peso corporal";
}

function translateMuscle(value = "") {
  return muscleNames[String(value).toLowerCase()] || value;
}

function translateExerciseName(value = "") {
  const key = String(value).toLowerCase();
  return exerciseNames[key] || prettify(value);
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
      className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
    >
      <div className="relative grid aspect-[4/3] place-items-center bg-gray-950 sm:aspect-video">
        {!imgError && exercicio.gifUrl ? (
          <img src={exercicio.gifUrl} alt={exercicio.name} className="h-full w-full object-contain" onError={() => setImgError(true)} />
        ) : (
          <span className="text-sm text-gray-400">Exercicio TAF</span>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
          {equipment}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200"><Target size={13} />{exercicio.tafLabel || "TAF"}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"><Dumbbell size={13} />{equipment}</span>
        </div>
        <h3 className="font-bold text-white">{translateExerciseName(exercicio.name)}</h3>
        <p className="mt-1 text-xs text-blue-600">{exercicio.tafGoal}</p>
        <p className="mt-2 text-xs text-gray-400">Musculos trabalhados: {muscles}</p>
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

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Layers3,
  Scale,
  Sparkles,
  Target,
  Upload,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Mascot, Select, Textarea, cx } from "../components";
import BrandLogo from "../components/BrandLogo";
import { useUser } from "../contexts";
import { aiService } from "../services";

const objectives = [
  { value: "oab", label: "OAB", icon: Scale },
  { value: "concurso", label: "Concurso Publico", icon: BriefcaseBusiness },
  { value: "enem", label: "ENEM", icon: GraduationCap },
  { value: "ensino-medio", label: "Ensino Medio", icon: BookOpenCheck },
  { value: "vestibular", label: "Vestibular", icon: Target },
  { value: "outro", label: "Outro", icon: Layers3 },
];

const weekDays = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terca" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sabado" },
  { value: "domingo", label: "Domingo" },
];

const generalSubjects = ["Portugues", "Matematica", "Informatica", "Atualidades", "Redacao", "Ingles", "Raciocinio Logico"];
const legalSubjects = [
  "Direito Constitucional",
  "Direito Administrativo",
  "Direito Penal",
  "Processo Penal",
  "Direito Civil",
  "Processo Civil",
  "Direito do Trabalho",
  "Processo do Trabalho",
];

const schoolSubjects = ["Biologia", "Fisica", "Quimica", "Historia", "Geografia", "Literatura", "Sociologia", "Filosofia"];
const levels = ["Estou comecando agora", "Basico", "Intermediario", "Avancado"];

const stepTitles = [
  "Conhecendo voce",
  "Definindo sua meta",
  "Disponibilidade",
  "Nivel atual",
  "Dificuldades",
  "Edital",
  "IA monta tudo",
];

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function subjectsForObjective(objective) {
  if (objective === "oab") return [...legalSubjects, "Etica Profissional", "Peca Pratica"];
  if (objective === "enem" || objective === "vestibular") return [...generalSubjects, ...schoolSubjects];
  if (objective === "ensino-medio") return ["Portugues", "Matematica", ...schoolSubjects, "Ingles", "Redacao"];
  if (objective === "concurso") return [...generalSubjects, ...legalSubjects];
  return [...generalSubjects, ...schoolSubjects];
}

function buildDiagnosticPlan(form) {
  const hoursPerDay = normalizeNumber(form.hoursPerDay, 1);
  const daysPerWeek = normalizeNumber(form.daysPerWeek, form.availableDays.length || 1);
  const weeklyHours = Math.max(1, Math.round(hoursPerDay * daysPerWeek));
  const availableDays = form.availableDays.length ? form.availableDays : weekDays.slice(0, daysPerWeek).map((day) => day.value);
  const subjects = subjectsForObjective(form.objective);
  const difficultSubjects = form.difficultSubjects.length ? form.difficultSubjects : subjects.slice(0, 4);
  const prioritySubjects = [...new Set([...difficultSubjects, ...subjects])].slice(0, Math.min(8, subjects.length));
  const dailyMinutes = Math.max(30, Math.round((hoursPerDay * 60) / 2) * 2);

  const weeklySchedule = availableDays.map((day, index) => {
    const primary = prioritySubjects[index % prioritySubjects.length] || "Materia principal";
    const secondary = prioritySubjects[(index + 1) % prioritySubjects.length] || primary;
    return {
      day,
      blocks: [
        { type: "Teoria", subject: primary, minutes: Math.round(dailyMinutes * 0.45) },
        { type: "Questoes", subject: secondary, minutes: Math.round(dailyMinutes * 0.35) },
        { type: "Revisao", subject: primary, minutes: Math.max(15, Math.round(dailyMinutes * 0.2)) },
      ],
    };
  });

  const objectiveLabel = objectives.find((item) => item.value === form.objective)?.label || "Estudos";
  return {
    createdAt: new Date().toISOString(),
    objective: form.objective,
    objectiveLabel,
    weeklyHours,
    availableDays,
    prioritySubjects,
    weakSubjects: difficultSubjects,
    weeklySchedule,
    track: [
      `Base dirigida para ${objectiveLabel}`,
      "Teoria essencial",
      "Questoes por assunto",
      "Revisao espacada",
      "Simulado e caderno de erros",
    ],
    simulations: form.objective === "enem"
      ? ["Simulado ENEM por area", "Redacao semanal", "Prova completa quinzenal"]
      : form.objective === "oab"
        ? ["Simulado OAB 1a fase", "Treino de peca", "Questoes FGV por disciplina"]
        : ["Blocos por banca", "Simulado semanal", "Revisao dos erros"],
    weeklyGoals: [
      `${weeklyHours}h de estudo liquido`,
      `${Math.max(80, weeklyHours * 12)} questoes por semana`,
      `${Math.max(2, availableDays.length)} revisoes programadas`,
      form.objective === "enem" || form.objective === "vestibular" ? "1 redacao por semana" : "1 simulado por semana",
    ],
    evolutionForecast: weeklyHours >= 20
      ? "Evolucao rapida: revise desempenho a cada 7 dias."
      : weeklyHours >= 10
        ? "Evolucao consistente: priorize constancia e revisao."
        : "Evolucao gradual: blocos curtos e foco no essencial.",
  };
}

function OptionCard({ active, children, icon: Icon, onClick }) {
  return (
    <button
      className={cx(
        "flex min-h-24 flex-col items-start justify-between rounded-lg border p-4 text-left transition",
        active ? "border-blue-500 bg-blue-500/15 text-white" : "border-gray-800 bg-gray-950 text-gray-300 hover:border-blue-500/70"
      )}
      onClick={onClick}
      type="button"
    >
      {Icon ? <Icon size={20} className={active ? "text-blue-200" : "text-blue-400"} /> : null}
      <span className="mt-3 text-sm font-bold">{children}</span>
    </button>
  );
}

function CheckPill({ active, label, onClick }) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition",
        active ? "border-blue-500 bg-blue-500 text-white" : "border-gray-800 bg-gray-950 text-gray-300 hover:border-blue-500/70"
      )}
      onClick={onClick}
      type="button"
    >
      {active ? <CheckCircle2 size={16} /> : null}
      {label}
    </button>
  );
}

export default function Onboarding() {
  const { updateProfile, user } = useUser();
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    objective: user?.objective || "",
    customObjective: user?.customObjective || "",
    contestName: user?.contestName || "",
    contestState: user?.contestState || "",
    examBoard: user?.examBoard || "",
    examDate: user?.dataProva || "",
    oabPhase: user?.oabPhase || "1-fase",
    oabSecondPhaseArea: user?.oabSecondPhaseArea || "",
    enemTargetScore: user?.enemTargetScore || "",
    desiredCourse: user?.desiredCourse || "",
    schoolYear: user?.schoolYear || "",
    schoolType: user?.schoolType || "",
    vestibularName: user?.vestibularName || "",
    hoursPerDay: user?.hoursPerDay || 2,
    daysPerWeek: user?.daysPerWeek || 5,
    availableDays: user?.availableDays || ["segunda", "terca", "quarta", "quinta", "sexta"],
    currentLevel: user?.currentLevel || "Basico",
    difficultSubjects: user?.difficultSubjects || [],
    editalOption: user?.editalOption || "procurar-depois",
    editalText: user?.editalText || "",
    editalFile: user?.editalFile || null,
  });

  const selectedObjective = objectives.find((item) => item.value === form.objective);
  const diagnosticPlan = useMemo(() => buildDiagnosticPlan(form), [form]);
  const progress = Math.round(((step + 1) / stepTitles.length) * 100);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const next = () => {
    if (step === 0 && (!form.name.trim() || !form.objective)) {
      toast.error("Informe seu nome e escolha um objetivo.");
      return;
    }
    setStep((current) => Math.min(stepTitles.length - 1, current + 1));
  };
  const back = () => setStep((current) => Math.max(0, current - 1));

  const handleFile = async (file) => {
    if (!file) return;
    const metadata = {
      name: file.name,
      type: file.type || file.name.split(".").pop(),
      size: file.size,
      storedAt: new Date().toISOString(),
      storage: file.size <= 2_500_000 ? "local-base64" : "metadata-only",
      analysisStatus: "pending",
    };

    if (file.size <= 2_500_000) {
      metadata.contentBase64 = await fileToDataUrl(file);
    }

    update("editalFile", metadata);

    if (file.type.includes("text") || file.name.toLowerCase().endsWith(".txt")) {
      const text = await file.text();
      update("editalText", text.slice(0, 12000));
    }
  };

  const submit = async () => {
    setIsSaving(true);
    try {
      const basePlan = buildDiagnosticPlan(form);
      const plan = await aiService.gerarPlanoEstudos(form, basePlan);
      const targetContest =
        form.objective === "concurso" ? form.contestName :
        form.objective === "oab" ? "OAB" :
        form.objective === "enem" ? "ENEM" :
        form.objective === "ensino-medio" ? "Ensino Medio" :
        form.objective === "vestibular" ? form.vestibularName || "Vestibular" :
        form.customObjective || "Outro";

      await updateProfile({
        ...form,
        targetContest,
        dataProva: form.examDate,
        nivel: form.currentLevel,
        horasSemanais: plan.weeklyHours,
        diasDisponiveis: form.availableDays,
        diagnosticPlan: plan,
        onboardingComplete: true,
      });
      toast.success("Diagnostico criado. Seu dashboard foi personalizado.");
    } catch (error) {
      toast.error(error.message || "Nao foi possivel criar seu plano.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <BrandLogo className="internal-brand-logo" />
          <span className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs font-bold text-gray-300">
            Etapa {step + 1} de {stepTitles.length}
          </span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-900">
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <section className="grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-200">
              <Sparkles size={14} />
              Diagnostico inteligente
            </span>
            <h1 className="mt-4 text-2xl font-black leading-tight">A IA monta seu estudo a partir das suas respostas.</h1>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              O onboarding separa OAB, concurso, ENEM, ensino medio e vestibular para entregar um dashboard focado no seu objetivo.
            </p>
            <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
              <Mascot size="xl" framed={false} className="mx-auto -my-4" />
              <p className="mt-2 text-center text-sm font-semibold text-blue-100">
                Vou organizar suas respostas e transformar isso em um plano pratico.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {stepTitles.map((title, index) => (
                <button
                  className={cx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                    index === step ? "bg-blue-600 text-white" : index < step ? "bg-gray-800 text-gray-200" : "text-gray-500"
                  )}
                  key={title}
                  onClick={() => setStep(index)}
                  type="button"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-white/10 text-xs font-black">{index + 1}</span>
                  {title}
                </button>
              ))}
            </div>
          </aside>

          <form className="rounded-lg border border-gray-800 bg-gray-900/70 p-4 shadow-2xl shadow-black/20 sm:p-6" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-5">
              <h2 className="text-2xl font-black">{stepTitles[step]}</h2>
              <p className="mt-1 text-sm text-gray-400">
                {selectedObjective ? `Objetivo selecionado: ${selectedObjective.label}` : "Escolha seu caminho para personalizar o restante."}
              </p>
            </div>

            {step === 0 ? (
              <div className="grid gap-4">
                <Input icon={UserRound} label="Qual e o seu nome?" onChange={(event) => update("name", event.target.value)} placeholder="Seu nome" value={form.name} />
                <div>
                  <span className="mb-2 block text-sm font-semibold text-gray-200">Qual e seu objetivo principal?</span>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {objectives.map((objective) => (
                      <OptionCard
                        active={form.objective === objective.value}
                        icon={objective.icon}
                        key={objective.value}
                        onClick={() => update("objective", objective.value)}
                      >
                        {objective.label}
                      </OptionCard>
                    ))}
                  </div>
                </div>
                {form.objective === "outro" ? (
                  <Input label="Descreva seu objetivo" onChange={(event) => update("customObjective", event.target.value)} value={form.customObjective} />
                ) : null}
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {form.objective === "concurso" ? (
                  <>
                    <Input label="Qual concurso?" onChange={(event) => update("contestName", event.target.value)} placeholder="Ex: PM SP, PRF, TJ" value={form.contestName} />
                    <Input label="Qual estado?" onChange={(event) => update("contestState", event.target.value)} placeholder="Ex: SP, RJ, MG" value={form.contestState} />
                    <Input label="Banca organizadora" onChange={(event) => update("examBoard", event.target.value)} placeholder="Ex: FGV, Cebraspe, Vunesp" value={form.examBoard} />
                    <Input icon={CalendarDays} label="Data da prova, se souber" onChange={(event) => update("examDate", event.target.value)} type="date" value={form.examDate} />
                  </>
                ) : null}

                {form.objective === "oab" ? (
                  <>
                    <Select label="Qual fase?" options={[{ value: "1-fase", label: "1a fase" }, { value: "2-fase", label: "2a fase" }]} onChange={(event) => update("oabPhase", event.target.value)} value={form.oabPhase} />
                    {form.oabPhase === "2-fase" ? (
                      <Select label="Area escolhida para a 2a fase" options={["Direito Civil", "Direito Penal", "Direito do Trabalho", "Direito Tributario", "Direito Administrativo", "Direito Constitucional", "Direito Empresarial"]} onChange={(event) => update("oabSecondPhaseArea", event.target.value)} value={form.oabSecondPhaseArea} />
                    ) : null}
                  </>
                ) : null}

                {form.objective === "enem" ? (
                  <>
                    <Input label="Qual nota deseja alcancar?" onChange={(event) => update("enemTargetScore", event.target.value)} placeholder="Ex: 760" type="number" value={form.enemTargetScore} />
                    <Input label="Pretende usar para qual curso?" onChange={(event) => update("desiredCourse", event.target.value)} placeholder="Ex: Medicina, Direito" value={form.desiredCourse} />
                  </>
                ) : null}

                {form.objective === "ensino-medio" ? (
                  <>
                    <Select label="Serie atual" options={["1o ano", "2o ano", "3o ano"]} onChange={(event) => update("schoolYear", event.target.value)} value={form.schoolYear} />
                    <Select label="Escola publica ou privada" options={["Publica", "Privada"]} onChange={(event) => update("schoolType", event.target.value)} value={form.schoolType} />
                  </>
                ) : null}

                {form.objective === "vestibular" ? (
                  <>
                    <Input label="Qual vestibular?" onChange={(event) => update("vestibularName", event.target.value)} placeholder="Ex: Fuvest, Unicamp, Uerj" value={form.vestibularName} />
                    <Input label="Curso desejado" onChange={(event) => update("desiredCourse", event.target.value)} placeholder="Ex: Engenharia, Psicologia" value={form.desiredCourse} />
                    <Input icon={CalendarDays} label="Data da prova, se souber" onChange={(event) => update("examDate", event.target.value)} type="date" value={form.examDate} />
                  </>
                ) : null}

                {form.objective === "outro" ? (
                  <Textarea className="sm:col-span-2" label="Conte mais sobre sua meta" onChange={(event) => update("customObjective", event.target.value)} value={form.customObjective} />
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input icon={Clock3} label="Quantas horas por dia voce consegue estudar?" min="1" onChange={(event) => update("hoursPerDay", event.target.value)} type="number" value={form.hoursPerDay} />
                  <Input label="Quantos dias por semana?" max="7" min="1" onChange={(event) => update("daysPerWeek", event.target.value)} type="number" value={form.daysPerWeek} />
                </div>
                <div>
                  <span className="mb-2 block text-sm font-semibold text-gray-200">Quais dias estao disponiveis?</span>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map((day) => (
                      <CheckPill
                        active={form.availableDays.includes(day.value)}
                        key={day.value}
                        label={day.label}
                        onClick={() => update("availableDays", toggleValue(form.availableDays, day.value))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {levels.map((level) => (
                  <OptionCard active={form.currentLevel === level} icon={Target} key={level} onClick={() => update("currentLevel", level)}>
                    {level}
                  </OptionCard>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-5">
                <div>
                  <span className="mb-2 block text-sm font-semibold text-gray-200">Gerais</span>
                  <div className="flex flex-wrap gap-2">
                    {generalSubjects.concat(form.objective === "enem" || form.objective === "vestibular" || form.objective === "ensino-medio" ? schoolSubjects : []).map((subject) => (
                      <CheckPill active={form.difficultSubjects.includes(subject)} key={subject} label={subject} onClick={() => update("difficultSubjects", toggleValue(form.difficultSubjects, subject))} />
                    ))}
                  </div>
                </div>
                {(form.objective === "oab" || form.objective === "concurso") ? (
                  <div>
                    <span className="mb-2 block text-sm font-semibold text-gray-200">Juridicas</span>
                    <div className="flex flex-wrap gap-2">
                      {legalSubjects.map((subject) => (
                        <CheckPill active={form.difficultSubjects.includes(subject)} key={subject} label={subject} onClick={() => update("difficultSubjects", toggleValue(form.difficultSubjects, subject))} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 5 ? (
              <div className="grid gap-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["upload-pdf", "Sim, enviar arquivo", Upload],
                    ["colar-texto", "Sim, colar texto", FileText],
                    ["procurar-depois", "Nao, procurar depois", Sparkles],
                  ].map(([value, label, Icon]) => (
                    <OptionCard active={form.editalOption === value} icon={Icon} key={value} onClick={() => update("editalOption", value)}>
                      {label}
                    </OptionCard>
                  ))}
                </div>

                {form.editalOption === "upload-pdf" ? (
                  <label className="grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-gray-700 bg-gray-950 p-6 text-center hover:border-blue-500">
                    <input accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} type="file" />
                    <Upload className="mb-3 text-blue-300" />
                    <strong>{form.editalFile?.name || "Enviar PDF, DOCX ou TXT"}</strong>
                    <span className="mt-1 text-xs text-gray-500">TXT sera lido automaticamente. PDF/DOCX ficam vinculados ao diagnostico.</span>
                  </label>
                ) : null}

                {form.editalOption === "colar-texto" || form.editalText ? (
                  <Textarea
                    label="Cole aqui o edital, materias ou prioridades"
                    maxLength={12000}
                    onChange={(event) => update("editalText", event.target.value)}
                    placeholder="Cole materias, conteudo programatico, pesos, banca e observacoes."
                    value={form.editalText}
                  />
                ) : null}
              </div>
            ) : null}

            {step === 6 ? (
              <div className="grid gap-4">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="text-blue-200" />
                    <h3 className="font-black">Plano que sera criado</h3>
                  </div>
                  <div className="grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
                    <span>{diagnosticPlan.weeklyHours}h por semana</span>
                    <span>{diagnosticPlan.availableDays.length} dias disponiveis</span>
                    <span>{diagnosticPlan.prioritySubjects.length} materias prioritarias</span>
                    <span>{diagnosticPlan.simulations[0]}</span>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <h3 className="mb-3 font-bold">Materias prioritarias</h3>
                    <div className="flex flex-wrap gap-2">
                      {diagnosticPlan.prioritySubjects.map((subject) => (
                        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-100" key={subject}>{subject}</span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <h3 className="mb-3 font-bold">Metas semanais</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {diagnosticPlan.weeklyGoals.map((goal) => <li key={goal}>- {goal}</li>)}
                    </ul>
                  </section>
                </div>

                <section className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="mb-3 font-bold">Cronograma semanal</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {diagnosticPlan.weeklySchedule.map((day) => (
                      <div className="rounded-lg bg-gray-900 p-3" key={day.day}>
                        <strong className="capitalize">{day.day}</strong>
                        <div className="mt-2 space-y-1 text-xs text-gray-400">
                          {day.blocks.map((block) => <p key={`${day.day}-${block.type}-${block.subject}`}>{block.type}: {block.subject} - {block.minutes} min</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button disabled={step === 0} icon={ChevronLeft} onClick={back} type="button" variant="outline">
                Voltar
              </Button>
              {step < stepTitles.length - 1 ? (
                <Button icon={ChevronRight} onClick={next} type="button">
                  Continuar
                </Button>
              ) : (
                <Button loading={isSaving} onClick={submit} type="button">
                  Criar Meu Plano de Estudos
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

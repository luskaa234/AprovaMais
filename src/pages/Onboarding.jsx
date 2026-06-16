import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Scale,
  Sparkles,
  Target,
  Upload,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Select, Textarea, cx } from "../components";
import BrandLogo from "../components/BrandLogo";
import { useUser } from "../contexts";
import { aiService } from "../services";

const objectives = [
  { value: "oab", label: "OAB", icon: Scale },
  { value: "concurso", label: "Concurso PM/segurança", icon: BriefcaseBusiness },
  { value: "geral", label: "Estudo geral", icon: Target },
];

const securityContestOptions = [
  { value: "PM", label: "Polícia Militar" },
  { value: "CBM", label: "Bombeiros" },
  { value: "PC", label: "Polícia Civil" },
  { value: "PP", label: "Polícia Penal" },
  { value: "PRF", label: "Polícia Rodoviária Federal" },
];

const weekDays = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terça" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

const generalSubjects = ["Português", "Matemática", "Informática", "Atualidades", "Redação", "Inglês", "Raciocínio Lógico"];
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

const securitySubjects = [
  "Português",
  "Matemática/RL",
  "Informática",
  "História/Geografia",
  "Atualidades",
  "Direito Constitucional",
  "Direito Penal",
  "Processo Penal",
  "Legislação Especial",
  "Direito Militar/Legislação PM",
  "Redação",
  "TAF",
];
const levels = ["Estou começando agora", "Básico", "Intermediário", "Avançado"];

const stepTitles = [
  "Conhecendo você",
  "Definindo sua meta",
  "Disponibilidade",
  "Nível atual",
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
  if (objective === "oab") return [...legalSubjects, "Ética Profissional", "Peça Prática"];
  if (objective === "concurso") return securitySubjects;
  return generalSubjects;
}

function normalizeOnboardingObjective(objective) {
  return objectives.some((item) => item.value === objective) ? objective : "";
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
    const primary = prioritySubjects[index % prioritySubjects.length] || "Matéria principal";
    const secondary = prioritySubjects[(index + 1) % prioritySubjects.length] || primary;
    return {
      day,
      blocks: [
        { type: "Teoria", subject: primary, minutes: Math.round(dailyMinutes * 0.45) },
        { type: "Questões", subject: secondary, minutes: Math.round(dailyMinutes * 0.35) },
        { type: "Revisão", subject: primary, minutes: Math.max(15, Math.round(dailyMinutes * 0.2)) },
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
      "Questões por assunto",
      "Revisão espaçada",
      "Simulado e caderno de erros",
    ],
    simulations: form.objective === "oab"
        ? ["Simulado OAB 1ª fase", "Treino de peça", "Questões FGV por disciplina"]
        : form.objective === "concurso"
          ? ["Questões PM/segurança", "Simulado por banca", "Revisão dos erros"]
        : ["Blocos por banca", "Simulado semanal", "Revisão dos erros"],
    weeklyGoals: [
      `${weeklyHours}h de estudo líquido`,
      `${Math.max(80, weeklyHours * 12)} questões por semana`,
      `${Math.max(2, availableDays.length)} revisões programadas`,
      form.objective === "geral" ? "1 bloco de revisão por semana" : "1 simulado por semana",
    ],
    evolutionForecast: weeklyHours >= 20
      ? "Evolução rápida: revise desempenho a cada 7 dias."
      : weeklyHours >= 10
        ? "Evolução consistente: priorize constância e revisão."
        : "Evolução gradual: blocos curtos e foco no essencial.",
  };
}

function OptionCard({ active, children, icon: Icon, onClick }) {
  return (
    <button
      className={cx(
        "flex min-h-24 flex-col items-start justify-between rounded-lg border p-4 text-left transition",
        active ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200" : "border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
      )}
      onClick={onClick}
      type="button"
    >
      {Icon ? <Icon size={20} className={active ? "text-blue-100" : "text-blue-500"} /> : null}
      <span className="mt-3 text-sm font-bold">{children}</span>
    </button>
  );
}

function CheckPill({ active, label, onClick }) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition",
        active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
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
    objective: normalizeOnboardingObjective(user?.objective),
    customObjective: "",
    contestName: user?.contestName || "",
    contestState: user?.contestState || "",
    examBoard: user?.examBoard || "",
    examDate: user?.dataProva || "",
    oabPhase: user?.oabPhase || "1-fase",
    oabSecondPhaseArea: user?.oabSecondPhaseArea || "",
    enemTargetScore: "",
    desiredCourse: "",
    schoolYear: "",
    schoolType: "",
    vestibularName: "",
    hoursPerDay: user?.hoursPerDay || 2,
    daysPerWeek: user?.daysPerWeek || 5,
    availableDays: user?.availableDays || ["segunda", "terca", "quarta", "quinta", "sexta"],
    currentLevel: user?.currentLevel || "Básico",
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
        form.objective === "concurso" ? form.contestName || "PM" :
        form.objective === "oab" ? "OAB" :
        "Estudo geral";
      const {
        customObjective,
        enemTargetScore,
        desiredCourse,
        schoolYear,
        schoolType,
        vestibularName,
        ...supportedForm
      } = form;
      void customObjective;
      void enemTargetScore;
      void desiredCourse;
      void schoolYear;
      void schoolType;
      void vestibularName;

      await updateProfile({
        ...supportedForm,
        targetContest,
        dataProva: form.examDate,
        nivel: form.currentLevel,
        horasSemanais: plan.weeklyHours,
        diasDisponiveis: form.availableDays,
        diagnosticPlan: plan,
        onboardingComplete: true,
      });
      toast.success("Diagnóstico criado. Seu dashboard foi personalizado.");
    } catch (error) {
      toast.error(error.message || "Não foi possível criar seu plano.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <BrandLogo className="internal-brand-logo" />
          <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
            Etapa {step + 1} de {stepTitles.length}
          </span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <section className="grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Sparkles size={14} />
              Diagnóstico inteligente
            </span>
            <h1 className="mt-4 text-2xl font-black leading-tight">A IA monta seu estudo a partir das suas respostas.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              O onboarding separa OAB, concursos de segurança e estudo geral para entregar um dashboard focado no que a plataforma oferece.
            </p>
            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-600 text-white">
                <Sparkles size={26} />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-blue-800">
                Vou organizar suas respostas e transformar isso em um plano prático.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {stepTitles.map((title, index) => (
                <button
                  className={cx(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                    index === step ? "bg-blue-600 text-white" : index < step ? "bg-blue-50 text-blue-800" : "text-slate-500 hover:bg-blue-50"
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

          <form className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-5">
              <h2 className="text-2xl font-black">{stepTitles[step]}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {selectedObjective ? `Objetivo selecionado: ${selectedObjective.label}` : "Escolha seu caminho para personalizar o restante."}
              </p>
            </div>

            {step === 0 ? (
              <div className="grid gap-4">
                <Input icon={UserRound} label="Qual é o seu nome?" onChange={(event) => update("name", event.target.value)} placeholder="Seu nome" value={form.name} />
                <div>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Qual é seu objetivo principal?</span>
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
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {form.objective === "concurso" ? (
                  <>
                    <Select label="Foco do concurso" options={securityContestOptions} onChange={(event) => update("contestName", event.target.value)} value={form.contestName || "PM"} />
                    <Input label="Estado, se houver" onChange={(event) => update("contestState", event.target.value)} placeholder="Ex: PI, MA, SP" value={form.contestState} />
                    <Input label="Banca organizadora" onChange={(event) => update("examBoard", event.target.value)} placeholder="Ex: FGV, Cebraspe, Vunesp" value={form.examBoard} />
                    <Input icon={CalendarDays} label="Data da prova, se souber" onChange={(event) => update("examDate", event.target.value)} type="date" value={form.examDate} />
                  </>
                ) : null}

                {form.objective === "oab" ? (
                  <>
                    <Select label="Qual fase?" options={[{ value: "1-fase", label: "1ª fase" }, { value: "2-fase", label: "2ª fase" }]} onChange={(event) => update("oabPhase", event.target.value)} value={form.oabPhase} />
                    {form.oabPhase === "2-fase" ? (
                      <Select label="Área escolhida para a 2ª fase" options={["Direito Civil", "Direito Penal", "Direito do Trabalho", "Direito Tributário", "Direito Administrativo", "Direito Constitucional", "Direito Empresarial"]} onChange={(event) => update("oabSecondPhaseArea", event.target.value)} value={form.oabSecondPhaseArea} />
                    ) : null}
                  </>
                ) : null}

                {form.objective === "geral" ? (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 sm:col-span-2">
                    O estudo geral libera plano, questões disponíveis, revisão, flashcards e leis secas sem prometer trilhas de concursos que ainda não estão cobertos.
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input icon={Clock3} label="Quantas horas por dia você consegue estudar?" min="1" onChange={(event) => update("hoursPerDay", event.target.value)} type="number" value={form.hoursPerDay} />
                  <Input label="Quantos dias por semana?" max="7" min="1" onChange={(event) => update("daysPerWeek", event.target.value)} type="number" value={form.daysPerWeek} />
                </div>
                <div>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Quais dias estão disponíveis?</span>
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
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Gerais</span>
                  <div className="flex flex-wrap gap-2">
                    {(form.objective === "concurso" ? securitySubjects.filter((subject) => generalSubjects.includes(subject) || subject === "Matemática/RL" || subject === "História/Geografia") : generalSubjects).map((subject) => (
                      <CheckPill active={form.difficultSubjects.includes(subject)} key={subject} label={subject} onClick={() => update("difficultSubjects", toggleValue(form.difficultSubjects, subject))} />
                    ))}
                  </div>
                </div>
                {form.objective === "oab" ? (
                  <div>
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Jurídicas</span>
                    <div className="flex flex-wrap gap-2">
                      {legalSubjects.map((subject) => (
                        <CheckPill active={form.difficultSubjects.includes(subject)} key={subject} label={subject} onClick={() => update("difficultSubjects", toggleValue(form.difficultSubjects, subject))} />
                      ))}
                    </div>
                  </div>
                ) : null}
                {form.objective === "concurso" ? (
                  <div>
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Segurança pública</span>
                    <div className="flex flex-wrap gap-2">
                      {securitySubjects.filter((subject) => !generalSubjects.includes(subject) && subject !== "Matemática/RL" && subject !== "História/Geografia").map((subject) => (
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
                    ["procurar-depois", "Não, procurar depois", Sparkles],
                  ].map(([value, label, Icon]) => (
                    <OptionCard active={form.editalOption === value} icon={Icon} key={value} onClick={() => update("editalOption", value)}>
                      {label}
                    </OptionCard>
                  ))}
                </div>

                {form.editalOption === "upload-pdf" ? (
                  <label className="grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-blue-200 bg-blue-50 p-6 text-center hover:border-blue-500">
                    <input accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} type="file" />
                    <Upload className="mb-3 text-blue-300" />
                    <strong>{form.editalFile?.name || "Enviar PDF, DOCX ou TXT"}</strong>
                    <span className="mt-1 text-xs text-slate-500">TXT será lido automaticamente. PDF/DOCX ficam vinculados ao diagnóstico.</span>
                  </label>
                ) : null}

                {form.editalOption === "colar-texto" || form.editalText ? (
                  <Textarea
                    label="Cole aqui o edital, matérias ou prioridades"
                    maxLength={12000}
                    onChange={(event) => update("editalText", event.target.value)}
                    placeholder="Cole matérias, conteúdo programático, pesos, banca e observações."
                    value={form.editalText}
                  />
                ) : null}
              </div>
            ) : null}

            {step === 6 ? (
              <div className="grid gap-4">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    <h3 className="font-black">Plano que será criado</h3>
                  </div>
                  <div className="grid gap-3 text-sm text-blue-800 sm:grid-cols-2">
                    <span>{diagnosticPlan.weeklyHours}h por semana</span>
                    <span>{diagnosticPlan.availableDays.length} dias disponíveis</span>
                    <span>{diagnosticPlan.prioritySubjects.length} matérias prioritárias</span>
                    <span>{diagnosticPlan.simulations[0]}</span>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <h3 className="mb-3 font-bold">Matérias prioritárias</h3>
                    <div className="flex flex-wrap gap-2">
                      {diagnosticPlan.prioritySubjects.map((subject) => (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100" key={subject}>{subject}</span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <h3 className="mb-3 font-bold">Metas semanais</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {diagnosticPlan.weeklyGoals.map((goal) => <li key={goal}>- {goal}</li>)}
                    </ul>
                  </section>
                </div>

                <section className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <h3 className="mb-3 font-bold">Cronograma semanal</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {diagnosticPlan.weeklySchedule.map((day) => (
                      <div className="rounded-lg bg-white p-3 ring-1 ring-blue-100" key={day.day}>
                        <strong className="capitalize">{day.day}</strong>
                        <div className="mt-2 space-y-1 text-xs text-slate-500">
                          {day.blocks.map((block) => <p key={`${day.day}-${block.type}-${block.subject}`}>{block.type}: {block.subject} - {block.minutes} min</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
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

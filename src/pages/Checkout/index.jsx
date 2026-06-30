import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cx } from "../../components";
import { useInternalRouter, useUser } from "../../contexts";
import { createPixPayment, paymentPlans, verifyPremiumAccess } from "../../services/paymentService";
import CardBrick from "./CardBrick";
import PixPanel from "./PixPanel";

/* ── Máscaras ── */
function maskCPF(v) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) {
    return d
      .replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`
      );
  }
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
    c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
  );
}

/* ── Validação CPF ── */
function validateCPF(v) {
  const d = v.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +d[i] * (10 - i);
  let r = (s * 10) % 11;
  if (r >= 10) r = 0;
  if (r !== +d[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +d[i] * (11 - i);
  r = (s * 10) % 11;
  if (r >= 10) r = 0;
  return r === +d[10];
}
function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

/* ── Benefícios por plano ── */
const PLAN_BENEFITS = {
  essencial: [
    "Questões ilimitadas com filtros avançados",
    "Flashcards e revisão espaçada (SM-2)",
    "Simulados cronometrados completos",
    "Caderno de erros inteligente",
    "IA tutora — 20 perguntas/dia",
    "Plano de estudos personalizado",
  ],
  pro: [
    "Tudo do Essencial, sem limitações",
    "IA tutora ilimitada 24/7",
    "Mapas mentais gerados por IA",
    "Redação com correção automática",
    "Acesso antecipado a novos recursos",
    "Suporte prioritário",
  ],
};

/* ═══════════════════════════════════════════
   Componente principal
═══════════════════════════════════════════ */
export default function CheckoutPage() {
  const { goBack, navigate } = useInternalRouter();
  const { user, refreshProfile } = useUser();

  const planId = useMemo(
    () => window.localStorage.getItem("aprova-pending-plan") || "essencial",
    []
  );
  const plan = useMemo(() => paymentPlans[planId] || paymentPlans.essencial, [planId]);
  const benefits = PLAN_BENEFITS[planId] || PLAN_BENEFITS.essencial;

  /* Formulário */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [errors, setErrors] = useState({});

  /* Preenche nome/e-mail do perfil logado */
  useEffect(() => {
    if (!user) return undefined;
    const id = window.setTimeout(() => {
      setForm((f) => ({
        ...f,
        name: f.name || user.name || user.displayName || "",
        email: f.email || user.email || "",
      }));
    }, 0);
    return () => window.clearTimeout(id);
  }, [user]);

  /* Ref para o CardBrick acessar form sem recriação de closure */
  const formRef = useRef(form);
  useEffect(() => { formRef.current = form; }, [form]);

  const updateField = useCallback((field, raw) => {
    let value = raw;
    if (field === "cpf") value = maskCPF(raw);
    if (field === "phone") value = maskPhone(raw);
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }, []);

  function validate() {
    const f = formRef.current;
    const e = {};
    if (!f.name.trim()) e.name = "Nome é obrigatório";
    if (!validateEmail(f.email)) e.email = "E-mail inválido";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Celular inválido";
    if (!validateCPF(f.cpf)) e.cpf = "CPF inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* Método de pagamento */
  const [method, setMethod] = useState("pix");
  const [pixData, setPixData] = useState(null);
  const [pixLoading, setPixLoading] = useState(false);

  /* Sucesso */
  const [success, setSuccess] = useState(false);

  const handleSuccess = useCallback(async () => {
    try {
      const access = await verifyPremiumAccess();
      if (access?.ativo) {
        await refreshProfile?.();
        setSuccess(true);
      } else {
        toast.info("Acesso sendo processado. Atualize a página em instantes.");
      }
    } catch {
      toast.info("Pagamento confirmado! Atualize a página para liberar o acesso.");
    }
  }, [refreshProfile]);

  const handlePixSubmit = async () => {
    if (!validate()) {
      document.getElementById("ck-name")?.closest("section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      setPixLoading(true);
      const data = await createPixPayment(plan.id);
      setPixData(data);
    } catch (err) {
      toast.error(err.message || "Não foi possível gerar o Pix. Tente novamente.");
    } finally {
      setPixLoading(false);
    }
  };

  /* ── Tela de sucesso ── */
  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f7fb] px-4">
        <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h1 className="mb-2 text-xl font-bold text-slate-800">Pagamento confirmado!</h1>
          <p className="mb-6 text-sm text-slate-500">
            Seu acesso ao <strong className="text-slate-700">{plan.name}</strong> foi liberado. Bons estudos!
          </p>
          <button
            type="button"
            onClick={() => navigate("dashboard")}
            className="w-full rounded-xl bg-royal py-3 text-sm font-semibold text-white hover:bg-navy"
          >
            Acessar a plataforma →
          </button>
        </div>
      </div>
    );
  }

  /* ── Layout principal ── */
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-20 border-b border-royal/20 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Voltar"
          >
            <ArrowLeft size={16} aria-hidden />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <span className="text-base font-black tracking-tight text-navy">VemAprovar</span>

          <div className="flex items-center gap-1.5 text-xs text-slate-500" aria-label="Pagamento seguro">
            <Lock size={13} className="text-emerald-500" aria-hidden />
            <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 sm:inline">
              Pagamento seguro
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
        {/* Resumo compacto no mobile (topo) */}
        <div className="mb-5 lg:hidden">
          <OrderSummaryCard plan={plan} benefits={benefits} compact />
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 xl:grid-cols-[1fr_360px] xl:gap-12">
          {/* ── Coluna esquerda: formulário + pagamento ── */}
          <div className="space-y-4">
            {/* Dados do comprador */}
            <section
              aria-labelledby="section-dados"
              className="rounded-2xl border border-royal/20 bg-white p-5 shadow-sm"
            >
              <h2 id="section-dados" className="mb-4 text-sm font-semibold text-slate-700">
                Dados do comprador
              </h2>
              <div className="space-y-3.5">
                <FormField
                  label="Nome completo"
                  id="ck-name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={errors.name}
                  autoComplete="name"
                  placeholder="João da Silva"
                />
                <FormField
                  label="E-mail"
                  id="ck-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                  placeholder="joao@email.com"
                  readOnly={!!user?.email}
                  hint={user?.email ? "E-mail da sua conta" : undefined}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="Celular (+55)"
                    id="ck-phone"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    error={errors.phone}
                    autoComplete="tel"
                    placeholder="(11) 91234-5678"
                  />
                  <FormField
                    label="CPF"
                    id="ck-cpf"
                    inputMode="numeric"
                    value={form.cpf}
                    onChange={(e) => updateField("cpf", e.target.value)}
                    error={errors.cpf}
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>
            </section>

            {/* Método de pagamento */}
            <section
              aria-labelledby="section-pagamento"
              className="rounded-2xl border border-royal/20 bg-white p-5 shadow-sm"
            >
              <h2 id="section-pagamento" className="mb-4 text-sm font-semibold text-slate-700">
                Forma de pagamento
              </h2>

              {/* Abas */}
              <div className="mb-5 grid grid-cols-2 gap-2" role="tablist" aria-label="Método de pagamento">
                {[
                  { id: "pix", emoji: "🏦", label: "Pix", desc: "Aprovação imediata" },
                  { id: "card", emoji: "💳", label: "Cartão", desc: "Crédito" },
                ].map(({ id, emoji, label, desc }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={method === id}
                    onClick={() => {
                      setMethod(id);
                      setPixData(null);
                    }}
                    className={cx(
                      "flex flex-col items-center rounded-xl border-2 py-3 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                      method === id
                        ? "border-royal bg-royal/10 text-navy"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-royal/10"
                    )}
                  >
                    <span className="text-lg" aria-hidden>{emoji}</span>
                    <span className="mt-0.5 font-semibold leading-none">{label}</span>
                    <span className="mt-0.5 text-[11px] opacity-70">{desc}</span>
                  </button>
                ))}
              </div>

              {/* ── Seção Pix ── */}
              {method === "pix" && !pixData && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <p className="font-medium">Pagamento instantâneo via Pix</p>
                    <p className="mt-0.5 text-emerald-700 opacity-90">
                      QR Code válido por 30 min. Confirmação automática assim que o banco processar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePixSubmit}
                    disabled={pixLoading}
                    className="w-full rounded-xl bg-royal py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                  >
                    {pixLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Gerando QR Code...
                      </span>
                    ) : (
                      "Gerar QR Code Pix"
                    )}
                  </button>
                </div>
              )}

              {method === "pix" && pixData && (
                <PixPanel
                  pixData={pixData}
                  onSuccess={handleSuccess}
                  onCancel={() => setPixData(null)}
                />
              )}

              {/* ── Seção Cartão (Bricks) ── */}
              {method === "card" && (
                <CardBrick
                  plan={plan}
                  validate={validate}
                  user={user}
                  onSuccess={handleSuccess}
                />
              )}
            </section>

            {/* Rodapé de confiança */}
            <p className="pb-6 text-center text-xs text-slate-400">
              <Lock size={11} className="mr-1 inline" aria-hidden />
              Pagamento seguro. Ao comprar você concorda com os{" "}
              <button type="button" className="underline hover:text-slate-600">
                Termos de Uso
              </button>{" "}
              e{" "}
              <button type="button" className="underline hover:text-slate-600">
                Política de Privacidade
              </button>
              .
            </p>
          </div>

          {/* ── Coluna direita: resumo do pedido (desktop, sticky) ── */}
          <aside className="hidden lg:block" aria-label="Resumo do pedido">
            <div className="sticky top-20">
              <OrderSummaryCard plan={plan} benefits={benefits} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ── Sub-componentes ── */

function FormField({ label, id, error, readOnly, hint, ...inputProps }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>
      <input
        id={id}
        readOnly={readOnly}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={cx(
          "w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0",
          error
            ? "border-red-400 bg-red-50 focus-visible:border-red-500 focus-visible:ring-red-200"
            : readOnly
              ? "cursor-default border-slate-200 bg-slate-50 text-slate-500"
              : "border-slate-200 bg-white focus-visible:border-blue-500 focus-visible:ring-royal/20"
        )}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
}

function OrderSummaryCard({ plan, benefits, compact = false }) {
  return (
    <div className={cx("rounded-2xl border border-royal/20 bg-white shadow-sm", compact ? "p-4" : "p-5")}>
      {/* Cabeçalho */}
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-blue-500">
        Resumo do pedido
      </p>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-800">{plan.name}</h3>
        <div className="shrink-0 text-right">
          <p className="text-lg font-black text-slate-900">{plan.price}</p>
          <p className="text-[11px] text-slate-400">
            {plan.type === "anual" ? "/ano" : "/mês"}
          </p>
        </div>
      </div>

      {!compact && (
        <>
          <ul className="mt-4 space-y-2" aria-label="Benefícios incluídos">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-blue-500" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-slate-100" />

          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-800">
            <span>Total hoje</span>
            <span>{plan.price}</span>
          </div>

          {/* Bandeiras */}
          <div className="mb-4 flex flex-wrap gap-1.5" aria-label="Bandeiras aceitas">
            {["VISA", "MASTER", "ELO", "AMEX", "PIX"].map((f) => (
              <span
                key={f}
                className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-500"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Selo segurança */}
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
            <ShieldCheck size={15} className="shrink-0 text-emerald-500" aria-hidden />
            <p className="text-xs text-slate-500">Pagamento seguro.</p>
          </div>
        </>
      )}

      {compact && (
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>{plan.accessDays} dias de acesso</span>
          <span className="flex items-center gap-1 text-emerald-600">
            <ShieldCheck size={12} aria-hidden />
            Seguro
          </span>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

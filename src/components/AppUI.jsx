/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { useDebounce } from "../hooks";

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Button = memo(({ children, variant = "primary", size = "md", loading = false, icon: Icon, className = "", type = "button", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_4px_14px_rgba(29,99,196,0.28)] hover:from-blue-500 hover:to-blue-600 hover:shadow-[0_6px_20px_rgba(29,99,196,0.36)] hover:-translate-y-px active:translate-y-0",
    secondary: "border border-slate-200 bg-white text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
    danger: "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm hover:from-red-400 hover:to-red-500 hover:-translate-y-px active:translate-y-0",
    outline: "border border-slate-200 bg-white text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
  };
  const sizes = {
    sm: "min-h-8 px-3 text-xs gap-1.5 rounded-[8px]",
    md: "min-h-10 px-4 text-sm gap-2 rounded-[10px]",
    lg: "min-h-11 px-5 text-[0.9rem] gap-2 rounded-[11px]",
  };
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin shrink-0" size={14} /> : Icon ? <Icon size={14} className="shrink-0" aria-hidden="true" /> : null}
      {children}
    </button>
  );
});
Button.displayName = "Button";

export const Badge = memo(({ children, variant = "info", size = "sm" }) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25",
    error: "bg-red-50 text-red-700 ring-red-200/80 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25",
    warning: "bg-amber-50 text-amber-700 ring-amber-200/80 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25",
    info: "bg-blue-50 text-blue-700 ring-blue-200/80 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/25",
    neutral: "bg-slate-100 text-slate-600 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
  };
  return (
    <span className={cx(
      "inline-flex items-center rounded-full font-bold ring-1",
      size === "sm" ? "px-2 py-0.5 text-[11px] tracking-tight" : "px-2.5 py-1 text-xs",
      variants[variant]
    )}>
      {children}
    </span>
  );
});
Badge.displayName = "Badge";

export const Card = memo(({ children, variant = "default", hover = true, className = "", ...props }) => (
  <section
    className={cx(
      "rounded-2xl border border-slate-200/80 bg-white p-4",
      "shadow-[0_1px_3px_rgba(15,23,42,0.05),0_4px_12px_rgba(29,99,196,0.04)]",
      hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(15,23,42,0.09),0_8px_32px_rgba(29,99,196,0.06)]",
      variant === "elevated" && "shadow-[0_4px_16px_rgba(15,23,42,0.08),0_8px_32px_rgba(29,99,196,0.05)]",
      variant === "bordered" && "bg-transparent shadow-none",
      className
    )}
    {...props}
  >
    {children}
  </section>
));
Card.displayName = "Card";

export const Input = memo(forwardRef(({ label, error, helperText, icon: Icon, className = "", ...props }, ref) => (
  <label className={cx("grid gap-1.5 text-sm", className)}>
    {label ? (
      <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">{label}</span>
    ) : null}
    <span className="relative">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={15} />
      ) : null}
      <input
        ref={ref}
        className={cx(
          "min-h-10 w-full rounded-xl border bg-slate-50/80 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none",
          "transition-all duration-150",
          "border-slate-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,99,196,0.1)]",
          "dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800",
          Icon && "pl-9",
          error && "border-red-400 bg-red-50/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
        )}
        {...props}
      />
    </span>
    {error || helperText ? (
      <span className={cx("text-xs", error ? "text-red-600" : "text-slate-500 dark:text-slate-400")}>{error || helperText}</span>
    ) : null}
  </label>
)));
Input.displayName = "Input";

export const Select = memo(({ label, options = [], placeholder = "Selecione", error, className = "", ...props }) => (
  <label className={cx("grid gap-1.5 text-sm", className)}>
    {label ? (
      <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">{label}</span>
    ) : null}
    <select
      className={cx(
        "min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-900 outline-none",
        "transition-all duration-150 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,99,196,0.1)]",
        "dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:bg-slate-800",
        error && "border-red-400"
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>
      ))}
    </select>
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
));
Select.displayName = "Select";

export const Textarea = memo(({ label, maxLength, value = "", className = "", ...props }) => (
  <label className={cx("grid gap-1.5 text-sm", className)}>
    {label ? (
      <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</span>
    ) : null}
    <textarea
      className="min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,99,196,0.1)] resize-y"
      maxLength={maxLength}
      value={value}
      {...props}
    />
    {maxLength ? (
      <span className="text-right text-[11px] text-slate-400 tabular-nums">{value.length}/{maxLength}</span>
    ) : null}
  </label>
));
Textarea.displayName = "Textarea";

export const Avatar = memo(({ name = "", src = "", size = "md", online = false }) => {
  const initials = name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const sizes = { sm: "size-8 text-xs rounded-xl", md: "size-9 text-sm rounded-xl", lg: "size-11 text-base rounded-2xl" };
  return (
    <span className={cx(
      "relative grid shrink-0 place-items-center overflow-hidden font-black text-white",
      "bg-gradient-to-br from-blue-500 to-blue-700",
      sizes[size]
    )}>
      {src ? <img src={src} alt={name || "Avatar"} className="h-full w-full object-cover" /> : initials}
      {online ? (
        <i className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
      ) : null}
    </span>
  );
});
Avatar.displayName = "Avatar";

export const ProgressBar = memo(({ value, max = 100, color = "bg-blue-600", label, animated = true }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="grid gap-1.5">
      {label ? (
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">{label}</span>
          <span className="font-bold text-slate-700 tabular-nums">{pct}%</span>
        </div>
      ) : null}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cx("h-full rounded-full", color, animated && "transition-all duration-500 ease-out")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});
ProgressBar.displayName = "ProgressBar";

export const ProgressRing = memo(({ value, max = 100, size = 84, strokeWidth = 7 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke="#1d63c4" strokeWidth={strokeWidth} fill="none"
        strokeLinecap="round" strokeDasharray={circ}
        strokeDashoffset={circ - (pct / 100) * circ}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="50%" y="50%"
        dominantBaseline="middle" textAnchor="middle"
        style={{ transform: "rotate(90deg)", transformOrigin: "center", fontSize: "0.8rem", fontWeight: 800, fill: "#0f172a" }}
      >
        {pct}%
      </text>
    </svg>
  );
});
ProgressRing.displayName = "ProgressRing";

export const Skeleton = memo(({ variant = "card" }) => (
  <div className={cx(
    "animate-pulse rounded-2xl bg-slate-100",
    variant === "text" ? "h-4 rounded-lg" : variant === "avatar" ? "size-9 rounded-xl" : variant === "chart" ? "h-64" : "h-24"
  )} />
));
Skeleton.displayName = "Skeleton";

export const EmptyState = memo(({ icon: Icon = Check, title, description, action }) => (
  <div className="grid min-h-44 place-items-center rounded-2xl border border-dashed border-blue-200/70 bg-blue-50/30 p-8 text-center dark:border-blue-500/25 dark:bg-blue-500/5">
    <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
      <Icon size={20} />
    </div>
    <h3 className="font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    {description ? <p className="mt-1.5 max-w-xs text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
));
EmptyState.displayName = "EmptyState";

export const Tabs = memo(({ items, activeTab, onChange, variant = "pill" }) => (
  <div className={cx(
    "flex gap-1 overflow-x-auto pb-px",
    variant === "underline" && "border-b border-slate-200 gap-0"
  )}>
    {items.map((item) => (
      <button
        key={item}
        onClick={() => onChange(item)}
        className={cx(
          "whitespace-nowrap font-semibold transition-all duration-150 shrink-0",
          variant === "pill"
            ? cx(
              "rounded-[9px] px-3.5 py-2 text-sm",
              activeTab === item
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            )
            : cx(
              "border-b-2 -mb-px rounded-none px-3 py-2 text-sm",
              activeTab === item
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )
        )}
      >
        {item}
      </button>
    ))}
  </div>
));
Tabs.displayName = "Tabs";

export const Pagination = memo(({ page, totalPages, onPageChange }) => (
  <div className="flex items-center justify-end gap-2">
    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)} icon={ChevronLeft}>
      Anterior
    </Button>
    <span className="min-w-14 text-center text-sm font-semibold text-slate-600 tabular-nums">{page} / {totalPages}</span>
    <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
      Próxima <ChevronRight size={14} />
    </Button>
  </div>
));
Pagination.displayName = "Pagination";

export const SearchInput = memo(({ placeholder = "Buscar", onSearch }) => {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value);
  const handleChange = useCallback((e) => setValue(e.target.value), []);
  useEffect(() => { onSearch?.(debounced); }, [debounced, onSearch]);
  return <Input icon={Search} placeholder={placeholder} value={value} onChange={handleChange} />;
});
SearchInput.displayName = "SearchInput";

export const Toast = memo(({ toast, onClose }) => toast ? (
  <div className="fixed right-4 top-4 z-50 min-w-72 max-w-sm rounded-2xl border border-slate-200/80 bg-white p-4 text-sm shadow-[0_8px_32px_rgba(15,23,42,0.12)] aprova-toast-enter">
    <button
      aria-label="Fechar"
      onClick={onClose}
      className="absolute right-3 top-3 grid size-6 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      <X size={13} />
    </button>
    <strong className="block text-slate-900">{toast.title || "Notificação"}</strong>
    <span className="mt-0.5 block text-slate-500">{toast.message}</span>
  </div>
) : null);
Toast.displayName = "Toast";

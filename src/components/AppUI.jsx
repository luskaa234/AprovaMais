/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { Check, Loader2, Search, X } from "lucide-react";
import { useDebounce } from "../hooks";

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Button = memo(({ children, variant = "primary", size = "md", loading = false, icon: Icon, className = "", type = "button", ...props }) => {
  const variants = {
    primary: "aprova-btn-primary",
    secondary: "aprova-btn-secondary",
    ghost: "aprova-btn-ghost",
    danger: "aprova-btn-danger",
    outline: "aprova-btn-outline",
  };
  const sizes = { sm: "min-h-9 px-3 text-xs", md: "min-h-11 px-4 text-sm", lg: "min-h-12 px-5 text-base" };
  return (
    <button type={type} className={cx("inline-flex items-center justify-center gap-2 rounded-[var(--aprova-radius-sm)] font-semibold transition focus:outline-none disabled:opacity-60", variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
    </button>
  );
});
Button.displayName = "Button";

export const Badge = memo(({ children, variant = "info", size = "sm" }) => {
  const variants = {
    success: "aprova-badge-success",
    error: "aprova-badge-error",
    warning: "aprova-badge-warning",
    info: "aprova-badge-info",
    neutral: "aprova-badge-neutral",
  };
  return <span className={cx("aprova-badge inline-flex items-center rounded-full font-bold ring-1", size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm", variants[variant])}>{children}</span>;
});
Badge.displayName = "Badge";

export const Card = memo(({ children, variant = "default", hover = true, className = "", ...props }) => {
  const variants = { default: "aprova-card-default", elevated: "aprova-card-elevated", bordered: "aprova-card-bordered" };
  return <section className={cx("rounded-[var(--aprova-radius)] border p-4 backdrop-blur", hover && "aprova-card-hover", variants[variant], className)} {...props}>{children}</section>;
});
Card.displayName = "Card";

export const Input = memo(forwardRef(({ label, error, helperText, icon: Icon, className = "", ...props }, ref) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-slate-700">{label}</span> : null}
    <span className="relative">
      {Icon ? <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} /> : null}
      <input ref={ref} className={cx("aprova-input min-h-11 w-full rounded-[var(--aprova-radius-sm)] border px-3 text-sm outline-none transition", Icon && "pl-9", error && "aprova-input-error")} {...props} />
    </span>
    {error || helperText ? <span className={cx("text-xs", error ? "text-red-600" : "text-slate-500")}>{error || helperText}</span> : null}
  </label>
)));
Input.displayName = "Input";

export const Select = memo(({ label, options = [], placeholder = "Selecione", error, className = "", ...props }) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-slate-700">{label}</span> : null}
    <select className={cx("aprova-input min-h-11 rounded-[var(--aprova-radius-sm)] border px-3 text-sm outline-none", error && "aprova-input-error")} {...props}>
      <option value="">{placeholder}</option>
      {options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
    </select>
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </label>
));
Select.displayName = "Select";

export const Textarea = memo(({ label, maxLength, value = "", className = "", ...props }) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-slate-700">{label}</span> : null}
    <textarea className="aprova-input min-h-36 rounded-[var(--aprova-radius-sm)] border px-3 py-3 text-sm outline-none" maxLength={maxLength} value={value} {...props} />
    {maxLength ? <span className="text-right text-xs text-slate-500">{value.length}/{maxLength}</span> : null}
  </label>
));
Textarea.displayName = "Textarea";

export const Avatar = memo(({ name = "", src = "", size = "md", online = false }) => {
  const initials = name.split(" ").map((item) => item[0]).slice(0, 2).join("");
  const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-base" };
  return (
    <span className={cx("relative grid shrink-0 place-items-center overflow-hidden rounded-[var(--aprova-radius-sm)] bg-royal font-black text-white", sizes[size])}>
      {src ? <img src={src} alt={name ? `Foto de ${name}` : "Foto de perfil"} className="h-full w-full object-cover" /> : initials}
      {online ? <i className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-[var(--status-success)]" /> : null}
    </span>
  );
});
Avatar.displayName = "Avatar";

export const ProgressBar = memo(({ value, max = 100, color = "bg-royal", label, animated = true }) => (
  <div>
    {label ? <div className="mb-1 flex justify-between text-xs text-slate-500"><span>{label}</span><span>{Math.round((value / max) * 100)}%</span></div> : null}
    <div className="h-2 overflow-hidden rounded-full bg-royal/15"><div className={cx("h-full rounded-full", color, animated && "transition-all duration-500")} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>
  </div>
));
ProgressBar.displayName = "ProgressBar";

export const ProgressRing = memo(({ value, max = 100, size = 84, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#dbeafe" strokeWidth={strokeWidth} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#2563eb" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="rotate-90 fill-slate-950 text-sm font-bold">{Math.round((value / max) * 100)}%</text>
    </svg>
  );
});
ProgressRing.displayName = "ProgressRing";

export const Skeleton = memo(({ variant = "card" }) => <div className={cx("animate-pulse rounded-[var(--aprova-radius)] bg-royal/15", variant === "text" ? "h-4" : variant === "avatar" ? "size-10" : variant === "chart" ? "h-72" : "h-28")} />);
Skeleton.displayName = "Skeleton";

export const EmptyState = memo(({ icon: Icon = Check, title, description, action }) => (
  <div className="grid min-h-40 place-items-center rounded-[var(--aprova-radius)] border border-dashed border-blue-200 bg-white/80 p-6 text-center">
    <Icon className="mx-auto mb-2 text-blue-400" />
    <h3 className="font-bold text-slate-950">{title}</h3>
    {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
));
EmptyState.displayName = "EmptyState";

export const Tabs = memo(({ items, activeTab, onChange, variant = "pill" }) => (
  <div className="flex gap-2 overflow-x-auto">
    {items.map((item) => <button key={item} onClick={() => onChange(item)} className={cx("whitespace-nowrap px-3 py-2 text-sm font-semibold transition", variant === "pill" ? "rounded-[var(--aprova-radius-sm)]" : "border-b-2", activeTab === item ? "border-royal bg-royal text-white" : "border-transparent bg-white text-slate-600 ring-1 ring-royal/20 hover:bg-royal/10")}>{item}</button>)}
  </div>
));
Tabs.displayName = "Tabs";

export const Pagination = memo(({ page, totalPages, onPageChange }) => (
  <div className="flex items-center justify-end gap-2">
    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Anterior</Button>
    <span className="text-sm text-slate-500">{page}/{totalPages}</span>
    <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Próxima</Button>
  </div>
));
Pagination.displayName = "Pagination";

export const SearchInput = memo(({ placeholder = "Buscar", onSearch }) => {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value);
  const handleChange = useCallback((event) => setValue(event.target.value), []);
  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced, onSearch]);
  return <Input icon={Search} placeholder={placeholder} value={value} onChange={handleChange} />;
});
SearchInput.displayName = "SearchInput";

export const Toast = memo(({ toast, onClose }) => toast ? (
  <div className="fixed right-4 top-4 z-50 max-w-sm rounded-[var(--aprova-radius)] border border-royal/20 bg-white p-4 text-sm text-slate-700 shadow-[var(--aprova-shadow)] aprova-toast-enter">
    <button aria-label="Fechar toast" onClick={onClose} className="absolute right-2 top-2 text-gray-500"><X size={14} /></button>
    <strong className="block">{toast.title || "Notificação"}</strong>
    <span className="text-slate-500">{toast.message}</span>
  </div>
) : null);
Toast.displayName = "Toast";

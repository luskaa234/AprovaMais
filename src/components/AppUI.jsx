/* eslint-disable react-refresh/only-export-components */
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Search, X } from "lucide-react";
import { useDebounce } from "../hooks";

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const Button = memo(({ children, variant = "primary", size = "md", loading = false, icon: Icon, className = "", ...props }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 dark:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-800 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-500",
    outline: "border border-gray-700 text-gray-200 hover:bg-gray-800",
  };
  const sizes = { sm: "min-h-8 px-3 text-xs", md: "min-h-10 px-4 text-sm", lg: "min-h-12 px-5 text-base" };
  return (
    <button className={cx("inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60", variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : Icon ? <Icon size={16} aria-hidden="true" /> : null}
      {children}
    </button>
  );
});
Button.displayName = "Button";

export const Badge = memo(({ children, variant = "info", size = "sm" }) => {
  const variants = {
    success: "bg-blue-50 text-blue-700 ring-blue-200",
    error: "bg-red-50 text-red-700 ring-red-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    info: "bg-blue-50 text-blue-700 ring-blue-200",
    neutral: "bg-blue-50 text-blue-800 ring-blue-200",
  };
  return <span className={cx("inline-flex items-center rounded-full font-bold ring-1", size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm", variants[variant])}>{children}</span>;
});
Badge.displayName = "Badge";

export const Card = memo(({ children, variant = "default", hover = true, className = "" }) => {
  const variants = { default: "bg-gray-950/75", elevated: "bg-gray-900 shadow-xl shadow-black/20", bordered: "bg-transparent" };
  const Wrapper = hover ? motion.section : "section";
  return <Wrapper whileHover={hover ? { y: -2 } : undefined} className={cx("rounded-lg border border-gray-800 p-4 backdrop-blur", variants[variant], className)}>{children}</Wrapper>;
});
Card.displayName = "Card";

export const Input = memo(forwardRef(({ label, error, helperText, icon: Icon, className = "", ...props }, ref) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-gray-200">{label}</span> : null}
    <span className="relative">
      {Icon ? <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} /> : null}
      <input ref={ref} className={cx("min-h-10 w-full rounded-lg border bg-gray-950 px-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-500 focus:border-blue-400", Icon && "pl-9", error ? "border-red-500" : "border-gray-700")} {...props} />
    </span>
    {error || helperText ? <span className={cx("text-xs", error ? "text-red-300" : "text-gray-500")}>{error || helperText}</span> : null}
  </label>
)));
Input.displayName = "Input";

export const Select = memo(({ label, options = [], placeholder = "Selecione", error, className = "", ...props }) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-gray-200">{label}</span> : null}
    <select className={cx("min-h-10 rounded-lg border bg-gray-950 px-3 text-sm text-gray-100 outline-none focus:border-blue-400", error ? "border-red-500" : "border-gray-700")} {...props}>
      <option value="">{placeholder}</option>
      {options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
    </select>
    {error ? <span className="text-xs text-red-300">{error}</span> : null}
  </label>
));
Select.displayName = "Select";

export const Textarea = memo(({ label, maxLength, value = "", className = "", ...props }) => (
  <label className={cx("grid gap-1 text-sm", className)}>
    {label ? <span className="font-semibold text-gray-200">{label}</span> : null}
    <textarea className="min-h-36 rounded-lg border border-gray-700 bg-gray-950 px-3 py-3 text-sm text-gray-100 outline-none focus:border-blue-400" maxLength={maxLength} value={value} {...props} />
    {maxLength ? <span className="text-right text-xs text-gray-500">{value.length}/{maxLength}</span> : null}
  </label>
));
Textarea.displayName = "Textarea";

export const Avatar = memo(({ name = "", size = "md", online = false }) => {
  const initials = name.split(" ").map((item) => item[0]).slice(0, 2).join("");
  const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-12 text-base" };
  return <span className={cx("relative grid place-items-center rounded-lg bg-blue-600 font-black text-white", sizes[size])}>{initials}{online ? <i className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-gray-950 bg-blue-500" /> : null}</span>;
});
Avatar.displayName = "Avatar";

export const ProgressBar = memo(({ value, max = 100, color = "bg-blue-500", label, animated = true }) => (
  <div>
    {label ? <div className="mb-1 flex justify-between text-xs text-gray-400"><span>{label}</span><span>{Math.round((value / max) * 100)}%</span></div> : null}
    <div className="h-2 overflow-hidden rounded-full bg-gray-800"><div className={cx("h-full rounded-full", color, animated && "transition-all duration-500")} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>
  </div>
));
ProgressBar.displayName = "ProgressBar";

export const ProgressRing = memo(({ value, max = 100, size = 84, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1f2937" strokeWidth={strokeWidth} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#2563eb" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="rotate-90 fill-white text-sm font-bold">{Math.round((value / max) * 100)}%</text>
    </svg>
  );
});
ProgressRing.displayName = "ProgressRing";

export const Skeleton = memo(({ variant = "card" }) => <div className={cx("animate-pulse rounded-lg bg-gray-800", variant === "text" ? "h-4" : variant === "avatar" ? "size-10" : variant === "chart" ? "h-72" : "h-28")} />);
Skeleton.displayName = "Skeleton";

export const EmptyState = memo(({ icon: Icon = Check, title, description, action }) => (
  <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-gray-700 p-6 text-center">
    <Icon className="mx-auto mb-2 text-gray-500" />
    <h3 className="font-bold text-white">{title}</h3>
    {description ? <p className="mt-1 text-sm text-gray-400">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
));
EmptyState.displayName = "EmptyState";

export const Tabs = memo(({ items, activeTab, onChange, variant = "pill" }) => (
  <div className="flex gap-2 overflow-x-auto">
    {items.map((item) => <button key={item} onClick={() => onChange(item)} className={cx("whitespace-nowrap px-3 py-2 text-sm font-semibold transition", variant === "pill" ? "rounded-lg" : "border-b-2", activeTab === item ? "bg-blue-600 text-white border-blue-500" : "bg-gray-900 text-gray-300 border-transparent hover:bg-gray-800")}>{item}</button>)}
  </div>
));
Tabs.displayName = "Tabs";

export const Pagination = memo(({ page, totalPages, onPageChange }) => (
  <div className="flex items-center justify-end gap-2">
    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Anterior</Button>
    <span className="text-sm text-gray-400">{page}/{totalPages}</span>
    <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Proxima</Button>
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
  <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed right-4 top-4 z-50 max-w-sm rounded-lg border border-gray-700 bg-gray-950 p-4 text-sm text-white shadow-xl">
    <button aria-label="Fechar toast" onClick={onClose} className="absolute right-2 top-2 text-gray-500"><X size={14} /></button>
    <strong className="block">{toast.title || "Notificacao"}</strong>
    <span className="text-gray-300">{toast.message}</span>
  </motion.div>
) : null);
Toast.displayName = "Toast";

import { memo, useCallback, useState } from "react";
import { Button, Input, Select, Textarea } from "../components";

export const FilterForm = memo(({ fields, onFilter }) => {
  const [values, setValues] = useState({});
  const update = useCallback((key, value) => {
    setValues((current) => {
      const next = { ...current, [key]: value };
      onFilter?.(next);
      return next;
    });
  }, [onFilter]);
  return <div className="grid gap-3 md:grid-cols-4">{fields.map((field) => <Select key={field.name} label={field.label} options={field.options} value={values[field.name] || ""} onChange={(event) => update(field.name, event.target.value)} />)}</div>;
});
FilterForm.displayName = "FilterForm";

export const RedacaoEditor = memo(({ value, onChange, onSubmit, loading }) => (
  <div className="grid gap-3">
    <Textarea label="Texto da redacao" value={value} onChange={(event) => onChange(event.target.value)} maxLength={4200} />
    <div className="flex items-center justify-between text-sm text-gray-400"><span>{value.trim() ? value.trim().split(/\s+/).length : 0} palavras</span><Button loading={loading} onClick={onSubmit}>Enviar para IA</Button></div>
  </div>
));
RedacaoEditor.displayName = "RedacaoEditor";

export const ProfileForm = memo(({ user, onSave }) => {
  const [form, setForm] = useState(user);
  const update = useCallback((key, value) => setForm((current) => ({ ...current, [key]: value })), []);
  return <div className="grid gap-3"><Input label="Nome" value={form.name || ""} onChange={(event) => update("name", event.target.value)} /><Input label="Email" value={form.email || ""} error={!form.email?.includes("@") ? "Email invalido" : ""} onChange={(event) => update("email", event.target.value)} /><Select label="Concurso-alvo" value={form.targetContest || ""} options={["Analista Judiciario - TRT", "INSS", "OAB", "ENEM"]} onChange={(event) => update("targetContest", event.target.value)} /><Button onClick={() => onSave(form)}>Salvar perfil</Button></div>;
});
ProfileForm.displayName = "ProfileForm";

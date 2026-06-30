-- Rode no SQL Editor do Supabase antes de testar onboarding/tour.
-- Estes campos pertencem ao perfil da conta e valem para todos os dispositivos.

alter table public.profiles
  add column if not exists onboarding_completo boolean default false,
  add column if not exists tour_completo boolean default false;

update public.profiles
set onboarding_completo = false
where onboarding_completo is null;

update public.profiles
set tour_completo = false
where tour_completo is null;

alter table public.profiles
  alter column onboarding_completo set default false,
  alter column tour_completo set default false,
  alter column onboarding_completo set not null,
  alter column tour_completo set not null;

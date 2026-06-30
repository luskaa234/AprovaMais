alter table public.profiles
  add column if not exists onboarding_completo boolean default false,
  add column if not exists tour_completo boolean default false;

-- A conta e a fonte de verdade. Nulos significam "ainda nao concluido".
update public.profiles
set onboarding_completo = false
where onboarding_completo is null;

update public.profiles
set tour_completo = false
where tour_completo is null;

alter table public.profiles
  alter column onboarding_completo set default false,
  alter column onboarding_completo set not null,
  alter column tour_completo set default false,
  alter column tour_completo set not null;

create index if not exists profiles_tour_completo_idx
  on public.profiles(tour_completo);

-- Se voce usa o trigger handle_new_user deste projeto, garanta que novos usuarios
-- continuem entrando com tour pendente.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name,
    email,
    plano,
    status_plano,
    plano_ativo,
    plano_expira_em,
    em_teste,
    trial_inicio,
    onboarding_completo,
    tour_completo
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    new.email,
    'gratuito',
    'trial',
    true,
    now() + interval '7 days',
    true,
    now(),
    false,
    false
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(public.profiles.name, excluded.name);

  insert into public.ranking (user_id, pontos) values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

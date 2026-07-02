-- Blinda pontuacao contra manipulacao client-side e remove default inseguro de plano ativo.

alter table if exists public.profiles
  alter column plano_ativo set default false,
  alter column em_teste set default false,
  alter column status_plano set default 'sem_acesso',
  alter column plano set default 'gratuito';

create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated' then
    if tg_op = 'INSERT' then
      new.role := 'student';
      new.plano := 'gratuito';
      new.status_plano := 'sem_acesso';
      new.plano_ativo := false;
      new.plano_expira_em := null;
      new.em_teste := false;
      new.vitalicio := false;
    elsif tg_op = 'UPDATE' then
      new.role := old.role;
      new.plano := old.plano;
      new.status_plano := old.status_plano;
      new.plano_ativo := old.plano_ativo;
      new.plano_expira_em := old.plano_expira_em;
      new.em_teste := old.em_teste;
      new.vitalicio := old.vitalicio;
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_fields_trigger on public.profiles;
create trigger protect_profile_admin_fields_trigger
  before insert or update on public.profiles
  for each row
  execute function public.protect_profile_admin_fields();

create or replace function public.incrementar_pontos(pts integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_uid uuid := auth.uid();
  safe_pts integer := greatest(0, least(coalesce(pts, 0), 10));
begin
  if current_uid is null then
    raise exception 'Usuario nao autenticado.';
  end if;

  if pts is null or pts < 0 or pts > 10 then
    raise exception 'Pontuacao invalida.';
  end if;

  insert into public.ranking (user_id, pontos)
  values (current_uid, safe_pts)
  on conflict (user_id)
  do update set pontos = public.ranking.pontos + excluded.pontos;
end;
$$;

create or replace function public.incrementar_pontos(uid uuid, pts integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or uid is distinct from auth.uid() then
    raise exception 'Usuario invalido para pontuacao.';
  end if;

  perform public.incrementar_pontos(pts);
end;
$$;

revoke all on function public.incrementar_pontos(integer) from public;
revoke all on function public.incrementar_pontos(uuid, integer) from public;
grant execute on function public.incrementar_pontos(integer) to authenticated;
grant execute on function public.incrementar_pontos(uuid, integer) to authenticated;

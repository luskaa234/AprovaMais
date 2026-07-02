-- Fecha leitura de conteudo pago no backend.
-- Aplique depois dos schemas existentes.

create or replace function public.has_active_access(uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = uid
      and (
        coalesce(to_jsonb(p)->>'role', '') = 'admin'
        or coalesce((to_jsonb(p)->>'vitalicio')::boolean, false) = true
        or (
          coalesce((to_jsonb(p)->>'plano_ativo')::boolean, false) = true
          and (
            to_jsonb(p)->>'plano_expira_em' is null
            or (to_jsonb(p)->>'plano_expira_em')::timestamptz > now()
          )
        )
      )
  );
$$;

revoke all on function public.has_active_access(uuid) from public;
grant execute on function public.has_active_access(uuid) to authenticated;

alter table if exists public.materiais enable row level security;
alter table if exists public.questoes enable row level security;
alter table if exists public.leis enable row level security;
alter table if exists public.leis_artigos enable row level security;

alter table if exists public.materiais add column if not exists is_public boolean not null default false;
alter table if exists public.questoes add column if not exists is_public boolean not null default false;
alter table if exists public.leis add column if not exists is_public boolean not null default false;
alter table if exists public.leis_artigos add column if not exists is_public boolean not null default false;

do $$
begin
  if to_regclass('public.materiais') is not null then
    drop policy if exists materiais_leitura_publica on public.materiais;
    drop policy if exists materiais_paid_content_read on public.materiais;
    create policy materiais_paid_content_read
      on public.materiais for select
      to authenticated
      using (is_public = true or public.has_active_access(auth.uid()));
    revoke select on public.materiais from anon;
    grant select on public.materiais to authenticated;
  end if;

  if to_regclass('public.questoes') is not null then
    drop policy if exists questoes_leitura_publica on public.questoes;
    drop policy if exists questoes_publicas on public.questoes;
    drop policy if exists questoes_paid_content_read on public.questoes;
    create policy questoes_paid_content_read
      on public.questoes for select
      to authenticated
      using (is_public = true or public.has_active_access(auth.uid()));
    revoke select on public.questoes from anon;
    grant select on public.questoes to authenticated;
  end if;

  if to_regclass('public.leis') is not null then
    drop policy if exists leis_leitura_publica on public.leis;
    drop policy if exists leis_publicas on public.leis;
    drop policy if exists leis_paid_content_read on public.leis;
    create policy leis_paid_content_read
      on public.leis for select
      to authenticated
      using (is_public = true or public.has_active_access(auth.uid()));
    revoke select on public.leis from anon;
    grant select on public.leis to authenticated;
  end if;

  if to_regclass('public.leis_artigos') is not null then
    drop policy if exists leis_artigos_leitura_publica on public.leis_artigos;
    drop policy if exists artigos_publicos on public.leis_artigos;
    drop policy if exists leis_artigos_paid_content_read on public.leis_artigos;
    create policy leis_artigos_paid_content_read
      on public.leis_artigos for select
      to authenticated
      using (is_public = true or public.has_active_access(auth.uid()));
    revoke select on public.leis_artigos from anon;
    grant select on public.leis_artigos to authenticated;
  end if;
end $$;

do $$
begin
  if exists (select 1 from information_schema.schemata where schema_name = 'storage')
     and to_regclass('storage.objects') is not null
     and to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public)
    values ('conteudo', 'conteudo', false)
    on conflict (id) do update set public = false;

    drop policy if exists conteudo_select_paid_access on storage.objects;
    drop policy if exists conteudo_admin_insert on storage.objects;
    drop policy if exists conteudo_admin_update on storage.objects;
    drop policy if exists conteudo_admin_delete on storage.objects;

    create policy conteudo_select_paid_access
      on storage.objects for select
      to authenticated
      using (bucket_id = 'conteudo' and public.has_active_access(auth.uid()));

    create policy conteudo_admin_insert
      on storage.objects for insert
      to authenticated
      with check (
        bucket_id = 'conteudo'
        and exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
            and coalesce(to_jsonb(p)->>'role', '') = 'admin'
        )
      );

    create policy conteudo_admin_update
      on storage.objects for update
      to authenticated
      using (
        bucket_id = 'conteudo'
        and exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
            and coalesce(to_jsonb(p)->>'role', '') = 'admin'
        )
      )
      with check (
        bucket_id = 'conteudo'
        and exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
            and coalesce(to_jsonb(p)->>'role', '') = 'admin'
        )
      );

    create policy conteudo_admin_delete
      on storage.objects for delete
      to authenticated
      using (
        bucket_id = 'conteudo'
        and exists (
          select 1 from public.profiles p
          where p.id = auth.uid()
            and coalesce(to_jsonb(p)->>'role', '') = 'admin'
        )
      );
  end if;
end $$;

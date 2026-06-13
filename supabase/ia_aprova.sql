-- Cache e auditoria leve de uso da IA do Aprova+.
-- Rode no SQL Editor antes de usar a Edge Function ia-aprova.
-- Configure a chave apenas como secret server-side:
-- supabase secrets set OPENROUTER_API_KEY=sk-or-...

create extension if not exists "uuid-ossp";

create table if not exists public.ai_cache (
  id uuid primary key default uuid_generate_v4(),
  cache_key text not null unique,
  task text not null,
  provider text not null default 'openrouter',
  model text not null,
  prompt_hash text,
  response text not null,
  metadata jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  task text not null,
  provider text not null,
  model text not null,
  used_cache boolean not null default false,
  prompt_chars integer not null default 0,
  response_chars integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists ai_cache_cache_key_idx on public.ai_cache(cache_key);
create index if not exists ai_cache_expires_at_idx on public.ai_cache(expires_at);
create index if not exists ai_usage_logs_user_created_idx on public.ai_usage_logs(user_id, created_at desc);
create index if not exists ai_usage_logs_task_idx on public.ai_usage_logs(task);

alter table public.ai_cache enable row level security;
alter table public.ai_usage_logs enable row level security;

drop policy if exists "ai_cache_no_client_access" on public.ai_cache;
create policy "ai_cache_no_client_access"
  on public.ai_cache
  for all
  to authenticated
  using (false)
  with check (false);

drop policy if exists "ai_usage_no_client_access" on public.ai_usage_logs;
create policy "ai_usage_no_client_access"
  on public.ai_usage_logs
  for all
  to authenticated
  using (false)
  with check (false);

revoke all on public.ai_cache from anon, authenticated;
revoke all on public.ai_usage_logs from anon, authenticated;

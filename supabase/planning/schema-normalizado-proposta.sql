-- PLANEJAMENTO: NÃO EXECUTAR AUTOMATICAMENTE
-- Proposta de estrutura normalizada. Revisar antes de converter em migration real.

create schema if not exists content_norm_planning;

create table if not exists content_norm_planning.objectives (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'draft',
  created_at timestamptz default now()
);

create table if not exists content_norm_planning.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  title text,
  status text not null default 'draft',
  quarantine boolean not null default true,
  source_path text,
  source_hash text,
  created_at timestamptz default now()
);

create table if not exists content_norm_planning.content_objectives (
  content_id uuid references content_norm_planning.content_items(id),
  objective_id uuid references content_norm_planning.objectives(id),
  scope_type text not null check (scope_type in ('exclusive','shared','generic_explicit')),
  primary key(content_id, objective_id)
);

create table if not exists content_norm_planning.content_quarantine (
  id uuid primary key default gen_random_uuid(),
  content_id uuid references content_norm_planning.content_items(id),
  reason text not null,
  priority text not null,
  owner text,
  resolved_at timestamptz
);

create index if not exists idx_content_items_status on content_norm_planning.content_items(status, quarantine);
create index if not exists idx_content_objectives_objective on content_norm_planning.content_objectives(objective_id);

-- =============================================================
-- Migração para nuvem: extensões de schema para suporte completo
-- Execute no painel SQL do Supabase antes de rodar o script
-- scripts/migrar-para-nuvem.js
-- =============================================================

-- 1. Estende a tabela questoes para suportar formato militar
--    (certo_errado, alternativas como array, orgao, cargo, ano)
ALTER TABLE public.questoes
  ADD COLUMN IF NOT EXISTS orgao text,
  ADD COLUMN IF NOT EXISTS cargo text,
  ADD COLUMN IF NOT EXISTS ano integer,
  ADD COLUMN IF NOT EXISTS alternativas_json jsonb,
  ADD COLUMN IF NOT EXISTS formato text,
  ADD COLUMN IF NOT EXISTS afirmacao text,
  ADD COLUMN IF NOT EXISTS anulada boolean default false,
  ADD COLUMN IF NOT EXISTS origem text,
  ADD COLUMN IF NOT EXISTS banca_selo text;

-- 2. Estende leis com metadados extras presentes nos JSONs locais
ALTER TABLE public.leis
  ADD COLUMN IF NOT EXISTS tipo text,
  ADD COLUMN IF NOT EXISTS materia text,
  ADD COLUMN IF NOT EXISTS fonte text;

-- 3. Estende leis_artigos com dados estruturados extras
ALTER TABLE public.leis_artigos
  ADD COLUMN IF NOT EXISTS lei_nome text,
  ADD COLUMN IF NOT EXISTS secao text,
  ADD COLUMN IF NOT EXISTS incisos jsonb default '[]',
  ADD COLUMN IF NOT EXISTS paragrafos jsonb default '[]',
  ADD COLUMN IF NOT EXISTS revogado boolean default false,
  ADD COLUMN IF NOT EXISTS cobrancas jsonb default '[]';

-- 4. Cria tabela materiais (apostilas, mapas mentais, etc.)
CREATE TABLE IF NOT EXISTS public.materiais (
  id text primary key,
  tipo text,
  categoria text,
  titulo text,
  materia text,
  descricao text,
  url text,
  source text,
  source_path text,
  created_at timestamptz default now()
);

ALTER TABLE public.materiais ENABLE ROW LEVEL SECURITY;

-- Leitura pública (sem login) para materiais
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'materiais' AND policyname = 'materiais_leitura_publica'
  ) THEN
    CREATE POLICY materiais_leitura_publica ON public.materiais FOR SELECT USING (true);
  END IF;
END $$;

-- Garante que questoes e leis também têm leitura pública
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'questoes' AND policyname = 'questoes_leitura_publica'
  ) THEN
    CREATE POLICY questoes_leitura_publica ON public.questoes FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leis' AND policyname = 'leis_leitura_publica'
  ) THEN
    CREATE POLICY leis_leitura_publica ON public.leis FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leis_artigos' AND policyname = 'leis_artigos_leitura_publica'
  ) THEN
    CREATE POLICY leis_artigos_leitura_publica ON public.leis_artigos FOR SELECT USING (true);
  END IF;
END $$;

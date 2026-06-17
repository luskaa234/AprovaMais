-- Trata contas existentes com dados de perfil como já onboardadas.
-- Contas novas criadas após esta migration começam com onboarding_completo = false
-- e passam pelo fluxo normal de onboarding.
--
-- Execute uma vez no Supabase Dashboard → SQL Editor.

UPDATE profiles
SET onboarding_completo = true
WHERE onboarding_completo = false
  AND (
    concurso_alvo IS NOT NULL
    OR horas_semanais IS NOT NULL
    OR nivel IS NOT NULL
    OR plano != 'gratuito'
  );

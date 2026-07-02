# REVIEW - Auditoria VemAprovar

Data da auditoria: 2026-07-02  
Escopo: React 19 + Vite + Tailwind v4 + Supabase + Zustand + Mercado Pago.  
Observação: auditoria estática/local. Não houve acesso autenticado ao Supabase/Storage/Mercado Pago em runtime; onde depender do ambiente remoto, marquei como suspeita ou pendência de confirmação.

## 1) SEGURANÇA

### Achados

1. **Webhook legado do Mercado Pago aceita POST sem validar assinatura**
   - **Onde:** `api/payment-webhook.js:36-68`, `api/create-checkout.js:81`, `.env.example:27`
   - **Gravidade:** crítico, se essa rota estiver publicada/ativa.
   - **O quê:** a rota legada busca o pagamento no Mercado Pago pelo `id`, mas não valida `x-signature`/HMAC do webhook. O checkout legado ainda usa `/api/payment-webhook` como fallback quando `MP_WEBHOOK_URL` não existe.
   - **Recomendação:** desativar a rota legada em produção ou exigir assinatura HMAC. Remover fallback para webhook sem assinatura e apontar sempre para a Edge Function assinada.

2. **Webhook Edge tem assinatura, mas engole falha interna com HTTP 200**
   - **Onde:** `supabase/functions/webhook-mercadopago/index.ts:38-59`, `supabase/functions/webhook-mercadopago/index.ts:91-93`, `supabase/functions/webhook-mercadopago/index.ts:155-158`
   - **Gravidade:** alto.
   - **O quê:** a Edge Function valida `MP_WEBHOOK_SECRET` e `x-signature`, o que é bom. Porém, em erro interno, retorna `200 ok`, impedindo retry do Mercado Pago.
   - **Recomendação:** retornar 5xx para erros transitórios depois da validação, mantendo 2xx apenas para eventos realmente processados ou ignorados de propósito.

3. **Políticas públicas em tabelas de conteúdo pago**
   - **Onde:** `supabase/migrate_to_cloud.sql:56`, `supabase/migrate_to_cloud.sql:65`, `supabase/migrate_to_cloud.sql:73`, `supabase/migrate_to_cloud.sql:81`
   - **Gravidade:** crítico.
   - **O quê:** `materiais`, `questoes`, `leis` e `leis_artigos` têm políticas `FOR SELECT USING (true)`. Se esse SQL foi aplicado, anon/usuário comum pode ler conteúdo direto via Supabase, fora do paywall.
   - **Recomendação:** trocar leitura pública por acesso autenticado com checagem de plano no backend/RPC/Edge Function. Conteúdo pago não deve depender só do gate React.

4. **Paywall é majoritariamente client-side**
   - **Onde:** `src/pages/InternalApp.jsx:52-60`, `src/services/questoesService.js:505-527`, `src/services/questoesService.js:617-637`, `src/services/bibliotecaService.js:10-24`, `src/services/flashcardsService.js:15-21`
   - **Gravidade:** alto.
   - **O quê:** o app bloqueia telas no front, mas serviços leem `questoes`, `materiais` e arquivos públicos/fallbacks diretamente. Uma chamada direta à API/Storage pode contornar o UI gate se RLS/buckets estiverem abertos.
   - **Recomendação:** mover leitura de conteúdo pago para Edge Functions/RPC com validação de `plano_ativo`/expiração, ou usar signed URLs curtas para arquivos privados.

5. **Storage `conteudo` é usado como URL pública, mas não há política versionada do bucket**
   - **Onde:** `src/services/flashcardsService.js:15-21`
   - **Gravidade:** alto, como suspeita.
   - **O quê:** o código usa `supabase.storage.from("conteudo").getPublicUrl("flashcards/decks.json")`. Não encontrei migration criando/protegendo o bucket `conteudo`.
   - **Recomendação:** confirmar no dashboard se `conteudo` é privado. Para conteúdo pago, usar bucket privado + signed URLs emitidas após checagem de plano.

6. **RPC de pontuação aceita `uid` e `pts` enviados pelo cliente**
   - **Onde:** `supabase/schema.sql:268`, `src/services/questoesService.js:795`
   - **Gravidade:** alto.
   - **O quê:** `incrementar_pontos(uid, pts)` é `security definer` e recebe usuário/pontos do cliente. Não vi checagem explícita de `auth.uid() = uid` nem limite de `pts`.
   - **Recomendação:** validar `uid = auth.uid()`, limitar pontos permitidos por ação e restringir `EXECUTE` a `authenticated`.

7. **Admin inconsistente entre front e backend**
   - **Onde:** `src/admin/AdminLayout.jsx:59`, `src/admin/AdminLayout.jsx:129`, `src/contexts/UserContext.jsx:460`, `supabase/functions/_shared/admin.ts:7-31`
   - **Gravidade:** médio.
   - **O quê:** o front hardcoda um e-mail específico e exige `role === "admin"`. O backend usa allowlist `ADMIN_EMAILS`. Pode negar admin legítimo ou exibir UI diferente da regra real.
   - **Recomendação:** centralizar a decisão em backend/claim/role e o front apenas consumir um endpoint `me/admin`.

8. **Campos de plano aparecem em payloads do perfil no cliente**
   - **Onde:** `src/contexts/UserContext.jsx:32-50`, mitigação em `supabase/admin_panel.sql:71-107`
   - **Gravidade:** médio.
   - **O quê:** o cliente conhece e pode tentar enviar campos como `plano`. O trigger `protect_profile_admin_fields` impede alteração se aplicado, mas isso depende da migration estar ativa no banco remoto.
   - **Recomendação:** confirmar trigger em produção e remover campos administrativos dos payloads aceitos no front.

9. **Segredos/envs locais**
   - **Onde:** `.env:2`, `.env:5`, `.env.example:4`, `.gitignore:15-17`
   - **Gravidade:** alto.
   - **O quê:** `.env` local contém `VITE_GEMINI_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY`. O `.gitignore` protege `.env`, mas se algum valor já foi commitado ou compartilhado, precisa rotação. `VITE_GEMINI_API_KEY` iria para o bundle se usado.
   - **Recomendação:** manter service role apenas em Supabase/Vercel secrets, nunca no front. Remover `VITE_GEMINI_API_KEY` se não usado e rotacionar qualquer segredo já exposto.

10. **Variáveis `VITE_*` expostas ao cliente**
    - **Onde:** `.env:2-4`, `.env.example:1-3`, `.env.example:13`, `.env.example:16`, `.env.example:27-29`, `src/lib/supabase.js:3-5`, `src/services/paymentService.js:11-33`
    - **Gravidade:** baixo a alto, conforme variável.
    - **O quê:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_AUTH_REDIRECT_URL`, `VITE_API_URL`, `VITE_MP_PUBLIC_KEY`, `VITE_PAYMENT_CHECKOUT_ENDPOINT` e URLs de checkout são esperadas no cliente. `VITE_GEMINI_API_KEY` não deveria ser pública se for segredo real.
    - **Recomendação:** manter só chaves públicas em `VITE_*`; IA/MP/service role devem ficar em Edge Functions/API server.

### RLS observada nos SQL versionados

- **RLS ativa no schema base:** `profiles`, `questoes`, `tentativas`, `questoes_salvas`, `caderno_erros`, `flashcard_decks`, `flashcards`, `revisoes`, `taf_treinos`, `taf_testes`, `leis`, `leis_artigos`, `artigos_grifados`, `artigos_favoritos`, `artigos_notas`, `ranking`, `notificacoes` em `supabase/schema.sql:197-213`.
- **RLS ativa em migrations adicionais:** `materiais` em `supabase/migrate_to_cloud.sql:49`; `planos`, `assinaturas`, `pagamentos` em `supabase/mercado_pago.sql:71-73`; `app_config`, `admin_logs` em `supabase/admin_panel.sql:39-40`; `ai_cache`, `ai_usage_logs` em `supabase/ia_aprova.sql:38-39`.
- **Ponto crítico:** RLS ativa não basta se a policy é pública. `migrate_to_cloud.sql` abre leitura com `USING (true)`.
- **Não confirmado:** estado real do banco remoto, policies efetivamente aplicadas, buckets existentes e public/private no Supabase.

## 2) O QUE FUNCIONA / O QUE ESTÁ QUEBRADO

| Módulo/fluxo | Estado | Evidência | Recomendação |
|---|---:|---|---|
| Cadastro/login | ok com ressalvas | `src/contexts/UserContext.jsx` faz Supabase Auth, profile sync e fallback local. Catch silencioso em `src/contexts/UserContext.jsx:308`. | Verificar runtime e mostrar erro quando sync de perfil falhar. |
| Paywall/acesso pago | frágil | Gate em `src/pages/InternalApp.jsx:52-60`, mas serviços leem conteúdo direto. | Validar acesso no backend/RLS, não só na UI. |
| Compra Mercado Pago via Edge Functions | parcialmente ok | Edge webhook valida HMAC em `supabase/functions/webhook-mercadopago/index.ts:38-59`. | Testar ponta a ponta com MP real; ajustar retorno 5xx em falhas. |
| Compra via API legada | risco crítico | `api/create-checkout.js:81` aponta fallback para webhook sem HMAC. | Não usar em produção sem assinatura. |
| Questões | funcional, mas com fallback público | Supabase em `src/services/questoesService.js:505`; assets locais em `src/services/questoesService.js:133`, `:152`, `:165`, `:579`, `:637`. | Backend para conteúdo pago e tratamento de erro mais visível. |
| Geração de questões IA | funcional com ressalvas | Gera via `aiService` e só injeta em Zustand em `src/services/questoesService.js:861-884`. | Persistir/registrar geração se ela precisar sobreviver ao refresh. |
| TAF | funcional básico | Lê/grava `taf_testes` e `taf_treinos` em `src/services/tafService.js:50-90`. | Confirmar migrations no banco e exibir erro quando insert/update falhar. |
| Plano de estudos | funcional, mas salva local antes do backend | `src/services/planoService.js:190-240` atualiza Zustand e só depois tenta Supabase. | Evitar sensação de sucesso definitivo quando Supabase falha. |
| Biblioteca/materiais | parcial | Lista Supabase ou manifest; `favoritar()` é stub em `src/services/bibliotecaService.js:81-83`. | Implementar favorito real ou remover UI que prometa isso. |
| Flashcards | parcial | Carrega deck público/local; catches silenciosos em `src/services/flashcardsService.js:23`, `:72`, `:84`. | Confirmar privacidade do bucket e persistência de decks. |
| Leis secas | funcional com ressalvas | Usa serviços/tabelas adicionais; depende de SQL extra como `supabase/leis_secas_estudo.sql`. | Confirmar migrations e unificar nomes de tabelas de grifos/notas. |
| Admin | funcional com inconsistência | Front hardcoded em `src/admin/AdminLayout.jsx:59`, backend allowlist em `_shared/admin.ts`. | Centralizar role/admin no backend. |
| Botões sem ação/TODO | poucos achados | Busca por `TODO/FIXME/onClick={}` só encontrou comentário em `supabase/functions/ia-aprova/index.ts:10`. Stub real: `bibliotecaService.favoritar`. | Priorizar stubs que aparecem como feature para usuário. |

## 3) QUALIDADE DE CÓDIGO

1. **Lint falha**
   - **Onde:** `src/components/HtmlFrameViewer.jsx:17`, `src/pages/MapasMentais/index.jsx:192`
   - **Gravidade:** médio.
   - **O quê:** `npm run lint` retorna 2 erros `react-hooks/set-state-in-effect`.
   - **Recomendação:** ajustar esses efeitos antes de CI obrigatório.

2. **Build passa**
   - **Onde:** comando `npm run build`
   - **Gravidade:** baixo.
   - **O quê:** build Vite conclui com sucesso. Há aviso de timing de plugins, sem erro funcional.
   - **Recomendação:** manter build no CI.

3. **CSS gigante e difícil de manter**
   - **Onde:** `src/index.css` com ~406 KB/~18k linhas; `src/landing-light.css` ~107 KB; `src/landing-light.css.bak` ~106 KB.
   - **Gravidade:** médio.
   - **O quê:** muita regra global/responsiva aumenta risco de regressão mobile e duplicação.
   - **Recomendação:** consolidar por domínio/componente e remover backup só depois de aprovação.

4. **Arquivos grandes/concentrados**
   - **Onde:** `src/pages/MapasMentais/index.jsx`, `src/services/questoesService.js`, `src/stores/index.js`, `src/pages/Plano/index.jsx`, `src/admin/AdminLayout.jsx`
   - **Gravidade:** médio.
   - **O quê:** módulos grandes misturam UI, estado, fallback e integração.
   - **Recomendação:** depois das correções críticas, separar serviços, hooks e componentes por fluxo.

5. **Erros engolidos e sucesso local mesmo com backend falhando**
   - **Onde:** `src/contexts/UserContext.jsx:308`, `src/services/questoesService.js:610`, `src/services/questoesService.js:797-833`, `src/services/planoService.js:200-240`, `src/services/flashcardsService.js:23`
   - **Gravidade:** médio.
   - **O quê:** falhas de sync viram `catch {}` ou `console.warn`, mas usuário pode acreditar que salvou.
   - **Recomendação:** diferenciar estado local/sincronizado e exibir feedback recuperável.

6. **Texto com encoding corrompido**
   - **Onde:** exemplos em `src/services/planoService.js:28-31`, `src/services/tafService.js:122`
   - **Gravidade:** baixo.
   - **O quê:** aparecem strings como `QuestÃµes`, `RevisÃ£o`, `EliminatÃ³rio`.
   - **Recomendação:** normalizar encoding para UTF-8 e revisar textos exibidos.

## 4) PESO MORTO

### Dependências candidatas a não usadas

Achado por busca direta de imports/usos no código. Confirmar antes de remover, porque algumas podem ser usadas por configuração, scripts ou runtime indireto.

- **Onde:** `package.json`
- **Gravidade:** baixo.
- **Candidatas:** `@google/generative-ai`, `@radix-ui/react-tabs`, `@supabase/auth-helpers-react`, `@tsparticles/engine`, `@tsparticles/react`, `embla-carousel-react`, `next-seo`, `posthog-js`, `react-countup`, `react-hot-toast`, `react-intersection-observer`, `react-microsoft-clarity`, `styled-components`, `swiper`.
- **Cuidado:** `expo` aparece em `tsconfig.json`, então não remover sem checar. `@types/*` podem ser necessários para tooling mesmo sem import direto.
- **Comando para rodar se aprovar:**
  ```powershell
  npm uninstall @google/generative-ai @radix-ui/react-tabs @supabase/auth-helpers-react @tsparticles/engine @tsparticles/react embla-carousel-react next-seo posthog-js react-countup react-hot-toast react-intersection-observer react-microsoft-clarity styled-components swiper
  ```

### Arquivos órfãos/vestigiais

1. **Backups no `src`**
   - **Onde:** `src/pages/MapasMentais/index.QUEBRADO.bak`, `src/landing-light.css.bak`
   - **Gravidade:** baixo.
   - **Recomendação:** remover só depois de confirmar que não há referência histórica necessária.
   - **Comando para rodar se aprovar:**
     ```powershell
     Remove-Item -LiteralPath "src/pages/MapasMentais/index.QUEBRADO.bak","src/landing-light.css.bak"
     ```

2. **Assets pesados versionados**
   - **Onde:** `storage/content`, `flashcards-apkg`, `material-provas`, `public/aprova-demo.mp4`
   - **Gravidade:** médio.
   - **O quê:** grupos locais somam ~715 MB; principais tipos: PDFs ~586 MB, APKG ~85 MB, JSON ~26 MB. Maiores itens incluem `public/aprova-demo.mp4` 10,1 MB e `storage/content/leis/index.json` 9,22 MB.
   - **Recomendação:** mover conteúdo pesado para Storage/CDN privado, versionar apenas manifests/scripts.
   - **Comando para auditar antes de remover:**
     ```powershell
     Get-ChildItem -Path public,storage,flashcards-apkg,material-provas -Recurse -File | Sort-Object Length -Descending | Select-Object -First 50 FullName,Length
     ```

3. **Restos de integrações**
   - **Onde:** `.env:2`, `package.json`
   - **Gravidade:** baixo/médio.
   - **O quê:** `VITE_GEMINI_API_KEY` e `@google/generative-ai` aparecem, mas a IA ativa usa OpenRouter via Edge Function.
   - **Recomendação:** remover a dependência/env se confirmado que Gemini não será usado.

## 5) PERFORMANCE / MOBILE

1. **Bundle CSS e JS pesados**
   - **Onde:** `dist/assets/index-*.css` 478,72 KB gzip 84,23 KB; `dist/assets/charts-*.js` 421,65 KB gzip 119,14 KB; app principal 411,47 KB gzip 131,87 KB.
   - **Gravidade:** médio.
   - **O quê:** CSS global e Recharts são os maiores blocos.
   - **Recomendação:** reduzir CSS global, carregar gráficos apenas nas telas que precisam, revisar imports de bibliotecas visuais.

2. **Conteúdo grande pode ir junto do deploy se estiver em diretórios públicos/copied**
   - **Onde:** `public/aprova-demo.mp4`, `storage/content`, `flashcards-apkg`, `material-provas`
   - **Gravidade:** médio.
   - **O quê:** vídeo público de 10,1 MB e muito conteúdo PDF/APKG/JSON no repo.
   - **Recomendação:** confirmar o que entra no build/deploy e servir conteúdo pesado por CDN/Storage.

3. **Mobile/admin ainda frágil por CSS global**
   - **Onde:** `src/index.css`, `src/layouts/AppShell.jsx`, `src/admin/AdminLayout.jsx`
   - **Gravidade:** médio.
   - **O quê:** havia regressões visuais recentes em seleção e sidebar mobile. A quantidade de override global aumenta chance de novos efeitos colaterais.
   - **Recomendação:** isolar estilos do admin/app shell e testar viewport iPhone/Android antes de publicar.

4. **Alvos e overflow exigem regressão visual**
   - **Onde:** navegação mobile em `src/layouts/AppShell.jsx`, painel admin em `src/admin/AdminLayout.jsx`
   - **Gravidade:** baixo/médio.
   - **O quê:** muitos controles compactos e scrolls internos; risco de toque pequeno/overflow.
   - **Recomendação:** checklist mobile com 360x740, 390x844 e 430x932.

## 6) DADOS / SUPABASE

1. **Schema principal tem boa base, mas migrations parecem fragmentadas**
   - **Onde:** `supabase/schema.sql`, `supabase/migrate_to_cloud.sql`, `supabase/mercado_pago.sql`, `supabase/fix_planos_pagamento.sql`, `supabase/admin_panel.sql`
   - **Gravidade:** médio.
   - **O quê:** há múltiplos SQLs alterando `profiles`, planos/pagamentos e leitura de conteúdo. Sem histórico de migrations aplicado, é difícil saber o estado real.
   - **Recomendação:** consolidar migrations numeradas e rodar diff contra banco remoto.

2. **Default de plano ativo em migration de pagamento**
   - **Onde:** `supabase/fix_planos_pagamento.sql:8-14`, especialmente `plano_ativo boolean not null default true`
   - **Gravidade:** alto, se aplicado sem regra de trial.
   - **O quê:** novos perfis podem nascer ativos por default. Pode ser intencional para trial, mas exige expiração/controle claro.
   - **Recomendação:** usar default seguro e criar trial explicitamente com `plano_expira_em`.

3. **Tabelas de estudo das leis têm nomes duplicados/conceitos paralelos**
   - **Onde:** base usa `artigos_grifados`, `artigos_notas`; serviço/migrations adicionais usam `grifos`, `notas`, `leitura_progresso`.
   - **Gravidade:** médio.
   - **O quê:** risco de feature salvar em tabela diferente da que a UI consulta, dependendo da migration aplicada.
   - **Recomendação:** escolher um modelo único e migrar dados.

4. **Índices de questões cobrem parte dos filtros, mas não todos**
   - **Onde:** `supabase/schema.sql:49-53`, filtros no serviço em `src/services/questoesService.js:489-527`
   - **Gravidade:** médio.
   - **O quê:** há índices para `materia`, `banca`, `dificuldade`, `topico` e FTS do enunciado. Filtros adicionados por `concurso`, `orgao`, `ano` podem sofrer em base grande.
   - **Recomendação:** medir queries reais e criar índices para filtros frequentes (`concurso`, `orgao`, `ano`) ou normalizar dimensões.

5. **Storage**
   - **Onde:** `supabase/profile_avatars.sql:4-14`, `src/services/flashcardsService.js:15-21`
   - **Gravidade:** médio.
   - **O quê:** bucket `avatars` é público por design; não sensível se for só foto. Bucket `conteudo` é usado, mas não encontrei migration/policy dele. Espaço remoto não foi possível medir.
   - **Recomendação:** confirmar buckets no dashboard, public/private e consumo. Conteúdo pago deve ficar privado.

## 7) VEREDITO E PRIORIZAÇÃO

### Top 5 urgentes

1. **Fechar conteúdo pago no backend/RLS**
   - **Gravidade:** crítico
   - **Esforço:** alto
   - **Onde:** `supabase/migrate_to_cloud.sql:56-81`, `src/services/questoesService.js`, `src/services/bibliotecaService.js`, `src/services/flashcardsService.js`

2. **Desativar ou assinar webhook legado do Mercado Pago**
   - **Gravidade:** crítico
   - **Esforço:** médio
   - **Onde:** `api/payment-webhook.js`, `api/create-checkout.js:81`

3. **Corrigir retorno de erro da Edge Function de webhook**
   - **Gravidade:** alto
   - **Esforço:** baixo
   - **Onde:** `supabase/functions/webhook-mercadopago/index.ts:155-158`

4. **Blindar RPC `incrementar_pontos`**
   - **Gravidade:** alto
   - **Esforço:** baixo/médio
   - **Onde:** `supabase/schema.sql:268`, `src/services/questoesService.js:795`

5. **Confirmar estado real de RLS/buckets no Supabase**
   - **Gravidade:** alto
   - **Esforço:** médio
   - **Onde:** Supabase remoto

### Top 5 ganhos rápidos

1. Corrigir os 2 erros de lint em `HtmlFrameViewer` e `MapasMentais`.
2. Remover `VITE_GEMINI_API_KEY` e dependência Gemini se não houver uso real.
3. Remover backups `.bak` após aprovação.
4. Centralizar regra de admin no backend e eliminar e-mail hardcoded do front.
5. Mostrar feedback quando sync com Supabase falhar em questões/plano/perfil.

### Pode esperar

- Refatoração ampla de CSS e componentes grandes, desde que não bloqueie mobile crítico.
- Limpeza de dependências cosméticas, depois de fechar segurança.
- Otimização fina de bundle, após resolver paywall/RLS/webhook.
- Organização dos assets pesados, se eles não estiverem entrando no deploy público atual.

## Bloqueios da auditoria

- Não tive acesso ao Supabase remoto para listar policies/tabelas reais, checar buckets, medir storage ou rodar `EXPLAIN`.
- Não tive credenciais/runtime do Mercado Pago para validar compra ponta a ponta.
- Não rodei testes E2E no navegador; a auditoria foi estática + `npm run lint` + `npm run build`.

# REVIEW - Auditoria VemAprovar

Data da auditoria: 2026-07-02  
Escopo: React 19 + Vite + Tailwind v4 + Supabase + Zustand + Mercado Pago.  
Modo: auditoria estática/local. Rodei `npm run lint` e `npm run build`. Não houve acesso autenticado ao Supabase remoto, Storage remoto ou Mercado Pago real em runtime; pontos dependentes do ambiente remoto estão marcados como suspeita/pendência.

Observação de estado: a árvore está suja antes desta auditoria (`src/App.jsx`, `src/components/ui/button.jsx`, `src/index.css`, `src/landing-light.css`, `src/services/paymentService.js` modificados e `src/components/payment/PaymentCheckout.jsx` deletado). Não reverti nem corrigi nada.

## 1) SEGURANÇA

### Achados

1. **Segredos reais aparecem no `.env` local**
   - **Onde:** `.env:2`, `.env:5`
   - **Gravidade:** crítico se esses valores já foram compartilhados/commitados.
   - **O quê:** há chave de IA em variável `VITE_*` e `SUPABASE_SERVICE_ROLE_KEY` no ambiente local. Não colei valores neste relatório.
   - **Recomendação:** rotacionar qualquer chave exposta, manter service role só em secrets de servidor/Edge Function e remover chave de IA de `VITE_*`.

2. **Migrations antigas ainda recriam acesso/trial ativo por default**
   - **Onde:** `supabase/fix_auth_production.sql:21-23`, `supabase/fix_auth_production.sql:47-52`, `supabase/fix_profiles_rls.sql:21-23`, `supabase/fix_profiles_rls.sql:65-67`, `supabase/admin_panel.sql:84-85`
   - **Gravidade:** alto.
   - **O quê:** arquivos legados ainda definem `plano_ativo default true`, `em_teste default true` ou expiração automática de 7 dias. A migration segura existe, mas esses SQLs podem desfazer a regra se alguém rodar depois.
   - **Recomendação:** marcar esses arquivos como legados/perigosos ou atualizar para `plano_ativo default false`, criando trial explicitamente com `plano_expira_em`.

3. **Schema base ainda permite leitura ampla de conteúdo para qualquer usuário autenticado**
   - **Onde:** `supabase/schema.sql:218`, `supabase/schema.sql:220`, `supabase/schema.sql:222`
   - **Gravidade:** alto se o banco remoto estiver só com o schema base.
   - **O quê:** `questoes`, `leis` e `leis_artigos` têm policies de select para `auth.role() = 'authenticated'`. Isso não é anon público, mas também não valida plano ativo.
   - **Recomendação:** garantir que `supabase/migrations/20260702140000_secure_paid_content.sql` foi aplicada no banco remoto e que as policies antigas foram removidas.

4. **Controle seguro de conteúdo pago existe, mas depende de migration aplicada**
   - **Onde:** `supabase/migrations/20260702140000_secure_paid_content.sql:4-30`, `:37-90`, `:92-154`, `supabase/functions/conteudo-url/index.ts:18-35`
   - **Gravidade:** médio/alto como pendência de confirmação.
   - **O quê:** há `has_active_access`, `is_public`, bucket `conteudo` privado e Edge Function `conteudo-url` gerando signed URL. Localmente está correto, mas não confirmei o estado real do Supabase remoto.
   - **Recomendação:** listar policies/buckets em produção e testar acesso direto a `materiais`, `questoes`, `leis`, `leis_artigos` e Storage com usuário sem plano.

5. **Paywall ainda existe no front, mas agora há caminho backend para conteúdo**
   - **Onde:** gate front em `src/pages/InternalApp.jsx:52-60`, `src/pages/InternalApp.jsx:232-234`; acesso assinado em `src/services/contentAccessService.js:3-16`; leitura direta em `src/services/questoesService.js:505`, `src/services/bibliotecaService.js:11`, `src/services/leisService.js:92`
   - **Gravidade:** alto se RLS remoto não estiver seguro.
   - **O quê:** UI bloqueia usuários sem acesso, mas os serviços ainda consultam tabelas diretamente. Isso é aceitável somente se RLS/policies seguras estiverem aplicadas.
   - **Recomendação:** tratar o front como conveniência; validar paywall sempre em RLS/Edge Function.

6. **Webhook legado do Mercado Pago está desativado**
   - **Onde:** `api/payment-webhook.js:1-6`, `api/create-checkout.js:42-49`, `api/create-checkout.js:85`
   - **Gravidade:** baixo no estado atual.
   - **O quê:** a rota legada retorna `410` e o checkout legado exige `MP_WEBHOOK_URL` HTTPS, sem fallback para `/api/payment-webhook`.
   - **Recomendação:** manter desativado ou remover em limpeza futura. Não reativar sem HMAC.

7. **Webhook Edge valida assinatura e tem idempotência razoável**
   - **Onde:** `supabase/functions/webhook-mercadopago/index.ts:37-59`, `:91-93`, `:119-141`, `:154-164`
   - **Gravidade:** baixo/médio.
   - **O quê:** valida `MP_WEBHOOK_SECRET`/`x-signature`, rejeita assinatura inválida, usa `mp_payment_id` e retorna `500` em erro interno. Bom sinal.
   - **Recomendação:** testar com webhook real do Mercado Pago e confirmar unique index em `pagamentos.mp_payment_id` no remoto.

8. **RPC de pontuação foi blindada em migration nova**
   - **Onde:** `supabase/migrations/20260702140500_secure_points_and_plan_defaults.sql:47-90`, chamada em `src/services/questoesService.js:772`
   - **Gravidade:** baixo no estado versionado atual.
   - **O quê:** `incrementar_pontos(pts)` limita 0..10, usa `auth.uid()` e o overload legado valida `uid = auth.uid()`. O front chama só `{ pts: ... }`.
   - **Recomendação:** confirmar que essa migration foi aplicada depois do schema antigo.

9. **Admin está mais centralizado, mas depende de allowlist em secret**
   - **Onde:** `supabase/functions/_shared/admin.ts:7-31`, `supabase/functions/admin-me/index.ts:10-25`, `src/contexts/UserContext.jsx:196-214`, `src/admin/AdminLayout.jsx:129-165`
   - **Gravidade:** médio.
   - **O quê:** backend decide admin por `ADMIN_EMAILS`; o front consome `admin-me`. Não vi e-mail hardcoded atual no front.
   - **Recomendação:** manter `ADMIN_EMAILS` como secret, revisar logs de admin e evitar role admin editável pelo próprio usuário.

10. **Variáveis `VITE_*` expostas ao cliente**
    - **Onde:** `.env.example:1-3`, `.env.example:15`, `.env.example:18`, `.env.example:31-33`, `src/lib/supabase.js:3-5`, `src/services/paymentService.js:11-33`
    - **Gravidade:** baixo a alto conforme variável.
    - **O quê:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, URLs e `VITE_MP_PUBLIC_KEY` são esperadas no client. Chave de IA real não deve ser `VITE_*`.
    - **Recomendação:** deixar em `VITE_*` somente valores publicáveis.

### RLS observada nos SQL versionados

- **RLS ativa no schema base:** `profiles`, `questoes`, `tentativas`, `questoes_salvas`, `caderno_erros`, `flashcard_decks`, `flashcards`, `revisoes`, `taf_treinos`, `taf_testes`, `leis`, `leis_artigos`, `artigos_grifados`, `artigos_favoritos`, `artigos_notas`, `ranking`, `notificacoes` em `supabase/schema.sql:197-213`.
- **RLS ativa em migrations adicionais:** `materiais` em `supabase/migrate_to_cloud.sql:108`; `planos`, `assinaturas`, `pagamentos` em `supabase/fix_planos_pagamento.sql:84-86`; `app_config`, `admin_logs` em `supabase/admin_panel.sql:39-40`; `ai_cache`, `ai_usage_logs` em `supabase/ia_aprova.sql:38-39`; `plano_atividades` em `supabase/plano_atividades.sql:25`.
- **Conteúdo pago seguro nos SQL novos:** `supabase/migrations/20260702140000_secure_paid_content.sql`.
- **Não confirmado:** estado real do banco remoto, ordem real das migrations, policies efetivamente aplicadas e buckets public/private.

## 2) O QUE FUNCIONA / O QUE ESTÁ QUEBRADO

| Módulo/fluxo | Estado | Evidência | Recomendação |
|---|---:|---|---|
| Cadastro/login | ok com ressalvas | Supabase Auth em `src/contexts/UserContext.jsx:229-301`; login Google em `src/contexts/UserContext.jsx:264-279`; sync admin em `src/contexts/UserContext.jsx:196-214`. | Testar OAuth/redirect em produção e exibir melhor erro de sync. |
| Admin | ok com dependência de secret | UI bloqueia via `isAdmin` em `src/admin/AdminLayout.jsx:129-145`; backend exige `ADMIN_EMAILS` em `_shared/admin.ts:19-31`. | Confirmar `ADMIN_EMAILS` no ambiente e logs de admin. |
| Paywall/acesso pago | parcialmente ok | Gate em `InternalApp.jsx:52-60`; Edge `verificar-acesso` em `supabase/functions/verificar-acesso/index.ts:10-22`; RLS segura em migration nova. | Validar contra usuário sem plano no Supabase remoto. |
| Compra Pix | parcialmente ok | `src/pages/Checkout/index.jsx:153-166` chama `createPixPayment`; Edge cria Pix em `criar-pagamento-pix/index.ts:11-67`; webhook ativa plano. | Testar ponta a ponta no Mercado Pago real. |
| Compra cartão | parcial/suspeita | `criar-assinatura-cartao/index.ts:31-80` ativa se preapproval voltar `authorized`; `CardBrick` existe. | Testar SDK/Brick real e webhooks de recorrência/cancelamento. |
| Webhook Mercado Pago | ok local | HMAC e status em `webhook-mercadopago/index.ts`. | Testar assinatura real e retry. |
| Questões | funcional com dependência de RLS | Leitura Supabase em `questoesService.js:505`, `:580`, `:605`; fallback local em `:565-577`, `:616-634`. | Garantir policy por plano no remoto; reduzir fallback silencioso. |
| Geração de questões IA | funcional com ressalvas | IA via Edge em `aiService.js:119-132`; questões geradas só entram no Zustand em `questoesService.js:839-863`. | Persistir se precisar sobreviver ao refresh. |
| TAF | funcional básico | Leitura/gravação em `tafService.js:50-90`; cálculo local em `tafService.js:98-123`. | Confirmar schema remoto e tratar falha no update de `profiles.taf_nota`. |
| Plano de estudos | funcional com risco de sync | Atualiza local antes do Supabase em `planoService.js:188-205`, `:207-226`, `:233-240`. | Mostrar estado "salvo localmente, pendente de nuvem" quando falhar. |
| Biblioteca/materiais | parcial | Lista `materiais` em `bibliotecaService.js:11`; URL segura em `bibliotecaService.js:86-87`; favorito é stub em `bibliotecaService.js:82-83`. | Implementar favoritos ou remover promessa de UI. |
| Flashcards | parcial | Decks locais via signed URL em `flashcardsService.js:15-21`; decks de usuário em `:66-80`; fallback silencioso em `:83-88`. | Diferenciar conteúdo premium de deck pessoal e informar falhas. |
| Leis secas | funcional com inconsistência de tabelas | Leitura em `leisService.js:92-127`; grifos/notas usam `grifos`, `notas`, `leitura_progresso` em `leisService.js:263`, `:305`, `:315`. | Unificar com tabelas base `artigos_grifados`/`artigos_notas` ou migrar de vez. |
| Redação | mínimo/stub | `src/services/redacaoService.js:11` exporta serviço simples. | Marcar como beta ou completar fluxo. |
| Botões sem ação/TODO | poucos achados | Busca não achou `onClick={}`. Stub real: `bibliotecaService.favoritar`. | Priorizar stubs expostos ao usuário. |

### Falhas caladas / feedback fraco

- `src/services/flashcardsService.js:83-88`: falha ao carregar cards cai para local sem feedback.
- `src/services/questoesService.js:156-170`, `:230-232`, `:629-631`: fallbacks silenciosos de acervo local.
- `src/services/planoService.js:188-205`: cria local antes da nuvem e lança erro com `localResult`.
- `src/contexts/UserContext.jsx:323-330`: falha de sync de flags vira `console.warn`.
- `src/services/leisService.js:180-187`: se IA falhar, gera fallback local sem avisar o usuário.

## 3) QUALIDADE DE CÓDIGO

1. **Lint passa**
   - **Onde:** `npm run lint`
   - **Gravidade:** baixo.
   - **O quê:** ESLint terminou sem erros no estado atual.
   - **Recomendação:** manter no CI.

2. **Build passa**
   - **Onde:** `npm run build`
   - **Gravidade:** baixo.
   - **O quê:** Vite build concluiu. Aviso de `PLUGIN_TIMINGS` indica tempo relevante em `visualizer`, `vite:terser`, `vite:css`, `vite:asset`, `vite:css-post`.
   - **Recomendação:** manter build no CI e revisar custo do visualizer em build normal.

3. **CSS global ainda grande**
   - **Onde:** `src/index.css` com 15.850 linhas/~392 KB; `src/landing-light.css` com 4.705 linhas/~106 KB; `src/landing-light.css.bak` ~104 KB.
   - **Gravidade:** médio.
   - **O quê:** estilos globais, duplicações e overrides aumentam risco de regressão mobile/admin.
   - **Recomendação:** consolidar por domínio, remover backup após aprovação e criar checklist visual.

4. **Arquivos concentrados**
   - **Onde:** `src/pages/MapasMentais/index.jsx` 871 linhas; `src/services/questoesService.js` 847 linhas; `src/stores/index.js` 508 linhas; `src/pages/Plano/index.jsx` ~43 KB; `src/pages/LeisSecas/index.jsx` ~28 KB.
   - **Gravidade:** médio.
   - **O quê:** UI, fallback, parsing, integração e estado ficam misturados.
   - **Recomendação:** refatorar depois das pendências de segurança/dados, começando por serviços e hooks.

5. **Texto com encoding corrompido ainda aparece**
   - **Onde:** `src/services/planoService.js:28-31`, `src/services/tafService.js:122`, `src/services/questoesService.js:21-29`
   - **Gravidade:** baixo/médio.
   - **O quê:** strings como `QuestÃµes`, `RevisÃ£o`, `EliminatÃ³rio`.
   - **Recomendação:** rodar normalização UTF-8 e revisar textos visíveis.

6. **Schemas paralelos Supabase/Prisma**
   - **Onde:** `prisma/schema.prisma:9-49`, scripts `scripts/content-miner/oab.ts:776-848`, schema Supabase em `supabase/schema.sql`
   - **Gravidade:** médio.
   - **O quê:** Prisma parece usado por miners/importação, enquanto app usa Supabase direto. Pode confundir origem da verdade.
   - **Recomendação:** documentar Prisma como ferramenta de ingestão ou remover após migração confirmada.

## 4) PESO MORTO

### Dependências candidatas a não usadas no app

Achado por busca direta de imports/usos. Confirmar antes de remover, porque algumas podem ser usadas por scripts, configuração ou planos futuros.

- **Onde:** `package.json`
- **Gravidade:** baixo.
- **Candidatas:** `@radix-ui/react-tabs`, `@supabase/auth-helpers-react`, `@tsparticles/engine`, `@tsparticles/react`, `embla-carousel-react`, `next-seo`, `posthog-js`, `react-countup`, `react-hot-toast`, `react-intersection-observer`, `react-microsoft-clarity`, `styled-components`, `swiper`.
- **Não remover sem checar:** `expo`/Gradle/TWA podem ser empacotamento mobile; `@prisma/client`/`prisma` aparecem nos miners; `adm-zip`, `better-sqlite3`, `csv-parse`, `cheerio`, `pdf-parse`, `axios`, `dotenv` são usados em scripts.
- **Comando para rodar se aprovar:**
  ```powershell
  npm uninstall @radix-ui/react-tabs @supabase/auth-helpers-react @tsparticles/engine @tsparticles/react embla-carousel-react next-seo posthog-js react-countup react-hot-toast react-intersection-observer react-microsoft-clarity styled-components swiper
  ```

### Arquivos órfãos/vestigiais

1. **Backups em `src`**
   - **Onde:** `src/pages/MapasMentais/index.QUEBRADO.bak`, `src/landing-light.css.bak`
   - **Gravidade:** baixo.
   - **Recomendação:** remover só após aprovação.
   - **Comando:**
     ```powershell
     Remove-Item -LiteralPath "src/pages/MapasMentais/index.QUEBRADO.bak","src/landing-light.css.bak"
     ```

2. **Assets pesados versionados**
   - **Onde:** `public`, `storage`, `flashcards-apkg`, `material-provas`
   - **Gravidade:** médio.
   - **O quê:** 1.244 arquivos somando ~715,37 MB. Maiores itens: `public/aprova-demo.mp4` 10,1 MB; `storage/content/leis/index.json` 9,22 MB; vários `.apkg` entre 3 MB e 5,8 MB; muitos PDFs em `storage/content/oab`.
   - **Recomendação:** mover conteúdo pesado para Storage/CDN privado, versionando apenas manifest/scripts.
   - **Comando para auditar antes de remover:**
     ```powershell
     Get-ChildItem -Path public,storage,flashcards-apkg,material-provas -Recurse -File |
       Sort-Object Length -Descending |
       Select-Object -First 50 FullName,Length
     ```

3. **Android/TWA e Expo**
   - **Onde:** `app/`, `build.gradle`, `gradle/`, `gradlew`, `gradlew.bat`, `expo` em `package.json`
   - **Gravidade:** baixo como suspeita.
   - **O quê:** há estrutura mobile/TWA. Não confirmei se ainda é usada.
   - **Recomendação:** manter se há pipeline mobile; se não houver, auditar em tarefa separada antes de remover.

## 5) PERFORMANCE / MOBILE

1. **Bundle CSS e JS pesados**
   - **Onde:** build `dist/assets/index-*.css` 472,85 KB gzip 83,13 KB; `charts-*.js` 421,65 KB gzip 119,14 KB; app principal `index-*.js` 403,71 KB gzip 129,74 KB; `supabase-vendor` 200,05 KB gzip 51,04 KB.
   - **Gravidade:** médio.
   - **O quê:** CSS global e Recharts são os maiores blocos.
   - **Recomendação:** reduzir CSS global, manter charts lazy por tela e revisar imports visuais.

2. **Arquivos públicos e conteúdo local podem pesar deploy**
   - **Onde:** `public/aprova-demo.mp4`, `storage/content`, `flashcards-apkg`, `material-provas`
   - **Gravidade:** médio.
   - **O quê:** conteúdo local é grande. Nem tudo entra no build Vite, mas pode pesar repo/deploy/pipeline.
   - **Recomendação:** confirmar exatamente o que Vercel/hosting envia e mover conteúdo premium para Storage privado.

3. **Mobile/admin ainda dependem de muitos overrides**
   - **Onde:** `src/index.css`, `src/layouts/AppShell.jsx`, `src/admin/AdminLayout.jsx`, `src/pages/Checkout/index.jsx`
   - **Gravidade:** médio.
   - **O quê:** UI tem scrolls internos, grids responsivos e botões compactos. Corrigiu duplicação do checkout no estado atual, mas precisa regressão visual.
   - **Recomendação:** testar 360x740, 390x844, 430x932 e desktop; verificar overflow, toque e cabeçalho sticky.

4. **PDF via Google Docs Viewer pode falhar silenciosamente**
   - **Onde:** `src/components/PdfFrameViewer.jsx:10-14`, `src/pages/Biblioteca/MaterialCard.jsx:95`
   - **Gravidade:** baixo/médio.
   - **O quê:** o próprio comentário cita tela branca em muitos casos.
   - **Recomendação:** preferir viewer local/pdf.js ou botão direto com signed URL.

## 6) DADOS / SUPABASE

1. **Migrations fragmentadas e ordem sensível**
   - **Onde:** `supabase/schema.sql`, `supabase/migrate_to_cloud.sql`, `supabase/fix_planos_pagamento.sql`, `supabase/fix_auth_production.sql`, `supabase/fix_profiles_rls.sql`, `supabase/migrations/*`
   - **Gravidade:** alto.
   - **O quê:** há SQLs antigos e novos com regras conflitantes de plano/RLS. O estado seguro depende da ordem aplicada.
   - **Recomendação:** consolidar migrations numeradas e bloquear execução dos legados sem revisão.

2. **Conteúdo pago tem modelo seguro novo**
   - **Onde:** `supabase/migrate_to_cloud.sql:44-78`, `scripts/migrar-para-nuvem.js:47-67`, `scripts/migrar-para-nuvem.js:209-246`, `scripts/migrar-para-nuvem.js:256-280`
   - **Gravidade:** baixo/médio.
   - **O quê:** o script atual cria bucket `conteudo` privado e salva só `bucket`, `storage_path`, `filename`, `mime_type`, `size`; `public_url` fica null e grátis exige `is_public = true`.
   - **Recomendação:** manter assim; confirmar dados antigos sem `public_url` premium no banco.

3. **Índices de questões cobrem parte dos filtros, mas faltam filtros frequentes**
   - **Onde:** índices em `supabase/schema.sql:49-53`; filtros em `src/services/questoesService.js:505-586`
   - **Gravidade:** médio.
   - **O quê:** há índices para `materia`, `banca`, `dificuldade`, `topico` e FTS do enunciado. Filtros por `concurso`, `orgao`, `ano` podem sofrer em base grande.
   - **Recomendação:** medir queries reais e criar índices para filtros frequentes.

4. **Leis secas usam tabelas paralelas**
   - **Onde:** base `artigos_grifados`, `artigos_notas` em `supabase/schema.sql:160-177`; extras `grifos`, `notas`, `leitura_progresso` em `supabase/leis_secas_estudo.sql:6-114`; serviço em `src/services/leisService.js:263`, `:286`, `:305`, `:315`
   - **Gravidade:** médio.
   - **O quê:** risco de salvar em uma tabela e consultar outra dependendo da migration aplicada.
   - **Recomendação:** escolher um modelo único e migrar dados.

5. **Storage**
   - **Onde:** `supabase/profile_avatars.sql:4-16`, `supabase/migrations/20260702140000_secure_paid_content.sql:92-154`, `supabase/functions/conteudo-url/index.ts:18-35`
   - **Gravidade:** médio.
   - **O quê:** `avatars` é público por design e usa `getPublicUrl` no perfil; `conteudo` deve ser privado com signed URLs. Não medi Storage remoto.
   - **Recomendação:** confirmar no dashboard buckets, políticas, tamanho e objetos premium antigos.

6. **Pagamento/assinatura**
   - **Onde:** `supabase/fix_planos_pagamento.sql:22-103`, `supabase/functions/criar-pagamento-pix/index.ts:30-83`, `supabase/functions/webhook-mercadopago/index.ts:119-156`
   - **Gravidade:** médio.
   - **O quê:** tabelas têm RLS de leitura do próprio usuário; escrita vem por service role em Edge Function. Boa arquitetura, mas depende de secrets e webhook real.
   - **Recomendação:** testar Pix aprovado, Pix pendente, Pix expirado, cartão recusado, cartão aprovado e duplicidade de webhook.

## 7) VEREDITO E PRIORIZAÇÃO

### Top 5 urgentes

1. **Rotacionar/limpar segredos expostos no `.env` local**
   - **Gravidade:** crítico
   - **Esforço:** baixo/médio
   - **Onde:** `.env:2`, `.env:5`

2. **Neutralizar SQLs legados que reativam plano por default**
   - **Gravidade:** alto
   - **Esforço:** baixo
   - **Onde:** `supabase/fix_auth_production.sql`, `supabase/fix_profiles_rls.sql`, `supabase/admin_panel.sql`

3. **Confirmar RLS/buckets reais no Supabase remoto**
   - **Gravidade:** alto
   - **Esforço:** médio
   - **Onde:** `questoes`, `materiais`, `leis`, `leis_artigos`, bucket `conteudo`

4. **Testar compra ponta a ponta no Mercado Pago**
   - **Gravidade:** alto
   - **Esforço:** médio
   - **Onde:** `criar-pagamento-pix`, `criar-assinatura-cartao`, `webhook-mercadopago`, `verificar-acesso`

5. **Consolidar migrations em uma ordem segura**
   - **Gravidade:** alto
   - **Esforço:** médio/alto
   - **Onde:** pasta `supabase/`

### Top 5 ganhos rápidos

1. Remover `VITE_GEMINI_API_KEY` do `.env` local e usar secret backend.
2. Adicionar aviso grande ou corrigir defaults nos SQLs legados de auth/profile.
3. Implementar/remover favorito de materiais (`bibliotecaService.favoritar`).
4. Remover backups `.bak` após aprovação.
5. Corrigir strings com encoding corrompido visíveis ao usuário.

### Pode esperar

- Refatoração ampla de CSS e componentes grandes, desde que mobile crítico esteja validado.
- Limpeza fina de dependências, depois de confirmar uso mobile/scripts.
- Otimização de bundle além de CSS/charts.
- Organização dos assets pesados, se eles não entram no deploy público atual.

## Bloqueios da auditoria

- Não tive acesso ao Supabase remoto para listar policies reais, buckets, objetos, tamanho de Storage ou rodar `EXPLAIN`.
- Não tive credenciais/runtime do Mercado Pago para validar pagamentos reais.
- Não rodei E2E com navegador; a auditoria foi estática/local + `npm run lint` + `npm run build`.
- Não confirmei se a estrutura Android/TWA/Expo ainda faz parte do produto.

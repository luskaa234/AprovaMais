# VemAprovar

**Plataforma inteligente de preparação para concursos e Exame de Ordem (OAB).**

O VemAprovar reúne, em um só lugar, questões oficiais de provas reais, planos de estudo gerados por IA, simulados, revisão inteligente, flashcards, mapas mentais, legislação comentada e treino físico (TAF) — tudo pensado para quem se prepara para concursos públicos e para a OAB.

---

## Visão geral

O VemAprovar não é apenas um banco de questões: é um ecossistema de estudo que conecta conteúdo, prática e acompanhamento de desempenho.

- **Banco de questões oficiais** — questões de provas reais (FGV, Vunesp, Cebraspe, FCC, entre outras), com gabarito definitivo, filtráveis por banca, matéria e nível.
- **Plano de estudos com IA** — cronograma personalizado a partir do objetivo, da disponibilidade e do desempenho do aluno.
- **Simulados** — no mesmo padrão das bancas, com tempo cronometrado e gabarito comentado.
- **Central de revisão** — revisões inteligentes baseadas nos erros do aluno.
- **Flashcards** — memorização ativa com repetição espaçada.
- **Mapas mentais** — visão estruturada das matérias.
- **Leis secas** — legislação organizada por artigo, com grifos, favoritos e conexão com as questões.
- **Caderno de erros** — registro automático das questões erradas para revisão.
- **TAF** — preparação para o Teste de Aptidão Física (diferencial para concursos de segurança).
- **Assistente de IA** — tutor que explica questões, organiza revisões e orienta o estudo.

---

## Tecnologias

| Camada | Stack |
|---|---|
| Front-end | React + Vite |
| Estilo | CSS / design system próprio (identidade azul) |
| Back-end / Banco | Supabase (PostgreSQL, Auth, RLS, Edge Functions) |
| IA | OpenRouter via Supabase Edge Function |
| Pagamentos | Mercado Pago (Pix, cartão de crédito e débito) |
| Deploy | Vercel |

---

## Estrutura do projeto

```
src/
  components/     Componentes reutilizáveis
  pages/          Telas (Dashboard, Questões, Simulados, Plano, Leis, TAF...)
  services/       Integração com Supabase e APIs
  contexts/       Estado global (usuário, sessão)
  utils/          Utilitários (normalização de texto, helpers)
  admin/          Painel administrativo
supabase/
  functions/      Edge Functions (pagamento, admin, verificação de acesso)
public/
  questoes/       Banco de questões em JSON
scripts/
  content-miner/  Mineradores de provas oficiais
```

---

## Como rodar localmente

Pré-requisitos: Node.js instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Crie um arquivo .env com as chaves do Supabase, OpenRouter e Mercado Pago
# (use o .env.example como referência)

# 3. Rodar em modo de desenvolvimento
npm run dev

# 4. Gerar build de produção
npm run build
```

> **Importante:** o arquivo `.env` nunca deve ser versionado. As chaves secretas
> (Access Token do Mercado Pago, service role do Supabase, chave do OpenRouter)
> ficam apenas no back-end / secrets, nunca no front-end.

### IA com OpenRouter

A IA do app roda na Edge Function `ia-aprova`, nunca no navegador. Configure a chave como secret do Supabase:

```bash
supabase secrets set OPENROUTER_API_KEY=sk-or-...
```

Para testar localmente a Edge Function:

```bash
supabase functions serve ia-aprova --env-file .env
```

---

## Segurança

- **RLS (Row Level Security)** ativo em todas as tabelas com dados de usuário — cada aluno acessa apenas os próprios dados.
- **Pagamento validado no back-end** — o acesso premium só é liberado após confirmação do webhook do Mercado Pago, nunca pelo front-end.
- **Validação de assinatura HMAC** nos webhooks de pagamento.
- **Chaves secretas** mantidas exclusivamente em secrets do Supabase.

---

## Conteúdo

Todo o conteúdo de questões provém de **provas oficiais reais**, com gabarito definitivo, mantendo a referência à banca e ao exame de origem. O foco do projeto é a confiabilidade do conteúdo — questões verificáveis em vez de volume inflado.

---

## Status

Projeto em desenvolvimento ativo, em fase de testes com os primeiros usuários.

---

© VemAprovar. Todos os direitos reservados.

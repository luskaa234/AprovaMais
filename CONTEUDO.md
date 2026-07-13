# CONTEÚDO.md — Inventário do Acervo VemAprovar
> Gerado em: 2026-07-02 | Somente leitura | Sem edições no código

---

## 1. QUESTÕES

### Origem e armazenamento
| Caminho | Formato | Quando é usado |
|---------|---------|----------------|
| `storage/content/militar/*/questoes/*.json` | JSON por prova | Carregado via `questoesService.js` |
| `/questoes/oab.json` | JSON único | Carregado via `oabService.js` |
| `src/stores/index.js` → `questoesSeed` | Hardcoded | Fallback offline (30 questões) |
| Supabase tabela `questoes` | Postgres | Fonte principal quando configurado |

### Questões Militares — 27 provas processadas
| Prova | Banca | Ano | Questões (est.) |
|-------|-------|-----|-----------------|
| PCRJ Inspetor | FGV | 2021 | 98 |
| PMERJ CFO | FGV | 2021 | 67 |
| CBMAL Soldado Combatente | CEBRASPE | 2018 | 70 |
| PMSP Soldado | FGV | 2025 | 37 |
| + 23 outras provas | FGV / CEBRASPE / outros | 2017–2025 | ~30–100 cada |

**Total estimado: ~2.000+ questões militares** em JSONs locais.  
Instituições cobertas: PM estaduais, CBM, PC estaduais, PRF, EB.

### Questões OAB — 34 exames (10º ao 34º)
- Questões da 1ª fase disponíveis via `/questoes/oab.json`
- Materiais da 2ª fase: cadernos, gabaritos e padrões em PDF (veja seção 7)
- Disciplinas 2ª fase cobertas: Dir. Administrativo, Civil, Constitucional, do Trabalho, Empresarial, Penal, Tributário

**Total estimado OAB: ~200–400 questões** (count exato só no Supabase remoto).

### Questões Seed (fallback offline)
30 questões hardcoded em `src/stores/index.js`:

| Matéria | Qtd | Bancas |
|---------|-----|--------|
| Direito Constitucional | 6 | CEBRASPE, FCC |
| Português | 5 | FGV, VUNESP |
| Informática | 5 | IBFC, CEBRASPE |
| Raciocínio Lógico | 5 | CEBRASPE |
| Direito Administrativo | 5 | FCC, VUNESP |

### Buracos de conteúdo em questões
Matérias **sem questões confirmadas** nos arquivos locais:

| Matéria | Status |
|---------|--------|
| Direito do Consumidor | ⚠️ Zero questões locais |
| Direito Tributário | ⚠️ Zero questões locais |
| Direito Ambiental | ⚠️ Zero questões locais |
| Direito Previdenciário | ⚠️ Zero questões locais |
| Direito Digital | ⚠️ Zero questões locais |
| Direito Internacional | ⚠️ Zero questões locais |
| Ética Profissional (OAB) | ⚠️ Apenas na 2ª fase OAB (PDF bruto) |

> **Nota**: contagens reais por matéria dependem da tabela `questoes` no Supabase remoto, que não pôde ser acessada localmente.

---

## 2. LEIS SECAS

### Leis no app (index.json do serviço) — 11 leis, 6.461 artigos
| ID | Nome | Artigos | Área |
|----|------|---------|------|
| `cf88` | Constituição Federal 1988 | 409 | Constitucional |
| `codigo-civil` | Código Civil | 2.016 | Civil |
| `cpc` | Código de Processo Civil | 1.065 | Processual |
| `clt` | CLT | 1.031 | Trabalhista |
| `cpp` | Código de Processo Penal | 846 | Processual |
| `codigo-penal` | Código Penal | 410 | Penal |
| `ctn` | Código Tributário Nacional | 195 | Tributário |
| `cdc` | Código de Defesa do Consumidor | 195 | Consumidor |
| `regulamento-oab` | Regulamento Geral OAB | 156 | Profissional |
| `estatuto-oab` | Estatuto da OAB | 85 | Profissional |
| `codigo-etica-oab` | Código de Ética OAB | 58 | Profissional |

### Leis no schema Supabase mas AUSENTES do index.json do app
Estas leis aparecem nos `INSERT` do `schema.sql` mas **não foram localizadas em `storage/content/leis/`** com `artigos.json` completo:

| Lei | Relevância | Status |
|-----|------------|--------|
| Lei 8.112/90 (Estatuto do Servidor) | 🔴 Alta — todos concursos federais | Ausente do app |
| LEP — Lei 7.210/84 | Média — delegado, MP, DPE | Ausente do app |
| Lei de Drogas — Lei 11.343/06 | Média — delegado, PM | Ausente do app |
| ECA — Lei 8.069/90 | Média — MP, DPE, OAB | Ausente do app |
| Lei 9.099/95 (JEC) | Média — OAB | Ausente do app |
| CTB — Lei 9.503/97 | Baixa — PM, PRF | Ausente do app |

> A Lei 8.112/90 é especialmente crítica: é cobrada em praticamente todo concurso federal.

---

## 3. APOSTILAS / BIBLIOTECA

### Armazenamento
- **Fonte primária**: manifest em `/materiais/manifest.json` (bucket Supabase, não local)
- **Tabela Supabase**: `materiais` (campos: titulo, materia, tipo, url, storage_path)
- **Fallback local**: `src/data/mockBiblioteca.js` com **5 apostilas mock**

### Mock (o que aparece sem Supabase configurado)
| Título | Matéria | Fonte |
|--------|---------|-------|
| Apostila Constitucional | Dir. Constitucional | Mock |
| Apostila Penal | Dir. Penal | Mock |
| Apostila Administrativo | Dir. Administrativo | Mock |
| Apostila Processo Civil | Processo Civil | Mock |
| Apostila Trabalho | Dir. do Trabalho | Mock |

### PDFs em storage (929 arquivos)
Estão em `storage/content/oab/` e `storage/content/militar/` como material bruto.  
**Não estão automaticamente na Biblioteca do app** — precisariam ser cadastrados na tabela `materiais`.

> **Conclusão**: a Biblioteca depende 100% do Supabase remoto. Sem ele, só aparecem 5 apostilas mock. Contagem real de apostilas: **desconhecida**.

---

## 4. MAPAS MENTAIS

### Armazenamento
- **Fonte primária**: manifest `/materiais/manifest.json` → `categoria === "Mapas mentais"` (bucket Supabase)
- **Fallback**: `src/data/mockMapas.js` com **3 mapas mock**

### Mock (sem Supabase)
| Mapa | Matéria |
|------|---------|
| Direitos Fundamentais | Dir. Constitucional |
| Classes Gramaticais | Português |
| Princípios da Administração | Dir. Administrativo |

Cada mapa tem estrutura em árvore JSON: nó raiz → 4 seções (Fundamentos, Conceitos, Exceções, Jurisprudência).

> **Conclusão**: Assim como apostilas, os mapas reais dependem do bucket Supabase. Sem ele, só existem os 3 mocks. **Contagem real: desconhecida**.

---

## 5. FLASHCARDS

### Decks pré-construídos (seed)
Definidos em `src/stores/index.js` → `flashcardsSeed`:

| Deck | Matéria | Cards | Retenção Seed |
|------|---------|-------|---------------|
| Constitucional Essencial | Dir. Constitucional | 10 | 80% |
| Português | Língua Portuguesa | 10 | 65% |
| Informática | Informática | 10 | 88% |
| Raciocínio Lógico | Raciocínio Lógico | 10 | 72% |

**Total seed: 4 decks × 10 cards = 40 cards**

### Flashcards gerados por IA (sob demanda)
- Gerados em `leisService.gerarFlashcardsDeArtigo()` quando o usuário clica no botão em Lei Seca
- 3–5 cards por artigo, formato lacuna/pergunta direta
- Cache de 180 dias (key: `lei-flashcards:{artigoId}`)
- Armazenados no deck "Lei Seca" no `useFlashcardsStore`

### Tabelas Supabase
- `flashcard_decks` — decks por usuário (título, matéria, origem: manual/apkg/ia)
- `flashcards` — cards com campos SM-2 (ef, intervalo, repetições, próxima revisão)

> **Conclusão**: 40 cards prontos como base. Produção depende do Supabase — contagem real por usuário não acessível localmente.

---

## 6. TAF (Teste de Aptidão Física)

### Exercícios
- **Arquivo**: `src/data/taf_exercicios.json` (v1.0, schema ExerciseDB)
- **Exercícios documentados**: 7+ com ficha completa
- **Campos por exercício**: bodyPart, equipment, target, secondaryMuscles, instructions[], difficulty, taxonomy
- **GIFs**: Referenciados como `/taf/gifs/taf-{id}.gif` — precisam ser hospedados localmente

### Editais mockados (4)
| Concurso | Testes |
|----------|--------|
| PMSP Soldado PM | Corrida 12min, Flexão, Abdominal |
| PCSP Investigador | Corrida 12min, Flexão, Barra |
| PRF Policial Rodoviário | Corrida 12min, Flexão, Abdominal |
| EB Sargento | Corrida 12min, Flexão, Abdominal, Barra |

Cada edital tem tabela de pontuação por sexo com mínimos de eliminação.

### Plano de treino
4 fases: Adaptação → Base → Específico → Pico, com cronograma semanal definido.

### Tabelas Supabase
- `taf_treinos` — logs de treino (tipo, valor, unidade, data)
- `taf_testes` — resultados de teste completos (JSON com todos os itens)

---

## 7. PROVAS BRUTAS NÃO PROCESSADAS

### Volume total
- **929 PDFs em storage** (não publicados no app diretamente)

### OAB — 901 PDFs
| Tipo | Volume | Status |
|------|--------|--------|
| Cadernos de prova (1ª fase) | ~34 | Questões extraídas → `/questoes/oab.json` |
| Gabaritos (1ª fase) | ~34 | ✅ Metadados usados no serviço |
| Cadernos 2ª fase (por disciplina) | ~238 | ⚠️ PDFs brutos — NÃO virou questão |
| Padrões de resposta 2ª fase | ~238 | ⚠️ PDFs brutos — NÃO virou questão |
| Espelhos de correção | ~170 | ⚠️ PDFs brutos — NÃO virou questão |
| Outros (editais, portarias) | ~187 | ℹ️ Informativos |

> Os exames da **2ª fase OAB** têm um riquíssimo acervo de padrões de resposta (como a banca corrige redações) que não está sendo aproveitado de nenhuma forma no app.

### Militar — 28 PDFs
| Tipo | Status |
|------|--------|
| Provas (1 por exame) | ✅ Questões extraídas para JSON |
| Gabaritos (1 por exame) | ✅ Usados na extração |

> Militares: todo o bruto já foi minerado em JSON.

### Scripts de mineração disponíveis (não rodados em produção)
| Script | O que faz |
|--------|-----------|
| `scripts/content-miner/oab.ts` | Extrai questões dos PDFs OAB |
| `scripts/content-miner/militar.ts` | Extrai questões dos PDFs militares |
| `scripts/content-miner/leis.ts` | Processa artigos de leis |
| `scripts/content-miner/cebraspe-local.ts` | Banco CEBRASPE local |
| `scripts/content-miner/fgv-local.ts` | Banco FGV local |

---

## 8. RESUMO: MATÉRIA × CONTEÚDO DISPONÍVEL

| Matéria | Questões | Lei Seca | Apostila | Mapa Mental | Flashcard |
|---------|----------|----------|----------|-------------|-----------|
| Dir. Constitucional | ✅ Muitas | ✅ CF/88 | ✅ Mock | ✅ Mock | ✅ Seed |
| Dir. Penal | ✅ Algumas | ✅ CP | ✅ Mock | ❌ | ❌ |
| Dir. Administrativo | ✅ Algumas | ❌ sem Lei 8.112 | ✅ Mock | ✅ Mock | ❌ |
| Processo Penal | ✅ Algumas | ✅ CPP | ❌ | ❌ | ❌ |
| Processo Civil | ✅ Algumas | ✅ CPC | ✅ Mock | ❌ | ❌ |
| Dir. Civil | ⚠️ Poucas | ✅ CC | ❌ | ❌ | ❌ |
| Dir. do Trabalho | ⚠️ Poucas | ✅ CLT | ✅ Mock | ❌ | ❌ |
| Dir. Tributário | ❌ Zero local | ✅ CTN | ❌ | ❌ | ❌ |
| Dir. do Consumidor | ❌ Zero local | ✅ CDC | ❌ | ❌ | ❌ |
| Ética Profissional | ⚠️ Só 2ª fase | ✅ 3 leis OAB | ❌ | ❌ | ❌ |
| Português | ✅ Seed (5) | ❌ | ❌ | ✅ Mock | ✅ Seed |
| Informática | ✅ Seed (5) | ❌ | ❌ | ❌ | ✅ Seed |
| Raciocínio Lógico | ✅ Seed (5) | ❌ | ❌ | ❌ | ✅ Seed |
| Dir. Ambiental | ❌ Zero | ❌ | ❌ | ❌ | ❌ |
| Dir. Previdenciário | ❌ Zero | ❌ | ❌ | ❌ | ❌ |
| Dir. do Servidor Público | ❌ Zero local | ❌ sem Lei 8.112 | ❌ | ❌ | ❌ |

**Legenda**: ✅ Tem conteúdo real | ⚠️ Tem pouco / incompleto | ❌ Ausente

---

## 9. MAIORES BURACOS IDENTIFICADOS

### Prioridade Alta
1. **Lei 8.112/90 ausente do Lei Seca** — matéria cobrada em 100% dos concursos federais, está no schema mas não na app
2. **Dir. Tributário e Dir. do Consumidor sem questões** — as leis estão (CTN e CDC) mas não há questões para praticar
3. **Apostilas e Mapas reais dependem 100% do Supabase** — sem bucket configurado, o usuário vê apenas mocks genéricos
4. **2ª fase OAB sem aproveitamento** — 600+ PDFs de padrões e espelhos de correção estão em storage sem nenhuma feature que os use

### Prioridade Média
5. **ECA, LEP, Lei de Drogas** — referenciados no schema, não acessíveis no Lei Seca
6. **GIFs do TAF** — o endpoint `/taf/gifs/taf-{id}.gif` não está sendo servido (precisa de bucket ou pasta `public/taf/gifs/`)
7. **Raciocínio Lógico, Informática** — só seed de 5 questões; nenhuma lei, apostila ou mapa real

---

## 10. O QUE NÃO FOI POSSÍVEL AVALIAR

| Item | Motivo |
|------|--------|
| Contagem real de questões por matéria/banca | Requer acesso ao Supabase remoto (`SELECT COUNT(*) FROM questoes GROUP BY materia`) |
| Apostilas e Mapas em produção | Manifest está em bucket Supabase, não em arquivo local |
| Questões com imagem/diagrama | Não há campo `has_image` no schema; precisaria inspecionar o JSON de questões OAB |
| Flashcards de usuários reais | Por RLS, acessível apenas autenticado |
| Questões ENEM | Não foram encontradas na estrutura local — não está claro se é uma trilha planejada ou removida |
| Questões CEBRASPE (banco local) | Script `cebraspe-local.ts` existe mas output não encontrado em `public/questoes/` |

---

*Documento gerado automaticamente por inventário de leitura do repositório. Nenhum arquivo foi editado.*

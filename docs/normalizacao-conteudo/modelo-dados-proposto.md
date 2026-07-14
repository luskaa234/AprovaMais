# Modelo de dados proposto

| Tabela | Finalidade | Campos | Chaves/indices | Relacoes | Obrigatorios | Opcionais | Integridade/RLS | Risco |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| objectives | objetivos visiveis | id, slug, name, status | slug unique | content_objectives | slug,name | description | leitura por escopo | medio |
| institutions | orgaos | id, objective_id, name, aliases | objective_id, slug | contests | name | uf | admin escreve | baixo |
| contests | concursos | id, institution_id, name | institution_id | editions | name | aliases | sem institution exige revisao | medio |
| contest_editions | edicoes | id, contest_id, year, banca | contest_id, year | exams/content | year | notice_url | versionamento | alto |
| positions | cargos | id, name, aliases | slug | editions | name | level | fase nao e cargo | baixo |
| phases | fases | id, name, kind | slug | exams | name | order | separar TAF/discursiva | baixo |
| disciplines | disciplinas | id, name, aliases | slug | subjects | name | area | nao aceitar formato | medio |
| subjects | assuntos | id, discipline_id, name | discipline_id | subtopics | name | order | revisar baixa confianca | alto |
| subtopics | subassuntos | id, subject_id, name | subject_id | content | name | tags | opcional | medio |
| content_items | item pedagogico | id,type,title,status,quarantine | type,status | files/objectives | type,status | title | bloquear sem objetivo | alto |
| content_objectives | escopo | content_id, objective_id, scope_type | ambos | objectives/content | ambos | shared_reason | base do filtro | alto |
| content_disciplines | materia | content_id, discipline_id | ambos | disciplines | ambos | confidence | revisar conflito | medio |
| content_files | arquivos | id, content_id, path, hash, format | hash,path | content | path,hash | size | sem apagar origem | medio |
| questions | questoes | id, hash, statement, answer, status | hash,status | sources/alternatives | statement,answer | difficulty | quarentena invalidas | alto |
| question_alternatives | alternativas | id, question_id, label, text | question_id | questions | label,text | order | validar resposta | medio |
| question_sources | fontes | id, question_id, file_id | question_id | files | question_id | page | rastreabilidade | baixo |
| question_duplicates | duplicatas | id, question_id, duplicate_of | ids | questions | ids | reason | sem delete automatico | medio |
| flashcard_decks | decks | id,name,source | source | flashcards | name | objective_id | APKG staging | medio |
| flashcards | cards | id,deck_id,front,back,hash | hash | decks | front,back | html | validar vazios | alto |
| flashcard_duplicates | duplicatas | id, flashcard_id, duplicate_of | ids | flashcards | ids | type | sem delete automatico | medio |
| mental_maps | mapas | id,title,unit_hash,status | unit_hash | files | title | nodes_json | contrato oficial | alto |
| mental_map_files | arquivos mapa | id,map_id,file_id | map_id | files | map_id | image_size | imagens/texto | medio |
| laws | leis | id,name,number | slug | versions | name | aliases | juridico revisa | alto |
| law_versions | versoes | id,law_id,version_date,source | law_id,date | articles | source | notes | bloquear sem fonte | alto |
| law_articles | artigos | id,version_id,article_number,text | version,number | versions | text | paragraphs | full-text | alto |
| exams | provas logicas | id,edition_id,phase_id,banca | edition_id | files | edition_id | type | vincular gabarito | medio |
| exam_files | PDFs | id,exam_id,file_id,kind | exam_id | files | file_id | variant | variantes | medio |
| exam_answer_keys | gabaritos | id,exam_id,file_id,status | exam_id,status | exams | file_id | preliminar | gabarito sem prova | medio |
| content_imports | importacoes | id,source,status | status | logs | source | stats | staging | baixo |
| content_validation_logs | logs | id,content_id,rule,result | content_id | content | rule,result | payload | auditoria | baixo |
| content_quarantine | quarentena | id,content_id,reason,priority | priority | content | reason | owner | impede publicacao | alto |
| content_visibility_rules | visibilidade | id,content_id,rule_type,objective_id | content_id | objectives | rule_type | premium | RLS base | alto |

# Limitações V2

- Auditoria estática; não acessa Supabase remoto.
- Dynamic import foi usado somente em arquivos de dados JS locais.
- PDFs foram extraídos parcialmente com pdftotext.
- APKG foi processado quando possuía collection.anki2 compatível; caso contrário fica como não processado e count null.
- Classificação de concursos e instituições usa metadados, diretório e slug; itens sem evidência forte ficam sem canonical.
- Nenhuma alteração destrutiva foi executada.

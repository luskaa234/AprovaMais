# Inconsistências críticas V2

## CDC versus CTN

| Campo | Valor |
| --- | --- |
| cdcPath | storage/content/leis/cdc/texto.txt |
| ctnPath | storage/content/leis/ctn/texto.txt |
| cdcHash | 4a92ed20eb47584a16c6579668bbacf55a95105f4432d394695bf9bd88264aab |
| ctnHash | 4a92ed20eb47584a16c6579668bbacf55a95105f4432d394695bf9bd88264aab |
| identical | true |
| contentHint | Brastra.gif (4376 bytes) Presid[caractere ilegivel]ncia da Rep[caractere ilegivel]blica Casa Civil Subchefia para Assuntos Jur[caractere ilegivel]dicos LEI N[caractere ilegivel] 5.172, DE 25 DE OUTUBRO DE 1966. Denominado C[caractere ilegivel]digo Tribut[caractere ilegivel]rio Nacional Vig[caractere ilegivel]ncia (Vide Decreto-lei n[caractere ilegivel] 82, de 1966) (Vide Decreto n[caractere ilegivel] 6.306, de 2007) (Vide Complementar n[caractere ilegivel] 214, de 2025) Produ[caractere ilegivel][caractere ilegivel]o de efeitos Disp[caractere ilegivel]e sobre o Sistema Tribut[caractere ilegivel]rio Nacional e institui normas gerais de direito tribut[caractere ilegivel]rio aplic[caractere ilegivel]veis [caractere ilegivel] Uni[caractere ilegivel]o, Estados e Munic[caractere ilegivel]pios. O PRESIDENTE DA REP[caractere ilegivel]BLICA Fa[caractere ilegivel]o saber que o Congresso Nacional decreta e eu sanciono a seguinte lei: DISPOSI[caractere ilegivel][caractere ilegivel]O PRELIMINAR Art. 1[caractere ilegivel] Est |
| cdcLooksLike | CDC |
| ctnLooksLike | CTN |
| impact | Crítico: dois textos legais distintos têm conteúdo idêntico; Vade Mecum, busca de artigos e revisões podem exibir lei errada. |

## Decisão

- Conteúdo idêntico: sim
- CDC parece ser: CDC
- CTN parece ser: CTN
- Impacto: Crítico: dois textos legais distintos têm conteúdo idêntico; Vade Mecum, busca de artigos e revisões podem exibir lei errada.
- Ação recomendada: não corrigir nesta etapa; revisar texto, meta.json e artigos.json das duas leis antes de publicar/usar como Vade Mecum.

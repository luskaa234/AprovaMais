import { direitoPenalParteGeral } from "./direito-penal-parte-geral";
import { direitoPenalParteGeralAvancado } from "./direito-penal-parte-geral-avancado";
import { apostilaPortuguesInterpretacao } from "./portugues-pmma-interpretacao";
import { portuguesAvancado } from "./portugues-avancado";
import { apostilaPortuguesOrtografiaMorfologia } from "./portugues-pmma-ortografia-morfologia";
import { apostilaPortuguesSintaxe } from "./portugues-pmma-sintaxe";
import { direitoProcessualPenal } from "./direito-processual-penal";
import { direitoProcessualCivil } from "./direito-processual-civil";
import { direitoProcessualPenalMilitar } from "./direito-processual-penal-militar";
import { direitoProcessualTrabalho } from "./direito-processual-trabalho";
import { direitosHumanos } from "./direitos-humanos";
import { direitosHumanosAvancado } from "./direitos-humanos-avancado";
import { legislacaoPenalEspecial } from "./legislacao-penal-especial";
import { legislacaoInstitucionalPMMA } from "./legislacao-institucional-pmma";
import { legislacaoInstitucionalPMMAAvancada } from "./legislacao-institucional-pmma-avancada";
import { direitoAdministrativo } from "./direito-administrativo";
import { direitoAdministrativoAvancado } from "./direito-administrativo-avancado";
import { direitoConstitucional } from "./direito-constitucional";
import { direitoConstitucionalAvancado } from "./direito-constitucional-avancado";
import { direitoCivil } from "./direito-civil";
import { direitoTrabalho } from "./direito-trabalho";
import { direitoTributario } from "./direito-tributario";
import { eticaProfissionalOab } from "./etica-profissional-oab";
import { direitoEmpresarial } from "./direito-empresarial";
import { direitoConsumidor } from "./direito-consumidor";
import { eca } from "./eca";
import { direitoAmbiental } from "./direito-ambiental";
import { filosofiaDireito } from "./filosofia-direito";
import { direitoPrevidenciario } from "./direito-previdenciario";
import { direitoFinanceiro } from "./direito-financeiro";
import { direitoEleitoral } from "./direito-eleitoral";
import { direitoInternacional } from "./direito-internacional";
import { direitoDigitalLgpdCrimesCiberneticos } from "./direito-digital-lgpd-crimes-ciberneticos";
import { criminologiaSegurancaPublicaAvancada } from "./criminologia-seguranca-publica-avancada";
import { ctbCodigoTransitoBrasileiro } from "./ctb-codigo-transito-brasileiro";
import { direitoPenalMilitar } from "./direito-penal-militar";
import { atualidades } from "./atualidades";
import { atualidadesAvancada } from "./atualidades-avancada";
import { etica } from "./etica";
import { informatica } from "./informatica";
import { informaticaAvancada } from "./informatica-avancada";
import { matematicaBasica } from "./matematica-basica";
import { matematicaRaciocinioLogicoAvancado } from "./matematica-raciocinio-logico-avancado";
import { raciocinioLogico } from "./raciocinio-logico";
import { redacao } from "./redacao";
import { redacaoConcursosPoliciais } from "./redacao-concursos-policiais";
import { taf } from "./taf";

function buildApostila(id, chapters) {
  const first = chapters[0] || {};
  return {
    id,
    tipo: "Apostila",
    categoria: "Apostila",
    titulo: first.materialTitle || first.moduleTitle || "Apostila",
    materia: first.subject || "Geral",
    descricao: `${chapters.length} capitulos para ${first.contest || "concurso"}${first.role ? ` (${first.role})` : ""}.`,
    source: "VemAprovar Top1",
    chapters,
  };
}

export const apostilasBiblioteca = [
  buildApostila("apostila-portugues-pmma-ortografia-morfologia", apostilaPortuguesOrtografiaMorfologia),
  buildApostila("apostila-portugues-pmma-interpretacao", apostilaPortuguesInterpretacao),
  buildApostila("apostila-portugues-pmma-sintaxe", apostilaPortuguesSintaxe),
  buildApostila("apostila-portugues-avancado", portuguesAvancado),
  buildApostila("apostila-direito-penal-parte-geral", direitoPenalParteGeral),
  buildApostila("apostila-direito-penal-parte-geral-avancado", direitoPenalParteGeralAvancado),
  buildApostila("apostila-direito-processual-penal", direitoProcessualPenal),
  buildApostila("apostila-direito-processual-civil", direitoProcessualCivil),
  buildApostila("apostila-direito-processual-trabalho", direitoProcessualTrabalho),
  buildApostila("apostila-direito-processual-penal-militar", direitoProcessualPenalMilitar),
  buildApostila("apostila-direitos-humanos", direitosHumanos),
  buildApostila("apostila-direitos-humanos-avancado", direitosHumanosAvancado),
  buildApostila("apostila-legislacao-penal-especial", legislacaoPenalEspecial),
  buildApostila("apostila-legislacao-institucional-pmma", legislacaoInstitucionalPMMA),
  buildApostila("apostila-legislacao-institucional-pmma-avancada", legislacaoInstitucionalPMMAAvancada),
  buildApostila("apostila-direito-administrativo", direitoAdministrativo),
  buildApostila("apostila-direito-administrativo-avancado", direitoAdministrativoAvancado),
  buildApostila("apostila-direito-constitucional", direitoConstitucional),
  buildApostila("apostila-direito-constitucional-avancado", direitoConstitucionalAvancado),
  buildApostila("apostila-direito-civil", direitoCivil),
  buildApostila("apostila-direito-trabalho", direitoTrabalho),
  buildApostila("apostila-direito-tributario", direitoTributario),
  buildApostila("apostila-etica-profissional-oab", eticaProfissionalOab),
  buildApostila("apostila-direito-empresarial", direitoEmpresarial),
  buildApostila("apostila-direito-consumidor", direitoConsumidor),
  buildApostila("apostila-eca", eca),
  buildApostila("apostila-direito-ambiental", direitoAmbiental),
  buildApostila("apostila-filosofia-direito", filosofiaDireito),
  buildApostila("apostila-direito-previdenciario", direitoPrevidenciario),
  buildApostila("apostila-direito-financeiro", direitoFinanceiro),
  buildApostila("apostila-direito-eleitoral", direitoEleitoral),
  buildApostila("apostila-direito-internacional", direitoInternacional),
  buildApostila("apostila-direito-digital-lgpd-crimes-ciberneticos", direitoDigitalLgpdCrimesCiberneticos),
  buildApostila("apostila-criminologia-seguranca-publica-avancada", criminologiaSegurancaPublicaAvancada),
  buildApostila("apostila-ctb-codigo-transito-brasileiro", ctbCodigoTransitoBrasileiro),
  buildApostila("apostila-direito-penal-militar", direitoPenalMilitar),
  buildApostila("apostila-atualidades", atualidades),
  buildApostila("apostila-atualidades-avancada", atualidadesAvancada),
  buildApostila("apostila-etica", etica),
  buildApostila("apostila-informatica", informatica),
  buildApostila("apostila-informatica-avancada", informaticaAvancada),
  buildApostila("apostila-matematica-basica", matematicaBasica),
  buildApostila("apostila-matematica-raciocinio-logico-avancado", matematicaRaciocinioLogicoAvancado),
  buildApostila("apostila-raciocinio-logico", raciocinioLogico),
  buildApostila("apostila-redacao", redacao),
  buildApostila("apostila-redacao-concursos-policiais", redacaoConcursosPoliciais),
  buildApostila("apostila-taf", taf),
];

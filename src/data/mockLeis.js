const cfArtigos = [
  { id: "cf-1", numero: "1", texto: "Art. 1o A Republica Federativa do Brasil, formada pela uniao indissoluvel dos Estados e Municipios e do Distrito Federal, constitui-se em Estado Democratico de Direito e tem como fundamentos: I - a soberania; II - a cidadania; III - a dignidade da pessoa humana; IV - os valores sociais do trabalho e da livre iniciativa; V - o pluralismo politico. Paragrafo unico. Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos desta Constituicao." },
  { id: "cf-2", numero: "2", texto: "Art. 2o Sao Poderes da Uniao, independentes e harmonicos entre si, o Legislativo, o Executivo e o Judiciario." },
  { id: "cf-3", numero: "3", texto: "Art. 3o Constituem objetivos fundamentais da Republica Federativa do Brasil: I - construir uma sociedade livre, justa e solidaria; II - garantir o desenvolvimento nacional; III - erradicar a pobreza e a marginalizacao e reduzir as desigualdades sociais e regionais; IV - promover o bem de todos, sem preconceitos de origem, raca, sexo, cor, idade e quaisquer outras formas de discriminacao." },
  { id: "cf-5", numero: "5", texto: "Art. 5o Todos sao iguais perante a lei, sem distincao de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no Pais a inviolabilidade do direito a vida, a liberdade, a igualdade, a seguranca e a propriedade, nos termos seguintes." },
  { id: "cf-37", numero: "37", texto: "Art. 37. A administracao publica direta e indireta de qualquer dos Poderes da Uniao, dos Estados, do Distrito Federal e dos Municipios obedecera aos principios de legalidade, impessoalidade, moralidade, publicidade e eficiencia." },
  { id: "cf-144", numero: "144", texto: "Art. 144. A seguranca publica, dever do Estado, direito e responsabilidade de todos, e exercida para a preservacao da ordem publica e da incolumidade das pessoas e do patrimonio, atraves dos seguintes orgaos: I - policia federal; II - policia rodoviaria federal; III - policia ferroviaria federal; IV - policias civis; V - policias militares e corpos de bombeiros militares; VI - policias penais federal, estaduais e distrital." },
];

const cpArtigos = [
  { id: "cp-1", numero: "1", texto: "Art. 1o Nao ha crime sem lei anterior que o defina. Nao ha pena sem previa cominacao legal." },
  { id: "cp-14", numero: "14", texto: "Art. 14. Diz-se o crime: I - consumado, quando nele se reunem todos os elementos de sua definicao legal; II - tentado, quando, iniciada a execucao, nao se consuma por circunstancias alheias a vontade do agente." },
  { id: "cp-15", numero: "15", texto: "Art. 15. O agente que, voluntariamente, desiste de prosseguir na execucao ou impede que o resultado se produza, so responde pelos atos ja praticados." },
  { id: "cp-18", numero: "18", texto: "Art. 18. Diz-se o crime: I - doloso, quando o agente quis o resultado ou assumiu o risco de produzi-lo; II - culposo, quando o agente deu causa ao resultado por imprudencia, negligencia ou impericia." },
  { id: "cp-20", numero: "20", texto: "Art. 20. O erro sobre elemento constitutivo do tipo legal de crime exclui o dolo, mas permite a punicao por crime culposo, se previsto em lei." },
  { id: "cp-59", numero: "59", texto: "Art. 59. O juiz, atendendo a culpabilidade, aos antecedentes, a conduta social, a personalidade do agente, aos motivos, as circunstancias e consequencias do crime, bem como ao comportamento da vitima, estabelecera, conforme seja necessario e suficiente para reprovacao e prevencao do crime, as penas aplicaveis." },
];

const ctbArtigos = [
  { id: "ctb-1", numero: "1", texto: "Art. 1o O transito de qualquer natureza nas vias terrestres do territorio nacional, abertas a circulacao, rege-se por este Codigo." },
  { id: "ctb-29", numero: "29", texto: "Art. 29. O transito de veiculos nas vias terrestres abertas a circulacao obedecera as normas estabelecidas neste Codigo e em resolucoes do CONTRAN." },
  { id: "ctb-165", numero: "165", texto: "Art. 165. Dirigir sob a influencia de alcool ou de qualquer outra substancia psicoativa que determine dependencia: Infracao - gravissima; Penalidade - multa (dez vezes) e suspensao do direito de dirigir por 12 meses." },
  { id: "ctb-306", numero: "306", texto: "Art. 306. Conduzir veiculo automotor com capacidade psicomotora alterada em razao da influencia de alcool ou de outra substancia psicoativa que determine dependencia: Penas - detencao, de seis meses a tres anos, multa e suspensao ou proibicao de se obter a permissao ou a habilitacao para dirigir veiculo automotor." },
];

const lei8112Artigos = [
  { id: "l8112-1", numero: "1", texto: "Art. 1o Esta Lei institui o Regime Juridico dos Servidores Publicos Civis da Uniao, das autarquias, inclusive as em regime especial, e das fundacoes publicas federais." },
  { id: "l8112-2", numero: "2", texto: "Art. 2o Para os efeitos desta Lei, servidor e a pessoa legalmente investida em cargo publico." },
  { id: "l8112-3", numero: "3", texto: "Art. 3o Cargo publico e o conjunto de atribuicoes e responsabilidades previstas na estrutura organizacional que devem ser cometidas a um servidor." },
  { id: "l8112-116", numero: "116", texto: "Art. 116. Sao deveres do servidor: exercer com zelo e dedicacao as atribuicoes do cargo; ser leal as instituicoes; observar as normas legais e regulamentares; cumprir as ordens superiores, exceto quando manifestamente ilegais." },
  { id: "l8112-117", numero: "117", texto: "Art. 117. Ao servidor e proibido ausentar-se do servico durante o expediente, sem previa autorizacao do chefe imediato, retirar documento da reparticao sem autorizacao e recusar fe a documentos publicos." },
  { id: "l8112-132", numero: "132", texto: "Art. 132. A demissao sera aplicada nos casos de crime contra a administracao publica, abandono de cargo, inassiduidade habitual, improbidade administrativa, insubordinacao grave em servico e outras hipoteses legais." },
];

export const mockLeis = [
  { id: "cf88", nome: "Constituicao Federal de 1988", tipo: "Constituicao Federal", materia: "Direito Constitucional", capitulos: [{ nome: "Principios, direitos e administracao", secao: "Artigos mais cobrados", artigos: cfArtigos }] },
  { id: "cp", nome: "Codigo Penal", tipo: "Codigo", materia: "Direito Penal", capitulos: [{ nome: "Parte Geral", secao: "Artigos mais cobrados", artigos: cpArtigos }] },
  { id: "ctb", nome: "Codigo de Transito Brasileiro", tipo: "Codigo", materia: "CTB", capitulos: [{ nome: "Normas gerais e infracoes", secao: "Artigos mais cobrados", artigos: ctbArtigos }] },
  { id: "lei8112", nome: "Lei 8.112/90", tipo: "Lei Especial", materia: "Direito Administrativo", capitulos: [{ nome: "Regime juridico", secao: "Artigos mais cobrados", artigos: lei8112Artigos }] },
];

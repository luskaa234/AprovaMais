# Integração conteúdo-interface

## Rotas detectadas

| Rota | Tipo | Fonte | Componente |
| --- | --- | --- | --- |
| / | react-router | src/App.jsx |  |
| /app | react-router | src/App.jsx |  |
| /login | react-router | src/App.jsx |  |
| /criar-conta | react-router | src/App.jsx |  |
| /admin | react-router | src/App.jsx |  |
| /auth/callback | react-router | src/App.jsx |  |
| /callback | react-router | src/App.jsx |  |
| /esqueci-senha | react-router | src/App.jsx |  |
| /recuperar-senha | react-router | src/App.jsx |  |
| * | react-router | src/App.jsx |  |
| oab | internal | src/pages/InternalApp.jsx | ./OAB |
| questoes | internal | src/pages/InternalApp.jsx | ./Questoes |
| simulados | internal | src/pages/InternalApp.jsx | ./Simulados |
| taf | internal | src/pages/InternalApp.jsx | ./TAF |
| plano | internal | src/pages/InternalApp.jsx | ./Plano |
| revisao | internal | src/pages/InternalApp.jsx | ./Revisao |
| flashcards | internal | src/pages/InternalApp.jsx | ./Flashcards |
| mapas | internal | src/pages/InternalApp.jsx | ./MapasMentais |
| redacao | internal | src/pages/InternalApp.jsx | ./Redacao |
| erros | internal | src/pages/InternalApp.jsx | ./CadernoErros |
| biblioteca | internal | src/pages/InternalApp.jsx | ./Biblioteca |
| leis | internal | src/pages/InternalApp.jsx | ./LeisSecas |
| ia | internal | src/pages/InternalApp.jsx | ./IA |
| perfil | internal | src/pages/InternalApp.jsx | ./Perfil |
| ajuda | internal | src/pages/InternalApp.jsx | ./Ajuda |
| admin | internal | src/pages/InternalApp.jsx | ../admin/AdminLayout |

## Tabelas detectadas

| Tabela/modelo | Fontes |
| --- | --- |
| ContentFile | prisma/schema.prisma |
| Questao | src/data/apostilas/atualidades.js; src/data/apostilas/criminologia-seguranca-publica-avancada.js; src/data/apostilas/ctb-codigo-transito-brasileiro.js; src/data/apostilas/direito-administrativo.js; src/data/apostilas/direito-ambiental.js |
| admin_logs | supabase/admin_panel.sql; supabase/functions/_shared/admin.ts |
| ai_cache | supabase/functions/ia-aprova/index.ts; supabase/ia_aprova.sql |
| ai_usage_logs | supabase/functions/ia-aprova/index.ts; supabase/ia_aprova.sql |
| app_config | src/services/adminService.js; supabase/admin_panel.sql; supabase/functions/admin-set-manutencao/index.ts |
| artigos_favoritos | src/services/leisService.js; supabase/schema.sql |
| artigos_grifados | supabase/schema.sql |
| artigos_notas | supabase/schema.sql |
| assinaturas | src/pages/Checkout/CardBrick.jsx; storage/content/leis/codigo-civil/texto.txt; storage/content/leis/cpp/texto.txt; storage/content/leis/regulamento-oab/artigos.json; storage/content/leis/regulamento-oab/texto.txt |
| avatars | src/components/Hero.jsx; src/components/landing/Hero.jsx; src/index.css; src/landing-light.css; src/pages/Perfil/index.jsx |
| caderno_erros | src/pages/CadernoErros/index.jsx; src/pages/Questoes/index.jsx; src/services/questoesService.js; src/services/revisaoService.js; supabase/fix_user_data_isolation.sql |
| flashcard_decks | src/services/flashcardsService.js; scripts/importar-flashcards.js; supabase/schema.sql |
| flashcards | src/components/landing/FlashcardsFlipStack.jsx; src/data/apostilas/administracao-financeira-orcamentaria.js; src/data/apostilas/administracao-publica-gestao-publica.js; src/data/apostilas/arquivologia.js; src/data/apostilas/atendimento-publico-qualidade-servico-publico.js |
| grifos | src/pages/Home.jsx; src/pages/LeisSecas/index.jsx; src/services/leisService.js; src/stores/index.js; src/tours/leisTour.js |
| leis | src/ai/tutorPrompt.js; src/data/apostilas/criminologia-seguranca-publica-avancada.js; src/data/apostilas/direito-administrativo.js; src/data/apostilas/direito-civil.js; src/data/apostilas/direito-constitucional-avancado.js |
| leis_artigos | src/services/leisService.js; scripts/encoding-dry-run.js; scripts/migrar-para-nuvem.js; supabase/migrate_to_cloud.sql; supabase/migrations/20260702140000_secure_paid_content.sql |
| leitura_progresso | src/services/leisService.js; supabase/leis_secas_estudo.sql |
| materiais | src/ai/AIChat.jsx; src/ai/tutorPrompt.js; src/data/apostilas/ciencias-natureza-simulados.js; src/data/apostilas/direito-constitucional-avancado.js; src/data/apostilas/direito-empresarial.js |
| notas | src/ai/tutorPrompt.js; src/data/apostilas/direito-digital-lgpd-crimes-ciberneticos.js; src/pages/LeisSecas/index.jsx; src/services/leisService.js; src/services/tafService.js |
| notificacoes | src/contexts/NotificationContext.jsx; src/contexts/UserContext.jsx; src/services/index.js; src/services/miscService.js; src/stores/index.js |
| pagamentos | src/components/payment/PaymentCheckout.jsx; src/data/apostilas/direito-previdenciario.js; src/pages/Checkout/PixPanel.jsx; storage/content/leis/cf88/texto.txt; storage/content/leis/clt/artigos.json |
| plano_atividades | src/services/planoService.js; supabase/fix_user_data_isolation.sql; supabase/plano_atividades.sql |
| planos | src/ai/AIChat.jsx; src/ai/tutorPrompt.js; src/components/auth/RegisterForm.jsx; src/components/Footer.jsx; src/components/landing/Pricing.jsx |
| profiles | src/contexts/UserContext.jsx; src/pages/Dashboard/index.jsx; src/services/tafService.js; supabase/add_tour_completo.sql; supabase/admin_panel.sql |
| questoes | src/ai/tutorPrompt.js; src/contexts/UserContext.jsx; src/data/apostilas/administracao-financeira-orcamentaria.js; src/data/apostilas/administracao-publica-gestao-publica.js; src/data/apostilas/arquivologia.js |
| questoes_salvas | src/pages/Questoes/index.jsx; src/services/questoesService.js; supabase/fix_user_data_isolation.sql; supabase/lote1_interacoes.sql; supabase/schema.sql |
| ranking | src/contexts/UserContext.jsx; src/data/apostilas/simulados-por-nivel.js; src/pages/Dashboard/index.jsx; src/services/index.js; src/services/miscService.js |
| revisao_questoes | src/services/revisaoService.js; supabase/revisao_questoes.sql |
| revisoes | src/components/landing/Carousel3DSection.jsx; src/contexts/UserContext.jsx; src/pages/Biblioteca/ApostilaChapterReader.jsx; src/pages/Dashboard/index.jsx; src/stores/index.js |
| taf_testes | src/services/tafService.js; supabase/schema.sql |
| taf_treinos | src/services/tafService.js; supabase/schema.sql |
| tentativas | src/contexts/UserContext.jsx; src/data/apostilas/taf.js; src/data/mockQuestoes.js; src/pages/CadernoErros/index.jsx; src/pages/Dashboard/index.jsx |
| text | src/admin/AdminLayout.jsx; src/ai/AIChat.jsx; src/ai/tutorPrompt.js; src/App.css; src/App.jsx |

## Conteúdos conectados

| Caminho | Tipo | Rota | Componentes/serviços |
| --- | --- | --- | --- |
| src/admin/AdminLayout.jsx | conteúdo não identificado | não identificada | src/pages/InternalApp.jsx |
| src/admin/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/ai/AIChat.jsx | conteúdo não identificado | não identificada | src/pages/IA/index.jsx |
| src/ai/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/ai/tutorPrompt.js | conteúdo não identificado | não identificada |  |
| src/App.jsx | conteúdo não identificado | não identificada |  |
| src/assets/hero.png | imagem | não identificada | src/components/Hero.jsx; src/components/landing/Hero.jsx; src/components/landing/HeroVideoSection.jsx; src/pages/Biblioteca/index.jsx |
| src/assets/react.svg | imagem | não identificada | src/components/animata/container/AnnouncementRibbon.jsx; src/components/animata/text/Counter.jsx; src/components/AppUI.jsx; src/components/auth/AuthLayout.jsx |
| src/assets/vite.svg | imagem | não identificada |  |
| src/charts/AppCharts.jsx | conteúdo não identificado | não identificada |  |
| src/charts/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/components/animata/container/AnnouncementRibbon.jsx | arquivo de desenvolvimento | não identificada | components/animata/container/announcement-ribbon.jsx |
| src/components/animata/container/Marquee.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/AnnouncementRibbon.jsx; components/animata/container/announcement-ribbon.jsx; components/animata/container/marquee.jsx |
| src/components/animata/text/Counter.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Stats.jsx |
| src/components/AppUI.jsx | arquivo de desenvolvimento | não identificada | src/components/HtmlFrameViewer.jsx; src/components/index.js; src/components/PdfFrameViewer.jsx; src/components/TourButton.jsx |
| src/components/AprovaLoading.jsx | arquivo de desenvolvimento | não identificada | src/components/index.js |
| src/components/auth/AuthLayout.jsx | arquivo de desenvolvimento | não identificada | src/components/AuthLayout.jsx; src/pages/ForgotPassword.jsx; src/pages/Login.jsx; src/pages/Register.jsx; src/pages/ResetPassword.jsx |
| src/components/auth/ForgotPasswordForm.jsx | arquivo de desenvolvimento | não identificada | src/pages/ForgotPassword.jsx |
| src/components/auth/LoginForm.jsx | arquivo de desenvolvimento | não identificada | src/pages/Login.jsx |
| src/components/auth/RegisterForm.jsx | arquivo de desenvolvimento | não identificada | src/pages/Register.jsx |
| src/components/AuthLayout.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/AuthLayout.jsx; src/pages/ForgotPassword.jsx; src/pages/Login.jsx; src/pages/Register.jsx; src/pages/ResetPassword.jsx |
| src/components/BrandLogo.jsx | arquivo de desenvolvimento | não identificada | src/components/AprovaLoading.jsx; src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/Footer.jsx; src/components/landing/AiPreview.jsx; src/components/landing/Footer.jsx |
| src/components/DashboardPreview.jsx | preview | não identificada | src/components/landing/DashboardPreview.jsx |
| src/components/Features.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/FeaturesGrid.jsx |
| src/components/Footer.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Footer.jsx; src/components/SplashScreen/SplashScreen.css; src/components/ui/card.jsx; src/components/ui/dialog.jsx; src/pages/Home.jsx |
| src/components/Hero.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Hero.jsx; src/components/landing/HeroVideoSection.jsx; src/pages/Home.jsx |
| src/components/HowItWorks.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/HowItWorks.jsx |
| src/components/HtmlFrameViewer.jsx | arquivo de desenvolvimento | não identificada | src/components/index.js; src/pages/MapasMentais/index.jsx |
| src/components/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/components/Iridescence.css | conteúdo não identificado | não identificada | src/components/Iridescence.jsx |
| src/components/kibo-ui/avatar-stack/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/components/landing/AiPreview.jsx | preview | não identificada | src/pages/Home.jsx |
| src/components/landing/DashboardPreview.jsx | preview | não identificada | src/components/DashboardPreview.jsx |
| src/components/landing/FlashcardsFlipStack.jsx | flashcard | Flashcards | src/pages/Home.jsx |
| src/components/landing/Footer.jsx | arquivo de desenvolvimento | não identificada | src/components/Footer.jsx; src/components/SplashScreen/SplashScreen.css; src/components/ui/card.jsx; src/components/ui/dialog.jsx; src/pages/Home.jsx |
| src/components/landing/Hero.jsx | arquivo de desenvolvimento | não identificada | src/components/Hero.jsx; src/components/landing/HeroVideoSection.jsx; src/pages/Home.jsx |
| src/components/landing/HeroVideoSection.jsx | arquivo de desenvolvimento | não identificada | src/pages/Home.jsx |
| src/components/landing/HowItWorks.jsx | arquivo de desenvolvimento | não identificada | src/components/HowItWorks.jsx |
| src/components/landing/Pricing.jsx | arquivo de desenvolvimento | não identificada | src/components/Pricing.jsx; src/pages/Home.jsx |
| src/components/landing/Stats.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Hero.jsx; src/pages/Dashboard/index.jsx; src/pages/Flashcards/index.jsx; src/pages/Militar/index.jsx; src/pages/OAB/index.jsx; src/pages/Perfil/index.jsx |
| src/components/Navbar.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/AuthLayout.jsx; src/pages/Home.jsx |
| src/components/payment/PaymentCheckout.jsx | arquivo de desenvolvimento | não identificada |  |
| src/components/PdfFrameViewer.jsx | arquivo de desenvolvimento | não identificada | src/components/index.js; src/pages/MapasMentais/index.jsx |
| src/components/Pricing.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Pricing.jsx; src/pages/Home.jsx |
| src/components/SlideArrowButton.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Pricing.jsx |
| src/components/SplashGate/SplashGate.jsx | arquivo de desenvolvimento | não identificada |  |
| src/components/SplashScreen/SplashScreen.css | conteúdo não identificado | não identificada | src/components/SplashGate/SplashGate.jsx; src/components/SplashScreen/SplashScreen.jsx |
| src/components/SplashScreen/SplashScreen.jsx | arquivo de desenvolvimento | não identificada | src/components/SplashGate/SplashGate.jsx |
| src/components/taf/ExercicioCard.jsx | material TAF | TAF | src/pages/TAF/index.jsx |
| src/components/TourButton.jsx | arquivo de desenvolvimento | não identificada | src/components/index.js; src/pages/Ajuda/index.jsx; src/pages/Perfil/index.jsx |
| src/components/ui/alert.jsx | arquivo de desenvolvimento | não identificada | src/components/payment/PaymentCheckout.jsx |
| src/components/ui/animated-list.jsx | arquivo de desenvolvimento | não identificada |  |
| src/components/ui/button.jsx | arquivo de desenvolvimento | não identificada | src/components/AppUI.jsx; src/components/auth/ForgotPasswordForm.jsx; src/components/auth/LoginForm.jsx; src/components/auth/RegisterForm.jsx; src/components/landing/AiPreview.jsx; src/components/landing/FlashcardsFlipStack.jsx |
| src/components/ui/card.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/AnnouncementRibbon.jsx; src/components/AppUI.jsx; src/components/AprovaLoading.jsx; src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/FAQ.jsx |
| src/components/ui/checkbox.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/LoginForm.jsx; src/components/auth/RegisterForm.jsx; src/components/ThemeSwitch.jsx |
| src/components/ui/dialog.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/HeroVideoSection.jsx; src/components/payment/PaymentCheckout.jsx |
| src/components/ui/input.jsx | arquivo de desenvolvimento | não identificada | src/components/AppUI.jsx; src/components/auth/ForgotPasswordForm.jsx; src/components/auth/LoginForm.jsx; src/components/auth/RegisterForm.jsx; src/components/landing/AiPreview.jsx; src/components/payment/PaymentCheckout.jsx |
| src/components/ui/iphone.jsx | arquivo de desenvolvimento | não identificada | src/components/landing/Hero.jsx |
| src/components/ui/label.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/AnnouncementRibbon.jsx; src/components/AppUI.jsx; src/components/AprovaLoading.jsx |
| src/components/ui/separator.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/ForgotPasswordForm.jsx; src/components/auth/LoginForm.jsx; src/components/auth/RegisterForm.jsx; src/components/Hero.jsx; src/components/landing/Hero.jsx; src/pages/ResetPassword.jsx |
| src/components/ui/tabs.jsx | arquivo de desenvolvimento | não identificada | src/components/payment/PaymentCheckout.jsx; src/components/ui/AnimatedTabs.jsx; src/pages/Flashcards/index.jsx; src/pages/Militar/index.jsx; src/pages/OAB/index.jsx; src/pages/Perfil/index.jsx |
| src/config/features.js | conteúdo não identificado | não identificada | src/components/Features.jsx; src/components/landing/FeaturesGrid.jsx; src/pages/Dashboard/index.jsx; src/pages/Home.jsx |
| src/contexts/AppProviders.jsx | arquivo de desenvolvimento | não identificada |  |
| src/contexts/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/contexts/NotificationContext.jsx | arquivo de desenvolvimento | não identificada |  |
| src/contexts/PreferencesContext.jsx | arquivo de desenvolvimento | não identificada |  |
| src/contexts/RouterContext.jsx | arquivo de desenvolvimento | não identificada |  |
| src/contexts/ThemeContext.jsx | arquivo de desenvolvimento | não identificada |  |
| src/contexts/UserContext.jsx | arquivo de desenvolvimento | não identificada |  |
| src/data/apostilas/administracao-financeira-orcamentaria.js | apostila | Biblioteca |  |
| src/data/apostilas/administracao-publica-gestao-publica.js | apostila | Biblioteca |  |
| src/data/apostilas/arquivologia.js | apostila | Biblioteca |  |
| src/data/apostilas/atendimento-publico-qualidade-servico-publico.js | apostila | Biblioteca |  |
| src/data/apostilas/atualidades-avancada.js | apostila | Biblioteca |  |
| src/data/apostilas/atualidades.js | apostila | Biblioteca | src/components/DashboardPreview.jsx; src/components/landing/DashboardPreview.jsx |
| src/data/apostilas/banco-repertorios-redacao.js | redação | Redação |  |
| src/data/apostilas/banco-temas-redacao-policial.js | redação | Redação |  |
| src/data/apostilas/biologia-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/caderno-erros-inteligente.js | apostila | Biblioteca |  |
| src/data/apostilas/ciencias-humanas-simulados.js | simulado | Simulados |  |
| src/data/apostilas/ciencias-natureza-simulados.js | simulado | Simulados |  |
| src/data/apostilas/comentarios-questoes-ia.js | banco de questões | Questões |  |
| src/data/apostilas/contabilidade-publica-basica.js | apostila | Biblioteca |  |
| src/data/apostilas/criminologia-seguranca-publica-avancada.js | apostila | Biblioteca |  |
| src/data/apostilas/criminologia-simulados-comentados.js | simulado | Simulados |  |
| src/data/apostilas/ctb-codigo-transito-brasileiro.js | apostila | Biblioteca |  |
| src/data/apostilas/ctb-simulados-comentados.js | simulado | Simulados |  |
| src/data/apostilas/direito-administrativo-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-administrativo.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-ambiental-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-ambiental.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-civil-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-civil.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-constitucional-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-constitucional.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-consumidor-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-consumidor.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-digital-lgpd-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-digital-lgpd-crimes-ciberneticos.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-eleitoral-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-eleitoral.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-empresarial-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-empresarial.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-financeiro-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-financeiro.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-internacional-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-internacional.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-penal-militar-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-penal-militar.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-penal-parte-especial-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-penal-parte-geral-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-penal-parte-geral.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-previdenciario-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-previdenciario.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-civil-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-civil.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-penal-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-penal-militar-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-penal-militar.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-penal.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-trabalho-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-processual-trabalho.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-trabalho-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-trabalho.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-tributario-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direito-tributario.js | apostila | Biblioteca |  |
| src/data/apostilas/direitos-humanos-atividade-policial-casos-praticos.js | apostila | Biblioteca |  |
| src/data/apostilas/direitos-humanos-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/direitos-humanos.js | apostila | Biblioteca |  |
| src/data/apostilas/eca-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/eca.js | apostila | Biblioteca |  |
| src/data/apostilas/etica-profissional-oab.js | apostila | Biblioteca |  |
| src/data/apostilas/etica.js | apostila | Biblioteca |  |
| src/data/apostilas/filosofia-direito.js | apostila | Biblioteca |  |
| src/data/apostilas/filosofia-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/fisica-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/flashcards-premium-disciplina.js | flashcard | Flashcards |  |
| src/data/apostilas/geografia-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/gestao-pessoas-servico-publico.js | apostila | Biblioteca |  |
| src/data/apostilas/governanca-integridade-compliance-publico.js | apostila | Biblioteca |  |
| src/data/apostilas/guarda-municipal-base-de-estudos.js | apostila | Biblioteca |  |
| src/data/apostilas/historia-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/index.js | apostila | Biblioteca | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/data/apostilas/informatica-avancada.js | apostila | Biblioteca |  |
| src/data/apostilas/informatica.js | apostila | Biblioteca |  |
| src/data/apostilas/legislacao-institucional-pmma-avancada.js | apostila | Biblioteca |  |
| src/data/apostilas/legislacao-institucional-pmma-simulados-comentados.js | simulado | Simulados |  |
| src/data/apostilas/legislacao-institucional-pmma.js | apostila | Biblioteca |  |
| src/data/apostilas/legislacao-penal-especial-avancada.js | apostila | Biblioteca |  |
| src/data/apostilas/legislacao-penal-especial.js | apostila | Biblioteca |  |
| src/data/apostilas/legislacao-pmma-questoes-por-artigo.js | banco de questões | Questões |  |
| src/data/apostilas/licitacoes-contratos-modulo-exclusivo.js | apostila | Biblioteca |  |
| src/data/apostilas/linguagens-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/mapas-mentais-textuais-disciplina.js | mapa mental | Mapas mentais |  |
| src/data/apostilas/matematica-basica.js | apostila | Biblioteca |  |
| src/data/apostilas/matematica-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/matematica-raciocinio-logico-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-direito-administrativo.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-direito-civil.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-direito-constitucional.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-direito-penal.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-etica-comentada.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-processo-civil.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-processo-penal.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-1fase-simulado-completo.js | simulado | Simulados |  |
| src/data/apostilas/oab-1fase-trabalho-processo-trabalho.js | apostila | Biblioteca |  |
| src/data/apostilas/oab-2fase-espelhos-correcao.js | redação | Redação |  |
| src/data/apostilas/oab-2fase-pecas-praticas.js | redação | Redação |  |
| src/data/apostilas/oab-2fase-treino-discursivas.js | apostila | Biblioteca |  |
| src/data/apostilas/ordem-publica-defesa-social-seguranca-cidada.js | apostila | Biblioteca |  |
| src/data/apostilas/organizacao-judiciaria.js | apostila | Biblioteca |  |
| src/data/apostilas/plano-estudo-por-objetivo.js | apostila | Biblioteca |  |
| src/data/apostilas/pmma-caderno-de-erros-inteligente.js | apostila | Biblioteca |  |
| src/data/apostilas/pmma-revisao-de-vespera.js | revisão | não identificada |  |
| src/data/apostilas/pmma-simulado-final-completo.js | simulado | Simulados |  |
| src/data/apostilas/policia-comunitaria-mediacao-conflitos.js | apostila | Biblioteca |  |
| src/data/apostilas/policia-penal-base-de-estudos.js | apostila | Biblioteca |  |
| src/data/apostilas/portugues-avancado.js | apostila | Biblioteca |  |
| src/data/apostilas/portugues-pmma-interpretacao.js | apostila | Biblioteca |  |
| src/data/apostilas/portugues-pmma-ortografia-morfologia.js | apostila | Biblioteca |  |
| src/data/apostilas/portugues-pmma-sintaxe.js | apostila | Biblioteca |  |
| src/data/apostilas/prf-base-de-estudos.js | apostila | Biblioteca |  |
| src/data/apostilas/quimica-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/raciocinio-logico.js | apostila | Biblioteca |  |
| src/data/apostilas/README.md | apostila | Biblioteca |  |
| src/data/apostilas/redacao-concursos-policiais.js | redação | Redação |  |
| src/data/apostilas/redacao-enem.js | redação | Redação |  |
| src/data/apostilas/redacao.js | redação | Redação |  |
| src/data/apostilas/regimentos-internos-tribunais.js | apostila | Biblioteca |  |
| src/data/apostilas/revisao-24h-prova.js | revisão | não identificada |  |
| src/data/apostilas/revisao-7-dias-prova.js | revisão | não identificada |  |
| src/data/apostilas/revisao-enem-vespera.js | revisão | não identificada |  |
| src/data/apostilas/seguranca-publica-avancada-simulados.js | simulado | Simulados |  |
| src/data/apostilas/simulados-por-banca.js | simulado | Simulados |  |
| src/data/apostilas/simulados-por-concurso.js | simulado | Simulados |  |
| src/data/apostilas/simulados-por-nivel.js | simulado | Simulados |  |
| src/data/apostilas/sociologia-enem.js | apostila | Biblioteca |  |
| src/data/apostilas/taf.js | material TAF | TAF |  |
| src/data/apostilas/uso-diferenciado-da-forca-atuacao-policial.js | apostila | Biblioteca |  |
| src/data/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/data/mockBiblioteca.js | mock | não identificada |  |
| src/data/mockFlashcards.js | flashcard | Flashcards |  |
| src/data/mockLeis.js | mock | não identificada |  |
| src/data/mockMapas.js | mock | não identificada |  |
| src/data/mockNotificacoes.js | mock | não identificada |  |
| src/data/mockPlano.js | mock | não identificada |  |
| src/data/mockQuestoes.js | banco de questões | Questões |  |
| src/data/mockRanking.js | mock | não identificada |  |
| src/data/mockRedacoes.js | mock | não identificada |  |
| src/data/mockSimulados.js | simulado | Simulados |  |
| src/data/mockTAF.js | mock | não identificada |  |
| src/data/mockUsers.js | mock | não identificada |  |
| src/data/taf_exercicios.json | conteúdo não identificado | não identificada |  |
| src/forms/AppForms.jsx | conteúdo não identificado | não identificada |  |
| src/forms/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/hooks/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/hooks/useAI.js | arquivo de desenvolvimento | não identificada |  |
| src/hooks/useAsyncData.js | arquivo de desenvolvimento | não identificada | src/pages/Biblioteca/index.jsx; src/pages/CadernoErros/index.jsx; src/pages/Flashcards/index.jsx; src/pages/LeisSecas/index.jsx; src/pages/MapasMentais/index.jsx; src/pages/Militar/index.jsx |
| src/hooks/useDebounce.js | arquivo de desenvolvimento | não identificada | src/components/AppUI.jsx |
| src/hooks/useLocalStorage.js | arquivo de desenvolvimento | não identificada | src/pages/Biblioteca/index.jsx |
| src/hooks/useMediaQuery.js | arquivo de desenvolvimento | não identificada | src/components/PdfFrameViewer.jsx |
| src/hooks/useOnboarding.js | arquivo de desenvolvimento | não identificada | src/pages/InternalApp.jsx |
| src/hooks/useQuestoes.js | banco de questões | Questões | src/pages/CadernoErros/index.jsx; src/pages/Dashboard/index.jsx; src/pages/IA/index.jsx; src/pages/Questoes/index.jsx |
| src/hooks/useTimer.js | arquivo de desenvolvimento | não identificada | src/pages/Simulados/index.jsx |
| src/index.css | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/landing-light.css | conteúdo não identificado | não identificada |  |
| src/layouts/AppShell.jsx | conteúdo não identificado | não identificada | src/pages/InternalApp.jsx |
| src/layouts/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/layouts/navigation.js | conteúdo não identificado | não identificada | src/components/Navbar.jsx; src/pages/Flashcards/index.jsx |
| src/lib/supabase.js | conteúdo não identificado | não identificada | src/components/auth/ForgotPasswordForm.jsx; src/components/payment/PaymentCheckout.jsx; src/pages/AuthCallback.jsx; src/pages/CadernoErros/index.jsx; src/pages/Checkout/PixPanel.jsx; src/pages/Dashboard/index.jsx |
| src/lib/utils.js | conteúdo não identificado | não identificada | src/components/animata/container/AnnouncementRibbon.jsx; src/components/animata/container/Marquee.jsx; src/components/kibo-ui/avatar-stack/index.jsx; src/components/landing/StudyNotifications.jsx; src/components/ShimmerCTA.jsx; src/components/ui/alert.jsx |
| src/lib/zodConfig.js | conteúdo não identificado | não identificada |  |
| src/main.jsx | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/Iridescence.jsx; src/components/landing/DashboardPreview.jsx |
| src/modals/AppModal.jsx | conteúdo não identificado | não identificada |  |
| src/modals/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Ajuda/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/AuthCallback.jsx | arquivo de desenvolvimento | não identificada |  |
| src/pages/Biblioteca/ApostilaChapterReader.jsx | apostila | Biblioteca | src/pages/Biblioteca/MaterialCard.jsx |
| src/pages/Biblioteca/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Biblioteca/index.jsx | apostila | Biblioteca | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Biblioteca/MaterialCard.jsx | apostila | Biblioteca | src/pages/Biblioteca/index.js; src/pages/Biblioteca/index.jsx |
| src/pages/CadernoErros/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/CadernoErros/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Checkout/CardBrick.jsx | arquivo de desenvolvimento | não identificada | src/pages/Checkout/index.jsx |
| src/pages/Checkout/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Checkout/PixPanel.jsx | arquivo de desenvolvimento | não identificada | src/pages/Checkout/index.jsx |
| src/pages/Dashboard/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Dashboard/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Flashcards/DeckCard.jsx | flashcard | Flashcards | src/pages/Flashcards/index.js |
| src/pages/Flashcards/index.js | flashcard | Flashcards | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Flashcards/index.jsx | flashcard | Flashcards | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/ForgotPassword.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/ForgotPasswordForm.jsx |
| src/pages/Home.jsx | arquivo de desenvolvimento | não identificada | src/pages/UnifiedApp.jsx |
| src/pages/IA/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/IA/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/InternalApp.jsx | arquivo de desenvolvimento | não identificada | src/pages/UnifiedApp.jsx |
| src/pages/LeisSecas/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/LeisSecas/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Login.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/LoginForm.jsx; src/components/auth/RegisterForm.jsx; src/components/AuthLayout.jsx; src/pages/AuthCallback.jsx |
| src/pages/MapasMentais/index.js | mapa mental | Mapas mentais | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/MapasMentais/index.jsx | mapa mental | Mapas mentais | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Militar/index.jsx | simulado | Simulados | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/OAB/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Onboarding.jsx | arquivo de desenvolvimento | não identificada | src/components/TourButton.jsx; src/pages/InternalApp.jsx |
| src/pages/Perfil/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Perfil/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Plano/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Plano/index.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Questoes/index.js | banco de questões | Questões | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Questoes/index.jsx | banco de questões | Questões | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Questoes/QuestionCard.jsx | banco de questões | Questões | src/pages/Biblioteca/ApostilaChapterReader.jsx; src/pages/Questoes/index.js; src/pages/Questoes/index.jsx; src/pages/Revisao/index.jsx |
| src/pages/Redacao/index.js | redação | Redação | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Redacao/index.jsx | redação | Redação | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Register.jsx | arquivo de desenvolvimento | não identificada | src/components/auth/RegisterForm.jsx |
| src/pages/ResetPassword.jsx | arquivo de desenvolvimento | não identificada |  |
| src/pages/Revisao/index.js | revisão | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Revisao/index.jsx | revisão | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Simulados/index.js | simulado | Simulados | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/Simulados/index.jsx | simulado | Simulados | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/TAF/index.js | material TAF | TAF | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/TAF/index.jsx | material TAF | TAF | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/pages/UnifiedApp.jsx | arquivo de desenvolvimento | não identificada |  |
| src/registry/magicui/hero-video-dialog.jsx | conteúdo não identificado | não identificada | src/components/landing/HeroVideoSection.jsx |
| src/registry/magicui/iphone.jsx | conteúdo não identificado | não identificada | src/components/landing/Hero.jsx |
| src/registry/magicui/safari.jsx | conteúdo não identificado | não identificada | src/components/landing/Hero.jsx |
| src/services/adminService.js | arquivo de desenvolvimento | não identificada | src/pages/InternalApp.jsx |
| src/services/aiService.js | arquivo de desenvolvimento | não identificada | src/pages/Biblioteca/ApostilaChapterReader.jsx; src/pages/Dashboard/index.jsx; src/pages/MapasMentais/index.jsx; src/pages/Onboarding.jsx; src/pages/Questoes/QuestionCard.jsx |
| src/services/bibliotecaService.js | apostila | Biblioteca | src/pages/Biblioteca/index.jsx |
| src/services/contentAccessService.js | arquivo de desenvolvimento | não identificada |  |
| src/services/flashcardsService.js | flashcard | Flashcards | src/pages/CadernoErros/index.jsx; src/pages/Flashcards/index.jsx; src/pages/MapasMentais/index.jsx |
| src/services/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/services/leisService.js | arquivo de desenvolvimento | não identificada | src/pages/LeisSecas/index.jsx |
| src/services/militarService.js | simulado | Simulados | src/pages/Militar/index.jsx |
| src/services/miscService.js | arquivo de desenvolvimento | não identificada |  |
| src/services/oabService.js | simulado | Simulados | src/pages/OAB/index.jsx |
| src/services/paymentService.js | arquivo de desenvolvimento | não identificada | src/components/landing/Pricing.jsx; src/components/payment/PaymentCheckout.jsx; src/components/Pricing.jsx; src/pages/Checkout/CardBrick.jsx; src/pages/Checkout/index.jsx; src/pages/InternalApp.jsx |
| src/services/planoService.js | banco de questões | Questões | src/pages/Plano/index.jsx |
| src/services/questoesService.js | banco de questões | Questões | src/pages/CadernoErros/index.jsx; src/pages/Dashboard/index.jsx; src/pages/MapasMentais/index.jsx; src/pages/Questoes/index.jsx; src/pages/Revisao/index.jsx |
| src/services/redacaoService.js | redação | Redação | src/pages/Redacao/index.jsx |
| src/services/revisaoService.js | revisão | não identificada | src/pages/Revisao/index.jsx |
| src/services/simuladosService.js | simulado | Simulados | src/pages/Simulados/index.jsx |
| src/services/tafService.js | arquivo de desenvolvimento | não identificada | src/pages/TAF/index.jsx |
| src/stores/index.js | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/tables/DataTable.jsx | conteúdo não identificado | não identificada |  |
| src/tables/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/tours/ajudaTour.js | conteúdo não identificado | não identificada |  |
| src/tours/appTour.js | conteúdo não identificado | não identificada |  |
| src/tours/aprovinhoTour.js | conteúdo não identificado | não identificada |  |
| src/tours/dashboardTour.js | conteúdo não identificado | não identificada |  |
| src/tours/flashcardsTour.js | flashcard | Flashcards |  |
| src/tours/leisTour.js | conteúdo não identificado | não identificada |  |
| src/tours/mapasTour.js | conteúdo não identificado | não identificada |  |
| src/tours/onboardingManager.js | conteúdo não identificado | não identificada | src/components/TourButton.jsx |
| src/tours/perfilTour.js | conteúdo não identificado | não identificada |  |
| src/tours/questoesTour.js | banco de questões | Questões |  |
| src/tours/redacaoTour.js | redação | Redação |  |
| src/tours/simuladosTour.js | simulado | Simulados |  |
| src/tours/studiesTour.js | conteúdo não identificado | não identificada |  |
| src/tours/tourUtils.js | conteúdo não identificado | não identificada | src/pages/Ajuda/index.jsx |
| src/utils/calculators.js | conteúdo não identificado | não identificada |  |
| src/utils/formatters.js | conteúdo não identificado | não identificada |  |
| src/utils/index.js | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| src/utils/textEncoding.js | conteúdo não identificado | não identificada |  |
| public/aprova-demo.mp4 | videoaula | não identificada | src/components/landing/HeroVideoSection.jsx |
| public/brand/vemaprovar-logo-color.png | logo | não identificada |  |
| public/brand/vemaprovar-logo-white.png | logo | não identificada |  |
| public/brand/vemaprovar-monograma-white.png | logo | não identificada | src/components/BrandLogo.jsx |
| public/brand/vemaprovar-monograma.png | logo | não identificada | src/components/BrandLogo.jsx |
| public/branding/icon-192.png | logo | não identificada |  |
| public/branding/icon-512-maskable.png | logo | não identificada |  |
| public/branding/icon-512.png | logo | não identificada |  |
| public/branding/vemaprovar-logo-completa.png | logo | não identificada | src/components/SplashScreen/SplashScreen.jsx |
| public/branding/vemaprovar-logo-sem-slogan.png | logo | não identificada |  |
| public/branding/vemaprovar-simbolo-va.png | logo | não identificada |  |
| public/favicon.png | imagem | não identificada |  |
| public/favicon.svg | imagem | não identificada |  |
| public/icons.svg | imagem | não identificada | src/components/animata/container/AnnouncementRibbon.jsx |
| public/logos/concursos/cbm-mt.png | logo | não identificada | src/pages/Home.jsx |
| public/logos/concursos/oab.png | logo | não identificada | src/pages/Home.jsx |
| public/logos/concursos/pc-ma.png | logo | não identificada | src/pages/Home.jsx |
| public/logos/concursos/pm-ma.png | logo | não identificada | src/pages/Home.jsx |
| public/logos/concursos/policia-penal.png | logo | não identificada | src/pages/Home.jsx |
| public/logos/concursos/prf.png | logo | não identificada | src/pages/Home.jsx |
| public/manifest.mobile.webmanifest | conteúdo não identificado | não identificada |  |
| public/manifest.webmanifest | conteúdo não identificado | não identificada |  |
| public/pwa/apple-touch-icon.png | imagem | não identificada |  |
| public/pwa/pwa-192.png | imagem | não identificada |  |
| public/pwa/pwa-512.png | imagem | não identificada |  |
| public/screenshots/iphone-landing-reference.png | imagem | não identificada | src/components/landing/Hero.jsx |
| public/screenshots/mobile-site.svg | imagem | não identificada |  |
| public/splash/apple/iphone-13-pro-max-1284x2778.png | imagem | não identificada |  |
| public/splash/apple/iphone-14-13-1170x2532.png | imagem | não identificada |  |
| public/splash/apple/iphone-15-pro-1179x2556.png | imagem | não identificada |  |
| public/splash/apple/iphone-15-pro-max-1290x2796.png | imagem | não identificada |  |
| public/splash/apple/iphone-x-1125x2436.png | imagem | não identificada |  |
| public/splash/apple/iphone-xr-828x1792.png | imagem | não identificada |  |
| public/splash/apple/iphone-xs-max-1242x2688.png | imagem | não identificada |  |
| public/sw.js | conteúdo não identificado | não identificada |  |
| public/thumbnail-demo.png | imagem | não identificada | src/components/landing/HeroVideoSection.jsx |
| storage/content/cebraspe-local/cebraspe-local-preview.json | preview | não identificada |  |
| storage/content/cebraspe-local/cebraspe-local-report.json | preview | não identificada |  |
| storage/content/concursos-militares/pci/report.json | preview | não identificada | src/pages/Militar/index.jsx |
| storage/content/concursos-militares/pci/test-preview.json | preview | não identificada |  |
| storage/content/fgv-local/fgv-local-preview.json | preview | não identificada |  |
| storage/content/fgv-local/fgv-local-report.json | preview | não identificada |  |
| storage/content/leis/cdc/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/cdc/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/cdc/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/cf88/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/cf88/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/cf88/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/clt/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/clt/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/clt/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/codigo-civil/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/codigo-civil/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/codigo-civil/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/codigo-etica-oab/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/codigo-etica-oab/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/codigo-etica-oab/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/codigo-penal/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/codigo-penal/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/codigo-penal/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/cpc/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/cpc/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/cpc/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/cpp/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/cpp/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/cpp/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/ctn/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/ctn/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/ctn/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/estatuto-oab/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/estatuto-oab/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/estatuto-oab/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/leis/index.json | lei seca | Leis secas | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| storage/content/leis/regulamento-oab/artigos.json | lei seca | Leis secas |  |
| storage/content/leis/regulamento-oab/meta.json | lei seca | Leis secas | src/components/auth/AuthLayout.jsx; src/components/AuthLayout.jsx; src/components/DashboardPreview.jsx; src/components/FAQ.jsx; src/components/Features.jsx; src/components/landing/DashboardPreview.jsx |
| storage/content/leis/regulamento-oab/texto.txt | lei seca | Leis secas | src/components/HtmlFrameViewer.jsx |
| storage/content/militar/cbmal-soldado-combatente-2018-cebraspe/gabaritos/cbmal-soldado-combatente-2018-cebraspe-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/cbmal-soldado-combatente-2018-cebraspe/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/cbmal-soldado-combatente-2018-cebraspe/provas/cbmal-soldado-combatente-2018-cebraspe-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/cbmal-soldado-combatente-2018-cebraspe/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/cbmam-soldado-bombeiro-militar-2021-fgv/gabaritos/cbmam-soldado-bombeiro-militar-2021-fgv-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/cbmam-soldado-bombeiro-militar-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/cbmam-soldado-bombeiro-militar-2021-fgv/provas/cbmam-soldado-bombeiro-militar-2021-fgv-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/cbmam-soldado-bombeiro-militar-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pcam-delegado-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pcam-delegado-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pcrj-inspetor-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pcrj-inspetor-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pcrj-investigador-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pcrj-investigador-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pcrn-delegado-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pcrn-delegado-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pcsc-delegado-2024-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pcsc-delegado-2024-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pm-ba-soldado-2023-fcc/gabaritos/pm-ba-soldado-2023-fcc-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pm-ba-soldado-2023-fcc/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pm-ba-soldado-2023-fcc/provas/pm-ba-soldado-2023-fcc-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pm-ba-soldado-2023-fcc/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pm-pb-soldado-pm-combatente-2023-ibfc/gabaritos/pm-pb-soldado-pm-combatente-2023-ibfc-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pm-pb-soldado-pm-combatente-2023-ibfc/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pm-pb-soldado-pm-combatente-2023-ibfc/provas/pm-pb-soldado-pm-combatente-2023-ibfc-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pm-pb-soldado-pm-combatente-2023-ibfc/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pm-se-soldado-pm-3a-classe-combatente-2025-selecon/gabaritos/pm-se-soldado-pm-3a-classe-combatente-2025-selecon-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pm-se-soldado-pm-3a-classe-combatente-2025-selecon/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pm-se-soldado-pm-3a-classe-combatente-2025-selecon/provas/pm-se-soldado-pm-3a-classe-combatente-2025-selecon-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pm-se-soldado-pm-3a-classe-combatente-2025-selecon/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmac-oficial-combatente-2023-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmac-oficial-combatente-2023-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmal-soldado-combatente-2018-cebraspe/gabaritos/pmal-soldado-combatente-2018-cebraspe-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmal-soldado-combatente-2018-cebraspe/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmal-soldado-combatente-2018-cebraspe/provas/pmal-soldado-combatente-2018-cebraspe-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmal-soldado-combatente-2018-cebraspe/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmam-oficial-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmam-oficial-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmam-soldado-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmam-soldado-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmce-soldado-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmce-soldado-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmerj-cfo-2021-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmerj-cfo-2021-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmesp-cabo-2022-fgv-local/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmesp-cabo-2022-fgv-local/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmesp-sargento-2024-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmesp-sargento-2024-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe/gabaritos/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe/provas/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmma-soldado-do-quadro-de-praca-policial-2017-cebraspe/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmpb-cfo-2022-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmpb-cfo-2022-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmpi-soldado-pm-2017-nucepe-uespi/gabaritos/pmpi-soldado-pm-2017-nucepe-uespi-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmpi-soldado-pm-2017-nucepe-uespi/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmpi-soldado-pm-2017-nucepe-uespi/provas/pmpi-soldado-pm-2017-nucepe-uespi-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmpi-soldado-pm-2017-nucepe-uespi/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmsp-cabo-pm-2022-fgv/gabaritos/pmsp-cabo-pm-2022-fgv-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmsp-cabo-pm-2022-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmsp-cabo-pm-2022-fgv/provas/pmsp-cabo-pm-2022-fgv-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmsp-cabo-pm-2022-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmsp-soldado-2017-vunesp/gabaritos/pmsp-soldado-2017-vunesp-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2017-vunesp/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmsp-soldado-2017-vunesp/provas/pmsp-soldado-2017-vunesp-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2017-vunesp/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmsp-soldado-2023-vunesp/gabaritos/pmsp-soldado-2023-vunesp-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2023-vunesp/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmsp-soldado-2023-vunesp/provas/pmsp-soldado-2023-vunesp-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2023-vunesp/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmsp-soldado-2024-fgv/gabaritos/pmsp-soldado-2024-fgv-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2024-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmsp-soldado-2024-fgv/provas/pmsp-soldado-2024-fgv-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2024-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmsp-soldado-2025-fgv/gabaritos/pmsp-soldado-2025-fgv-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2025-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmsp-soldado-2025-fgv/provas/pmsp-soldado-2025-fgv-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmsp-soldado-2025-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/militar/pmto-quadro-de-pracas-da-policia-militar-2025-fgv/gabaritos/pmto-quadro-de-pracas-da-policia-militar-2025-fgv-gabarito-definitivo.pdf | gabarito | Biblioteca |  |
| storage/content/militar/pmto-quadro-de-pracas-da-policia-militar-2025-fgv/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/militar/pmto-quadro-de-pracas-da-policia-militar-2025-fgv/provas/pmto-quadro-de-pracas-da-policia-militar-2025-fgv-prova.pdf | prova | Biblioteca |  |
| storage/content/militar/pmto-quadro-de-pracas-da-policia-militar-2025-fgv/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/10-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/11-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/12-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1z13if.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-3byjyh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-2u4ukj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-hmh3h8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-2r56bb.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1j2gml.pdf | gabarito | Biblioteca |  |
| storage/content/oab/12-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-8kk7p6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-cxm10m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1uulqs.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-32ggt9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1nnt0p.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1ktle9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1qmwlk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/13-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-bvt3ot.pdf | gabarito | Biblioteca |  |
| storage/content/oab/14-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/15-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-administrativo-19vvnu.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-civil-sar2hr.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-constitucional-15wc24.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-do-trabalho-ys2xgc.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-empresarial-1yw2i4.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-penal-1f7tn6.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/provas/caderno-de-provas-direito-tributario-uumxfr.pdf | prova | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1y0o7g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-civil-ymyyne.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1u0vj4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-cpd8cg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1hz5m5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-penal-1dlt6i.pdf | gabarito | Biblioteca |  |
| storage/content/oab/15-exame/segunda-fase/padrao-de-respostas-direito-tributario-iqr96v.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-t734op.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1469zy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/16-exame/provas/caderno-de-prova-01-18yozo.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-prova-02-95ox0c.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-prova-03-13pdat.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-prova-04-1yfs87.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-administrativo-edxrv4.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-civil-1221zb.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-constitucional-rawx81.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-do-trabalho-17cl7h.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-empresarial-st7h0d.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-penal-1n7nnc.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/provas/caderno-de-provas-direito-tributario-1lodof.pdf | prova | Biblioteca |  |
| storage/content/oab/16-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-f6ryhz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1jcl7m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-foyt5x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1hsfy5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-empresarial-hcumz1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-penal-sc6iqr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-definitivo-tributario-1dhjrd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-administrativo-17n2r5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-civil-1sfwky.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1m6q2b.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1024h3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-empresarial-atualizado-em-18-5-2015-125uol.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-penal-w8wek5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/16-exame/segunda-fase/padrao-de-respostas-direito-tributario-1r8ns7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1avzn9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-cvnc3q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/17-exame/provas/caderno-de-prova-01-dnzoxi.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-prova-02-117iv7.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-prova-03-1l5nvm.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-prova-04-9o2zwt.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-administrativo-p4q5jm.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-civil-g3lan6.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-constitucional-aoi9pq.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-do-trabalho-1qmz09.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-empresarial-vxp9dg.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-penal-l3b60i.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/caderno-de-provas-direito-tributario-wdtyaj.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/provas/esclarecimento-materiais-e-procedimentos-para-consulta-da-prova-pratico-profissional-166pcv.pdf | prova | Biblioteca |  |
| storage/content/oab/17-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1frbx4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-wouhvd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1rpzt3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1ovgex.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-empresarial-19b092.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-penal-84tooz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-definitivo-tributario-qh194t.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1ktm2t.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-civil-l3ifus.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1hde4d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-148odz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-empresarial-gcywyh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-penal-7xeeid.pdf | gabarito | Biblioteca |  |
| storage/content/oab/17-exame/segunda-fase/padrao-de-respostas-direito-tributario-uvoraj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1ophiw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/18-exame/provas/caderno-de-prova-tipo-1-34r88r.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-prova-tipo-2-109w8g.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-prova-tipo-3-9ulf4i.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-prova-tipo-4-tcz9px.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-administrativo-15ofpz.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-civil-1l0rci.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-constitucional-h1cqu7.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-do-trabalho-1xvx06.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-empresarial-1ys78g.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-penal-1mai88.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/provas/caderno-de-provas-direito-tributario-y8p7mx.pdf | prova | Biblioteca |  |
| storage/content/oab/18-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1um2vg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-eskau9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-67xcd2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-11qte6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-empresarial-1bm3cc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-penal-1czkza.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-definitivo-tributario-1h2c1k.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1g3f8m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-civil-1rbejm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1afc66.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-v3hp8d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-empresarial-re3kdd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-penal-e3sx77.pdf | gabarito | Biblioteca |  |
| storage/content/oab/18-exame/segunda-fase/padrao-de-respostas-direito-tributario-t5wkne.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-atualizado-14pawg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/19-exame/provas/caderno-de-prova-tipo-1-1hvk6o.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-prova-tipo-2-18a4lo.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-prova-tipo-3-oqsrig.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-prova-tipo-4-1ico77.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-administrativo-1uxypj.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-civil-1bmn5x.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-constitucional-o9zw1g.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-do-trabalho-1eo0tm.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-empresarial-1jb92v.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-penal-q68kux.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/provas/caderno-de-provas-direito-tributario-dm88p5.pdf | prova | Biblioteca |  |
| storage/content/oab/19-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-112ouk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-hifztm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-123g3n.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-16d2a3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-empresarial-1d61th.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-penal-1p749v.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-definitivo-tributario-js52kk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-administrativo-d8nvlo.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-civil-ubarwe.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-constitucional-dvkkot.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1gykfv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-empresarial-gkazd8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-penal-1uw9sy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/19-exame/segunda-fase/padrao-de-respostas-direito-tributario-1nmvyn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-9n9ffh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-examinandos-de-salvador-ba-1et8zc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-1-15xg3w.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-1-reaplicacao-salvador-ba-65x7zi.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-2-maj79k.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-2-reaplicacao-salvador-ba-1dqk0x.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-3-bocpwt.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-3-reaplicacao-salvador-ba-wre74g.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-4-1458pu.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-prova-tipo-4-reaplicacao-salvador-ba-1aobzd.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-administrativo-1vqru8.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-administrativo-reaplicacao-porto-velho-ro-1ghgn2.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-civil-reaplicacao-porto-velho-ro-4mstai.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-civil-sniqax.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-constitucional-reaplicacao-porto-velho-ro-10ewfi.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-constitucional-viwa5u.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-do-trabalho-144a12.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-do-trabalho-reaplicacao-porto-velho-ro-1xbrxh.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-empresarial-4rlub2.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-empresarial-reaplicacao-porto-velho-ro-shohmj.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-penal-oef0i.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-penal-reaplicacao-porto-velho-ro-1v4qt4.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-tributario-1rnh5z.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/provas/caderno-de-provas-direito-tributario-reaplicacao-porto-velho-ro-sak8p5.pdf | prova | Biblioteca |  |
| storage/content/oab/20-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-reaplicacao-porto-velho-ro-qjrjqc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-uxbifm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-hm47ra.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-reaplicacao-porto-velho-ro-u2dag6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-q288sa.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-reaplicacao-porto-velho-ro-iqy6de.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-9uhq94.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-reaplicacao-porto-velho-ro-sjgqzh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-reaplicacao-porto-velho-ro-29cdbw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-z69y7s.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-5mg8vl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-reaplicacao-porto-velho-ro-1ktnoa.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1rw9bt.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-reaplicacao-porto-velho-ro-d0b6cx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-administrativo-nysydc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-administrativo-reaplicacao-porto-velho-ro-ix2ghw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-civil-19p268.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-civil-reaplicacao-porto-velho-ro-1hgnzc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-constitucional-olpngh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-constitucional-reaplicacao-porto-velho-ro-1en9qp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1iwj0e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-reaplicacao-porto-velho-ro-1rw3n4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-empresarial-15y9aq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-empresarial-reaplicacao-porto-velho-ro-1laywv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-penal-1lu2mg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-penal-reaplicacao-porto-velho-ro-1dp51k.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-tributario-9co940.pdf | gabarito | Biblioteca |  |
| storage/content/oab/20-exame/segunda-fase/padrao-de-respostas-direito-tributario-reaplicacao-porto-velho-ro-xxb50v.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/gabaritos/gabarito-do-caderno-de-prova-01-uwdyvp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/gabaritos/gabarito-do-caderno-de-prova-02-uwxrh2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/gabaritos/gabarito-do-caderno-de-prova-03-uxhk2f.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/gabaritos/gabarito-do-caderno-de-prova-04-uy1cns.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-01-1uw61u.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-02-1uwpug.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-03-1ux9n1.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-04-1uxtfm.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-administrativo-1ws6qe.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-civil-dex9z1.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-constitucional-1lxr7l.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-do-trabalho-fmjw4h.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-empresarial-1ptnu8.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-penal-10c8zo.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/provas/caderno-de-prova-direito-tributario-1nxefc.pdf | prova | Biblioteca |  |
| storage/content/oab/2010-2-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1lkr7r.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-civil-g3a962.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-constitucional-fcjkpg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-cl8jmi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-empresarial-am6cmq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-penal-1o0fcp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-2-exame/segunda-fase/padrao-de-respostas-direito-tributario-al2eqm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/2010-3-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/21-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-rv9qdu.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/21-exame/provas/caderno-de-prova-tipo-1-l5p1dl.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-prova-tipo-2-1g9l1x.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-prova-tipo-3-c5mgwq.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-prova-tipo-4-172rxv.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-administrativo-s0c6e9.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-civil-hk4onq.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-constitucional-16hlwp.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-do-trabalho-186spb.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-empresarial-1423pp.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-penal-j5l4cg.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/provas/caderno-de-provas-direito-tributario-yctc4.pdf | prova | Biblioteca |  |
| storage/content/oab/21-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-b3ef5s.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1aq5n7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-g4yb6x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-15txch.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-12xc9y.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1ha56z.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-17b022.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1uln1i.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-civil-12p176.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-constitucional-181zdt.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-10lgr0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-empresarial-lg8kfs.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-penal-qb1c6b.pdf | gabarito | Biblioteca |  |
| storage/content/oab/21-exame/segunda-fase/padrao-de-respostas-direito-tributario-1dvsal.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-mzcemy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/22-exame/provas/caderno-de-prova-tipo-1-13b7mz.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-prova-tipo-2-ufp8vd.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-prova-tipo-3-1hz8f5.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-prova-tipo-4-f45v7w.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-administrativo-191tz4.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-civil-1h1oj4.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-constitucional-1sjbr2.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-do-trabalho-12bkwq.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-empresarial-fmwp31.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-penal-gu1b5q.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/provas/caderno-de-provas-direito-tributario-1x570d.pdf | prova | Biblioteca |  |
| storage/content/oab/22-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1vevkw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1p7iia.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-inhw03.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1vqvdd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-13wwd8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1w4q6m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-w5plcz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-administrativo-l7jsk7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-civil-7kffg9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1awd4n.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-amq6if.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-empresarial-f5982.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-penal-32ecxq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/22-exame/segunda-fase/padrao-de-respostas-direito-tributario-13uq4f.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1ojpwd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/23-exame/provas/caderno-de-prova-tipo-1-1c1xvg.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-prova-tipo-2-1iefak.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-prova-tipo-3-ysnkop.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-prova-tipo-4-ljdfnt.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-administrativo-y6jdmh.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-civil-hj8jk8.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-constitucional-1fuojd.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-do-trabalho-1et8my.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-empresarial-vbdzef.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-penal-ahpwjf.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/provas/caderno-de-provas-direito-tributario-1sr5xa.pdf | prova | Biblioteca |  |
| storage/content/oab/23-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-19y94m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-woomcb.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-199eqm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1refjg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1txvwq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-jl18r8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-fl1mvc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-administrativo-j0afj2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-civil-jrb6ls.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-constitucional-21a4tv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-18t4l3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-empresarial-gjkwxa.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-penal-w9y9ov.pdf | gabarito | Biblioteca |  |
| storage/content/oab/23-exame/segunda-fase/padrao-de-respostas-direito-tributario-1g8h66.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-9c1rjf.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/24-exame/provas/caderno-de-prova-tipo-1-49qjjq.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-prova-tipo-2-111h6i.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-prova-tipo-3-4odvg5.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-prova-tipo-4-6f5zoy.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-administrativo-5ubhw.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-civil-19iftj.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-constitucional-n0zgmw.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-do-trabalho-1yfvfn.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-empresarial-iz0gam.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-penal-g2zlgb.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/provas/caderno-de-provas-direito-tributario-tmwwol.pdf | prova | Biblioteca |  |
| storage/content/oab/24-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1a7nu1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-9c4rkk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1x7hz0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-z29x6w.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1fou2g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1we0ps.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-r0olx3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1k9ovr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-civil-1v12gi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-constitucional-15a6hj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-d15bib.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-empresarial-rhf10e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-penal-1h13l6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/24-exame/segunda-fase/padrao-de-respostas-direito-tributario-1wnewd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-18qbq1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/25-exame/provas/caderno-de-prova-tipo-1-1tybaf.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-prova-tipo-2-1pw0c6.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-prova-tipo-3-1scjjx.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-prova-tipo-4-5l4ybe.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-administrativo-dj21d2.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-administrativo-porto-alegre-rs-10826q.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-civil-1wcqbn.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-civil-porto-alegre-rs-se63et.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-constitucional-1yv27n.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-constitucional-porto-alegre-rs-lj1fuj.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-do-trabalho-1x22dq.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-do-trabalho-porto-alegre-rs-n1vbxj.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-empresarial-14yoar.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-empresarial-porto-alegre-rs-4qsfvz.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-penal-1kq6ok.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-penal-porto-alegre-rs-i3r0q9.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-tributario-1hjvkm.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/provas/caderno-de-provas-direito-tributario-porto-alegre-rs-1jgoh7.pdf | prova | Biblioteca |  |
| storage/content/oab/25-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1mgtex.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-porto-alegre-rs-1jq4vb.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1fzhoh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-porto-alegre-rs-1lupzt.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1rzhna.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-porto-alegre-rs-1t4mwg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1d79x1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-porto-alegre-rs-16ggum.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-porto-alegre-rs-qmlk2r.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-skg0vo.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-12byjh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-porto-alegre-rs-1v3pnl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1q0nzi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-porto-alegre-rs-13qsm5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-administrativo-o00fdi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-administrativo-porto-alegre-rs-1a6unw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-civil-a7pl0g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-civil-porto-alegre-rs-1qrnma.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-constitucional-djt4oq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-constitucional-porto-alegre-rs-rqxo15.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-gczyno.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-porto-alegre-rs-1hkjv7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-empresarial-jlr9qw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-empresarial-porto-alegre-rs-tkl68f.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-penal-porto-alegre-rs-1tcai6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-penal-x80s2x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-tributario-9t9lgm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/25-exame/segunda-fase/padrao-de-respostas-direito-tributario-porto-alegre-rs-49rqxm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-atualizado-em-06.08.2018-1sxrjv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/26-exame/provas/caderno-de-prova-tipo-1-8hrwbk.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-prova-tipo-2-y20qzm.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-prova-tipo-3-1aeey7.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-prova-tipo-4-135evz.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-administrativo-1s4jjy.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-civil-9ltbgf.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-constitucional-5rajdq.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-do-trabalho-1aiohq.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-empresarial-1knu8b.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-penal-q3hxlz.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/provas/caderno-de-provas-direito-tributario-i6gfn5.pdf | prova | Biblioteca |  |
| storage/content/oab/26-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-tnl866.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1tsj52.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-15lqdb.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1m5w2g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-7kam4x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1foi78.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1i5owo.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1uy3p1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-civil-1bkzj2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1x5yr6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1go0l3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1q04sl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-penal-l9uo3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/26-exame/segunda-fase/padrao-de-respostas-direito-tributario-i6j2z.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-retificado-em-19.11.2018-13i9pd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/27-exame/provas/caderno-de-prova-tipo-1-n8lbvy.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-prova-tipo-2-7pcpql.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-prova-tipo-3-2oor9w.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-prova-tipo-4-19v5tb.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-administrativo-1yux7c.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-civil-9u08je.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-constitucional-1mdcos.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-do-trabalho-lb0oyy.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-empresarial-6uvocn.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-penal-zvkr8.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/provas/caderno-de-provas-direito-tributario-18qc4f.pdf | prova | Biblioteca |  |
| storage/content/oab/27-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-2tu93b.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-ur6245.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-h1hmtg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-rt4pqk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-atualizado-em-13-02-2019-3wjre4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-176n39.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-a8o418.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-administrativo-7sb3pf.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-civil-ud8omw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-constitucional-48r9pd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1gferw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-empresarial-uvq66a.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-penal-1sbns7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/27-exame/segunda-fase/padrao-de-respostas-direito-tributario-8jrjqk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-retificado-em-19.03.2019-166b6o.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/28-exame/provas/caderno-de-prova-tipo-1-5ejlci.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-prova-tipo-2-4wwn2u.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-prova-tipo-3-xocsfv.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-prova-tipo-4-umqj1v.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-administrativo-9zp750.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-civil-fe8wt0.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-constitucional-1yx6il.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-do-trabalho-1r2aor.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-empresarial-1n2l2q.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-penal-8yd7j7.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/provas/caderno-de-provas-direito-tributario-1uktuz.pdf | prova | Biblioteca |  |
| storage/content/oab/28-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-jbi1ev.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-8lxqbz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-rp4eld.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-6pygfg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-4l3qrx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-hwi0nz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-9mppv7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-administrativo-loo2f9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-civil-8rumz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-constitucional-znp62h.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-vonn3i.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-empresarial-33vi3l.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-penal-ptmwvv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/28-exame/segunda-fase/padrao-de-respostas-direito-tributario-nav9f9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-fayxg3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/29-exame/provas/caderno-de-prova-tipo-1-gajlkk.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-prova-tipo-2-8cy85q.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-prova-tipo-3-78hsv9.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-prova-tipo-4-cd4l9.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-administrativo-3ng1vl.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-civil-f9okl3.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-constitucional-1lceft.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-do-trabalho-p4aere.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-empresarial-v7rzq9.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-penal-1au4t8.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/provas/caderno-de-provas-direito-tributario-f8b41f.pdf | prova | Biblioteca |  |
| storage/content/oab/29-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1sltxq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-fl8ot1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1kohzd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1or9ir.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-10d4ts.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-lg919c.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-ed0nzr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-administrativo-x4bd4w.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-civil-1iet4t.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1cachs.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1fl6fe.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1eah7z.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-penal-bunsps.pdf | gabarito | Biblioteca |  |
| storage/content/oab/29-exame/segunda-fase/padrao-de-respostas-direito-tributario-11x3na.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1le03g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/30-exame/provas/caderno-de-prova-tipo-1-1lsa72.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-prova-tipo-2-n956uf.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-prova-tipo-3-5pmnsc.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-prova-tipo-4-7hamwx.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-administrativo-1vyk4e.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-civil-1i3n85.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-constitucional-1j4lun.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-do-trabalho-1ilxej.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-empresarial-g6wvnn.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-penal-1x1q9s.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/provas/caderno-de-provas-direito-tributario-9axzpg.pdf | prova | Biblioteca |  |
| storage/content/oab/30-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-138chx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-khtf9g.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-17fnz9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-kx7m6l.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-wgu9ao.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1eh8uj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-if3dr2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1v418e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-civil-d81p85.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-constitucional-10uw9c.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-18buzc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1r9680.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-penal-whawaq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/30-exame/segunda-fase/padrao-de-respostas-direito-tributario-1d39k7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1erk02.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/31-exame/provas/caderno-de-prova-tipo-1-1ms0lm.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-prova-tipo-2-14ld50.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-prova-tipo-3-xub3jg.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-prova-tipo-4-1kcpbi.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-administrativo-1i6edv.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-civil-qxd1xx.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-constitucional-1ely8n.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-do-trabalho-hb3ran.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-penal-cwo9j3.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direito-tributario-1f97vb.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/provas/caderno-de-provas-direitoempresarial-1prl0e.pdf | prova | Biblioteca |  |
| storage/content/oab/31-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1dzp93.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-15zaxa.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-ve9vfi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1d4mb2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1gkbv8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1oprsx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1pw840.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1e5dat.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-civil-rd58ct.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-constitucional-pc7w44.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-b2gpij.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-empresarial-6krdon.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-penal-qhp5yz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/31-exame/segunda-fase/padrao-de-respostas-direito-tributario-13n27m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-9lok8x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/32-exame/provas/caderno-de-prova-tipo-1-1myk9o.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-prova-tipo-2-1fk70e.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-prova-tipo-3-1q01vp.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-prova-tipo-4-9n0css.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-administrativo-qp9rwz.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-civil-g2e3i9.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-constitucional-1lzpq9.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-do-trabalho-10i30n.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-empresarial-1sy2qx.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-penal-vv5nam.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/provas/caderno-de-provas-direito-tributario-5du0fk.pdf | prova | Biblioteca |  |
| storage/content/oab/32-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-2iopyl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-w58o6t.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1t8wmq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-8p23x6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1b4mpo.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-wmsngz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-8mifkh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-administrativo-43be2o.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-civil-e4jw63.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1eunzp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1vgy36.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-empresarial-14hutr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-penal-v60ibe.pdf | gabarito | Biblioteca |  |
| storage/content/oab/32-exame/segunda-fase/padrao-de-respostas-direito-tributario-px2x1f.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1tizcj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/33-exame/provas/caderno-de-prova-tipo-1-18f7of.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-prova-tipo-2-15dfgu.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-prova-tipo-3-9abch8.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-prova-tipo-4-rmxmy4.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-administrativo-16ekz3.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-civil-oa0htn.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-constitucional-15tzce.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-do-trabalho-1iswlt.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-empresarial-1kpmni.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-penal-1w28mp.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/provas/caderno-de-provas-direito-tributario-i65xgw.pdf | prova | Biblioteca |  |
| storage/content/oab/33-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1hxq1b.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-c4ilru.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-18sin0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1x50xp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-y1mvcp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-ivd7ub.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-sil6ju.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-administrativo-wzrv30.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-civil-kdfi91.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-constitucional-10t064.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-cn8oh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-empresarial-fnnqc5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-penal-ax9x2k.pdf | gabarito | Biblioteca |  |
| storage/content/oab/33-exame/segunda-fase/padrao-de-respostas-direito-tributario-3kaybq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1agp71.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/34-exame/provas/caderno-de-prova-tipo-1-1jguo5.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-prova-tipo-2-jlbjkm.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-prova-tipo-3-xoxh9o.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-prova-tipo-4-8xkmxz.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-administrativo-1atduw.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-civil-1h9pe5.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-constitucional-1w79jv.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-do-trabalho-1m08fy.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-empresarial-jc6r5q.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-penal-vevdr9.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/provas/caderno-de-provas-direito-tributario-19u313.pdf | prova | Biblioteca |  |
| storage/content/oab/34-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-zsw8k6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-159ujj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1ve1il.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1mx7vj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-tnoady.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1o8ir4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1y63ss.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1qqapd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-civil-1s6kq7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1xzpvm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-15u1lp.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1q5y0v.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-penal-1vhja1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/34-exame/segunda-fase/padrao-de-respostas-direito-tributario-a2nczl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1u4p9v.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-4qo4e2.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/35-exame/provas/caderno-de-prova-tipo-1-1rapti.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-prova-tipo-2-meazhj.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-prova-tipo-3-nvwvch.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-prova-tipo-4-1y2v37.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-administrativo-151bph.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-civil-1js7w3.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-constitucional-ayslrl.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-do-trabalho-1gv26a.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-empresarial-l5j3rs.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-penal-s9kvrg.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/provas/caderno-de-provas-direito-tributario-1cx9t0.pdf | prova | Biblioteca |  |
| storage/content/oab/35-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-ff0fqw.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1ckvco.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1tk8ob.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1ve0vq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1g4r94.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-c1suy0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-x76wp1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-administrativo-orypu.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-civil-1jb5hm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-constitucional-4mdxk1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-6bislq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1id32w.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-penal-1e2bom.pdf | gabarito | Biblioteca |  |
| storage/content/oab/35-exame/segunda-fase/padrao-de-respostas-direito-tributario-e0qyau.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1138md.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-ip29f5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/36-exame/provas/caderno-de-prova-tipo-1-16vl03.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-prova-tipo-2-10xnc6.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-prova-tipo-3-ttft6y.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-prova-tipo-4-ldtu5.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-administrativo-bypn8y.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-civil-nlf4em.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-constitucional-zagls9.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-empresarial-13e59d.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-penal-g0rvr8.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-trabalho-3l9xqq.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/provas/caderno-de-provas-direito-tributario-1wnl44.pdf | prova | Biblioteca |  |
| storage/content/oab/36-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1g9z3n.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-bpylr1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-2dpqil.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-xs7894.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-8cj3xx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1x2vvq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-w1hfqc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-administrativo-170xam.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-civil-1blhvd.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-constitucional-mz77ha.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1cjw8c.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-empresarial-t3o7fv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-penal-1cl1v7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/36-exame/segunda-fase/padrao-de-respostas-direito-tributario-m5x8o7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1ftur1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-uivq1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/37-exame/provas/caderno-de-prova-tipo-1-13eodq.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-prova-tipo-2-v4rbxg.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-prova-tipo-3-1ptjgk.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-prova-tipo-4-1mmfzo.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-administrativo-1831hr.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-civil-b96k0w.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-constitucional-kiul4n.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-do-trabalho-1phi1s.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-empresarial-piv8cj.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-penal-g5hmqx.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/provas/caderno-de-provas-direito-tributario-1tfph6.pdf | prova | Biblioteca |  |
| storage/content/oab/37-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1q023h.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1m2haq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-15mjp1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-lpa4ts.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1tompn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-n36pbf.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1g06zy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-administrativo-fvg4da.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-civil-j7hn4q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1v7xa0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-76is7d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-empresarial-a9lvcy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-penal-z2poat.pdf | gabarito | Biblioteca |  |
| storage/content/oab/37-exame/segunda-fase/padrao-de-respostas-direito-tributario-1k3b7h.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-usmjo3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-1mpipe.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/38-exame/provas/caderno-de-prova-tipo-1-1nbviw.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-prova-tipo-2-1mav4h.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-prova-tipo-3-7avmbn.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-prova-tipo-4-1l5upb.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-administrativo-1bumpr.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-civil-5fj6zx.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-constitucional-18w6wa.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-do-trabalho-hk3g3g.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-empresarial-fury8p.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-penal-1mu7gw.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/provas/caderno-de-provas-direito-tributario-1cunam.pdf | prova | Biblioteca |  |
| storage/content/oab/38-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-6os0md.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-1mdt6c.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-wni1v0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1grxnv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-o4wpjx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1qv6tu.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-1ct25d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1jmz6a.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-civil-1l9t55.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1tirm8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-dff67x.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1ezgko.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-penal-16mi7m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/38-exame/segunda-fase/padrao-de-respostas-direito-tributario-1glj22.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1yuivs.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-8lt9zn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/39-exame/provas/caderno-de-prova-tipo-1-1pymkz.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-prova-tipo-2-1vjx7k.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-prova-tipo-3-dyajpx.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-prova-tipo-4-1eaotd.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-administrativo-1djqac.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-civil-1nar5n.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-constitucional-18zaa7.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-do-trabalho-164r3l.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-empresarial-i3q3x5.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-penal-cvz7rh.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/provas/caderno-de-provas-direito-tributario-1nrwxp.pdf | prova | Biblioteca |  |
| storage/content/oab/39-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1kin31.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-196zix.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-eurrpr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1jj5vj.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1f9mt6.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1slc13.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-s78lny.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1ymn94.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-civil-enaxm7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1b9qos.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1trj21.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1jlxb5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-penal-a65p63.pdf | gabarito | Biblioteca |  |
| storage/content/oab/39-exame/segunda-fase/padrao-de-respostas-direito-tributario-1ezul1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/4-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/40-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-666q9e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-11gyjn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/40-exame/provas/caderno-de-prova-tipo-1-v2h0ss.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-prova-tipo-2-1u8tfi.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-prova-tipo-3-1m9zvk.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-prova-tipo-4-1wkrzb.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-administrativo-1375r6.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-civil-1w4h9u.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-constitucional-1dil97.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-do-trabalho-17epf5.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-empresarial-8dlhhq.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-penal-1eev3u.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/provas/caderno-de-provas-direito-tributario-1std0g.pdf | prova | Biblioteca |  |
| storage/content/oab/40-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-15v5yx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-wjs9ii.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-ijy3ji.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-u3z2ve.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-1w1l2z.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-x10hlz.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-bflel3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-administrativo-o75rin.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-civil-r3kcu4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1q0ky5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-55cg8q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-empresarial-l2gki1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-penal-1pwjm8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/40-exame/segunda-fase/padrao-de-respostas-direito-tributario-1l9yzt.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1agscl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-gdwb78.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/41-exame/provas/caderno-de-prova-tipo-1-19epxk.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-prova-tipo-2-9nh7u7.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-prova-tipo-3-9n0sub.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-prova-tipo-4-13yqqo.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-administrativo-402my0.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-civil-1o4o4r.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-constitucional-qkez6x.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-empresarial-172s0s.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-penal-ksdt00.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/provas/caderno-de-provas-direito-tributario-hm4xng.pdf | prova | Biblioteca |  |
| storage/content/oab/41-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-l1xcxe.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-bkaycv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-12mo92.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-ilzpu5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-g2141e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1cbhi4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-y5qefn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1hh955.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-civil-wmo0t0.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-constitucional-namoyi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-14fi6t.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1lkitr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-penal-pu975q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/41-exame/segunda-fase/padrao-de-respostas-direito-tributario-t89j9e.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-oz8qn8.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-d8co1o.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/42-exame/provas/caderno-de-prova-tipo-1-1l67c6.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-prova-tipo-2-mfr81p.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-prova-tipo-3-1muvj0.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-prova-tipo-4-1ib9o8.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-administrativo-157co2.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-civil-3gfgry.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-constitucional-d1ziy9.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-do-trabalho-1twwac.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-empresarial-3gflxd.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-penal-1uveat.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/provas/caderno-de-provas-direito-tributario-r6a39c.pdf | prova | Biblioteca |  |
| storage/content/oab/42-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-nvknln.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-g0h8jn.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-guyi88.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1ep7p1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-ffsmml.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-1sfe26.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-tnt70s.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-administrativo-e7wesy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-civil-mqtldi.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1kyyqf.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-22t5qv.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-empresarial-sso20q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-penal-ht5tl9.pdf | gabarito | Biblioteca |  |
| storage/content/oab/42-exame/segunda-fase/padrao-de-respostas-direito-tributario-pcbk9m.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-99gv56.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-atualizado-em-30-04-2025-dojv0d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/43-exame/provas/caderno-de-prova-tipo-1-wjxb32.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-prova-tipo-2-42gb3k.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-prova-tipo-3-g7aski.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-prova-tipo-4-78iugs.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-administrativo-gmo2xi.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-civil-18xvwr.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-constitucional-1bglgz.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-do-trabalho-148sas.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-empresarial-9o7pp5.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-penal-1791h6.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/provas/caderno-de-provas-direito-tributario-vm5lsm.pdf | prova | Biblioteca |  |
| storage/content/oab/43-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1m8fl5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-oqo8t4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-1trdev.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-mqx185.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-jl4zbk.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-59wktl.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-f2u4h1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1uf3m1.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-civil-8u6c8o.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1r4417.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-17q617.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-empresarial-th882b.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-penal-1i5u63.pdf | gabarito | Biblioteca |  |
| storage/content/oab/43-exame/segunda-fase/padrao-de-respostas-direito-tributario-vhf9uo.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1ehcwq.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-lt9f0s.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/44-exame/provas/caderno-de-prova-tipo-1-bmn0xq.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-prova-tipo-2-rwnkr7.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-prova-tipo-3-1asweo.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-prova-tipo-4-1kws1b.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-administrativo-7xzvov.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-civil-11y2o9.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-constitucional-bmq3a.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-do-trabalho-9htmgy.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-empresarial-1wr9ta.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-penal-1xaiqz.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/provas/caderno-de-provas-direito-tributario-195his.pdf | prova | Biblioteca |  |
| storage/content/oab/44-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-45vjr7.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-5hwkmr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-jchk01.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-1i5z9n.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-p9yyrx.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-11nkgy.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-vwnfrm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-administrativo-1p0r4s.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-civil-zr99gr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1l5mjr.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1afbgb.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-empresarial-1oqrui.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-penal-18sno5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/44-exame/segunda-fase/padrao-de-respostas-direito-tributario-wv6ohs.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-iamkq5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-atualizado-em-22.12.2025-ghhg7q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/45-exame/provas/caderno-de-prova-tipo-1-1e6sag.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-prova-tipo-2-17lo3v.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-prova-tipo-3-1kg5po.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-prova-tipo-4-hp2j7m.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-administrativo-18f4gb.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-civil-6ysmi2.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-constitucional-jo56bf.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-do-trabalho-1gjqe9.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-empresarial-1nc4hy.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-penal-175dyx.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/provas/caderno-de-provas-direito-tributario-11v67s.pdf | prova | Biblioteca |  |
| storage/content/oab/45-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-administrativo-1wvicg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-civil-11m6xm.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-constitucional-ojauov.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-do-trabalho-15r5ep.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-empresarial-183iy4.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-penal-dzwh97.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-definitivo-direito-tributario-wc13ec.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-administrativo-adzc5q.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-civil-1nyb1d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-constitucional-1c1sri.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-do-trabalho-1bf4tc.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-empresarial-125cgg.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-penal-1aj1y5.pdf | gabarito | Biblioteca |  |
| storage/content/oab/45-exame/segunda-fase/padrao-de-respostas-direito-tributario-cc97se.pdf | gabarito | Biblioteca |  |
| storage/content/oab/46-exame/gabaritos/gabaritos-definitivos-da-prova-objetiva-1-fase-1kizjh.pdf | gabarito | Biblioteca |  |
| storage/content/oab/46-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-atualizado-em-04.05.2026-1wy91d.pdf | gabarito | Biblioteca |  |
| storage/content/oab/46-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/46-exame/provas/caderno-de-prova-tipo-1-1dfntz.pdf | prova | Biblioteca |  |
| storage/content/oab/46-exame/provas/caderno-de-prova-tipo-2-1liuy6.pdf | prova | Biblioteca |  |
| storage/content/oab/46-exame/provas/caderno-de-prova-tipo-3-18v5bp.pdf | prova | Biblioteca |  |
| storage/content/oab/46-exame/provas/caderno-de-prova-tipo-4-8l7j5p.pdf | prova | Biblioteca |  |
| storage/content/oab/46-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/47-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/5-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/6-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/7-exame/gabaritos/gabaritos-preliminares-da-prova-objetiva-1-fase-9rqav3.pdf | gabarito | Biblioteca |  |
| storage/content/oab/7-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/7-exame/provas/caderno-de-prova-01-5noo95.pdf | prova | Biblioteca |  |
| storage/content/oab/7-exame/provas/caderno-de-prova-02-1j1xvk.pdf | prova | Biblioteca |  |
| storage/content/oab/7-exame/provas/caderno-de-prova-03-1j4qj9.pdf | prova | Biblioteca |  |
| storage/content/oab/7-exame/provas/caderno-de-prova-04-9qlh4z.pdf | prova | Biblioteca |  |
| storage/content/oab/7-exame/questoes/questoes-extraidas.json | banco de questões | Questões |  |
| storage/content/oab/8-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| storage/content/oab/9-exame/metadata.json | conteúdo não identificado | não identificada | src/components/ui/iphone.jsx; src/pages/Onboarding.jsx |
| material-provas/fgv/provas PM/aluno_oficial_da_pmns101_tipo_1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/aluno_soldado_da_pmnm001_tipo_1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/cabo-pmcnm001-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/cns101-aluno-oficial-combatentecns101-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/curso-de-formacao-de-oficiais-combatentes-da-pmpbcfopb-22-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/delegado-objetivacns100-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/inspetor_de_policia_de_6a_classeinspetor_tipo_1_revisada.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/investigador_policial_de_3a_classeinvest_tipo_1_revisada.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/ns001_-_delegado_de_policia_-_4a_classe_prova_objetivans001_tipo_1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/pcam2021e01_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pcrj2021e1_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pcrj2021e2_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pcrn-delegado-de-policia-civil-substituto-deleg-01-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/pcrn_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pcscdelegado2024_gabarito_definitivo_20240220.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pm-sargentocnm001-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/pmac2023-gabaritos-definitivo-final-para-publicacao-1.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmam2021_gabarito_definitivo_retificado_26.04.2022.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmce2021_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmce2021_soldado_da_pm-ce_pmce01_tipo_1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/pmerj2021-curso-de-formacao-de-oficiais-da-pmerj-pmcfo01-tipo-1.pdf | prova | Biblioteca |  |
| material-provas/fgv/provas PM/pmerj2021_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmesp-sargento-2024-gabaritos-para-publicacao.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmespcabo2022_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| material-provas/fgv/provas PM/pmpb2021_gabarito_definitivo.pdf | gabarito | Biblioteca |  |
| scripts/content-miner/fgv-local.ts | arquivo de desenvolvimento | não identificada |  |
| scripts/content-miner/leis.ts | arquivo de desenvolvimento | não identificada |  |
| scripts/content-miner/manifesto-militar.json | conteúdo não identificado | não identificada |  |
| scripts/content-miner/militar.ts | arquivo de desenvolvimento | não identificada | src/components/landing/Testimonials.jsx; src/components/landing/TrustSection.jsx |
| scripts/content-miner/pci-militar.config.json | conteúdo não identificado | não identificada |  |
| scripts/content-miner/pci-militar.ts | arquivo de desenvolvimento | não identificada |  |
| components/animata/container/announcement-ribbon.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/AnnouncementRibbon.jsx |
| components/animata/container/marquee.jsx | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; components/animata/container/announcement-ribbon.jsx |
| supabase/config.toml | arquivo de desenvolvimento | não identificada |  |
| supabase/functions/admin-cancelar-acesso/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-criar-usuario/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-deletar-usuario/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-listar-usuarios/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-me/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-set-manutencao/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-set-plano/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/admin-set-vitalicio/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/cancelar-assinatura/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/conteudo-url/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/criar-assinatura-cartao/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/criar-pagamento-debito/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/criar-pagamento-pix/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/ia-aprova/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/verificar-acesso/index.ts | conteúdo não identificado | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/webhook-mercadopago/index.ts | arquivo de desenvolvimento | não identificada | src/components/animata/container/Marquee.jsx; src/components/AprovaLoading.jsx; src/components/FAQ.jsx; src/components/HowItWorks.jsx; src/components/landing/Carousel3DSection.jsx |
| supabase/functions/_shared/admin.ts | conteúdo não identificado | não identificada | src/components/landing/Hero.jsx; src/components/StudyCards.jsx |
| supabase/functions/_shared/cors.ts | conteúdo não identificado | não identificada |  |
| supabase/functions/_shared/mercadopago.ts | conteúdo não identificado | não identificada |  |
| supabase/functions/_shared/supabase.ts | conteúdo não identificado | não identificada | src/components/auth/ForgotPasswordForm.jsx; src/components/payment/PaymentCheckout.jsx; src/pages/AuthCallback.jsx; src/pages/CadernoErros/index.jsx; src/pages/Checkout/PixPanel.jsx; src/pages/Dashboard/index.jsx |
| supabase/mercado_pago.sql | arquivo de desenvolvimento | não identificada |  |
| supabase/migrate_to_cloud.sql | arquivo de desenvolvimento | não identificada |  |
| supabase/plano_atividades.sql | arquivo de desenvolvimento | não identificada |  |
| supabase/revisao_questoes.sql | banco de questões | Questões |  |
| supabase/schema.sql | arquivo de desenvolvimento | não identificada |  |
| prisma/schema.prisma | arquivo de desenvolvimento | não identificada |  |

## Conteúdos com possível risco de mistura de objetivos

| Caminho | Objetivo | Evidência | Ação |
| --- | --- | --- | --- |
| src/admin/AdminLayout.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/admin/index.js, src/App.jsx, src/pages/InternalApp.jsx | verificar filtro por objetivo na tela/serviço |
| src/admin/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/ai/AIChat.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/index.js, src/pages/IA/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/ai/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/ai/tutorPrompt.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/services/aiService.js | verificar filtro por objetivo na tela/serviço |
| src/App.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/main.jsx | verificar filtro por objetivo na tela/serviço |
| src/assets/hero.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/components/Hero.jsx | verificar filtro por objetivo na tela/serviço |
| src/assets/react.svg | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/ai/AIChat.jsx, src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/assets/vite.svg | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/ai/tutorPrompt.js, src/App.css | verificar filtro por objetivo na tela/serviço |
| src/charts/AppCharts.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/charts/index.js | verificar filtro por objetivo na tela/serviço |
| src/charts/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/animata/container/AnnouncementRibbon.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por components/animata/container/announcement-ribbon.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/animata/container/Marquee.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/animata/container/AnnouncementRibbon.jsx, src/index.css, components/animata/container/announcement-ribbon.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/animata/text/Counter.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Stats.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/AppUI.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/HtmlFrameViewer.jsx, src/components/index.js, src/components/PdfFrameViewer.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/AprovaLoading.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/index.js | verificar filtro por objetivo na tela/serviço |
| src/components/auth/AuthLayout.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/AuthLayout.jsx, src/pages/ForgotPassword.jsx, src/pages/Login.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/auth/ForgotPasswordForm.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/ForgotPassword.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/auth/LoginForm.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Login.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/auth/RegisterForm.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Register.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/AuthLayout.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/auth/AuthLayout.jsx, src/pages/ForgotPassword.jsx, src/pages/Login.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/BrandLogo.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/AprovaLoading.jsx, src/components/auth/AuthLayout.jsx, src/components/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/DashboardPreview.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/landing/DashboardPreview.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/Features.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/FeaturesGrid.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/Footer.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Footer.jsx, src/components/SplashScreen/SplashScreen.css, src/components/ui/card.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/Hero.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/landing/Hero.jsx, src/components/landing/HeroVideoSection.jsx, src/index.css | verificar filtro por objetivo na tela/serviço |
| src/components/HowItWorks.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/HowItWorks.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/HtmlFrameViewer.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/index.js, src/pages/MapasMentais/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/Iridescence.css | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/Iridescence.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/kibo-ui/avatar-stack/index.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/AiPreview.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/DashboardPreview.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/DashboardPreview.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/FlashcardsFlipStack.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/Footer.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/Footer.jsx, src/components/SplashScreen/SplashScreen.css, src/components/ui/card.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/Hero.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/Hero.jsx, src/components/landing/HeroVideoSection.jsx, src/index.css | verificar filtro por objetivo na tela/serviço |
| src/components/landing/HeroVideoSection.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/HowItWorks.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/HowItWorks.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/Pricing.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/Pricing.jsx, src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/landing/Stats.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Hero.jsx, src/contexts/UserContext.jsx, src/hooks/useQuestoes.js | verificar filtro por objetivo na tela/serviço |
| src/components/Navbar.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/auth/AuthLayout.jsx, src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/payment/PaymentCheckout.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/PdfFrameViewer.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/index.js, src/pages/MapasMentais/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/Pricing.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/landing/Pricing.jsx, src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/SlideArrowButton.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Pricing.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/SplashGate/SplashGate.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/SplashScreen/SplashScreen.css | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/SplashGate/SplashGate.jsx, src/components/SplashScreen/SplashScreen.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/SplashScreen/SplashScreen.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/SplashGate/SplashGate.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/taf/ExercicioCard.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/TAF/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/TourButton.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/index.js, src/layouts/AppShell.jsx, src/pages/Ajuda/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/alert.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/payment/PaymentCheckout.jsx, src/data/apostilas/comentarios-questoes-ia.js, src/data/apostilas/criminologia-seguranca-publica-avancada.js | verificar filtro por objetivo na tela/serviço |
| src/components/ui/animated-list.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/registry/magicui/animated-list.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/button.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/components/AppUI.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/card.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/components/animata/container/AnnouncementRibbon.jsx, src/components/AppUI.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/checkbox.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/components/auth/LoginForm.jsx, src/components/auth/RegisterForm.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/dialog.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/HeroVideoSection.jsx, src/components/payment/PaymentCheckout.jsx, src/data/apostilas/direito-constitucional-avancado.js | verificar filtro por objetivo na tela/serviço |
| src/components/ui/input.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/ai/AIChat.jsx, src/components/AppUI.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/iphone.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Hero.jsx, src/landing-light.css, src/registry/magicui/iphone.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/label.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/ai/AIChat.jsx, src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/separator.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/auth/ForgotPasswordForm.jsx, src/components/auth/LoginForm.jsx, src/components/auth/RegisterForm.jsx | verificar filtro por objetivo na tela/serviço |
| src/components/ui/tabs.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/payment/PaymentCheckout.jsx, src/components/ui/AnimatedTabs.jsx, src/index.css | verificar filtro por objetivo na tela/serviço |
| src/config/features.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/Features.jsx, src/components/landing/FeaturesGrid.jsx, src/index.css | verificar filtro por objetivo na tela/serviço |
| src/contexts/AppProviders.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx, src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/contexts/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/contexts/NotificationContext.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/AppProviders.jsx, src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/contexts/PreferencesContext.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/AppProviders.jsx, src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/contexts/RouterContext.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/contexts/ThemeContext.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/AppProviders.jsx, src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/contexts/UserContext.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/contexts/AppProviders.jsx, src/contexts/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/atualidades.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/components/DashboardPreview.jsx, src/components/landing/DashboardPreview.jsx, src/data/apostilas/atualidades-avancada.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/caderno-erros-inteligente.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/comentarios-questoes-ia.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/direito-ambiental.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-ambiental-avancado.js, src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/direito-previdenciario.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-previdenciario-avancado.js, src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/direito-trabalho.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-trabalho-avancado.js, src/data/apostilas/index.js, storage/content/oab/36-exame/metadata.json | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/direitos-humanos.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/banco-repertorios-redacao.js, src/data/apostilas/criminologia-seguranca-publica-avancada.js, src/data/apostilas/direito-internacional-avancado.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/etica.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/atendimento-publico-qualidade-servico-publico.js, src/data/apostilas/biologia-enem.js, src/data/apostilas/ciencias-natureza-simulados.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/filosofia-direito.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/filosofia-enem.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/flashcards-premium-disciplina.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/governanca-integridade-compliance-publico.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/informatica.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/flashcards-premium-disciplina.js, src/data/apostilas/index.js, src/data/apostilas/informatica-avancada.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/legislacao-penal-especial.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js, scripts/exportar-questoes-chunks.js, scripts/exportar-questoes-local.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/licitacoes-contratos-modulo-exclusivo.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/mapas-mentais-textuais-disciplina.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/matematica-basica.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/matematica-enem.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/plano-estudo-por-objetivo.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/raciocinio-logico.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js, src/data/apostilas/mapas-mentais-textuais-disciplina.js, src/data/apostilas/matematica-raciocinio-logico-avancado.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/README.md | não identificado | sem metadados suficientes; palavras-chave no conteúdo | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/redacao-enem.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/redacao.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/atualidades-avancada.js, src/data/apostilas/banco-repertorios-redacao.js, src/data/apostilas/banco-temas-redacao-policial.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/revisao-24h-prova.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/revisao-7-dias-prova.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/simulados-por-banca.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/simulados-por-concurso.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/simulados-por-nivel.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/data/apostilas/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/apostilas/taf.js | não identificado | sem metadados suficientes; metadados/título/nome | verificar filtro por objetivo na tela/serviço |
| src/data/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/data/mockBiblioteca.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js, src/services/bibliotecaService.js, src/stores/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockFlashcards.js | aplicável a múltiplos objetivos | mock local; metadados/título/nome; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockLeis.js | aplicável a múltiplos objetivos | mock local; metadados/título/nome; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockMapas.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js, src/stores/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockNotificacoes.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockPlano.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js, src/data/mockTAF.js, src/stores/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockQuestoes.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockRanking.js | aplicável a múltiplos objetivos | mock local; metadados/título/nome; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockRedacoes.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js, src/services/redacaoService.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockSimulados.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/mockTAF.js | aplicável a múltiplos objetivos | mock local; palavras-chave no conteúdo; referenciado por src/data/index.js | verificar filtro por objetivo na tela/serviço |
| src/data/taf_exercicios.json | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/services/tafService.js | verificar filtro por objetivo na tela/serviço |
| src/forms/AppForms.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/forms/index.js | verificar filtro por objetivo na tela/serviço |
| src/forms/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/hooks/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/hooks/useAI.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/hooks/index.js | verificar filtro por objetivo na tela/serviço |
| src/hooks/useAsyncData.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/hooks/index.js, src/pages/Biblioteca/index.jsx, src/pages/CadernoErros/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/hooks/useDebounce.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/AppUI.jsx, src/hooks/index.js | verificar filtro por objetivo na tela/serviço |
| src/hooks/useLocalStorage.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/PreferencesContext.jsx, src/hooks/index.js, src/pages/Biblioteca/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/hooks/useMediaQuery.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/PdfFrameViewer.jsx, src/hooks/index.js | verificar filtro por objetivo na tela/serviço |
| src/hooks/useOnboarding.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/hooks/index.js, src/pages/InternalApp.jsx | verificar filtro por objetivo na tela/serviço |
| src/hooks/useQuestoes.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/contexts/UserContext.jsx, src/hooks/index.js, src/lib/initApp.js | verificar filtro por objetivo na tela/serviço |
| src/hooks/useTimer.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/hooks/index.js, src/pages/Simulados/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/index.css | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/landing-light.css | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/main.jsx | verificar filtro por objetivo na tela/serviço |
| src/layouts/AppShell.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx, src/layouts/index.js, src/pages/InternalApp.jsx | verificar filtro por objetivo na tela/serviço |
| src/layouts/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/layouts/navigation.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/Navbar.jsx, src/layouts/AppShell.jsx, src/layouts/index.js | verificar filtro por objetivo na tela/serviço |
| src/lib/utils.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/animata/container/AnnouncementRibbon.jsx, src/components/animata/container/Marquee.jsx, src/components/kibo-ui/avatar-stack/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/lib/zodConfig.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/main.jsx | verificar filtro por objetivo na tela/serviço |
| src/main.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/App.jsx, src/components/animata/container/Marquee.jsx | verificar filtro por objetivo na tela/serviço |
| src/modals/AppModal.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/modals/index.js | verificar filtro por objetivo na tela/serviço |
| src/modals/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Ajuda/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/AuthCallback.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Biblioteca/ApostilaChapterReader.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/README.md, src/pages/Biblioteca/MaterialCard.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Biblioteca/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Biblioteca/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Biblioteca/MaterialCard.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Biblioteca/index.js, src/pages/Biblioteca/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/CadernoErros/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/CadernoErros/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Checkout/CardBrick.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/pages/Checkout/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Checkout/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Checkout/PixPanel.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/pages/Checkout/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Dashboard/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Dashboard/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Flashcards/DeckCard.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/Flashcards/index.js | verificar filtro por objetivo na tela/serviço |
| src/pages/Flashcards/index.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Flashcards/index.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/ForgotPassword.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/App.jsx, src/components/auth/ForgotPasswordForm.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Home.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/layouts/AppShell.jsx, src/pages/UnifiedApp.jsx, storage/content/militar/pm-pb-soldado-pm-combatente-2023-ibfc/questoes/questoes-extraidas.json | verificar filtro por objetivo na tela/serviço |
| src/pages/IA/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/IA/index.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/InternalApp.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/UnifiedApp.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/LeisSecas/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/LeisSecas/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Login.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx, src/components/auth/LoginForm.jsx, src/components/auth/RegisterForm.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/MapasMentais/index.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Militar/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Onboarding.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/TourButton.jsx, src/data/apostilas/plano-estudo-por-objetivo.js, src/hooks/index.js | verificar filtro por objetivo na tela/serviço |
| src/pages/Perfil/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Perfil/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Plano/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Plano/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Questoes/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Questoes/index.jsx | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Questoes/QuestionCard.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/pages/Biblioteca/ApostilaChapterReader.jsx, src/pages/Questoes/index.js, src/pages/Questoes/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Redacao/index.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Redacao/index.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Register.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx, src/components/auth/RegisterForm.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/ResetPassword.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Revisao/index.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Revisao/index.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Simulados/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/Simulados/index.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/TAF/index.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/TAF/index.jsx | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/pages/UnifiedApp.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/App.jsx | verificar filtro por objetivo na tela/serviço |
| src/registry/magicui/hero-video-dialog.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/HeroVideoSection.jsx, src/landing-light.css | verificar filtro por objetivo na tela/serviço |
| src/registry/magicui/iphone.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Hero.jsx, src/landing-light.css, public/sw.js | verificar filtro por objetivo na tela/serviço |
| src/registry/magicui/safari.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Hero.jsx, src/landing-light.css | verificar filtro por objetivo na tela/serviço |
| src/services/adminService.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/admin/AdminLayout.jsx, src/pages/InternalApp.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/aiService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/hooks/useAI.js, src/pages/Biblioteca/ApostilaChapterReader.jsx | verificar filtro por objetivo na tela/serviço |
| src/services/bibliotecaService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Biblioteca/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/contentAccessService.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/services/bibliotecaService.js, src/services/flashcardsService.js, src/services/miscService.js | verificar filtro por objetivo na tela/serviço |
| src/services/flashcardsService.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/CadernoErros/index.jsx, src/pages/Flashcards/index.jsx, src/pages/MapasMentais/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/services/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/services/leisService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/LeisSecas/index.jsx, src/services/index.js, src/services/miscService.js | verificar filtro por objetivo na tela/serviço |
| src/services/militarService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Militar/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/miscService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/oabService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/OAB/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/planoService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/pages/Plano/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/questoesService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/hooks/useQuestoes.js, src/pages/CadernoErros/index.jsx, src/pages/Dashboard/index.jsx | verificar filtro por objetivo na tela/serviço |
| src/services/redacaoService.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/Redacao/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/revisaoService.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/pages/Revisao/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/simuladosService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Simulados/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/services/tafService.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/TAF/index.jsx, src/services/index.js | verificar filtro por objetivo na tela/serviço |
| src/stores/index.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/tables/DataTable.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/tables/index.js | verificar filtro por objetivo na tela/serviço |
| src/tables/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/tours/ajudaTour.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/appTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/aprovinhoTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/dashboardTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/flashcardsTour.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/leisTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/mapasTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/onboardingManager.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/components/TourButton.jsx, src/hooks/useOnboarding.js | verificar filtro por objetivo na tela/serviço |
| src/tours/perfilTour.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/questoesTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/redacaoTour.js | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/simuladosTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/studiesTour.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/tours/onboardingManager.js | verificar filtro por objetivo na tela/serviço |
| src/tours/tourUtils.js | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por src/pages/Ajuda/index.jsx, src/tours/ajudaTour.js, src/tours/appTour.js | verificar filtro por objetivo na tela/serviço |
| src/utils/calculators.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/utils/index.js | verificar filtro por objetivo na tela/serviço |
| src/utils/formatters.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/utils/index.js | verificar filtro por objetivo na tela/serviço |
| src/utils/index.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| src/utils/textEncoding.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/utils/index.js, scripts/content-miner/cebraspe-local.ts, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| public/aprova-demo.mp4 | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/HeroVideoSection.jsx | verificar filtro por objetivo na tela/serviço |
| public/brand/vemaprovar-logo-color.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/brand/vemaprovar-logo-white.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/brand/vemaprovar-monograma-white.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/BrandLogo.jsx, public/aprova-logo-dark.svg, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/brand/vemaprovar-monograma.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/BrandLogo.jsx, public/aprova-logo-dark.svg, public/aprova-logo-light.svg | verificar filtro por objetivo na tela/serviço |
| public/branding/icon-192.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/manifest.mobile.webmanifest, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/branding/icon-512-maskable.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/manifest.mobile.webmanifest, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/branding/icon-512.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/manifest.mobile.webmanifest, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/branding/vemaprovar-logo-completa.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/SplashScreen/SplashScreen.jsx, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/branding/vemaprovar-logo-sem-slogan.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/branding/vemaprovar-simbolo-va.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/favicon.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/favicon.svg | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/icons.svg | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/animata/container/AnnouncementRibbon.jsx, public/manifest.mobile.webmanifest, public/manifest.webmanifest | verificar filtro por objetivo na tela/serviço |
| public/logos/concursos/oab.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/pages/Home.jsx | verificar filtro por objetivo na tela/serviço |
| public/manifest.mobile.webmanifest | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/manifest.webmanifest | não identificado | sem metadados suficientes; sem evidência; referenciado por src/data/apostilas/atendimento-publico-qualidade-servico-publico.js, src/data/apostilas/direito-administrativo-avancado.js, src/data/apostilas/direito-administrativo.js | verificar filtro por objetivo na tela/serviço |
| public/pwa/apple-touch-icon.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/pwa/pwa-192.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/manifest.webmanifest, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/pwa/pwa-512.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/ai/AIChat.jsx, public/manifest.webmanifest, public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/screenshots/iphone-landing-reference.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/Hero.jsx | verificar filtro por objetivo na tela/serviço |
| public/screenshots/mobile-site.svg | não identificado | sem metadados suficientes; palavras-chave no conteúdo; referenciado por public/manifest.mobile.webmanifest, public/manifest.webmanifest | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-13-pro-max-1284x2778.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-14-13-1170x2532.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-15-pro-1179x2556.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-15-pro-max-1290x2796.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-x-1125x2436.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-xr-828x1792.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/splash/apple/iphone-xs-max-1242x2688.png | não identificado | sem metadados suficientes; sem evidência; referenciado por public/sw.js | verificar filtro por objetivo na tela/serviço |
| public/sw.js | não identificado | sem metadados suficientes; sem evidência; referenciado por src/main.jsx | verificar filtro por objetivo na tela/serviço |
| public/thumbnail-demo.png | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/landing/HeroVideoSection.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/cebraspe-local/cebraspe-local-preview.json | não identificado | sem metadados suficientes; sem evidência; referenciado por scripts/content-miner/cebraspe-local.ts | verificar filtro por objetivo na tela/serviço |
| storage/content/cebraspe-local/cebraspe-local-report.json | não identificado | sem metadados suficientes; sem evidência; referenciado por scripts/content-miner/cebraspe-local.ts | verificar filtro por objetivo na tela/serviço |
| storage/content/fgv-local/fgv-local-preview.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por scripts/content-miner/cebraspe-local.ts, scripts/content-miner/fgv-local.ts, scripts/content-miner/promote-fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| storage/content/fgv-local/fgv-local-report.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por scripts/content-miner/fgv-local.ts, scripts/content-miner/promote-fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cdc/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cdc/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cdc/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cf88/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cf88/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cf88/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/clt/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/clt/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/clt/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-civil/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-civil/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-civil/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-penal/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-penal/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/codigo-penal/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpc/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpc/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpc/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpp/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpp/meta.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/charts/AppCharts.jsx, src/components/auth/AuthLayout.jsx | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/cpp/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/ctn/artigos.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/data/apostilas/direito-constitucional.js, src/data/apostilas/direito-processual-civil.js, src/data/apostilas/filosofia-direito.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/ctn/texto.txt | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/tutorPrompt.js, src/components/HtmlFrameViewer.jsx, src/data/apostilas/arquivologia.js | verificar filtro por objetivo na tela/serviço |
| storage/content/leis/index.json | não identificado | sem metadados suficientes; metadados/título/nome; referenciado por src/ai/AIChat.jsx, src/App.css, src/charts/AppCharts.jsx | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/aluno_soldado_da_pmnm001_tipo_1.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmam-soldado-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/cns101-aluno-oficial-combatentecns101-tipo-1.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmac-oficial-combatente-2023-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/curso-de-formacao-de-oficiais-combatentes-da-pmpbcfopb-22-tipo-1.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmpb-cfo-2022-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pcam2021e01_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pcam-delegado-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pcrj2021e1_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pcrj-inspetor-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pcrj2021e2_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pcrj-investigador-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmac2023-gabaritos-definitivo-final-para-publicacao-1.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmac-oficial-combatente-2023-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmam2021_gabarito_definitivo_retificado_26.04.2022.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmam-oficial-2021-fgv/metadata.json, storage/content/militar/pmam-soldado-2021-fgv/metadata.json | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmce2021_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmce-soldado-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmerj2021_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmerj-cfo-2021-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmespcabo2022_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmesp-cabo-2022-fgv-local/metadata.json, storage/content/militar/pmsp-cabo-pm-2022-fgv/metadata.json | verificar filtro por objetivo na tela/serviço |
| material-provas/fgv/provas PM/pmpb2021_gabarito_definitivo.pdf | não identificado | sem metadados suficientes; PDF de prova/gabarito; referenciado por storage/content/fgv-local/fgv-local-report.json, storage/content/militar/pmpb-cfo-2022-fgv/metadata.json, scripts/content-miner/fgv-local.ts | verificar filtro por objetivo na tela/serviço |
| components/animata/container/announcement-ribbon.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/animata/container/AnnouncementRibbon.jsx, src/index.css, src/landing-light.css | verificar filtro por objetivo na tela/serviço |
| components/animata/container/marquee.jsx | não identificado | sem metadados suficientes; sem evidência; referenciado por src/components/animata/container/Marquee.jsx, src/index.css, components/animata/container/announcement-ribbon.jsx | verificar filtro por objetivo na tela/serviço |

## Filtros por objetivo

- Arquivos com menção a objetivo/concurso do usuário: src/ai/tutorPrompt.js; src/contexts/UserContext.jsx; src/data/mockUsers.js; src/forms/AppForms.jsx; src/layouts/AppShell.jsx; src/pages/Dashboard/index.jsx; src/pages/InternalApp.jsx; src/pages/LeisSecas/index.jsx; src/pages/Onboarding.jsx; src/pages/Perfil/index.jsx; src/pages/Plano/index.jsx; src/services/aiService.js; src/services/planoService.js; src/services/questoesService.js; src/stores/index.js; supabase/fix_auth_production.sql; supabase/fix_onboarding_sync.sql; supabase/fix_profiles_rls.sql; supabase/schema.sql
- Tabela objectives/objetivos encontrada: não
- Consultas sem filtro objetivo/concurso detectadas: src/services/bibliotecaService.js

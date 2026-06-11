import { AlertTriangle, BookOpen, CalendarDays, ClipboardList, Dumbbell, GitBranch, GraduationCap, LayoutDashboard, Layers, Library, LifeBuoy, PenLine, RefreshCw, Scale, Shield, User } from "lucide-react";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, tourId: "tour-dashboard" },
  { key: "oab", label: "OAB", icon: Scale, requiresObjective: "oab" },
  { key: "questoes", label: "Banco de questões", icon: BookOpen, tourId: "tour-questoes" },
  { key: "simulados", label: "Simulados", icon: ClipboardList, tourId: "tour-simulados" },
  { key: "taf", label: "TAF", icon: Dumbbell, badge: "Novo", tourId: "tour-taf" },
  { key: "plano", label: "Plano de estudos", icon: CalendarDays, tourId: "tour-estudos" },
  { key: "revisao", label: "Central de revisão", icon: RefreshCw },
  { key: "flashcards", label: "Flashcards", icon: Layers, tourId: "tour-flashcards" },
  { key: "mapas", label: "Mapas mentais", icon: GitBranch, tourId: "tour-mapas" },
  { key: "redacao", label: "Redação", icon: PenLine, tourId: "tour-redacao" },
  { key: "erros", label: "Caderno de erros", icon: AlertTriangle },
  { key: "biblioteca", label: "Biblioteca", icon: Library },
  { key: "leis", label: "Leis secas", icon: Scale, tourId: "tour-leis" },
  { key: "ia", label: "Assistente", icon: GraduationCap, tourId: "tour-aprovinho" },
  { key: "perfil", label: "Perfil", icon: User, tourId: "tour-perfil" },
  { key: "ajuda", label: "Ajuda", icon: LifeBuoy, tourId: "tour-ajuda" },
  { key: "admin", label: "Admin", icon: Shield },
];

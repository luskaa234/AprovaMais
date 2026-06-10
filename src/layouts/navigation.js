import { AlertTriangle, BookOpen, CalendarDays, ClipboardList, Dumbbell, GitBranch, GraduationCap, LayoutDashboard, Layers, Library, PenLine, RefreshCw, Scale, Shield, User } from "lucide-react";

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "oab", label: "OAB", icon: Scale, requiresObjective: "oab" },
  { key: "questoes", label: "Banco de questões", icon: BookOpen },
  { key: "simulados", label: "Simulados", icon: ClipboardList },
  { key: "taf", label: "TAF", icon: Dumbbell, badge: "Novo" },
  { key: "plano", label: "Plano de estudos", icon: CalendarDays },
  { key: "revisao", label: "Central de revisão", icon: RefreshCw },
  { key: "flashcards", label: "Flashcards", icon: Layers },
  { key: "mapas", label: "Mapas mentais", icon: GitBranch },
  { key: "redacao", label: "Redação", icon: PenLine },
  { key: "erros", label: "Caderno de erros", icon: AlertTriangle },
  { key: "biblioteca", label: "Biblioteca", icon: Library },
  { key: "leis", label: "Leis secas", icon: Scale },
  { key: "ia", label: "Assistente", icon: GraduationCap },
  { key: "perfil", label: "Perfil", icon: User },
  { key: "admin", label: "Admin", icon: Shield },
];

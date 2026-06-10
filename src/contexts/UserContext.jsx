/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useUserStore } from "../stores";

const UserContext = createContext(null);

const profileFieldMap = {
  targetContest: "concurso_alvo",
  dataProva: "data_prova",
  horasSemanais: "horas_semanais",
  diasDisponiveis: "dias_disponiveis",
  onboardingComplete: "onboarding_completo",
};

function toProfileUpdates(updates) {
  const allowed = new Set([
    "name",
    "email",
    "concurso_alvo",
    "data_prova",
    "nivel",
    "horas_semanais",
    "dias_disponiveis",
    "onboarding_completo",
  ]);

  return Object.entries(updates).reduce((mapped, [key, value]) => {
    const dbKey = profileFieldMap[key] || key;
    if (allowed.has(dbKey)) mapped[dbKey] = value;
    return mapped;
  }, {});
}

function readLocalSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("aprovamais-session") || "null");
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const localUser = useUserStore((state) => state.user);
  const localStats = useUserStore((state) => state.stats);
  const updateUser = useUserStore((state) => state.updateUser);
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [localSession, setLocalSession] = useState(() => readLocalSession());
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  const fetchProfile = useCallback(async (user) => {
    if (!isSupabaseConfigured || !user) return null;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    return data;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let alive = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!alive) return;
      setAuthUser(session?.user || null);
      setProfile(session?.user ? await fetchProfile(session.user) : null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthUser(session?.user || null);
      setProfile(session?.user ? await fetchProfile(session.user) : null);
      setIsLoading(false);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const login = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      const session = { email, loggedAt: new Date().toISOString() };
      window.localStorage.setItem("aprovamais-session", JSON.stringify(session));
      setLocalSession(session);
      updateUser({ email, loggedOut: false });
      return localUser;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return true;
  }, [localUser, updateUser]);

  const register = useCallback(async (name, email, password) => {
    const session = { email, name, registrationPending: true, loggedAt: new Date().toISOString() };
    if (!isSupabaseConfigured) {
      window.localStorage.setItem("aprovamais-session", JSON.stringify(session));
      setLocalSession(session);
      updateUser({ name, email, onboardingComplete: false });
      return true;
    }
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
    window.localStorage.setItem("aprovamais-session", JSON.stringify(session));
    setLocalSession(session);
    updateUser({ name, email, onboardingComplete: false, loggedOut: false });
    return true;
  }, [updateUser]);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    window.localStorage.removeItem("aprovamais-session");
    setLocalSession(null);
    setAuthUser(null);
    setProfile(null);
    updateUser({ loggedOut: true });
  }, [updateUser]);

  const updateProfile = useCallback(async (updates) => {
    updateUser(updates);
    if (!isSupabaseConfigured || !authUser) {
      return updates;
    }
    const dbUpdates = toProfileUpdates(updates);
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: authUser.id, email: authUser.email, ...dbUpdates }, { onConflict: "id" })
      .select()
      .single();
    if (error) throw error;
    setProfile(data);
    return data;
  }, [authUser, updateUser]);

  const appUser = useMemo(() => {
    if (isSupabaseConfigured && authUser && profile) {
      const stats = {
        horasEstudadas: profile.horas_estudadas || 0,
        questoesResolvidas: profile.questoes_resolvidas || 0,
        taxaAcertos: profile.taxa_acertos || 0,
        sequenciaDias: profile.sequencia_dias || 0,
        tafNota: profile.taf_nota || 0,
        pontos: profile.pontos || 0,
      };
      return {
        id: authUser.id,
        email: authUser.email,
        name: profile.name,
        role: profile.role,
        plano: profile.plano,
        targetContest: profile.concurso_alvo,
        dataProva: profile.data_prova,
        nivel: profile.nivel,
        horasSemanais: profile.horas_semanais,
        diasDisponiveis: profile.dias_disponiveis,
        username: localUser.username,
        phone: localUser.phone,
        birthDate: localUser.birthDate,
        gender: localUser.gender,
        city: localUser.city,
        state: localUser.state,
        country: localUser.country,
        onboardingComplete: Boolean(profile.onboarding_completo),
        objective: localUser.objective,
        customObjective: localUser.customObjective,
        contestName: localUser.contestName,
        contestState: localUser.contestState,
        examBoard: localUser.examBoard,
        oabPhase: localUser.oabPhase,
        oabSecondPhaseArea: localUser.oabSecondPhaseArea,
        enemTargetScore: localUser.enemTargetScore,
        desiredCourse: localUser.desiredCourse,
        schoolYear: localUser.schoolYear,
        schoolType: localUser.schoolType,
        vestibularName: localUser.vestibularName,
        hoursPerDay: localUser.hoursPerDay,
        daysPerWeek: localUser.daysPerWeek,
        availableDays: localUser.availableDays,
        currentLevel: localUser.currentLevel,
        difficultSubjects: localUser.difficultSubjects,
        editalOption: localUser.editalOption,
        editalFile: localUser.editalFile,
        editalText: localUser.editalText,
        wantsEdital: localUser.wantsEdital,
        diagnosticPlan: localUser.diagnosticPlan,
        stats: {
          hours: stats.horasEstudadas,
          questions: stats.questoesResolvidas,
          accuracy: stats.taxaAcertos,
          streak: stats.sequenciaDias,
          taf: stats.tafNota,
        },
        rawStats: stats,
      };
    }
    if (isSupabaseConfigured && authUser && !profile) {
      return {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "Aluno Aprova+",
        role: "student",
        plano: "gratuito",
        targetContest: "",
        username: localUser.username,
        phone: localUser.phone,
        birthDate: localUser.birthDate,
        gender: localUser.gender,
        city: localUser.city,
        state: localUser.state,
        country: localUser.country,
        onboardingComplete: false,
        stats: {
          hours: 0,
          questions: 0,
          accuracy: 0,
          streak: 0,
          taf: 0,
        },
        rawStats: {},
      };
    }
    return {
      ...localUser,
      stats: {
        hours: localStats.horasEstudadas,
        questions: localStats.questoesResolvidas,
        accuracy: localStats.taxaAcertos,
        streak: localStats.sequenciaDias,
        taf: localStats.tafNota,
      },
      rawStats: localStats,
    };
  }, [authUser, localStats, localUser, profile]);

  const isAuthenticated = isSupabaseConfigured
    ? Boolean(authUser || localSession?.registrationPending)
    : Boolean(localSession && !localUser?.loggedOut);
  const value = useMemo(() => ({ user: appUser, isAdmin: appUser?.role === "admin", isAuthenticated, isLoading, login, register, logout, updateProfile }), [appUser, isAuthenticated, isLoading, login, logout, register, updateProfile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

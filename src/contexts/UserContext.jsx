/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useNotificacoesStore, usePlanoStore, useQuestoesStore, useRankingStore, useRevisaoStore, useSimuladosStore, useUserStore } from "../stores";

const UserContext = createContext(null);

const profileFieldMap = {
  targetContest: "concurso_alvo",
  dataProva: "data_prova",
  horasSemanais: "horas_semanais",
  diasDisponiveis: "dias_disponiveis",
  onboardingComplete: "onboarding_completo",
  statusPlano: "status_plano",
  planoAtivo: "plano_ativo",
  planoExpiraEm: "plano_expira_em",
  emTeste: "em_teste",
  vitalicio: "vitalicio",
  tourCompleto: "tour_completo",
};

const nullableDateFields = new Set(["data_prova", "plano_expira_em", "trial_inicio"]);
const nullableNumberFields = new Set(["horas_semanais", "dias_disponiveis"]);

function normalizeProfileValue(dbKey, value) {
  if (nullableDateFields.has(dbKey) && value === "") return null;
  if (nullableNumberFields.has(dbKey) && value === "") return null;
  return value;
}

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
    "plano",
    "tour_completo",
  ]);

  return Object.entries(updates).reduce((mapped, [key, value]) => {
    const dbKey = profileFieldMap[key] || key;
    if (allowed.has(dbKey)) mapped[dbKey] = normalizeProfileValue(dbKey, value);
    return mapped;
  }, {});
}

async function upsertProfileWithFallback(payload, options = { onConflict: "id" }) {
  const normalizedPayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, normalizeProfileValue(key, value)])
  );
  const { data, error } = await supabase.from("profiles").upsert(normalizedPayload, options).select().single();
  if (!error) return data;

  const message = String(error.message || "");
  const isConflict = error.code === "23505" || error.status === 409 || /duplicate|unique|conflict/i.test(message);
  if (isConflict && normalizedPayload.id) {
    const existing = await supabase.from("profiles").select("*").eq("id", normalizedPayload.id).maybeSingle();
    if (existing.data) return existing.data;
  }

  const isSchemaMismatch = error.code === "PGRST204" || /column|schema cache|trial_inicio|plano_ativo|plano_expira_em|em_teste|onboarding_completo|tour_completo/i.test(message);
  if (!isSchemaMismatch) throw error;

  const minimalPayload = {
    id: normalizedPayload.id,
    name: normalizedPayload.name || normalizedPayload.email?.split("@")?.[0] || "Aluno Aprova+",
    email: normalizedPayload.email,
    concurso_alvo: normalizedPayload.concurso_alvo,
    data_prova: normalizedPayload.data_prova,
    nivel: normalizedPayload.nivel,
    horas_semanais: normalizedPayload.horas_semanais,
    dias_disponiveis: normalizedPayload.dias_disponiveis,
    onboarding_completo: normalizedPayload.onboarding_completo,
    tour_completo: normalizedPayload.tour_completo,
  };
  const cleanPayload = Object.fromEntries(
    Object.entries(minimalPayload)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, normalizeProfileValue(key, value)])
  );
  const fallback = await supabase.from("profiles").upsert(cleanPayload, options).select().single();
  if (fallback.error) {
    const fallbackConflict = fallback.error.code === "23505" || fallback.error.status === 409 || /duplicate|unique|conflict/i.test(String(fallback.error.message || ""));
    if (fallbackConflict && cleanPayload.id) {
      const existing = await supabase.from("profiles").select("*").eq("id", cleanPayload.id).maybeSingle();
      if (existing.data) return existing.data;
    }
    throw fallback.error;
  }
  return fallback.data;
}

function readLocalSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("aprovamais-session") || "null");
  } catch {
    return null;
  }
}

function resetPersistedStudyStateForAuthUser(userId) {
  if (typeof window === "undefined" || !userId) return;
  const storageKey = "aprovamais-active-auth-user";
  const previousUserId = window.localStorage.getItem(storageKey);
  if (previousUserId === userId) return;

  useUserStore.getState().updateStats({ horasEstudadas: 0, questoesResolvidas: 0, taxaAcertos: 0, sequenciaDias: 0, tafNota: 0 });
  useQuestoesStore.setState({ tentativas: [], salvas: [], caderno: [], errosSuperados: [] });
  usePlanoStore.setState({ atividades: [] });
  useRankingStore.setState({ ranking: [], pontos: 0 });
  useRevisaoStore.setState({ revisoes: [] });
  useSimuladosStore.setState({ simulados: [], ativo: null });
  useNotificacoesStore.setState({ notificacoes: [] });
  [
    "aprova-plano-preferencias",
    "aprova-plano-timers",
    "aprova-plano-inteligente-gerado",
  ].forEach((key) => window.localStorage.removeItem(key));
  window.localStorage.setItem(storageKey, userId);
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

  const ensureProfile = useCallback(async (user) => {
    if (!isSupabaseConfigured || !user) return null;
    const existing = await fetchProfile(user);
    if (existing) return existing;

    return upsertProfileWithFallback({
      id: user.id,
      name: user.user_metadata?.name || user.email?.split("@")?.[0] || "Aluno Aprova+",
      email: user.email,
      tour_completo: false,
      onboarding_completo: false,
    }, { onConflict: "id" });
  }, [fetchProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let alive = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!alive) return;
      if (session?.user?.id) resetPersistedStudyStateForAuthUser(session.user.id);
      setAuthUser(session?.user || null);
      setProfile(session?.user ? await ensureProfile(session.user) : null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user?.id) resetPersistedStudyStateForAuthUser(session.user.id);
      setAuthUser(session?.user || null);
      setProfile(session?.user ? await ensureProfile(session.user) : null);
      setIsLoading(false);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [ensureProfile]);

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
    resetPersistedStudyStateForAuthUser(String(email || "").toLowerCase());
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session = { email, name, registrationPending: true, loggedAt: new Date().toISOString(), planoAtivo: true, planoExpiraEm: trialEndsAt, emTeste: true };
    if (!isSupabaseConfigured) {
      window.localStorage.setItem("aprovamais-session", JSON.stringify(session));
      setLocalSession(session);
      updateUser({ name, email, onboardingComplete: false, planoAtivo: true, planoExpiraEm: trialEndsAt, emTeste: true, statusPlano: "trial" });
      return true;
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;

    if (data.session?.user?.id) {
      const createdProfile = await fetchProfile(data.session.user);
      if (createdProfile) setProfile(createdProfile);
    }
    window.localStorage.setItem("aprovamais-session", JSON.stringify(session));
    setLocalSession(session);
    updateUser({ name, email, onboardingComplete: false, loggedOut: false, planoAtivo: true, planoExpiraEm: trialEndsAt, emTeste: true, statusPlano: "trial" });
    return true;
  }, [fetchProfile, updateUser]);

  const loginWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase não configurado para login com Google.");
    }

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) throw error;
    return true;
  }, []);

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
    const data = await upsertProfileWithFallback({ id: authUser.id, email: authUser.email, ...dbUpdates }, { onConflict: "id" });
    setProfile(data);
    return data;
  }, [authUser, updateUser]);

  const refreshProfile = useCallback(async () => {
    if (!isSupabaseConfigured || !authUser) return null;
    const data = await fetchProfile(authUser);
    if (data) setProfile(data);
    return data;
  }, [authUser, fetchProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured || !authUser || !profile || !localSession?.registrationPending) return undefined;
    if (localSession.email?.toLowerCase() !== authUser.email?.toLowerCase()) return undefined;

    const dbUpdates = {};
    if (localUser.onboardingComplete === true && profile.onboarding_completo !== true) {
      dbUpdates.onboarding_completo = true;
    }
    if (localUser.tourCompleto === true && profile.tour_completo !== true) {
      dbUpdates.tour_completo = true;
    }
    if (!Object.keys(dbUpdates).length) return undefined;

    let alive = true;
    upsertProfileWithFallback({ id: authUser.id, email: authUser.email, ...dbUpdates }, { onConflict: "id" })
      .then((data) => {
        if (alive) setProfile(data);
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, [authUser, localSession, localUser.onboardingComplete, localUser.tourCompleto, profile]);

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
        statusPlano: profile.status_plano,
        planoAtivo: Boolean(profile.plano_ativo),
        planoExpiraEm: profile.plano_expira_em,
        emTeste: Boolean(profile.em_teste),
        vitalicio: Boolean(profile.vitalicio),
        tourCompleto: profile.tour_completo === true,
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
        statusPlano: "trial",
        planoAtivo: true,
        planoExpiraEm: null,
        emTeste: true,
        targetContest: "",
        username: localUser.username,
        phone: localUser.phone,
        birthDate: localUser.birthDate,
        gender: localUser.gender,
        city: localUser.city,
        state: localUser.state,
        country: localUser.country,
        onboardingComplete: false,
        tourCompleto: false,
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
    if (isSupabaseConfigured && !authUser && localSession?.registrationPending) {
      return {
        id: null,
        email: localSession.email,
        name: localSession.name || localSession.email?.split("@")?.[0] || "Aluno Aprova+",
        role: "student",
        plano: "gratuito",
        statusPlano: "trial",
        planoAtivo: Boolean(localSession.planoAtivo),
        planoExpiraEm: localSession.planoExpiraEm,
        emTeste: Boolean(localSession.emTeste),
        onboardingComplete: Boolean(localUser.onboardingComplete),
        tourCompleto: Boolean(localUser.tourCompleto),
        targetContest: localUser.targetContest,
        dataProva: localUser.dataProva,
        nivel: localUser.nivel,
        horasSemanais: localUser.horasSemanais,
        diasDisponiveis: localUser.diasDisponiveis,
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
  }, [authUser, localSession, localStats, localUser, profile]);

  const isAuthenticated = isSupabaseConfigured
    ? Boolean(authUser || localSession?.registrationPending)
    : Boolean(localSession && !localUser?.loggedOut);
  const value = useMemo(() => ({ user: appUser, isAdmin: appUser?.role === "admin", isAuthenticated, isLoading, login, loginWithGoogle, register, logout, updateProfile, refreshProfile }), [appUser, isAuthenticated, isLoading, login, loginWithGoogle, logout, refreshProfile, register, updateProfile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

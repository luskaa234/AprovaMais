/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useUserStore } from "../stores";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const localUser = useUserStore((state) => state.user);
  const localStats = useUserStore((state) => state.stats);
  const updateUser = useUserStore((state) => state.updateUser);
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
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
    if (!isSupabaseConfigured) return localUser;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return true;
  }, [localUser]);

  const register = useCallback(async (name, email, password) => {
    if (!isSupabaseConfigured) {
      updateUser({ name, email });
      return true;
    }
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
    return true;
  }, [updateUser]);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setAuthUser(null);
    setProfile(null);
    updateUser({ loggedOut: true });
  }, [updateUser]);

  const updateProfile = useCallback(async (updates) => {
    if (!isSupabaseConfigured || !authUser) {
      updateUser(updates);
      return updates;
    }
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", authUser.id).select().single();
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

  const value = useMemo(() => ({ user: appUser, isAdmin: appUser?.role === "admin", isLoading, login, register, logout, updateProfile }), [appUser, isLoading, login, logout, register, updateProfile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

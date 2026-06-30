import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    let fallbackTimer;

    if (!isSupabaseConfigured) {
      navigate("/", { replace: true });
      return undefined;
    }

    const finishLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const errorDescription = params.get("error_description") || hashParams.get("error_description");
      const code = params.get("code");
      const type = params.get("type");
      const next = params.get("next");

      if (errorDescription) {
        toast.error(decodeURIComponent(errorDescription));
        navigate("/login", { replace: true });
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!alive) return;

        if (error) {
          toast.error(error.message || "Nao foi possivel finalizar o login. Tente novamente.");
          navigate("/login", { replace: true });
          return;
        }

        if (type === "recovery" || next === "/recuperar-senha") {
          navigate("/recuperar-senha", { replace: true });
          return;
        }

        navigate(next || "/", { replace: true });
        return;
      }

      fallbackTimer = window.setTimeout(() => {
        if (alive) navigate("/", { replace: true });
      }, 1200);
    };

    finishLogin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!alive) return;

      if (event === "PASSWORD_RECOVERY" && session) {
        subscription.unsubscribe();
        navigate("/recuperar-senha", { replace: true });
        return;
      }

      if ((event === "INITIAL_SESSION" || event === "SIGNED_IN") && session) {
        subscription.unsubscribe();
        navigate("/", { replace: true });
      } else if (event === "INITIAL_SESSION" && !session) {
        subscription.unsubscribe();
        toast.error("Nao foi possivel finalizar o login. Tente novamente.");
        navigate("/login", { replace: true });
      }
    });

    return () => {
      alive = false;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null;
}

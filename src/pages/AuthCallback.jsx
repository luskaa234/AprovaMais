import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;

    if (!isSupabaseConfigured) {
      navigate("/", { replace: true });
      return undefined;
    }

    // Wait for the SDK to complete the PKCE/implicit exchange before redirecting.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!alive) return;
      if ((event === "INITIAL_SESSION" || event === "SIGNED_IN") && session) {
        subscription.unsubscribe();
        navigate("/", { replace: true });
      } else if (event === "INITIAL_SESSION" && !session) {
        subscription.unsubscribe();
        toast.error("Não foi possível finalizar o login. Tente novamente.");
        navigate("/login", { replace: true });
      }
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gray-950 p-6 text-center text-white">
      <div>
        <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <h1 className="text-lg font-black">Conectando sua conta</h1>
        <p className="mt-2 text-sm text-gray-400">Você já vai para o app.</p>
      </div>
    </div>
  );
}

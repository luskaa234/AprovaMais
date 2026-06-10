import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;

    async function finishAuth() {
      try {
        if (isSupabaseConfigured) {
          const { error } = await supabase.auth.getSession();
          if (error) throw error;
        }
        if (alive) navigate("/", { replace: true });
      } catch (error) {
        toast.error(error.message || "Nao foi possivel finalizar o login.");
        if (alive) navigate("/login", { replace: true });
      }
    }

    finishAuth();

    return () => {
      alive = false;
    };
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-gray-950 p-6 text-center text-white">
      <div>
        <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <h1 className="text-lg font-black">Conectando sua conta</h1>
        <p className="mt-2 text-sm text-gray-400">Voce ja vai para o app.</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import SplashGate from './components/SplashGate/SplashGate';

function AppRoutes() {
  return (
    <main style={{ minHeight: '100dvh', background: '#f8fbff' }}>
      {/* Substitua pelo seu RouterProvider, Routes ou UnifiedApp */}
    </main>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        // Coloque aqui o carregamento real:
        // await supabase.auth.getSession();
        // await carregarPerfil();
        // await carregarConfiguracoes();
      } finally {
        setAppReady(true);
      }
    }

    bootstrap();
  }, []);

  return (
    <SplashGate
      ready={appReady}
      minDuration={1400}
      maxDuration={5000}
      message="Preparando sua aprovação..."
    >
      <AppRoutes />
    </SplashGate>
  );
}

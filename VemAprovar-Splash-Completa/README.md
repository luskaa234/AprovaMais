# Splash Screen Profissional — VemAprovar

Pacote completo com:

- Splash animada e responsiva em React.
- Controle de carregamento com tempo mínimo e fallback de segurança.
- Logo oficial tratada com fundo transparente.
- Ícones PWA em 192 px, 512 px e versão maskable.
- Imagens estáticas de abertura para iPhone e Android.
- Configuração de `manifest.webmanifest`.
- Metatags para splash do iOS.
- Arquivos de tema para Android 11 e Android 12+.
- Snippet para TWA/Bubblewrap.
- Preview local sem instalação.

## 1. Testar o visual localmente

Abra:

```text
preview/index.html
```

Também pode servir a pasta por HTTP:

```bash
npx serve preview
```

## 2. Instalação no React

Copie:

```text
src/components/SplashScreen
src/components/SplashGate
```

para a pasta `src/components` do seu projeto.

Copie o conteúdo de:

```text
public/branding
public/splash
```

para a pasta `public` do projeto.

No componente raiz, use:

```jsx
import { useEffect, useState } from 'react';
import SplashGate from './components/SplashGate/SplashGate';

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function iniciar() {
      try {
        // Exemplo:
        // await supabase.auth.getSession();
        // await carregarPerfil();
      } finally {
        setAppReady(true);
      }
    }

    iniciar();
  }, []);

  return (
    <SplashGate ready={appReady} minDuration={1400} maxDuration={5000}>
      {/* Seu RouterProvider, Routes ou UnifiedApp */}
    </SplashGate>
  );
}
```

Um exemplo completo está em `src/App.example.jsx`.

## 3. Evitar a tela travada

A splash anterior permanecia visível durante muito tempo. O `SplashGate` deste pacote resolve isso de duas formas:

- Aguarda no mínimo `1400 ms`, para a animação não piscar.
- Fecha obrigatoriamente após `5000 ms`, mesmo se uma requisição falhar.

Use `ready={true}` apenas quando sessão, perfil e configurações iniciais estiverem prontos.

## 4. PWA

Use `snippets/manifest.webmanifest` como base e copie os ícones para `public/branding`.

No `index.html`, cole o conteúdo de:

```text
snippets/index-head.html
```

As imagens indicadas já estão dentro de `public/splash/apple`.

## 5. Android/TWA

Os arquivos Android estão em:

```text
android/app/src/main/res
```

Faça o merge com o projeto Android existente. Não apague temas ou dependências que o projeto já utiliza.

Aplique à Activity inicial:

```xml
android:theme="@style/Theme.VemAprovar.Starting"
```

O exemplo está em:

```text
snippets/AndroidManifest.activity.xml
```

Para `twa-manifest.json`, use os valores de:

```text
snippets/twa-manifest.patch.json
```

Troque `SEU-DOMINIO.com` pelo domínio real e regenere o projeto Android após atualizar o TWA.

## 6. Arquivos principais

```text
public/branding/vemaprovar-logo-completa.png
public/branding/vemaprovar-logo-sem-slogan.png
public/branding/vemaprovar-simbolo-va.png
public/branding/icon-192.png
public/branding/icon-512.png
public/branding/icon-512-maskable.png
public/splash/splash-design-9x16.png
```

## 7. Ajustes rápidos

Cores ficam no início de:

```text
src/components/SplashScreen/SplashScreen.css
```

Mensagem:

```jsx
<SplashGate message="Preparando sua aprovação...">
```

Tempo mínimo:

```jsx
minDuration={1400}
```

Tempo máximo de segurança:

```jsx
maxDuration={5000}
```

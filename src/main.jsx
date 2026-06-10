import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './landing-light.css'
import App from './App.jsx'
import { initApp } from './lib/initApp.js'

initApp()

if (import.meta.env.PROD && "serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

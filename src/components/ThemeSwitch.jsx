import { useEffect } from "react";

function ThemeSwitch() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("aprova-theme", "light");
  }, []);

  return (
    <div className="theme-switch">
      <label className="switch-label" aria-label="Modo claro ativo">
        <input
          type="checkbox"
          className="checkbox"
          checked
          readOnly
        />
        <span className="slider" />
      </label>
    </div>
  );
}

export default ThemeSwitch;

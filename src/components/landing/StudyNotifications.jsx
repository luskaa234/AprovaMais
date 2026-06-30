import { cn } from "../../lib/utils";

const notifications = [
  {
    name: "Complete seu treino",
    description: "Faltam 12 questões para fechar a meta de hoje.",
    time: "agora",
    icon: "✓",
    color: "#60A5FA",
  },
  {
    name: "Meta quase concluída",
    description: "Você já completou 84% do plano desta semana.",
    time: "12 min",
    icon: "%",
    color: "#F59E0B",
  },
  {
    name: "Simulado recomendado",
    description: "Treine 30 minutos com assuntos de maior incidência.",
    time: "8 min",
    icon: "S",
    color: "#0EA5E9",
  },
];

function StudyNotification({ name, description, icon, color, time }) {
  return (
    <figure className="study-notification">
      <div className="study-notification-icon" style={{ backgroundColor: color }}>
        <span>{icon}</span>
      </div>
      <div className="study-notification-copy">
        <figcaption>
          <span>{name}</span>
          <small>{time}</small>
        </figcaption>
        <p>{description}</p>
      </div>
    </figure>
  );
}

function StudyNotifications({ className }) {
  return (
    <div className={cn("study-notifications", className)}>
      <div className="study-notifications-header">
        <span>Alertas inteligentes</span>
        <strong>ao vivo</strong>
      </div>

      <div className="study-notifications-list">
        {notifications.map((item) => (
          <StudyNotification {...item} key={item.name} />
        ))}
      </div>
    </div>
  );
}

export default StudyNotifications;

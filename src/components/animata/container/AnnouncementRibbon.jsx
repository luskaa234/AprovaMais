import { FaBookOpen, FaChevronRight, FaClipboardList, FaLayerGroup, FaRegCheckCircle } from "react-icons/fa";
import { cn } from "../../../lib/utils";
import Marquee from "./Marquee";

const defaultItems = [
  { label: "Questoes", icon: FaClipboardList },
  { label: "Flashcards", icon: FaLayerGroup },
  { label: "Mapas mentais", icon: FaBookOpen },
  { label: "Revisoes guiadas", icon: FaRegCheckCircle },
];

function DefaultMessage() {
  return (
    <span className="announcement-ribbon-items">
      {defaultItems.map((item) => {
        const Icon = item.icon;

        return (
          <span className="announcement-ribbon-item" key={item.label}>
            <Icon />
            {item.label}
          </span>
        );
      })}
    </span>
  );
}

function AnnouncementRibbon({
  message,
  badge = "Novo",
  ctaText = "Conhecer recursos",
  ctaHref = "#recursos",
  repeat = 5,
  pauseOnHover = false,
  className,
  ...props
}) {
  const content = message ?? <DefaultMessage />;

  return (
    <div className={cn("announcement-ribbon", className)} {...props}>
      {badge && (
        <div className="announcement-ribbon-badge">
          <span>{badge}</span>
        </div>
      )}

      <div className="announcement-ribbon-track">
        <Marquee repeat={repeat} pauseOnHover={pauseOnHover}>
          {content}
        </Marquee>
      </div>

      {ctaText && ctaHref && (
        <a className="announcement-ribbon-cta" href={ctaHref}>
          {ctaText}
          <FaChevronRight />
        </a>
      )}
    </div>
  );
}

export default AnnouncementRibbon;

import { Play, X } from "lucide-react";
import { useState } from "react";

function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`hero-video-dialog-trigger ${className}`}
        data-animation-style={animationStyle}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <img src={thumbnailSrc} alt={thumbnailAlt} />
        <span className="hero-video-dialog-overlay" aria-hidden="true">
          <span>
            <Play size={24} fill="currentColor" />
          </span>
        </span>
      </button>

      {isOpen ? (
        <div className="hero-video-dialog-modal" role="dialog" aria-modal="true">
          <button
            className="hero-video-dialog-close"
            type="button"
            aria-label="Fechar video"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
          <div className="hero-video-dialog-frame">
            <iframe
              src={videoSrc}
              title={thumbnailAlt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export { HeroVideoDialog };

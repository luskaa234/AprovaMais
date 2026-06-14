import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className = "",
}) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;

    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [hasStarted]);

  const togglePlayback = () => {
    if (!hasStarted) {
      setHasStarted(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const seek = (event) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const nextTime = (Number(event.target.value) / 100) * duration;
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    video?.requestFullscreen?.();
  };

  return (
    <div className={`hero-video-dialog-trigger ${className}`} data-animation-style={animationStyle}>
      {hasStarted ? (
        <div className="hero-video-player">
          <video
            ref={videoRef}
            src={videoSrc}
            title={thumbnailAlt}
            playsInline
            preload="auto"
            onClick={togglePlayback}
            onDurationChange={(event) => setDuration(event.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          />

          <div className="hero-video-player-top">
            <img src="/favicon.svg" alt="" />
            <div>
              <strong>Conheça o VemAprovar</strong>
              <span>VemAprovar</span>
            </div>
            <button type="button" aria-label={isMuted ? "Ativar som" : "Silenciar"} onClick={toggleMute}>
              {isMuted ? <VolumeX size={21} /> : <Volume2 size={21} />}
            </button>
          </div>

          <button className="hero-video-player-center" type="button" aria-label={isPlaying ? "Pausar" : "Reproduzir"} onClick={togglePlayback}>
            {isPlaying ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" />}
          </button>

          <div className="hero-video-player-bottom">
            <div className="hero-video-player-meta">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <button type="button" aria-label="Tela cheia" onClick={openFullscreen}>
                <Maximize2 size={18} />
              </button>
            </div>
            <input
              aria-label="Progresso do vídeo"
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={seek}
            />
          </div>
        </div>
      ) : (
        <button className="hero-video-dialog-start" type="button" onClick={togglePlayback}>
          <img src={thumbnailSrc} alt={thumbnailAlt} />
          <span className="hero-video-dialog-overlay" aria-hidden="true">
            <span>
              <Play size={24} fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export { HeroVideoDialog };

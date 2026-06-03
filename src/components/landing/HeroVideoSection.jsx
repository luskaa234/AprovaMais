import { HeroVideoDialog } from "@/registry/magicui/hero-video-dialog";

function HeroVideoSection() {
  return (
    <section className="hero-video-section">
      <div className="hero-video-inner">
        <span className="hero-video-badge">VER NA PRÁTICA</span>
        <h2>Veja como funciona em 2 minutos</h2>
        <p>Do cadastro ao plano de estudos em menos de 3 minutos.</p>

        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
          thumbnailSrc="/thumbnail-demo.png"
          thumbnailAlt="Demo Aprova+"
          className="w-full rounded-2xl overflow-hidden border border-[#DBEAFE]"
        />
      </div>
    </section>
  );
}

export default HeroVideoSection;

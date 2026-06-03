import Navbar from "../components/Navbar";
import AiPreview from "../components/landing/AiPreview";
import FAQ from "../components/landing/FAQ";
import FlashcardsFlipStack from "../components/landing/FlashcardsFlipStack";
import FeaturesGrid from "../components/landing/FeaturesGrid";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HeroVideoSection from "../components/landing/HeroVideoSection";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import Stats from "../components/landing/Stats";
import Testimonials from "../components/landing/Testimonials";
import TrustSection from "../components/landing/TrustSection";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroVideoSection />
        <Stats />
        <HowItWorks />
        <FeaturesGrid />
        <FlashcardsFlipStack />
        <AiPreview />
        <TrustSection />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default Home;

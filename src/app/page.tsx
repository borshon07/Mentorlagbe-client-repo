import Hero from "@/components/ui/home/Hero";
import FeaturedTuitions from "@/components/ui/home/FeaturedTuitions";
import HowItWorks from "@/components/ui/home/HowItWorks";
import TopSubjects from "@/components/ui/home/TopSubjects";
import PricingSection from "@/components/ui/home/PricingSection";
import Testimonials from "@/components/ui/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedTuitions />
      <HowItWorks />
      <TopSubjects />
      <PricingSection />
      <Testimonials />
    </main>
  );
}
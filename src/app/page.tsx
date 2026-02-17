import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import SimulationSection from "@/components/SimulationSection";
import ImpactSection from "@/components/ImpactSection";
import ScenarioSection from "@/components/ScenarioSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <MissionSection />
      <SimulationSection />
      <ScenarioSection />
      <ImpactSection />
      {/* <TestimonialsSection /> */}
    </main>
  );
}

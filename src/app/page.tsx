import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PropertiesPreview } from "@/components/properties-preview";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  

  return (
    <div className="min-h-screen">
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PropertiesPreview />
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

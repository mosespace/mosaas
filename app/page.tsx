import SiteCodePreview from '@/components/landing/code-preview';
import SiteFooter from '@/components/landing/footer';
import SiteCta from '@/components/landing/site-cta';
import SiteFeatures from '@/components/landing/site-features';
import SiteHero from '@/components/landing/site-hero';
import SiteNav from '@/components/landing/site-nav';
import SitePricing from '@/components/landing/site-pricing';
import TechStackSection from '@/components/landing/tech';
import UiKit from '@/components/landing/ui-kit';

export default function PremiumStarterKit() {
  return (
    <main className="min-h-screen w-full max-w-full bg-[#F8F9FB] text-zinc-900 font-sans selection:bg-amber-100">
      {/* 1. Ultra-Minimal Nav */}
      <SiteNav />

      {/* 2. Hero: The "Soft Focus" Section */}
      <SiteHero />

      {/* 3. Feature Showcase: Layered Cards */}
      <SiteFeatures />

      {/* 4. The "Smooth" Code Preview Section */}
      <SiteCodePreview />

      <TechStackSection />

      <UiKit />

      <SitePricing />

      <SiteCta />

      {/* 5. Clean Footer */}
      <SiteFooter />
    </main>
  );
}

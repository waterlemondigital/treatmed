import React from 'react';
import { PageView, Product } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { BrandIntro } from '../components/home/BrandIntro';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ServicesGridSection } from '../components/home/ServicesGridSection';
import { SpecialTreatmentsSection } from '../components/home/SpecialTreatmentsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { StoreLocationSection } from '../components/home/StoreLocationSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { AnimatedSection } from '../components/common/AnimatedSection';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
  openAIAssistant: () => void;
  openQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openBookingModal,
  openAIAssistant,
  openQuickView,
}) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <HeroSection
        setCurrentPage={setCurrentPage}
        openBookingModal={openBookingModal}
        openAIAssistant={openAIAssistant}
      />

      <AnimatedSection delay={0.05}>
        <BrandIntro setCurrentPage={setCurrentPage} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <FeaturedProductsSection
          setCurrentPage={setCurrentPage}
          openQuickView={openQuickView}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <ServicesGridSection
          setCurrentPage={setCurrentPage}
          openBookingModal={openBookingModal}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <SpecialTreatmentsSection
          setCurrentPage={setCurrentPage}
          openBookingModal={openBookingModal}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <StoreLocationSection />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
};


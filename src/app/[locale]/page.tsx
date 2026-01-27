import { setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection2,
  Model360Section,
  ImpactSection,
  DonationsCarousel,
  EventsSection,
  TestimonialsCarousel,
  VolunteerSection,
  AboutSection,
  UnitsSection,
  PartnersSection
} from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HeroSection2 />        
        <PartnersSection />
        <AboutSection />
        <ImpactSection />
        <Model360Section />
        <DonationsCarousel locale={locale} />
        <UnitsSection />
        <EventsSection />
        <TestimonialsCarousel />
        <VolunteerSection />
      </main>
      <Footer />
    </>
  );
}

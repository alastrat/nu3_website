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
  UnitsSection
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
        <Model360Section />
        <VolunteerSection />
        <DonationsCarousel locale={locale} />
        <AboutSection />
        <UnitsSection />
        <EventsSection />
        <TestimonialsCarousel />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection2,
  ServicesSlider,
  Model360Section,
  ImpactSection,
  DonationsCarousel,
  VolunteerSection,
  AboutSection
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
        <AboutSection />
        <ServicesSlider />
        <ImpactSection />
        <Model360Section />
        <DonationsCarousel locale={locale} />
        <VolunteerSection />
      </main>
      <Footer />
    </>
  );
}

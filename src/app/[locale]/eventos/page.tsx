import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { EventCard } from '@/components/ui/event-card';
import { Pagination } from '@/components/ui/pagination';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'eventsPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Events data - in production, this would come from a CMS or database
const events = [
    {
        slug: 'jornada-nutricional-2024',
        image: '/images/real_images/evento-auditorio.jpg',
        date: new Date('2025-03-15'),
        location: 'Barranquilla, Colombia',
    },
    {
        slug: 'taller-huertas-productivas',
        image: '/images/real_images/HUERTA_BANNER.jpg',
        date: new Date('2025-03-22'),
        location: 'Atlántico, Colombia',
    },
    {
        slug: 'capacitacion-madres-lactantes',
        image: '/images/real_images/madresgestantes-1.jpg',
        date: new Date('2025-04-05'),
        location: 'Centro Integral nu3',
    },
    {
        slug: 'feria-alimentos-saludables',
        image: '/images/real_images/Primera-Infancia.jpg',
        date: new Date('2025-04-12'),
        location: 'Barranquilla, Colombia',
    },
];

export default async function EventsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'eventsPage' });
    const tEvents = await getTranslations({ locale, namespace: 'events' });

    const formatDateParts = (date: Date) => {
        return {
            day: date.getDate().toString(),
            month: date.toLocaleDateString(locale === 'es' ? 'es-CO' : locale === 'fr' ? 'fr-FR' : 'en-US', {
                month: 'short',
            }).toUpperCase(),
        };
    };

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                    backgroundImage="/images/real_images/evento-auditorio.jpg"
                    backgroundPosition="center 80%"
                />

                {/* Events Grid */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {tEvents('section.subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {tEvents('section.title')}
                            </h2>
                        </FadeIn>

                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {events.map((event) => (
                                <StaggerItem key={event.slug}>
                                    <EventCard
                                        image={event.image}
                                        title={tEvents(`items.${event.slug}.title`)}
                                        description={tEvents(`items.${event.slug}.description`)}
                                        date={formatDateParts(event.date)}
                                        venue={event.location}
                                        slug={event.slug}
                                    />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Pagination - for when there are more events */}
                        <div className="mt-12">
                            <Pagination
                                currentPage={1}
                                totalPages={1}
                                baseUrl="/eventos"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

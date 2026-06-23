import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ServiceCard } from '@/components/ui/service-card';
import { WhyJoinSection } from '@/components/sections/why-join-section';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'programsPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Programs data - in production, this would come from a CMS or database
const programs = [
    {
        slug: 'acabados-externos-internos',
        image: '/images/renovaplus/acabados.jpg',
    },
    {
        slug: 'urbanismo-mantenimiento',
        image: '/images/renovaplus/urbanismo.jpg',
    },
    {
        slug: 'remodelacion-espacios',
        image: '/images/renovaplus/remodelacion.jpg',
    },
    {
        slug: 'interventorias-asesorias',
        image: '/images/renovaplus/interventorias.jpg',
    },
];

export default async function ProgramsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'programsPage' });
    const tPrograms = await getTranslations({ locale, namespace: 'programs' });

    const programTitles: Record<string, { titleKey: string; descKey: string }> = {
        'acabados-externos-internos': { titleKey: 'finishes.title', descKey: 'finishes.description' },
        'urbanismo-mantenimiento': { titleKey: 'urbanism.title', descKey: 'urbanism.description' },
        'remodelacion-espacios': { titleKey: 'remodeling.title', descKey: 'remodeling.description' },
        'interventorias-asesorias': { titleKey: 'consulting.title', descKey: 'consulting.description' },
    };

    const faqs = [
        {
            question: t('faq.q1'),
            answer: t('faq.a1'),
        },
        {
            question: t('faq.q2'),
            answer: t('faq.a2'),
        },
        {
            question: t('faq.q3'),
            answer: t('faq.a3'),
        },
        {
            question: t('faq.q4'),
            answer: t('faq.a4'),
        },
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                    backgroundImage="/images/renovaplus/hero-2.jpg"
                    backgroundPosition="center 30%"
                />

                {/* Programs Grid */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {tPrograms('subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {tPrograms('title')}
                            </h2>
                        </FadeIn>

                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {programs.map((program) => {
                                const { titleKey, descKey } = programTitles[program.slug];
                                return (
                                    <StaggerItem key={program.slug}>
                                        <ServiceCard
                                            image={program.image}
                                            title={tPrograms(titleKey)}
                                            description={tPrograms(descKey)}
                                        />
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Why Join Section */}
                <WhyJoinSection
                    subtitle={t('whyJoin.subtitle')}
                    title={t('whyJoin.title')}
                    description={t('whyJoin.description')}
                    image="/images/renovaplus/workers-site.jpg"
                    imageAlt={t('whyJoin.imageAlt')}
                    faqs={faqs}
                    className="bg-muted/30"
                />
            </main>
            <Footer />
        </>
    );
}

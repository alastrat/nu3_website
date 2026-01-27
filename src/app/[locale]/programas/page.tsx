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
        slug: 'prevencion-desnutricion',
        image: '/images/real_images/kinds_in_group.jpg',
    },
    {
        slug: 'primera-infancia',
        image: '/images/real_images/girls_in_table.jpg',
    },
    {
        slug: 'madres-gestantes',
        image: '/images/real_images/pregnant_women.jpg',
    },
    {
        slug: 'adultos-mayores',
        image: '/images/real_images/seniors_in_table.jpg',
    },
];

export default async function ProgramsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'programsPage' });
    const tPrograms = await getTranslations({ locale, namespace: 'programs' });

    const programTitles: Record<string, { titleKey: string; descKey: string }> = {
        'prevencion-desnutricion': { titleKey: 'malnutrition.title', descKey: 'malnutrition.description' },
        'primera-infancia': { titleKey: 'childhood.title', descKey: 'childhood.description' },
        'madres-gestantes': { titleKey: 'mothers.title', descKey: 'mothers.description' },
        'adultos-mayores': { titleKey: 'elderly.title', descKey: 'elderly.description' },
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
                    backgroundImage="/images/real_images/board.jpg"
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
                                            slug={program.slug}
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
                    image="/images/real_images/nu3-banner-2024.jpg"
                    imageAlt={t('whyJoin.imageAlt')}
                    faqs={faqs}
                    className="bg-muted/30"
                />
            </main>
            <Footer />
        </>
    );
}

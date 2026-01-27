import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TeamCard } from '@/components/ui/team-card';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'teamPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Team members data - from nu3.co/quienes-somos/
const teamMembers = [
    { slug: 'monica-schraer', image: '/images/member-1.jpg' },
    { slug: 'francis-zylberblum', image: '/images/member-2.jpg' },
    { slug: 'paola-davila', image: '/images/member-3.jpg' },
    { slug: 'jeison-rodriguez', image: '/images/member-4.jpg' },
    { slug: 'sandra-buelvas', image: '/images/member-5.jpg' },
    { slug: 'daniel-villadiego', image: '/images/member-6.jpg' },
    { slug: 'dubis-barrios', image: '/images/member-7.jpg' },
    { slug: 'marcela-ortega', image: '/images/member-8.jpg' },
];

export default async function TeamPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'teamPage' });
    const tTeam = await getTranslations({ locale, namespace: 'team' });

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                />

                {/* Team Grid */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {tTeam('section.subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {tTeam('section.title')}
                            </h2>
                        </FadeIn>

                        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member) => (
                                <StaggerItem key={member.slug}>
                                    <TeamCard
                                        image={member.image}
                                        name={tTeam(`members.${member.slug}.name`)}
                                        role={tTeam(`members.${member.slug}.role`)}
                                        slug={member.slug}
                                    />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Join Us Section */}
                <section className="py-16 md:py-20 bg-primary/5">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-foreground font-display mb-4">
                                {t('joinUs.title')}
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                {t('joinUs.description')}
                            </p>
                            <a
                                href="/contacto"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                {tTeam('section.joinUs')}
                            </a>
                        </FadeIn>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

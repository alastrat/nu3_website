import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { DonationCard } from '@/components/ui/donation-card';
import { VolunteerSection } from '@/components/sections/volunteer-section';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'donationsPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Donations data - in production, this would come from a CMS or database
const donations = [
    {
        slug: 'prevencion-desnutricion',
        image: '/images/real_images/Prevencion-de-la-desnutricion-y-recuperacion-nutricional.jpg',
        raised: 15000000,
        goal: 25000000,
    },
    {
        slug: 'primera-infancia',
        image: '/images/real_images/Primera-Infancia.jpg',
        raised: 8500000,
        goal: 15000000,
    },
    {
        slug: 'madres-gestantes',
        image: '/images/real_images/madresgestantes-1.jpg',
        raised: 12000000,
        goal: 20000000,
    },
    {
        slug: 'adultos-mayores',
        image: '/images/real_images/ADULTOMAYOR.jpg',
        raised: 6000000,
        goal: 12000000,
    },
    {
        slug: 'huertas-productivas',
        image: '/images/real_images/HUERTA_BANNER.jpg',
        raised: 9500000,
        goal: 18000000,
    },
];

export default async function DonationsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'donationsPage' });
    const tDonations = await getTranslations({ locale, namespace: 'donations' });

    const donationTags: Record<string, string> = {
        'prevencion-desnutricion': t('tags.nutrition'),
        'primera-infancia': t('tags.childhood'),
        'madres-gestantes': t('tags.mothers'),
        'adultos-mayores': t('tags.elderly'),
        'huertas-productivas': t('tags.gardens'),
    };

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                />

                {/* Donations Grid */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {tDonations('section.subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {tDonations('section.title')}
                            </h2>
                        </FadeIn>

                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donations.map((donation) => {
                                const itemKey = donation.slug.replace(/-/g, '');
                                return (
                                    <StaggerItem key={donation.slug}>
                                        <DonationCard
                                            image={donation.image}
                                            tag={donationTags[donation.slug]}
                                            title={tDonations(`items.${donation.slug}.title`)}
                                            description={tDonations(`items.${donation.slug}.description`)}
                                            raised={donation.raised}
                                            goal={donation.goal}
                                            slug={donation.slug}
                                            locale={locale}
                                        />
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Volunteer Section */}
                <VolunteerSection />
            </main>
            <Footer />
        </>
    );
}

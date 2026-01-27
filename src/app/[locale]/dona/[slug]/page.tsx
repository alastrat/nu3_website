import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link, routing } from '@/i18n/routing';
import { ArrowRight, Heart, Users, Calendar, MapPin } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Donation campaigns and their data
const donationCampaigns: Record<string, { image: string; raised: number; goal: number; donors: number }> = {
    'prevencion-desnutricion': {
        image: '/images/real_images/Prevencion-de-la-desnutricion-y-recuperacion-nutricional.jpg',
        raised: 15000000,
        goal: 25000000,
        donors: 234,
    },
    'primera-infancia': {
        image: '/images/real_images/Primera-Infancia.jpg',
        raised: 8500000,
        goal: 15000000,
        donors: 156,
    },
    'madres-gestantes': {
        image: '/images/real_images/madresgestantes-1.jpg',
        raised: 12000000,
        goal: 20000000,
        donors: 189,
    },
    'adultos-mayores': {
        image: '/images/real_images/ADULTOMAYOR.jpg',
        raised: 6000000,
        goal: 12000000,
        donors: 98,
    },
    'huertas-productivas': {
        image: '/images/real_images/HUERTA_BANNER.jpg',
        raised: 9500000,
        goal: 18000000,
        donors: 145,
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(donationCampaigns);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const campaign = donationCampaigns[slug];

    if (!campaign) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'donations' });

    return {
        title: `${t(`items.${slug}.title`)} - nu3`,
        description: t(`items.${slug}.description`),
    };
}

function formatCurrency(amount: number, locale: string): string {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : locale === 'fr' ? 'fr-FR' : 'en-US', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export default async function DonationDetailsPage({ params }: Props) {
    const { locale, slug } = await params;
    const campaign = donationCampaigns[slug];

    if (!campaign) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'donations' });
    const tDetails = await getTranslations({ locale, namespace: 'donationDetails' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });

    const title = t(`items.${slug}.title`);
    const description = t(`items.${slug}.description`);
    const percentage = Math.round((campaign.raised / campaign.goal) * 100);

    // Get other campaigns for sidebar
    const otherCampaigns = Object.entries(donationCampaigns)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key, value]) => ({
            slug: key,
            title: t(`items.${key}.title`),
            image: '/images/real_images/Prevencion-de-la-desnutricion-y-recuperacion-nutricional.jpg',
        }));

    const donationAmounts = [50000, 100000, 200000, 500000];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={title}
                    items={[
                        { label: tDetails('breadcrumb.donations'), href: '/dona' },
                        { label: title },
                    ]}
                />

                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <FadeIn>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                                        <Image
                                            src={campaign.image}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.1}>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                        {title}
                                    </h1>

                                    {/* Progress Section */}
                                    <div className="mt-6 p-6 bg-muted/30 rounded-xl">
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <span className="text-3xl font-bold text-primary">
                                                    {formatCurrency(campaign.raised, locale)}
                                                </span>
                                                <span className="text-muted-foreground ml-2">
                                                    {tDetails('of')} {formatCurrency(campaign.goal, locale)}
                                                </span>
                                            </div>
                                            <span className="text-lg font-semibold text-foreground">
                                                {percentage}%
                                            </span>
                                        </div>
                                        <Progress value={percentage} className="h-3" />
                                        <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                {campaign.donors} {tDetails('donors')}
                                            </span>
                                        </div>
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.2}>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('content.paragraph1')}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('content.paragraph2')}
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Impact Stats */}
                                <FadeIn delay={0.3}>
                                    <div className="grid sm:grid-cols-3 gap-4 my-8">
                                        <div className="text-center p-6 bg-primary/5 rounded-xl">
                                            <span className="text-3xl font-bold text-primary">500+</span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {tDetails('stats.families')}
                                            </p>
                                        </div>
                                        <div className="text-center p-6 bg-secondary/5 rounded-xl">
                                            <span className="text-3xl font-bold text-secondary">1,200+</span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {tDetails('stats.children')}
                                            </p>
                                        </div>
                                        <div className="text-center p-6 bg-accent/20 rounded-xl">
                                            <span className="text-3xl font-bold text-foreground">50,000+</span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {tDetails('stats.meals')}
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Gallery */}
                                <FadeIn delay={0.4}>
                                    <h2 className="text-2xl font-bold text-foreground font-display mb-4">
                                        {tDetails('gallery.title')}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <Image
                                                src="/images/donation-details-inner-1.jpg"
                                                alt="Gallery 1"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <Image
                                                src="/images/donation-details-inner-2.jpg"
                                                alt="Gallery 2"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">
                                {/* Donation Form */}
                                <FadeIn direction="left">
                                    <div className="bg-card rounded-xl p-6 shadow-sm border sticky top-24">
                                        <h3 className="text-xl font-bold mb-4">
                                            {tDetails('form.title')}
                                        </h3>

                                        {/* Amount Buttons */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {donationAmounts.map((amount) => (
                                                <button
                                                    key={amount}
                                                    className="py-3 px-4 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                                                >
                                                    {formatCurrency(amount, locale)}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder={tDetails('form.customAmount')}
                                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <Button className="w-full" size="lg">
                                            <Heart className="mr-2 h-5 w-5" />
                                            {tDetails('form.donateButton')}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground mt-4">
                                            {tDetails('form.secure')}
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Other Campaigns */}
                                <FadeIn direction="left" delay={0.1}>
                                    <div className="bg-card rounded-xl p-6 shadow-sm border">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.otherCampaigns')}
                                        </h3>
                                        <ul className="space-y-4">
                                            {otherCampaigns.map((camp) => (
                                                <li key={camp.slug}>
                                                    <Link
                                                        href={`/dona/${camp.slug}` as any}
                                                        className="flex gap-4 group"
                                                    >
                                                        <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={camp.image}
                                                                alt={camp.title}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                                                {camp.title}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeIn>

                                {/* Share */}
                                <FadeIn direction="left" delay={0.2}>
                                    <div className="bg-muted/50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.shareTitle')}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {tDetails('sidebar.shareDescription')}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                </FadeIn>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

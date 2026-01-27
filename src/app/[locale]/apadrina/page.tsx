import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PricingCard } from '@/components/ui/pricing-card';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { Check, Heart, Users, Calendar, Shield } from 'lucide-react';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'sponsorPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function SponsorPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'sponsorPage' });
    const tSponsor = await getTranslations({ locale, namespace: 'sponsor' });

    const pricingPlans = [
        {
            key: 'basic',
            price: '$50.000',
            popular: false,
        },
        {
            key: 'standard',
            price: '$100.000',
            popular: true,
        },
        {
            key: 'premium',
            price: '$200.000',
            popular: false,
        },
    ];

    const benefits = [
        { icon: Heart, key: 'nutrition' },
        { icon: Users, key: 'support' },
        { icon: Calendar, key: 'updates' },
        { icon: Shield, key: 'transparency' },
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                />

                {/* Hero Section */}
                <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center max-w-3xl mx-auto">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {tSponsor('subtitle')}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display">
                                {tSponsor('title')}
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                {tSponsor('description')}
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                                {t('pricing.title')}
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                {t('pricing.description')}
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {pricingPlans.map((plan) => (
                                <StaggerItem key={plan.key}>
                                    <PricingCard
                                        title={t(`pricing.plans.${plan.key}.title`)}
                                        price={plan.price}
                                        period={t('pricing.period')}
                                        description={t(`pricing.plans.${plan.key}.description`)}
                                        features={[
                                            t(`pricing.plans.${plan.key}.feature1`),
                                            t(`pricing.plans.${plan.key}.feature2`),
                                            t(`pricing.plans.${plan.key}.feature3`),
                                            t(`pricing.plans.${plan.key}.feature4`),
                                        ]}
                                        popular={plan.popular}
                                        ctaText={t('pricing.cta')}
                                    />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 md:py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                                {t('benefits.title')}
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                {t('benefits.description')}
                            </p>
                        </FadeIn>

                        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit) => (
                                <StaggerItem key={benefit.key}>
                                    <div className="bg-card rounded-xl p-6 text-center shadow-sm border">
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                            <benefit.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-2">
                                            {t(`benefits.items.${benefit.key}.title`)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t(`benefits.items.${benefit.key}.description`)}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                                {t('howItWorks.title')}
                            </h2>
                        </FadeIn>

                        <div className="max-w-4xl mx-auto">
                            <StaggerContainer className="grid md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((step) => (
                                    <StaggerItem key={step}>
                                        <div className="text-center">
                                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                                                {step}
                                            </div>
                                            <h3 className="font-bold text-foreground mb-2">
                                                {t(`howItWorks.step${step}.title`)}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {t(`howItWorks.step${step}.description`)}
                                            </p>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <TestimonialsCarousel />

                {/* CTA Section */}
                <section className="py-16 md:py-20 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center max-w-2xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold font-display">
                                {t('cta.title')}
                            </h2>
                            <p className="mt-4 text-white/80">
                                {t('cta.description')}
                            </p>
                            <a
                                href="#pricing"
                                className="inline-flex items-center justify-center mt-6 px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
                            >
                                {t('cta.button')}
                            </a>
                        </FadeIn>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

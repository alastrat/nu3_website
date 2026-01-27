import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
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
    const t = await getTranslations({ locale, namespace: 'faqPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function FaqPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'faqPage' });

    // FAQ categories
    const categories = ['general', 'donations', 'programs', 'volunteer'];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                />

                {/* FAQ Section */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {t('subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {t('heading')}
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                {t('description')}
                            </p>
                        </FadeIn>

                        <div className="max-w-3xl mx-auto space-y-8">
                            {categories.map((category, catIndex) => (
                                <FadeIn key={category} delay={catIndex * 0.1}>
                                    <div className="bg-card rounded-xl p-6 shadow-sm border">
                                        <h3 className="text-xl font-bold text-foreground font-display mb-4">
                                            {t(`categories.${category}.title`)}
                                        </h3>
                                        <Accordion type="single" collapsible className="w-full">
                                            {[1, 2, 3, 4].map((num) => (
                                                <AccordionItem key={num} value={`${category}-${num}`}>
                                                    <AccordionTrigger className="text-left">
                                                        {t(`categories.${category}.q${num}`)}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground">
                                                        {t(`categories.${category}.a${num}`)}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Join Section */}
                <WhyJoinSection
                    subtitle={t('contact.subtitle')}
                    title={t('contact.title')}
                    description={t('contact.description')}
                    image="/images/real_images/nu3-banner-2024.jpg"
                    imageAlt={t('contact.imageAlt')}
                    faqs={[
                        { question: t('contact.q1'), answer: t('contact.a1') },
                        { question: t('contact.q2'), answer: t('contact.a2') },
                    ]}
                    className="bg-muted/30"
                    imagePosition="right"
                />
            </main>
            <Footer />
        </>
    );
}

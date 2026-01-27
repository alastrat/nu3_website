import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link, routing } from '@/i18n/routing';
import { ArrowRight, Check, Users, Heart, Target, Clock } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Program slugs and their translation keys
const programs: Record<string, { titleKey: string; descKey: string; image: string }> = {
    'prevencion-desnutricion': {
        titleKey: 'malnutrition',
        descKey: 'malnutrition',
        image: '/images/service-details-1.jpg',
    },
    'primera-infancia': {
        titleKey: 'childhood',
        descKey: 'childhood',
        image: '/images/service-details-1.jpg',
    },
    'madres-gestantes': {
        titleKey: 'mothers',
        descKey: 'mothers',
        image: '/images/service-details-1.jpg',
    },
    'adultos-mayores': {
        titleKey: 'elderly',
        descKey: 'elderly',
        image: '/images/service-details-1.jpg',
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(programs);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const program = programs[slug];

    if (!program) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'programs' });

    return {
        title: `${t(`${program.titleKey}.title`)} - nu3`,
        description: t(`${program.descKey}.description`),
    };
}

export default async function ProgramDetailsPage({ params }: Props) {
    const { locale, slug } = await params;
    const program = programs[slug];

    if (!program) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'programs' });
    const tDetails = await getTranslations({ locale, namespace: 'programDetails' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });

    const title = t(`${program.titleKey}.title`);
    const description = t(`${program.descKey}.description`);

    // Get other programs for sidebar
    const otherPrograms = Object.entries(programs)
        .filter(([key]) => key !== slug)
        .map(([key, value]) => ({
            slug: key,
            title: t(`${value.titleKey}.title`),
        }));

    const features = [
        { icon: Users, text: tDetails('features.beneficiaries') },
        { icon: Heart, text: tDetails('features.care') },
        { icon: Target, text: tDetails('features.goals') },
        { icon: Clock, text: tDetails('features.duration') },
    ];

    const benefits = [
        tDetails('benefits.item1'),
        tDetails('benefits.item2'),
        tDetails('benefits.item3'),
        tDetails('benefits.item4'),
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={title}
                    items={[
                        { label: tDetails('breadcrumb.programs'), href: '/programas' },
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
                                            src={program.image}
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
                                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                        {description}
                                    </p>
                                    <p className="mt-4 text-muted-foreground leading-relaxed">
                                        {tDetails('content.paragraph1')}
                                    </p>
                                    <p className="mt-4 text-muted-foreground leading-relaxed">
                                        {tDetails('content.paragraph2')}
                                    </p>
                                </FadeIn>

                                {/* Features Grid */}
                                <FadeIn delay={0.2}>
                                    <div className="grid sm:grid-cols-2 gap-4 my-8">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
                                            >
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                    <feature.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <span className="font-medium text-foreground">
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>

                                {/* Benefits List */}
                                <FadeIn delay={0.3}>
                                    <h2 className="text-2xl font-bold text-foreground font-display mb-4">
                                        {tDetails('benefits.title')}
                                    </h2>
                                    <ul className="space-y-3">
                                        {benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 flex-shrink-0 mt-0.5">
                                                    <Check className="h-4 w-4 text-secondary" />
                                                </div>
                                                <span className="text-muted-foreground">
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </FadeIn>

                                {/* CTA */}
                                <FadeIn delay={0.4}>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <Button asChild size="lg">
                                            <Link href="/dona">
                                                {tCta('donate')}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/contacto">{tCta('contactUs')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">
                                {/* Other Programs */}
                                <FadeIn direction="left">
                                    <div className="bg-card rounded-xl p-6 shadow-sm border">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.otherPrograms')}
                                        </h3>
                                        <ul className="space-y-3">
                                            {otherPrograms.map((prog) => (
                                                <li key={prog.slug}>
                                                    <Link
                                                        href={`/programas/${prog.slug}` as any}
                                                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        <ArrowRight className="h-4 w-4" />
                                                        {prog.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeIn>

                                {/* Donate CTA */}
                                <FadeIn direction="left" delay={0.1}>
                                    <div className="bg-primary rounded-xl p-6 text-white">
                                        <Heart className="h-10 w-10 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">
                                            {tDetails('sidebar.donateTitle')}
                                        </h3>
                                        <p className="text-white/80 mb-4">
                                            {tDetails('sidebar.donateDescription')}
                                        </p>
                                        <Button
                                            asChild
                                            variant="secondary"
                                            className="w-full bg-white text-primary hover:bg-white/90"
                                        >
                                            <Link href="/dona">{tCta('donate')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>

                                {/* Contact */}
                                <FadeIn direction="left" delay={0.2}>
                                    <div className="bg-muted/50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.contactTitle')}
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            {tDetails('sidebar.contactDescription')}
                                        </p>
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/contacto">{tCta('contactUs')}</Link>
                                        </Button>
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

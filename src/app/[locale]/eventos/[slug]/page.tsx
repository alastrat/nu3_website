import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { EventCountdown } from '@/components/ui/event-countdown';
import { Button } from '@/components/ui/button';
import { Link, routing } from '@/i18n/routing';
import { Calendar, MapPin, Clock, Users, ArrowRight, Share2 } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Events data
const eventsData: Record<string, { image: string; date: Date; location: string; time: string; capacity: number }> = {
    'jornada-nutricional-2024': {
        image: '/images/event-details.jpg',
        date: new Date('2025-03-15T09:00:00'),
        location: 'Centro Integral nu3, Bogotá',
        time: '9:00 AM - 4:00 PM',
        capacity: 200,
    },
    'taller-huertas-productivas': {
        image: '/images/event-details.jpg',
        date: new Date('2025-03-22T10:00:00'),
        location: 'Soacha, Cundinamarca',
        time: '10:00 AM - 2:00 PM',
        capacity: 50,
    },
    'capacitacion-madres-lactantes': {
        image: '/images/event-details.jpg',
        date: new Date('2025-04-05T14:00:00'),
        location: 'Centro Integral nu3',
        time: '2:00 PM - 5:00 PM',
        capacity: 30,
    },
    'feria-alimentos-saludables': {
        image: '/images/event-details.jpg',
        date: new Date('2025-04-12T08:00:00'),
        location: 'Parque de la 93, Bogotá',
        time: '8:00 AM - 6:00 PM',
        capacity: 500,
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(eventsData);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const event = eventsData[slug];

    if (!event) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'events' });

    return {
        title: `${t(`items.${slug}.title`)} - nu3`,
        description: t(`items.${slug}.description`),
    };
}

export default async function EventDetailsPage({ params }: Props) {
    const { locale, slug } = await params;
    const event = eventsData[slug];

    if (!event) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'events' });
    const tDetails = await getTranslations({ locale, namespace: 'eventDetails' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });

    const title = t(`items.${slug}.title`);
    const description = t(`items.${slug}.description`);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(locale === 'es' ? 'es-CO' : locale === 'fr' ? 'fr-FR' : 'en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Get other events for sidebar
    const otherEvents = Object.entries(eventsData)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key, value]) => ({
            slug: key,
            title: t(`items.${key}.title`),
            date: formatDate(value.date),
        }));

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={title}
                    items={[
                        { label: tDetails('breadcrumb.events'), href: '/eventos' },
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
                                            src={event.image}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </FadeIn>

                                {/* Countdown */}
                                <FadeIn delay={0.1}>
                                    <div className="bg-muted/30 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4 text-center">
                                            {tDetails('countdown.title')}
                                        </h3>
                                        <EventCountdown
                                            targetDate={event.date}
                                            className="justify-center"
                                        />
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.2}>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                        {title}
                                    </h1>

                                    {/* Event Info */}
                                    <div className="flex flex-wrap gap-6 mt-6 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-primary" />
                                            <span>{event.capacity} {tDetails('capacity')}</span>
                                        </div>
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.3}>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('content.paragraph1')}
                                        </p>

                                        <h2 className="text-2xl font-bold text-foreground font-display mt-8 mb-4">
                                            {tDetails('whatToExpect.title')}
                                        </h2>
                                        <ul className="space-y-2">
                                            <li className="text-muted-foreground">{tDetails('whatToExpect.item1')}</li>
                                            <li className="text-muted-foreground">{tDetails('whatToExpect.item2')}</li>
                                            <li className="text-muted-foreground">{tDetails('whatToExpect.item3')}</li>
                                            <li className="text-muted-foreground">{tDetails('whatToExpect.item4')}</li>
                                        </ul>

                                        <h2 className="text-2xl font-bold text-foreground font-display mt-8 mb-4">
                                            {tDetails('requirements.title')}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('requirements.description')}
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* CTA */}
                                <FadeIn delay={0.4}>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <Button size="lg">
                                            {tDetails('registerButton')}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="lg">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            {tDetails('shareButton')}
                                        </Button>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">
                                {/* Quick Info */}
                                <FadeIn direction="left">
                                    <div className="bg-primary rounded-xl p-6 text-white">
                                        <h3 className="text-xl font-bold mb-4">
                                            {tDetails('quickInfo.title')}
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-medium block">{tDetails('quickInfo.date')}</span>
                                                    <span className="text-white/80 text-sm">{formatDate(event.date)}</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-medium block">{tDetails('quickInfo.time')}</span>
                                                    <span className="text-white/80 text-sm">{event.time}</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="font-medium block">{tDetails('quickInfo.location')}</span>
                                                    <span className="text-white/80 text-sm">{event.location}</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <Button
                                            className="w-full mt-6 bg-white text-primary hover:bg-white/90"
                                        >
                                            {tDetails('registerButton')}
                                        </Button>
                                    </div>
                                </FadeIn>

                                {/* Other Events */}
                                <FadeIn direction="left" delay={0.1}>
                                    <div className="bg-card rounded-xl p-6 shadow-sm border">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.otherEvents')}
                                        </h3>
                                        <ul className="space-y-4">
                                            {otherEvents.map((evt) => (
                                                <li key={evt.slug}>
                                                    <Link
                                                        href={`/eventos/${evt.slug}` as any}
                                                        className="block group"
                                                    >
                                                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                            {evt.title}
                                                        </h4>
                                                        <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {evt.date}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
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

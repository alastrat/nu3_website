'use client';

import { useTranslations } from 'next-intl';
import { EventCard } from '@/components/ui/event-card';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const DEMO_EVENTS = [
    {
        id: '1',
        slug: 'jornada-nutricional-2024',
        image: '/images/real_images/evento-auditorio.jpg',
        date: { day: '15', month: 'Feb' },
        venue: 'Centro Integral nu3, Barranquilla, Colombia',
    },
    {
        id: '2',
        slug: 'taller-huertas-productivas',
        image: '/images/real_images/HUERTA_BANNER.jpg',
        date: { day: '22', month: 'Feb' },
        venue: 'Sede Atlántico, Colombia',
    },
    {
        id: '3',
        slug: 'capacitacion-madres-lactantes',
        image: '/images/real_images/madresgestantes-1.jpg',
        date: { day: '28', month: 'Feb' },
        venue: 'Centro Integral nu3, Barranquilla, Colombia',
    },
    {
        id: '4',
        slug: 'feria-alimentos-saludables',
        image: '/images/real_images/Primera-Infancia.jpg',
        date: { day: '05', month: 'Mar' },
        venue: 'Plaza Central, Barranquilla, Colombia',
    },
];

export function EventsSection() {
    const t = useTranslations();

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                    <div className="flex-1">
                        <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                            {t('events.section.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('events.section.title')}
                        </h2>
                    </div>

                    <Link
                        href="/eventos"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors group"
                    >
                        {t('events.section.viewAll')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DEMO_EVENTS.map((event) => (
                        <EventCard
                            key={event.id}
                            slug={event.slug}
                            image={event.image}
                            date={event.date}
                            title={t(`events.items.${event.slug}.title`)}
                            description={t(`events.items.${event.slug}.description`)}
                            venue={event.venue}
                        />
                    ))}
                </div>
            </div>

            {/* Vector decorations */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 C200,80 400,80 600,40 C800,0 1000,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-white" />
                </svg>
            </div>
        </section>
    );
}

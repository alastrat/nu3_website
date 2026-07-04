'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import 'swiper/css';

const SERVICES = [
    { key: 'finishes', slug: 'acabados-externos-internos', image: '/images/renovaplus/foto2-acabados.jpg' },
    { key: 'urbanism', slug: 'urbanismo-mantenimiento', image: '/images/renovaplus/foto3-urbanismo.jpg' },
    { key: 'remodeling', slug: 'remodelacion-espacios', image: '/images/renovaplus/remodelacion.jpg' },
    { key: 'consulting', slug: 'interventorias-asesorias', image: '/images/renovaplus/interventorias.jpg' },
] as const;

export function ServicesSlider() {
    const t = useTranslations('programs');
    const tCta = useTranslations('cta');
    const tPag = useTranslations('pagination');
    const swiperRef = useRef<SwiperType | null>(null);

    // SEO / GEO: structured data describing the services RenovaPlus offers
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('title'),
        itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Service',
                name: t(`${s.key}.title`),
                description: t(`${s.key}.description`),
                serviceType: t(`${s.key}.title`),
                areaServed: { '@type': 'City', name: 'Barranquilla, Atlántico, Colombia' },
                provider: {
                    '@type': 'GeneralContractor',
                    name: 'RenovaPlus S.A.S.',
                    areaServed: 'Barranquilla, Atlántico, Colombia',
                },
            },
        })),
    };

    return (
        <section aria-labelledby="services-heading" className="overflow-hidden bg-muted/30 py-20 md:py-28">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary">
                        {t('subtitle')}
                    </p>
                    <h2
                        id="services-heading"
                        className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        {t('title')}
                    </h2>
                </FadeIn>

                <div className="mt-12">
                    <Swiper
                        onBeforeInit={(s) => {
                            swiperRef.current = s;
                        }}
                        modules={[Navigation]}
                        slidesPerView={1.15}
                        spaceBetween={24}
                        breakpoints={{
                            640: { slidesPerView: 2.1 },
                            1024: { slidesPerView: 3.1 },
                            1280: { slidesPerView: 3.4 },
                        }}
                        className="!overflow-visible"
                    >
                        {SERVICES.map((service) => (
                            <SwiperSlide key={service.key}>
                                <Link
                                    href="/contacto"
                                    aria-label={`${t(`${service.key}.title`)} — ${tCta('learnMore')}`}
                                    className="group relative block h-[440px] overflow-hidden rounded-2xl shadow-sm"
                                >
                                    <Image
                                        src={service.image}
                                        alt={`${t(`${service.key}.title`)} — RenovaPlus, renovación y remodelación en Barranquilla`}
                                        fill
                                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-black/65" />

                                    <div className="absolute inset-x-0 top-0 p-7">
                                        <p className="mb-2 text-sm font-medium text-white/80">
                                            {t(`${service.key}.eyebrow`)}
                                        </p>
                                        <h3 className="max-w-[15ch] font-display text-2xl font-bold leading-tight text-white">
                                            {t(`${service.key}.title`)}
                                        </h3>
                                    </div>

                                    <span className="absolute bottom-6 left-7 inline-flex translate-y-1 items-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        {tCta('learnMore')}
                                        <ArrowUpRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation arrows */}
                    <div className="mt-8 flex items-center justify-center gap-3 lg:justify-end">
                        <button
                            type="button"
                            aria-label={tPag('previous')}
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label={tPag('next')}
                            onClick={() => swiperRef.current?.slideNext()}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DonationCard } from '@/components/ui/donation-card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

interface DonationsCarouselProps {
    locale: string;
}

const DEMO_DONATIONS = [
    {
        id: '1',
        slug: 'prevencion-desnutricion',
        image: '/images/real_images/Prevencion-de-la-desnutricion-y-recuperacion-nutricional.jpg',
        tag: 'Nutrición',
        raised: 25000,
        goal: 30000,
    },
    {
        id: '2',
        slug: 'primera-infancia',
        image: '/images/real_images/Primera-Infancia.jpg',
        tag: 'Educación',
        raised: 28500,
        goal: 30000,
    },
    {
        id: '3',
        slug: 'madres-gestantes',
        image: '/images/real_images/madresgestantes-1.jpg',
        tag: 'Salud',
        raised: 15000,
        goal: 30000,
    },
    {
        id: '4',
        slug: 'adultos-mayores',
        image: '/images/real_images/ADULTOMAYOR.jpg',
        tag: 'Apoyo',
        raised: 19200,
        goal: 30000,
    },
    {
        id: '5',
        slug: 'huertas-productivas',
        image: '/images/real_images/HUERTA_BANNER.jpg',
        tag: 'Emprendimiento',
        raised: 24000,
        goal: 30000,
    },
];

export function DonationsCarousel({ locale }: DonationsCarouselProps) {
    const t = useTranslations();

    return (
        <section
            className="py-20 overflow-hidden relative"
            style={{
                backgroundImage: 'url(/images/service-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#FDF6F0'
            }}
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                    <div className="flex-1">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                            {t('donations.section.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('donations.section.title')}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Active Donors Badge */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center -space-x-2">
                                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <Image src="/images/reviewer-new-1.jpg" alt="Donor" fill className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <Image src="/images/reviewer-new-2.jpg" alt="Donor" fill className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <Image src="/images/reviewer-new-3.jpg" alt="Donor" fill className="object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white font-bold text-sm">
                                    2M
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                {t('donations.activeDonors')}
                            </span>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button
                                className="swiper-donations-prev w-12 h-12 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Previous donation"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                className="swiper-donations-next w-12 h-12 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Next donation"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-donations-prev',
                        nextEl: '.swiper-donations-next',
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                    className="!overflow-visible"
                >
                    {DEMO_DONATIONS.map((donation) => (
                        <SwiperSlide key={donation.id}>
                            <DonationCard
                                image={donation.image}
                                tag={donation.tag}
                                title={t(`donations.items.${donation.slug}.title`)}
                                description={t(`donations.items.${donation.slug}.description`)}
                                raised={donation.raised}
                                goal={donation.goal}
                                slug={donation.slug}
                                locale={locale}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

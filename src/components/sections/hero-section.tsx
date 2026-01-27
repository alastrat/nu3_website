'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const HERO_SLIDES = [
    {
        id: 1,
        image: '/images/real_images/1.png',
        subtitle: 'hero.slides.slide1.subtitle',
        title: 'hero.slides.slide1.title',
        description: 'hero.slides.slide1.description',
        cta: 'hero.slides.slide1.cta',
        ctaLink: '/dona',
    },
    {
        id: 2,
        image: '/images/real_images/383A8599-scaled.jpg',
        subtitle: 'hero.slides.slide2.subtitle',
        title: 'hero.slides.slide2.title',
        description: 'hero.slides.slide2.description',
        cta: 'hero.slides.slide2.cta',
        ctaLink: '/programas',
    },
    {
        id: 3,
        image: '/images/real_images/BANNER-2.jpg',
        subtitle: 'hero.slides.slide3.subtitle',
        title: 'hero.slides.slide3.title',
        description: 'hero.slides.slide3.description',
        cta: 'hero.slides.slide3.cta',
        ctaLink: '/apadrina',
    },
];

export function HeroSection() {
    const t = useTranslations();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <section className="relative bg-white">
            <div className="relative">
                {/* Main Slider */}
                <Swiper
                    modules={[Navigation, Autoplay, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop
                    className="hero-main-swiper"
                >
                    {HERO_SLIDES.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[650px]">
                                {/* Background Image */}
                                <Image
                                    src={slide.image}
                                    alt={t(slide.title)}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === 1}
                                />

                                {/* Content */}
                                <div className="container mx-auto px-4 relative z-10 h-full min-h-[500px] md:min-h-[600px] lg:min-h-[650px] flex items-center">
                                    <div className="row items-center w-full">
                                        <div className="w-full md:w-7/12">
                                            <div className="text-white py-12 md:py-20 animate__animated animate__fadeInUp">
                                                {/* Subtitle */}
                                                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
                                                    {t(slide.subtitle)}
                                                </span>

                                                {/* Title */}
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                                    {t(slide.title)}
                                                </h1>

                                                {/* Description */}
                                                <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl leading-relaxed">
                                                    {t(slide.description)}
                                                </p>

                                                {/* CTA Button */}
                                                <Link
                                                    href={slide.ctaLink}
                                                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
                                                >
                                                    <ArrowRight className="w-5 h-5" />
                                                    {t(slide.cta)}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 py-4">
                            {/* Previous Button */}
                            <button
                                className="hero-prev w-12 h-12 flex-shrink-0 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Thumbnails Slider */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[Navigation, Thumbs]}
                                spaceBetween={12}
                                slidesPerView={3}
                                watchSlidesProgress
                                navigation={{
                                    prevEl: '.hero-prev',
                                    nextEl: '.hero-next',
                                }}
                                className="hero-thumbs-swiper flex-1"
                            >
                                {HERO_SLIDES.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div className="relative h-16 md:h-20 rounded-lg overflow-hidden cursor-pointer group">
                                            <Image
                                                src={slide.image}
                                                alt=""
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Next Button */}
                            <button
                                className="hero-next w-12 h-12 flex-shrink-0 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx global>{`
        .hero-thumbs-swiper .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        
        .hero-thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
      `}</style>
        </section>
    );
}

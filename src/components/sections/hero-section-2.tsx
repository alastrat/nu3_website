'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { CtaButton } from '@/components/ui/cta-button';

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
        image: '/images/real_images/nu3-banner-2024.jpg',
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

export function HeroSection2() {
    const t = useTranslations();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const mainSwiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="hero-section-2">
            {/* Main Container */}
            <div className="hero-container">
                {/* Slider with overflow hidden and border-radius */}
                <div className="hero-slider-wrapper">
                    <Swiper
                        modules={[Navigation, Autoplay, Thumbs]}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        spaceBetween={0}
                        onSwiper={(swiper) => {
                            mainSwiperRef.current = swiper;
                        }}
                        className="hero-swiper"
                    >
                        {HERO_SLIDES.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="hero-slide">
                                    <Image
                                        src={slide.image}
                                        alt={t(slide.title)}
                                        fill
                                        className="hero-slide-bg"
                                        priority={slide.id === 1}
                                        sizes="100vw"
                                    />
                                    <div className="hero-slide-overlay" />
                                    <div className="hero-slide-content">
                                        <span className="hero-subtitle">
                                            {t(slide.subtitle)}
                                        </span>
                                        <h1 className="hero-title">
                                            {t(slide.title)}
                                        </h1>
                                        <p className="hero-description">
                                            {t(slide.description)}
                                        </p>
                                        <CtaButton 
                                            href={slide.ctaLink} 
                                            variant="outline"
                                        >
                                            {t(slide.cta)}
                                        </CtaButton>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    </div>

                {/* Navigation bar with notch effect */}
                <div className="hero-nav-container">
                    <div className="hero-nav-notch-left" />
                    <div className="hero-navigation">
                        <button 
                            className="hero-nav-btn"
                            onClick={() => mainSwiperRef.current?.slidePrev()}
                            aria-label="Previous slide"
                        >
                            <Image src="/images/left-arrow.svg" alt="" width={40} height={8} />
                        </button>
                        <div className="hero-thumbs">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[Thumbs]}
                                slidesPerView={3}
                                spaceBetween={8}
                                slideToClickedSlide={true}
                                loop={false}
                                speed={1000}
                                watchSlidesProgress={true}
                                className="hero-thumbs-swiper"
                            >
                                {HERO_SLIDES.map((slide) => (
                                    <SwiperSlide key={`thumb-${slide.id}`}>
                                        <Image 
                                            src={slide.image} 
                                            alt="" 
                                            width={40} 
                                            height={40}
                                            className="hero-thumb-img"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <button 
                            className="hero-nav-btn"
                            onClick={() => mainSwiperRef.current?.slideNext()}
                            aria-label="Next slide"
                        >
                            <Image src="/images/right-arrow.svg" alt="" width={40} height={8} />
                        </button>
                    </div>
                    <div className="hero-nav-notch-right" />
                </div>
            </div>

            <style jsx global>{`
                .hero-section-2 {
                    max-width: 96vw;
                    max-width: min(96vw, 1845px);
                    margin: 0 auto;
                    padding: 0;
                }
                
                @media (max-width: 991px) {
                    .hero-section-2 {
                        margin: 0 15px;
                        max-width: calc(100% - 30px);
                    }
                }
                
                .hero-container {
                    position: relative;
                }
                
                /* Slider wrapper with reliable rounded corners */
                .hero-slider-wrapper {
                    border-radius: clamp(24px, 3vw, 40px);
                    overflow: hidden;
                    position: relative;
                }
                
                .hero-swiper {
                    width: 100%;
                }
                
                .hero-slide {
                    position: relative;
                    padding: clamp(100px, 12vw, 220px) clamp(20px, 4vw, 60px);
                    padding-bottom: clamp(120px, 14vw, 260px);
                    min-height: 520px;
                    height: 520px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                
                @media (min-width: 768px) {
                    .hero-slide {
                        min-height: 600px;
                        height: 600px;
                    }
                }
                
                @media (min-width: 1200px) {
                    .hero-slide {
                        min-height: 700px;
                        height: 700px;
                    }
                }
                
                .hero-slide-bg {
                    position: absolute !important;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }
                
                .hero-slide-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(102deg, oklch(from var(--primary) l c h / 0.9) 2%, oklch(from var(--primary) l c h / 0.1) 99%);
                    z-index: 1;
                }
                
                .hero-slide-content {
                    position: relative;
                    z-index: 2;
                    max-width: 650px;
                    color: white;
                }
                
                .hero-subtitle {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    font-size: clamp(10px, 0.75vw, 14px);
                    margin-bottom: clamp(12px, 1.2vw, 22px);
                }
                
                .hero-subtitle::before {
                    content: "";
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                }
                
                .hero-title {
                    font-family: var(--font-quicksand), 'Quicksand', sans-serif;
                    font-weight: 700;
                    font-size: clamp(30px, 4vw, 72px);
                    line-height: 1.15;
                    margin: 0 0 clamp(16px, 1.4vw, 26px) 0;
                }
                
                .hero-description {
                    font-size: clamp(14px, 1vw, 18px);
                    line-height: 1.65;
                    opacity: 0.92;
                    margin: 0 0 clamp(24px, 2.2vw, 42px) 0;
                    max-width: 520px;
                }
                
                /* Navigation with notch effect */
                .hero-nav-container {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                    display: flex;
                    align-items: flex-end;
                }
                
                .hero-nav-notch-left,
                .hero-nav-notch-right {
                    width: clamp(20px, 2vw, 30px);
                    height: clamp(20px, 2vw, 30px);
                    background: white;
                    position: relative;
                }
                
                .hero-nav-notch-left::before,
                .hero-nav-notch-right::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                }
                
                .hero-nav-notch-left::before {
                    right: 0;
                    border-radius: 0 0 clamp(20px, 2vw, 30px) 0;
                    box-shadow: clamp(10px, 1vw, 15px) clamp(10px, 1vw, 15px) 0 0 white;
                }
                
                .hero-nav-notch-right::before {
                    left: 0;
                    border-radius: 0 0 0 clamp(20px, 2vw, 30px);
                    box-shadow: clamp(-15px, -1vw, -10px) clamp(10px, 1vw, 15px) 0 0 white;
                }
                
                .hero-navigation {
                    display: flex;
                    align-items: center;
                    gap: clamp(10px, 1vw, 16px);
                    background: white;
                    padding: clamp(10px, 0.9vw, 14px) clamp(16px, 1.4vw, 24px);
                    border-radius: clamp(20px, 2vw, 30px) clamp(20px, 2vw, 30px) 0 0;
                }
                
                .hero-nav-btn {
                    padding: 4px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: transform 0.2s;
                }
                
                .hero-nav-btn:hover {
                    transform: scale(1.1);
                }
                
                .hero-nav-btn img {
                    width: clamp(28px, 2vw, 40px);
                    height: auto;
                }
                
                .hero-thumbs {
                    width: clamp(120px, 10vw, 160px);
                }
                
                .hero-thumbs-swiper .swiper-slide {
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                }
                
                .hero-thumb-img {
                    width: clamp(32px, 2.2vw, 42px) !important;
                    height: clamp(32px, 2.2vw, 42px) !important;
                    border-radius: 50%;
                    object-fit: cover;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                .hero-thumbs-swiper .swiper-slide-thumb-active .hero-thumb-img {
                    opacity: 1;
                    transform: scale(1.15);
                    border-color: oklch(from var(--primary) l c h);
                }
            `}</style>
        </section>
    );
}

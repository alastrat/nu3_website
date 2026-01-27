'use client';

import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/cta-button';

import 'swiper/css';
import 'swiper/css/navigation';

export function TestimonialsCarousel() {
    const t = useTranslations('testimonials');
    const tCta = useTranslations('cta');

    const testimonials = ['testimonial1', 'testimonial2', 'testimonial3', 'testimonial4', 'testimonial5'];

    return (
        <section className="ul-testimonial-2 ul-section-spacing">
            <div className="ul-container wow animate__fadeInUp">
                <div className="ul-section-heading">
                    <div>
                        <span className="ul-section-sub-title">{t('section.subtitle')}</span>
                        <h2 className="ul-section-title">{t('section.title')}</h2>
                    </div>
                    <CtaButton href="/testimonios" variant="primary">
                        {tCta('learnMore')}
                    </CtaButton>
                </div>

                <div className="testimonials-row justify-center ul-testimonial-2-row gy-4">
                    {/* card */}
                    <div className="testimonials-col-md-4">
                        <div className="ul-testimonial-2-overview">
                            <span className="rating">{t('overview.title')}</span>
                            <div className="ul-testimonial-2-overview-stars flex justify-center gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                                <Star className="w-5 h-5 fill-current opacity-50" />
                            </div>
                            <p className="ul-testimonial-2-overview-descr">
                                {t('overview.description')}
                            </p>
                        </div>
                    </div>

                    {/* txt */}
                    <div className="testimonials-col-md-8">
                        <div className="ul-testimonial-2-slider swiper relative">
                <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={30}
                    slidesPerView={1}
                                navigation={{
                                    prevEl: '.ul-testimonial-2-prev',
                                    nextEl: '.ul-testimonial-2-next',
                    }}
                    autoplay={{
                                    delay: 5000,
                        disableOnInteraction: false,
                    }}
                                loop={true}
                            >
                                {testimonials.map((key, index) => (
                                    <SwiperSlide key={key}>
                                        <div className="ul-review ul-review-2">
                                            <span className="icon">
                                                <Quote className="w-16 h-16 fill-current rotate-180" />
                                            </span>
                                            <p className="ul-review-descr">
                                                {t(`items.${key}.text`)}
                                            </p>
                                            <div className="ul-review-bottom">
                                                <div className="ul-review-reviewer flex items-center gap-4">
                                                    <div className="reviewer-image relative w-[70px] h-[70px] rounded-full overflow-hidden">
                                            <Image
                                                            src={`/images/reviewer-new-${(index % 4) + 1}.jpg`}
                                                            alt={t(`items.${key}.name`)}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                                        <h3 className="reviewer-name">{t(`items.${key}.name`)}</h3>
                                                        <span className="reviewer-role">{t(`items.${key}.role`)}</span>
                                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                            <div className="ul-testimonial-2-slider-nav flex gap-4 absolute bottom-0 right-0 z-10 bg-white">
                                <button className="ul-testimonial-2-prev w-[50px] h-[50px] border border-black rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button className="ul-testimonial-2-next w-[50px] h-[50px] border border-black rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .ul-section-spacing {
                    padding-top: clamp(60px, 6.31vw, 120px);
                    padding-bottom: clamp(60px, 6.31vw, 120px);
                }

                .ul-container {
                    --container-space-x: 30px;
                    max-width: calc(clamp(1200px, 74.09vw, 1410px) + var(--container-space-x));
                    padding-left: calc(var(--container-space-x) / 2);
                    padding-right: calc(var(--container-space-x) / 2);
                    margin: auto;
                }

                .ul-section-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 30px;
                    margin-bottom: clamp(20px, 2.1vw, 40px);
                }

                .ul-section-sub-title {
                    color: oklch(from var(--primary) l c h);
                    display: inline-block;
                    letter-spacing: -0.03em;
                    font-weight: 500;
                    line-height: 1.5;
                    position: relative;
                    margin-bottom: clamp(11px, 0.74vw, 14px);
                }

                .ul-section-sub-title::before {
                    content: "";
                    width: clamp(9px, 0.63vw, 12px);
                    aspect-ratio: 12/13;
                    background-color: oklch(from var(--primary) l c h);
                    display: inline-block;
                    margin-right: clamp(5px, 0.42vw, 8px);
                    clip-path: polygon(50% 100%, 0 0, 100% 0);
                    transform: rotate(180deg);
                }

                .ul-section-title {
                    font-weight: 700;
                    font-size: clamp(25px, 2.63vw, 50px);
                    color: #1E252F;
                    margin-bottom: clamp(5px, 0.42vw, 8px);
                    letter-spacing: -0.04em;
                    font-family: var(--font-quicksand);
                }

                /* Overview Card */
                .ul-testimonial-2-overview {
                    background-color: #F5F0E2;
                    text-align: center;
                    padding: clamp(25px, 2.36vw, 45px) clamp(18px, 1.89vw, 36px);
                    border-radius: clamp(15px, 1.58vw, 30px);
                    height: 100%;
                }

                .rating {
                    display: block;
                    font-size: clamp(32px, 2.5vw, 48px);
                    font-weight: 700;
                    font-family: var(--font-quicksand);
                    line-height: 1.2;
                    margin-bottom: clamp(15px, 1.58vw, 30px);
                    color: #1E252F;
                }

                .ul-testimonial-2-overview-stars {
                    font-size: clamp(20px, 1.31vw, 25px);
                    color: #FFA31A;
                    margin-bottom: clamp(15px, 1.16vw, 22px);
                }

                .ul-testimonial-2-overview-title {
                    color: #4B5563;
                    display: block;
                    margin-bottom: clamp(15px, 1.16vw, 22px);
                    font-weight: 500;
                }

                .ul-testimonial-2-overview-descr {
                    color: #4B5563;
                    line-height: 1.6;
                }

                /* Slider */
                .ul-testimonial-2-slider {
                    margin-left: clamp(16px, 2.94vw, 56px);
                    height: 100%;
                }

                .ul-review-2 {
                    padding: 0;
                }

                .ul-review-2 .icon {
                    font-size: clamp(57px, 4.31vw, 82px);
                    color: oklch(from var(--primary) l c h);
                    display: flex;
                    margin-bottom: clamp(2px, 0.26vw, 5px);
                }

                .ul-review-descr {
                    font-size: clamp(17px, 1.05vw, 20px);
                    font-style: italic;
                    font-weight: 500;
                    line-height: 1.6;
                    color: #4B5563;
                    margin-bottom: clamp(22px, 1.94vw, 37px);
                }

                .ul-review-descr::before {
                    content: open-quote;
                }
                .ul-review-descr::after {
                    content: close-quote;
                }

                .reviewer-name {
                    font-family: var(--font-quicksand);
                    font-weight: 700;
                    font-size: clamp(22px, 1.68vw, 32px);
                    padding-top: 0;
                    margin-bottom: 0;
                    color: #1E252F;
                }

                .reviewer-role {
                    color: #4B5563;
                    font-size: 16px;
                }

                @media screen and (max-width: 991px) {
                    .ul-section-heading {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                    }
                    
                    .ul-testimonial-2-slider {
                        margin-left: 0;
                        margin-top: 40px;
                    }

                    .ul-testimonial-2-slider-nav {
                        position: relative;
                        margin-top: 30px;
                    }
                }

                /* Bootstrap Grid System mimic */
                .testimonials-row {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: calc(-1 * var(--bs-gutter-y));
                    margin-right: calc(-.5 * var(--bs-gutter-x));
                    margin-left: calc(-.5 * var(--bs-gutter-x));
                }
                .testimonials-row > * {
                    flex-shrink: 0;
                    width: 100%;
                    max-width: 100%;
                    padding-right: calc(var(--bs-gutter-x) * .5);
                    padding-left: calc(var(--bs-gutter-x) * .5);
                    margin-top: var(--bs-gutter-y);
                }
                .gy-4 {
                    --bs-gutter-y: 1.5rem;
                }
                @media (min-width: 768px) {
                    .testimonials-col-md-4 {
                        flex: 0 0 auto;
                        width: 33.33333333%;
                    }
                    .testimonials-col-md-8 {
                        flex: 0 0 auto;
                        width: 66.66666667%;
                    }
        }
      `}</style>
        </section>
    );
}

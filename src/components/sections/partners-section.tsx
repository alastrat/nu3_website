'use client';

import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// Partner/ally names from nu3.co - replace with actual logos when available
const PARTNERS = [
    { id: 1, name: 'Fundación Éxito' },
    { id: 2, name: 'Alcaldía de Barranquilla' },
    { id: 3, name: 'Gobernación del Atlántico' },
    { id: 4, name: 'ICBF' },
    { id: 5, name: 'MinSalud' },
    { id: 6, name: 'ONU' },
    { id: 7, name: 'USAID' },
    { id: 8, name: 'Fundación Santo Domingo' },
];

const RECOGNITIONS = [
    { id: 1, name: 'Certificación ICONTEC' },
    { id: 2, name: 'Premio Portafolio' },
    { id: 3, name: 'Reconocimiento Social' },
];

export function PartnersSection() {
    const t = useTranslations('partners');

    return (
        <section className="partners-section">
            <div className="partners-container">
                {/* Partners/Allies */}
                <div className="partners-block">
                    <h3 className="partners-title">{t('allies')}</h3>
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                            1280: { slidesPerView: 6 },
                        }}
                        className="partners-swiper"
                    >
                        {PARTNERS.map((partner) => (
                            <SwiperSlide key={partner.id}>
                                <div className="partner-logo">
                                    <span className="logo-placeholder">{partner.name}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Recognitions */}
                <div className="partners-block recognitions">
                    <h3 className="partners-title">{t('recognitions')}</h3>
                    <div className="recognitions-grid">
                        {RECOGNITIONS.map((recognition) => (
                            <div key={recognition.id} className="partner-logo">
                                <span className="logo-placeholder">{recognition.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .partners-section {
                    padding: clamp(40px, 5vw, 80px) 0;
                    background-color: #f8f9fa;
                }

                .partners-container {
                    max-width: calc(clamp(1200px, 74.09vw, 1410px) + 30px);
                    padding-left: 15px;
                    padding-right: 15px;
                    margin: auto;
                }

                .partners-block {
                    margin-bottom: 40px;
                }

                .partners-block:last-child {
                    margin-bottom: 0;
                }

                .partners-title {
                    text-align: center;
                    font-size: clamp(14px, 1vw, 16px);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #6b7280;
                    margin-bottom: 30px;
                    font-family: var(--font-quicksand);
                }

                .partners-swiper {
                    padding: 10px 0;
                }

                .partner-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px 20px;
                    height: 80px;
                    background: white;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .partner-logo:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .logo-placeholder {
                    font-size: 13px;
                    font-weight: 600;
                    color: #9ca3af;
                    text-align: center;
                    font-family: var(--font-quicksand);
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .partner-logo:hover .logo-placeholder {
                    color: #4b5563;
                }

                .recognitions-grid {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .recognitions .partner-logo {
                    height: 70px;
                    min-width: 160px;
                }

                @media (max-width: 768px) {
                    .recognitions-grid {
                        gap: 15px;
                    }
                    
                    .recognitions .partner-logo {
                        min-width: 140px;
                    }
                }
            `}</style>
        </section>
    );
}

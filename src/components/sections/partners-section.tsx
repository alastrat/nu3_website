'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// Partner logos from nu3.co
const PARTNERS = [
    { id: 1, logo: '/images/partners/1.jpg', name: 'Aliado 1' },
    { id: 2, logo: '/images/partners/2.jpg', name: 'Aliado 2' },
    { id: 3, logo: '/images/partners/3.jpg', name: 'Aliado 3' },
    { id: 4, logo: '/images/partners/4.jpg', name: 'Aliado 4' },
    { id: 5, logo: '/images/partners/5.jpg', name: 'Aliado 5' },
    { id: 6, logo: '/images/partners/6.jpg', name: 'Aliado 6' },
    { id: 7, logo: '/images/partners/7.jpg', name: 'Aliado 7' },
    { id: 8, logo: '/images/partners/8.jpg', name: 'Aliado 8' },
    { id: 9, logo: '/images/partners/9.jpg', name: 'Aliado 9' },
    { id: 10, logo: '/images/partners/10.jpg', name: 'Aliado 10' },
    { id: 11, logo: '/images/partners/11.jpg', name: 'Aliado 11' },
    { id: 12, logo: '/images/partners/12.jpg', name: 'Aliado 12' },
    { id: 13, logo: '/images/partners/13.jpg', name: 'Aliado 13' },
    { id: 14, logo: '/images/partners/14.jpg', name: 'Aliado 14' },
    { id: 15, logo: '/images/partners/15.jpg', name: 'Aliado 15' },
    { id: 16, logo: '/images/partners/16.jpg', name: 'Aliado 16' },
    { id: 17, logo: '/images/partners/17.jpg', name: 'Aliado 17' },
    { id: 18, logo: '/images/partners/18.jpg', name: 'Aliado 18' },
    { id: 19, logo: '/images/partners/19.jpg', name: 'Aliado 19' },
    { id: 20, logo: '/images/partners/20.jpg', name: 'Aliado 20' },
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
                        slidesPerView={3}
                        spaceBetween={40}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            480: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 6 },
                            1280: { slidesPerView: 7 },
                        }}
                        className="partners-swiper"
                    >
                        {PARTNERS.map((partner) => (
                            <SwiperSlide key={partner.id}>
                                <div className="partner-logo">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={120}
                                        height={120}
                                        className="logo-img"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .partners-section {
                    padding: clamp(20px, 5vw, 20px) 0;
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
                    padding: 10px;
                    height: 90px;
                    background: white;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .partner-logo:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .logo-img {
                    max-width: 100%;
                    max-height: 70px;
                    width: auto !important;
                    height: auto !important;
                    object-fit: contain;
                    filter: grayscale(100%);
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }

                .partner-logo:hover .logo-img {
                    filter: grayscale(0%);
                    opacity: 1;
                }
            `}</style>
        </section>
    );
}

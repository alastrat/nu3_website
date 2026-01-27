'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/cta-button';
import { FadeIn } from '@/components/animations';

export function AboutSection() {
    const t = useTranslations('about');
    const tCta = useTranslations('cta');

    return (
        <section className="ul-about ul-about-2 ul-section-spacing wow animate__fadeInUp">
            <div className="ul-container">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    {/* Image Column */}
                    <div className="w-full md:w-1/2">
                        <FadeIn direction="left">
                            <div className="ul-about-imgs ul-about-2-img relative">
                                <div className="img-wrapper relative aspect-4/5 overflow-hidden rounded-[999px] rounded-bl-none">
                                    <Image
                                        src="/images/real_images/Portada-Editorialesnu3-1.png"
                                        alt="About nu3"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="ul-about-2-stat">
                                    <span className="number">20+</span>
                                    <span className="txt">{t('years')}</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Text Column */}
                    <div className="w-full md:w-1/2">
                        <FadeIn direction="right">
                            <div className="ul-about-txt">
                                <span className="ul-section-sub-title ul-section-sub-title--2">
                                    {t('title')}
                                </span>
                                <h2 className="ul-section-title">
                                    {t('subtitle')}
                                </h2>
                                <p className="ul-section-descr">
                                    {t('description')}
                                </p>

                                <div className="ul-about-bottom ul-about-2-bottom">
                                    <div className="ul-about-2-bottom-block">
                                        <div className="ul-about-2-bottom-block-icon">
                                            <Image src="/images/mission.svg" alt="Mission" width={40} height={40} />
                                        </div>
                                        <div className="ul-about-2-bottom-block-txt">
                                            <h3 className="ul-about-2-bottom-block-title">{t('mission')}</h3>
                                            <p className="ul-about-2-bottom-block-descr">{t('missionText')}</p>
                                        </div>
                                    </div>

                                    <div className="ul-about-2-bottom-block">
                                        <div className="ul-about-2-bottom-block-icon">
                                            <Image src="/images/vision.svg" alt="Vision" width={40} height={40} />
                                        </div>
                                        <div className="ul-about-2-bottom-block-txt">
                                            <h3 className="ul-about-2-bottom-block-title">{t('vision')}</h3>
                                            <p className="ul-about-2-bottom-block-descr">{t('visionText')}</p>
                                        </div>
                                    </div>
                                </div>

                                <CtaButton href="/quienes-somos" variant="primary">
                                    {tCta('learnMore')}
                                </CtaButton>
                            </div>
                        </FadeIn>
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

                .ul-about-2-stat {
                    background-color: oklch(from var(--primary) l c h);
                    color: white;
                    text-align: center;
                    position: absolute;
                    font-weight: 700;
                    padding: clamp(15px, 1.5vw, 25px) clamp(20px, 2vw, 40px);
                    bottom: clamp(10px, 1.5vw, 30px);
                    right: -20px;
                    border-radius: clamp(15px, 1.05vw, 20px);
                    min-width: clamp(180px, 15vw, 280px);
                    box-shadow: 0 10px 30px oklch(from var(--primary) l c h / 0.3);
                    z-index: 2;
                }

                .ul-about-2-stat .number {
                    font-size: clamp(32px, 3vw, 48px);
                    font-family: var(--font-quicksand), sans-serif;
                    font-weight: 800;
                    line-height: 1;
                    display: block;
                    margin-bottom: 4px;
                }

                .ul-about-2-stat .txt {
                    font-size: clamp(12px, 0.8vw, 14px);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    opacity: 0.9;
                }

                .ul-section-sub-title {
                    color: oklch(from var(--primary) l c h);
                    display: inline-block;
                    letter-spacing: -0.03em;
                    font-weight: 600;
                    line-height: 1.5;
                    position: relative;
                    margin-bottom: clamp(11px, 0.74vw, 14px);
                    text-transform: uppercase;
                    font-size: 14px;
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
                    font-size: clamp(28px, 2.63vw, 48px);
                    color: #1E252F;
                    margin-bottom: clamp(15px, 1.2vw, 24px);
                    letter-spacing: -0.03em;
                    font-family: var(--font-quicksand), sans-serif;
                    line-height: 1.2;
                }

                .ul-section-descr {
                    font-size: clamp(15px, 0.9vw, 18px);
                    margin-bottom: clamp(25px, 2vw, 40px);
                    color: #4B5563;
                    line-height: 1.7;
                }

                .ul-about-2-bottom {
                    display: flex;
                    gap: clamp(20px, 2vw, 40px);
                    margin-bottom: clamp(30px, 2.63vw, 50px);
                }

                .ul-about-2-bottom-block {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .ul-about-2-bottom-block-icon {
                    background-color: #FDF6F0;
                    border-radius: 50%;
                    width: clamp(60px, 4.2vw, 80px);
                    aspect-ratio: 1/1;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                }

                .ul-about-2-bottom-block-title {
                    font-size: clamp(18px, 1.1vw, 20px);
                    font-weight: 700;
                    color: #1E252F;
                    margin-bottom: 4px;
                    font-family: var(--font-quicksand), sans-serif;
                }

                .ul-about-2-bottom-block-descr {
                    font-size: 14px;
                    color: #6B7280;
                    line-height: 1.5;
                    margin-bottom: 0;
                }

                @media (max-width: 768px) {
                    .ul-about-2-bottom {
                        flex-direction: column;
                        gap: 20px;
                    }
                }
            `}</style>
        </section>
    );
}

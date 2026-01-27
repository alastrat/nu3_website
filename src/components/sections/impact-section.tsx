'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Heart, Users, Utensils, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, AnimatedCounter } from '@/components/animations';

const metrics = [
    { key: 'families', value: 50000, icon: Users, suffix: '+' },
    { key: 'children', value: 25000, icon: Heart, suffix: '+' },
    { key: 'meals', value: 1000000, icon: Utensils, suffix: '+' },
    { key: 'years', value: 20, icon: Calendar, suffix: '+' },
] as const;

export function ImpactSection() {
    const t = useTranslations('impact');
    const tCta = useTranslations('cta');

    return (
        <section className="impact-section relative overflow-hidden py-20 md:py-28 pb-32">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div>
                        <FadeIn>
                            <h2 className="impact-title font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                {t('title')}
                            </h2>
                            <p className="impact-subtitle text-lg mb-10">
                                {t('subtitle')}
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {metrics.map((metric, index) => (
                                <FadeIn key={metric.key} delay={index * 0.1}>
                                    <div className="impact-metric">
                                        <div className="impact-metric-icon">
                                            <metric.icon className="h-6 w-6" />
                                        </div>
                                        <div className="impact-metric-value">
                                            <AnimatedCounter
                                                value={metric.value}
                                                suffix={metric.suffix}
                                                duration={2.5}
                                            />
                                        </div>
                                        <div className="impact-metric-label">
                                            {t(metric.key)}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={0.5}>
                            <Button
                                asChild
                                size="lg"
                                className="impact-btn"
                            >
                                <Link href="/dona">
                                    <Heart className="mr-2 h-5 w-5" />
                                    {tCta('donate')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </FadeIn>
                    </div>

                    {/* Right side - Map Image */}
                    <FadeIn direction="left" delay={0.3}>
                        <div className="impact-map-container">
                            <Image
                                src="/images/mapa-impacto.png"
                                alt="Mapa de impacto nu3 en Colombia"
                                width={600}
                                height={655}
                                className="impact-map-img"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Wave Border Bottom */}
            <div className="impact-wave-bottom">
                <svg 
                    viewBox="0 0 1440 60" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M0 30C120 30 120 0 240 0C360 0 360 30 480 30C600 30 600 0 720 0C840 0 840 30 960 30C1080 30 1080 0 1200 0C1320 0 1320 30 1440 30V60H0V30Z" 
                        fill="white"
                    />
                </svg>
            </div>

            <style jsx global>{`
                .impact-section {
                    background-color: #F2F0EC;
                }

                .impact-title {
                    color: #1E252F;
                    font-size: clamp(28px, 2.63vw, 48px) !important;
                    letter-spacing: -0.03em;
                    font-family: var(--font-quicksand), sans-serif;
                    line-height: 1.2;
                }

                .impact-subtitle {
                    color: #6b7280;
                }

                .impact-metric {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }

                .impact-metric-icon {
                    width: 48px;
                    height: 48px;
                    background: var(--nu3-primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .impact-metric-value {
                    font-size: clamp(28px, 3vw, 40px);
                    font-weight: 700;
                    color: #1E252F;
                    font-family: var(--font-quicksand);
                    line-height: 1;
                }

                .impact-metric-label {
                    font-size: 14px;
                    color: #6b7280;
                    font-weight: 500;
                }

                .impact-btn {
                    background-color: var(--nu3-primary) !important;
                    color: white !important;
                    border-radius: 50px;
                    padding: 16px 32px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .impact-btn:hover {
                    background-color: var(--nu3-primary-dark) !important;
                    transform: translateY(-2px);
                }

                .impact-map-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .impact-map-img {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    object-fit: contain;
                }

                .impact-wave-bottom {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    line-height: 0;
                }

                .impact-wave-bottom svg {
                    width: 100%;
                    height: 40px;
                }

                @media (max-width: 1023px) {
                    .impact-map-container {
                        margin-top: 40px;
                    }

                    .impact-map-img {
                        max-width: 350px;
                    }
                }
            `}</style>
        </section>
    );
}

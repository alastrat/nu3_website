'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FadeIn } from '@/components/animations';

export function Model360Section() {
    const t = useTranslations('model360');

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4">
                {/* Title */}
                <FadeIn>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-12 md:mb-16">
                        {t('title')}
                    </h2>
                </FadeIn>

                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Model 360 Diagram */}
                    <FadeIn direction="left">
                        <div className="flex justify-center">
                            <Image
                                src="/images/modelo-360.png"
                                alt="Modelo Integral 360"
                                width={500}
                                height={500}
                                className="w-full max-w-md lg:max-w-lg"
                            />
                        </div>
                    </FadeIn>

                    {/* Right side - Photo and Description */}
                    <FadeIn direction="right">
                        <div className="space-y-6">
                            {/* Family Photo */}
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/real_images/familia-beneficiaria.jpg"
                                    alt="Familia beneficiaria nu3"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            
                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                                {t('description')}
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

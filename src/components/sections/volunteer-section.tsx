'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import Image from 'next/image';
import { CtaButton } from '@/components/ui';

export function VolunteerSection() {
    const t = useTranslations('volunteer');

    return (
        <section className="relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Volunteer Column */}
                <div className="relative bg-primary px-8 py-20 lg:px-20 lg:py-28 text-white overflow-hidden">
                     {/* Background Image with Overlay */}
                     <Image
                        src="/images/renovaplus/workers-site.jpg"
                        alt=""
                        fill
                        className="object-cover opacity-20 mix-blend-overlay"
                    />
                    <FadeIn direction="left" className="relative z-10">
                        <div className="max-w-xl">
                            <h2 className="font-display text-4xl font-bold mb-6 lg:text-5xl">
                                {t('title')}
                            </h2>
                            <p className="text-lg opacity-90 mb-8 leading-relaxed">
                                {t('description')}
                            </p>
                            <ul className="space-y-4 mb-10">
                                {(t.raw('list') as string[]).map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-lg font-medium">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <CtaButton href="/contacto" variant="white">
                                {t('cta')}
                            </CtaButton>
                        </div>
                    </FadeIn>
                </div>

                {/* Donate Column */}
                <div className="relative bg-[#1E252F] px-8 py-20 lg:px-20 lg:py-28 text-white overflow-hidden">
                    {/* Background Image with Overlay */}
                    <Image 
                        src="/images/renovaplus/plans-review.jpg"
                        alt="" 
                        fill 
                        className="object-cover opacity-10"
                    />
                    <FadeIn direction="right" className="relative z-10">
                        <div className="max-w-xl">
                            <h2 className="font-display text-4xl font-bold mb-6 lg:text-5xl">
                                {t('donate.title')}
                            </h2>
                            <p className="text-lg opacity-70 mb-10 leading-relaxed">
                                {t('donate.description')}
                            </p>

                            <CtaButton href="/contacto" variant="white">
                                {t('donate.cta')}
                            </CtaButton>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
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
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
            {/* Background pattern */}
            <div className="absolute inset-0 -z-10 opacity-10">
                <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">
                        {t('subtitle')}
                    </p>
                </FadeIn>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, index) => (
                        <FadeIn key={metric.key} delay={index * 0.1}>
                            <div className="text-center">
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                                    <metric.icon className="h-7 w-7" />
                                </div>
                                <div className="text-4xl font-bold sm:text-5xl">
                                    <AnimatedCounter
                                        value={metric.value}
                                        suffix={metric.suffix}
                                        duration={2.5}
                                    />
                                </div>
                                <div className="mt-2 text-sm text-primary-foreground/80 sm:text-base">
                                    {t(metric.key)}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.5} className="mt-12 text-center">
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="bg-white text-primary hover:bg-white/90"
                    >
                        <Link href="/dona">
                            <Heart className="mr-2 h-5 w-5" />
                            {tCta('donate')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </FadeIn>
            </div>
        </section>
    );
}

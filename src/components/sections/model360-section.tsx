'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Leaf, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const pillars = [
    { key: 'nutrition', icon: Leaf, color: 'bg-green-500' },
    { key: 'education', icon: BookOpen, color: 'bg-blue-500' },
    { key: 'entrepreneurship', icon: Briefcase, color: 'bg-amber-500' },
    { key: 'employability', icon: GraduationCap, color: 'bg-purple-500' },
] as const;

export function Model360Section() {
    const t = useTranslations('model360');

    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Text content */}
                    <FadeIn direction="left">
                        <div className="space-y-6">
                            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                {t('title')}
                            </h2>
                            <p className="text-xl font-medium text-primary">
                                {t('subtitle')}
                            </p>
                            <p className="text-lg text-muted-foreground">
                                {t('description')}
                            </p>
                        </div>
                    </FadeIn>

                    {/* Pillars grid */}
                    <StaggerContainer className="grid grid-cols-2 gap-4">
                        {pillars.map((pillar) => (
                            <StaggerItem key={pillar.key}>
                                <div className="group flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${pillar.color} text-white`}>
                                        <pillar.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {t(`pillars.${pillar.key}`)}
                                    </h3>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}

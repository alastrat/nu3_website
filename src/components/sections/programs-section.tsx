'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Baby, Heart, Users, Leaf, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const programs = [
    {
        key: 'malnutrition',
        icon: Heart,
        href: '/programas/prevencion-desnutricion',
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
    },
    {
        key: 'childhood',
        icon: Baby,
        href: '/programas/primera-infancia',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
    },
    {
        key: 'mothers',
        icon: Users,
        href: '/programas/madres-gestantes',
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
    },
    {
        key: 'elderly',
        icon: Users,
        href: '/programas/adultos-mayores',
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
    },
] as const;

export function ProgramsSection() {
    const t = useTranslations('programs');
    const tCta = useTranslations('cta');

    return (
        <section className="bg-muted/30 py-20 md:py-28">
            <div className="container mx-auto px-4">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </FadeIn>

                <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {programs.map((program) => (
                        <StaggerItem key={program.key}>
                            <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <CardHeader>
                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${program.bgColor}`}>
                                        <program.icon className={`h-6 w-6 ${program.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">
                                        {t(`${program.key}.title`)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <CardDescription className="text-base">
                                        {t(`${program.key}.description`)}
                                    </CardDescription>
                                    <Link
                                        href={program.href}
                                        className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        {tCta('learnMore')}
                                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeIn delay={0.4} className="mt-12 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/programas">
                            {tCta('explore')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </FadeIn>
            </div>
        </section>
    );
}

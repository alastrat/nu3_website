'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    ctaText?: string;
    ctaHref?: string;
    className?: string;
}

export function PricingCard({
    title,
    price,
    period,
    description,
    features,
    popular = false,
    ctaText,
    ctaHref = '/dona',
    className,
}: PricingCardProps) {
    const t = useTranslations('cta');

    return (
        <div
            className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg',
                popular && 'border-primary scale-105 shadow-lg',
                className
            )}
        >
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                        Popular
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground font-display">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    {description}
                </p>
            </div>

            <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{price}</span>
                <span className="text-muted-foreground ml-2">/{period}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5',
                            popular ? 'bg-primary/20' : 'bg-secondary/20'
                        )}>
                            <Check className={cn(
                                'h-3 w-3',
                                popular ? 'text-primary' : 'text-secondary'
                            )} />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                asChild
                className={cn(
                    'w-full',
                    popular ? '' : 'bg-secondary hover:bg-secondary/90'
                )}
                variant={popular ? 'default' : 'secondary'}
            >
                <Link href={ctaHref as any}>
                    {ctaText || t('donate')}
                </Link>
            </Button>
        </div>
    );
}

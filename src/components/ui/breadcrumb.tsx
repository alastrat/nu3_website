'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    title: string;
    items: BreadcrumbItem[];
    backgroundImage?: string;
    backgroundPosition?: string;
    className?: string;
}

export function Breadcrumb({
    title,
    items,
    backgroundImage = '/images/breadcrumb-main.jpg',
    backgroundPosition = 'center',
    className,
}: BreadcrumbProps) {
    const t = useTranslations('breadcrumb');

    return (
        <section
            className={cn(
                'relative py-20 md:py-28 lg:py-32 bg-cover bg-no-repeat',
                className
            )}
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                backgroundPosition,
            }}
        >
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
                        {title}
                    </h1>
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center justify-center gap-2 text-white/80">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-1 hover:text-white transition-colors"
                                >
                                    <Home className="size-4" />
                                    <span>{t('home')}</span>
                                </Link>
                            </li>
                            {items.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <ChevronRight className="size-4 text-white/50" />
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-primary font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
    );
}

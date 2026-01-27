'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    image: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    variant?: 'default' | 'featured';
    className?: string;
}

export function BlogCard({
    image,
    title,
    excerpt,
    date,
    category,
    slug,
    variant = 'default',
    className,
}: BlogCardProps) {
    const t = useTranslations('blog');

    if (variant === 'featured') {
        return (
            <article
                className={cn(
                    'group relative overflow-hidden rounded-2xl bg-card shadow-sm border',
                    className
                )}
            >
                <Link href={`/blog/${slug}` as any} className="block">
                    <div className="grid md:grid-cols-2">
                        <div className="relative aspect-video md:aspect-auto overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <span className="inline-block text-primary font-medium text-sm mb-2">
                                {category}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display group-hover:text-primary transition-colors line-clamp-2">
                                {title}
                            </h2>
                            <p className="mt-4 text-muted-foreground line-clamp-3">
                                {excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-6">
                                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {date}
                                </span>
                                <span className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                    {t('readMore')}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </article>
        );
    }

    return (
        <article
            className={cn(
                'group overflow-hidden rounded-xl bg-card shadow-sm border',
                className
            )}
        >
            <Link href={`/blog/${slug}` as any} className="block">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                            {category}
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {date}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                        {excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        {t('readMore')}
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </Link>
        </article>
    );
}

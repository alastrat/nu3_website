'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    className,
}: PaginationProps) {
    const t = useTranslations('pagination');

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsisStart = currentPage > 3;
        const showEllipsisEnd = currentPage < totalPages - 2;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (showEllipsisStart) {
                pages.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (showEllipsisEnd) {
                pages.push('...');
            }

            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const getPageUrl = (page: number) => {
        if (page === 1) return baseUrl;
        return `${baseUrl}?page=${page}`;
    };

    if (totalPages <= 1) return null;

    return (
        <nav
            aria-label="Pagination"
            className={cn('flex items-center justify-center gap-2', className)}
        >
            {currentPage > 1 ? (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                    aria-label={t('previous')}
                >
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">{t('previous')}</span>
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed">
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">{t('previous')}</span>
                </span>
            )}

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                    typeof page === 'string' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-muted-foreground"
                        >
                            {page}
                        </span>
                    ) : (
                        <Link
                            key={page}
                            href={getPageUrl(page)}
                            className={cn(
                                'min-w-[40px] h-10 flex items-center justify-center rounded-lg border transition-colors',
                                page === currentPage
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border bg-background hover:bg-accent'
                            )}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </Link>
                    )
                )}
            </div>

            {currentPage < totalPages ? (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                    aria-label={t('next')}
                >
                    <span className="hidden sm:inline">{t('next')}</span>
                    <ChevronRight className="size-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed">
                    <span className="hidden sm:inline">{t('next')}</span>
                    <ChevronRight className="size-4" />
                </span>
            )}
        </nav>
    );
}

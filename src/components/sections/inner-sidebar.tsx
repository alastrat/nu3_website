'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Category {
    name: string;
    slug: string;
    count?: number;
}

interface RecentPost {
    title: string;
    slug: string;
    image: string;
    date: string;
}

interface Tag {
    name: string;
    slug: string;
}

interface InnerSidebarProps {
    showSearch?: boolean;
    categories?: Category[];
    categoriesTitle?: string;
    categoriesBaseUrl?: string;
    recentPosts?: RecentPost[];
    recentPostsTitle?: string;
    recentPostsBaseUrl?: string;
    tags?: Tag[];
    tagsTitle?: string;
    tagsBaseUrl?: string;
    className?: string;
    onSearch?: (query: string) => void;
}

export function InnerSidebar({
    showSearch = true,
    categories,
    categoriesTitle,
    categoriesBaseUrl = '/blog/categoria',
    recentPosts,
    recentPostsTitle,
    recentPostsBaseUrl = '/blog',
    tags,
    tagsTitle,
    tagsBaseUrl = '/blog/etiqueta',
    className,
    onSearch,
}: InnerSidebarProps) {
    const t = useTranslations('sidebar');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    return (
        <aside className={cn('space-y-8', className)}>
            {/* Search */}
            {showSearch && (
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">{t('search')}</h3>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            type="search"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" variant="default">
                            <Search className="size-4" />
                        </Button>
                    </form>
                </div>
            )}

            {/* Categories */}
            {categories && categories.length > 0 && (
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">
                        {categoriesTitle || t('categories')}
                    </h3>
                    <ul className="space-y-3">
                        {categories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`${categoriesBaseUrl}/${category.slug}`}
                                    className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <span>{category.name}</span>
                                    {category.count !== undefined && (
                                        <span className="text-sm bg-muted px-2 py-0.5 rounded">
                                            {category.count}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Recent Posts */}
            {recentPosts && recentPosts.length > 0 && (
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">
                        {recentPostsTitle || t('recentPosts')}
                    </h3>
                    <ul className="space-y-4">
                        {recentPosts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`${recentPostsBaseUrl}/${post.slug}`}
                                    className="flex gap-4 group"
                                >
                                    <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h4>
                                        <span className="text-xs text-muted-foreground mt-1 block">
                                            {post.date}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">
                        {tagsTitle || t('tags')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Link key={tag.slug} href={`${tagsBaseUrl}/${tag.slug}`}>
                                <Badge
                                    variant="secondary"
                                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                                >
                                    {tag.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}

'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    image: string;
    title: string;
    category: string;
    slug: string;
    size?: 'default' | 'large';
    className?: string;
}

export function ProjectCard({
    image,
    title,
    category,
    slug,
    size = 'default',
    className,
}: ProjectCardProps) {
    const t = useTranslations('projects');

    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-xl',
                size === 'large' ? 'aspect-[4/3]' : 'aspect-square',
                className
            )}
        >
            <Link href={`/proyectos/${slug}` as any} className="block h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-primary font-medium text-sm mb-2">
                        {category}
                    </span>
                    <h3
                        className={cn(
                            'font-bold text-white font-display group-hover:text-primary transition-colors',
                            size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                        )}
                    >
                        {title}
                    </h3>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
            </Link>
        </article>
    );
}

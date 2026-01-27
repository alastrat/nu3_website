'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DonationCardProps {
    image: string;
    tag: string;
    title: string;
    description: string;
    raised: number;
    goal: number;
    slug: string;
    locale: string;
}

export function DonationCard({
    image,
    tag,
    title,
    description,
    raised,
    goal,
    slug,
    locale,
}: DonationCardProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const percentage = Math.round((raised / goal) * 100);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-[280px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                    {tag}
                </span>
            </div>

            {/* Content */}
            <div className="p-6">

                {/* Title */}
                <Link
                    href={`/dona/${slug}` as any}
                    className="block mb-3 text-xl font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                >
                    {title}
                </Link>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

                {/* CTA Button */}
                <Link
                    href={`/dona/${slug}` as any}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
                >
                    Donar ahora
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

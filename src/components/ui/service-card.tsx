'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
    image: string;
    title: string;
    description: string;
    slug: string;
}

export function ServiceCard({
    image,
    title,
    description,
    slug,
}: ServiceCardProps) {
    const t = useTranslations('cta');

    return (
        <div className="ul-service group">
            <div className="ul-service-corner" />
            <div className="ul-service-img relative z-10">
                <Image
                    src={image}
                    alt={title}
                    width={390}
                    height={253}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="ul-service-txt">
                <h3 className="ul-service-title font-display">
                    <Link href={`/dona/${slug}` as any}>
                        {title}
                    </Link>
                </h3>
                <p className="ul-service-descr">
                    {description}
                </p>
                <Link
                    href={`/dona/${slug}` as any}
                    className="ul-service-btn"
                >
                    <ArrowUpRight className="icon-arrow" />
                    {t('learnMore')}
                </Link>
            </div>

            <style jsx>{`
                .ul-service {
                    background-color: white;
                    padding: clamp(15px, 1.58vw, 30px);
                    border-radius: clamp(7px, 0.53vw, 10px);
                    overflow: hidden;
                    position: relative;
                    z-index: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }

                .ul-service-corner {
                    position: absolute;
                    z-index: 0;
                    top: calc(0% - clamp(50px, 3.68vw, 70px));
                    left: calc(0% - clamp(47px, 3.52vw, 67px));
                    width: clamp(202px, 13.77vw, 262px);
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    background-color: #D9D9D9;
                    transition: 0.4s ease;
                }

                .ul-service:hover .ul-service-corner {
                    background-color: oklch(from var(--primary) l c h);
                }

                .ul-service-img {
                    border-radius: 10px;
                    overflow: hidden;
                    margin-bottom: clamp(16px, 1.26vw, 24px);
                }

                .ul-service-txt {
                    position: relative;
                    z-index: 10;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .ul-service-title {
                    font-size: clamp(18px, 1.26vw, 24px);
                    font-weight: 700;
                    letter-spacing: -1px;
                    margin-bottom: clamp(8px, 0.84vw, 16px);
                    color: #1E252F;
                }

                .ul-service-title :global(a) {
                    color: inherit;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .ul-service-title :global(a:hover) {
                    color: oklch(from var(--primary) l c h);
                }

                .ul-service-descr {
                    color: #4B5563;
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: clamp(10px, 1.05vw, 20px);
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ul-service-btn {
                    display: inline-flex;
                    align-items: center;
                    font-weight: 700;
                    color: oklch(from var(--primary) l c h);
                    gap: clamp(10px, 0.79vw, 15px);
                    text-decoration: none;
                    transition: color 0.3s ease;
                    margin-top: auto;
                }

                .ul-service-btn:hover {
                    color: #1E252F;
                }

                .ul-service-btn :global(.icon-arrow) {
                    width: 18px;
                    height: 18px;
                    transition: transform 0.3s ease;
                }

                .ul-service-btn:hover :global(.icon-arrow) {
                    transform: translate(2px, -2px);
                }
            `}</style>
        </div>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const UNITS_DATA = [
    {
        id: 'menu3',
        image: '/images/real_images/Primera-Infancia.jpg',
        title: 'units.catering.title',
        description: 'units.catering.description',
        link: '/unidades-productivas#menu3',
        size: 'lg'
    },
    {
        id: 'panu3',
        image: '/images/units/bakery.jpg',
        title: 'units.bakery.title',
        description: 'units.bakery.description',
        link: '/unidades-productivas#panu3',
        size: 'sm'
    },
    {
        id: 'outletnu3',
        image: '/images/units/recycling.jpg',
        title: 'units.recycling.title',
        description: 'units.recycling.description',
        link: '/unidades-productivas#outletnu3',
        size: 'sm'
    },
    {
        id: 'tunu3',
        image: '/images/units/sewing.jpg',
        title: 'units.sewing.title',
        description: 'units.sewing.description',
        link: '/unidades-productivas#tunu3',
        size: 'lg'
    }
];

export function UnitsSection() {
    const t = useTranslations();

    return (
        <section className="ul-projects ul-section-spacing">
            <div className="ul-container">
                <div className="ul-section-heading text-center justify-content-center flex flex-col items-center mb-12">
                    <div>
                        <span className="ul-section-sub-title">{t('units.subtitle')}</span>
                        <h2 className="ul-section-title">{t('units.title')}</h2>
                    </div>
                </div>

                <div className="units-row justify-content-center">
                    {/* First Row */}
                    <div className="units-col-lg-8 units-col-md-6 units-col-10 units-col-xxs-12">
                        <div className="ul-project">
                            <div className="ul-project-img relative">
                                <Image 
                                    src={UNITS_DATA[0].image} 
                                    alt={t(UNITS_DATA[0].title)} 
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: 'center 30%' }}
                                />
                            </div>
                            <div className="ul-project-txt">
                                <div>
                                    <h3 className="ul-project-title">
                                        <Link href={UNITS_DATA[0].link as any}>{t(UNITS_DATA[0].title)}</Link>
                                    </h3>
                                    <p className="ul-project-descr">{t(UNITS_DATA[0].description)}</p>
                                </div>
                                <Link href={UNITS_DATA[0].link as any} className="ul-project-btn">
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="units-col-lg-4 units-col-md-6 units-col-10 units-col-xxs-12">
                        <div className="ul-project ul-project--sm">
                            <div className="ul-project-img relative">
                                <Image 
                                    src={UNITS_DATA[1].image} 
                                    alt={t(UNITS_DATA[1].title)} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="ul-project-txt">
                                <div>
                                    <h3 className="ul-project-title">
                                        <Link href={UNITS_DATA[1].link as any}>{t(UNITS_DATA[1].title)}</Link>
                                    </h3>
                                    <p className="ul-project-descr">{t(UNITS_DATA[1].description)}</p>
                                </div>
                                <Link href={UNITS_DATA[1].link as any} className="ul-project-btn">
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="units-col-lg-4 units-col-md-6 units-col-10 units-col-xxs-12">
                        <div className="ul-project ul-project--sm">
                            <div className="ul-project-img relative">
                                <Image 
                                    src={UNITS_DATA[2].image} 
                                    alt={t(UNITS_DATA[2].title)} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="ul-project-txt">
                                <div>
                                    <h3 className="ul-project-title">
                                        <Link href={UNITS_DATA[2].link as any}>{t(UNITS_DATA[2].title)}</Link>
                                    </h3>
                                    <p className="ul-project-descr">{t(UNITS_DATA[2].description)}</p>
                                </div>
                                <Link href={UNITS_DATA[2].link as any} className="ul-project-btn">
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="units-col-lg-8 units-col-md-6 units-col-10 units-col-xxs-12">
                        <div className="ul-project">
                            <div className="ul-project-img relative">
                                <Image 
                                    src={UNITS_DATA[3].image} 
                                    alt={t(UNITS_DATA[3].title)} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="ul-project-txt">
                                <div>
                                    <h3 className="ul-project-title">
                                        <Link href={UNITS_DATA[3].link as any}>{t(UNITS_DATA[3].title)}</Link>
                                    </h3>
                                    <p className="ul-project-descr">{t(UNITS_DATA[3].description)}</p>
                                </div>
                                <Link href={UNITS_DATA[3].link as any} className="ul-project-btn">
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .ul-section-spacing {
                    padding-top: clamp(60px, 6.31vw, 120px);
                    padding-bottom: clamp(60px, 6.31vw, 120px);
                }

                .ul-container {
                    --container-space-x: 30px;
                    max-width: calc(clamp(1200px, 74.09vw, 1410px) + var(--container-space-x));
                    padding-left: calc(var(--container-space-x) / 2);
                    padding-right: calc(var(--container-space-x) / 2);
                    margin: auto;
                }

                .ul-section-sub-title {
                    color: oklch(from var(--primary) l c h);
                    display: inline-block;
                    letter-spacing: -0.03em;
                    font-weight: 500;
                    line-height: 1.5;
                    position: relative;
                    margin-bottom: clamp(11px, 0.74vw, 14px);
                }

                .ul-section-sub-title::before {
                    content: "";
                    width: clamp(9px, 0.63vw, 12px);
                    aspect-ratio: 12/13;
                    background-color: oklch(from var(--primary) l c h);
                    display: inline-block;
                    margin-right: clamp(5px, 0.42vw, 8px);
                    clip-path: polygon(50% 100%, 0 0, 100% 0);
                    transform: rotate(180deg);
                }

                .ul-section-title {
                    font-weight: 700;
                    font-size: clamp(25px, 2.63vw, 50px);
                    color: #1E252F;
                    margin-bottom: clamp(5px, 0.42vw, 8px);
                    letter-spacing: -0.04em;
                    font-family: var(--font-quicksand);
                }

                .ul-project {
                    border-radius: clamp(15px, 1.58vw, 30px);
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                    min-height: 480px;
                }

                .ul-project-img {
                    height: 100%;
                    width: 100%;
                    position: relative;
                }

                .ul-project-img :global(img) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                .ul-project:hover .ul-project-img img {
                    transform: scale(1.1);
                }

                .ul-project-txt {
                    background-color: oklch(from var(--primary) l c h);
                    color: white;
                    position: absolute;
                    bottom: clamp(15px, 2.1vw, 40px);
                    left: clamp(15px, 2.1vw, 40px);
                    border-radius: clamp(7px, 0.53vw, 10px);
                    padding: clamp(15px, 1.58vw, 30px);
                    display: flex;
                    gap: clamp(15px, 1.58vw, 30px);
                    align-items: center;
                    max-width: calc(100% - clamp(30px, 4.2vw, 80px));
                    transform: translateY(50%);
                    opacity: 0;
                    transition: 0.4s ease;
                }

                .ul-project:hover .ul-project-txt {
                    transform: translateY(0);
                    opacity: 1;
                }

                .ul-project--sm .ul-project-txt {
                    bottom: clamp(15px, 1.58vw, 30px);
                    left: clamp(15px, 1.58vw, 30px);
                }

                .ul-project-title {
                    font-family: var(--font-quicksand);
                    font-weight: 700;
                    font-size: clamp(20px, 1.68vw, 24px);
                    margin-bottom: 4px;
                }

                .ul-project-title a {
                    color: white;
                    text-decoration: none;
                }

                .ul-project-descr {
                    margin-bottom: 0;
                    font-size: 14px;
                    opacity: 0.9;
                }

                .ul-project-btn {
                    flex-shrink: 0;
                    width: clamp(40px, 3.15vw, 50px);
                    aspect-ratio: 1/1;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    color: #1E252F;
                    transition: all 0.3s ease;
                }

                .ul-project-btn:hover {
                    background-color: #1E252F;
                    color: white;
                }

                .ul-project-btn:hover :global(svg) {
                    color: white;
                }

                /* Bootstrap Grid System mimic for compatibility */
                .units-row {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: calc(-1 * var(--bs-gutter-y));
                    margin-right: calc(-.5 * var(--bs-gutter-x));
                    margin-left: calc(-.5 * var(--bs-gutter-x));
                    --bs-gutter-x: 30px;
                    --bs-gutter-y: 30px;
                }
                .units-row > * {
                    flex-shrink: 0;
                    width: 100%;
                    max-width: 100%;
                    padding-right: calc(var(--bs-gutter-x) * .5);
                    padding-left: calc(var(--bs-gutter-x) * .5);
                    margin-top: var(--bs-gutter-y);
                }
                .units-col-10 {
                    flex: 0 0 auto;
                    width: 83.33333333%;
                }
                @media (min-width: 768px) {
                    .units-col-md-6 {
                        flex: 0 0 auto;
                        width: 50%;
                    }
                }
                @media (min-width: 992px) {
                    .units-col-lg-4 {
                        flex: 0 0 auto;
                        width: 33.33333333%;
                    }
                    .units-col-lg-8 {
                        flex: 0 0 auto;
                        width: 66.66666667%;
                    }
                }
            `}</style>
        </section>
    );
}

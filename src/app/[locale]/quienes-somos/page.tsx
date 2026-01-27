'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Breadcrumb } from '@/components/ui';
import { FadeIn, AnimatedCounter } from '@/components/animations';
import { TeamSection } from '@/components/sections/team-section';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { Phone, Heart, Users, Package, Handshake, Check } from 'lucide-react';
import { useState } from 'react';

type TabKey = 'mission' | 'vision' | 'history';

export default function AboutPage() {
    const t = useTranslations('about');
    const tCta = useTranslations('cta');
    const [activeTab, setActiveTab] = useState<TabKey>('mission');

    const stats = [
        { icon: Users, value: 62000, label: t('stats.children'), suffix: '+' },
        { icon: Heart, value: 15400, label: t('stats.volunteers'), suffix: '+' },
        { icon: Package, value: 222000, label: t('stats.products'), suffix: '+' },
        { icon: Handshake, value: 1500, label: t('stats.donors'), suffix: '+' },
    ];

    const tabs: { key: TabKey; label: string }[] = [
        { key: 'mission', label: t('tabs.mission') },
        { key: 'vision', label: t('tabs.vision') },
        { key: 'history', label: t('tabs.history') },
    ];

    const tabContent: Record<TabKey, { image: string; title: string; description: string; list?: string[] }> = {
        mission: {
            image: '/images/real_images/Prevencion-de-la-desnutricion-y-recuperacion-nutricional.jpg',
            title: t('tabs.missionTitle'),
            description: t('tabs.missionDescription'),
            list: [
                t('tabs.missionList1'),
                t('tabs.missionList2'),
                t('tabs.missionList3'),
                t('tabs.missionList4'),
            ],
        },
        vision: {
            image: '/images/real_images/383A8599-scaled.jpg',
            title: t('tabs.visionTitle'),
            description: t('tabs.visionDescription'),
            list: [
                t('tabs.visionList1'),
                t('tabs.visionList2'),
                t('tabs.visionList3'),
                t('tabs.visionList4'),
            ],
        },
        history: {
            image: '/images/real_images/2.png',
            title: t('tabs.historyTitle'),
            description: t('tabs.historyDescription'),
        },
    };

    return (
        <>
            <Header />
            <main>
                {/* Breadcrumb Section */}
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                    backgroundImage="/images/real_images/383A8599-scaled.jpg"
                    backgroundPosition="center 70%"
                />

                {/* About Section */}
                <section className="ul-about ul-section-spacing">
                    <div className="ul-container">
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                            {/* Image Column */}
                            <div className="w-full lg:w-1/2">
                                <FadeIn direction="left">
                                    <div className="ul-about-imgs relative">
                                        <div className="img-wrapper relative">
                                            <Image
                                                src="/images/real_images/Portada-Editorialesnu3-1.png"
                                                alt="About nu3"
                                                width={600}
                                                height={700}
                                                className="rounded-3xl object-cover"
                                            />
                                        </div>
                                        <div className="ul-about-imgs-vectors">
                                            <Image
                                                src="/images/about-img-vector-1.svg"
                                                alt=""
                                                width={100}
                                                height={100}
                                                className="absolute -top-6 -left-6 animate-bounce-slow"
                                            />
                                            <Image
                                                src="/images/about-img-vector-2.svg"
                                                alt=""
                                                width={80}
                                                height={80}
                                                className="absolute -bottom-4 right-10 animate-pulse"
                                            />
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Text Column */}
                            <div className="w-full lg:w-1/2">
                                <FadeIn direction="right">
                                    <div className="ul-about-txt">
                                        <span className="ul-section-sub-title ul-section-sub-title--2">
                                            {t('title')}
                                        </span>
                                        <h2 className="ul-section-title">
                                            {t('subtitle')}
                                        </h2>
                                        <p className="ul-section-descr">
                                            {t('description')}
                                        </p>

                                        {/* Block with icon and image */}
                                        <div className="ul-about-block">
                                            <div className="block-left">
                                                <div className="block-heading">
                                                    <div className="icon">
                                                        <Heart className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <h3 className="block-title">{t('blockTitle')}</h3>
                                                </div>
                                                <ul className="block-list">
                                                    <li>{t('blockListItem')}</li>
                                                </ul>
                                            </div>
                                            <div className="block-right">
                                                <Image
                                                    src="/images/real_images/IMG_1002-1024x683.jpg"
                                                    alt="About Block"
                                                    width={180}
                                                    height={130}
                                                    className="rounded-xl object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Bottom actions */}
                                        <div className="ul-about-bottom">
                                            <Link href="/programas" className="ul-btn">
                                                <span className="icon mr-2">→</span>
                                                {tCta('explore')}
                                            </Link>

                                            <div className="ul-about-call">
                                                <div className="icon-wrapper">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div className="txt">
                                                    <span className="call-title">{t('callAnytime')}</span>
                                                    <a href="tel:+573183309385">+57 318 330 9385</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>

                    {/* Background vector */}
                    <div className="ul-about-vectors">
                        <Image
                            src="/images/about-vector-1.png"
                            alt=""
                            width={200}
                            height={200}
                            className="absolute top-20 right-0 opacity-50"
                        />
                    </div>
                </section>

                {/* Stats Section */}
                <section className="ul-stats ul-section-spacing">
                    <div className="ul-container">
                        <FadeIn>
                            <div className="ul-stats-wrapper">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="ul-stats-item">
                                            <stat.icon className="w-12 h-12 text-primary mb-4" />
                                            <span className="number">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                                            </span>
                                            <span className="txt">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Mission/Vision/History Tabs Section */}
                <section className="ul-about-tabs ul-events ul-section-spacing">
                    <div className="ul-container">
                        {/* Heading */}
                        <FadeIn>
                            <div className="ul-section-heading align-items-center">
                                <div className="left">
                                    <span className="ul-section-sub-title">{t('tabs.sectionSubtitle')}</span>
                                    <h2 className="ul-section-title text-white">{t('tabs.sectionTitle')}</h2>
                                </div>
                                <Link href="/dona" className="ul-btn">
                                    <span className="icon mr-2">→</span>
                                    {tCta('donate')}
                                </Link>
                            </div>
                        </FadeIn>

                        {/* Tab Group */}
                        <div className="tab-group">
                            {/* Tab Content */}
                            <div className="ul-about-tabs-wrapper">
                                {tabs.map((tab) => (
                                    <div
                                        key={tab.key}
                                        className={`ul-tab ul-about-tab ${activeTab === tab.key ? 'active' : ''}`}
                                    >
                                        <div className="ul-about-tab-img">
                                            <Image
                                                src={tabContent[tab.key].image}
                                                alt={tabContent[tab.key].title}
                                                width={500}
                                                height={400}
                                                className="rounded-2xl object-cover"
                                            />
                                        </div>

                                        <div className="ul-about-tab-txt">
                                            <h3 className="ul-about-tab-title">{tabContent[tab.key].title}</h3>
                                            <p className="ul-about-tab-descr">{tabContent[tab.key].description}</p>
                                            {tabContent[tab.key].list && (
                                                <ul className="ul-about-tab-list">
                                                    {tabContent[tab.key].list!.map((item, i) => (
                                                        <li key={i}>
                                                            <Check className="w-4 h-4 text-primary inline mr-2" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tab Navigation */}
                            <div className="tab-navs ul-about-tabs-nav">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        className={`tab-nav ${activeTab === tab.key ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Vector decoration */}
                        <div className="ul-events-vectors">
                            <Image
                                src="/images/events-vector-2.svg"
                                alt=""
                                width={150}
                                height={150}
                                className="absolute bottom-10 right-10 opacity-30"
                            />
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <TeamSection />

                {/* CTA Section */}
                <section className="ul-cta">
                    <div className="ul-container text-center">
                        <span className="ul-section-sub-title text-white/80">{t('cta.subtitle')}</span>
                        <h2 className="ul-cta-title">{t('cta.title')}</h2>
                        <Link href="/dona" className="ul-btn ul-btn-white">
                            <span className="icon mr-2">→</span>
                            {tCta('donate')}
                        </Link>
                    </div>
                    <Image
                        src="/images/cta-vector.svg"
                        alt=""
                        width={200}
                        height={200}
                        className="ul-cta-vector"
                    />
                </section>

                {/* Testimonials Section */}
                <TestimonialsCarousel />
            </main>
            <Footer />

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
                    position: relative;
                }

                .ul-section-sub-title {
                    color: var(--nu3-primary);
                    display: inline-block;
                    letter-spacing: -0.03em;
                    font-weight: 600;
                    line-height: 1.5;
                    position: relative;
                    margin-bottom: clamp(11px, 0.74vw, 14px);
                    text-transform: uppercase;
                    font-size: 14px;
                }

                .ul-section-sub-title::before {
                    content: "";
                    width: clamp(9px, 0.63vw, 12px);
                    aspect-ratio: 12/13;
                    background-color: var(--nu3-primary);
                    display: inline-block;
                    margin-right: clamp(5px, 0.42vw, 8px);
                    clip-path: polygon(50% 100%, 0 0, 100% 0);
                    transform: rotate(180deg);
                }

                .ul-section-title {
                    font-weight: 700;
                    font-size: clamp(28px, 2.63vw, 48px);
                    color: var(--foreground);
                    margin-bottom: clamp(15px, 1.2vw, 24px);
                    letter-spacing: -0.03em;
                    font-family: var(--font-quicksand), sans-serif;
                    line-height: 1.2;
                }

                .ul-section-descr {
                    font-size: clamp(15px, 0.9vw, 18px);
                    margin-bottom: clamp(25px, 2vw, 40px);
                    color: var(--muted-foreground);
                    line-height: 1.7;
                }

                .ul-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 14px 28px;
                    background-color: var(--nu3-primary);
                    color: white;
                    font-weight: 600;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .ul-btn:hover {
                    background-color: var(--nu3-primary-dark);
                    transform: translateY(-2px);
                }

                .ul-btn-white {
                    background-color: white;
                    color: var(--nu3-primary);
                }

                .ul-btn-white:hover {
                    background-color: rgba(255, 255, 255, 0.9);
                }

                /* About Section */
                .ul-about {
                    position: relative;
                    overflow: hidden;
                }

                .ul-about-imgs {
                    position: relative;
                }

                .ul-about-block {
                    display: flex;
                    gap: 20px;
                    background: linear-gradient(135deg, oklch(from var(--primary) l c h / 0.05), rgba(97, 206, 112, 0.05));
                    padding: 20px;
                    border-radius: 16px;
                    margin-bottom: 30px;
                }

                .block-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .block-heading .icon {
                    width: 48px;
                    height: 48px;
                    background: var(--nu3-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .block-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--foreground);
                    font-family: var(--font-quicksand), sans-serif;
                }

                .block-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .block-list li {
                    color: var(--muted-foreground);
                    font-size: 14px;
                    padding-left: 20px;
                    position: relative;
                }

                .block-list li::before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: var(--nu3-primary);
                }

                .block-right img {
                    border-radius: 12px;
                }

                .ul-about-bottom {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    flex-wrap: wrap;
                }

                .ul-about-call {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .ul-about-call .icon-wrapper {
                    width: 50px;
                    height: 50px;
                    background: var(--nu3-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    animation: pulse 2s infinite;
                }

                .ul-about-call .call-title {
                    display: block;
                    font-size: 12px;
                    color: var(--muted-foreground);
                    text-transform: uppercase;
                }

                .ul-about-call a {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--foreground);
                    font-family: var(--font-quicksand), sans-serif;
                }

                /* Stats Section */
                .ul-stats {
                    background: linear-gradient(135deg, var(--nu3-cream) 0%, rgba(255, 255, 255, 0.5) 100%);
                }

                .ul-stats-wrapper {
                    background: white;
                    border-radius: 24px;
                    padding: clamp(30px, 4vw, 60px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                }

                .ul-stats-item {
                    text-align: center;
                    padding: 20px;
                }

                .ul-stats-item .number {
                    display: block;
                    font-size: clamp(36px, 4vw, 56px);
                    font-weight: 700;
                    color: var(--nu3-primary);
                    font-family: var(--font-quicksand), sans-serif;
                    line-height: 1;
                    margin-bottom: 8px;
                }

                .ul-stats-item .txt {
                    color: var(--muted-foreground);
                    font-size: 14px;
                }

                /* Tabs Section */
                .ul-about-tabs {
                    background: linear-gradient(135deg, var(--nu3-secondary) 0%, var(--nu3-secondary-light) 100%);
                    position: relative;
                    overflow: hidden;
                }

                .ul-about-tabs .ul-section-heading {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: clamp(30px, 3vw, 50px);
                }

                .ul-about-tabs .ul-section-sub-title {
                    color: rgba(255, 255, 255, 0.8);
                }

                .ul-about-tabs .ul-section-sub-title::before {
                    background-color: rgba(255, 255, 255, 0.8);
                }

                .ul-about-tabs .ul-section-title {
                    color: white;
                }

                .tab-group {
                    position: relative;
                }

                .ul-about-tabs-wrapper {
                    position: relative;
                }

                .ul-about-tab {
                    display: none;
                    background: white;
                    border-radius: 24px;
                    padding: clamp(20px, 3vw, 40px);
                    gap: clamp(20px, 3vw, 40px);
                }

                .ul-about-tab.active {
                    display: flex;
                    flex-direction: column;
                }

                @media (min-width: 768px) {
                    .ul-about-tab.active {
                        flex-direction: row;
                    }
                }

                .ul-about-tab-img {
                    flex: 0 0 auto;
                    width: 100%;
                }

                @media (min-width: 768px) {
                    .ul-about-tab-img {
                        width: 40%;
                    }
                }

                .ul-about-tab-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                }

                .ul-about-tab-txt {
                    flex: 1;
                }

                .ul-about-tab-title {
                    font-size: clamp(22px, 1.8vw, 32px);
                    font-weight: 700;
                    color: var(--foreground);
                    margin-bottom: 16px;
                    font-family: var(--font-quicksand), sans-serif;
                }

                .ul-about-tab-descr {
                    color: var(--muted-foreground);
                    line-height: 1.7;
                    margin-bottom: 20px;
                }

                .ul-about-tab-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 20px 0;
                }

                .ul-about-tab-list li {
                    padding: 8px 0;
                    color: var(--muted-foreground);
                    display: flex;
                    align-items: center;
                }

                .ul-about-tabs-nav {
                    display: flex;
                    gap: 12px;
                    margin-top: 24px;
                    flex-wrap: wrap;
                }

                .tab-nav {
                    padding: 14px 28px;
                    background: white;
                    border: none;
                    border-radius: 50px;
                    font-weight: 600;
                    color: var(--foreground);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .tab-nav:hover,
                .tab-nav.active {
                    background: var(--nu3-primary);
                    color: white;
                }

                /* CTA Section */
                .ul-cta {
                    background: linear-gradient(135deg, var(--nu3-primary) 0%, var(--nu3-primary-dark) 100%);
                    padding: clamp(60px, 8vw, 120px) 0;
                    position: relative;
                    overflow: hidden;
                }

                .ul-cta .ul-section-sub-title::before {
                    background-color: rgba(255, 255, 255, 0.8);
                }

                .ul-cta-title {
                    font-size: clamp(28px, 3.5vw, 56px);
                    font-weight: 700;
                    color: white;
                    margin-bottom: 30px;
                    font-family: var(--font-quicksand), sans-serif;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .ul-cta-vector {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    opacity: 0.2;
                }

                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 oklch(from var(--primary) l c h / 0.4);
                    }
                    50% {
                        box-shadow: 0 0 0 15px oklch(from var(--primary) l c h / 0);
                    }
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite;
                }

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </>
    );
}

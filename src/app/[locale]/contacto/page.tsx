'use client';

import { useTranslations } from 'next-intl';
import { Header, Footer } from '@/components/layout';
import { Breadcrumb } from '@/components/ui';
import { FadeIn } from '@/components/animations';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const t = useTranslations('contact');

    const contactInfos = [
        {
            icon: Phone,
            title: t('info.phone.title'),
            value: '+57 318 330 9385',
            href: 'tel:+573183309385',
            isLink: true,
        },
        {
            icon: Mail,
            title: t('info.email.title'),
            value: 'comunicaciones@nu3.org.co',
            href: 'mailto:comunicaciones@nu3.org.co',
            isLink: true,
        },
        {
            icon: MapPin,
            title: t('info.address.title'),
            value: 'Cra. 9E #137-21, Suroccidente, Barranquilla, Atlántico',
            href: 'https://maps.app.goo.gl/nu3Barranquilla',
            isLink: true,
        },
    ];

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

                {/* Contact Infos Section */}
                <section className="ul-contact-infos">
                    <div className="ul-section-spacing ul-container">
                        <FadeIn>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {contactInfos.map((info, index) => (
                                    <div key={index} className="ul-contact-info">
                                        <div className="icon">
                                            <info.icon className="w-6 h-6" />
                                        </div>
                                        <div className="txt">
                                            <span className="title">{info.title}</span>
                                            {info.isLink ? (
                                                <a href={info.href}>{info.value}</a>
                                            ) : (
                                                <span className="descr">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Map Section */}
                <section className="ul-contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2!2d-74.86194!3d10.9612879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d0a0a20bd49%3A0xd57989e5db80c060!2snu3!5e0!3m2!1sen!2sco!4v1706380000000!5m2!1sen!2sco"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="nu3 Location - Barranquilla, Colombia"
                    />
                </section>

                {/* Contact Form Section */}
                <section className="ul-inner-contact ul-section-spacing">
                    <FadeIn>
                        <div className="ul-section-heading justify-center text-center">
                            <div>
                                <span className="ul-section-sub-title">{t('form.sectionSubtitle')}</span>
                                <h2 className="ul-section-title">{t('form.sectionTitle')}</h2>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="ul-inner-contact-container">
                            <form className="ul-contact-form ul-form">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="ul-contact-name"
                                            placeholder={t('form.name')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="ul-contact-email"
                                            placeholder={t('form.email')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group md:col-span-2">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="ul-contact-phone"
                                            placeholder={t('form.phone')}
                                        />
                                    </div>
                                    <div className="form-group md:col-span-2">
                                        <input
                                            type="text"
                                            name="subject"
                                            id="ul-contact-subject"
                                            placeholder={t('form.subject')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group md:col-span-2">
                                        <textarea
                                            name="message"
                                            id="ul-contact-msg"
                                            placeholder={t('form.message')}
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 text-center">
                                        <button type="submit" className="ul-btn">
                                            <Send className="w-4 h-4 mr-2" />
                                            {t('form.submit')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </FadeIn>
                </section>

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

                .ul-section-heading {
                    display: flex;
                    margin-bottom: clamp(30px, 3vw, 50px);
                }

                .ul-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px 32px;
                    background-color: var(--nu3-primary);
                    color: white;
                    font-weight: 600;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                }

                .ul-btn:hover {
                    background-color: var(--nu3-primary-dark);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px oklch(from var(--primary) l c h / 0.3);
                }

                /* Contact Infos Section */
                .ul-contact-infos {
                    background: linear-gradient(135deg, var(--nu3-cream) 0%, rgba(255, 255, 255, 0.8) 100%);
                }

                .ul-contact-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: white;
                    padding: clamp(25px, 2.5vw, 40px);
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
                    transition: all 0.3s ease;
                }

                .ul-contact-info:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
                }

                .ul-contact-info .icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, var(--nu3-primary), var(--nu3-primary-light));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .ul-contact-info .txt {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .ul-contact-info .title {
                    font-size: 14px;
                    color: var(--muted-foreground);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .ul-contact-info a,
                .ul-contact-info .descr {
                    font-size: clamp(16px, 1.2vw, 20px);
                    font-weight: 700;
                    color: var(--foreground);
                    font-family: var(--font-quicksand), sans-serif;
                    transition: color 0.3s ease;
                }

                .ul-contact-info a:hover {
                    color: var(--nu3-primary);
                }

                /* Map Section */
                .ul-contact-map {
                    width: 100%;
                    height: clamp(300px, 30vw, 500px);
                    background: var(--nu3-cream);
                }

                .ul-contact-map iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    filter: grayscale(20%);
                }

                /* Contact Form Section */
                .ul-inner-contact {
                    background: white;
                }

                .ul-inner-contact-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                .ul-contact-form .form-group {
                    margin-bottom: 0;
                }

                .ul-contact-form input,
                .ul-contact-form textarea {
                    width: 100%;
                    padding: 18px 24px;
                    border: 2px solid var(--border);
                    border-radius: 12px;
                    font-size: 16px;
                    color: var(--foreground);
                    background: var(--background);
                    transition: all 0.3s ease;
                    font-family: inherit;
                }

                .ul-contact-form input:focus,
                .ul-contact-form textarea:focus {
                    outline: none;
                    border-color: var(--nu3-primary);
                    box-shadow: 0 0 0 4px oklch(from var(--primary) l c h / 0.1);
                }

                .ul-contact-form input::placeholder,
                .ul-contact-form textarea::placeholder {
                    color: var(--muted-foreground);
                }

                .ul-contact-form textarea {
                    resize: vertical;
                    min-height: 150px;
                }


                @media (max-width: 768px) {
                    .ul-contact-info {
                        flex-direction: column;
                        text-align: center;
                    }

                    .ul-contact-info .txt {
                        align-items: center;
                    }
                }
            `}</style>
        </>
    );
}

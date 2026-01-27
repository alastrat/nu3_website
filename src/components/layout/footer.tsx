import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
    { href: '/quienes-somos', key: 'about' },
    { href: '/programas', key: 'programs' },
    { href: '/proyectos', key: 'projects' },
    { href: '/apadrina', key: 'sponsor' },
    { href: '/dona', key: 'donate' },
    { href: '/contacto', key: 'contact' },
] as const;

const programLinks = [
    { href: '/programas/prevencion-desnutricion', label: 'Prevención de desnutrición' },
    { href: '/programas/primera-infancia', label: 'Primera infancia' },
    { href: '/programas/madres-gestantes', label: 'Madres gestantes' },
    { href: '/programas/adultos-mayores', label: 'Adultos mayores' },
] as const;

const socialLinks = [
    { href: 'https://facebook.com/fundacionnu3', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com/fundacionnu3', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com/fundacionnu3', icon: Twitter, label: 'Twitter' },
    { href: 'https://linkedin.com/company/fundacionnu3', icon: Linkedin, label: 'LinkedIn' },
] as const;

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/nu3-logo-white.png"
                                alt="Fundación nu3"
                                width={180}
                                height={54}
                                className="h-auto w-auto"
                            />
                        </Link>
                        <p className="text-sm text-background/80">
                            {t('description')}
                        </p>
                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.key}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-background/80 transition-colors hover:text-primary"
                                    >
                                        {tNav(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{t('programs')}</h3>
                        <ul className="space-y-2">
                            {programLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-background/80 transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{t('contact')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-background/80">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>Cra. 9E #137-21, Suroccidente, Barranquilla, Atlántico</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-background/80">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                <a href="tel:+573183309385" className="hover:text-primary">
                                    +57 318 330 9385
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-background/80">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <a href="mailto:comunicaciones@nu3.org.co" className="hover:text-primary">
                                    comunicaciones@nu3.org.co
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-background/20" />

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-background/60 sm:flex-row">
                    <p>
                        © {currentYear} Fundación nu3. {t('rights')}.
                    </p>
                    <p className="flex items-center gap-1">
                        Hecho con <Heart className="h-4 w-4 text-primary" /> en Colombia
                    </p>
                </div>
            </div>
        </footer>
    );
}

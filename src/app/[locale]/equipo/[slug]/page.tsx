import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TeamCard } from '@/components/ui/team-card';
import { Button } from '@/components/ui/button';
import { Link, routing } from '@/i18n/routing';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Team members data - from nu3.co/quienes-somos/
const teamMembersData: Record<string, { image: string; email: string; phone: string }> = {
    'monica-schraer': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'francis-zylberblum': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'paola-davila': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'jeison-rodriguez': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'sandra-buelvas': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'daniel-villadiego': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'dubis-barrios': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
    'marcela-ortega': {
        image: '/images/team-details-img.jpg',
        email: 'comunicaciones@nu3.org.co',
        phone: '+57 318-330-9385',
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(teamMembersData);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const member = teamMembersData[slug];

    if (!member) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'team' });

    return {
        title: `${t(`members.${slug}.name`)} - nu3`,
        description: `${t(`members.${slug}.name`)} - ${t(`members.${slug}.role`)}`,
    };
}

export default async function TeamMemberPage({ params }: Props) {
    const { locale, slug } = await params;
    const member = teamMembersData[slug];

    if (!member) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'team' });
    const tDetails = await getTranslations({ locale, namespace: 'teamDetails' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });

    const name = t(`members.${slug}.name`);
    const role = t(`members.${slug}.role`);

    // Get other team members
    const otherMembers = Object.entries(teamMembersData)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key]) => ({
            slug: key,
            name: t(`members.${key}.name`),
            role: t(`members.${key}.role`),
            image: '/images/member-' + (Object.keys(teamMembersData).indexOf(key) + 1) + '.jpg',
        }));

    const skills = [
        tDetails('skills.skill1'),
        tDetails('skills.skill2'),
        tDetails('skills.skill3'),
        tDetails('skills.skill4'),
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={name}
                    items={[
                        { label: tDetails('breadcrumb.team'), href: '/equipo' },
                        { label: name },
                    ]}
                />

                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Sidebar with Photo */}
                            <div className="space-y-6">
                                <FadeIn>
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                        <Image
                                            src={member.image}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </FadeIn>

                                {/* Contact Info */}
                                <FadeIn delay={0.1}>
                                    <div className="bg-card rounded-xl p-6 shadow-sm border">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('contact.title')}
                                        </h3>
                                        <ul className="space-y-4">
                                            <li>
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <Mail className="h-5 w-5" />
                                                    <span>{member.email}</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href={`tel:${member.phone}`}
                                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <Phone className="h-5 w-5" />
                                                    <span>{member.phone}</span>
                                                </a>
                                            </li>
                                        </ul>

                                        {/* Social Links */}
                                        <div className="flex gap-2 mt-4 pt-4 border-t">
                                            <Button variant="outline" size="icon">
                                                <Linkedin className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Twitter className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <FadeIn>
                                    <span className="text-primary font-medium">{role}</span>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mt-2">
                                        {name}
                                    </h1>
                                </FadeIn>

                                <FadeIn delay={0.1}>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {tDetails('bio.paragraph1')}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('bio.paragraph2')}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('bio.paragraph3')}
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Skills */}
                                <FadeIn delay={0.2}>
                                    <h2 className="text-2xl font-bold text-foreground font-display mb-4">
                                        {tDetails('skills.title')}
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {skills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                                            >
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-foreground">{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>

                                {/* CTA */}
                                <FadeIn delay={0.3}>
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <Button asChild size="lg">
                                            <Link href="/contacto">{tCta('contactUs')}</Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/equipo">{tDetails('backToTeam')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>

                        {/* Other Team Members */}
                        <div className="mt-16 pt-16 border-t">
                            <FadeIn>
                                <h2 className="text-2xl font-bold text-foreground font-display mb-8 text-center">
                                    {tDetails('otherMembers')}
                                </h2>
                            </FadeIn>
                            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherMembers.map((m) => (
                                    <StaggerItem key={m.slug}>
                                        <TeamCard
                                            image={m.image}
                                            name={m.name}
                                            role={m.role}
                                            slug={m.slug}
                                        />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

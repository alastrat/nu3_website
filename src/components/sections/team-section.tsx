import { useTranslations } from 'next-intl';
import { TeamCard } from '@/components/ui/team-card';
import { Users } from 'lucide-react';
import { Link } from '@/i18n/routing';

const DEMO_TEAM = [
    {
        id: '1',
        slug: 'monica-schraer',
        image: '/images/real_images/team/monica-schraer.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '2',
        slug: 'francis-zylberblum',
        image: '/images/real_images/team/francis-zylberblum.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '3',
        slug: 'paola-davila',
        image: '/images/real_images/team/paola-davila.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '4',
        slug: 'jeison-rodriguez',
        image: '/images/real_images/team/jeison-rodriguez.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '5',
        slug: 'sandra-buelvas',
        image: '/images/real_images/team/sandra-buelvas.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '6',
        slug: 'daniel-villadiego',
        image: '/images/real_images/team/daniel-villadiego.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '7',
        slug: 'dubis-barrios',
        image: '/images/real_images/team/dubis-barrios.jpg',
        socials: {
            linkedin: '#',
        },
    },
    {
        id: '8',
        slug: 'marcela-ortega',
        image: '/images/real_images/team/marcela-ortega.jpg',
        socials: {
            linkedin: '#',
        },
    },
];

export function TeamSection() {
    const t = useTranslations();

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                    <div className="flex-1">
                        <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
                            {t('team.section.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {t('team.section.title')}
                        </h2>
                    </div>

                    <Link
                        href="/equipo"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors group"
                    >
                        <Users className="w-4 h-4" />
                        {t('team.section.joinUs')}
                    </Link>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEMO_TEAM.map((member) => (
                        <TeamCard
                            key={member.id}
                            slug={member.slug}
                            name={t(`team.members.${member.slug}.name`)}
                            role={t(`team.members.${member.slug}.role`)}
                            image={member.image}
                            socials={member.socials}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

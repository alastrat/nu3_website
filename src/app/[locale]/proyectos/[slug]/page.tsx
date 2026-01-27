import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { Link, routing } from '@/i18n/routing';
import { Calendar, MapPin, Users, Target, ArrowRight, Check } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Projects data
const projectsData: Record<string, { image: string; categoryKey: string; location: string; year: string; beneficiaries: number }> = {
    'centro-integral-bogota': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'infrastructure',
        location: 'Bogotá, Colombia',
        year: '2023',
        beneficiaries: 1500,
    },
    'programa-huertas-soacha': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'gardens',
        location: 'Soacha, Cundinamarca',
        year: '2024',
        beneficiaries: 350,
    },
    'capacitacion-madres': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'education',
        location: 'Bogotá y alrededores',
        year: '2024',
        beneficiaries: 800,
    },
    'alianza-empresarial-2024': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'partnerships',
        location: 'Nacional',
        year: '2024',
        beneficiaries: 2000,
    },
    'recuperacion-nutricional': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'nutrition',
        location: 'Cundinamarca',
        year: '2023',
        beneficiaries: 500,
    },
    'unidad-productiva-panaderia': {
        image: '/images/project-details-img-1.jpg',
        categoryKey: 'units',
        location: 'Bogotá',
        year: '2022',
        beneficiaries: 120,
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(projectsData);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = projectsData[slug];

    if (!project) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'projects' });

    return {
        title: `${t(`items.${slug}.title`)} - nu3`,
        description: t(`items.${slug}.description`),
    };
}

export default async function ProjectDetailsPage({ params }: Props) {
    const { locale, slug } = await params;
    const project = projectsData[slug];

    if (!project) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'projects' });
    const tDetails = await getTranslations({ locale, namespace: 'projectDetails' });
    const tCta = await getTranslations({ locale, namespace: 'cta' });

    const title = t(`items.${slug}.title`);
    const description = t(`items.${slug}.description`);
    const category = t(`categories.${project.categoryKey}`);

    // Get other projects
    const otherProjects = Object.entries(projectsData)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key, value]) => ({
            slug: key,
            title: t(`items.${key}.title`),
            category: t(`categories.${value.categoryKey}`),
            image: '/images/project-' + (Math.floor(Math.random() * 4) + 1) + '.jpg',
        }));

    const achievements = [
        tDetails('achievements.item1'),
        tDetails('achievements.item2'),
        tDetails('achievements.item3'),
        tDetails('achievements.item4'),
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={title}
                    items={[
                        { label: tDetails('breadcrumb.projects'), href: '/proyectos' },
                        { label: title },
                    ]}
                />

                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        {/* Header */}
                        <FadeIn className="max-w-4xl mx-auto text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm mb-2">
                                {category}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-display">
                                {title}
                            </h1>
                        </FadeIn>

                        {/* Featured Image */}
                        <FadeIn delay={0.1} className="mb-12">
                            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </FadeIn>

                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Project Info */}
                                <FadeIn delay={0.2}>
                                    <div className="flex flex-wrap gap-6 p-6 bg-muted/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            <div>
                                                <span className="text-sm text-muted-foreground block">{tDetails('info.year')}</span>
                                                <span className="font-medium">{project.year}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            <div>
                                                <span className="text-sm text-muted-foreground block">{tDetails('info.location')}</span>
                                                <span className="font-medium">{project.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="h-5 w-5 text-primary" />
                                            <div>
                                                <span className="text-sm text-muted-foreground block">{tDetails('info.beneficiaries')}</span>
                                                <span className="font-medium">{project.beneficiaries.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Description */}
                                <FadeIn delay={0.3}>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('content.paragraph1')}
                                        </p>

                                        <h2 className="text-2xl font-bold text-foreground font-display mt-8 mb-4">
                                            {tDetails('objectives.title')}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {tDetails('content.paragraph2')}
                                        </p>
                                    </div>
                                </FadeIn>

                                {/* Achievements */}
                                <FadeIn delay={0.4}>
                                    <h2 className="text-2xl font-bold text-foreground font-display mb-4">
                                        {tDetails('achievements.title')}
                                    </h2>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {achievements.map((achievement, index) => (
                                            <li key={index} className="flex items-start gap-3 p-4 bg-secondary/5 rounded-lg">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 flex-shrink-0">
                                                    <Check className="h-4 w-4 text-secondary" />
                                                </div>
                                                <span className="text-foreground">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </FadeIn>

                                {/* CTA */}
                                <FadeIn delay={0.5}>
                                    <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t">
                                        <Button asChild size="lg">
                                            <Link href="/dona">
                                                {tCta('donate')}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/contacto">{tCta('contactUs')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">
                                <FadeIn direction="left">
                                    <div className="bg-primary rounded-xl p-6 text-white">
                                        <Target className="h-10 w-10 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">
                                            {tDetails('sidebar.supportTitle')}
                                        </h3>
                                        <p className="text-white/80 mb-4">
                                            {tDetails('sidebar.supportDescription')}
                                        </p>
                                        <Button
                                            asChild
                                            className="w-full bg-white text-primary hover:bg-white/90"
                                        >
                                            <Link href="/dona">{tCta('donate')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>

                                <FadeIn direction="left" delay={0.1}>
                                    <div className="bg-muted/50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {tDetails('sidebar.contactTitle')}
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            {tDetails('sidebar.contactDescription')}
                                        </p>
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/contacto">{tCta('contactUs')}</Link>
                                        </Button>
                                    </div>
                                </FadeIn>
                            </aside>
                        </div>

                        {/* Related Projects */}
                        <div className="mt-16 pt-16 border-t">
                            <FadeIn>
                                <h2 className="text-2xl font-bold text-foreground font-display mb-8 text-center">
                                    {tDetails('relatedProjects')}
                                </h2>
                            </FadeIn>
                            <StaggerContainer className="grid md:grid-cols-3 gap-6">
                                {otherProjects.map((proj) => (
                                    <StaggerItem key={proj.slug}>
                                        <ProjectCard
                                            image={proj.image}
                                            title={proj.title}
                                            category={proj.category}
                                            slug={proj.slug}
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

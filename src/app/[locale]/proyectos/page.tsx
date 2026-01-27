import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProjectCard } from '@/components/ui/project-card';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'projectsPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Projects data - in production, this would come from a CMS or database
const projects = [
    { slug: 'centro-integral-bogota', image: '/images/project-1.jpg', categoryKey: 'infrastructure', size: 'large' as const },
    { slug: 'programa-huertas-soacha', image: '/images/project-2.jpg', categoryKey: 'gardens', size: 'default' as const },
    { slug: 'capacitacion-madres', image: '/images/project-3.jpg', categoryKey: 'education', size: 'default' as const },
    { slug: 'alianza-empresarial-2024', image: '/images/project-4.jpg', categoryKey: 'partnerships', size: 'default' as const },
    { slug: 'recuperacion-nutricional', image: '/images/project-1.jpg', categoryKey: 'nutrition', size: 'default' as const },
    { slug: 'unidad-productiva-panaderia', image: '/images/project-2.jpg', categoryKey: 'units', size: 'large' as const },
];

export default async function ProjectsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'projectsPage' });
    const tProjects = await getTranslations({ locale, namespace: 'projects' });

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                />

                {/* Projects Masonry Grid */}
                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <FadeIn className="text-center mb-12">
                            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
                                {t('subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {t('heading')}
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                {t('description')}
                            </p>
                        </FadeIn>

                        {/* Masonry-style Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <FadeIn
                                    key={project.slug}
                                    delay={index * 0.1}
                                    className={project.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}
                                >
                                    <ProjectCard
                                        image={project.image}
                                        title={tProjects(`items.${project.slug}.title`)}
                                        category={tProjects(`categories.${project.categoryKey}`)}
                                        slug={project.slug}
                                        size={project.size}
                                    />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

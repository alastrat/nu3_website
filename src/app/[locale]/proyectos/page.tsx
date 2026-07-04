import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

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

// RenovaPlus projects - slugs and categoryKeys map to es.json `projects`
const projects = [
    { slug: 'centro-integral-bogota', image: '/images/renovaplus/proyecto-1-caujaral.jpg', categoryKey: 'nutrition', size: 'large' as const },
    { slug: 'recuperacion-nutricional', image: '/images/renovaplus/proyecto-2-almacen.jpg', categoryKey: 'nutrition', size: 'default' as const },
    { slug: 'capacitacion-madres', image: '/images/renovaplus/proyecto-3-portoazul.jpg', categoryKey: 'infrastructure', size: 'default' as const },
    { slug: 'unidad-productiva-panaderia', image: '/images/renovaplus/proyecto-4-tuberia.jpg', categoryKey: 'units', size: 'large' as const },
    { slug: 'programa-huertas-soacha', image: '/images/renovaplus/proyecto-5-subbase.jpg', categoryKey: 'gardens', size: 'default' as const },
    { slug: 'alianza-empresarial-2024', image: '/images/renovaplus/proyecto-6-cerramiento.jpg', categoryKey: 'partnerships', size: 'default' as const },
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
                    backgroundImage="/images/renovaplus/hero-1.jpg"
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
                                    <article
                                        className={cn(
                                            'group relative overflow-hidden rounded-xl',
                                            project.size === 'large' ? 'aspect-[4/3]' : 'aspect-square'
                                        )}
                                    >
                                        <Link href="/contacto" className="block h-full">
                                            <Image
                                                src={project.image}
                                                alt={tProjects(`items.${project.slug}.title`)}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                <span className="text-primary font-medium text-sm mb-2">
                                                    {tProjects(`categories.${project.categoryKey}`)}
                                                </span>
                                                <h3
                                                    className="text-xl md:text-2xl font-bold text-white font-display group-hover:text-primary transition-colors"
                                                >
                                                    {tProjects(`items.${project.slug}.title`)}
                                                </h3>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Link>
                                    </article>
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

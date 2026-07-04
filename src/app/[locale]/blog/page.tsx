import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { BlogCard } from '@/components/ui/blog-card';
import { Pagination } from '@/components/ui/pagination';
import { InnerSidebar } from '@/components/sections/inner-sidebar';
import { routing } from '@/i18n/routing';

type Props = {
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogPage' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

// Blog posts data - in production, this would come from a CMS or database
const blogPosts = [
    {
        slug: 'planificacion-pilar-obra-exitosa',
        image: '/images/renovaplus/plans-review.jpg',
        date: new Date('2025-06-15'),
        categoryKey: 'planificacion',
    },
    {
        slug: 'importancia-interventoria-construccion',
        image: '/images/renovaplus/interventorias.jpg',
        date: new Date('2025-06-01'),
        categoryKey: 'interventoria',
    },
    {
        slug: 'seguridad-industrial-obra',
        image: '/images/renovaplus/workers-site.jpg',
        date: new Date('2025-05-15'),
        categoryKey: 'seguridad',
    },
    {
        slug: 'orden-organizacion-productividad-obra',
        image: '/images/renovaplus/hero-2.jpg',
        date: new Date('2025-05-01'),
        categoryKey: 'gestion',
    },
    {
        slug: 'sostenibilidad-construccion',
        image: '/images/renovaplus/urbanismo.jpg',
        date: new Date('2025-04-15'),
        categoryKey: 'sostenibilidad',
    },
    {
        slug: 'control-calidad-resultados-duraderos',
        image: '/images/renovaplus/acabados.jpg',
        date: new Date('2025-04-01'),
        categoryKey: 'calidad',
    },
];

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'blogPage' });
    const tBlog = await getTranslations({ locale, namespace: 'blog' });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(locale === 'es' ? 'es-CO' : locale === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const categories = [
        { name: tBlog('categories.planificacion'), slug: 'planificacion', count: 1 },
        { name: tBlog('categories.interventoria'), slug: 'interventorias', count: 1 },
        { name: tBlog('categories.seguridad'), slug: 'seguridad', count: 1 },
        { name: tBlog('categories.gestion'), slug: 'gestion-de-obra', count: 1 },
        { name: tBlog('categories.sostenibilidad'), slug: 'sostenibilidad', count: 1 },
        { name: tBlog('categories.calidad'), slug: 'control-de-calidad', count: 1 },
    ];

    const recentPosts = blogPosts.slice(0, 3).map((post) => ({
        title: t(`posts.${post.slug}.title`),
        slug: post.slug,
        image: post.image,
        date: formatDate(post.date),
    }));

    const tags = [
        { name: t('tags.planificacion'), slug: 'planificacion' },
        { name: t('tags.seguridad'), slug: 'seguridad' },
        { name: t('tags.calidad'), slug: 'calidad' },
        { name: t('tags.sostenibilidad'), slug: 'sostenibilidad' },
        { name: t('tags.interventoria'), slug: 'interventorias' },
        { name: t('tags.remodelacion'), slug: 'remodelacion' },
    ];

    // Featured post (first one)
    const featuredPost = blogPosts[0];
    const regularPosts = blogPosts.slice(1);

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={t('title')}
                    items={[{ label: t('breadcrumb') }]}
                    backgroundImage="/images/renovaplus/hero-2.jpg"
                />

                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Featured Post */}
                                <FadeIn>
                                    <BlogCard
                                        image={featuredPost.image}
                                        title={t(`posts.${featuredPost.slug}.title`)}
                                        excerpt={t(`posts.${featuredPost.slug}.excerpt`)}
                                        date={formatDate(featuredPost.date)}
                                        category={tBlog(`categories.${featuredPost.categoryKey}`)}
                                        slug={featuredPost.slug}
                                        variant="featured"
                                    />
                                </FadeIn>

                                {/* Regular Posts */}
                                <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                                    {regularPosts.map((post) => (
                                        <StaggerItem key={post.slug}>
                                            <BlogCard
                                                image={post.image}
                                                title={t(`posts.${post.slug}.title`)}
                                                excerpt={t(`posts.${post.slug}.excerpt`)}
                                                date={formatDate(post.date)}
                                                category={tBlog(`categories.${post.categoryKey}`)}
                                                slug={post.slug}
                                            />
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>

                                {/* Pagination */}
                                <Pagination
                                    currentPage={1}
                                    totalPages={3}
                                    baseUrl="/blog"
                                    className="mt-8"
                                />
                            </div>

                            {/* Sidebar */}
                            <InnerSidebar
                                showSearch
                                categories={categories}
                                categoriesTitle={t('sidebar.categories')}
                                recentPosts={recentPosts}
                                recentPostsTitle={t('sidebar.recentPosts')}
                                tags={tags}
                                tagsTitle={t('sidebar.tags')}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

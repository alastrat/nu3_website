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
        slug: 'importancia-nutricion-infantil',
        image: '/images/blog-post-1.jpg',
        date: new Date('2024-12-15'),
        categoryKey: 'nutrition',
    },
    {
        slug: 'lactancia-materna-beneficios',
        image: '/images/blog-post-2.jpg',
        date: new Date('2024-12-10'),
        categoryKey: 'breastfeeding',
    },
    {
        slug: 'huertas-urbanas-seguridad-alimentaria',
        image: '/images/blog-post-3.jpg',
        date: new Date('2024-12-05'),
        categoryKey: 'gardens',
    },
    {
        slug: 'historia-transformacion-familia-martinez',
        image: '/images/blog-post-1.jpg',
        date: new Date('2024-11-28'),
        categoryKey: 'impact',
    },
    {
        slug: 'alianza-empresa-xyz',
        image: '/images/blog-post-2.jpg',
        date: new Date('2024-11-20'),
        categoryKey: 'partnerships',
    },
    {
        slug: 'recetas-nutritivas-economicas',
        image: '/images/blog-post-3.jpg',
        date: new Date('2024-11-15'),
        categoryKey: 'nutrition',
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
        { name: tBlog('categories.nutrition'), slug: 'nutricion', count: 12 },
        { name: tBlog('categories.breastfeeding'), slug: 'lactancia', count: 8 },
        { name: tBlog('categories.gardens'), slug: 'huertas', count: 6 },
        { name: tBlog('categories.impact'), slug: 'impacto', count: 15 },
        { name: tBlog('categories.partnerships'), slug: 'alianzas', count: 4 },
    ];

    const recentPosts = blogPosts.slice(0, 3).map((post) => ({
        title: t(`posts.${post.slug}.title`),
        slug: post.slug,
        image: post.image,
        date: formatDate(post.date),
    }));

    const tags = [
        { name: t('tags.nutrition'), slug: 'nutricion' },
        { name: t('tags.children'), slug: 'ninos' },
        { name: t('tags.health'), slug: 'salud' },
        { name: t('tags.family'), slug: 'familia' },
        { name: t('tags.wellness'), slug: 'bienestar' },
        { name: t('tags.recipes'), slug: 'recetas' },
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

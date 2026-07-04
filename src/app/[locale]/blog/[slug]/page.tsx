import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { InnerSidebar } from '@/components/sections/inner-sidebar';
import { Link, routing } from '@/i18n/routing';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// Blog posts data
const blogPostsData: Record<string, { image: string; date: Date; categoryKey: string; author: string }> = {
    'planificacion-pilar-obra-exitosa': {
        image: '/images/renovaplus/plans-review.jpg',
        date: new Date('2025-06-15'),
        categoryKey: 'planificacion',
        author: 'Equipo RenovaPlus',
    },
    'importancia-interventoria-construccion': {
        image: '/images/renovaplus/interventorias.jpg',
        date: new Date('2025-06-01'),
        categoryKey: 'interventoria',
        author: 'Equipo RenovaPlus',
    },
    'seguridad-industrial-obra': {
        image: '/images/renovaplus/workers-site.jpg',
        date: new Date('2025-05-15'),
        categoryKey: 'seguridad',
        author: 'Equipo RenovaPlus',
    },
    'orden-organizacion-productividad-obra': {
        image: '/images/renovaplus/hero-2.jpg',
        date: new Date('2025-05-01'),
        categoryKey: 'gestion',
        author: 'Equipo RenovaPlus',
    },
    'sostenibilidad-construccion': {
        image: '/images/renovaplus/urbanismo.jpg',
        date: new Date('2025-04-15'),
        categoryKey: 'sostenibilidad',
        author: 'Equipo RenovaPlus',
    },
    'control-calidad-resultados-duraderos': {
        image: '/images/renovaplus/acabados.jpg',
        date: new Date('2025-04-01'),
        categoryKey: 'calidad',
        author: 'Equipo RenovaPlus',
    },
};

export function generateStaticParams() {
    const slugs = Object.keys(blogPostsData);
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = blogPostsData[slug];

    if (!post) {
        return { title: 'Not Found' };
    }

    const t = await getTranslations({ locale, namespace: 'blogPage' });

    return {
        title: `${t(`posts.${slug}.title`)} - RenovaPlus`,
        description: t(`posts.${slug}.excerpt`),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    const post = blogPostsData[slug];

    if (!post) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'blogPage' });
    const tBlog = await getTranslations({ locale, namespace: 'blog' });
    const tDetails = await getTranslations({ locale, namespace: 'blogDetails' });

    const title = t(`posts.${slug}.title`);
    const paragraphs = t.raw(`posts.${slug}.paragraphs`) as string[];
    const category = tBlog(`categories.${post.categoryKey}`);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(locale === 'es' ? 'es-CO' : locale === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Get categories and recent posts for sidebar
    const categories = [
        { name: tBlog('categories.planificacion'), slug: 'planificacion', count: 1 },
        { name: tBlog('categories.interventoria'), slug: 'interventorias', count: 1 },
        { name: tBlog('categories.seguridad'), slug: 'seguridad', count: 1 },
        { name: tBlog('categories.gestion'), slug: 'gestion-de-obra', count: 1 },
        { name: tBlog('categories.sostenibilidad'), slug: 'sostenibilidad', count: 1 },
        { name: tBlog('categories.calidad'), slug: 'control-de-calidad', count: 1 },
    ];

    const recentPosts = Object.entries(blogPostsData)
        .filter(([key]) => key !== slug)
        .slice(0, 3)
        .map(([key, value]) => ({
            title: t(`posts.${key}.title`),
            slug: key,
            image: value.image,
            date: formatDate(value.date),
        }));

    const tags = [
        { name: t('tags.planificacion'), slug: 'planificacion' },
        { name: t('tags.seguridad'), slug: 'seguridad' },
        { name: t('tags.calidad'), slug: 'calidad' },
        { name: t('tags.sostenibilidad'), slug: 'sostenibilidad' },
    ];

    return (
        <>
            <Header />
            <main>
                <Breadcrumb
                    title={title}
                    items={[
                        { label: t('breadcrumb'), href: '/blog' },
                        { label: title },
                    ]}
                />

                <section className="py-16 md:py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <article className="lg:col-span-2 space-y-8">
                                {/* Featured Image */}
                                <FadeIn>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </FadeIn>

                                {/* Meta Info */}
                                <FadeIn delay={0.1}>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(post.date)}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            {category}
                                        </span>
                                    </div>
                                </FadeIn>

                                {/* Title */}
                                <FadeIn delay={0.2}>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                        {title}
                                    </h1>
                                </FadeIn>

                                {/* Content */}
                                <FadeIn delay={0.3}>
                                    <div className="prose prose-lg max-w-none space-y-6">
                                        {paragraphs.map((para, i) => (
                                            <p
                                                key={i}
                                                className={
                                                    i === 0
                                                        ? 'text-lg text-foreground leading-relaxed'
                                                        : 'text-muted-foreground leading-relaxed'
                                                }
                                            >
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </FadeIn>

                                {/* Tags */}
                                <FadeIn delay={0.4}>
                                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t">
                                        <span className="font-medium text-foreground">
                                            {tDetails('tags')}:
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <Link
                                                    key={tag.slug}
                                                    href={`/blog/etiqueta/${tag.slug}` as any}
                                                    className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    {tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Share */}
                                <FadeIn delay={0.5}>
                                    <div className="flex flex-wrap items-center gap-4 py-6 border-y">
                                        <span className="font-medium text-foreground flex items-center gap-2">
                                            <Share2 className="h-4 w-4" />
                                            {tDetails('share')}:
                                        </span>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon">
                                                <Facebook className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Twitter className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Linkedin className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </FadeIn>

                                {/* Author Box */}
                                <FadeIn delay={0.6}>
                                    <div className="flex gap-4 p-6 bg-muted/50 rounded-xl">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src="/images/renovaplus/interventorias.jpg"
                                                alt={post.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{post.author}</h3>
                                            <p className="text-sm text-primary mb-2">{tDetails('authorRole')}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {tDetails('authorBio')}
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </article>

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

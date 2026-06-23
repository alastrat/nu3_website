import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renovaplus.com.co';

export default function sitemap(): MetadataRoute.Sitemap {
    // Single-locale (Spanish) site served at the root — no locale prefix.
    const routes = [
        '',
        '/quienes-somos',
        '/programas',
        '/proyectos',
        '/blog',
        '/contacto',
        '/preguntas-frecuentes',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/programas' ? 0.8 : 0.6,
    }));
}

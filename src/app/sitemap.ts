import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nu3.co';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['es', 'en', 'fr'];

    const routes = [
        '',
        '/quienes-somos',
        '/programas',
        '/programas/prevencion-desnutricion',
        '/programas/primera-infancia',
        '/programas/madres-gestantes',
        '/programas/adultos-mayores',
        '/huertas-productivas',
        '/unidades-productivas',
        '/unidades-productivas/catering-social',
        '/unidades-productivas/panaderia',
        '/unidades-productivas/confeccion',
        '/unidades-productivas/reciclaje',
        '/apadrina',
        '/dona',
        '/empresas',
        '/blog',
        '/contacto',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    for (const route of routes) {
        for (const locale of locales) {
            const url = locale === 'es'
                ? `${baseUrl}${route}`
                : `${baseUrl}/${locale}${route}`;

            sitemap.push({
                url,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : route.includes('/programas') ? 0.8 : 0.6,
                alternates: {
                    languages: {
                        es: `${baseUrl}${route}`,
                        en: `${baseUrl}/en${route}`,
                        fr: `${baseUrl}/fr${route}`,
                    },
                },
            });
        }
    }

    return sitemap;
}

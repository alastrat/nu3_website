import type { Metadata, Viewport } from "next";
import { Manrope, Quicksand } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { QueryProvider, WebVitalsReporter } from "@/components/providers";
import "../globals.css";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    display: "swap",
});

const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    ],
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        es: "nu3 - Nutrición y acompañamiento para familias en Colombia",
        en: "nu3 - Nutrition and support for families in Colombia",
        fr: "nu3 - Nutrition et accompagnement pour les familles en Colombie",
    };

    const descriptions: Record<string, string> = {
        es: "Fundación colombiana con más de 20 años transformando vidas a través de nutrición, educación y acompañamiento integral para familias vulnerables.",
        en: "Colombian foundation with over 20 years transforming lives through nutrition, education, and comprehensive support for vulnerable families.",
        fr: "Fondation colombienne avec plus de 20 ans d'expérience transformant des vies grâce à la nutrition, l'éducation et l'accompagnement intégral.",
    };

    return {
        title: {
            default: titles[locale] || titles.es,
            template: `%s | nu3`,
        },
        description: descriptions[locale] || descriptions.es,
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nu3.co"),
        alternates: {
            canonical: "/",
            languages: {
                es: "/",
                en: "/en",
                fr: "/fr",
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "es" ? "es_CO" : locale === "fr" ? "fr_FR" : "en_US",
            url: "/",
            siteName: "Fundación nu3",
            title: titles[locale] || titles.es,
            description: descriptions[locale] || descriptions.es,
        },
        twitter: {
            card: "summary_large_image",
            title: titles[locale] || titles.es,
            description: descriptions[locale] || descriptions.es,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        icons: {
            icon: "/favicon.ico",
        },
    };
}

// Theme configuration - "default" (orange/green) or "legacy" (red/green from nu3.co)
const theme = process.env.NEXT_PUBLIC_THEME || "default";

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the current locale
    const messages = await getMessages();

    return (
        <html lang={locale} data-theme={theme} suppressHydrationWarning>
            <body
                className={`${manrope.variable} ${quicksand.variable} font-sans antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <QueryProvider>
                        <WebVitalsReporter />
                        {children}
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

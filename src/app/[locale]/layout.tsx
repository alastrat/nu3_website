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

export async function generateMetadata(): Promise<Metadata> {
    const title = "RenovaPlus S.A.S. - Renovación y remodelación boutique en Barranquilla";
    const description = "Constructora boutique en Barranquilla, Atlántico, especializada en renovación y remodelación de espacios residenciales y comerciales. Construimos confianza, renovamos espacios con acabados de primera calidad, atención personalizada y transparencia en cada proyecto.";

    return {
        title: {
            default: title,
            template: `%s | RenovaPlus`,
        },
        description,
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://renovaplus.com.co"),
        alternates: {
            canonical: "/",
        },
        openGraph: {
            type: "website",
            locale: "es_CO",
            url: "/",
            siteName: "RenovaPlus S.A.S.",
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
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

// RenovaPlus brand theme is always the navy/orange "default" palette (no env-var override)
const theme = "default";

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

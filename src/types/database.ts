// Types for database models

export interface Program {
    id: string;
    slug: string;
    type: 'nutrition' | 'garden' | 'business';
    title_es: string;
    title_en: string | null;
    title_fr: string | null;
    description_es: string | null;
    description_en: string | null;
    description_fr: string | null;
    image: string | null;
    icon: string | null;
    display_order: number;
    published: boolean;
}

export interface Beneficiary {
    id: string;
    type: 'child' | 'adolescent' | 'mother' | 'elderly';
    name: string;
    age: number | null;
    story_es: string | null;
    story_en: string | null;
    story_fr: string | null;
    image: string | null;
    sponsored: boolean;
    created_at: string;
}

export interface Donation {
    id: string;
    donor_email: string;
    amount: number;
    currency: string;
    type: 'one_time' | 'monthly' | 'corporate';
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    category: string;
    title_es: string;
    title_en: string | null;
    title_fr: string | null;
    excerpt_es: string | null;
    excerpt_en: string | null;
    excerpt_fr: string | null;
    content_es: string | null;
    content_en: string | null;
    content_fr: string | null;
    image: string | null;
    published: boolean;
    published_at: string | null;
    created_at: string;
}

export interface Partner {
    id: string;
    name: string;
    logo: string | null;
    website: string | null;
    type: 'corporate' | 'institutional' | 'international';
    display_order: number;
}

export interface Testimonial {
    id: string;
    name: string;
    role_es: string | null;
    role_en: string | null;
    role_fr: string | null;
    content_es: string;
    content_en: string | null;
    content_fr: string | null;
    image: string | null;
    display_order: number;
}

export interface ImpactMetric {
    id: string;
    key: string;
    value_number: number;
    label_es: string;
    label_en: string | null;
    label_fr: string | null;
    icon: string | null;
}

export interface SiteSetting {
    key: string;
    value: Record<string, unknown>;
}

// Helper type for localized fields
export type Locale = 'es' | 'en' | 'fr';

export function getLocalizedField<T extends Record<string, unknown>>(
    item: T,
    field: string,
    locale: Locale
): string {
    const localizedKey = `${field}_${locale}` as keyof T;
    const fallbackKey = `${field}_es` as keyof T;

    return (item[localizedKey] as string) || (item[fallbackKey] as string) || '';
}

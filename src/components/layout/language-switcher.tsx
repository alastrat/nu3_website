'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { locales, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';

const localeNames: Record<Locale, string> = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
};

export function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale as Locale });
    };

    return (
        <Select value={locale} onValueChange={handleChange}>
            <SelectTrigger className="w-auto gap-2 border-none bg-transparent hover:bg-accent">
                <Globe className="h-4 w-4" />
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {locales.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                        {localeNames[loc]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

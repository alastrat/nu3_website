'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { reportWebVitals } from '@/lib/web-vitals';

export function WebVitalsReporter() {
    const pathname = usePathname();

    useEffect(() => {
        reportWebVitals({
            path: pathname,
            analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
        });
    }, [pathname]);

    return null;
}

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

type ReportCallback = (metric: Metric) => void;

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
    const nav = navigator as Navigator & {
        connection?: { effectiveType?: string };
    };
    return nav.connection?.effectiveType ?? '';
}

function sendToAnalytics(metric: Metric, options: { path: string; analyticsId?: string }) {
    const page = Object.entries(options.path).reduce(
        (acc, [key, value]) => acc.replace(value, `[${key}]`),
        options.path
    );

    const body: Record<string, string> = {
        id: metric.id,
        page,
        href: location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
    };

    if (options.analyticsId) {
        body.dsn = options.analyticsId;
        const blob = new Blob([new URLSearchParams(body).toString()], {
            type: 'application/x-www-form-urlencoded',
        });
        if (navigator.sendBeacon) {
            navigator.sendBeacon(vitalsUrl, blob);
        } else {
            fetch(vitalsUrl, {
                body: blob,
                method: 'POST',
                credentials: 'omit',
                keepalive: true,
            });
        }
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    }
}

export function reportWebVitals(options: { path: string; analyticsId?: string }) {
    const callback: ReportCallback = (metric) => sendToAnalytics(metric, options);

    try {
        onCLS(callback);
        onFCP(callback);
        onINP(callback);
        onLCP(callback);
        onTTFB(callback);
    } catch (err) {
        console.error('[Web Vitals] Error:', err);
    }
}

export { onCLS, onFCP, onINP, onLCP, onTTFB };

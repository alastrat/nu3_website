'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface EventCountdownProps {
    targetDate: Date;
    className?: string;
}

export function EventCountdown({ targetDate, className }: EventCountdownProps) {
    const t = useTranslations('countdown');
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted) {
        return (
            <div className={cn('flex gap-4', className)}>
                {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div
                        key={unit}
                        className="flex flex-col items-center bg-primary/10 rounded-lg p-4 min-w-[80px]"
                    >
                        <span className="text-3xl font-bold text-primary">--</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                            {t(unit as keyof typeof timeLeft)}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    const timeUnits = [
        { key: 'days', value: timeLeft.days },
        { key: 'hours', value: timeLeft.hours },
        { key: 'minutes', value: timeLeft.minutes },
        { key: 'seconds', value: timeLeft.seconds },
    ];

    return (
        <div className={cn('flex gap-3 sm:gap-4', className)}>
            {timeUnits.map(({ key, value }) => (
                <div
                    key={key}
                    className="flex flex-col items-center bg-primary/10 rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]"
                >
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                        {t(key as keyof typeof timeLeft)}
                    </span>
                </div>
            ))}
        </div>
    );
}

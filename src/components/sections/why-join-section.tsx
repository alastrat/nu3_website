'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FaqItem {
    question: string;
    answer: string;
}

interface WhyJoinSectionProps {
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    imageAlt: string;
    faqs: FaqItem[];
    className?: string;
    imagePosition?: 'left' | 'right';
}

export function WhyJoinSection({
    title,
    subtitle,
    description,
    image,
    imageAlt,
    faqs,
    className,
    imagePosition = 'left',
}: WhyJoinSectionProps) {
    return (
        <section className={cn('py-16 md:py-20 lg:py-24', className)}>
            <div className="container mx-auto px-4">
                <div
                    className={cn(
                        'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
                        imagePosition === 'right' && 'lg:[&>*:first-child]:order-2'
                    )}
                >
                    {/* Image */}
                    <FadeIn direction={imagePosition === 'left' ? 'right' : 'left'}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={image}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </FadeIn>

                    {/* Content */}
                    <FadeIn direction={imagePosition === 'left' ? 'left' : 'right'} delay={0.2}>
                        <div className="space-y-6">
                            {subtitle && (
                                <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider">
                                    {subtitle}
                                </span>
                            )}
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                                {title}
                            </h2>
                            {description && (
                                <p className="text-muted-foreground text-lg">
                                    {description}
                                </p>
                            )}

                            {/* FAQ Accordion */}
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left font-semibold">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

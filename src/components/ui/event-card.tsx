import { Calendar, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface EventCardProps {
    slug: string;
    image: string;
    date: {
        day: string;
        month: string;
    };
    title: string;
    description: string;
    venue: string;
}

export function EventCard({
    slug,
    image,
    date,
    title,
    description,
    venue,
}: EventCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative h-[280px] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Date Badge */}
                <div className="absolute top-6 left-6 bg-white rounded-xl p-4 text-center shadow-lg">
                    <div className="text-3xl font-bold text-primary">{date.day}</div>
                    <div className="text-sm font-medium text-gray-600 uppercase">{date.month}</div>
                </div>
            </div>

            <div className="p-6">
                <Link
                    href={`/eventos/${slug}` as any}
                    className="block mb-3 text-xl font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                >
                    {title}
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

                <div className="flex items-start gap-2 mb-6 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{venue}</span>
                </div>

                <Link
                    href={`/eventos/${slug}` as any}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                    <Calendar className="w-4 h-4" />
                    Ver detalles del evento
                </Link>
            </div>
        </div>
    );
}

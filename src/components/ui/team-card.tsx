import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface TeamCardProps {
    slug: string;
    name: string;
    role: string;
    image: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
}

export function TeamCard({ slug, name, role, image, socials }: TeamCardProps) {
    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-2xl mb-4">
                <div className="relative h-[320px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Social Links Overlay */}
                {socials && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <div className="flex gap-3">
                            {socials.facebook && (
                                <a
                                    href={socials.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {socials.twitter && (
                                <a
                                    href={socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {socials.linkedin && (
                                <a
                                    href={socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {socials.instagram && (
                                <a
                                    href={socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Member Info */}
            <div className="text-center">
                <Link
                    href={`/equipo/${slug}` as any}
                    className="block text-xl font-bold text-gray-900 hover:text-primary transition-colors mb-1"
                >
                    {name}
                </Link>
                <p className="text-gray-600">{role}</p>
            </div>
        </div>
    );
}

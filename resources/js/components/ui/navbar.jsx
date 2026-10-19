import { Link, useForm, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Phone, Calendar, Globe, Menu, X, ArrowDown, ChevronDown, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { home, about, branches, contact } from '@/routes';
import language from '@/routes/language';
import { useCurrentUrl } from '@/hooks/use-current-url';

export default function NavBar({ showHero = true, heroOptions = {} }) {
    const { t } = useTranslations();
    const { locale, global_services, settings = {} } = usePage().props;
    const isRTL = locale === 'ar';

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getHeroImageSrc = () => {
        if (settings.home_cover_type === 'image' && settings.home_cover_image_path) {
            if (settings.home_cover_image_path.includes('kUJsnop7CuR9NLbVrDkvqacrqRSXU8biDkK1JJyX')) {
                return '/hero-banner.webp';
            }
            if (settings.home_cover_image_path.startsWith('/') || settings.home_cover_image_path.startsWith('http')) {
                return settings.home_cover_image_path;
            }
            return `/storage/${settings.home_cover_image_path}`;
        }
        return '/hero-banner.webp';
    };

    const topServices = global_services || [];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { post } = useForm();
    const { isCurrentUrl } = useCurrentUrl();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLanguage = (newLocale) => {
        post(language.switch.url({ query: { locale: newLocale } }), {
            preserveScroll: true,
        });
    };

    const navLinks = [
        { href: home.url(), label: t('nav.home'), isRoute: true },
        { href: about.url(), label: t('nav.about'), isRoute: true },
        { href: '/services', label: t('nav.services'), isRoute: false },
        { href: '/gallery', label: t('nav.gallery') || 'معرض الحالات', isRoute: false },
        { href: '/clients', label: t('nav.clients'), isRoute: false },
        { href: '/articles', label: t('nav.articles'), isRoute: false },
        { href: '/doctors', label: t('nav.doctors'), isRoute: false },
        { href: branches.url(), label: t('nav.branches'), isRoute: true },
        {
            label: t('nav.country'),
            children: [
                { href: '/egypt', label: t('nav.egypt') },
                { href: '/saudi', label: t('nav.saudi') },
            ]
        },
        { href: contact.url(), label: t('nav.contact'), isRoute: true },
    ];

    return (
        <header className="w-full relative">
            <div className="w-full">
                {/* Layer 1: Marquee Services Top Bar */}
                <div
                    className="relative z-40 w-full overflow-hidden border-b border-white/10 bg-[#0d0d0d] py-2.5 text-white/80"
                    dir="ltr"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />

                    <div className="flex w-max items-center">
                        <div className="flex animate-marquee gap-10 whitespace-nowrap px-6 hover:[animation-play-state:paused] motion-reduce:animate-none">
                            {[...topServices, ...topServices].map((service, i) => (
                                <Link
                                    key={i}
                                    href={`/services/${service.url_key || service.id}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-[#D4AF37] transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-75 group-hover:opacity-100 shadow-[0_0_6px_#D4AF37]" />
                                    <span>{service.title}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex animate-marquee gap-10 whitespace-nowrap px-6 hover:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
                            {[...topServices, ...topServices].map((service, i) => (
                                <Link
                                    key={`dup-${i}`}
                                    href={`/services/${service.url_key || service.id}`}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                    className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-[#D4AF37] transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-75 group-hover:opacity-100 shadow-[0_0_6px_#D4AF37]" />
                                    <span>{service.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Layer 2: Info & Social Bar */}
                <div className="bg-[#141414] text-white/80 py-2 px-6 lg:px-20 hidden md:flex justify-between items-center text-xs font-medium border-b border-white/5 relative z-30">
                    <div className="flex items-center gap-4">
                        <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                            <Facebook size={16} />
                        </a>
                        <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                            <Instagram size={16} />
                        </a>
                        <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors" aria-label="Snapchat">
                            <img src="/snapchat2.png" alt="Snapchat" className="h-4 w-4 object-contain brightness-0 invert opacity-80 hover:opacity-100" />
                        </a>
                        <a href="https://www.tiktok.com/@badrdentalcenter0" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors" aria-label="TikTok">
                            <img src='/tik-tok.png' alt="TikTok" className="h-4 w-4 object-contain brightness-0 invert opacity-80 hover:opacity-100" />
                        </a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 border-s border-white/10 ps-5">
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/60">{locale === 'ar' ? 'واتساب الاستشارات:' : 'WhatsApp:'}</span>
                                <a href="https://wa.me/201060000841" target="_blank" rel="noopener noreferrer" dir="ltr" className="text-[#D4AF37] font-bold font-mono hover:underline">
                                    01060000841
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={() => switchLanguage(locale === 'ar' ? 'en' : 'ar')}
                            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors text-xs font-bold"
                        >
                            <Globe size={14} className="text-[#D4AF37]" />
                            <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                    </div>
                </div>

                {/* Layer 3: Main Sticky Navigation with Solid Background */}
                <nav
                    className={`sticky top-0 z-50 transition-all duration-300 px-6 lg:px-20 flex justify-between items-center bg-[#0d0d0d] ${
                        isScrolled
                            ? 'bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-2xl py-3'
                            : 'border-b border-white/10 py-4'
                    }`}
                >
                    {/* Logo and Nav Links */}
                    <div className="flex items-center gap-10 lg:gap-14">
                        <Link href="/" className="flex items-center gap-2 group shrink-0">
                            <img
                                src="/current-logo.png"
                                alt="Badr Dental Center"
                                className="h-12 sm:h-14 md:h-16 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                                onError={(e) => { e.target.src = "/logo.png"; }}
                            />
                        </Link>

                        <ul className="hidden xl:flex items-center gap-7">
                            {navLinks.map((link) => (
                                <li key={link.label} className="relative group">
                                    {link.children ? (
                                        <>
                                            <button className="flex items-center gap-1 text-white/85 hover:text-[#D4AF37] font-bold transition-all text-sm py-1 cursor-pointer">
                                                <span>{link.label}</span>
                                                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-white/50 group-hover:text-[#D4AF37]" />
                                            </button>
                                            <ul className="absolute top-full start-0 mt-2 glass-dark bg-black/90 border border-white/15 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[190px] overflow-hidden py-2 z-50 backdrop-blur-xl">
                                                {link.children.map(child => (
                                                    <li key={child.label}>
                                                        <Link
                                                            href={child.href}
                                                            className={`block px-5 py-2.5 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] transition-colors text-xs font-bold ${
                                                                isCurrentUrl(child.href) ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white/85'
                                                            }`}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`text-white/85 hover:text-[#D4AF37] font-bold transition-all text-sm relative py-1 block group ${
                                                isCurrentUrl(link.href) ? 'text-[#D4AF37]' : ''
                                            }`}
                                        >
                                            <span>{link.label}</span>
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] transform transition-transform origin-start ${
                                                    isCurrentUrl(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                                }`}
                                            />
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Buttons + Mobile Menu Toggle */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                        {/* Offers CTA */}
                        <Link
                            href="/offers"
                            className="hidden sm:inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full glass-dark text-white hover:text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 font-bold text-xs shadow-md transition-all whitespace-nowrap"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{t('nav.offers')}</span>
                        </Link>

                        {/* Book Now Button */}
                        <Link
                            href="/contact"
                            className="btn-glow-gold bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black px-5 md:px-7 py-2.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                        >
                            <Calendar size={14} className="hidden sm:block" />
                            <span>{t('nav.book_now')}</span>
                        </Link>

                        {/* Hamburger */}
                        <button
                            className="xl:hidden p-2.5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Hero Banner Section (Full image displayed directly under the nav) */}
            {showHero && (
                <div className="w-full relative bg-[#09090b] flex flex-col items-center justify-center">
                    {settings.home_cover_type === 'youtube' && settings.home_cover_youtube_url ? (
                        <div className="w-full relative aspect-video overflow-hidden pointer-events-none">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeId(settings.home_cover_youtube_url)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(settings.home_cover_youtube_url)}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="Hero Video"
                            />
                        </div>
                    ) : settings.home_cover_type === 'video' && settings.home_cover_video_path ? (
                        <video
                            src={`/storage/${settings.home_cover_video_path}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto block"
                        />
                    ) : (
                        <a href="#booking" className="w-full block overflow-hidden" title={locale === 'ar' ? 'احجز موعد استشارتك الآن' : 'Book a Consultation'}>
                            <img
                                src={getHeroImageSrc()}
                                alt="مركز بدر لطب الأسنان - Badr Dental Center"
                                className="w-full h-auto block"
                                fetchPriority="high"
                                decoding="async"
                                onError={(e) => { e.target.src = "/hero-banner.webp"; }}
                            />
                        </a>
                    )}
                </div>
            )}

            {/* Mobile Menu Fullscreen Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] xl:hidden flex flex-col p-6 sm:p-8 overflow-y-auto animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
                        <img
                            src="/current-logo.png"
                            alt="Badr Dental"
                            className="h-12 w-auto brightness-0 invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                            onError={(e) => { e.target.src = "/logo.png"; }}
                        />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2.5 rounded-2xl glass-dark border border-white/10 text-white hover:text-[#D4AF37] transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-5 text-center text-xl font-black">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                {link.children ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-white/40 text-sm py-1 uppercase tracking-wider">{link.label}</span>
                                        <ul className="flex flex-col items-center gap-3 mt-1">
                                            {link.children.map(child => (
                                                <li key={child.label}>
                                                    <Link
                                                        href={child.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`py-1.5 block text-lg font-bold ${
                                                            isCurrentUrl(child.href) ? 'text-[#D4AF37]' : 'text-white/80'
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`py-2 block transition-colors ${
                                            isCurrentUrl(link.href) ? 'text-[#D4AF37]' : 'text-white/90 hover:text-[#D4AF37]'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-10 flex flex-col gap-6 items-center border-t border-white/10">
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <Link
                                href="/offers"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-glow-gold bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black px-6 py-3 rounded-full font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Sparkles size={16} />
                                <span>{t('nav.offers')}</span>
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="glass-dark border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:border-[#D4AF37]"
                            >
                                <Calendar size={16} />
                                <span>{t('nav.book_now')}</span>
                            </Link>
                        </div>

                        <button
                            onClick={() => { switchLanguage(locale === 'ar' ? 'en' : 'ar'); setIsMobileMenuOpen(false); }}
                            className="flex items-center gap-2 text-base font-bold text-[#D4AF37] hover:underline"
                        >
                            <Globe size={18} />
                            <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}


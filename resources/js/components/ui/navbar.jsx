import { Link, useForm, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Search, Twitter, Youtube, Calendar, Globe, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { home, about, branches, contact } from '@/routes';
import language from '@/routes/language';
import { useCurrentUrl } from '@/hooks/use-current-url';

export default function NavBar({ showHero = true, heroOptions = {} }) {
    const { t } = useTranslations();
    const { locale, global_services, settings = {} } = usePage().props;

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const topServices = global_services || [];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { post } = useForm();
    const { isCurrentUrl } = useCurrentUrl();

    const switchLanguage = (newLocale) => {
        post(language.switch.url({ query: { locale: newLocale } }), {
            preserveScroll: true,
        });
    };



    const navLinks = [
        { href: home.url(), label: t('nav.home'), isRoute: true },
        { href: about.url(), label: t('nav.about'), isRoute: true },
        { href: '/services', label: t('nav.services'), isRoute: false },
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
            <div className="w-full z-50">
                {/* Layer 1: Top Service Bar */}
                <div
                    className="relative z-50 w-full overflow-hidden border-b border-white/10 bg-foreground py-3 text-background"
                    dir="ltr"
                >
                    {/* Gradient Overlays for the "Fade" effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-foreground to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-foreground to-transparent" />

                    <div className="flex w-max items-center">
                        {/* The Marquee Container */}
                        <div className="flex animate-marquee gap-12 whitespace-nowrap px-6 hover:[animation-play-state:paused] motion-reduce:animate-none">
                            {[...topServices, ...topServices].map((service, i) => (
                                <Link
                                    key={i}
                                    href={`/services/${service.url_key || service.id}`}
                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                    className="group flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-primary"
                                >
                                    {/* Add a subtle separator or icon for extra flair */}
                                    <span className="opacity-50 group-hover:opacity-100">•</span>
                                    {service.title}
                                </Link>
                            ))}
                        </div>

                        {/* Duplicate the set once for the seamless loop to catch the tail */}
                        <div className="flex animate-marquee gap-12 whitespace-nowrap px-6 hover:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
                            {[...topServices, ...topServices].map((service, i) => (
                                <Link
                                    key={`dup-${i}`}
                                    href={`/services/${service.url_key || service.id}`}
                                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                    className="group flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-primary"
                                >
                                    <span className="opacity-50 group-hover:opacity-100">•</span>
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Layer 2: Info Bar */}
                <div className="bg-foreground text-background py-2 px-4 lg:px-24 hidden md:flex justify-between items-center text-[15px] font-medium border-b border-white relative z-40">
                    <div className="flex items-center gap-5">
                        <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank"><Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank"><Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" rel="noopener noreferrer"><img src="/snapchat2.png" alt="Snapchat" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                        <a href="https://www.tiktok.com/@badrdentalcenter0" target="_blank" rel="noopener noreferrer"><img src='/tik-tok.png' alt="TikTok" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6 h-4">
                            <div className="flex items-center gap-2">
                                <Phone size={14} fill='white' className="text-foreground rotate-[270deg]" />
                                <span dir="ltr">01060000805</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} fill='white' className="text-foreground rotate-[270deg]" />
                                <span dir="ltr">01030000728</span>
                            </div>
                        </div>
                        <button
                            onClick={() => switchLanguage(locale === 'ar' ? 'en' : 'ar')}
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <span className="font-medium">{locale === 'ar' ? 'English' : 'العربية'}</span>
                        </button>
                    </div>
                </div>

                {/* Layer 3: Main Navigation */}
                <nav className="bg-white py-3 md:py-4 px-4 lg:px-24 flex justify-between items-center z-40 shadow-sm border-b border-border">
                    {/* Right Side: Logo and Nav Links */}
                    <div className="flex items-center gap-16">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img src="/logo.png" alt="Badr Dental" className="h-14 md:h-20 lg:h-24 w-auto drop-shadow-md" />
                        </Link>

                        <ul className="hidden xl:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.label} className="relative group">
                                    {link.children ? (
                                        <>
                                            <button className="flex items-center gap-1 text-foreground hover:text-primary font-bold transition-all text-[15px] py-1 cursor-pointer">
                                                {link.label}
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </button>
                                            <ul className="absolute top-full start-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[180px] overflow-hidden py-2 z-50">
                                                {link.children.map(child => (
                                                    <li key={child.label}>
                                                        <Link href={child.href} className={`block px-6 py-2.5 hover:bg-secondary/50 transition-colors text-[14px] font-bold ${isCurrentUrl(child.href) ? 'text-primary' : 'text-foreground'}`}>
                                                            {child.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`text-foreground hover:text-primary font-bold transition-all text-[15px] relative overflow-hidden py-1 block group ${isCurrentUrl(link.href) ? 'text-primary' : ''}`}
                                        >
                                            {link.label}
                                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform origin-start ${isCurrentUrl(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Left Side: CTA Buttons + Hamburger */}
                    <div className="flex items-center gap-2 md:gap-3 xl:gap-5">
                        {/* Offers button — hidden on very small screens, visible from sm up */}
                        <Link
                            href="/offers"
                            className="flex bg-primary text-primary-foreground px-4 md:px-8 py-2 md:py-3.5 rounded-full font-black text-xs md:text-sm items-center gap-1.5 md:gap-3 hover:bg-foreground hover:text-primary transition-all duration-500 shadow-xl shadow-black/10 group whitespace-nowrap"
                        >
                            <Calendar size={15} className="group-hover:rotate-12 transition-transform hidden md:block" />
                            {t('nav.offers')}
                        </Link>

                        {/* Book Now button */}
                        <Link
                            href="/contact"
                            className="bg-foreground text-background px-4 md:px-8 py-2 md:py-3.5 rounded-full font-black text-xs md:text-sm flex items-center gap-1.5 md:gap-3 hover:bg-foreground hover:text-primary transition-all duration-500 shadow-xl shadow-black/10 group whitespace-nowrap"
                        >
                            <Calendar size={15} className="group-hover:rotate-12 transition-transform hidden md:block" />
                            {t('nav.book_now')}
                        </Link>

                        {/* Hamburger — only visible below xl */}
                        <button
                            className="xl:hidden p-2.5 hover:bg-secondary rounded-xl transition-colors border border-border"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={22} className="text-foreground" />
                        </button>
                    </div>
                </nav>
            </div>

            {/* This container will sit after the Nav */}
            <div className="relative">
                {/* Hero Section */}
                {showHero && (
                    <div className="w-full relative overflow-hidden flex flex-col items-center justify-center bg-foreground">
                        {settings.home_cover_type === 'youtube' && settings.home_cover_youtube_url ? (
                            /* 
                             * YouTube Responsive Embed
                             * Uses padding-bottom trick (56.25% = 16:9 ratio) to maintain aspect ratio
                             * on ALL screen sizes including mobile without overflow.
                             */
                            <div
                                className="w-full overflow-hidden pointer-events-none"
                                style={{ position: 'relative', paddingBottom: '56.25%', maxHeight: '85vh' }}
                            >
                                <iframe
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                    src={`https://www.youtube.com/embed/${getYouTubeId(settings.home_cover_youtube_url)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(settings.home_cover_youtube_url)}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    title="Hero Video"
                                ></iframe>
                            </div>
                        ) : settings.home_cover_type === 'video' && settings.home_cover_video_path ? (
                            <video
                                src={`/storage/${settings.home_cover_video_path}`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto object-cover max-h-[85vh] aspect-video"
                                style={{ display: 'block' }}
                            />
                        ) : (
                            <img
                                src={settings.home_cover_type === 'image' && settings.home_cover_image_path ? `/storage/${settings.home_cover_image_path}` : "/doctors.png"}
                                alt="Hero"
                                className="w-full h-auto object-cover max-h-[85vh]"
                                style={{ display: 'block' }}
                            />
                        )}
                        
                        {/* Scroll Down Hint for UX */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce hidden lg:block">
                            <div 
                                onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center cursor-pointer hover:border-primary transition-colors text-white/50 hover:text-primary"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* Wave Divider at absolute bottom of the hero area */}
                        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
                            <img
                                src="/hero.svg"
                                alt="Wave Divider"
                                className="w-full h-auto min-h-[40px] lg:min-h-[80px] object-fill brightness-0 invert opacity-10"
                            />
                        </div>
                    </div>
                )}

                {showHero && (heroOptions.subtitle || heroOptions.description) && (
                    <div id="hero-content-anchor" className="flex items-center justify-start px-4 lg:px-24 py-12 bg-background border-b border-border/50 scroll-mt-20">
                        <div className="max-w-2xl">
                            {heroOptions.subtitle && (
                                <h2 className="text-3xl lg:text-5xl text-foreground font-black mb-4 tracking-tighter leading-tight">
                                    {heroOptions.subtitle}
                                </h2>
                            )}
                            {heroOptions.description && (
                                <p className="text-lg lg:text-xl text-muted-foreground font-medium max-w-xl">
                                    {heroOptions.description}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Overlay - Refined */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-card z-[60] xl:hidden flex flex-col p-8 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-16">
                        <img src="/logo.svg" alt="Badr Dental" className="h-14 w-auto"
                            onError={(e) => { e.target.src = "https://placehold.co/120x50?text=LOGO"; }} />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full border border-border">
                            <X size={32} />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-8 text-center text-3xl font-black">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                {link.children ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-foreground/50 py-2 block uppercase tracking-tight">{link.label}</span>
                                        <ul className="flex flex-col items-center gap-4 mt-2">
                                            {link.children.map(child => (
                                                <li key={child.label}>
                                                    <Link
                                                        href={child.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`hover:text-primary transition-colors py-2 block text-2xl uppercase tracking-tight ${isCurrentUrl(child.href) ? 'text-primary' : 'text-foreground'}`}
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
                                        className={`hover:text-primary transition-colors py-2 block uppercase tracking-tight ${isCurrentUrl(link.href) ? 'text-primary' : ''}`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-16 flex flex-col gap-6 items-center border-t border-border/50">
                        {/* CTA buttons inside mobile menu for very small screens */}
                        <div className="flex flex-col sm:hidden gap-4 w-full max-w-xs">
                            <Link
                                href="/offers"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-black text-base flex items-center justify-center gap-3 shadow-lg"
                            >
                                <Calendar size={18} />
                                {t('nav.offers')}
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-foreground text-background px-6 py-3 rounded-full font-black text-base flex items-center justify-center gap-3 shadow-lg"
                            >
                                <Calendar size={18} />
                                {t('nav.book_now')}
                            </Link>
                        </div>

                        <button
                            onClick={() => { switchLanguage(locale === 'ar' ? 'en' : 'ar'); setIsMobileMenuOpen(false); }}
                            className="flex items-center gap-4 text-xl font-black uppercase text-primary"
                        >
                            <Globe />
                            {locale === 'ar' ? 'English' : 'العربية'}
                        </button>

                        <div className="flex gap-8">
                            <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank"><Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                            <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank"><Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                            <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" rel="noopener noreferrer"><img src="/snapchat-black.png" alt="Snapchat" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                            <a href="https://www.tiktok.com/@badrdentalcenter0" target="_blank" rel="noopener noreferrer"><img src='/tik-tok-black.png' alt="TikTok" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

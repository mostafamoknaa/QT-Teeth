import { Link, useForm, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Search, Twitter, Youtube, Calendar, Globe, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { home, about, branches, contact } from '@/routes';
import language from '@/routes/language';
import { useCurrentUrl } from '@/hooks/use-current-url';

export default function NavBar({ showHero = true, heroOptions = {} }) {
    const { t } = useTranslations();
    const { locale, global_services } = usePage().props;
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
                                href={`/services/${service.id}`}
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
                                href={`/services/${service.id}`}
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

            {/* This container will sit on top of the Hero */}
            <div className="relative min-h-[550px] lg:min-h-[750px] flex flex-col">
                {/* Hero Section (Integrated into Header) - Backround Only */}
                {showHero && (
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                            src={heroOptions.bgImage || "/hero.png"} 
                            alt="Dental Hero" 
                            className="w-full h-full object-cover grayscale-[0.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent"></div>
                        
                        {/* Wave Divider at absolute bottom of the hero area */}
                        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
                            <img 
                                src="/hero.svg" 
                                alt="Wave Divider" 
                                className="w-full h-auto min-h-[60px] lg:min-h-[100px] object-fill"
                            />
                        </div>
                    </div>
                )}

                {/* Layer 2: Info Bar (Transparent) */}
                <div className="bg-background text-foreground py-2 px-4 lg:px-24 hidden md:flex justify-between items-center text-[15px] font-medium border-b border-white/5 relative z-40">
                    <div className="flex items-center gap-5">
                        <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank"><Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank"><Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" ><img src="/snapchat-black.png" className="hover:text-primary transition-colors cursor-pointer"  /></a>
                        <a href="https://www.tiktok.com/@dr.ahmedbadr0?_t=8shhUk6k9qc&_r=1" target="_blank"><img src='/tik-tok-black.png' className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6 h-4">
                            <div className="flex items-center gap-2">
                                <Phone size={14} fill='black' className="text-foreground rotate-[270deg]" />
                                <span dir="ltr">01060000805</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} fill='black' className="text-foreground rotate-[270deg]" />
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

                {/* Layer 3: Main Navigation (Transparent + Sticky) */}
                <nav className="bg-background/40 border-b border-white/5 py-4 px-4 lg:px-24 flex justify-between items-center sticky top-0 z-40 shadow-sm shadow-black/5">
                    {/* Right Side: Logo and Menu (Markup order for RTL Start) */}
                    <div className="flex items-center gap-16">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img src="/logo.png" alt="Badr Dental" className="h-20 lg:h-24 w-auto drop-shadow-md" />
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
                                            <ul className="absolute top-full start-0 mt-2 bg-background border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[180px] overflow-hidden py-2 z-50">
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

                    {/* Left Side: CTA and Search */}
                    <div className="flex items-center gap-5">
                        {/* <button className="hidden sm:flex bg-background p-2.5 hover:bg-white/10 rounded-full transition-colors border border-transparent hover:border-white/20">
                            <Search size={22} className="text-foreground" />
                        </button> */}
                        
                        <Link 
                            href="/contact"
                            className="bg-foreground text-background px-8 py-3.5 rounded-full font-black text-sm flex items-center gap-3 hover:bg-foreground hover:text-primary transition-all duration-500 shadow-xl shadow-black/10 group"
                        >
                            <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                            {t('nav.book_now')}
                        </Link>

                        <button 
                            className="xl:hidden p-3 hover:bg-white/10 rounded-xl transition-colors border border-white/20"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={26} className="text-foreground" />
                        </button>
                    </div>
                </nav>

                {showHero && (
                    <div className="flex-grow flex items-center justify-start px-4 lg:px-24 pointer-events-none relative z-30">
                        <div className="max-w-2xl pointer-events-auto mt-[-100px]">
                            <h1 className="text-4xl lg:text-[60px] font-foreground mb-4 leading-[1.1] tracking-tighter drop-shadow-2xl text-foreground text-start">
                                {heroOptions.title || t('hero.title')}
                            </h1>
                            {heroOptions.subtitle && (
                                <h2 className="text-2xl lg:text-3xl text-foreground font-bold mb-4 drop-shadow-lg text-start leading-snug">
                                    {heroOptions.subtitle}
                                </h2>
                            )}
                            {heroOptions.description && (
                                <p className="text-lg lg:text-xl text-foreground/90 font-medium mb-8 drop-shadow text-start leading-relaxed max-w-xl">
                                    {heroOptions.description}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Overlay - Refined */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background z-[60] xl:hidden flex flex-col p-8 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
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

                    <div className="mt-auto pt-16 flex flex-col gap-10 items-center border-t border-border/50">
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
                            <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" ><img src="/snapchat-black.png" className="hover:text-primary transition-colors cursor-pointer"  /></a>
                            <a href="https://www.tiktok.com/@dr.ahmedbadr0?_t=8shhUk6k9qc&_r=1" target="_blank"><img src='/tik-tok-black.png' className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

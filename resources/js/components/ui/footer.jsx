import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube, Send, MessageCircle, Pin as Pinterest, Music } from 'lucide-react';
import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { home, about, branches } from '@/routes';

export default function Footer() {
    const { t } = useTranslations();
    const { locale, global_services } = usePage().props;
    const services = global_services || [];

    const quickLinks = [
        { label: t('nav.home'), href: home.url() },
        { label: t('nav.about'), href: about.url() },
        { label: t('nav.services'), href: '/services' },
        { label: t('nav.clients'), href: '/clients' },
        { label: t('nav.articles'), href: '/articles' },
        { label: t('nav.doctors'), href: '/doctors' },
        { label: t('nav.branches'), href: branches.url() },
    ];

    return (
        <footer className="bg-foreground text-background pt-24 pb-12 px-4 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                {/* Brand & Social */}
                <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-start">
                    <img src="/logo.svg" alt="Badr Dental" className="h-20 w-auto brightness-0 invert self-center md:self-start" 
                         onError={(e) => { e.target.src = "https://placehold.co/180x80?text=LOGO&bg=1a1a1a&clr=ffffff"; }} />
                    <p className="text-background leading-relaxed font-bold text-2xl">
                         رائدون في تجميل وزراعة الأسنان بمصر منذ 2014. فخامة التجربة وأحدث التقنيات العالمية.
                    </p>
                    <div className="flex gap-5 mt-2 justify-center md:justify-start">
                        <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank" rel="noopener noreferrer"><Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" rel="noopener noreferrer"><img src="/snapchat2.png" alt="Snapchat" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                        <a href="https://www.tiktok.com/@badrdentalcenter0" target="_blank" rel="noopener noreferrer"><img src='/tik-tok.png' alt="TikTok" className="hover:text-primary transition-colors cursor-pointer h-6 w-6" /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-start">
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.quick_links')}
                    </h4>
                    <ul className="flex flex-col gap-5 items-center md:items-start">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-[15px] font-bold uppercase tracking-tight">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div className="text-center md:text-start">
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.our_services')}
                    </h4>
                    <ul className="flex flex-col gap-5 items-center md:items-start">
                        {services.map((service) => (
                            <li key={service.id}>
                                <Link href={`/services/${service.url_key || service.id}`} className="text-muted-foreground hover:text-primary transition-colors text-lg cursor-pointer font-bold uppercase tracking-tight">
                                    {service.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="text-center md:text-start">
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.contact_us')}
                    </h4>
                    <ul className="flex flex-col gap-8 text-lg font-bold">
                        <li className="flex flex-col gap-2 items-center md:items-start">
                            <span className="text-background uppercase tracking-wider text-xl flex items-center gap-2">
                                <MapPin size={20} className="text-primary" />
                                {t('branches_page.mansoura.title')}
                            </span>
                            <div className="flex flex-col gap-1 items-center md:items-start">
                                <span className="text-muted-foreground" dir="ltr">01060000805</span>
                                <a 
                                    href={t('branches_page.mansoura_map')} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm hover:underline flex items-center gap-1 mt-1"
                                >
                                    {t('branches_page.open_map')}
                                </a>
                            </div>
                        </li>
                        <li className="flex flex-col gap-2 items-center md:items-start">
                            <span className="text-background uppercase tracking-wider text-xl flex items-center gap-2">
                                <MapPin size={20} className="text-primary" />
                                {t('branches_page.sheikh_zayed.title')}
                            </span>
                            <div className="flex flex-col gap-1 items-center md:items-start">
                                <span className="text-muted-foreground" dir="ltr">01030000728</span>
                                <a 
                                    href={t('branches_page.sheikh_zayed_map')} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm hover:underline flex items-center gap-1 mt-1"
                                >
                                    {t('branches_page.open_map')}
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Payment Providers Section */}
            <div className="border-t border-background/10 pt-16 pb-8">
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100">
                    {[
                        { src: '/aman.jpg', alt: 'Aman' },
                        { src: '/emkan.png', alt: 'Emkan' },
                        { src: '/forsa2.png', alt: 'Forsa' },
                        { src: '/klivvr2.jpg', alt: 'Klivvr' },
                        { src: '/mid.png', alt: 'Mid' },
                        { src: '/mis.jpg', alt: 'Mis' },
                        { src: '/tamara.png', alt: 'Tamara' },
                        { src: '/tru.jpg', alt: 'Tru' },
                        { src: '/contact.jpg', alt: 'Contact' },
                        { src: '/seven.jpg', alt: 'Seven' },
                        { src: '/paylink2.jpg', alt: 'Paylink' },
                        { src: '/souhoola.jpg', alt: 'Souhoola' },
                        { src: '/tabby.jpg', alt: 'Tabby' },
                        { src: '/visa.jpg', alt: 'Visa' },
                        { src: '/valu.jpg', alt: 'ValU' },
                    ].map((provider, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all h-10 md:h-12 flex items-center justify-center">
                            <img 
                                src={provider.src} 
                                alt={provider.alt} 
                                className="max-h-full w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-background/10 pt-12 text-center">
                <p className="text-background text-sm font-medium">
                    Developed and Maintained by <a href="https://falak-innovation.com/" target="_blank" className="text-primary hover:underline">Falak Innovation</a> © All Rights Reserved - Badr Dental Center.
                </p>
            </div>
        </footer>
    );
}

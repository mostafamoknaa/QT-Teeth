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
                <div className="flex flex-col gap-8">
                    <img src="/logo.svg" alt="Badr Dental" className="h-20 w-auto brightness-0 invert self-start" 
                         onError={(e) => { e.target.src = "https://placehold.co/180x80?text=LOGO&bg=1a1a1a&clr=ffffff"; }} />
                    <p className="text-background leading-relaxed font-bold text-2xl">
                         رائدون في تجميل وزراعة الأسنان بمصر منذ 2014. فخامة التجربة وأحدث التقنيات العالمية.
                    </p>
                    <div className="flex gap-5 mt-2">
                        <a href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL" target="_blank"><Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D" target="_blank"><Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                        <a href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US" target="_blank" ><img src="/snapchat2.png" className="hover:text-primary transition-colors cursor-pointer"  /></a>
                        <a href="https://www.tiktok.com/@dr.ahmedbadr0?_t=8shhUk6k9qc&_r=1" target="_blank"><img src='/tik-tok.png' className="hover:text-primary transition-colors cursor-pointer" size={24} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.quick_links')}
                    </h4>
                    <ul className="flex flex-col gap-5">
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
                <div>
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.our_services')}
                    </h4>
                    <ul className="flex flex-col gap-5">
                        {services.map((service) => (
                            <li key={service.id}>
                                <Link href={`/services/${service.id}`} className="text-muted-foreground hover:text-primary transition-colors text-lg cursor-pointer font-bold uppercase tracking-tight">
                                    {service.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h4 className="text-background font-black text-xl mb-10 uppercase tracking-tight">
                        {t('footer.contact_us')}
                    </h4>
                    <ul className="flex flex-col gap-8 text-lg font-bold">
                        <li className="flex flex-col gap-2">
                            <span className="text-background uppercase tracking-wider text-lg">فرع المنصورة</span>
                            <span className="text-muted-foreground" dir="ltr">01060000805</span>
                        </li>
                        <li className="flex flex-col gap-2">
                            <span className="text-background uppercase tracking-wider text-lg">فرع الشيخ زايد</span>
                            <span className="text-muted-foreground" dir="ltr">01030000728</span>
                        </li>
                    </ul>
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

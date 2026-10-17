import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { home, about, branches } from '@/routes';

export default function Footer() {
    const { t } = useTranslations();
    const { locale, global_services, settings } = usePage().props;
    const isRTL = locale === 'ar';
    const services = global_services || [];

    const quickLinks = [
        { label: t('nav.home'), href: home.url() },
        { label: t('nav.about'), href: about.url() },
        { label: t('nav.services'), href: '/services' },
        { label: t('nav.gallery') || 'معرض الحالات', href: '/gallery' },
        { label: t('nav.clients'), href: '/clients' },
        { label: t('nav.articles'), href: '/articles' },
        { label: t('nav.doctors'), href: '/doctors' },
        { label: t('nav.branches'), href: branches.url() },
    ];

    const paymentProviders = [
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
    ];

    return (
        <footer className="relative bg-[#0d0d0d] text-white pt-24 pb-12 px-6 lg:px-20 border-t border-[#D4AF37]/25 overflow-hidden">
            {/* Top Gold Ambient Glow & Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-14 bg-[#D4AF37]/15 blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 mb-16">
                    {/* Column 1: Brand & Socials (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 items-center md:items-start text-center md:text-start">
                        <Link href="/" className="inline-block">
                            <img
                                src="/current-logo.png"
                                alt="Badr Dental Center"
                                className="h-16 w-auto brightness-0 invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                                onError={(e) => { e.target.src = "/logo.png"; }}
                            />
                        </Link>
                        <p className="text-white/75 text-sm sm:text-base leading-relaxed font-medium">
                            {locale === 'ar'
                                ? 'رائدون في علاج وتجميل وزراعة الأسنان في مصر منذ 2014. أكثر من 30 استشاري وأخصائي يقدمون أعلى درجات العناية الطبية بأحدث التقنيات.'
                                : 'Pioneers in aesthetic dentistry and implantology in Egypt since 2014. Over 30 consultants providing the highest standard of dental care.'}
                        </p>

                        {/* Social Media Links with Brand Hover Effects */}
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://www.facebook.com/Badrdentalclinic?mibextid=ZbWKwL"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 transition-all duration-300 shadow-md"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/badrdentalcenter?igsh=MTVianA4aTBhdHMyaQ%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white/80 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:scale-110 transition-all duration-300 shadow-md"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://www.snapchat.com/@ahmed_badr7655?share_id=iAcAUxzxQ_E&locale=en-US"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Snapchat"
                                className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00] hover:scale-110 transition-all duration-300 shadow-md p-2"
                            >
                                <img src="/snapchat2.png" alt="Snapchat" className="w-5 h-5 object-contain" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@badrdentalcenter0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white/80 hover:bg-black hover:text-[#00f2fe] hover:border-white/40 hover:scale-110 transition-all duration-300 shadow-md p-2"
                            >
                                <img src='/tik-tok.png' alt="TikTok" className="w-5 h-5 object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (2.5 cols) */}
                    <div className="lg:col-span-2 text-center md:text-start">
                        <h4 className="text-[#D4AF37] font-black text-base uppercase tracking-wider mb-6 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{t('footer.quick_links')}</span>
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-[#D4AF37] transition-all text-sm font-medium hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services (2.5 cols) */}
                    <div className="lg:col-span-3 text-center md:text-start">
                        <h4 className="text-[#D4AF37] font-black text-base uppercase tracking-wider mb-6 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{t('footer.our_services')}</span>
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {services.slice(0, 6).map((service) => (
                                <li key={service.id}>
                                    <Link
                                        href={`/services/${service.url_key || service.id}`}
                                        className="text-white/70 hover:text-[#D4AF37] transition-all text-sm font-medium hover:translate-x-1 inline-block line-clamp-1"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Branches (3 cols) */}
                    <div className="lg:col-span-3 text-center md:text-start">
                        <h4 className="text-[#D4AF37] font-black text-base uppercase tracking-wider mb-6 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{t('footer.contact_us')}</span>
                        </h4>
                        <ul className="flex flex-col gap-5 text-sm">
                            {settings?.whatsapp_number && (
                                <li className="flex flex-col gap-1 items-center md:items-start glass-dark p-3 rounded-2xl border border-white/5">
                                    <span className="text-[#25D366] font-bold flex items-center gap-2 text-xs">
                                        <MessageCircle size={16} />
                                        {t('footer.whatsapp')}
                                    </span>
                                    <a
                                        href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/90 hover:text-[#25D366] font-mono text-xs transition-colors flex items-center gap-1.5 mt-0.5"
                                        dir="ltr"
                                    >
                                        <span>{settings.whatsapp_number}</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </li>
                            )}

                            {/* Mansoura Branch */}
                            <li className="flex flex-col gap-1 items-center md:items-start glass-dark p-3 rounded-2xl border border-white/5">
                                <span className="text-[#D4AF37] font-bold flex items-center gap-1.5 text-xs">
                                    <MapPin size={15} />
                                    {t('branches_page.mansoura.title')}
                                </span>
                                <div className="flex items-center justify-between w-full gap-2 text-xs mt-0.5">
                                    <span className="text-white/75 font-mono" dir="ltr">01060000805</span>
                                    <a
                                        href={t('branches_page.mansoura_map')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#D4AF37] hover:underline text-[11px] font-semibold"
                                    >
                                        {t('branches_page.open_map')}
                                    </a>
                                </div>
                            </li>

                            {/* Sheikh Zayed Branch */}
                            <li className="flex flex-col gap-1 items-center md:items-start glass-dark p-3 rounded-2xl border border-white/5">
                                <span className="text-[#D4AF37] font-bold flex items-center gap-1.5 text-xs">
                                    <MapPin size={15} />
                                    {t('branches_page.sheikh_zayed.title')}
                                </span>
                                <div className="flex items-center justify-between w-full gap-2 text-xs mt-0.5">
                                    <span className="text-white/75 font-mono" dir="ltr">01030000728</span>
                                    <a
                                        href={t('branches_page.sheikh_zayed_map')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#D4AF37] hover:underline text-[11px] font-semibold"
                                    >
                                        {t('branches_page.open_map')}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Payment Providers Section */}
                <div className="border-t border-white/10 pt-12 pb-8">
                    <div className="text-center mb-6">
                        <span className="text-[11px] font-bold tracking-widest text-white/50 uppercase">
                            {locale === 'ar' ? 'طرق الدفع والتقسيط المعتمدة' : 'OFFICIAL PAYMENT & INSTALLMENT PARTNERS'}
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-5xl mx-auto">
                        {paymentProviders.map((provider, i) => (
                            <div
                                key={i}
                                className="bg-white/95 hover:bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-all h-10 flex items-center justify-center border border-white/20 hover:scale-105"
                            >
                                <img
                                    src={provider.src}
                                    alt={provider.alt}
                                    className="max-h-full w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Copyrights */}
                <div className="border-t border-white/10 pt-8 text-center text-xs text-white/60">
                    <p>
                        {settings?.copyrights || `© ${new Date().getFullYear()} Badr Dental Center. All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
}


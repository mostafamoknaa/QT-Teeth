import { router, Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import NavBar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import OfferFloatingCarousel from '@/components/ui/offer-floating-carousel';
import FloatingWhatsApp from '@/components/ui/floating-whatsapp';

export default function AppLayout({ children, heroOptions }) {
    const { locale, canonical_url } = usePage().props;
    const isRtl = locale === 'ar';

    useEffect(() => {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
    }, [locale, isRtl]);

    useEffect(() => {
        document.body.classList.add('public-bg');
        return () => document.body.classList.remove('public-bg');
    }, []);

    useEffect(() => {
        const unbind = router.on('finish', () => {
            // Do not override scroll if the URL target is a hash anchor
            if (window.location.hash) return;

            // Auto-scroll logic for large screens to avoid navigation confusion
            if (window.innerWidth >= 1024) {
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    setTimeout(() => {
                        if (window.location.hash) return;
                        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 500); // 500ms delay to ensure Inertia finished its own scroll handling
                }
            }
        });
        return () => unbind();
    }, []);

    const pageCanonical = canonical_url || 'https://badrdentalcenter.com';

    return (
        <div className="min-h-screen bg-transparent text-foreground font-tajawal selection:bg-primary/30">
            {/* Shared base meta — each page overrides title/description via its own <Head> */}
            <Head>
                <meta property="og:site_name" content={isRtl ? 'مركز بدر لطب الأسنان' : 'Badr Dental Center'} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={isRtl ? 'ar_EG' : 'en_US'} />
                <meta property="og:locale:alternate" content={isRtl ? 'en_US' : 'ar_EG'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#09090b" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                
                {/* Canonical & Multilingual Alternate Hreflang */}
                <link rel="canonical" href={pageCanonical} />
                <link rel="alternate" hrefLang="ar" href={pageCanonical} />
                <link rel="alternate" hrefLang="en" href={pageCanonical} />
                <link rel="alternate" hrefLang="x-default" href={pageCanonical} />

                {/* Local SEO Geo Tags */}
                <meta name="geo.region" content="EG-DK, EG-GZ" />
                <meta name="geo.placename" content="Mansoura, Sheikh Zayed" />
            </Head>

            <NavBar heroOptions={heroOptions} />
            
            <main id="main-content" className="relative scroll-mt-24">
                {children}
            </main>

            <OfferFloatingCarousel />
            <FloatingWhatsApp />

            <Footer />
        </div>
    );
}

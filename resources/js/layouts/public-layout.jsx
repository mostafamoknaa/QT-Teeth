import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import NavBar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import OfferFloatingCarousel from '@/components/ui/offer-floating-carousel';

export default function AppLayout({ children, heroOptions }) {
    const { locale } = usePage().props;
    const isRtl = locale === 'ar';

    useEffect(() => {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
    }, [locale, isRtl]);

    useEffect(() => {
        document.body.classList.add('public-bg');
        return () => document.body.classList.remove('public-bg');
    }, []);

    return (
        <div className="min-h-screen bg-transparent text-foreground font-tajawal selection:bg-primary/30">
            <Head>
                <title>Badr Dental Center</title>
                <meta name="description" content="Pioneers in dental cosmetics and implants in Egypt since 2014." />
            </Head>

            <NavBar heroOptions={heroOptions} />
            
            <main className="relative">
                {children}
            </main>

            <OfferFloatingCarousel />

            <Footer />
        </div>
    );
}

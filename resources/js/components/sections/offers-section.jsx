import React, { useRef, useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Percent, Clock, Tag } from 'lucide-react';

function useCountdown(validUntil) {
    const [left, setLeft] = useState(null);
    useEffect(() => {
        if (!validUntil) return;
        const calc = () => {
            const diff = new Date(validUntil) - new Date();
            if (diff <= 0 || diff > 30 * 86400000) { setLeft(null); return; }
            setLeft(Math.floor(diff / 86400000));
        };
        calc();
        const t = setInterval(calc, 3600000);
        return () => clearInterval(t);
    }, [validUntil]);
    return left;
}

function OfferCard({ offer, locale, t }) {
    const daysLeft = useCountdown(offer.valid_until);
    return (
        <div className="group relative flex-shrink-0 w-72 md:w-80 bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1 snap-start flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                    src={offer.image ? `/storage/${offer.image}` : '/clinic-2.png'}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {offer.discount_percentage && (
                    <div className="absolute top-4 start-4 bg-[#D4AF37] text-black font-black text-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-[#D4AF37]/30">
                        <Percent size={12} />{offer.discount_percentage}
                    </div>
                )}
                {offer.badge_text && (
                    <div className="absolute top-4 end-4 bg-black/70 backdrop-blur text-white font-bold text-xs px-3 py-1 rounded-full">
                        {offer.badge_text}
                    </div>
                )}
                {daysLeft !== null && (
                    <div className="absolute bottom-4 start-4 flex items-center gap-1 text-white text-xs font-bold bg-black/50 backdrop-blur px-2.5 py-1 rounded-full">
                        <Clock size={10} />{daysLeft === 0 ? (locale === 'ar' ? 'ينتهي اليوم!' : 'Ends today!') : `${daysLeft} ${locale === 'ar' ? 'يوم متبقي' : 'd left'}`}
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col gap-2.5 flex-1">
                {offer.service && (
                    <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">{offer.service.title}</span>
                )}
                <h3 className="font-black text-base leading-snug text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors line-clamp-2">{offer.title}</h3>
                {(offer.original_price || offer.discounted_price) && (
                    <div className="flex items-baseline gap-2">
                        {offer.original_price && <span className="text-xs text-gray-400 line-through">{Number(offer.original_price).toLocaleString()}</span>}
                        {offer.discounted_price && <span className="text-lg font-black text-[#D4AF37]">{Number(offer.discounted_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>}
                    </div>
                )}
                <Link
                    href={`/contact?offer=${offer.id}`}
                    className="mt-auto w-full bg-[#1A1A1A] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                    {t('pages.offers.book_now')}
                    <ArrowLeft size={14} className="rtl:rotate-180" />
                </Link>
            </div>
        </div>
    );
}

export default function OffersSection({ offers = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const scrollRef = useRef(null);

    if (!offers || offers.length === 0) return null;

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/3 to-transparent pointer-events-none" />

            <div className="px-6 lg:px-24 mb-10 flex items-end justify-between">
                <div>
                    {/* Section eyebrow */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-0.5 w-8 bg-[#D4AF37] rounded-full" />
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                            {locale === 'ar' ? 'عروض وخصومات' : 'Offers & Deals'}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-background tracking-tight leading-snug">
                        {locale === 'ar' ? 'عروضنا الحصرية' : 'Our Exclusive Offers'}
                    </h2>
                </div>
                <Link
                    href="/offers"
                    className="hidden md:flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-background transition-colors group shrink-0"
                >
                    {locale === 'ar' ? 'كل العروض' : 'All Offers'}
                    <ArrowLeft size={16} className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* Horizontally scrollable row */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide px-6 lg:px-24 pb-4 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {offers.map(offer => (
                    <OfferCard key={offer.id} offer={offer} locale={locale} t={t} />
                ))}
            </div>

            {/* Mobile "View All" */}
            <div className="md:hidden flex justify-center mt-8">
                <Link href="/offers" className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-black text-sm hover:bg-[#1A1A1A] hover:text-[#D4AF37] transition-all duration-300">
                    {locale === 'ar' ? 'عرض كل العروض' : 'View All Offers'}
                </Link>
            </div>
        </section>
    );
}

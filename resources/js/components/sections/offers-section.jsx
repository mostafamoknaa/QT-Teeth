import React, { useRef, useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, ArrowRight, Percent, Clock, Tag, Sparkles } from 'lucide-react';

function useCountdown(validUntil) {
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(() => {
        if (!validUntil) return;
        const calc = () => {
            const diff = new Date(validUntil).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, expired: true });
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            setTimeLeft({ days, hours, minutes, expired: false });
        };
        calc();
        const t = setInterval(calc, 60000);
        return () => clearInterval(t);
    }, [validUntil]);
    return timeLeft;
}

function OfferCard({ offer, locale, t, index = 0 }) {
    const countdown = useCountdown(offer.valid_until);
    const isRTL = locale === 'ar';
    const floatClass = index % 2 === 0 ? 'card-float-up-down' : 'card-float-down-up';

    return (
        <div
            style={{ animationDelay: `${index * 0.4}s` }}
            className={`group relative flex-shrink-0 w-80 sm:w-88 glass-dark rounded-[2.2rem] overflow-hidden border border-white/10 hover:border-[#D4AF37]/70 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/25 hover:-translate-y-2 snap-start flex flex-col bg-black/60 ${floatClass}`}
        >
            {/* Image Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                    src={offer.image ? `/storage/${offer.image}` : '/clinic-2.png'}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Ribbon Discount Badge */}
                {offer.discount_percentage && (
                    <div className="absolute top-4 start-4 bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl badge-float">
                        <Percent className="w-3.5 h-3.5" />
                        <span>خصم {offer.discount_percentage}</span>
                    </div>
                )}

                {/* Secondary Badge */}
                {offer.badge_text && (
                    <div className="absolute top-4 end-4 glass-dark text-[#D4AF37] font-bold text-xs px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                        {offer.badge_text}
                    </div>
                )}

                {/* Countdown Timer Chips */}
                {countdown && !countdown.expired && (
                    <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between glass-dark px-3 py-1.5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                            <span>{locale === 'ar' ? 'ينتهي العرض خلال:' : 'Ends in:'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
                            {countdown.days > 0 && (
                                <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded">
                                    {countdown.days}{locale === 'ar' ? 'ي' : 'd'}
                                </span>
                            )}
                            <span className="bg-white/10 text-white px-1.5 py-0.5 rounded">
                                {countdown.hours}{locale === 'ar' ? 'س' : 'h'}
                            </span>
                            <span className="bg-white/10 text-white px-1.5 py-0.5 rounded">
                                {countdown.minutes}{locale === 'ar' ? 'د' : 'm'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div>
                    {offer.service && (
                        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                            {offer.service.title}
                        </span>
                    )}
                    <h3 className="font-extrabold text-lg leading-snug text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {offer.title}
                    </h3>
                </div>

                {/* Pricing Block */}
                {(offer.original_price || offer.discounted_price) && (
                    <div className="flex items-baseline gap-3 pt-1">
                        {offer.discounted_price && (
                            <span className="text-xl font-black text-[#D4AF37] tracking-tight">
                                {Number(offer.discounted_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}
                            </span>
                        )}
                        {offer.original_price && (
                            <span className="text-xs text-white/40 line-through">
                                {Number(offer.original_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}
                            </span>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                <Link
                    href={`/contact?offer=${offer.id}`}
                    className="btn-glow-gold mt-2 w-full bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                    <span>{t('pages.offers.book_now')}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
            </div>
        </div>
    );
}

export default function OffersSection({ offers = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!scrollRef.current || isHovered) return;
        const container = scrollRef.current;
        const interval = setInterval(() => {
            if (!container) return;
            const cardWidth = 340;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = Math.abs(container.scrollLeft);

            if (currentScroll >= maxScroll - 20) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const direction = isRTL ? -1 : 1;
                container.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
            }
        }, 3600);

        return () => clearInterval(interval);
    }, [isHovered, isRTL]);

    if (!offers || offers.length === 0) return null;

    const scrollLeft = () => {
        if (!scrollRef.current) return;
        const direction = isRTL ? 1 : -1;
        scrollRef.current.scrollBy({ left: 340 * direction, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (!scrollRef.current) return;
        const direction = isRTL ? -1 : 1;
        scrollRef.current.scrollBy({ left: 340 * direction, behavior: 'smooth' });
    };

    return (
        <section id="offers" className="py-20 md:py-28 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 start-1/4 w-[500px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="px-6 lg:px-24 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 reveal">
                <div>
                    <div className="eyebrow mb-3">
                        {locale === 'ar' ? 'عروض وباقات حصرية' : 'EXCLUSIVE PACKAGES'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        {locale === 'ar' ? 'أقوى عروض مركز بدر للأسنان' : 'Our Exclusive Offers'}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    {/* Prev/Next arrows for offers */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={isRTL ? scrollRight : scrollLeft}
                            className="rounded-full border border-white/15 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
                            aria-label="Previous offers"
                        >
                            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                        </button>
                        <button
                            type="button"
                            onClick={isRTL ? scrollLeft : scrollRight}
                            className="rounded-full border border-white/15 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
                            aria-label="Next offers"
                        >
                            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>

                    <Link
                        href="/offers"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark text-white/90 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 text-xs font-bold transition-all shrink-0"
                    >
                        <span>{locale === 'ar' ? 'عرض جميع العروض' : 'All Offers'}</span>
                        {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </Link>
                </div>
            </div>

            {/* Horizontally scrollable row with snap */}
            <div
                ref={scrollRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-24 pb-6 snap-x snap-mandatory reveal"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {offers.map((offer, i) => (
                    <OfferCard key={offer.id} offer={offer} locale={locale} t={t} index={i} />
                ))}
            </div>
        </section>
    );
}


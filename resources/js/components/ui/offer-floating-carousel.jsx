import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { X, ChevronLeft, ChevronRight, Percent, Clock, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function OfferFloatingCarousel() {
    const { active_offers, locale } = usePage().props;
    const { t } = useTranslations();
    const isRTL = locale === 'ar';
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const timerRef = useRef(null);

    const offers = active_offers || [];
    const currentOffer = offers[currentIndex];

    useEffect(() => {
        const closed = sessionStorage.getItem('offers_carousel_closed');
        if (!closed && offers.length > 0) {
            const t = setTimeout(() => setIsVisible(true), 1800);
            return () => clearTimeout(t);
        }
    }, [offers.length]);

    // Countdown timer for valid_until
    useEffect(() => {
        if (!currentOffer?.valid_until) { setTimeLeft(null); return; }
        const calc = () => {
            const diff = new Date(currentOffer.valid_until) - new Date();
            if (diff <= 0) { setTimeLeft(null); return; }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            setTimeLeft({ d, h, m });
        };
        calc();
        timerRef.current = setInterval(calc, 60000);
        return () => clearInterval(timerRef.current);
    }, [currentOffer?.valid_until]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('offers_carousel_closed', 'true');
    };

    const nextOffer = () => setCurrentIndex(p => (p + 1) % offers.length);
    const prevOffer = () => setCurrentIndex(p => (p - 1 + offers.length) % offers.length);

    if (!isVisible || offers.length === 0 || !currentOffer) return null;

    return (
        <aside
            aria-label="Exclusive Offers Widget"
            className="fixed bottom-5 start-5 z-[100] w-[92%] sm:w-[440px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.25)] overflow-hidden border border-[#D4AF37]/40 offer-carousel-enter glass-dark bg-black/85 backdrop-blur-xl"
        >
            {/* Top Gold Shimmer Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#c9a227] via-[#f0d060] to-[#c9a227]" />

            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-3 end-3 z-30 bg-black/50 hover:bg-white/20 text-white/80 hover:text-white p-1.5 rounded-full transition-colors border border-white/10"
                aria-label="Close offers dialog"
            >
                <X size={15} />
            </button>

            <div className="flex h-[230px]">
                {/* Image Side */}
                <div className="w-[40%] relative overflow-hidden shrink-0 bg-black/50">
                    <img
                        src={currentOffer.image ? `/storage/${currentOffer.image}` : '/clinic-2.png'}
                        alt={currentOffer.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Ribbon Discount */}
                    {currentOffer.discount_percentage ? (
                        <div className="absolute top-3 start-3 z-10 bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Percent size={10} />
                            <span>{currentOffer.discount_percentage}</span>
                        </div>
                    ) : currentOffer.badge_text ? (
                        <div className="absolute top-3 start-3 z-10 bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg">
                            {currentOffer.badge_text}
                        </div>
                    ) : null}
                </div>

                {/* Content Side */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        {/* Eyebrow */}
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#D4AF37] mb-1">
                            <Sparkles size={11} />
                            <span>{locale === 'ar' ? 'عرض حصري ومحدود' : 'LIMITED TIME OFFER'}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug line-clamp-2">
                            {currentOffer.title}
                        </h3>

                        {/* Price Tag */}
                        {(currentOffer.original_price || currentOffer.discounted_price) && (
                            <div className="flex items-baseline gap-2 mt-2">
                                {currentOffer.discounted_price && (
                                    <span className="text-[#D4AF37] font-black text-base">
                                        {Number(currentOffer.discounted_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}
                                    </span>
                                )}
                                {currentOffer.original_price && (
                                    <span className="text-white/40 text-xs line-through">
                                        {Number(currentOffer.original_price).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Countdown Pill */}
                        {timeLeft && (
                            <div className="flex items-center gap-1 text-[10px] text-white/70 mb-2 font-mono">
                                <Clock size={10} className="text-[#D4AF37]" />
                                <span>{locale === 'ar' ? 'ينتهي:' : 'Ends:'}</span>
                                {timeLeft.d > 0 && (
                                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-1 py-0.2 rounded font-bold">
                                        {timeLeft.d}{locale === 'ar' ? 'ي' : 'd'}
                                    </span>
                                )}
                                <span className="bg-white/10 px-1 py-0.2 rounded font-bold">{timeLeft.h}{locale === 'ar' ? 'س' : 'h'}</span>
                                <span className="bg-white/10 px-1 py-0.2 rounded font-bold">{timeLeft.m}{locale === 'ar' ? 'د' : 'm'}</span>
                            </div>
                        )}

                        {/* Action CTA */}
                        <Link
                            href={`/contact?offer=${currentOffer.id}`}
                            className="btn-glow-gold block w-full text-center bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black px-4 py-2 rounded-xl font-extrabold text-xs shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                        >
                            {locale === 'ar' ? 'احجز هذا العرض الآن' : 'Book This Offer Now'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Carousel Navigation Bar */}
            {offers.length > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-white/5">
                    <button
                        onClick={prevOffer}
                        className="text-white/60 hover:text-[#D4AF37] p-1 transition-colors"
                        aria-label="Previous offer"
                    >
                        {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                    <div className="flex gap-1.5 items-center">
                        {offers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`transition-all duration-300 rounded-full ${
                                    i === currentIndex ? 'w-5 h-1.5 bg-[#D4AF37]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                                }`}
                                aria-label={`Go to offer ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextOffer}
                        className="text-white/60 hover:text-[#D4AF37] p-1 transition-colors"
                        aria-label="Next offer"
                    >
                        {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>
            )}
        </aside>
    );
}


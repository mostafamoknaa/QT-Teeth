import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { X, ChevronLeft, ChevronRight, Percent, Clock } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function OfferFloatingCarousel() {
    const { active_offers, locale } = usePage().props;
    const { t } = useTranslations();
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const timerRef = useRef(null);

    const offers = active_offers || [];
    const currentOffer = offers[currentIndex];

    useEffect(() => {
        const closed = sessionStorage.getItem('offers_carousel_closed');
        if (!closed && offers.length > 0) {
            const t = setTimeout(() => setIsVisible(true), 1500);
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

    if (!isVisible || offers.length === 0) return null;

    return (
        <div
            className="fixed bottom-6 right-6 z-[100] w-[92%] md:w-[460px] rounded-[2rem] shadow-2xl overflow-hidden border border-white/10"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
        >
            {/* Gold top accent line */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #D4AF37, #f0d060, #D4AF37)' }} />

            {/* Close */}
            <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-1.5 rounded-full transition-colors"
            >
                <X size={14} className="text-white" />
            </button>

            <div className="flex h-[230px]">
                {/* Image */}
                <div className="w-[38%] relative overflow-hidden shrink-0">
                    {/* Discount badge */}
                    {currentOffer.discount_percentage && (
                        <div className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-xs font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Percent size={10} />
                            {currentOffer.discount_percentage}
                        </div>
                    )}
                    {currentOffer.badge_text && !currentOffer.discount_percentage && (
                        <div className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                            {currentOffer.badge_text}
                        </div>
                    )}
                    <img
                        src={currentOffer.image ? `/storage/${currentOffer.image}` : '/doctor-placeholder.png'}
                        alt={currentOffer.title}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/60" />
                </div>

                {/* Content */}
                <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                    {/* Header pill */}
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                        {locale === 'ar' ? 'عروض مركز بدر' : 'Badr Dental Offers'}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-black text-base leading-snug mb-1 line-clamp-2">
                            {currentOffer.title}
                        </h3>
                        {currentOffer.content && (
                            <p className="text-white/60 text-xs leading-relaxed line-clamp-2 whitespace-pre-line">
                                {currentOffer.content}
                            </p>
                        )}
                    </div>

                    {/* Price row */}
                    {(currentOffer.original_price || currentOffer.discounted_price) && (
                        <div className="flex items-center gap-2 my-2">
                            {currentOffer.original_price && (
                                <span className="text-white/40 text-xs line-through">
                                    {Number(currentOffer.original_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}
                                </span>
                            )}
                            {currentOffer.discounted_price && (
                                <span className="text-[#D4AF37] font-black text-base">
                                    {Number(currentOffer.discounted_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Countdown */}
                    {timeLeft && (
                        <div className="flex items-center gap-1 text-[10px] text-white/50 mb-2">
                            <Clock size={10} />
                            <span>{locale === 'ar' ? 'ينتهي خلال:' : 'Ends in:'}</span>
                            {timeLeft.d > 0 && <span className="text-white/70 font-bold">{timeLeft.d}{locale === 'ar' ? 'ي' : 'd'}</span>}
                            <span className="text-white/70 font-bold">{timeLeft.h}{locale === 'ar' ? 'س' : 'h'}</span>
                            <span className="text-white/70 font-bold">{timeLeft.m}{locale === 'ar' ? 'د' : 'm'}</span>
                        </div>
                    )}

                    <Link
                        href={`/contact?offer=${currentOffer.id}`}
                        className="block w-full text-center bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-black text-xs hover:bg-[#f0d060] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
                    >
                        {locale === 'ar' ? '🗓 احجز العرض الآن' : '🗓 Book This Offer'}
                    </Link>
                </div>
            </div>

            {/* Navigation dots + arrows */}
            {offers.length > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-black/30">
                    <button onClick={prevOffer} className="text-white/50 hover:text-[#D4AF37] transition-colors">
                        <ChevronRight size={16} />
                    </button>
                    <div className="flex gap-1.5">
                        {offers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-4 h-1.5 bg-[#D4AF37]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                    <button onClick={nextOffer} className="text-white/50 hover:text-[#D4AF37] transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

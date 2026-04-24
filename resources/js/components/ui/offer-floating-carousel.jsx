import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function OfferFloatingCarousel() {
    const { active_offers, locale } = usePage().props;
    const { t } = useTranslations();
    const [isVisible, setIsVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter offers (just in case they aren't filtered in props)
    const offers = active_offers || [];

    useEffect(() => {
        const closed = sessionStorage.getItem('offers_carousel_closed');
        if (closed) {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('offers_carousel_closed', 'true');
    };

    const nextOffer = () => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
    };

    const prevOffer = () => {
        setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
    };

    if (!isVisible || offers.length === 0) return null;

    const currentOffer = offers[currentIndex];

    return (
        <div className="fixed bottom-6 right-6 z-[100] w-[90%] md:w-[500px] h-[280px] bg-[#E5E5E5] rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border border-white/20">
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
            >
                <X size={16} className="text-black" />
            </button>

            <div className="flex items-stretch h-full relative">
                {/* Image Section */}
                <div className="w-[40%] bg-[#D9D9D9] flex items-end overflow-hidden">
                    {currentOffer.image ? (
                        <img 
                            src={`/storage/${currentOffer.image}`} 
                            alt={currentOffer.title}
                            className="w-full h-full object-cover object-bottom"
                        />
                    ) : (
                        <img 
                            src="/doctor-placeholder.png" 
                            alt="Doctor"
                            className="w-full h-full object-cover object-bottom"
                        />
                    )}
                </div>

                {/* Content Section */}
                <div className="w-[60%] p-6 flex flex-col justify-center items-center text-center gap-2">
                    <h3 className="text-[#4A3F35] text-sm md:text-base font-bold opacity-70">
                        {currentOffer.title}
                    </h3>
                    <p className="text-[#1A1A1A] text-lg md:text-xl font-black leading-tight whitespace-pre-line mb-2">
                        {currentOffer.content}
                    </p>
                    
                    <Link
                        href={`/contact?offer=${currentOffer.id}`}
                        className="mt-2 bg-[#1A1A1A] text-white px-8 py-2.5 rounded-full font-bold text-base hover:bg-black transition-all flex items-center gap-2 group"
                    >
                        {locale === 'ar' ? 'إحجز العرض' : 'Book Offer'}
                    </Link>
                </div>

                {/* Navigation Arrows at Edges */}
                {offers.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                        <button 
                            onClick={prevOffer}
                            className="pointer-events-auto bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            <ChevronRight size={18} className="text-black" />
                        </button>
                        <button 
                            onClick={nextOffer}
                            className="pointer-events-auto bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                            <ChevronLeft size={18} className="text-black" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


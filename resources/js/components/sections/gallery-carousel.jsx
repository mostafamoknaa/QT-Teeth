import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, DoorOpen, DoorClosed, RotateCcw } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';

// Interactive Before/After Door Reveal Component
function BeforeAfterDoor({ before, after, title, isRTL }) {
    const [isOpen, setIsOpen] = useState(false);

    // Reset door to closed when case changes
    useEffect(() => {
        setIsOpen(false);
    }, [before, after]);

    return (
        <div className="w-full flex flex-col items-center select-none animate-fade-in-up">
            {/* Interactive Control Buttons Above Image */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 z-10">
                {/* Segmented Pill Indicator */}
                <div className="inline-flex items-center p-1 rounded-full glass-dark border border-white/10 shadow-lg">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                            !isOpen
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105'
                                : 'text-white/70 hover:text-white'
                        }`}
                    >
                        {isRTL ? 'قبل العلاج' : 'Before Treatment'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                            isOpen
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105'
                                : 'text-white/70 hover:text-white'
                        }`}
                    >
                        {isRTL ? 'بعد العلاج' : 'After Treatment'}
                    </button>
                </div>

                {/* Primary Door Action Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-extrabold transition-all duration-300 cursor-pointer active:scale-95 shadow-xl ${
                        isOpen
                            ? 'glass-dark text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                            : 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black border border-white/40 shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-105'
                    }`}
                >
                    {isOpen ? (
                        <>
                            <DoorClosed className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                            <span>{isRTL ? 'إغلاق الباب والرجوع لـ قبل العلاج' : 'Close Doors & Return to Before'}</span>
                            <RotateCcw className="w-4 h-4 text-[#D4AF37]/80" />
                        </>
                    ) : (
                        <>
                            <DoorOpen className="w-5 h-5 text-black group-hover:scale-110 transition-transform animate-bounce" />
                            <span>{isRTL ? 'اضغط هنا لمشاهدة النتيجة بعد العلاج (افتح الباب)' : 'Click to Reveal Result After Treatment (Open Doors)'}</span>
                            <Sparkles className="w-4 h-4 text-black animate-pulse" />
                        </>
                    )}
                </button>
            </div>

            {/* Door Container (Clickable) */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative w-full max-w-[720px] aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl bg-black/90 cursor-pointer group select-none"
                style={{ perspective: '1400px' }}
                title={isRTL ? 'اضغط لفتح أو إغلاق الباب' : 'Click to open or close doors'}
            >
                {/* 1. Underlying Result: After Treatment Image (Revealed when doors open) */}
                <img
                    src={`/storage/${after}`}
                    alt="After Treatment"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                />

                {/* Ambient glow & shimmer when revealed */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/15 to-transparent animate-shimmer" />
                </div>

                {/* After Treatment Badge */}
                <div
                    className={`absolute top-5 start-5 bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black text-xs font-black px-4 py-1.5 rounded-full z-10 shadow-lg flex items-center gap-1.5 transition-all duration-500 pointer-events-none ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>{isRTL ? 'بعد العلاج' : 'After Treatment'}</span>
                </div>

                {/* 2. Left Door (Left 50% of Before Image) */}
                <div
                    className="absolute top-0 bottom-0 left-0 w-[50.2%] overflow-hidden z-20 pointer-events-none"
                    style={{
                        transformOrigin: 'left center',
                        transform: isOpen
                            ? 'perspective(1400px) rotateY(-105deg) translateX(-8%)'
                            : 'perspective(1400px) rotateY(0deg) translateX(0)',
                        opacity: isOpen ? 0 : 1,
                        transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isOpen ? 'none' : 'inset -4px 0 16px rgba(0,0,0,0.5)',
                    }}
                >
                    <img
                        src={`/storage/${before}`}
                        alt="Before Treatment - Left Panel"
                        className="absolute top-0 left-0 w-[200%] h-full object-cover max-w-none select-none"
                    />
                    {/* Door Edge Gold Seam Bevel */}
                    <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_#D4AF37]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* 3. Right Door (Right 50% of Before Image) */}
                <div
                    className="absolute top-0 bottom-0 right-0 w-[50.2%] overflow-hidden z-20 pointer-events-none"
                    style={{
                        transformOrigin: 'right center',
                        transform: isOpen
                            ? 'perspective(1400px) rotateY(105deg) translateX(8%)'
                            : 'perspective(1400px) rotateY(0deg) translateX(0)',
                        opacity: isOpen ? 0 : 1,
                        transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isOpen ? 'none' : 'inset 4px 0 16px rgba(0,0,0,0.5)',
                    }}
                >
                    <img
                        src={`/storage/${before}`}
                        alt="Before Treatment - Right Panel"
                        className="absolute top-0 right-0 w-[200%] h-full object-cover max-w-none select-none"
                    />
                    {/* Door Edge Gold Seam Bevel */}
                    <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_#D4AF37]" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Before Badge (Visible on the doors when closed) */}
                <div
                    className={`absolute top-5 end-5 glass-dark text-white text-xs font-bold px-3.5 py-1.5 rounded-full z-25 pointer-events-none border border-white/10 shadow-lg transition-all duration-300 ${
                        isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                    }`}
                >
                    {isRTL ? 'قبل العلاج' : 'Before Treatment'}
                </div>

                {/* Center Door Handle / Emblem (Inviting user to click) */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ${
                        isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                    }`}
                >
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black font-extrabold text-xs shadow-[0_0_30px_rgba(212,175,55,0.85)] border-2 border-white/70 group-hover:scale-110 transition-transform">
                        <DoorOpen className="w-4 h-4 text-black animate-pulse" />
                        <span>{isRTL ? 'اضغط لفتح الباب' : 'Click to Open'}</span>
                    </div>
                </div>
            </div>

            {title && (
                <div className="mt-6 inline-flex items-center gap-2 glass-dark px-6 py-2 rounded-full border border-white/10 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <h4 className="text-sm md:text-base font-bold text-white tracking-tight">
                        {title}
                    </h4>
                </div>
            )}
        </div>
    );
}


export default function GalleryCarousel({ photos = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';
    const [activeIndex, setActiveIndex] = useState(0);

    if (photos.length === 0) return null;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <section id="gallery-carousel" className="py-20 md:py-28 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4 reveal">
                <div className="eyebrow mx-auto justify-center">
                    {locale === 'ar' ? 'معرض الابتسامات الحقيقية' : 'SMILE MAKEOVER GALLERY'}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {locale === 'ar' ? 'نتائج العلاجات المتميزة (قبل / بعد)' : 'Clinical Results (Before & After)'}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    {locale === 'ar'
                        ? 'شاهد التحول الحقيقي لابتسامات مرضانا بأيدي نخبة استشاريي مركز بدر باستخدام أحدث تقنيات تجميل وزراعة الأسنان.'
                        : 'Explore real smile transformations performed by our team of consultants using state-of-the-art restorative and aesthetic dental techniques.'}
                </p>
            </div>

            {/* Main Interactive Slider */}
            <div className="max-w-4xl mx-auto relative px-2 sm:px-14 reveal">
                {/* Navigation Arrows */}
                {photos.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute start-0 sm:start-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark border border-white/15 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center z-20 shadow-xl active:scale-95"
                            aria-label="Previous Case"
                        >
                            {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute end-0 sm:end-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark border border-white/15 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center z-20 shadow-xl active:scale-95"
                            aria-label="Next Case"
                        >
                            {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                        </button>
                    </>
                )}

                {/* Active Slide */}
                <div className="w-full">
                    <BeforeAfterDoor
                        key={photos[activeIndex].id || activeIndex}
                        before={photos[activeIndex].before_image}
                        after={photos[activeIndex].after_image}
                        title={photos[activeIndex].title}
                        isRTL={isRTL}
                    />
                </div>

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                    <div className="mt-10 pt-6 border-t border-white/10">
                        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {photos.map((item, idx) => (
                                <button
                                    key={item.id || idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                                        activeIndex === idx
                                            ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-105 shadow-lg'
                                            : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                                    }`}
                                    aria-label={`View case ${idx + 1}`}
                                >
                                    <img
                                        src={`/storage/${item.after_image || item.before_image}`}
                                        alt={item.title || `Case ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    {activeIndex === idx && (
                                        <div className="absolute bottom-1 end-1 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}


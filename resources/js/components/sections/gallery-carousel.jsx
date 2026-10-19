import React, { useState, useEffect, useRef } from 'react';
import { 
    ChevronRight, 
    ChevronLeft, 
    Sparkles, 
    DoorOpen, 
    DoorClosed, 
    RotateCcw, 
    Eye, 
    Layers
} from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';

// The 10 Master Clinical Cases from public folder (Optimized WebP format)
const CLINICAL_CASES = [
    {
        id: 1,
        number: 1,
        tag_ar: 'فينيرز • حالة 1',
        tag_en: 'Veneers • Case 1',
        title_ar: 'تصميم ابتسامة هوليوود وتبييض متطور',
        title_en: 'Hollywood Smile & Advanced Whitening',
        poster: '/10.webp',
        before: '/clinical_cases/10_before.webp',
        after: '/clinical_cases/10_after.webp',
    },
    {
        id: 2,
        number: 2,
        tag_ar: 'فينيرز • حالة 2',
        tag_en: 'Veneers • Case 2',
        title_ar: 'إغلاق الفراغات وتعديل الإطباق بالفينير',
        title_en: 'Gap Closure & Occlusion Correction',
        poster: '/11.webp',
        before: '/clinical_cases/11_before.webp',
        after: '/clinical_cases/11_after.webp',
    },
    {
        id: 3,
        number: 3,
        tag_ar: 'تجميل • حالة 3',
        tag_en: 'Cosmetic • Case 3',
        title_ar: 'تجميل الابتسامة وتبييض الأسنان الفوري',
        title_en: 'Smile Rejuvenation & Whitening',
        poster: '/12.webp',
        before: '/clinical_cases/12_before.webp',
        after: '/clinical_cases/12_after.webp',
    },
    {
        id: 4,
        number: 4,
        tag_ar: 'تقويم وتجميل • حالة 4',
        tag_en: 'Alignment • Case 4',
        title_ar: 'علاج وتجميل الأسنان المزدحمة وتناسق اللثة',
        title_en: 'Crowded Teeth Alignment & Gum Harmony',
        poster: '/13.webp',
        before: '/clinical_cases/13_before.webp',
        after: '/clinical_cases/13_after.webp',
    },
    {
        id: 5,
        number: 5,
        tag_ar: 'فينيرز 3D • حالة 5',
        tag_en: '3D Veneers • Case 5',
        title_ar: 'فينير تجميلي متطور عالي الشفافية',
        title_en: 'Ultra-Translucent Aesthetic Veneers',
        poster: '/14.webp',
        before: '/clinical_cases/14_before.webp',
        after: '/clinical_cases/14_after.webp',
    },
    {
        id: 6,
        number: 6,
        tag_ar: 'ترميم • حالة 6',
        tag_en: 'Restoration • Case 6',
        title_ar: 'ترميم وتجميل الأسنان وتصحيح التآكل',
        title_en: 'Anterior Tooth Reconstruction',
        poster: '/15.webp',
        before: '/clinical_cases/15_before.webp',
        after: '/clinical_cases/15_after.webp',
    },
    {
        id: 7,
        number: 7,
        tag_ar: 'زيركون • حالة 7',
        tag_en: 'Zirconia • Case 7',
        title_ar: 'ابتسامة هوليوود زيركون فائقة البياض والجمال',
        title_en: 'Zirconia Hollywood Smile',
        poster: '/16.webp',
        before: '/clinical_cases/16_before.webp',
        after: '/clinical_cases/16_after.webp',
    },
    {
        id: 8,
        number: 8,
        tag_ar: 'تبييض وتجميل • حالة 8',
        tag_en: 'Whitening • Case 8',
        title_ar: 'علاج التصبغات الشديدة وتوحيد لون الابتسامة',
        title_en: 'Deep Stain Removal & Color Correction',
        poster: '/17.webp',
        before: '/clinical_cases/17_before.webp',
        after: '/clinical_cases/17_after.webp',
    },
    {
        id: 9,
        number: 9,
        tag_ar: 'ترميم وتجميل • حالة 9',
        tag_en: 'Restoration • Case 9',
        title_ar: 'علاج الأسنان المتكسرة وتنسيق خط الابتسامة',
        title_en: 'Chipped Teeth Restoration & Smile Contouring',
        poster: '/18.webp',
        before: '/clinical_cases/18_before.webp',
        after: '/clinical_cases/18_after.webp',
    },
    {
        id: 10,
        number: 10,
        tag_ar: 'تأهيل كامل • حالة 10',
        tag_en: 'Full Rehab • Case 10',
        title_ar: 'إعادة تأهيل شامل للابتسامة والأسنان العلوية',
        title_en: 'Comprehensive Upper Smile Rehabilitation',
        poster: '/20.webp',
        before: '/clinical_cases/20_before.webp',
        after: '/clinical_cases/20_after.webp',
    },
];

export default function GalleryCarousel({ photos = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    const [activeIndex, setActiveIndex] = useState(0);
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const totalCases = CLINICAL_CASES.length;

    // Reset door state on case change
    useEffect(() => {
        setIsDoorOpen(false);
    }, [activeIndex]);

    const handleNext = () => {
        // Move left: next card enters from right to center, active moves to left
        setActiveIndex((prev) => (prev + 1) % totalCases);
    };

    const handlePrev = () => {
        // Move right: previous card enters from left to center
        setActiveIndex((prev) => (prev - 1 + totalCases) % totalCases);
    };

    // Auto move left effect: continuously advances cards to the left, pauses on hover or door open
    useEffect(() => {
        if (isHovered || isDoorOpen) return;

        let intervalId = null;

        const startTimer = () => {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    setActiveIndex((prev) => (prev + 1) % totalCases);
                }, 3000);
            }
        };

        const stopTimer = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopTimer();
            } else if (!isHovered && !isDoorOpen) {
                startTimer();
            }
        };

        startTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isHovered, isDoorOpen, totalCases]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        setIsHovered(true);
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return;
        const diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) {
                // Swiped left -> move cards left
                handleNext();
            } else {
                // Swiped right -> move cards right
                handlePrev();
            }
        }
        setTouchStartX(null);
        // Resume auto move after 3.5s of no touch interaction
        setTimeout(() => {
            setIsHovered(false);
        }, 3500);
    };

    const activeItem = CLINICAL_CASES[activeIndex];

    return (
        <section id="gallery-carousel" className="py-16 md:py-24 px-3 sm:px-6 lg:px-12 relative overflow-hidden bg-[#09090b]">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/8 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 reveal">
                <div className="eyebrow mx-auto justify-center">
                    {locale === 'ar' ? 'قبل و بعد' : 'BEFORE & AFTER'}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {locale === 'ar' ? 'نتائج العلاجات المتميزة (قبل / بعد)' : 'Clinical Results (Before & After)'}
                </h2>
                <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto">
                    {locale === 'ar'
                        ? 'تصفح أحدث نتائج ابتسامات مرضانا عبر العرض ثلاثي الأبعاد مع إمكانية فتح الباب لمشاهدة التحول الحقيقي.'
                        : 'Explore real patient smile transformations with 3D coverflow and interactive door reveal.'}
                </p>

                {/* Prominent Door Open / Close Interactive Button */}
                <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsDoorOpen((prev) => !prev)}
                        className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer shadow-2xl active:scale-95 ${
                            isDoorOpen
                                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black shadow-[0_0_25px_rgba(212,175,55,0.7)]'
                                : 'bg-black/80 hover:bg-black text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        }`}
                    >
                        {isDoorOpen ? (
                            <>
                                <DoorClosed className="w-5 h-5 text-black" />
                                <span>{isRTL ? '🚪 إغلاق الباب (العودة لـ قبل العلاج)' : '🚪 Close Doors (View Before)'}</span>
                                <RotateCcw className="w-4 h-4 text-black/70" />
                            </>
                        ) : (
                            <>
                                <DoorOpen className="w-5 h-5 text-[#D4AF37] animate-bounce" />
                                <span>{isRTL ? '🚪 فتح الباب ومشاهدة النتيجة (بعد العلاج)' : '🚪 Open Doors & Reveal Result (After)'}</span>
                                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* 3D COVERFLOW SHOWCASE CONTAINER */}
            <div 
                className="relative max-w-6xl mx-auto h-[460px] sm:h-[530px] md:h-[600px] flex items-center justify-center select-none"
                style={{ perspective: '1300px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Left Navigation Button (physically on left side, moves cards right) */}
                <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-40 shadow-2xl active:scale-95 cursor-pointer"
                    aria-label="Previous Case"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Button (physically on right side, moves cards left) */}
                <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-40 shadow-2xl active:scale-95 cursor-pointer"
                    aria-label="Next Case"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* THE 3D CARDS FAN */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {CLINICAL_CASES.map((item, idx) => {
                        // Calculate wrapped offset from active index
                        let offset = (idx - activeIndex) % totalCases;
                        if (offset > totalCases / 2) offset -= totalCases;
                        if (offset < -totalCases / 2) offset += totalCases;

                        const isCenter = offset === 0;
                        const absOffset = Math.abs(offset);

                        // Only render cards within viewable depth
                        if (absOffset > 2) return null;

                        // 3D positioning metrics: cards slide smoothly to the left
                        let translateX = offset * 68; // in percentage
                        let scale = 1 - absOffset * 0.18;
                        let rotateY = -offset * 20;
                        let zIndex = 30 - absOffset * 10;
                        let opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.45 : 0.2;

                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (!isCenter) {
                                        setActiveIndex(idx);
                                    } else {
                                        setIsDoorOpen((prev) => !prev);
                                    }
                                }}
                                style={{
                                    transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                    zIndex: zIndex,
                                    opacity: opacity,
                                    transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease',
                                }}
                                className={`absolute top-1/2 -translate-y-1/2 w-[270px] sm:w-[320px] md:w-[370px] aspect-[1068/1472] rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden transition-shadow duration-500 cursor-pointer ${
                                    isCenter
                                        ? 'border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)]'
                                        : 'border border-white/10 shadow-2xl hover:opacity-75'
                                }`}
                            >
                                {/* Card Body */}
                                <div className="relative w-full h-full bg-black overflow-hidden group">
                                    {/* 1. Center Card: Always Interactive 3D Door (Before/After) */}
                                    {isCenter ? (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDoorOpen((prev) => !prev);
                                            }}
                                            className="relative w-full h-full cursor-pointer"
                                            style={{ perspective: '1400px' }}
                                        >
                                            {/* After image underneath */}
                                            <img
                                                src={item.after}
                                                alt={isRTL ? item.title_ar : item.title_en}
                                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                            />
                                            {/* Shimmer on door open */}
                                            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/25 to-transparent transition-opacity duration-700 pointer-events-none ${isDoorOpen ? 'opacity-100' : 'opacity-0'}`} />

                                            {/* Status Badge */}
                                            <div className="absolute top-4 start-4 z-30 pointer-events-none transition-all duration-300">
                                                {isDoorOpen ? (
                                                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] flex items-center gap-1.5 animate-pulse">
                                                        <Sparkles className="w-3.5 h-3.5 text-black" />
                                                        <span>{isRTL ? 'بعد العلاج ✨ ابتسامة هوليوود' : 'After Treatment ✨'}</span>
                                                    </div>
                                                ) : (
                                                    <div className="bg-black/85 backdrop-blur-md border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] sm:text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                                        <span>{isRTL ? 'قبل العلاج • حالة حقيقية' : 'Before Treatment'}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Left Door Panel */}
                                            <div
                                                className="absolute top-0 bottom-0 left-0 w-[50.2%] overflow-hidden z-20 pointer-events-none"
                                                style={{
                                                    transformOrigin: 'left center',
                                                    transform: isDoorOpen
                                                        ? 'perspective(1400px) rotateY(-110deg)'
                                                        : 'perspective(1400px) rotateY(0deg)',
                                                    opacity: isDoorOpen ? 0.05 : 1,
                                                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                                                }}
                                            >
                                                <img
                                                    src={item.before}
                                                    alt="Before"
                                                    className="absolute top-0 left-0 w-[200%] h-full object-cover max-w-none"
                                                />
                                                <div className="absolute top-0 bottom-0 right-0 w-[2.5px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                                            </div>

                                            {/* Right Door Panel */}
                                            <div
                                                className="absolute top-0 bottom-0 right-0 w-[50.2%] overflow-hidden z-20 pointer-events-none"
                                                style={{
                                                    transformOrigin: 'right center',
                                                    transform: isDoorOpen
                                                        ? 'perspective(1400px) rotateY(110deg)'
                                                        : 'perspective(1400px) rotateY(0deg)',
                                                    opacity: isDoorOpen ? 0.05 : 1,
                                                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                                                }}
                                            >
                                                <img
                                                    src={item.before}
                                                    alt="Before"
                                                    className="absolute top-0 right-0 w-[200%] h-full object-cover max-w-none"
                                                />
                                                <div className="absolute top-0 bottom-0 left-0 w-[2.5px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                                            </div>

                                            {/* Center Door Handle Action Badges */}
                                            {!isDoorOpen ? (
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                                                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/90 backdrop-blur-md border-2 border-[#D4AF37] text-[#D4AF37] font-black text-xs shadow-[0_0_30px_rgba(212,175,55,0.9)] animate-pulse">
                                                        <DoorOpen className="w-4 h-4 text-[#D4AF37]" />
                                                        <span>{isRTL ? 'اضغط لفتح الباب (بعد العلاج)' : 'Click to Open Door (After)'}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                                                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-[#D4AF37] text-white font-bold text-[11px] shadow-lg">
                                                        <DoorClosed className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                        <span>{isRTL ? 'اضغط لإغلاق الباب (قبل العلاج)' : 'Click to Close Door (Before)'}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        /* 2. Side Cards View */
                                        <div className="relative w-full h-full">
                                            <img
                                                src={item.poster}
                                                alt={isRTL ? item.title_ar : item.title_en}
                                                className="w-full h-full object-cover select-none pointer-events-none"
                                                loading={absOffset <= 1 ? 'eager' : 'lazy'}
                                            />
                                            {/* Subtle vignette border gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                                        </div>
                                    )}

                                    {/* Bottom Case Tag Pill Badge (Like 'فينيرز • حالة 1' in the reference screenshot) */}
                                    <div className="absolute bottom-4 end-4 z-25 pointer-events-none">
                                        <div className="px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 text-[#F3E5AB] font-extrabold text-xs shadow-lg flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                            <span>{isRTL ? item.tag_ar : item.tag_en}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM PAGINATION INDICATOR */}
            <div className="mt-6 text-center reveal">
                {/* Numeric Counter: e.g. '1 / 10' + optional Pause state */}
                <div className="text-white/80 font-bold text-sm tracking-widest mb-2 font-mono flex items-center justify-center gap-2.5">
                    <span>{activeIndex + 1} / {totalCases}</span>
                    {isHovered && !isDoorOpen && (
                        <span className="text-[10px] text-[#D4AF37] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 transition-all">
                            {isRTL ? 'متوقف مؤقتاً' : 'Paused'}
                        </span>
                    )}
                </div>

                {/* Slim Gold Progress Bar */}
                <div className="w-28 sm:w-36 h-[2.5px] bg-white/15 rounded-full mx-auto relative overflow-hidden" dir="ltr">
                    <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] rounded-full transition-all duration-400 ease-out shadow-[0_0_8px_#D4AF37]"
                        style={{
                            width: `${100 / totalCases}%`,
                            transform: `translateX(${activeIndex * 100}%)`,
                        }}
                    />
                </div>

                {/* Case Title Caption */}
                <div className="mt-4">
                    <p className="text-xs sm:text-sm text-white/70 font-semibold">
                        {isRTL ? activeItem.title_ar : activeItem.title_en}
                    </p>
                </div>
            </div>
        </section>
    );
}

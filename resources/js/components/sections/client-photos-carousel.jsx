import React, { useState, useEffect } from 'react';
import { 
    ChevronRight, 
    ChevronLeft, 
    Sparkles, 
    Heart, 
    Camera 
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

// The 10 Client Photos from public folder
const CLIENT_PHOTOS = [
    {
        id: 1,
        image: '/client1.jpeg',
        tag_ar: 'لحظات مع عملائنا • 1',
        tag_en: 'Client Moments • 1',
        caption_ar: 'ابتسامة مشرقة وثقة جديدة مع د. أحمد بدر',
        caption_en: 'A bright smile and renewed confidence with Dr. Ahmed Badr',
    },
    {
        id: 2,
        image: '/client2.jpeg',
        tag_ar: 'لحظات مع عملائنا • 2',
        tag_en: 'Client Moments • 2',
        caption_ar: 'سعادة حقيقية بعد اكتمال تصميم الابتسامة',
        caption_en: 'True happiness after completing the smile design',
    },
    {
        id: 3,
        image: '/client3.jpeg',
        tag_ar: 'لحظات مع عملائنا • 3',
        tag_en: 'Client Moments • 3',
        caption_ar: 'زيارة ممتعة وابتسامة هوليوود المتألقة',
        caption_en: 'A delightful visit and a shining Hollywood smile',
    },
    {
        id: 4,
        image: '/client4.jpeg',
        tag_ar: 'لحظات مع عملائنا • 4',
        tag_en: 'Client Moments • 4',
        caption_ar: 'نتائج استثنائية ورضا تام من عملائنا الأعزاء',
        caption_en: 'Exceptional results and complete satisfaction from our clients',
    },
    {
        id: 5,
        image: '/client5.jpeg',
        tag_ar: 'لحظات مع عملائنا • 5',
        tag_en: 'Client Moments • 5',
        caption_ar: 'أجواء عائلية ورعاية طبية على أعلى مستوى',
        caption_en: 'Family atmosphere and medical care of the highest standard',
    },
    {
        id: 6,
        image: '/client6.jpeg',
        tag_ar: 'لحظات مع عملائنا • 6',
        tag_en: 'Client Moments • 6',
        caption_ar: 'فرحة ابتسامة جديدة وجمال طبيعي متناسق',
        caption_en: 'The joy of a new smile and harmonious natural aesthetics',
    },
    {
        id: 7,
        image: '/client7.jpeg',
        tag_ar: 'لحظات مع عملائنا • 7',
        tag_en: 'Client Moments • 7',
        caption_ar: 'ثقة متبادلة وتجربة علاجية مريحة وبدون ألم',
        caption_en: 'Mutual trust and a comfortable, pain-free dental journey',
    },
    {
        id: 8,
        image: '/client8.jpeg',
        tag_ar: 'لحظات مع عملائنا • 8',
        tag_en: 'Client Moments • 8',
        caption_ar: 'ذكريات مميزة مع نخبة من رواد مركز بدر للأسنان',
        caption_en: 'Memorable moments with valued visitors at Badr Dental Center',
    },
    {
        id: 9,
        image: '/client9.jpeg',
        tag_ar: 'لحظات مع عملائنا • 9',
        tag_en: 'Client Moments • 9',
        caption_ar: 'ابتسامة ساحرة تعكس دقة واحترافية الفريق الطبي',
        caption_en: 'A charming smile reflecting our medical precision and artistry',
    },
    {
        id: 10,
        image: '/client10.jpeg',
        tag_ar: 'لحظات مع عملائنا • 10',
        tag_en: 'Client Moments • 10',
        caption_ar: 'فخورون بكوننا جزءاً من قصة نجاح كل ابتسامة',
        caption_en: 'Proud to be part of every smile transformation story',
    },
];

export default function ClientPhotosCarousel() {
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const totalPhotos = CLIENT_PHOTOS.length;

    const handleNext = () => {
        // Move left: next card enters from right to center
        setActiveIndex((prev) => (prev + 1) % totalPhotos);
    };

    const handlePrev = () => {
        // Move right: previous card enters from left to center
        setActiveIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
    };

    // Auto move left effect: advances cards to left every 3s, pauses on hover
    useEffect(() => {
        if (isHovered) return;

        let intervalId = null;

        const startTimer = () => {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    setActiveIndex((prev) => (prev + 1) % totalPhotos);
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
            } else if (!isHovered) {
                startTimer();
            }
        };

        startTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isHovered, totalPhotos]);

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
                // Swiped finger left -> move left
                handleNext();
            } else {
                // Swiped finger right -> move right
                handlePrev();
            }
        }
        setTouchStartX(null);
        setTimeout(() => {
            setIsHovered(false);
        }, 3500);
    };

    const activeItem = CLIENT_PHOTOS[activeIndex];

    return (
        <section id="photos-with-clients" className="py-16 md:py-24 px-3 sm:px-6 lg:px-12 relative overflow-hidden bg-[#09090b]">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/8 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 reveal">
                <div className="eyebrow mx-auto justify-center flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isRTL ? 'ذكريات وابتسامات عملائنا' : 'PHOTOS WITH CLIENTS'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {isRTL ? 'صورنا مع عملائنا (Photos with Clients)' : 'Photos with Clients'}
                </h2>
                <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto">
                    {isRTL
                        ? 'لحظات اعتزاز وذكريات دافئة تجمع د. أحمد بدر مع رواد وعملاء المركز من مختلف الدول.'
                        : 'Cherished memories and memorable moments of Dr. Ahmed Badr with our valued clients.'}
                </p>
            </div>

            {/* 3D COVERFLOW SHOWCASE CONTAINER */}
            <div 
                className="relative max-w-6xl mx-auto h-[440px] sm:h-[500px] md:h-[560px] flex items-center justify-center select-none"
                style={{ perspective: '1300px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Left Navigation Button */}
                <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-40 shadow-2xl active:scale-95 cursor-pointer"
                    aria-label="Previous Photo"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Button */}
                <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition-all duration-300 flex items-center justify-center z-40 shadow-2xl active:scale-95 cursor-pointer"
                    aria-label="Next Photo"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* THE 3D CARDS FAN */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {CLIENT_PHOTOS.map((item, idx) => {
                        let offset = (idx - activeIndex) % totalPhotos;
                        if (offset > totalPhotos / 2) offset -= totalPhotos;
                        if (offset < -totalPhotos / 2) offset += totalPhotos;

                        const isCenter = offset === 0;
                        const absOffset = Math.abs(offset);

                        if (absOffset > 2) return null;

                        // 3D positioning metrics matching clinical results carousel
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
                                    }
                                }}
                                style={{
                                    transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                                    zIndex: zIndex,
                                    opacity: opacity,
                                    transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease',
                                }}
                                className={`absolute top-1/2 -translate-y-1/2 w-[270px] sm:w-[320px] md:w-[370px] aspect-[4/5] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden transition-shadow duration-500 cursor-pointer ${
                                    isCenter
                                        ? 'border-2 border-[#D4AF37]/70 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.3)]'
                                        : 'border border-white/10 shadow-2xl hover:opacity-75'
                                }`}
                            >
                                {/* Card Body */}
                                <div className="relative w-full h-full bg-black overflow-hidden group">
                                    <img
                                        src={item.image}
                                        alt={isRTL ? item.caption_ar : item.caption_en}
                                        className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-108"
                                        loading={absOffset <= 1 ? 'eager' : 'lazy'}
                                    />

                                    {/* Subtle luxury vignette & bottom gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none" />

                                    {/* Top Sparkle Pill on Center Card */}
                                    {isCenter && (
                                        <div className="absolute top-4 start-4 z-20 pointer-events-none">
                                            <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] sm:text-xs font-black shadow-lg flex items-center gap-1.5 animate-pulse">
                                                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                <span>{isRTL ? 'ابتسامات مميزة' : 'Featured Smile'}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom Info Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <div className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/60 text-[#F3E5AB] font-extrabold text-xs shadow-lg flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                                <span>{isRTL ? item.tag_ar : item.tag_en}</span>
                                            </div>

                                            {isCenter && (
                                                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                                                    <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                                                </div>
                                            )}
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
                    <span>{activeIndex + 1} / {totalPhotos}</span>
                    {isHovered && (
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
                            width: `${100 / totalPhotos}%`,
                            transform: `translateX(${activeIndex * 100}%)`,
                        }}
                    />
                </div>

                {/* Caption Title */}
                <div className="mt-4">
                    <p className="text-xs sm:text-sm text-white/70 font-semibold max-w-lg mx-auto">
                        {isRTL ? activeItem.caption_ar : activeItem.caption_en}
                    </p>
                </div>
            </div>
        </section>
    );
}

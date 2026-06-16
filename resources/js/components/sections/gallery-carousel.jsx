import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

// Interactive Before/After Split Image Component
function BeforeAfterImage({ before, after, title }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let position = (x / rect.width) * 100;
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        setSliderPosition(position);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="w-full flex flex-col items-center select-none">
            <div 
                ref={containerRef}
                className="relative w-full max-w-[650px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-border/40 shadow-2xl cursor-ew-resize bg-secondary/10"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
            >
                {/* Before Image (Background) */}
                <img 
                    src={`/storage/${before}`} 
                    alt="Before" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full z-10 pointer-events-none">
                    قبل العلاج
                </div>

                {/* After Image (Foreground/Overlay) */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img 
                        src={`/storage/${after}`} 
                        alt="After" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%', maxWidth: 'none' }}
                    />
                </div>
                <div className="absolute top-4 left-4 bg-primary backdrop-blur-sm text-foreground text-xs font-black px-3 py-1.5 rounded-full z-10 pointer-events-none">
                    بعد العلاج
                </div>

                {/* Slider Control Line & Drag Handle */}
                <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-foreground rounded-full shadow-lg flex items-center justify-center border-2 border-primary z-30 pointer-events-none">
                        <ArrowRightLeft className="w-5 h-5 text-primary" />
                    </div>
                </div>
            </div>
            
            {title && (
                <h4 className="mt-6 text-sm md:text-base font-bold text-background tracking-tight bg-secondary/20 backdrop-blur-sm px-5 py-1.5 rounded-full border border-border/30">
                    {title}
                </h4>
            )}
        </div>
    );
}

// Icon helper since lucide-react imports might not include ArrowRightLeft
function ArrowRightLeft(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 3 4 4-4 4" />
            <path d="M20 7H4" />
            <path d="m8 21-4-4 4-4" />
            <path d="M4 17h16" />
        </svg>
    );
}

export default function GalleryCarousel({ photos = [] }) {
    const { t } = useTranslations();
    const [activeIndex, setActiveIndex] = useState(0);

    if (photos.length === 0) return null;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <section id="gallery-carousel" className="py-24 px-6 lg:px-24 bg-gradient-to-b from-secondary/5 via-secondary/10 to-transparent relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full border border-border/50 text-primary font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    معرض الحالات الحقيقية
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-background">
                    نتائج العلاجات (قبل / بعد)
                </h2>
                <p className="text-background/70 font-medium text-xs md:text-sm max-w-2xl mx-auto">
                    شاهد نتائج حقيقية لحالات تم علاجها وتجميلها داخل مركز بدر بأيدي نخبة من استشاريي طب الأسنان
                </p>
            </div>

            {/* Slider Container */}
            <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
                {/* Navigation Arrows */}
                {photos.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrev}
                            className="absolute right-0 sm:right-2 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/40 backdrop-blur-sm border border-border/50 text-background hover:bg-primary hover:text-foreground hover:border-transparent transition-all duration-300 flex items-center justify-center z-10 active:scale-90 shadow-md"
                            aria-label="Previous Case"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute left-0 sm:left-2 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/40 backdrop-blur-sm border border-border/50 text-background hover:bg-primary hover:text-foreground hover:border-transparent transition-all duration-300 flex items-center justify-center z-10 active:scale-90 shadow-md"
                            aria-label="Next Case"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Slides content */}
                <div className="w-full transition-all duration-500 ease-in-out">
                    <BeforeAfterImage 
                        key={photos[activeIndex].id}
                        before={photos[activeIndex].before_image}
                        after={photos[activeIndex].after_image}
                        title={photos[activeIndex].title}
                    />
                </div>

                {/* Dots Indicator */}
                {photos.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {photos.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-primary w-8' : 'bg-background/30 hover:bg-background/50'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

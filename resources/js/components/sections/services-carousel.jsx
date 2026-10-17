import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Sparkles, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { Link, usePage } from '@inertiajs/react';

const SLIDE_SPACING = '1.5rem';

export default function ServicesCarouselSection({ services = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    const [isHovered, setIsHovered] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        direction: isRTL ? 'rtl' : 'ltr',
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on('init', onSelect);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('init', onSelect);
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Continuous auto-sliding that pauses only on hover
    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const timer = setInterval(() => {
            if (isRTL) {
                emblaApi.scrollPrev();
            } else {
                emblaApi.scrollNext();
            }
        }, 3200);

        return () => clearInterval(timer);
    }, [emblaApi, isHovered, isRTL]);

    if (!services || services.length === 0) return null;

    const scrollLeft = () => {
        if (!emblaApi) return;
        if (isRTL) {
            emblaApi.scrollNext();
        } else {
            emblaApi.scrollPrev();
        }
    };

    const scrollRight = () => {
        if (!emblaApi) return;
        if (isRTL) {
            emblaApi.scrollPrev();
        } else {
            emblaApi.scrollNext();
        }
    };

    return (
        <section
            id="services-carousel"
            className="relative overflow-hidden py-16 md:py-24"
        >
            {/* Ambient Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="px-6 lg:px-24 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
                <div>
                    <div className="eyebrow mb-3">
                        {locale === 'ar' ? 'خدماتنا الطبية المتكاملة' : 'SPECIALIZED DENTAL CARE'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        {locale === 'ar' ? 'تخصصات مركز بدر للأسنان' : 'Our Dental Specialties'}
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/services"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark text-white/90 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 text-xs font-bold transition-all"
                    >
                        <span>{locale === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
                        {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </Link>

                    {/* Header Prev/Next Arrow Buttons */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            type="button"
                            onClick={scrollRight}
                            className="rounded-full border border-white/15 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all w-11 h-11 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
                            aria-label="Previous service"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={scrollLeft}
                            className="rounded-full border border-white/15 text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all w-11 h-11 flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
                            aria-label="Next service"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel Container with Floating Side Arrows */}
            <div className="relative px-4 sm:px-6 lg:px-16 reveal">
                {/* Floating Left Side Navigation Arrow */}
                <button
                    type="button"
                    onClick={scrollLeft}
                    className="hidden lg:flex absolute left-2 xl:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark border border-white/20 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/25 hover:text-[#D4AF37] shadow-2xl items-center justify-center z-20 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-lg"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Floating Right Side Navigation Arrow */}
                <button
                    type="button"
                    onClick={scrollRight}
                    className="hidden lg:flex absolute right-2 xl:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark border border-white/20 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/25 hover:text-[#D4AF37] shadow-2xl items-center justify-center z-20 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-lg"
                    aria-label="Scroll Right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Carousel Track */}
                <div
                    className="overflow-hidden"
                    ref={emblaRef}
                    style={{ marginLeft: `calc(${SLIDE_SPACING} * -1)` }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                >
                    <div className="flex" style={{ backfaceVisibility: 'hidden', touchAction: 'pan-y pinch-zoom' }}>
                        {services.map((service, index) => {
                            const floatClass = index % 2 === 0 ? 'card-float-up-down' : 'card-float-down-up';
                            return (
                                <div
                                    key={service.id}
                                    className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_24%]"
                                    style={{ paddingLeft: SLIDE_SPACING }}
                                >
                                    <div
                                        style={{ animationDelay: `${(index % 4) * 0.4}s` }}
                                        className={floatClass}
                                    >
                                        <Link
                                            href={`/services/${service.url_key || service.id}`}
                                            className="group relative rounded-[2.2rem] overflow-hidden bg-black/50 border border-white/10 hover:border-[#D4AF37]/70 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 block hover:-translate-y-2 aspect-[3/4.2]"
                                        >
                                    {/* Full-Bleed Image or Luxury Dental Fallback */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        {service.image ? (
                                            <img
                                                src={`/storage/${service.image}`}
                                                alt={service.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-[#1a1917] via-[#262115] to-[#11100e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                                                {/* Ambient gold glow */}
                                                <div className="absolute w-36 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                                <div className="w-20 h-20 rounded-3xl glass-gold border border-[#D4AF37]/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(212,175,55,0.25)] group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-500 z-10">
                                                    <Stethoscope className="w-10 h-10 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                                                </div>
                                                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase z-10">
                                                    {locale === 'ar' ? 'تخصص متميز' : 'Specialized Care'}
                                                </span>
                                            </div>
                                        )}
                                        {/* Multi-layer gradient overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-60" />
                                    </div>

                                    {/* Top Floating Number Badge */}
                                    <div className="absolute top-5 start-5 z-10">
                                        <div className="w-10 h-10 rounded-2xl glass-dark border border-[#D4AF37]/40 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all">
                                            <span className="text-[#D4AF37] text-xs font-black tracking-wider">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating Tag */}
                                    <div className="absolute top-5 end-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#D4AF37] text-black shadow-md">
                                            {locale === 'ar' ? 'عرض التفاصيل' : 'Details'}
                                        </span>
                                    </div>

                                    {/* Bottom Glass Content Card */}
                                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                                        <div className="glass-dark rounded-2xl p-4 border border-white/10 group-hover:border-[#D4AF37]/40 transition-all backdrop-blur-md">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="font-extrabold text-base md:text-lg text-white leading-snug group-hover:text-[#D4AF37] transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37] flex items-center justify-center shrink-0 transition-colors duration-300">
                                                    {isRTL ? (
                                                        <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" />
                                                    ) : (
                                                        <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" />
                                                    )}
                                                </div>
                                            </div>
                                            {service.short_description && (
                                                <p className="text-white/60 text-xs mt-2 line-clamp-2 leading-relaxed">
                                                    {service.short_description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover Border Glow Line */}
                                    <div className="absolute inset-0 rounded-[2.2rem] border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/60 pointer-events-none transition-all duration-500 shadow-[inset_0_0_25px_rgba(212,175,55,0.2)]" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
                    </div>
                </div>

                {/* Pagination Dots */}
                {scrollSnaps.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {scrollSnaps.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => emblaApi?.scrollTo(idx)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    selectedIndex === idx
                                        ? 'w-8 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]'
                                        : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex md:hidden items-center justify-between gap-3 mt-8 px-6">
                <button
                    type="button"
                    onClick={scrollRight}
                    className="rounded-full border border-white/15 text-white w-11 h-11 flex items-center justify-center glass-dark shadow-md active:scale-95 cursor-pointer"
                    aria-label="Previous service"
                >
                    <ChevronRight className="size-5" />
                </button>
                <Link
                    href="/services"
                    className="btn-glow-gold flex-1 text-center bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black px-6 py-2.5 rounded-full font-extrabold text-sm shadow-md"
                >
                    {locale === 'ar' ? 'عرض جميع الخدمات' : 'All Services'}
                </Link>
                <button
                    type="button"
                    onClick={scrollLeft}
                    className="rounded-full border border-white/15 text-white w-11 h-11 flex items-center justify-center glass-dark shadow-md active:scale-95 cursor-pointer"
                    aria-label="Next service"
                >
                    <ChevronLeft className="size-5" />
                </button>
            </div>
        </section>
    );
}
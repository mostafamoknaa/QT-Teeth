import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { Link, usePage } from '@inertiajs/react';

const SLIDE_SPACING = '1.5rem';

export default function ServicesCarouselSection({ services = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;

    const isRTL = document.dir === 'rtl' || document.documentElement.lang === 'ar';

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        direction: isRTL ? 'rtl' : 'ltr',
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
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

    if (!services || services.length === 0) return null;

    return (
        <section id="services-carousel" className="relative overflow-hidden py-16 md:py-24">
            {/* Section Header */}
            <div className="px-6 lg:px-24 mb-10 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-0.5 w-8 bg-[#D4AF37] rounded-full" />
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                            {locale === 'ar' ? 'خدماتنا الطبية' : 'Our Services'}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-background tracking-tight leading-snug">
                        {locale === 'ar' ? 'تخصصاتنا الدنتية' : 'Our Dental Specialties'}
                    </h2>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <Button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        size="icon"
                        variant="ghost"
                        className="rounded-full border border-background/20 text-background hover:bg-background/10 hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-all w-10 h-10"
                    >
                        <ChevronRight className="size-5" />
                    </Button>
                    <Button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        size="icon"
                        variant="ghost"
                        className="rounded-full border border-background/20 text-background hover:bg-background/10 hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-all w-10 h-10"
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden px-6 lg:px-24" ref={emblaRef} style={{ marginLeft: `calc(${SLIDE_SPACING} * -1)` }}>
                <div className="flex" style={{ backfaceVisibility: 'hidden', touchAction: 'pan-y pinch-zoom' }}>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                            style={{ paddingLeft: SLIDE_SPACING }}
                        >
                            <Link
                                href={`/services/${service.url_key || service.id}`}
                                className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-500 block hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={service.image ? `/storage/${service.image}` : 'https://placehold.co/600x500/1a1a1a/D4AF37?text=Service'}
                                        alt={service.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Number badge */}
                                    <div className="absolute top-4 start-4 w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                                        <span className="text-[#D4AF37] text-xs font-black">{String(index + 1).padStart(2, '0')}</span>
                                    </div>

                                    {/* Arrow icon on hover */}
                                    <div className="absolute bottom-4 end-4 w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                        <ArrowLeft size={16} className="text-black rtl:rotate-180" />
                                    </div>

                                    {/* Title on image bottom */}
                                    <div className="absolute bottom-0 start-0 end-0 p-5">
                                        <h3 className="font-black text-lg text-white leading-snug group-hover:text-[#D4AF37] transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        {service.short_description && (
                                            <p className="text-white/60 text-xs mt-1 line-clamp-1">{service.short_description}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile nav arrows */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-8 px-6">
                <Button
                    onClick={() => emblaApi?.scrollPrev()}
                    disabled={!canScrollPrev}
                    size="icon"
                    variant="ghost"
                    className="rounded-full border border-background/20 text-background disabled:opacity-30 w-10 h-10"
                >
                    <ChevronRight className="size-5" />
                </Button>
                <Link
                    href="/services"
                    className="flex-1 max-w-[200px] text-center bg-[#D4AF37] text-black px-6 py-2.5 rounded-full font-black text-sm hover:bg-background hover:text-[#D4AF37] transition-all duration-300"
                >
                    {locale === 'ar' ? 'كل الخدمات' : 'All Services'}
                </Link>
                <Button
                    onClick={() => emblaApi?.scrollNext()}
                    disabled={!canScrollNext}
                    size="icon"
                    variant="ghost"
                    className="rounded-full border border-background/20 text-background disabled:opacity-30 w-10 h-10"
                >
                    <ChevronLeft className="size-5" />
                </Button>
            </div>
        </section>
    );
}
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { Link } from '@inertiajs/react';

const SLIDE_SPACING = '1.5rem'; // 24px gap between slides

export default function ServicesCarouselSection({ services = [] }) {
    const { t } = useTranslations();

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

    // Guard AFTER all hooks
    if (!services || services.length === 0) return null;

    return (
        <section id="services-carousel" className="relative overflow-hidden py-24 px-4 lg:px-24">
            <div className="relative group">
                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10">
                    <Button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        size="icon"
                        variant="ghost"
                        className="pointer-events-auto rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30 disabled:hover:bg-black/30 transition-all"
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                    <Button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        size="icon"
                        variant="ghost"
                        className="pointer-events-auto rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-30 disabled:hover:bg-black/30 transition-all"
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                </div>

                {/* Carousel — use padding-based spacing (Embla-recommended) instead of CSS gap */}
                <div className="overflow-hidden" ref={emblaRef} style={{ marginLeft: `calc(${SLIDE_SPACING} * -1)` }}>
                    <div className="flex" style={{ backfaceVisibility: 'hidden', touchAction: 'pan-y pinch-zoom' }}>
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                                style={{ paddingLeft: SLIDE_SPACING }}
                            >
                                <Link
                                    href={`/services/${service.id}`}
                                    className="group relative rounded-3xl overflow-hidden bg-secondary/30 shadow-lg hover:shadow-xl transition-shadow duration-300 block"
                                >
                                    {/* Image */}
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={service.image ? `/storage/${service.image}` : 'https://placehold.co/600x500'}
                                            alt={service.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Title */}
                                    <div className="p-6 text-center">
                                        <h3 className="font-bold text-lg text-background group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
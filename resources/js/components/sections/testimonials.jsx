import React, { useState } from 'react';
import { Play, Eye, Star, Quote } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function TestimonialsSection({ testimonials }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const [playingId, setPlayingId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <>
            <section id="testimonials" className="py-20 md:py-28 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4 reveal">
                    <div className="eyebrow mx-auto justify-center">
                        {locale === 'ar' ? 'تجارب وآراء مرضانا' : 'PATIENT EXPERIENCES & REVIEWS'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        {t('clients.title')}
                    </h2>
                    <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        {locale === 'ar'
                            ? 'نعتز بثقة أكثر من 15,000 مريض ومريضة اختاروا مركز بدر لرسم ابتساماتهم بأعلى معايير الدقة والراحة.'
                            : 'Trusted by over 15,000 satisfied patients who chose Badr Dental Center for their smile transformation.'}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="glass-dark bg-black/60 rounded-[2.2rem] overflow-hidden border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/15 hover:-translate-y-2 flex flex-col justify-between"
                        >
                            {/* Video or Image Banner */}
                            <div className="relative aspect-video bg-black/80 group overflow-hidden">
                                {testimonial.video_url ? (
                                    playingId === testimonial.id ? (
                                        getYouTubeId(testimonial.video_url) ? (
                                            <iframe
                                                className="w-full h-full"
                                                src={`https://www.youtube.com/embed/${getYouTubeId(testimonial.video_url)}?autoplay=1`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <video
                                                src={testimonial.video_url}
                                                controls
                                                autoPlay
                                                className="w-full h-full object-cover"
                                            />
                                        )
                                    ) : (
                                        <>
                                            {testimonial.video_thumbnail || testimonial.image ? (
                                                <img
                                                    src={`/storage/${testimonial.video_thumbnail || testimonial.image}`}
                                                    alt={testimonial.client_name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-100"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center">
                                                    <Quote className="w-12 h-12 text-white/10" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <button
                                                    onClick={() => setPlayingId(testimonial.id)}
                                                    className="w-14 h-14 bg-gradient-to-tr from-[#c9a227] to-[#e8c84a] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border border-white/40"
                                                    aria-label="Play testimonial video"
                                                >
                                                    <Play className="w-5 h-5 text-black fill-black ms-0.5" />
                                                </button>
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <>
                                        {testimonial.image ? (
                                            <img
                                                src={`/storage/${testimonial.image}`}
                                                alt={testimonial.client_name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-100 cursor-pointer"
                                                onClick={() => setSelectedImage(testimonial.image)}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center">
                                                <Quote className="w-12 h-12 text-white/10" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={() => setSelectedImage(testimonial.image)}
                                                className="w-14 h-14 glass-dark rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer border border-white/20 shadow-xl"
                                                aria-label="View testimonial image"
                                            >
                                                <Eye className="w-5 h-5 text-white hover:text-black" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Review Content */}
                            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        {/* Star Rating */}
                                        {testimonial.rating > 0 && (
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-3.5 h-3.5 ${
                                                            star <= testimonial.rating
                                                                ? 'text-[#D4AF37] fill-[#D4AF37]'
                                                                : 'text-white/20 fill-transparent'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="text-[11px] text-white/50 ms-1 font-mono">
                                                    {testimonial.rating}/5
                                                </span>
                                            </div>
                                        )}
                                        <Quote className="w-6 h-6 text-[#D4AF37]/30 shrink-0" />
                                    </div>

                                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                                        "{testimonial.content}"
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-extrabold text-white">
                                            {testimonial.client_name}
                                        </h4>
                                        {testimonial.service_name && (
                                            <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                                                {testimonial.service_name}
                                            </p>
                                        )}
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]/60" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Image Viewer Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none flex items-center justify-center">
                    {selectedImage && (
                        <div className="max-h-[90vh] overflow-auto rounded-3xl shadow-2xl glass-dark border border-white/20 p-2">
                            <img
                                src={`/storage/${selectedImage}`}
                                alt="Review Screenshot"
                                className="max-w-full h-auto object-contain mx-auto rounded-2xl"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}


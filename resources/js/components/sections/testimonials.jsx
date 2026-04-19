import React from 'react';
import { Play } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function TestimonialsSection({ testimonials }) {
    const { t } = useTranslations();

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-24 px-4 lg:px-24 bg-secondary/10">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-4">
                    {t('clients.title')}
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto mb-8"></div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div 
                        key={testimonial.id} 
                        className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border/50"
                    >
                        {/* Video Banner Placeholder */}
                        <div className="relative aspect-video bg-black group overflow-hidden">
                            {testimonial.video_thumbnail || testimonial.image ? (
                                <img 
                                    src={`/storage/${testimonial.video_thumbnail || testimonial.image}`} 
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                            ) : (
                                <div className="w-full h-full bg-secondary/30"></div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-colors cursor-pointer">
                                    <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-8 space-y-4">
                            <div className="w-20 h-1 bg-muted-foreground rounded-full mb-4"></div>
                            <h3 className="text-lg md:text-xl leading-snug">
                                {testimonial.content}
                            </h3>
                            <div className="space-y-1">
                                <p className="text-lg font-bold text-muted-foreground">
                                    {testimonial.client_name}
                                </p>
                                {testimonial.service_name && (
                                    <p className="text-md text-foreground">
                                        {testimonial.service_name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Play } from 'lucide-react';

export default function ClientsIndex({ testimonials = [] }) {
    const { t } = useTranslations();

    return (
        <>
            <Head title={t('pages.clients.title')} />

            <section className="py-12 md:py-20 px-6 lg:px-24 bg-background">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
                        {t('pages.clients.title')}
                    </h1>
                    {/* <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                        {t('pages.clients.subtitle')}
                    </p> */}
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

                {testimonials.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">{t('pages.clients.empty')}</p>
                    </div>
                )}
            </section>
        </>
    );
}

ClientsIndex.layout = (page) => <PublicLayout children={page} />;

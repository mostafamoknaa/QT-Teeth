import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Play, Eye } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ClientsIndex({ testimonials = [] }) {
    const { t } = useTranslations();
    const { canonical_url } = usePage().props;
    const [playingId, setPlayingId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <>
            <Head title="تجارب عملائنا | اشطر دكتور اسنان في المنصورة والشيخ زايد | مركز بدر للأسنان">
                <meta name="description" content="شاهد تجارب وآراء عملاء مركز بدر لطب الأسنان بالمنصورة والشيخ زايد. فيديوهات واقعية لرحلات علاج وتجميل وزراعة الأسنان مع أفضل دكاترة الأسنان بمصر." />
                <meta name="keywords" content="تجارب عملاء مركز بدر، اراء المرضى، زراعة اسنان المنصورة، زراعة اسنان الشيخ زايد، افضل دكتور اسنان في الشيخ زايد والمنصورة، اشطر دكتور اسنان، عيادة اسنان بالمنصورة، عيادة اسنان بالشيخ زايد" />
                <link rel="canonical" href={canonical_url || "https://badrdentalcenter.com/clients"} />
            </Head>

            <section className="py-12 md:py-20 px-6 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-background">
                        {t('pages.clients.title')}
                    </h1>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id} 
                            className="bg-secondary/30 rounded-3xl overflow-hidden shadow-lg border border-border/50"
                        >
                            {/* Video or Image Banner */}
                            <div className="relative aspect-video bg-black group overflow-hidden">
                                {testimonial.video_url ? (
                                    playingId === testimonial.id ? (
                                        getYouTubeId(testimonial.video_url) ? (
                                            <iframe
                                                className="w-full h-full"
                                                src={`https://www.youtube.com/embed/${getYouTubeId(testimonial.video_url)}?autoplay=1`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
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
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-secondary/30"></div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <button 
                                                    onClick={() => setPlayingId(testimonial.id)}
                                                    className="w-16 h-16 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-colors cursor-pointer border border-white/10"
                                                >
                                                    <Play className="w-6 h-6 text-white ml-1" />
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
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 cursor-pointer"
                                                onClick={() => setSelectedImage(testimonial.image)}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary/30"></div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button 
                                                onClick={() => setSelectedImage(testimonial.image)}
                                                className="w-16 h-16 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-colors cursor-pointer border border-white/10"
                                            >
                                                <Eye className="w-6 h-6 text-white" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="p-8 space-y-4">
                                <div className="w-20 h-1 bg-muted-foreground rounded-full mb-4"></div>
                                <h3 className="text-lg text-background md:text-xl leading-snug">
                                    {testimonial.content}
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-background/70">
                                        {testimonial.client_name}
                                    </p>
                                    {testimonial.service_name && (
                                        <p className="text-md text-background">
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

            {/* Image Viewer Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none flex items-center justify-center">
                    {selectedImage && (
                        <div className="max-h-[90vh] overflow-auto rounded-2xl shadow-2xl bg-card border">
                            <img 
                                src={`/storage/${selectedImage}`} 
                                alt="Review Screenshot" 
                                className="max-w-full h-auto object-contain mx-auto"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

ClientsIndex.layout = (page) => <PublicLayout children={page} />;

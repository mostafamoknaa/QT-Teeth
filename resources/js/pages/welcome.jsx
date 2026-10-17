import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import DoctorAhmedBadrSection from '@/components/sections/doctor-profile';
import ServicesCarouselSection from '@/components/sections/services-carousel';
import GalleryCarousel from '@/components/sections/gallery-carousel';
import LatestArticlesSection from '@/components/sections/articles';
import BookingFormSection from '@/components/sections/booking';
import OffersSection from '@/components/sections/offers-section';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Welcome({ articles, testimonials, services, home_videos = [], gallery_photos = [], active_offers = [] }) {
    const { locale } = usePage().props;
    const [selectedVideo, setSelectedVideo] = useState(null);
    useScrollReveal();

    // Helper function to extract YouTube Video ID
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <>
            <Head title="افضل دكتور اسنان في الشيخ زايد والمنصورة | مركز بدر للأسنان">
                <meta name="description" content="هل تبحث عن اشطر دكتور اسنان؟ مركز بدر لطب الأسنان بالمنصورة والشيخ زايد يقدم خدمات زراعة وتجميل وتقويم الأسنان بأحدث التقنيات وبأيدي أكثر من ٣٠ استشاري. متاح التقسيط." />
                <meta name="keywords" content="افضل دكتور اسنان في الشيخ زايد والمنصورة، اشطر دكتور اسنان، افضل دكتور زراعة اسنان، مركز بدر للأسنان، زراعة الأسنان، تجميل الأسنان، تقويم الأسنان، علاج الجذور، حشوات حديثة، تركيبات ثابتة، علاج أسنان الأطفال، زراعة الفك، تخدير كلي، المنصورة، الشيخ زايد، Badr Dental Center" />
                <meta property="og:title" content="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان" />
                <meta property="og:description" content="أكثر من ٣٠ استشاري وأخصائي. زراعة ومتخصصون في تجميل وتقويم الأسنان. فروع في المنصورة والشيخ زايد. علاج في جلسة واحدة تحت تخدير كلي." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content="https://badrdentalcenter.com/" />
                <meta name="twitter:title" content="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان" />
                <meta name="twitter:description" content="أكثر من ٣٠ استشاري وأخصائي في زراعة ومتخصصون في تجميل وتقويم الأسنان. فروع المنصورة والشيخ زايد." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>

            <DoctorAhmedBadrSection />
            <ServicesCarouselSection services={services} />
            <GalleryCarousel photos={gallery_photos} />

            {/* Offers Section */}
            <OffersSection offers={active_offers} />

            {/* People Section / Dynamic Video Section */}
            {home_videos.length === 0 ? (
                <section className="px-4 md:px-8 lg:px-16 my-12 reveal">
                    <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                            src="/people.png" 
                            alt="Our Team" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </section>
            ) : (
                <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative overflow-hidden reveal">
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                        <div className="eyebrow mx-auto justify-center">
                            {locale === 'ar' ? 'فيديوهات وتجارب حقيقية' : 'PATIENT VIDEO STORIES'}
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                            {locale === 'ar' ? 'تجارب مرضانا من مختلف أنحاء العالم' : 'Patient Stories From Around the World'}
                        </h2>
                        <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                            {locale === 'ar'
                                ? 'شاهد انطباعات وتجارب مرضانا الحقيقية بعد تلقي العلاج في مركز بدر للأسنان.'
                                : 'Listen to genuine stories and testimonials from international and local patients at Badr Dental Center.'}
                        </p>
                    </div>

                    {/* Wavy Line Background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-64 text-white/5 pointer-events-none hidden md:block" viewBox="0 0 1200 200" fill="none">
                            <path 
                                d="M 0,130 C 150,130 300,70 450,70 C 600,70 700,130 850,130 C 1000,130 1050,70 1200,70" 
                                stroke="currentColor" 
                                strokeWidth="6" 
                                strokeDasharray="12 12" 
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {home_videos.map((video, index) => {
                            const offsetClass = index % 2 === 0 
                                ? 'md:translate-y-6 lg:translate-y-8' 
                                : 'md:-translate-y-4 lg:-translate-y-6';

                            const floatAnimClass = index === 0
                                ? 'card-float-up-down'
                                : index === 1
                                ? 'card-float-down-up'
                                : index === 2
                                ? 'card-float-sway'
                                : 'card-float-sway-reverse';

                            return (
                                <div 
                                    key={video.id}
                                    style={{ animationDelay: `${index * 0.4}s` }}
                                    className={`${floatAnimClass}`}
                                >
                                    <div
                                        onClick={() => setSelectedVideo(video)}
                                        className={`relative aspect-[3/4] rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden bg-black group border border-white/10 hover:border-[#D4AF37] cursor-pointer shadow-xl hover:shadow-[0_20px_45px_rgba(212,175,55,0.3)] transition-all duration-500 hover:scale-[1.04] ${offsetClass}`}
                                    >
                                        <img 
                                            src={`/storage/${video.thumbnail}`} 
                                            alt={video.title || 'Video Review'} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                                        />
                                        
                                        {/* Play Button with Double Glowing Ripple Rings */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                            <div className="relative">
                                                {/* Radiating Ripple Waves */}
                                                <div className="absolute -inset-3 rounded-full border border-[#D4AF37]/60 animate-ping opacity-50" />
                                                <div className="absolute -inset-6 rounded-full border border-[#D4AF37]/30 animate-pulse" />
                                                
                                                <div className="w-16 h-16 bg-gradient-to-tr from-[#c9a227] via-[#f0d060] to-[#c9a227] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.7)] group-hover:scale-115 transition-transform duration-300 border-2 border-white/60">
                                                    <Play className="w-6 h-6 text-black fill-black ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                        {video.title && (
                                            <div className="absolute bottom-6 left-6 right-6 z-10 text-white font-tajawal drop-shadow">
                                                <h3 className="text-base md:text-lg font-bold leading-tight line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{video.title}</h3>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 z-0" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            <LatestArticlesSection articles={articles} />
            <BookingFormSection services={services} />

            <LocalBusinessSchema />

            {/* Video Player Dialog */}
            <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden rounded-3xl border border-white/20">
                    <div className="relative aspect-video w-full flex items-center justify-center">
                        {selectedVideo && selectedVideo.youtube_url ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.youtube_url)}?autoplay=1`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : selectedVideo && selectedVideo.video_path ? (
                            <video 
                                src={`/storage/${selectedVideo.video_path}`} 
                                controls 
                                autoPlay 
                                className="w-full h-full object-contain"
                            />
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

Welcome.layout = (page) => <PublicLayout children={page} />;
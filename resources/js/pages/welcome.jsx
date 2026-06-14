import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import DoctorAhmedBadrSection from '@/components/sections/doctor-profile';
import ServicesCarouselSection from '@/components/sections/services-carousel';
import LatestArticlesSection from '@/components/sections/articles';
import BookingFormSection from '@/components/sections/booking';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Welcome({ articles, testimonials, services, home_videos = [] }) {
    const [selectedVideo, setSelectedVideo] = useState(null);

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

            {/* People Section / Dynamic Video Section */}
            {home_videos.length === 0 ? (
                <section className="px-4 md:px-8 lg:px-16">
                    <div className="rounded-[3rem] overflow-hidden">
                        <img 
                            src="/people.png" 
                            alt="Our Team" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </section>
            ) : (
                <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 relative overflow-hidden">
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
                            // index 0, 2 shifted down; index 1, 3 shifted up
                            const offsetClass = index % 2 === 0 
                                ? 'md:translate-y-8 lg:translate-y-12' 
                                : 'md:-translate-y-4 lg:-translate-y-6';
                            return (
                                <div 
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video)}
                                    className={`relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black group border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] ${offsetClass}`}
                                >
                                    <img 
                                        src={`/storage/${video.thumbnail}`} 
                                        alt={video.title || 'Video Review'} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300 scale-100 group-hover:scale-110 shadow-lg border border-white/20">
                                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                    {video.title && (
                                        <div className="absolute bottom-6 left-6 right-6 z-10 text-white font-tajawal drop-shadow">
                                            <h3 className="text-lg font-bold leading-tight line-clamp-2">{video.title}</h3>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-0"></div>
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
                <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden rounded-2xl border-none">
                    <div className="relative aspect-video w-full flex items-center justify-center">
                        {selectedVideo && selectedVideo.youtube_url ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.youtube_url)}?autoplay=1`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
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
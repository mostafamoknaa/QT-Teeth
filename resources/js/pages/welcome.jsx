import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import DoctorAhmedBadrSection from '@/components/sections/doctor-profile';
import ServicesVideoSpotlight from '@/components/sections/services-video-spotlight';
import ServicesCarouselSection from '@/components/sections/services-carousel';
import GalleryCarousel from '@/components/sections/gallery-carousel';
import LatestArticlesSection from '@/components/sections/articles';
import BookingFormSection from '@/components/sections/booking';
import BranchesVideoSection from '@/components/sections/branches-video';
import ClientPhotosCarousel from '@/components/sections/client-photos-carousel';
import RatingsCarousel from '@/components/sections/ratings-carousel';
import OffersSection from '@/components/sections/offers-section';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Welcome({ articles, testimonials, services, home_videos = [], gallery_photos = [], active_offers = [], ratings = [] }) {
    const { locale, canonical_url } = usePage().props;
    const isAr = locale === 'ar';
    const [selectedVideo, setSelectedVideo] = useState(null);
    useScrollReveal();

    // Helper function to extract YouTube Video ID
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const homeFaqs = [
        {
            question: isAr 
                ? 'كم تكلفة زراعة الأسنان في مركز بدر لطب الأسنان؟' 
                : 'How much do dental implants cost at Badr Dental Center?',
            answer: isAr
                ? 'يوفر مركز بدر باقات زراعة أسنان ألمانية وسويسرية معتمدة بضمان مدى الحياة وبأسعار تنافسية، مع خطط تقسيط ميسرة بدون فوائد وعروض دورية على زراعة الفك الكامل.'
                : 'Badr Dental Center provides certified German and Swiss dental implants with lifetime warranties, flexible 0% interest installment plans, and special packages for full-arch implants.'
        },
        {
            question: isAr
                ? 'كم تستغرق مدة تقويم الأسنان والتقويم الشفاف؟'
                : 'How long do braces and clear aligners take?',
            answer: isAr
                ? 'تتراوح مدة التقويم عادة بين 6 إلى 18 شهراً حسب الحالة. وبفضل تقنية التقويم الشفاف (Clear Aligners)، يمكن تحقيق نتائج سريعة وجمالية دون مظهر الأسلاك المعدنية.'
                : 'Orthodontic treatment typically takes between 6 to 18 months depending on alignment complexity. Clear aligners offer a virtually invisible, faster, and comfortable alternative to traditional braces.'
        },
        {
            question: isAr
                ? 'هل تبييض الأسنان آمن ولا يضر طبقة المينا؟'
                : 'Is teeth whitening safe for enamel?',
            answer: isAr
                ? 'نعم، يتم تبييض الأسنان في عياداتنا باستخدام أحدث أجهزة الليزر البارد المعتمدة عالمياً ومواد تبييض تحافظ على طبقة المينا وتقلل من حساسية الأسنان للحصول على ابتسامة ناصعة بأمان تام.'
                : 'Yes, in-office laser teeth whitening is completely safe when performed under professional dental supervision using certified enamel-safe whitening gels.'
        },
        {
            question: isAr
                ? 'كيفية تخفيف ألم الأسنان فوراً وعلاج العصب؟'
                : 'How to relieve toothache fast and treat root canals?',
            answer: isAr
                ? 'يُنصح بالمضمضة بالماء الدافئ والملح وتناول مسكن مناسب لحين زيارة الطبيب فوراً. في مركز بدر نستخدم الميكروسكوب الجراحي لعلاج العصب بدون ألم تماماً في جلسة واحدة.'
                : 'Rinse with warm salt water and use recommended pain relief until visiting the clinic. At Badr Center, rotary microscopes enable 100% painless single-session root canal treatments.'
        },
        {
            question: isAr
                ? 'ما هي مدة التعافي بعد زراعة الأسنان؟'
                : 'What is the dental implant recovery time?',
            answer: isAr
                ? 'بفضل تقنيات الزراعة الفورية بدون شق جراحي، يعود المريض لممارسة حياته الطبيعية خلال 24 إلى 48 ساعة فقط مع الالتزام بتعليمات الطبيب والأدوية الموصوفة.'
                : 'Thanks to flapless guided implant technology, most patients resume normal daily activities within 24 to 48 hours with minimal downtime.'
        },
        {
            question: isAr
                ? 'كيفية العناية بالأسنان والوقاية من تسوس الأسنان والتهاب اللثة؟'
                : 'How to care for teeth and prevent cavities and bleeding gums?',
            answer: isAr
                ? 'تنظيف الأسنان مرتين يومياً بمعجون يحتوي على الفلورايد، واستخدام خيط الأسنان الطبي وغسول الفم، مع الالتزام بزيارة طبيب الأسنان كل 6 أشهر للتنظيف وإزالة الجير.'
                : 'Brush twice daily with fluoride toothpaste, floss daily, and schedule regular dental checkups and professional cleanings every 6 months to prevent plaque and gingivitis.'
        },
        {
            question: isAr
                ? 'متى يجب زيارة طبيب الأسنان؟'
                : 'When should you visit a dentist?',
            answer: isAr
                ? 'يجب زيارة طبيب الأسنان كل 6 أشهر للفحص الدوري والتنظيف، أو فور الشعور بألم، نزيف باللثة، حساسية للمشروبات الباردة والساخنة، أو كسر في الأسنان.'
                : 'You should visit your dentist every 6 months for preventive checkups, or immediately upon experiencing toothache, bleeding gums, temperature sensitivity, or chipped teeth.'
        },
        {
            question: isAr
                ? 'أين توجد فروع مركز بدر لطب الأسنان؟'
                : 'Where are Badr Dental Center branches located?',
            answer: isAr
                ? 'يمتلك المركز فرعين رئيسيين في مصر: فرع المنصورة (حي الجامعة - أمام بوابة توشكى)، وفرع الشيخ زايد (محافظة الجيزة)، وكلاهما مجهز بأحدث تكنولوجيا طب الأسنان الرقمي.'
                : 'The center operates two flagship branches in Egypt: Mansoura branch (University District) and Sheikh Zayed branch (Giza / West Cairo), both equipped with cutting-edge digital dentistry.'
        }
    ];

    const metaTitle = isAr
        ? 'أفضل مركز ودكتور أسنان في مصر والشيخ زايد والمنصورة | مركز بدر'
        : 'Best Dentist & Dental Center in Egypt | Badr Dental Center';

    const metaDesc = isAr
        ? 'احجز مع نخبة من 30 استشاري بمركز بدر لطب الأسنان (الشيخ زايد والمنصورة). زراعة الأسنان الفورية، هوليوود سمايل، تقويم الأسنان، علاج العصب بدون ألم بجلسة واحدة وتخدير كلي مريح. متاح تقسيط.'
        : 'Top dental clinic in Egypt for dental implants, Hollywood smile veneers, orthodontics, teeth whitening, and painless root canals in Sheikh Zayed & Mansoura with 30+ consultants. Book your consultation today!';

    const metaKeywords = isAr
        ? 'دكتور أسنان, عيادة أسنان, مركز أسنان, أفضل دكتور أسنان, أفضل عيادة أسنان, خدمات طب الأسنان, استشارة طبيب أسنان, دكتور أسنان للطوارئ, الكشف على الأسنان, علاج الأسنان, أخصائي أسنان, زراعة الأسنان, تبييض الأسنان, تقويم الأسنان, تجميل الأسنان, علاج عصب الأسنان, خلع الأسنان, حشو الأسنان, تيجان الأسنان, جسور الأسنان, فينير الأسنان, هوليود سمايل, علاج اللثة, طب أسنان الأطفال, خلع ضرس العقل, أطقم الأسنان, التقويم الشفاف, تنظيف الأسنان, تلميع الأسنان, علاج ألم الأسنان, دكتور أسنان قريب مني, عيادة أسنان قريبة مني, مركز أسنان قريب مني, دكتور أسنان في القاهرة, عيادة أسنان في القاهرة, دكتور أسنان في المنصورة, دكتور أسنان في الشيخ زايد, زراعة الأسنان في القاهرة, دكتور تقويم أسنان في القاهرة, تبييض الأسنان في القاهرة, عيادة أسنان مفتوحة الآن, دكتور تجميل أسنان, دكتور زراعة أسنان, أخصائي تقويم الأسنان, حجز موعد دكتور أسنان, استشارة دكتور أسنان, احجز موعد مع دكتور أسنان, حجز عيادة أسنان, حجز استشارة زراعة الأسنان, حجز موعد تبييض الأسنان, أسعار علاج الأسنان, أسعار زراعة الأسنان, أسعار تقويم الأسنان, أسعار تبييض الأسنان, رقم عيادة الأسنان, كم تكلفة زراعة الأسنان, كم تستغرق مدة تقويم الأسنان, هل تبييض الأسنان آمن, مركز بدر لطب الاسنان, دكتور احمد بدر, Badr Dental Center'
        : 'Dentist, Dental clinic, Dental center, Dental care, Best dentist, Best dental clinic, Dental services, Family dentist, Private dentist, Dental consultation, Emergency dentist, Dental checkup, Dental treatment, Dental specialist, Dental implants, Teeth whitening, Orthodontics, Braces, Cosmetic dentistry, Root canal treatment, Tooth extraction, Dental fillings, Dental crowns, Dental bridges, Dental veneers, Hollywood smile, Gum treatment, Pediatric dentistry, Wisdom tooth removal, Dentures, Clear aligners, Dental cleaning, Teeth polishing, Toothache treatment, Dentist near me, Dental clinic near me, Dental center near me, Dentist in Cairo, Dental clinic in Cairo, Dentist in Alexandria, Dentist in Mansoura, Dentist in Sheikh Zayed, Dental implants in Cairo, Orthodontist in Cairo, Teeth whitening in Cairo, Dental clinic open now, Affordable dentist near me, Experienced dentist, Cosmetic dentist, Implant dentist, Dentist appointment, Dentist consultation, Book a dentist appointment, Dental clinic booking, Dental implant consultation, Teeth whitening appointment, Orthodontic consultation, Dental treatment prices, Dental implants prices, Braces prices, Teeth whitening prices, Dental clinic contact number, Badr Dental Center';

    const pageUrl = canonical_url || 'https://badrdentalcenter.com/';

    return (
        <>
            <Head title={metaTitle}>
                <meta name="description" content={metaDesc} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content={pageUrl} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
                <link rel="canonical" href={pageUrl} />
            </Head>

            {/* Structured Data JSON-LD Schemas */}
            <LocalBusinessSchema />
            <FAQSchema faqs={homeFaqs} />

            <DoctorAhmedBadrSection />
            <ServicesVideoSpotlight />
            <ServicesCarouselSection services={services} />
            <GalleryCarousel photos={gallery_photos} />

            {/* Offers Section */}
            <OffersSection offers={active_offers} />

            {/* Photos with Clients 3D Coverflow Carousel */}
            <ClientPhotosCarousel />

            {/* Ratings & Reviews Carousel (Moving Left) */}
            <RatingsCarousel ratings={ratings} />

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

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
                        {home_videos.map((video, index) => {
                            const offsetClass = index % 2 === 0 
                                ? 'md:translate-y-5 lg:translate-y-6' 
                                : 'md:-translate-y-3 lg:-translate-y-4';

                            const floatAnimClass = (index % 4 === 0)
                                ? 'card-float-up-down'
                                : (index % 4 === 1)
                                ? 'card-float-down-up'
                                : (index % 4 === 2)
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
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                if (video.youtube_url) {
                                                    const yId = getYouTubeId(video.youtube_url);
                                                    if (yId && !e.target.src.includes('img.youtube.com')) {
                                                        e.target.src = `https://img.youtube.com/vi/${yId}/maxresdefault.jpg`;
                                                    }
                                                }
                                            }}
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
            <BranchesVideoSection />

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
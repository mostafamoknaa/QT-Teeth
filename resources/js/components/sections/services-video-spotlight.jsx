import React from 'react';
import { usePage } from '@inertiajs/react';
import { 
    Sparkles, 
    Play, 
    Calendar, 
    ShieldCheck, 
    Stethoscope, 
    CheckCircle2, 
    ArrowDown,
    Activity,
    Layers
} from 'lucide-react';

export default function ServicesVideoSpotlight() {
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    const servicePoints = isRTL
        ? [
            {
                title: 'تخصصات طبية وتجميلية متكاملة',
                desc: 'زراعة الأسنان الألمانية والسويسرية، تقويم الأسنان، هوليوود سمايل، وتبييض الأسنان بأحدث التقنيات.',
            },
            {
                title: 'أجهزة رقمية ثلاثية الأبعاد (3D)',
                desc: 'مسح رقمي دقيق بدون معجون تقليدي، وتخطيط رقمي للابتسامة قبل بدء أي إجراء علاجي.',
            },
            {
                title: 'رعاية مريحة بدون ألم وبأعلى معايير التعقيم',
                desc: 'فريق استشاري متخصص يضمن لك تجربة علاجية هادئة وسريعة مع خطط تقسيط ميسرة.',
            },
        ]
        : [
            {
                title: 'Comprehensive Dental & Cosmetic Services',
                desc: 'Certified German & Swiss dental implants, orthodontics, Hollywood smile design, and advanced whitening.',
            },
            {
                title: 'Cutting-Edge 3D Digital Dentistry',
                desc: 'High-precision 3D digital scanners and digital smile planning before beginning your treatment.',
            },
            {
                title: 'Pain-Free Comfort & Strict Sterilization',
                desc: 'Experienced consultants ensure a painless, gentle experience with flexible 0% installment plans.',
            },
        ];

    return (
        <section id="services-spotlight" className="py-16 md:py-24 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-[#09090b]">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#D4AF37]/8 blur-[160px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Column 1: Informational & Compelling Value Proposition (7 cols) */}
                    <div className="lg:col-span-7 space-y-6 reveal text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className="eyebrow flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{isRTL ? 'فيديو تعريفي بخدمات وتجهيزات المركز' : 'DISCOVER OUR SERVICES IN 60 SECONDS'}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
                            {isRTL ? (
                                <>
                                    شاهد كيف نصنع <span className="text-gradient-gold">ابتسامتك المثالية</span> وما نقدمه لك
                                </>
                            ) : (
                                <>
                                    Discover How We Transform <span className="text-gradient-gold">Your Smile</span> & What We Do
                                </>
                            )}
                        </h2>

                        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                            {isRTL
                                ? 'شاهد في هذا الفيديو التعريفي السريع نبذة شاملة عن تخصصات مركز بدر لطب وجراحة الأسنان، وتعرف على التقنيات الحديثة وأسلوب الرعاية الطبية التي نقدمها لجميع مرضانا.'
                                : 'Watch this short overview video exploring the full spectrum of dental specialties, advanced 3D technology, and patient-first care at Badr Dental Center.'}
                        </p>

                        {/* Value Feature Checkpoints */}
                        <div className="space-y-4 pt-2">
                            {servicePoints.map((point, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/40 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm sm:text-base font-bold text-white">
                                            {point.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                                            {point.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Callouts */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <a
                                href="#booking"
                                className="btn-glow-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>{isRTL ? 'احجز استشارتك الآن' : 'Book Free Consultation'}</span>
                            </a>

                            <a
                                href="#services-carousel"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-dark text-white/90 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 text-sm font-semibold transition-all"
                            >
                                <ArrowDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                                <span>{isRTL ? 'تصفح باقات الخدمات بالأسفل' : 'Browse All Services Below'}</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: The Vertical Video Device Player (5 cols) */}
                    <div className="lg:col-span-5 reveal">
                        <div className="relative max-w-[340px] sm:max-w-[370px] mx-auto">
                            
                            {/* Decorative Glowing Aura Ring behind Video */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent rounded-[3rem] blur-2xl -z-10 animate-pulse" />

                            {/* Luxury Phone/Device Frame Container */}
                            <div className="relative rounded-[2.6rem] overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_25px_65px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.25)] bg-black p-2.5">
                                
                                {/* Inner Screen Bezel with 9:16 Aspect Ratio */}
                                <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-black group">
                                    <iframe
                                        className="w-full h-full border-0"
                                        src="https://www.youtube.com/embed/Ke7_owbedQc?rel=0&modestbranding=1&playsinline=1"
                                        title="Badr Dental Center - Services and What We Do"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>

                                {/* Floating Header Pill on Device Frame */}
                                <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                                    <div className="px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#F3E5AB] text-[11px] font-black shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                        <span>{isRTL ? 'فيديو تعريفي بخدماتنا 🎥' : 'Our Services Overview 🎥'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Ambient Tag */}
                            <div className="mt-4 text-center">
                                <p className="text-[11px] sm:text-xs text-white/50 font-medium flex items-center justify-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>{isRTL ? 'مركز بدر لطب وجراحة الأسنان • خبرة استشارية متكاملة' : 'Badr Dental Center • Elite Consultative Care'}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

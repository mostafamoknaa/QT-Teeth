import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';
import { Award, Sparkles, Calendar, ShieldCheck, Stethoscope, Users, Building2, Smile, Play } from 'lucide-react';

function useCountUp(target, duration = 1800, start = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start || !target) return;
        const numeric = parseInt(String(target).replace(/\D/g, ''), 10);
        if (!numeric) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setVal(Math.floor(progress * numeric));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return val;
}

function StatItem({ value, label, prefix = '', suffix = '', icon: Icon, started, index = 0 }) {
    const numeric = parseInt(String(value).replace(/\D/g, ''), 10);
    const count = useCountUp(numeric, 1800, started);
    const floatClass = index % 2 === 0 ? 'card-float-up-down' : 'card-float-down-up';
    return (
        <div 
            style={{ animationDelay: `${index * 0.5}s` }}
            className={`group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl transition-all duration-500 hover:-translate-y-2.5 hover:bg-[#D4AF37]/10 cursor-default ${floatClass}`}
        >
            {Icon && (
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-115 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300">
                    <Icon className="w-6 h-6 group-hover:rotate-6 transition-transform" />
                </div>
            )}
            <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#D4AF37] tracking-tight drop-shadow-sm font-sans group-hover:scale-105 transition-transform">
                {prefix}{count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs md:text-sm text-white/80 font-medium mt-1 leading-snug">
                {label}
            </div>
        </div>
    );
}

export default function DoctorAhmedBadrSection() {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const stats = locale === 'ar'
        ? [
            { value: 30, suffix: '+', label: 'استشاري وأخصائي متخصص', icon: Users },
            { value: 10, suffix: '+', label: 'سنوات خبرة وتميز', icon: Award },
            { value: 2,  suffix: '',  label: 'فروع في مصر (الزايد والمنصورة)', icon: Building2 },
            { value: 15000, suffix: '+', label: 'ابتسامة و مريض سعيد', icon: Smile },
        ]
        : [
            { value: 30, suffix: '+', label: 'Specialists & Consultants', icon: Users },
            { value: 10, suffix: '+', label: 'Years of Excellence', icon: Award },
            { value: 2,  suffix: '',  label: 'Branches in Egypt', icon: Building2 },
            { value: 15000, suffix: '+', label: 'Smiles Transformed', icon: Smile },
        ];

    const highlights = locale === 'ar'
        ? [
            'علاج الأسنان في جلسة واحدة تحت التخدير الكلي',
            'أحدث تقنيات زراعة الأسنان الفورية وتأهيل الفك',
            'غرف تعقيم مطابقة لأعلى المعايير العالمية',
            'خطط دفع وتقسيط ميسرة لكافة العلاجات',
        ]
        : [
            'Single-session treatment under general anesthesia',
            'Immediate implantology and full-arch rehabilitation',
            'Hospital-grade sterilization protocols',
            'Flexible installment and financing plans',
        ];

    return (
        <section id="doctors" ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Content Column (7 cols) */}
                    <div className="lg:col-span-7 space-y-6 reveal-left">
                        {/* Eyebrow */}
                        <div className="eyebrow">
                            {locale === 'ar' ? 'مركز بدر للأسنان' : 'BADR DENTAL CENTER'}
                        </div>

                        {/* Title with Gold Gradient Accent */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                            {t('hero.description')}
                        </h2>

                        {/* Credentials Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-xs sm:text-sm font-semibold text-[#D4AF37]">
                            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                            <span>
                                {locale === 'ar'
                                    ? 'نخبة من أكثر من 30 استشاري وأخصائي في جراحة وتجميل الفم والأسنان'
                                    : 'A team of 30+ senior dental consultants and specialists'}
                            </span>
                        </div>

                        {/* Description Paragraphs */}
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed text-justify">
                            {t('hero.profile_1')}
                        </p>

                        <p className="text-white/70 text-sm sm:text-base leading-relaxed text-justify">
                            {t('hero.profile_2')}
                        </p>

                        {/* Feature Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action CTA */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <a
                                href="#booking"
                                className="btn-glow-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-transform"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>{locale === 'ar' ? 'احجز استشارتك الآن' : 'Book Consultation Now'}</span>
                            </a>
                            <a
                                href="#services-spotlight"
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full glass-dark text-white hover:text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-sm font-bold transition-all shadow-lg group/btn"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-black group-hover/btn:scale-110 transition-transform">
                                    <Play className="w-3 h-3 fill-black ml-0.5" />
                                </div>
                                <span>{locale === 'ar' ? 'شاهد فيديو عن خدماتنا' : 'Watch Services Video'}</span>
                            </a>
                        </div>
                    </div>

                    {/* Image Column (5 cols) */}
                    <div className="lg:col-span-5 relative reveal-right">
                        {/* Background Aura */}
                        <div className="absolute -inset-3 bg-gradient-to-tr from-[#D4AF37]/25 via-transparent to-[#D4AF37]/15 rounded-[2.5rem] blur-2xl -z-10" />

                        {/* Portrait Frame */}
                        <div className="relative aspect-[4/5] max-w-md mx-auto rounded-[2.5rem] overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-black/50 group card-float-up-down">
                            <img
                                src="/dr-ahmed.jpg"
                                alt="د. أحمد عبدالله بدر"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Top Badge: Years Experience */}
                            <div className="absolute top-4 right-4 glass-dark px-3.5 py-2 rounded-2xl border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center gap-2 backdrop-blur-md badge-float z-10">
                                <Award className="w-5 h-5 text-[#D4AF37]" />
                                <div className="text-right">
                                    <div className="text-xs font-black text-[#D4AF37]">
                                        {locale === 'ar' ? '+10 سنوات' : '+10 Years'}
                                    </div>
                                    <div className="text-[10px] text-white/70">
                                        {locale === 'ar' ? 'خبرة وتميز' : 'Experience'}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Card Overlay */}
                            <div className="absolute bottom-4 inset-x-4 glass-dark p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-base font-bold text-white">
                                            {locale === 'ar' ? 'د. أحمد عبدالله بدر' : 'Dr. Ahmed Badr'}
                                        </div>
                                        <div className="text-xs text-[#D4AF37] font-medium mt-0.5">
                                            {locale === 'ar'
                                                ? 'استشاري زراعة وتجميل الفم والأسنان'
                                                : 'Consultant of Oral Implantology & Aesthetics'}
                                        </div>
                                    </div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="متاح للحجز" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 2. ENHANCED 4 LUXURY STAT CARDS (Matching the bottom of reference image with floating animations) */}
                <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
                    {/* Card 1: 25+ Years Experience */}
                    <div 
                        style={{ animationDelay: '0s' }}
                        className="card-float-up-down group relative glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:-translate-y-2 text-center overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
                            <Award className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C89B27] font-sans">
                            {started ? '25+' : '0'}
                        </div>
                        <div className="text-xs sm:text-sm text-white/80 font-bold mt-2">
                            {locale === 'ar' ? 'سنوات من الخبرة والتميز' : 'Years of Experience'}
                        </div>
                    </div>

                    {/* Card 2: 25,000+ Cases Treated */}
                    <div 
                        style={{ animationDelay: '0.3s' }}
                        className="card-float-down-up group relative glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:-translate-y-2 text-center overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
                            <Smile className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C89B27] font-sans">
                            {started ? '25,000+' : '0'}
                        </div>
                        <div className="text-xs sm:text-sm text-white/80 font-bold mt-2">
                            {locale === 'ar' ? 'حالة تم علاجها بنجاح' : 'Cases Successfully Treated'}
                        </div>
                    </div>

                    {/* Card 3: 12,000+ Implants */}
                    <div 
                        style={{ animationDelay: '0.6s' }}
                        className="card-float-sway group relative glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:-translate-y-2 text-center overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C89B27] font-sans">
                            {started ? '12,000+' : '0'}
                        </div>
                        <div className="text-xs sm:text-sm text-white/80 font-bold mt-2">
                            {locale === 'ar' ? 'حالات زراعة ناجحة' : 'Successful Implants'}
                        </div>
                    </div>

                    {/* Card 4: 5,000+ Orthodontics */}
                    <div 
                        style={{ animationDelay: '0.9s' }}
                        className="card-float-sway-reverse group relative glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:-translate-y-2 text-center overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C89B27] font-sans">
                            {started ? '5,000+' : '0'}
                        </div>
                        <div className="text-xs sm:text-sm text-white/80 font-bold mt-2">
                            {locale === 'ar' ? 'حالات تقويم ناجحة' : 'Successful Orthodontics'}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}


import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';

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

function StatItem({ value, label, prefix = '', suffix = '', started }) {
    const numeric = parseInt(String(value).replace(/\D/g, ''), 10);
    const count = useCountUp(numeric, 1800, started);
    return (
        <div className="flex flex-col items-center text-center gap-1">
            <div className="text-3xl md:text-4xl font-black text-[#D4AF37] tracking-tight">
                {prefix}{count}{suffix}
            </div>
            <div className="text-xs md:text-sm text-background/70 font-medium leading-snug max-w-[120px]">
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
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const stats = locale === 'ar'
        ? [
            { value: 30, suffix: '+', label: 'استشاري وأخصائي' },
            { value: 10, suffix: '+', label: 'سنوات من الخبرة' },
            { value: 2,  suffix: '',  label: 'فروع في مصر' },
            { value: 15000, suffix: '+', label: 'مريض سعيد' },
        ]
        : [
            { value: 30, suffix: '+', label: 'Consultants & Specialists' },
            { value: 10, suffix: '+', label: 'Years of Experience' },
            { value: 2,  suffix: '',  label: 'Branches in Egypt' },
            { value: 15000, suffix: '+', label: 'Happy Patients' },
        ];

    return (
        <section id="doctors" ref={sectionRef} className="py-12 md:py-20 px-6 lg:px-24 relative overflow-hidden">
            <div className="max-w-7xl">
                <div className="w-full">
                    {/* Gold decorative line */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-10 bg-[#D4AF37] rounded-full" />
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                            {locale === 'ar' ? 'مركز بدر للأسنان' : 'Badr Dental Center'}
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4 max-w-4xl">
                            <h2 className="text-xl text-background md:text-2xl lg:text-3xl font-bold tracking-tight leading-snug">
                                {t('hero.description')}
                            </h2>
                        </div>

                        <p className="text-background text-sm md:text-base leading-relaxed text-justify">
                            {t('hero.profile_1')}
                        </p>

                        <p className="text-background text-sm md:text-base leading-relaxed text-justify">
                            {t('hero.profile_2')}
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-background/10 pt-10">
                        {stats.map((s, i) => (
                            <StatItem key={i} value={s.value} suffix={s.suffix} label={s.label} started={started} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

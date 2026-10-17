import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function LatestArticlesSection({ articles = [] }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    if (!articles || articles.length === 0) return null;

    // Estimate reading time from description length
    const getReadingTime = (text) => {
        if (!text) return isRTL ? '3 دقائق' : '3 min';
        const words = text.trim().split(/\s+/).length;
        const mins = Math.max(2, Math.ceil(words / 40));
        return isRTL ? `${mins} دقائق قراءة` : `${mins} min read`;
    };

    return (
        <section id="articles" className="py-20 md:py-28 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-1/2 end-10 w-[450px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 reveal">
                <div>
                    <div className="eyebrow mb-3">
                        {locale === 'ar' ? 'المدونة الطبية والتوعية' : 'CLINICAL BLOG & INSIGHTS'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                        {t('articles.title')}
                    </h2>
                </div>
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark text-white/90 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 text-xs font-bold transition-all self-start sm:self-auto"
                >
                    <span>{t('articles.view_all')}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal">
                {articles.slice(0, 3).map((article, index) => {
                    const floatClass = index === 0
                        ? 'card-float-up-down'
                        : index === 1
                        ? 'card-float-down-up'
                        : 'card-float-sway';

                    return (
                        <div
                            key={article.id || index}
                            style={{ animationDelay: `${index * 0.4}s` }}
                            className={`${floatClass}`}
                        >
                            <Link
                                href={`/articles/${article.url_key || article.slug || article.id}`}
                                className="group flex flex-col glass-dark rounded-[2.2rem] overflow-hidden border border-white/10 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)] hover:-translate-y-3 hover:scale-[1.02] bg-black/60 h-full"
                            >
                                {/* Image Frame */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                                    <img
                                        src={article.image ? `/storage/${article.image}` : '/clinic-2.png'}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 start-4">
                                        <span className="glass-dark text-[#D4AF37] font-bold text-xs px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                                            {article.category_name || (locale === 'ar' ? 'طب الأسنان' : 'Dental Care')}
                                        </span>
                                    </div>

                                    {/* Read Time Badge */}
                                    <div className="absolute bottom-3 end-3 glass-dark text-white/70 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                                        <span>{getReadingTime(article.description)}</span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                                    <div className="space-y-3">
                                        <h3 className="text-base sm:text-lg font-extrabold leading-snug text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Card Footer Link */}
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#D4AF37] group-hover:text-white transition-colors">
                                        <span className="flex items-center gap-1.5">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>{locale === 'ar' ? 'اقرأ المقال كاملاً' : 'Read Article'}</span>
                                        </span>
                                        <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-all">
                                            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}


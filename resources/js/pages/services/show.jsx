import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import {
    ChevronRight,
    ChevronLeft,
    HeartPulse,
    HelpCircle,
    ChevronDown,
    Sparkles,
    ShieldCheck,
    Award,
    Calendar,
    MessageCircle,
    Stethoscope,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import ServiceSchema from '@/components/seo/ServiceSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function ServiceShow({ service, canonical_url }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const ogImage = service.image
        ? `https://badrdentalcenter.com/storage/${service.image}`
        : 'https://badrdentalcenter.com/og-image.png';
    const serviceUrl = canonical_url || `https://badrdentalcenter.com/services/${service.url_key || service.id}`;

    return (
        <>
            <Head title={`${service.title} | مركز بدر لطب الأسنان`}>
                <meta name="description" content={service.description || `${service.title} — مركز بدر لطب الأسنان. متخصصون في زراعة وتجميل وتقويم الأسنان. فروع في المنصورة والشيخ زايد.`} />
                <meta property="og:title" content={`${service.title} | مركز بدر لطب الأسنان`} />
                <meta property="og:description" content={service.description || service.title} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:url" content={serviceUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${service.title} | مركز بدر`} />
                <meta name="twitter:description" content={service.description || service.title} />
                <meta name="twitter:image" content={ogImage} />
            </Head>

            <article className="py-12 md:py-20 px-4 sm:px-6 lg:px-24 relative overflow-hidden text-white">
                {/* Ambient Background Accents */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-white/60 mb-8 max-w-4xl mx-auto">
                    <Link href="/" className="hover:text-[#D4AF37] transition-colors">{t('nav.home')}</Link>
                    {isRTL ? <ChevronLeft size={14} className="text-[#D4AF37]/60" /> : <ChevronRight size={14} className="text-[#D4AF37]/60" />}
                    <Link href="/services" className="hover:text-[#D4AF37] transition-colors">{t('pages.services.title')}</Link>
                    {isRTL ? <ChevronLeft size={14} className="text-[#D4AF37]/60" /> : <ChevronRight size={14} className="text-[#D4AF37]/60" />}
                    <span className="text-[#D4AF37] font-bold truncate">{service.title}</span>
                </nav>

                <div className="max-w-4xl mx-auto space-y-10 mb-16">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="eyebrow mx-auto justify-center">
                            {locale === 'ar' ? 'تخصصات مركز بدر لطب وتجميل الأسنان' : 'BADR DENTAL CLINIC SPECIALTIES'}
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                            {service.title}
                        </h1>
                    </div>

                    {/* Banner Image */}
                    {service.image ? (
                        <div className="relative max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/15 aspect-[16/9] md:aspect-[21/9] group bg-black/60">
                            <img 
                                src={`/storage/${service.image}`} 
                                alt={service.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 start-6 z-10 flex items-center gap-3">
                                <span className="glass-dark px-4 py-2 rounded-full text-xs font-bold text-white/90 border border-white/15 flex items-center gap-2 shadow-lg">
                                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                    {locale === 'ar' ? 'رعاية تخصصية متكاملة' : 'Specialized Care'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-[#1a1917] via-[#242016] to-[#121212] flex flex-col items-center justify-center border border-white/10 p-8 text-center">
                            <div className="w-24 h-24 rounded-3xl glass-gold border border-[#D4AF37]/40 flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(212,175,55,0.3)]">
                                <Stethoscope className="w-12 h-12 text-[#D4AF37] animate-pulse" />
                            </div>
                            <h3 className="text-xl font-black text-white">{service.title}</h3>
                            <p className="text-white/60 text-xs sm:text-sm mt-2 max-w-md">
                                {locale === 'ar' ? 'أحدث التقنيات الطبية بإشراف نخبة من كبار الاستشاريين' : 'State-of-the-art dental care overseen by top consultants'}
                            </p>
                        </div>
                    )}

                    {/* Description Highlight Card */}
                    {service.description && (
                        <div className="glass-dark p-6 sm:p-8 rounded-3xl border-s-4 border-s-[#D4AF37] border-white/10 shadow-xl">
                            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
                                {service.description}
                            </p>
                        </div>
                    )}

                    {/* 4 Clinic Guarantees Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="glass-dark p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                            <Award className="w-8 h-8 text-[#D4AF37] mb-3" />
                            <h4 className="text-sm font-bold text-white mb-1">{locale === 'ar' ? 'استشاريون متخصصون' : 'Certified Consultants'}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{locale === 'ar' ? 'خبرة تتجاوز 15 عاماً في العلاجات المتقدمة' : 'Over 15 years of specialized clinical experience'}</p>
                        </div>
                        <div className="glass-dark p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                            <Sparkles className="w-8 h-8 text-[#D4AF37] mb-3" />
                            <h4 className="text-sm font-bold text-white mb-1">{locale === 'ar' ? 'أحدث الأجهزة الرقمية' : 'Digital Dentistry'}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{locale === 'ar' ? 'تصوير ثلاثي الأبعاد وتشخيص دقيق فائق السرعة' : '3D CBCT imaging and precision diagnostic tools'}</p>
                        </div>
                        <div className="glass-dark p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                            <HeartPulse className="w-8 h-8 text-[#D4AF37] mb-3" />
                            <h4 className="text-sm font-bold text-white mb-1">{locale === 'ar' ? 'علاج بدون ألم' : 'Pain-Free Protocol'}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{locale === 'ar' ? 'بروتوكولات تخدير حديثة لتجربة مريحة تماماً' : 'Modern anesthesia protocols for maximum comfort'}</p>
                        </div>
                        <div className="glass-dark p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                            <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-3" />
                            <h4 className="text-sm font-bold text-white mb-1">{locale === 'ar' ? 'ضمان معتمد' : 'Certified Warranty'}</h4>
                            <p className="text-xs text-white/60 leading-relaxed">{locale === 'ar' ? 'ضمان مكتوب على جودة التركيبات والزراعة' : 'Comprehensive guarantee on implants and prosthetics'}</p>
                        </div>
                    </div>

                    {/* Content */}
                    {service.content && (
                        <div className="glass-dark p-6 sm:p-10 rounded-3xl border border-white/10 text-white/85 leading-relaxed text-justify whitespace-pre-line text-sm sm:text-base md:text-lg shadow-xl">
                            {service.content}
                        </div>
                    )}

                    {/* Consultation & Booking Callout Card */}
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#242016] via-[#1a1917] to-[#121212] border border-[#D4AF37]/40 p-8 sm:p-10 shadow-2xl">
                        <div className="absolute top-0 end-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-start">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                                    <Calendar className="w-4 h-4" />
                                    <span>{locale === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation'}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white">
                                    {locale === 'ar' ? `هل تحتاج إلى رعاية متخصصة في ${service.title}؟` : `Need specialized care in ${service.title}?`}
                                </h3>
                                <p className="text-xs sm:text-sm text-white/70 max-w-lg leading-relaxed">
                                    {locale === 'ar'
                                        ? 'احجز موعدك اليوم لتحديد خطة علاجية مخصصة تناسب احتياجاتك بأيدي استشاريينا المعتمدين.'
                                        : 'Book your appointment today for a personalized treatment plan with our accredited dental consultants.'}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                                <Link 
                                    href={`/?service_id=${service.id}#booking`}
                                    className="btn-glow-gold bg-gradient-to-r from-[#c9a227] to-[#e8c84a] text-black px-7 py-3.5 rounded-full font-black text-sm text-center shadow-xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    {locale === 'ar' ? 'حجز موعد كشف' : 'Book Appointment'}
                                </Link>
                                <a 
                                    href="https://wa.me/201022888204"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-dark text-white border border-white/20 hover:border-[#25D366] hover:bg-[#25D366]/20 px-6 py-3.5 rounded-full font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                                    <span>{locale === 'ar' ? 'استفسار عبر واتساب' : 'WhatsApp'}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Callout CTA */}
                    <div className="p-6 sm:p-8 rounded-[2.2rem] glass-dark border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                        <div className="flex items-center gap-4 text-center sm:text-start flex-col sm:flex-row">
                            <div className="w-14 h-14 rounded-2xl glass-gold border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-lg">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-bold text-white">
                                    {locale === 'ar' ? 'شاهد صور حالات حقيقية (قبل / بعد)' : 'Real Patient Case Results (Before / After)'}
                                </h3>
                                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                                    {locale === 'ar' ? 'استعرض التحول الحقيقي لابتسامات مرضانا في معرض الحالات السريرية' : 'Explore smile transformations from our actual patient clinical records'}
                                </p>
                            </div>
                        </div>
                        <Link 
                            href="/#gallery-carousel" 
                            className="glass-dark border border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md shrink-0 whitespace-nowrap"
                        >
                            {locale === 'ar' ? 'تصفح معرض الحالات' : 'View Smile Gallery'}
                        </Link>
                    </div>

                    {/* FAQs Accordion */}
                    {service.faqs && service.faqs.length > 0 && (
                        <div className="pt-8">
                            <div className="space-y-2 mb-6">
                                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                                    <HelpCircle className="text-[#D4AF37] w-6 h-6" />
                                    <span>{locale === 'ar' ? `الأسئلة الشائعة حول ${service.title}` : `Frequently Asked Questions about ${service.title}`}</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-white/60">
                                    {locale === 'ar'
                                        ? `إليك إجابات شافية لأبرز الأسئلة المتكررة من مرضانا حول ${service.title}.`
                                        : `Here are answers to the most common questions regarding ${service.title}.`}
                                </p>
                            </div>
                            <div className="space-y-3">
                                {service.faqs.map((faq, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div 
                                            key={idx} 
                                            className="border border-white/10 rounded-2xl overflow-hidden glass-dark hover:border-[#D4AF37]/40 transition-all duration-300"
                                        >
                                            <button 
                                                type="button"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                className="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-start font-bold text-sm sm:text-base text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                                            >
                                                <span>{faq.question}</span>
                                                <ChevronDown className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div 
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}
                                            >
                                                <p className="px-6 py-4 text-white/80 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                        <Link 
                            href="/services" 
                            className="inline-flex items-center gap-2 text-[#D4AF37] font-bold hover:underline text-sm"
                        >
                            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                            <span>{t('pages.services.back')}</span>
                        </Link>
                    </div>
                </div>

                {/* JSON-LD structured data */}
                <ServiceSchema service={service} canonicalUrl={serviceUrl} />
                <FAQSchema faqs={service.faqs} />
                <BreadcrumbSchema items={[
                    { name: 'الرئيسية', url: '/' },
                    { name: 'الخدمات', url: '/services' },
                    { name: service.title },
                ]} />
            </article>
        </>
    );
}

ServiceShow.layout = (page) => <PublicLayout children={page} />;


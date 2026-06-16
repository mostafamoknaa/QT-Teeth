import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { ChevronRight, HeartPulse, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import ServiceSchema from '@/components/seo/ServiceSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function ServiceShow({ service, canonical_url }) {
    const { t } = useTranslations();
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

            <article className="py-12 md:py-20 px-6 lg:px-24">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-background/60 mb-8 max-w-4xl mx-auto">
                    <Link href="/" className="hover:text-primary transition-colors text-background/60">{t('nav.home')}</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" className="hover:text-primary transition-colors text-background/60">{t('pages.services.title')}</Link>
                    <ChevronRight size={14} />
                    <span className="text-background font-medium truncate">{service.title}</span>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 mb-16">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-background leading-tight">
                            {service.title}
                        </h1>
                    </div>

                    {/* Banner Image (Smaller centered aspect ratio) */}
                    {service.image ? (
                        <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-border/20 aspect-video">
                            <img 
                                src={`/storage/${service.image}`} 
                                alt={service.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-lg aspect-video bg-secondary/20 flex items-center justify-center border border-border/20">
                            <HeartPulse size={60} className="text-primary/30 animate-pulse" />
                        </div>
                    )}

                    {/* Description */}
                    {service.description && (
                        <p className="text-base text-background leading-relaxed font-medium border-r-4 border-primary pr-6 border-l-0">
                            {service.description}
                        </p>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-invert max-w-none text-background leading-relaxed text-justify whitespace-pre-line pt-4 border-t border-border/20">
                        {service.content}
                    </div>

                    {/* CTA Button after Content */}
                    <div className="flex justify-center pt-6">
                        <Link 
                            href={`/?service_id=${service.id}#booking`}
                            className="inline-flex bg-primary text-foreground hover:bg-primary/80 px-8 py-4 rounded-full font-black text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] items-center cursor-pointer"
                        >
                            احجز استشارتك الآن
                        </Link>
                    </div>

                    {/* Gallery Callout CTA */}
                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 shadow-sm">
                        <div className="flex items-center gap-4 text-right">
                            <div className="p-4 bg-primary/10 rounded-full text-primary shrink-0">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-background">نتائج حقيقية لحالاتنا</h3>
                                <p className="text-sm text-background/70 font-medium">شاهد صور قبل وبعد الحالات التي تم علاجها في عياداتنا لتبني ثقتك معنا.</p>
                            </div>
                        </div>
                        <Link 
                            href="/gallery" 
                            className="bg-primary text-foreground hover:bg-primary/80 px-6 py-3 rounded-full font-black text-sm transition-all shadow-md shrink-0"
                        >
                            تصفح معرض الصور
                        </Link>
                    </div>

                    {/* FAQs Accordion */}
                    {service.faqs && service.faqs.length > 0 && (
                        <div className="pt-12 border-t border-border/30">
                            <div className="space-y-2 mb-8">
                                <h2 className="text-xl md:text-2xl font-black text-background flex items-center gap-2">
                                    <HelpCircle className="text-primary w-6 h-6" />
                                    الأسئلة الشائعة حول {service.title}
                                </h2>
                                <p className="text-sm text-background/70 font-medium">
                                    لديك استفسارات؟ لقد جمعنا لك أهم الأسئلة والأجوبة المتعلقة بخدمة {service.title} لمساعدتك في اتخاذ القرار المناسب والتعرف على كافة تفاصيل الخدمة.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {service.faqs.map((faq, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div key={idx} className="border border-border/40 rounded-2xl overflow-hidden bg-secondary/15 hover:border-primary/40 transition-colors">
                                            <button 
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-right font-bold text-sm md:text-base text-background transition-colors hover:text-primary"
                                            >
                                                <span>{faq.question}</span>
                                                <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div 
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 border-t border-border/20' : 'max-h-0'}`}
                                            >
                                                <p className="px-6 py-5 text-background/80 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
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
                    <div className="pt-8 border-t border-border/30">
                        <Link 
                            href="/services" 
                            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                        >
                            ← {t('pages.services.back')}
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

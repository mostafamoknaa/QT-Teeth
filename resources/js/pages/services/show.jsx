import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { ChevronRight, HeartPulse } from 'lucide-react';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function ServiceShow({ service, canonical_url }) {
    const { t } = useTranslations();
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

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-background leading-tight">
                        {service.title}
                    </h1>

                    {/* Banner Image */}
                    {service.image ? (
                        <div className="rounded-3xl overflow-hidden shadow-lg">
                            <img 
                                src={`/storage/${service.image}`} 
                                alt={service.title} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ) : (
                        <div className="rounded-3xl overflow-hidden shadow-lg aspect-video bg-secondary/20 flex items-center justify-center">
                            <HeartPulse size={80} className="text-primary/30" />
                        </div>
                    )}

                    {/* Description */}
                    {service.description && (
                        <p className="text-xl text-background leading-relaxed font-medium border-r-4 border-primary pr-6 border-l-0">
                            {service.description}
                        </p>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-invert max-w-none text-background leading-relaxed text-justify whitespace-pre-line">
                        {service.content}
                    </div>

                    {/* Before & After Cases */}
                    {service.comparisons && service.comparisons.length > 0 && (
                        <div className="pt-12">
                            <h2 className="text-2xl md:text-3xl font-black mb-8 text-background">
                                {t('pages.services.before_after')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {service.comparisons.map(comp => (
                                        <div key={comp.id} className="rounded-2xl overflow-hidden border border-border/50 bg-secondary/30 shadow-sm hover:shadow-lg transition-all">
                                            <div className="grid grid-cols-2 aspect-video">
                                                <img src={`/storage/${comp.before_image}`} className="w-full h-full object-cover" alt="Before" />
                                                <img src={`/storage/${comp.after_image}`} className="w-full h-full object-cover" alt="After" />
                                            </div>
                                            {comp.title && (
                                                <div className="p-4 text-center">
                                                    <span className="font-bold text-background">{comp.title}</span>
                                                </div>
                                            )}
                                        </div>
                                ))}
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

                {/* JSON-LD structured data — moved here to avoid any potential sibling conflict with <Head> */}
                <ServiceSchema service={service} canonicalUrl={serviceUrl} />
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

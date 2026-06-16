import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { HeartPulse } from 'lucide-react';

export default function ServicesIndex({ services = [] }) {
    const { t } = useTranslations();
    const { canonical_url } = usePage().props;

    return (
        <>
            <Head>
                <title>خدماتنا | افضل دكتور زراعة اسنان وتجميل في الشيخ زايد والمنصورة</title>
                <meta name="description" content="اكتشف خدمات مركز بدر للأسنان: زراعة الأسنان الفورية، تجميل الأسنان، تقويم الأسنان، علاج الجذور، علاج أسنان الأطفال وتأهيل كامل للفك بأفضل الأسعار." />
                <meta name="keywords" content="افضل دكتور زراعة اسنان، تجميل الاسنان، تقويم الاسنان، علاج جذور، علاج اسنان الاطفال، زراعة فك كامل، عيادة اسنان بالمنصورة، عيادة اسنان بالشيخ زايد" />
                <link rel="canonical" href={canonical_url || "https://badrdentalcenter.com/services"} />
                <meta property="og:title" content="خدماتنا | افضل دكتور زراعة اسنان وتجميل في الشيخ زايد والمنصورة" />
                <meta property="og:description" content="اكتشف خدمات مركز بدر للأسنان: زراعة الأسنان الفورية، تجميل الأسنان، تقويم الأسنان، علاج الجذور، علاج أسنان الأطفال وتأهيل كامل للفك بأفضل الأسعار." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content="https://badrdentalcenter.com/services" />
                <meta name="twitter:title" content="خدماتنا | افضل دكتور زراعة اسنان وتجميل في الشيخ زايد والمنصورة" />
                <meta name="twitter:description" content="اكتشف خدمات مركز بدر للأسنان: زراعة الأسنان الفورية، تجميل الأسنان، تقويم الأسنان، علاج الجذور، علاج أسنان الأطفال وتأهيل كامل للفك." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>

            <section className="py-12 md:py-20 px-6 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-background">
                        {t('pages.services.title')}
                    </h1>
                    <p className="text-background/70 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                        {t('pages.services.subtitle')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Link 
                            key={service.id} 
                            href={`/services/${service.url_key || service.id}`}
                            className="group bg-secondary/30 rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-secondary/20 flex items-center justify-center">
                                {service.image ? (
                                    <img 
                                        src={`/storage/${service.image}`} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                    />
                                ) : (
                                    <HeartPulse size={48} className="text-primary/30" />
                                )}
                            </div>
                            <div className="p-6 space-y-3">
                                <h3 className="text-base md:text-lg font-bold leading-snug text-background group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-background/60 leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>



                {services.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">{t('pages.services.empty')}</p>
                    </div>
                )}
            </section>
        </>
    );
}

ServicesIndex.layout = (page) => <PublicLayout children={page} />;

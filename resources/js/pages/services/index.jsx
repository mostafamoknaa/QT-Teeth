import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { HeartPulse } from 'lucide-react';

export default function ServicesIndex({ services = [] }) {
    const { t } = useTranslations();

    return (
        <>
            <Head title={t('pages.services.title')} />

            <section className="py-12 md:py-20 px-6 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-background">
                        {t('pages.services.title')}
                    </h1>
                    <p className="text-background/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                        {t('pages.services.subtitle')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Link 
                            key={service.id} 
                            href={`/services/${service.id}`}
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
                                <h3 className="text-lg md:text-xl font-bold leading-snug text-background group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-background/60 leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Before & After Section */}
                {services.some(s => s.comparisons && s.comparisons.length > 0) && (
                    <div className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-background text-center mb-12">
                            {t('pages.services.before_after')}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {services.flatMap(s => (s.comparisons || []).map(comp => (
                                        <div key={comp.id} className="rounded-2xl overflow-hidden border border-border/50 bg-secondary/30 shadow-sm hover:shadow-lg transition-all group">
                                            <div className="grid grid-cols-2 aspect-square">
                                                <img src={`/storage/${comp.before_image}`} className="w-full h-full object-cover" alt="Before" />
                                                <img src={`/storage/${comp.after_image}`} className="w-full h-full object-cover" alt="After" />
                                            </div>
                                            {comp.title && (
                                                <div className="p-3 text-center">
                                                    <span className="text-xs font-bold text-background/60">{comp.title}</span>
                                                </div>
                                            )}
                                        </div>
                            )))}
                        </div>
                    </div>
                )}

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

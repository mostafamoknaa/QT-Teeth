import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Calendar, ArrowRight } from 'lucide-react';

export default function OffersIndex({ offers }) {
    const { t } = useTranslations();
    const data = offers.data || [];

    return (
        <>
            <Head title={t('pages.offers.title')} />

            <section className="py-12 md:py-20 px-6 lg:px-24 min-h-[60vh]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
                        {t('pages.offers.title')}
                    </h1>
                    <p className="text-foreground/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                        {t('pages.offers.subtitle')}
                    </p>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((offer) => (
                        <div 
                            key={offer.id} 
                            className="group bg-white rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                <img 
                                    src={offer.image ? `/storage/${offer.image}` : '/clinic-2.png'} 
                                    alt={offer.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="p-8 space-y-4">
                                <h3 className="text-xl md:text-2xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-base text-foreground/70 leading-relaxed line-clamp-4 whitespace-pre-line">
                                    {offer.content}
                                </p>
                                
                                <div className="pt-6">
                                    <Link 
                                        href={`/contact?offer=${offer.id}`}
                                        className="w-full bg-foreground text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    >
                                        {t('pages.offers.book_now')}
                                        <ArrowRight size={18} className="rtl:rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {data.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground bg-secondary/10 rounded-[40px]">
                        <p className="text-xl font-medium">{t('pages.offers.empty')}</p>
                    </div>
                )}

                {/* Pagination */}
                {offers.links && offers.links.length > 3 && (
                    <div className="flex justify-center mt-16 gap-2">
                        {offers.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-5 py-2.5 rounded-xl border transition-all ${
                                    link.active 
                                        ? 'bg-primary border-primary text-white font-bold' 
                                        : 'bg-white text-foreground hover:bg-secondary/50'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

OffersIndex.layout = (page) => <PublicLayout children={page} />;

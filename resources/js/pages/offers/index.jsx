import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Percent, Clock, Calendar } from 'lucide-react';
import { usePage } from '@inertiajs/react';

function CountdownBadge({ validUntil, locale }) {
    const diff = new Date(validUntil) - new Date();
    if (diff <= 0 || diff > 30 * 86400000) return null;
    const d = Math.floor(diff / 86400000);
    return (
        <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
            <Clock size={11} />
            {d > 0 ? `${locale === 'ar' ? 'ينتهي خلال' : 'Ends in'} ${d} ${locale === 'ar' ? 'يوم' : 'd'}` : (locale === 'ar' ? 'ينتهي اليوم!' : 'Ends today!')}
        </div>
    );
}

function OfferCard({ offer, locale, t }) {
    return (
        <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                    src={offer.image ? `/storage/${offer.image}` : '/clinic-2.png'}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {offer.discount_percentage && (
                    <div className="absolute top-4 start-4 bg-[#D4AF37] text-black font-black text-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                        <Percent size={13} />{offer.discount_percentage}
                    </div>
                )}
                {offer.badge_text && !offer.discount_percentage && (
                    <div className="absolute top-4 start-4 bg-[#1A1A1A] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">{offer.badge_text}</div>
                )}
                {offer.badge_text && offer.discount_percentage && (
                    <div className="absolute top-4 end-4 bg-[#1A1A1A] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">{offer.badge_text}</div>
                )}
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
                {offer.service && (
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{offer.service.title}</span>
                )}
                <h3 className="text-lg font-black leading-snug text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors line-clamp-2">{offer.title}</h3>
                {offer.content && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 whitespace-pre-line">{offer.content}</p>
                )}
                {(offer.original_price || offer.discounted_price) && (
                    <div className="flex items-center gap-3 py-1">
                        {offer.original_price && (
                            <span className="text-sm text-gray-400 line-through">{Number(offer.original_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                        )}
                        {offer.discounted_price && (
                            <span className="text-xl font-black text-[#D4AF37]">{Number(offer.discounted_price).toLocaleString()} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                        )}
                    </div>
                )}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    {offer.valid_until ? <CountdownBadge validUntil={offer.valid_until} locale={locale} /> : <span />}
                </div>
                <Link
                    href={`/contact?offer=${offer.id}`}
                    className="mt-2 w-full bg-[#1A1A1A] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                    {t('pages.offers.book_now')}
                    <ArrowLeft size={16} className="rtl:rotate-180" />
                </Link>
            </div>
        </div>
    );
}

export default function OffersIndex({ offers }) {
    const { t } = useTranslations();
    const { locale } = usePage().props;
    const data = offers.data || [];

    return (
        <>
            <Head title={t('pages.offers.title')} />
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#1A1A1A] py-20 px-6 lg:px-24">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[100px] rounded-full" />
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        <Percent size={12} />{locale === 'ar' ? 'عروض حصرية' : 'Exclusive Offers'}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                        {locale === 'ar' ? 'عروض مركز بدر' : 'Badr Dental Offers'}
                    </h1>
                    <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        {locale === 'ar' ? 'استفد من عروضنا المميزة على خدمات تجميل وزراعة وتقويم الأسنان. عروض محدودة لا تفوتها!' : 'Take advantage of our exclusive offers on dental services. Limited-time deals!'}
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 md:py-24 px-6 lg:px-24 min-h-[50vh] bg-[#FBFBFB]">
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map(offer => <OfferCard key={offer.id} offer={offer} locale={locale} t={t} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                            <Calendar size={32} className="text-[#D4AF37]" />
                        </div>
                        <h2 className="text-2xl font-black text-[#1A1A1A] mb-3">{t('pages.offers.empty')}</h2>
                        <Link href="/contact" className="mt-8 bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full font-black hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                            {locale === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                        </Link>
                    </div>
                )}
                {offers.links && offers.links.length > 3 && (
                    <div className="flex justify-center mt-16 gap-2">
                        {offers.links.map((link, i) => (
                            <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-5 py-2.5 rounded-xl border transition-all font-bold text-sm ${link.active ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'bg-white text-[#1A1A1A] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'} ${!link.url && 'opacity-40 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

OffersIndex.layout = (page) => <PublicLayout>{page}</PublicLayout>;

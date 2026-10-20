import React, { useEffect } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from "@/hooks/use-translations";
import { useForm, usePage, Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-messages';

export default function Contact({ services = [] }) {
    const { t } = useTranslations();
    const { locale, global_services, active_offers, flash } = usePage().props;
    const formServices = services && services.length > 0 ? services : global_services || [];
    const offers = active_offers || [];
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        service_id: '',
        offer: '',
        email: '',
        branch: '',
        message: '',
    });

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const offerId = urlParams.get('offer');
        if (offerId && offers.length > 0) {
            const selectedOffer = offers.find(o => o.id.toString() === offerId);
            if (selectedOffer) {
                setData('offer', selectedOffer.title);
            }
        }
    }, [offers]);

    // Open WhatsApp when server flashes a whatsapp_url after successful booking
    useEffect(() => {
        if (flash?.whatsapp_url) {
            window.open(flash.whatsapp_url, '_blank', 'noopener,noreferrer');
        }
    }, [flash?.whatsapp_url]);

    const ADMIN_WHATSAPP = '201060000841';

    const contactCards = [
        {
            isWhatsapp: true,
            title: t('booking.info.call_us'),
            detail: '01060000841',
            href: `https://wa.me/${ADMIN_WHATSAPP}`
        },
        {
            icon: "/mail.png",
            title: t('booking.info.send_email'),
            detail: t('booking.info.email_detail'),
            href: `mailto:${t('booking.info.email_detail')}`
        },
        {
            icon: "/clinic.png",
            title: t('booking.info.visit_us'),
            detail: t('booking.info.mansoura_zayed'),
            href: "#"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/appointments', {
            onSuccess: () => {
                reset();
                toast.success(
                    t('booking.success_message') || 'تم إرسال طلب الحجز بنجاح! سيتم فتح واتساب لإرسال تفاصيل الحجز.',
                    { duration: 6000 }
                );
            },
        });
    };

    return (
        <section className="py-16 px-4 lg:px-24">
            <Head>
                <title>احجز موعدك | مركز بدر لطب الأسنان</title>
                <meta name="description" content="احجز موعدك في مركز بدر لطب الأسنان الآن. زراعة أسنان، تجميل، تقويم وأكثر. فروع في المنصورة والشيخ زايد. متاح التقسيط." />
                <meta name="keywords" content="حجز موعد أسنان، اتصال مركز بدر، حجز زراعة أسنان، حجز تجميل أسنان، عيادة أسنان المنصورة، عيادة أسنان الشيخ زايد" />
                <meta property="og:title" content="احجز موعدك | مركز بدر لطب الأسنان" />
                <meta property="og:description" content="احجز موعدك الآن. فروع في المنصورة والشيخ زايد. متاح التقسيط." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content="https://badrdentalcenter.com/contact" />
                <meta name="twitter:title" content="احجز موعدك | مركز بدر لطب الأسنان" />
                <meta name="twitter:description" content="احجز موعدك الآن. فروع في المنصورة والشيخ زايد." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>
            <div className="text-center mb-20 space-y-4">
                <h1 className="text-2xl lg:text-4xl text-background font-black tracking-tighter">
                   {t('nav.contact')}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {contactCards.map((card, i) => (
                    <a
                        key={i}
                        href={card.href}
                        target={card.isWhatsapp ? '_blank' : undefined}
                        rel={card.isWhatsapp ? 'noopener noreferrer' : undefined}
                        className="group flex flex-col items-center gap-6 p-6 text-background bg-secondary/30 rounded-3xl border border-border/50 hover:bg-background hover:shadow-xl hover:text-foreground transition-all duration-500 text-center"
                    >
                        <div className={`p-6 rounded-2xl shadow-lg transition-colors ${
                            card.isWhatsapp
                                ? 'bg-[#25D366] group-hover:bg-[#1ebe5d]'
                                : 'bg-background'
                        }`}>
                            {card.isWhatsapp ? (
                                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            ) : (
                                <img src={card.icon} alt={card.title} className="w-10 h-10" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <h4 className={`text-lg font-bold ${
                                card.isWhatsapp ? 'text-[#25D366] group-hover:text-[#1ebe5d]' : ''
                            }`}>{card.title}</h4>
                            <p className="font-medium whitespace-pre-line text-base" dir="ltr">{card.detail}</p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Booking Form */}
            <div className="max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Name */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.name')}</label>
                        <input 
                            type="text" 
                            placeholder={t('booking.form.full_name_placeholder')} 
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all text-background" 
                        />
                        {errors.name && <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.name))}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.phone')}</label>
                        <input 
                            type="tel" 
                            placeholder="+20 123... / +966 5..." 
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all text-background" 
                            dir="ltr" 
                        />
                        {errors.phone ? (
                            <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.phone))}</p>
                        ) : (
                            <p className="text-xs text-background/60">{t('validation.phone.regex')}</p>
                        )}
                    </div>

                    {/* Service */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.service')}</label>
                        <select 
                            value={data.service_id}
                            onChange={e => setData('service_id', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background"
                        >
                            <option value="" className="text-foreground">{t('booking.form.service')}</option>
                            {formServices.map(service => (
                                <option key={service.id} value={service.id} className="text-foreground">{service.title}</option>
                            ))}
                        </select>
                        {errors.service_id && <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.service_id))}</p>}
                    </div>

                    {/* Offer */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('nav.offers')}</label>
                        <select 
                            value={data.offer}
                            onChange={e => setData('offer', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background"
                        >
                            <option value="" className="text-foreground">{t('nav.offers')}</option>
                            {offers.map(offer => (
                                <option key={offer.id} value={offer.title} className="text-foreground">{offer.title}</option>
                            ))}
                        </select>
                        {errors.offer && <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.offer))}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.email')}</label>
                        <input 
                            type="text" 
                            placeholder="you@example.com" 
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all text-background" 
                        />
                        {errors.email && <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.email))}</p>}
                    </div>

                    {/* Branch */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.branch')}</label>
                        <select 
                            value={data.branch}
                            onChange={e => setData('branch', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background"
                        >
                            <option value="" className="text-foreground">{t('booking.form.branch')}</option>
                            <option value="mansoura" className="text-foreground">{t('branches_page.mansoura.title')}</option>
                            <option value="sheikh_zayed" className="text-foreground">{t('branches_page.sheikh_zayed.title')}</option>
                        </select>
                        {errors.branch && <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.branch))}</p>}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.message')}</label>
                            <span className="text-xs text-background/60">{data.message?.length || 0} / 1000</span>
                        </div>
                        <textarea 
                            placeholder={t('booking.form.message_placeholder')} 
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium h-40 resize-none placeholder:text-background/50 transition-all text-background"
                        ></textarea>
                        {errors.message ? (
                            <p className="text-sm text-destructive font-medium">{t(getErrorMessage(errors.message))}</p>
                        ) : (
                            <p className="text-xs text-background/60">{t('validation.message.max')}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-3 flex flex-col items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full md:w-auto bg-gradient-to-r from-[#25D366] via-[#2ecc71] to-[#25D366] text-white rounded-2xl px-8 sm:px-20 lg:px-40 py-6 font-black text-base lg:text-lg hover:opacity-90 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {processing ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                            ) : (
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            )}
                            <span>{processing ? (t('booking.form.submitting') || 'Submitting...') : t('booking.form.submit_whatsapp')}</span>
                        </button>
                        <p className="text-background/50 text-sm text-center">
                            {locale === 'ar'
                                ? 'سيتم حفظ طلبك في لوحة التحكم وفتح واتساب لإرسال التفاصيل'
                                : 'Your request will be saved and WhatsApp will open to send details'}
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}

Contact.layout = (page) => <PublicLayout children={page} />;

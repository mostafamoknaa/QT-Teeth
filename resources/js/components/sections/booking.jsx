import React, { useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { MapPin, Mail, Phone, Loader2, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useForm, usePage, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-messages';

export default function BookingFormSection({ services = [], defaultServiceId = '' }) {
    const { t } = useTranslations();
    const { locale, global_services, flash } = usePage().props;
    const isRTL = locale === 'ar';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        service_id: defaultServiceId || '',
        offer: '',
        branch: '',
        message: ''
    });

    useEffect(() => {
        if (defaultServiceId) {
            setData('service_id', defaultServiceId);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const serviceId = urlParams.get('service_id');
            if (serviceId) {
                setData('service_id', serviceId);
            }
        }
    }, [defaultServiceId]);

    useEffect(() => {
        if (window.location.hash === '#booking') {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                setTimeout(() => {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    }, []);

    // Open WhatsApp when server flashes a whatsapp_url after successful booking
    useEffect(() => {
        if (flash?.whatsapp_url) {
            window.open(flash.whatsapp_url, '_blank', 'noopener,noreferrer');
        }
    }, [flash?.whatsapp_url]);

    const formServices = services && services.length > 0 ? services : global_services || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/appointments', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(
                    t('booking.form.success') || 'تم إرسال طلب الحجز بنجاح! سيتم فتح واتساب لإرسال تفاصيل الحجز.',
                    { duration: 6000 }
                );
            }
        });
    };

    const contactCards = [
        {
            icon: "/whatsapp.png",
            title: t('booking.info.call_us'),
            detail: "01060000841",
            href: "https://wa.me/201060000841"
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

    return (
        <section id="booking" className="py-20 md:py-28 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
            {/* Ambient Ambient Glow */}
            <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 reveal">
                <div className="eyebrow mx-auto justify-center">
                    {locale === 'ar' ? 'حجز موعد واستشارة' : 'BOOK AN APPOINTMENT'}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {t('booking.title')}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    {t('booking.subtitle')}
                </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 reveal">
                {contactCards.map((card, i) => {
                    const floatClass = i === 0
                        ? 'card-float-up-down'
                        : i === 1
                        ? 'card-float-down-up'
                        : 'card-float-sway';

                    return (
                        <div
                            key={i}
                            style={{ animationDelay: `${i * 0.4}s` }}
                            className={floatClass}
                        >
                            <a
                                href={card.href}
                                target={card.href?.startsWith('http') ? '_blank' : undefined}
                                rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="group flex flex-col items-center gap-5 p-7 text-white glass-dark rounded-[2rem] border border-white/10 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/25 hover:-translate-y-2 transition-all duration-500 text-center bg-black/50 h-full"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center p-3 group-hover:scale-110 group-hover:bg-[#D4AF37]/25 transition-all duration-300 shadow-lg">
                                    <img src={card.icon} alt={card.title} className="w-10 h-10 object-contain drop-shadow" />
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="text-base sm:text-lg font-extrabold group-hover:text-[#D4AF37] transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-white/70 font-medium text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                                        {card.detail}
                                    </p>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>

            {/* Booking Form Card */}
            <div className="max-w-5xl mx-auto glass-dark bg-black/60 rounded-[2.5rem] border border-white/10 p-6 sm:p-12 shadow-2xl reveal">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.name')} <span className="text-[#D4AF37]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t('booking.form.full_name_placeholder')}
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white placeholder:text-white/35 transition-all"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.name))}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.phone')} <span className="text-[#D4AF37]">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+20 123... / +966 5..."
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white placeholder:text-white/35 transition-all"
                                dir="ltr"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                            />
                            {errors.phone ? (
                                <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.phone))}</p>
                            ) : (
                                <p className="text-[11px] text-white/40">{t('validation.phone.regex')}</p>
                            )}
                        </div>

                        {/* Service */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.service')}
                            </label>
                            <select
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white appearance-none cursor-pointer transition-all"
                                value={data.service_id}
                                onChange={e => setData('service_id', e.target.value)}
                            >
                                <option value="" className="bg-[#1a1a1a] text-white/60">{t('booking.form.service')}</option>
                                {formServices.map(service => (
                                    <option key={service.id} value={service.id} className="bg-[#1a1a1a] text-white">
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                            {errors.service_id && <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.service_id))}</p>}
                        </div>

                        {/* Offer */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('nav.offers')}
                            </label>
                            <select
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white appearance-none cursor-pointer transition-all"
                                value={data.offer}
                                onChange={e => setData('offer', e.target.value)}
                            >
                                <option value="" className="bg-[#1a1a1a] text-white/60">{t('nav.offers')}</option>
                                {(usePage().props.active_offers || []).map(offer => (
                                    <option key={offer.id} value={offer.title} className="bg-[#1a1a1a] text-white">
                                        {offer.title}
                                    </option>
                                ))}
                            </select>
                            {errors.offer && <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.offer))}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.email')}
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white placeholder:text-white/35 transition-all"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.email))}</p>}
                        </div>

                        {/* Branch */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.branch')}
                            </label>
                            <select
                                className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white appearance-none cursor-pointer transition-all"
                                value={data.branch}
                                onChange={e => setData('branch', e.target.value)}
                            >
                                <option value="" className="bg-[#1a1a1a] text-white/60">{t('booking.form.branch')}</option>
                                <option value="المنصورة" className="bg-[#1a1a1a] text-white">{t('branches_page.mansoura.title')}</option>
                                <option value="الشيخ زايد" className="bg-[#1a1a1a] text-white">{t('branches_page.sheikh_zayed.title')}</option>
                            </select>
                            {errors.branch && <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.branch))}</p>}
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-white/90 uppercase tracking-wider block">
                                {t('booking.form.message')}
                            </label>
                            <span className="text-[11px] text-white/40">{data.message?.length || 0} / 1000</span>
                        </div>
                        <textarea
                            placeholder={t('booking.form.message_placeholder')}
                            className="w-full bg-white/5 border border-white/15 p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none font-medium text-sm text-white h-32 resize-none placeholder:text-white/35 transition-all"
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                        />
                        {errors.message ? (
                            <p className="text-xs text-red-400 font-medium">{t(getErrorMessage(errors.message))}</p>
                        ) : (
                            <p className="text-[11px] text-white/40">{t('validation.message.max')}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center gap-3 pt-4">
                        <button
                            disabled={processing}
                            type="submit"
                            className="btn-glow-gold w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-[#25D366] via-[#2ecc71] to-[#25D366] text-white rounded-2xl px-10 py-4 font-extrabold text-base shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-3 transition-all"
                        >
                            {processing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            )}
                            <span>{t('booking.form.submit_whatsapp')}</span>
                        </button>
                        <p className="text-white/40 text-xs text-center">
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


import React, { useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { MapPin, Mail, Phone, Loader2, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-messages';

export default function BookingFormSection({ services = [], defaultServiceId = '' }) {
    const { t } = useTranslations();
    const { locale, global_services } = usePage().props;
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

    const formServices = services && services.length > 0 ? services : global_services || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/appointments', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(t('booking.form.success') || 'Your appointment request has been sent successfully!');
            }
        });
    };

    const contactCards = [
        {
            icon: "/phone.png",
            title: t('booking.info.call_us'),
            detail: t('booking.info.phone_detail'),
            href: `tel:${t('booking.info.phone_detail')}`
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
                    <div className="flex justify-center pt-4">
                        <button
                            disabled={processing}
                            type="submit"
                            className="btn-glow-gold w-full sm:w-auto min-w-[280px] bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227] text-black rounded-2xl px-10 py-4 font-extrabold text-base shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2.5 transition-all"
                        >
                            {processing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4 rtl:rotate-180" />
                            )}
                            <span>{t('booking.form.submit_whatsapp')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}


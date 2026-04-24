import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { MapPin, Mail, Phone, Loader2 } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-messages';

export default function BookingFormSection({ services = [] }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        service_id: '',
        offer: '',
        branch: '',
        message: ''
    });
    const { global_services } = usePage().props;
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
        <section id="booking" className="py-24 px-4 lg:px-24">
            <div className="ps-12">
                <img src='/line.png' alt='Line' className="w-40 h-40" />
            </div>
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl text-background lg:text-6xl  font-black tracking-tighter">
                    {t('booking.title')}
                </h2>
                <p className="text-background font-medium text-lg">
                    {t('booking.subtitle')}
                </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {contactCards.map((card, i) => (
                    <span key={i} className="group flex flex-col items-center gap-6 p-10 text-background  bg-secondary/30 rounded-3xl border border-border/50 hover:bg-background hover:shadow-xl hover:text-foreground transition-all duration-500 text-center">
                        <div className="p-6 bg-background rounded-2xl shadow-lg transition-colors">
                            <img src={card.icon} alt={card.title} className="w-15 h-15" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold">{card.title}</h4>
                            <p className="font-medium whitespace-pre-line text-lg">{card.detail}</p>
                        </div>
                    </span>
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
                            className="w-full  border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all" 
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.name)}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.phone')}</label>
                        <input 
                            type="tel" 
                            placeholder="+20 123456789 or 01234567890" 
                            className="w-full border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all" 
                            dir="ltr" 
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}

                        />
                        {errors.phone ? (
                            <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.phone)}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Format: +20 123456789 or 01234567890</p>
                        )}
                    </div>

                    {/* Service */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.service')}</label>
                        <select className="w-full border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background" value={data.service_id} onChange={e => setData('service_id', e.target.value)}>
                            <option value="">{t('booking.form.service')}</option>
                            {formServices.map(service => (
                                <option key={service.id} value={service.id} className="text-foreground">{service.title}</option>
                            ))}
                        </select>
                        {errors.service_id && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.service_id)}</p>}
                    </div>

                    {/* Offer */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('nav.offers')}</label>
                        <select className="w-full border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background" value={data.offer} onChange={e => setData('offer', e.target.value)}>
                            <option value="">{t('nav.offers')}</option>
                            {(usePage().props.active_offers || []).map(offer => (
                                <option key={offer.id} value={offer.title} className="text-foreground">{offer.title}</option>
                            ))}
                        </select>
                        {errors.offer && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.offer)}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.email')}</label>
                        <input 
                            type="text" 
                            placeholder="you@example.com" 
                            className="w-full  border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-background/50 transition-all" 
                            value={data.email}
                            onChange={e => setData('email', e.target.value)} 
                        />
                        {errors.email && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.email)}</p>}
                    </div>

                    {/* Branch */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.branch')}</label>
                        <select className="w-full  border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer text-background" value={data.branch} onChange={e => setData('branch', e.target.value)}>
                            <option value="">{t('booking.form.branch')}</option>
                            <option value="المنصورة" className="text-foreground">{t('branches_page.mansoura.title')}</option>
                            <option value="الشيخ زايد" className="text-foreground">{t('branches_page.sheikh_zayed.title')}</option>
                        </select>
                        {errors.branch && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.branch)}</p>}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-black text-background uppercase tracking-widest">{t('booking.form.message')}</label>
                            <span className="text-xs text-background">{data.message?.length || 0} / 1000</span>
                        </div>
                        <textarea 
                            placeholder={t('booking.form.message_placeholder')} 
                            className="w-full  border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium h-40 resize-none placeholder:text-background/50 transition-all"
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                        ></textarea>
                        {errors.message ? (
                            <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.message)}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Max 1000 characters</p>
                        )}
                    </div>
                                    {/* Submit Button */}
                    <div className="md:col-span-3 flex justify-center mt-4">
                        <button disabled={processing} type="submit" className="w-full md:w-auto bg-foreground text-background rounded-2xl px-8 sm:px-20 lg:px-40 py-6 font-black text-lg lg:text-xl hover:bg-primary hover:text-foreground transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:-translate-y-0 flex items-center justify-center gap-2">
                            {processing && <Loader2 className="animate-spin" />}
                            {t('booking.form.submit_whatsapp')}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from "@/hooks/use-translations";
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-messages';

export default function Contact({ services = [] }) {
    const { t } = useTranslations();
    const { global_services } = usePage().props;
    const formServices = services && services.length > 0 ? services : global_services || [];
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        service_id: '',
        email: '',
        branch: '',
        message: '',
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/appointments', {
            onSuccess: () => {
                reset();
                toast.success(t('booking.success_message') || 'Booking request sent successfully!');
            },
        });
    };

    return (
        <section className="py-16 px-4 lg:px-24 bg-background">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl lg:text-6xl text-foreground font-black tracking-tighter">
                   {t('nav.contact')}
                </h2>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {contactCards.map((card, i) => (
                    <span key={i} className="group flex flex-col items-center gap-6 p-10 bg-secondary/30 rounded-3xl border border-border/50 hover:bg-background hover:shadow-xl transition-all duration-500 text-center">
                        <div className="p-6 bg-background rounded-2xl shadow-lg transition-colors">
                            <img src={card.icon} alt={card.title} className="w-15 h-15" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold">{card.title}</h4>
                            <p className="text-muted-foreground font-medium whitespace-pre-line text-lg">{card.detail}</p>
                        </div>
                    </span>
                ))}
            </div>

            {/* Booking Form */}
            <div className="max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Name */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.name')}</label>
                        <input 
                            type="text" 
                            placeholder={t('booking.form.full_name_placeholder')} 
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-muted-foreground/50 transition-all" 
                        />
                        {errors.name && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.name)}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.phone')}</label>
                        <input 
                            type="tel" 
                            placeholder="+20 123456789 or 01234567890" 
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-muted-foreground/50 transition-all" 
                            dir="ltr" 
                        />
                        {errors.phone ? (
                            <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.phone)}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Format: +20 123456789 or 01234567890</p>
                        )}
                    </div>

                    {/* Service */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.service')}</label>
                        <select 
                            value={data.service_id}
                            onChange={e => setData('service_id', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer"
                        >
                            <option value="">{t('booking.form.service')}</option>
                            {formServices.map(service => (
                                <option key={service.id} value={service.id}>{service.title}</option>
                            ))}
                        </select>
                        {errors.service_id && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.service_id)}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.email')}</label>
                        <input 
                            type="text" 
                            placeholder="you@example.com" 
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium placeholder:text-muted-foreground/50 transition-all" 
                        />
                        {errors.email && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.email)}</p>}
                    </div>

                    {/* Branch */}
                    <div className="space-y-3">
                        <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.branch')}</label>
                        <select 
                            value={data.branch}
                            onChange={e => setData('branch', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium appearance-none cursor-pointer"
                        >
                            <option value="">{t('booking.form.branch')}</option>
                            <option value="mansoura">{t('branches_page.mansoura.title')}</option>
                            <option value="sheikh_zayed">{t('branches_page.sheikh_zayed.title')}</option>
                        </select>
                        {errors.branch && <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.branch)}</p>}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-black text-foreground uppercase tracking-widest">{t('booking.form.message')}</label>
                            <span className="text-xs text-muted-foreground">{data.message?.length || 0} / 1000</span>
                        </div>
                        <textarea 
                            placeholder={t('booking.form.message_placeholder')} 
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                            className="w-full bg-secondary/20 border border-border/50 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium h-40 resize-none placeholder:text-muted-foreground/50 transition-all"
                        ></textarea>
                        {errors.message ? (
                            <p className="text-sm text-destructive font-medium">{getErrorMessage(errors.message)}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Max 1000 characters</p>
                        )}
                    </div>
                    
                </form>

                {/* Submit Button */}
                <div className="flex justify-center mt-12">
                    <button 
                        onClick={handleSubmit}
                        disabled={processing}
                        className="w-full md:w-auto bg-foreground text-background rounded-2xl px-8 sm:px-20 lg:px-40 py-6 font-black text-lg lg:text-xl hover:bg-primary hover:text-foreground transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? t('booking.form.submitting') || 'Submitting...' : t('booking.form.submit_whatsapp')}
                    </button>
                </div>
            </div>
        </section>
    );
}

Contact.layout = (page) => <PublicLayout children={page} />;

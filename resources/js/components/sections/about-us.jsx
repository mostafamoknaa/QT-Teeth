import React from 'react';
import { useTranslations } from '@/hooks/use-translations';

export default function AboutUsSection() {
    const { t } = useTranslations();

    const stats = [
        { value: '15,000+', label: t('about.stats.happy_clients') },
        { value: '30+', label: t('about.stats.consultants') },
        { value: '10', label: t('about.stats.experience_years') },
        { value: '2', label: t('about.stats.branches') },
    ];

    return (
        <section id="about" className="py-24 px-4 lg:px-24 bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 relative group">
                    <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-background transition-transform duration-700 group-hover:scale-[1.02]">
                         <img src="https://placehold.co/800x1000?text=Clinic+Modern+Interior" alt="Badr Clinic" className="w-full h-auto" />
                    </div>
                    {/* Decorative Background Box */}
                    <div className="absolute -top-10 -right-10 w-full h-full bg-secondary rounded-[40px] -z-0 opacity-50"></div>
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                    <div className="space-y-4">
                        <div className="w-16 h-1.5 bg-foreground mb-6"></div>
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tighter">
                            {t('about.title')}
                        </h2>
                        <h3 className="text-xl text-foreground/60 font-medium">
                            Badr Dental Center
                        </h3>
                    </div>

                    <p className="text-muted-foreground text-base leading-[1.8] text-justify font-medium">
                        {t('about.description')}
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-secondary/30 rounded-3xl hover:bg-primary/10 transition-colors group">
                                <p className="text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                                    {stat.value}
                                </p>
                                <p className="text-[12px] text-muted-foreground mt-3 font-bold uppercase tracking-widest leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

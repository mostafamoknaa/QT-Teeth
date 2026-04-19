import React from 'react';
import { useTranslations } from '@/hooks/use-translations';

export default function DoctorAhmedBadrSection() {
    const { t } = useTranslations();

    return (
        <section id="doctors" className="py-12 md:py-20 px-6 lg:px-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl">
                <div className="w-full">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4 max-w-4xl">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold tracking-tighter leading-snug">
                                {t('hero.description')}
                            </h2>
                        </div>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
                            {t('hero.profile_1')}
                        </p>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
                            {t('hero.profile_2')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

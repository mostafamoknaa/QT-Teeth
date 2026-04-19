import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';

export default function DoctorsIndex({ doctors = [] }) {
    const { t } = useTranslations();

    return (
        <>
            <Head title={t('pages.doctors.title')} />

            <section className="py-12 md:py-20 px-6 lg:px-24 bg-background">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl  tracking-tighter text-foreground">
                        {t('pages.doctors.title')}
                    </h1>
                    <p className="text-muted-foreground  text-lg md:text-xl mt-8 max-w-2xl mx-auto">
                        {t('pages.doctors.subtitle')}
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <div 
                            key={doctor.id} 
                            className="bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center"
                        >
                            <div className="pt-10 pb-6 flex justify-center">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-secondary/20 shadow-inner">
                                    <img 
                                        src={doctor.image ? `/storage/${doctor.image}` : 'https://placehold.co/480x480?text=doctor'} 
                                        alt={doctor.name} 
                                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110" 
                                    />
                                </div>
                            </div>
                            <div className="px-6 pb-10 space-y-4 text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                    {doctor.name}
                                </h3>
                                <div className="border-b border-muted-foreground/50"></div>
                                <div className="space-y-2">
                                    {doctor.specialty && (
                                        <p className="text-base text-muted-foreground font-bold">
                                            {doctor.specialty}
                                        </p>
                                    )}
                                    {doctor.university && (
                                        <p className="text-sm text-muted-foreground/70">
                                            {doctor.university}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {doctors.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">{t('pages.doctors.empty')}</p>
                    </div>
                )}
            </section>
        </>
    );
}

DoctorsIndex.layout = (page) => <PublicLayout children={page} />;

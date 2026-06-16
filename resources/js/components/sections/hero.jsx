import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
export default function HeroSection() {
    const { t } = useTranslations();

    return (
        <section className="relative h-[550px] lg:h-[750px] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img 
                    src="/hero.png" 
                    alt="Dental Hero" 
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 via-foreground/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-end px-4 lg:px-24">
                <div className="max-w-2xl">
                    <h1 className="text-3xl lg:text-[45px] font-black mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl text-foreground">
                        {t('hero.title')}
                    </h1>
                </div>
            </div>

            {/* Organic Organic Wave Decorative Bottom */}
            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
                <img 
                    src="/hero.svg" 
                    alt="Wave Divider" 
                    className="w-full h-auto min-h-[60px] lg:min-h-[100px] object-fill"
                />
            </div>
        </section>
    );
}

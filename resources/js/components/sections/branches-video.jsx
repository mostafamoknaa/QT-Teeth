import React from 'react';
import { usePage } from '@inertiajs/react';
import { MapPin, Phone, Navigation, Sparkles, Building2 } from 'lucide-react';

export default function BranchesVideoSection() {
    const { locale } = usePage().props;
    const isRTL = locale === 'ar';

    const branchesList = [
        {
            name_ar: 'فرع المنصورة',
            name_en: 'Mansoura Branch',
            address_ar: 'حي الجامعة، أمام بوابة توشكى، المنصورة',
            address_en: 'University District, in front of Toshka Gate, Mansoura',
            phone: '01060000805',
            phoneDisplay: '+20 106 0000 805',
            mapUrl: 'https://maps.app.goo.gl/HzMFLXHveNFaMsi37',
        },
        {
            name_ar: 'فرع الشيخ زايد',
            name_en: 'Sheikh Zayed Branch',
            address_ar: 'الشيخ زايد، وصلة دهشور، الجيزة',
            address_en: 'Sheikh Zayed, Dahshur Link, Giza / Greater Cairo',
            phone: '01030000728',
            phoneDisplay: '+20 103 0000 728',
            mapUrl: 'https://maps.app.goo.gl/hnnERt4HpXiUg87z5',
        },
    ];

    return (
        <section id="branches-locations" className="py-16 md:py-24 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-[#09090b]">
            {/* Ambient Background Gold Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/8 blur-[160px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 reveal">
                <div className="eyebrow mx-auto justify-center">
                    {isRTL ? 'فروع مركز بدر لطب الأسنان' : 'OUR CLINIC LOCATIONS'}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
                    Branches and Locations
                </h2>
                <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    {isRTL 
                        ? 'شاهد جولة مصورة داخل أحدث فروع وتجهيزات مركز بدر لطب الأسنان بالمنصورة والشيخ زايد.'
                        : 'Explore our state-of-the-art clinic facilities and branches in Mansoura and Sheikh Zayed.'}
                </p>
            </div>

            {/* Main Video iFrame Container */}
            <div className="max-w-5xl mx-auto reveal mb-10">
                <div className="relative aspect-video w-full rounded-[2rem] sm:rounded-[2.6rem] overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.2)] bg-black group">
                    <iframe
                        className="w-full h-full border-0"
                        src="https://www.youtube.com/embed/ADSE4mnt1TI?rel=0&modestbranding=1"
                        title="Branches and Locations - Badr Dental Center"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* Branch Contact Quick Cards */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 reveal">
                {branchesList.map((branch, idx) => (
                    <div
                        key={idx}
                        className="glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-400 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.2)] flex flex-col justify-between group"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-black text-white">
                                        {isRTL ? branch.name_ar : branch.name_en}
                                    </h3>
                                </div>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            </div>

                            <p className="text-xs sm:text-sm text-white/70 flex items-start gap-2 leading-relaxed">
                                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                <span>{isRTL ? branch.address_ar : branch.address_en}</span>
                            </p>
                        </div>

                        <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                            <a
                                href={`tel:${branch.phone}`}
                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#D4AF37] transition-colors"
                            >
                                <Phone className="w-4 h-4 text-[#D4AF37]" />
                                <span dir="ltr">{branch.phoneDisplay}</span>
                            </a>

                            <a
                                href={branch.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-extrabold text-xs transition-all duration-300 border border-[#D4AF37]/40 shadow-sm"
                            >
                                <Navigation className="w-3.5 h-3.5" />
                                <span>{isRTL ? 'الاتجاهات بالخريطة' : 'Get Directions'}</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

import React from 'react';
import { usePage } from '@inertiajs/react';

export default function FloatingWhatsApp() {
    const { props } = usePage();
    const phone = '01060000841';
    const whatsappUrl = `https://wa.me/201060000841`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[110] group cursor-pointer whatsapp-floating-widget"
            aria-label="Chat with us on WhatsApp"
        >
            <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
                {/* Ambient Deep Green Glow Behind the Pill */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-60 group-hover:opacity-95 transition-opacity" />

                {/* The Pill Widget Container with White Outline & Deep Shadow */}
                <div className="relative flex items-center shadow-[0_12px_40px_rgba(37,211,102,0.65),0_6px_20px_rgba(0,0,0,0.6)] rounded-[22px] overflow-hidden border border-white/50 bg-[#0d3b1e]/90">
                    <img
                        src="/whatsapp-pill.png"
                        alt="WhatsApp"
                        className="h-11 sm:h-12 w-auto object-contain block drop-shadow-md"
                    />
                    {/* The WhatsApp Phone Number rendered on the green pill bar */}
                    <span
                        className="absolute left-[52px] sm:left-[58px] right-3 sm:right-4 text-white font-black text-xs sm:text-sm tracking-wider font-mono select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center"
                        dir="ltr"
                    >
                        {phone}
                    </span>
                </div>
            </div>
        </a>
    );
}

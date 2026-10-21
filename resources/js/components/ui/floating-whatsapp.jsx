import React from 'react';

export default function FloatingWhatsApp() {
    const phone = '01060000841';
    const whatsappUrl = `https://wa.me/201060000841`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[110] group cursor-pointer whatsapp-floating-widget select-none"
            aria-label="Chat with us on WhatsApp"
        >
            <div className="relative flex items-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
                {/* The Floating WhatsApp Pill without any box or outer container background */}
                <img
                    src="/whatsapp-pill.png"
                    alt="WhatsApp"
                    className="h-11 sm:h-12 w-auto object-contain block drop-shadow-[0_12px_28px_rgba(37,211,102,0.75)]"
                />
                {/* WhatsApp Phone Number on the green bar */}
                <span
                    className="absolute left-[50px] sm:left-[56px] right-3 sm:right-4 text-white font-black text-xs sm:text-sm tracking-wider font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center"
                    dir="ltr"
                >
                    {phone}
                </span>
            </div>
        </a>
    );
}

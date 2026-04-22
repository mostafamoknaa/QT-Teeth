import React from 'react';
import { useTranslations } from '@/hooks/use-translations';

export default function BeforeAfterSection() {
    const { t } = useTranslations();

    const cases = [
        { id: 1, title: "تجميل الأسنان الأمامية", category: "Cosmetics" },
        { id: 2, title: "زراعة فك كامل", category: "Implants" },
        { id: 3, title: "تقويم الأسنان الشفاف", category: "Orthodontics" },
        { id: 4, title: "علاج اللثة وتجميلها", category: "Perio" },
        { id: 5, title: "ابتسامة هوليوود", category: "Veneers" },
        { id: 6, title: "تبييض الأسنان الاحترافي", category: "Whitening" },
        { id: 7, title: "ترميم الأسنان المكسورة", category: "Restoration" },
        { id: 8, title: "زراعة الأسنان الفورية", category: "Implants" },
        { id: 9, title: "تعديل اصطفاف الفك", category: "Orthodontics" },
    ];

    return (
        <section id="cases" className="py-24 px-4 lg:px-24">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-background">
                    {t('before_after.title')}
                </h2>
                <div className="w-16 h-1.5 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cases.map((item) => (
                    <div key={item.id} className="group relative rounded-[40px] overflow-hidden bg-secondary/30 shadow-xl border border-border/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-80 flex overflow-hidden">
                            {/* Before */}
                            <div className="relative w-1/2 h-full border-l border-background/20 overflow-hidden">
                                 <img src={`https://placehold.co/400x600?text=Before+${item.id}`} alt="Before" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                <span className="absolute top-4 right-4 bg-foreground/30 backdrop-blur-md text-background px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    قبل
                                </span>
                            </div>
                            {/* After */}
                            <div className="relative w-1/2 h-full overflow-hidden">
                                 <img src={`https://placehold.co/400x600?text=After+${item.id}`} alt="After" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                <span className="absolute top-4 left-4 bg-primary text-foreground px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                    بعد
                                </span>
                            </div>
                        </div>
                        <div className="p-8 text-center bg-transparent group-hover:bg-primary transition-colors duration-500">
                            <h4 className="text-xl font-bold text-background group-hover:text-foreground transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-background/60 group-hover:text-foreground/60 transition-colors mt-2 uppercase font-black tracking-[0.2em]">
                                {item.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

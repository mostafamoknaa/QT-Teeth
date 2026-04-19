import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { PlusCircle } from 'lucide-react';

export default function ServiceCardsSection() {
    const { t } = useTranslations();

    const services = [
        { 
            title: t('services.items.implants'), 
            desc: "تعويض الأسنان المفقودة بأحدث التقنيات وأفضل الخامات العالمية لضمان الديمومة.",
            img: "https://placehold.co/600x400?text=Dental+Implants" 
        },
        { 
            title: t('services.items.cosmetics'), 
            desc: "تصميم ابتسامة مثالية تناسب ملامح وجهك باستخدام أجود أنواع القشور التجميلية.",
            img: "https://placehold.co/600x400?text=Smile+Design" 
        },
        { 
            title: t('services.items.maxillofacial'), 
            desc: "جراحات الوجه والفكين المتطورة لعلاج كافة المشاكل الوظيفية والجمالية.",
            img: "https://placehold.co/600x400?text=Maxillofacial" 
        },
        { 
            title: t('services.items.pediatrics'), 
            desc: "رعاية خاصة لأسنان الأطفال في بيئة مريحة تجعل زيارة طبيب الأسنان ممتعة.",
            img: "https://placehold.co/600x400?text=Pediatrics" 
        },
        { 
            title: t('services.items.endodontics'), 
            desc: "علاج جذور وأعصاب الأسنان بأحدث أجهزة الروتاري لضمان دقة ونجاح العلاج.",
            img: "https://placehold.co/600x400?text=Endodontics" 
        },
        { 
            title: t('services.items.orthodontics'), 
            desc: "تعديل واصطفاف الأسنان باستخدام التقويم الشفاف أو التقليدي لابتسامة مثالية.",
            img: "https://placehold.co/600x400?text=Orthodontics" 
        },
    ];

    return (
        <section id="services" className="py-24 px-4 lg:px-24 bg-background">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter">
                    {t('services.title')}
                </h2>
                <div className="w-16 h-1.5 bg-primary mx-auto"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-lg leading-relaxed pt-2">
                    نحن متخصصون في جميع أنواع جراحات وتجميل الأسنان بأحدث التقنيات الطبية العالمية لضمان فخامة التجربة والنتائج المثالية.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="group bg-background rounded-[48px] overflow-hidden border border-border transition-all duration-500 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2 flex flex-col"
                    >
                        
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 border border-border/50 shadow-xl group-hover:shadow-shadow-foreground/10 transition-all duration-500">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Decorative overlap from image */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <h3 className="text-xl font-bold text-center text-foreground group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>
                        </div>
                    </div>
                ))}
                
            </div>
        </section>
    );
}

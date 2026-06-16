import PublicLayout from '@/layouts/public-layout';
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function Branches() {
    const { t } = useTranslations();
    const { canonical_url } = usePage().props;

    const branches = [
        {
            name: t('branches_page.mansoura.title'),
            address: t('branches_page.mansoura.address'),
            phone: t('branches_page.mansoura.phone'),
            map: t('branches_page.mansoura_map'),
        },
        {
            name: t('branches_page.sheikh_zayed.title'),
            address: t('branches_page.sheikh_zayed.address'),
            phone: t('branches_page.sheikh_zayed.phone'),
            map: t('branches_page.sheikh_zayed_map'),
        }
    ];

    return (
        <section className="bg-transparent">
            <Head>
                <title>فروع مركز بدر لطب الأسنان | عيادة اسنان بالشيخ زايد والمنصورة</title>
                <meta name="description" content="تواصل مع فروع مركز بدر لطب وزراعة الأسنان. فرع المنصورة وفرع الشيخ زايد. احجز موعدك الآن مع اشطر دكتور اسنان لخدمات الزراعة الفورية والتجميل." />
                <meta name="keywords" content="عيادة اسنان بالشيخ زايد والمنصورة، اشطر دكتور اسنان، فروع مركز بدر للأسنان، مركز بدر المنصورة، مركز بدر الشيخ زايد، زراعة اسنان المنصورة، زراعة اسنان الشيخ زايد" />
                <link rel="canonical" href={canonical_url || "https://badrdentalcenter.com/branches"} />
                <meta property="og:title" content="فروع مركز بدر لطب الأسنان | عيادة اسنان بالشيخ زايد والمنصورة" />
                <meta property="og:description" content="تواصل مع فروع مركز بدر لطب وزراعة الأسنان. فرع المنصورة وفرع الشيخ زايد. احجز موعدك الآن مع اشطر دكتور اسنان لخدمات الزراعة الفورية والتجميل." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content="https://badrdentalcenter.com/branches" />
                <meta name="twitter:title" content="فروع مركز بدر لطب الأسنان | عيادة اسنان بالشيخ زايد والمنصورة" />
                <meta name="twitter:description" content="تواصل مع فروع مركز بدر لطب وزراعة الأسنان. فرع المنصورة وفرع الشيخ زايد." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>

            {/* Page Header Area */}
            <div className="py-16 md:py-24 px-6 lg:px-24 text-center">
                 <h1 className="text-background text-2xl md:text-3xl lg:text-4xl tracking-tighter">
                    {t('branches_page.title')}
                </h1>
            </div>

            {/* Main Content */}
            <div className="px-6 lg:px-24 pb-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Right: Info */}
                    <div className="flex flex-col gap-10">
                        <div className="space-y-6">
                            <div className='border border-t-4 border-background w-20'></div>
                            <h3 className="text-xl md:text-2xl text-background font-black tracking-tighter">
                                {t('branches_page.main_title')}
                            </h3>
                            <p className="text-background/70 text-base leading-relaxed">
                                {t('branches_page.main_subtitle')}
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {branches.map((branch, index) => (
                                <div key={index} className="bg-secondary/30 p-8 rounded-[2.5rem] border border-border/50 flex flex-col sm:flex-row items-start gap-6 hover:bg-secondary/60 transition-all duration-300 group/item">
                                    <div className="bg-background/10 p-4 rounded-2xl text-background group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="flex flex-col gap-3 flex-1">
                                        <h4 className="text-lg md:text-xl font-bold text-background">{branch.name}</h4>
                                        <p className="text-background/60 text-base leading-relaxed max-w-md">{branch.address}</p>
                                        <div className="flex flex-wrap items-center justify-start gap-6 mt-2">
                                            <div className="flex items-center gap-2 text-background font-bold text-base">
                                                <Phone size={18} className="text-background" />
                                                <span dir="ltr">{branch.phone}</span>
                                            </div>
                                            <a 
                                                href={branch.map} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-bold text-base group/link"
                                            >
                                                <span>{t('branches_page.open_map')}</span>
                                                
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link 
                                href="/contact"
                                className="inline-flex bg-foreground text-background px-8 py-3 rounded-full font-black text-base items-center gap-3 hover:bg-foreground hover:text-primary transition-all duration-500 shadow-xl shadow-black/10 group active:scale-95"
                            >
                                <Calendar size={22} className="group-hover:rotate-12 transition-transform" />
                                {t('branches_page.book_now_btn')}
                            </Link>
                        </div>
                    </div>
                    {/* Left: Map Image */}
                    <div className="rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-white group">
                        <img 
                            src="/branches.png" 
                            alt="Our Branches Map" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

Branches.layout = (page) => <PublicLayout children={page} />;

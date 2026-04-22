import PublicLayout from '@/layouts/public-layout';
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function Branches() {
    const { t } = useTranslations();

    const branches = [
        {
            name: t('branches_page.mansoura.title'),
            address: t('branches_page.mansoura.address'),
            phone: t('branches_page.mansoura.phone'),
        },
        {
            name: t('branches_page.sheikh_zayed.title'),
            address: t('branches_page.sheikh_zayed.address'),
            phone: t('branches_page.sheikh_zayed.phone'),
        }
    ];

    return (
        <section className="bg-transparent">
            <Head title={t('branches_page.title')} />

            {/* Page Header Area */}
            <div className="py-16 md:py-24 px-6 lg:px-24 text-center">
                 <h3 className="text-background text-4xl md:text-5xl lg:text-6xl tracking-tighter">
                    {t('branches_page.title')}
                </h3>
            </div>

            {/* Main Content */}
            <div className="px-6 lg:px-24 pb-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Right: Info */}
                    <div className="flex flex-col gap-10">
                        <div className="space-y-6">
                            <div className='border border-t-4 border-background w-20'></div>
                            <h3 className="text-3xl md:text-4xl text-background font-black tracking-tighter">
                                {t('branches_page.main_title')}
                            </h3>
                            <p className="text-background/70 text-xl leading-relaxed">
                                {t('branches_page.main_subtitle')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {branches.map((branch, index) => (
                                <div key={index} className="bg-secondary/30 p-8 rounded-[2.5rem] border border-border/50 flex items-start gap-6 hover:bg-secondary/60 transition-colors">
                                    <div className="bg-background/10 p-4 rounded-2xl text-background">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-xl md:text-2xl font-bold text-background">{branch.name}</h4>
                                        <p className="text-background/60 text-lg leading-relaxed">{branch.address}</p>
                                        <div className="flex items-center justify-start gap-2 text-background font-bold text-lg mt-1">
                                            <Phone size={18} className="text-background rotate-[90]" />
                                            <span>{branch.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link 
                                href="/contact"
                                className="inline-flex bg-foreground text-background px-10 py-4 rounded-full font-black text-lg items-center gap-3 hover:bg-foreground hover:text-primary transition-all duration-500 shadow-xl shadow-black/10 group active:scale-95"
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

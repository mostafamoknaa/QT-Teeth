import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from "@/hooks/use-translations";

export default function About() {

    const { t } = useTranslations();

    const stats = [
        { value: '15,000+', label: t('about.stats.happy_clients') },
        { value: '30+', label: t('about.stats.consultants') },
        { value: '10', label: t('about.stats.experience_years') },
        { value: '2', label: t('about.stats.branches') }
    ];

    return (
        <>
            {/* About Us Section */}
            <section id="about" className="py-12 md:py-20 px-6 lg:px-24 bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className='border border-t-4 border-foreground w-30'></div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                               {t('about.title')}
                            </h2>
                            <h3 className="text-xl md:text-2xl lg:text-3xl text-foreground/70 font-bold">
                                Badr Dental Center
                            </h3>
                        </div>

                        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed text-justify">
                            {t('about.description1')}
                        </p>

                        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed text-justify font-medium">
                           {t('about.description2')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-secondary/30 rounded-3xl hover:bg-primary/10 transition-colors group">
                                    <p className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors">
                                        {stat.value}
                                    </p>
                                    <p className=" text-muted-foreground mt-3 font-bold uppercase tracking-widest leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Image */}
                    <div className="group">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-background h-[300px] md:h-[400px] lg:h-[500px]">
                            <img 
                                src="/clinic-2.png" 
                                alt="Badr Dental Clinic" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                        </div> 
                    </div>
                </div>
            </section>

            {/* Dr. Badr Section */}
            <section className="bg-secondary py-12 md:py-24 px-6 lg:px-24 mx-4 md:mx-12 lg:mx-22 my-8 rounded-[3rem] lg:rounded-[5rem]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Doctor Image */}
                    <div className="relative group overflow-hidden rounded-[40px]">
                        <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl flex items-end justify-center bg-background/50 relative">
                            <img 
                                src="/dr-ahmed.jpg" 
                                alt="د. بدر" 
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                            />
                            {/* Name Badge */}
                            <div className="absolute bottom-6 bg-foreground text-background px-8 md:px-15 py-3 rounded-2xl text-center text-lg md:text-xl font-bold z-10 mx-4">
                              {t('about.dr_badr.name')}
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="space-y-8">
                        <div className='border border-t-4 border-foreground w-24'></div>
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-bold tracking-tighter">
                              {t('about.dr_badr.short_name')}
                            </h2>
                            <p className="text-lg md:text-xl text-foreground/60 font-medium">
                              {t('about.dr_badr.description')}
                            </p>
                        </div>

                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-justify">
                           {t('about.dr_badr.description2')}
                        </p>

                        {/* University info */}
                        <div className="flex items-center bg-background p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:shadow-lg gap-4">
                            <div className="p-4 bg-secondary rounded-2xl">
                                <img src="/experience.png" alt="University" className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="text-foreground tracking-tight font-black">{t('about.dr_badr.quals.masters')}</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-background p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:shadow-lg gap-4">
                            <div className="p-4 bg-secondary rounded-2xl">
                                <img src="/certificate.png" alt="University" className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="text-foreground tracking-tight font-black">{t('about.dr_badr.quals.member')}</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-background p-6 border border-border/50 rounded-3xl transition-all duration-300 hover:shadow-lg gap-4">
                            <div className="p-4 bg-secondary rounded-2xl">
                                <img src="/clock.png" alt="University" className="w-10 h-10" />
                            </div>
                            <div>
                                <p className="text-foreground tracking-tight font-black">{t('about.dr_badr.quals.experience')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

About.layout = (page) => <PublicLayout children={page} />;

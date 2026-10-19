import PublicLayout from '@/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from "@/hooks/use-translations";

export default function About() {
    const { t } = useTranslations();
    const { locale, canonical_url } = usePage().props;
    const isAr = locale === 'ar';
    const pageUrl = canonical_url || "https://badrdentalcenter.com/about";

    const title = isAr
        ? "عن مركز بدر لطب الأسنان | أفضل أطباء واستشاريي زراعة وتجميل الأسنان"
        : "About Badr Dental Center | Leading Dental Consultants in Egypt";

    const desc = isAr
        ? "تعرف على مركز بدر لطب الأسنان ونخبة من 30 استشاري في زراعة وتجميل وتقويم الأسنان بالمنصورة والشيخ زايد. أحدث تقنيات طب الأسنان الرقمي منذ 2014."
        : "Learn about Badr Dental Center, home to 30+ leading dental consultants in dental implants, Hollywood veneers, and orthodontics across Mansoura and Sheikh Zayed since 2014.";

    const keywords = isAr
        ? "عن مركز بدر، افضل دكتور زراعة اسنان، مركز بدر لطب الأسنان، عيادة اسنان بالمنصورة، عيادة اسنان بالشيخ زايد، دكتور احمد بدر"
        : "about badr dental center, leading dentists egypt, dental implants consultants, sheikh zayed clinic, mansoura dental clinic";

    const stats = [
        { value: '15,000+', label: t('about.stats.happy_clients') },
        { value: '30+', label: t('about.stats.consultants') },
        { value: '10', label: t('about.stats.experience_years') },
        { value: '2', label: t('about.stats.branches') }
    ];

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content={pageUrl} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>
            {/* About Us Section */}
            <section id="about" className="py-12 md:py-20 px-6 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className='border border-t-4 border-background w-30'></div>
                            <h1 className="text-2xl text-background md:text-3xl lg:text-4xl tracking-tighter">
                               {t('about.title')}
                            </h1>
                            <h2 className="text-lg text-background md:text-xl lg:text-2xl font-bold">
                                Badr Dental Center
                            </h2>
                        </div>

                        <p className="text-background text-sm md:text-base lg:text-lg leading-relaxed text-justify">
                            {t('about.description1')}
                        </p>

                        <p className="text-background text-sm md:text-base lg:text-lg leading-relaxed text-justify font-medium">
                           {t('about.description2')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-secondary rounded-3xl">
                                    <p className="text-xl md:text-2xl font-black text-foreground">
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
                                src="/dr-ahmed.webp" 
                                alt="د. بدر" 
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Name Badge */}
                            <div className="absolute bottom-6 bg-foreground text-background px-8 md:px-15 py-3 rounded-2xl text-center text-base md:text-lg font-bold z-10 mx-4">
                              {t('about.dr_badr.name')}
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="space-y-8">
                        <div className='border border-t-4 border-foreground w-24'></div>
                        <div className="space-y-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground font-bold tracking-tighter">
                              {t('about.dr_badr.short_name')}
                            </h2>
                            <p className="text-sm md:text-base text-foreground/60 font-medium">
                              {t('about.dr_badr.description')}
                            </p>
                        </div>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
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

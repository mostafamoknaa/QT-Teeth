import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from "@/hooks/use-translations";
import {Link} from '@inertiajs/react';

export default function EgyptPage() {
    const { t } = useTranslations();

    const heroImage = "https://image.qwenlm.ai/public_source/3fa2650f-4769-4e39-97f8-b5982d5a0c23/14cb91fcd-d16b-4662-998a-b28c17d8cdf1.png";
    const whyImage = "/egypt.jpg";

    const features = [
        { icon: '/user.png', title: t('egypt_page.features.title1'), desc: t('egypt_page.features.desc1') },
        { icon: '/point2.png', title: t('egypt_page.features.title2'), desc: t('egypt_page.features.desc2') },
        { icon: '/location.png', title: t('egypt_page.features.title3'), desc: t('egypt_page.features.desc3') },
        { icon: '/star.png', title: t('egypt_page.features.title4'), desc: t('egypt_page.features.desc4') },
        { icon: '/point.png', title: t('egypt_page.features.title5'), desc: t('egypt_page.features.desc5') },
    ];

    const branches = [
        {
            name: t('egypt_page.branches.b1_name'),
            address: t('egypt_page.branches.b1_address'),
            location: t('egypt_page.branches.b1_location'),
            details: [
                t('egypt_page.branches.b1_d1'),
                t('egypt_page.branches.b1_d2'),
                t('egypt_page.branches.b1_d3'),
                t('egypt_page.branches.b1_d4'),
            ],
            phone: "01060000805",
            mapLink: "/location.png",
        },
        {
            name: t('egypt_page.branches.b2_name'),
            address: t('egypt_page.branches.b2_address'),
            location: t('egypt_page.branches.b2_location'),
            details: [
                t('egypt_page.branches.b2_d1'),
                t('egypt_page.branches.b2_d2'),
                t('egypt_page.branches.b2_d3'),
                t('egypt_page.branches.b2_d4'),
            ],
            phone: "01030000728",
            mapLink: "/location.png",
        },
    ];

    const services = [
        {
            icon: '/star.png',
            title: t('egypt_page.services.s1_title'),
            items: [t('egypt_page.services.s1_i1'), t('egypt_page.services.s1_i2'), t('egypt_page.services.s1_i3'), t('egypt_page.services.s1_i4')],
        },
        {
            icon: '/point.png',
            title: t('egypt_page.services.s2_title'),
            items: [t('egypt_page.services.s2_i1'), t('egypt_page.services.s2_i2'), t('egypt_page.services.s2_i3'), t('egypt_page.services.s2_i4')],
        },
        {
            icon: '/star.png',
            title: t('egypt_page.services.s3_title'),
            items: [t('egypt_page.services.s3_i1'), t('egypt_page.services.s3_i2'), t('egypt_page.services.s3_i3'), t('egypt_page.services.s3_i4')],
        },
        {
            icon: '/shield.png',
            title: t('egypt_page.services.s4_title'),
            items: [t('egypt_page.services.s4_i1'), t('egypt_page.services.s4_i2'), t('egypt_page.services.s4_i3'), t('egypt_page.services.s4_i4')],
        },
    ];

    const whyReasons = [
        t('egypt_page.why_reasons_list.r1'),
        t('egypt_page.why_reasons_list.r2'),
        t('egypt_page.why_reasons_list.r3'),
        t('egypt_page.why_reasons_list.r4'),
        t('egypt_page.why_reasons_list.r5'),
        t('egypt_page.why_reasons_list.r6'),
    ];

    const experienceCards = [
        {
            icon: '/care.png',
            title: t('egypt_page.experienceCards.c1_title'),
            items: [
                t('egypt_page.experienceCards.c1_i1'),
                t('egypt_page.experienceCards.c1_i2'),
                t('egypt_page.experienceCards.c1_i3'),
                t('egypt_page.experienceCards.c1_i4'),
            ],
        },
        {
            icon: '/star.png',
            title: t('egypt_page.experienceCards.c2_title'),
            items: [
                t('egypt_page.experienceCards.c2_i1'),
                t('egypt_page.experienceCards.c2_i2'),
                t('egypt_page.experienceCards.c2_i3'),
                t('egypt_page.experienceCards.c2_i4'),
            ],
        },
    ];

    return (
        <>

            {/* Main Title & Description */}
            <section className="py-12 px-4 lg:px-24">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-background leading-relaxed">
                        {t('egypt_page.hero_title')} - {t('egypt_page.hero_subtitle').replace('15', '35')}
                    </h2>
                    <div className="space-y-4 text-background/70 leading-relaxed max-w-4xl mx-auto text-sm lg:text-base">
                        <p>{t('egypt_page.desc1')}</p>
                        <p>{t('egypt_page.desc2')}</p>
                    </div>
                </div>
            </section>

            {/* About Us Mini */}
            <section className=" my-10 py-12 px-4 lg:px-24">
                <div className="max-w-4xl mx-auto text-center space-y-3">
                    <div className="w-16 h-0.5 bg-background mx-auto mb-6"></div>
                    <h3 className="text-background font-bold text-2xl">{t('egypt_page.about_title')}</h3>
                    <p className="text-background/70 text-md">
                        {t('egypt_page.about_desc')}
                    </p>
                </div>
                {/* Quote Section */}
                <section className="py-8 px-4 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-secondary/30 border-2 border-background/20 rounded-xl p-8 lg:p-10 relative shadow-lg">
                            <div className="text-background text-4xl opacity-20 absolute top-4 right-6">
                            
                            </div>
                            <p className="text-background lg:text-lg leading-relaxed text-center relative z-10 pt-4">
                                {t('egypt_page.quote')}
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="w-12 h-0.5 bg-background"></div>
                                <div className="text-center">
                                    <p className="text-background font-bold text-md">{t('egypt_page.quote_author')}</p>
                                    <p className="text-background/60 text-sm">{t('egypt_page.speciality')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 px-4 lg:px-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-12">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-secondary/30 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center gap-3 border border-background/10">
                                    <div className="w-20 h-20 rounded-full bg-background/10 flex items-center justify-center border border-background/20">
                                        <img src={feature.icon} alt="" />
                                    </div>
                                    <h4 className="text-background text-lg">{feature.title}</h4>
                                    <p className="text-background/60 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </section>

            

            

            {/* Branches Section */}
            <section className="py-16 px-4 lg:px-24">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-background mx-auto mb-4"></div>
                        <h3 className="my-6 text-xl lg:text-2xl font-bold text-background">
                            {t('egypt_page.branches_title')}
                        </h3>
                        <p className="text-background/70 text-md">
                            {t('egypt_page.branches_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {branches.map((branch, idx) => (
                            <div key={idx} className="bg-secondary/30 rounded-xl p-6 lg:p-8 text-start space-y-4 border border-background/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center">
                                        <img src="/home.png" alt="" className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-background my-4">{branch.name}</h4>
                                        <p className="text-xs text-background/60 border border-background w-12"></p>
                                    </div>
                                </div>
                                <p className="text-background/80 text-sm font-semibold px-4">{branch.location}</p>
                                <ul className="space-y-2 px-4">
                                    {branch.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex items-center gap-2 text-background/70 text-xs">
                                            <img src="/ok2.png" alt="" className="w-5 h-5 text-background" />
                                            <span className='text-lg'>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 px-4 border-t border-background/10 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-background/70">
                                        <img src="/location.png" alt="" className="w-5 h-5" />
                                        <span className='text-lg'>{branch.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-background/70">
                                        <img src="/phone2.png" alt="" className="w-5 h-5" />
                                        <span className='text-lg'>{branch.phone}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-4 lg:px-24">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-background mx-auto mb-4"></div>
                        <h3 className="text-xl lg:text-2xl font-bold text-background">
                            {t('egypt_page.services_title')}
                        </h3>
                        <p className="text-background/70 text-md">
                            {t('egypt_page.services_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-secondary/30 rounded-xl p-6 lg:p-8 text-start space-y-4 border border-background/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center border border-background/20">
                                        <img src={service.icon} alt="icon" />
                                    </div>
                                    <h4 className="text-lg font-bold text-background">{service.title}</h4>
                                </div>
                                <ul className="space-y-2 pr-4">
                                    {service.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-baseline gap-2 text-background/60 text-lg">
                                            <span className="w-2 h-2 rounded-full bg-background"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-4 lg:px-24 ">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="h-[300px] w-full md:h-[400px] lg:h-[500px] w-[500px] rounded-xl overflow-hidden shadow-lg">
                                <img src={whyImage} alt="Why Choose Us" className="rounded-xl shadow-lg w-full h-full" />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="w-16 h-0.5 bg-background mb-4"></div>
                                <h2 className="text-xl lg:text-3xl text-background">
                                    {t('egypt_page.why_title')}
                                </h2>
                                
                            </div>
                            <ul className="space-y-6">
                                {whyReasons.map((reason, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-background/80 text-lg">
                                        <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                                            <img src="/ok.png" alt="check" />
                                        </div>
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Second Quote */}
            <section className="py-12 px-4 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-secondary/30 border-2 border-background/20 rounded-xl p-8 lg:p-10 relative shadow-lg">
                        <div className="text-background text-4xl opacity-20 absolute top-4 right-6">
                           
                        </div>
                        <p className="text-background text-xl leading-relaxed text-center relative z-10 pt-4">
                            {t('egypt_page.quote2')}
                        </p>
                        <div className="mt-6 flex items-center  gap-3">
                            <div className="w-12 h-0.5 bg-background"></div>
                            <div className="text-center">
                                <p className="text-background font-bold text-md">{t('egypt_page.quote2_author')}</p>
                                <p className="text-background/70 text-sm">{t('egypt_page.quote2_speciality')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-16 px-4 lg:px-24 ">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-background mx-auto mb-4"></div>
                        <h3 className="text-xl lg:text-3xl text-background">
                            {t('egypt_page.experience_title')}
                        </h3>
                        <p className="text-background/70 text-lg mt-5">
                            {t('egypt_page.experience_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {experienceCards.map((card, idx) => (
                            <div key={idx} className="bg-secondary/30 rounded-xl p-6 lg:p-8 text-start space-y-4 border border-background/10 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-background/20 border border-background/20 flex items-center justify-center">
                                        <img src={card.icon} alt="icon" className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-2xl text-background">{card.title}</h4>
                                </div>
                                <ul className="space-y-6 px-2 my-4">
                                    {card.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-center gap-2 text-background/70 text-lg">
                                            <img src="/ok2.png" alt="" className="w-5 h-5 text-background" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

EgyptPage.layout = (page) => <PublicLayout children={page} />;

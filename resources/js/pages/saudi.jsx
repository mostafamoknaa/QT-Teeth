import React, { useState } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from "@/hooks/use-translations";
import { Check, Plane, Car, Home, ChevronDown } from "lucide-react";

export default function SaudiPage() {
    const { t } = useTranslations();

    const heroImage = "https://image.qwenlm.ai/public_source/3fa2650f-4769-4e39-97f8-b5982d5a0c23/14cb91fcd-d16b-4662-998a-b28c17d8cdf1.png";
    const whyImage = "/saudi.png";

    const features = [
        { icon: '/point2.png', title: t('saudi_page.features.title1'), desc: t('saudi_page.features.desc1') },
        { icon: '/location.png', title: t('saudi_page.features.title2'), desc: t('saudi_page.features.desc2') },
        { icon: '/clock2.png', title: t('saudi_page.features.title3'), desc: t('saudi_page.features.desc3') },
        { icon: '/user.png', title: t('saudi_page.features.title4'), desc: t('saudi_page.features.desc4') },
        { icon: '/shield.png', title: t('saudi_page.features.title5'), desc: t('saudi_page.features.desc5') },
    ];

    const branches = [
        {
            name: t('saudi_page.branches.b1_name'),
            address: t('saudi_page.branches.b1_address'),
            location: t('saudi_page.branches.b1_location'),
            details: [
                t('saudi_page.branches.b1_d1'),
                t('saudi_page.branches.b1_d2'),
                t('saudi_page.branches.b1_d3'),
                t('saudi_page.branches.b1_d4'),
            ],
            phone: "01060000805",
            mapLink: "/location.png",
        },
        {
            name: t('saudi_page.branches.b2_name'),
            address: t('saudi_page.branches.b2_address'),
            location: t('saudi_page.branches.b2_location'),
            details: [
                t('saudi_page.branches.b2_d1'),
                t('saudi_page.branches.b2_d2'),
                t('saudi_page.branches.b2_d3'),
                t('saudi_page.branches.b2_d4'),
            ],
            phone: "01030000728",
            mapLink: "/location.png",
        },
    ];

    const services = [
        {
            icon: '/star.png',
            title: t('saudi_page.services.s1_title'),
            items: [t('saudi_page.services.s1_i1'), t('saudi_page.services.s1_i2'), t('saudi_page.services.s1_i3'), t('saudi_page.services.s1_i4')],
        },
        {
            icon: '/point.png',
            title: t('saudi_page.services.s2_title'),
            items: [t('saudi_page.services.s2_i1'), t('saudi_page.services.s2_i2'), t('saudi_page.services.s2_i3'), t('saudi_page.services.s2_i4')],
        },
        {
            icon: '/star.png',
            title: t('saudi_page.services.s3_title'),
            items: [t('saudi_page.services.s3_i1'), t('saudi_page.services.s3_i2'), t('saudi_page.services.s3_i3'), t('saudi_page.services.s3_i4')],
        },
        {
            icon: '/shield.png',
            title: t('saudi_page.services.s4_title'),
            items: [t('saudi_page.services.s4_i1'), t('saudi_page.services.s4_i2'), t('saudi_page.services.s4_i3'), t('saudi_page.services.s4_i4')],
        },
    ];

    const whyReasons = [
        t('saudi_page.why_reasons_list.r1'),
        t('saudi_page.why_reasons_list.r2'),
        t('saudi_page.why_reasons_list.r3'),
        t('saudi_page.why_reasons_list.r4'),
        t('saudi_page.why_reasons_list.r5'),
        t('saudi_page.why_reasons_list.r6'),
    ];

    const experienceCards = [
        {
            icon: '/care.png',
            title: t('saudi_page.experienceCards.c1_title'),
            items: [
                t('saudi_page.experienceCards.c1_i1'),
                t('saudi_page.experienceCards.c1_i2'),
                t('saudi_page.experienceCards.c1_i3'),
                t('saudi_page.experienceCards.c1_i4'),
            ],
        },
        {
            icon: '/shield.png',
            title: t('saudi_page.experienceCards.c2_title'),
            items: [
                t('saudi_page.experienceCards.c2_i1'),
                t('saudi_page.experienceCards.c2_i2'),
                t('saudi_page.experienceCards.c2_i3'),
                t('saudi_page.experienceCards.c2_i4'),
            ],
        },
    ];

    return (
        <>

            {/* Main Title & Description */}
            <section className="py-12 px-4 lg:px-24 bg-muted-foreground/5">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <section>
                        <h2 className="text-xl lg:text-2xl text-foreground leading-loose">
                            {t('saudi_page.hero_title2')}
                        </h2>
                        <h2 className="text-xl lg:text-2xl text-foreground leading-loose">
                            {t('saudi_page.hero_subtitle2')}
                        </h2>
                    </section>
                    <div className="leading-loose space-y-4 text-[#555] max-w-4xl mx-auto text-sm lg:text-base">
                       <p>
                            {t('saudi_page.hero_date')}<br/>
                            {t('saudi_page.hero_desc1')}
                       </p>
                       <p>
                          {t('saudi_page.hero_desc2')}
                       </p>
                    </div>
                </div>
            </section>

            {/* About Us Mini */}
            <section className=" my-10 py-12 px-4 lg:px-24 bg-background">
                <div className="max-w-4xl mx-auto text-center space-y-3">
                    <div className="w-16 h-0.5 bg-foreground mx-auto"></div>
                    <h3 className="text-foreground text-2xl my-10">{t('saudi_page.choose_egypt_title')}</h3>
                    <p className="text-muted-foreground text-md">
                       {t('saudi_page.choose_egypt_subtitle')}
                    </p>
                </div>
               

                {/* Features */}
                <section className="py-12 px-4 lg:px-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-12">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-muted-foreground/5 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-full bg-muted-foreground/20 flex items-center justify-center border border-foreground/20">
                                        <img src={feature.icon} alt="" />
                                    </div>
                                    <h4 className="text-foreground text-lg">{feature.title}</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </section>

            {/* Services Section */}
            <section className="py-16 px-4 lg:px-24 bg-muted-foreground/5">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-foreground mx-auto mb-4"></div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                            {t('saudi_page.services_title')}
                        </h3>
                        <p className="text-[#777] text-md">
                            {t('saudi_page.services_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 lg:p-8 text-start space-y-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center border border-foreground/20">
                                        <img src={service.icon} alt="icon" />
                                    </div>
                                    <h4 className="text-lg font-bold text-foreground">{service.title}</h4>
                                </div>
                                <ul className="space-y-2 pr-4">
                                    {service.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-baseline gap-2 text-muted-foreground text-lg">
                                            <span className="w-2 h-2 rounded-full bg-foreground"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            

            {/* Branches Section */}
            <section className="py-16 px-4 lg:px-24 bg-background">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-foreground mx-auto mb-4"></div>
                        <h3 className="my-6 text-xl lg:text-2xl font-bold text-foreground">
                            {t('saudi_page.how_to_reach_title')}
                        </h3>
                        <p className="text-muted-foreground text-md">
                            {t('saudi_page.how_to_reach_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="rounded-xl p-6 lg:p-8 flex flex-col items-center space-y-4">
                             <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center">
                                <img src='/plane.png' alt="" />
                            </div>
                            <p className='rounded-full bg-muted-foreground/10 px-5 py-0.5'>
                                {t('saudi_page.how_to_reach_steps.s1_badge')}
                            </p>
                            <p>
                                {t('saudi_page.how_to_reach_steps.s1_title')}
                            </p>
                            <p className='text-muted-foreground/90'>
                                {t('saudi_page.how_to_reach_steps.s1_desc')}
                            </p>
                        </div>
                        <div className="rounded-xl p-6 lg:p-8 flex flex-col items-center space-y-4">
                             <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center">
                                <img src='/location-ar.png' alt="" />
                            </div>
                            <p className='rounded-full bg-muted-foreground/10 px-5 py-0.5'>
                                {t('saudi_page.how_to_reach_steps.s2_badge')}
                            </p>
                            <p>
                                {t('saudi_page.how_to_reach_steps.s2_title')}
                            </p>
                            <p className='text-muted-foreground/90'>
                                {t('saudi_page.how_to_reach_steps.s2_desc')}
                            </p>
                        </div>
                        <div className="rounded-xl p-6 lg:p-8 flex flex-col items-center space-y-4">
                             <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center">
                                <img src='/stethoscope.png' alt="" />
                            </div>
                            <p className='rounded-full bg-muted-foreground/10 px-5 py-0.5'>
                                {t('saudi_page.how_to_reach_steps.s3_badge')}
                            </p>
                            <p>
                               {t('saudi_page.how_to_reach_steps.s3_title')}
                            </p>
                            <p className='text-muted-foreground/90'>
                               {t('saudi_page.how_to_reach_steps.s3_desc')}
                            </p>
                        </div>
                    </div>

                    <section className="bg-muted-foreground/10 rounded-xl p-6 lg:p-8 text-start space-y-4 border border-muted-foreground/10 shadow-sm">
                        <div className='text-center leading-loose space-y-'>
                            <h3>
                                {t('saudi_page.branches_title')}
                            </h3>
                            <p>
                                {t('saudi_page.branches_subtitle')}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            {branches.map((branch, idx) => (
                                <div key={idx} className="">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-13 h-13 rounded-full bg-muted-foreground/20 border border-foreground/20 flex items-center justify-center">
                                            <img src="/home.png" alt="" className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground my-4">{branch.name}</h4>
                                             <div className="text-xs text-[#555]">
                                                <span className='text-lg'>{branch.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            

            {/* Why Choose Us */}
            <section className="py-16 px-4 lg:px-24 bg-muted-foreground/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="h-[300px] w-full md:h-[400px] lg:h-[500px] w-[500px] rounded-xl overflow-hidden shadow-lg">
                                <img src={whyImage} alt="Why Choose Us" className="rounded-xl shadow-lg w-full h-full" />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="w-16 h-0.5 bg-foreground mb-4"></div>
                                <h2 className="text-xl lg:text-3xl text-foreground">
                                    {t('egypt_page.why_title')}
                                </h2>
                                
                            </div>
                            <ul className="space-y-6">
                                {whyReasons.map((reason, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[#555] text-lg">
                                        <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
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

            {/* Experience Section */}
            <section className="py-16 px-4 lg:px-24 bg-white">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-foreground mx-auto mb-4"></div>
                        <h3 className="text-xl lg:text-3xl text-foreground">
                           {t('saudi_page.experience_title')}
                        </h3>
                        <p className="text-foreground/70 text-lg mt-5">
                            {t('saudi_page.experience_subtitle')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {experienceCards.map((card, idx) => (
                            <div key={idx} className="bg-[#f9f9f9] rounded-xl p-6 lg:p-8 text-start space-y-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-13 h-13 rounded-full bg-foreground/20 border border-foreground/20 flex items-center justify-center">
                                        <img src={card.icon} alt="icon" className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-2xl text-foreground">{card.title}</h4>
                                </div>
                                <ul className="space-y-6 px-2 my-4">
                                    {card.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-center gap-2 text-foreground/70 text-lg">
                                            <img src="/ok2.png" alt="" className="w-5 h-5 text-foreground" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-16 px-4 lg:px-24 bg-muted-foreground/5">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-2">
                        <div className="w-16 h-0.5 bg-foreground mx-auto mb-4"></div>
                        <h3 className="text-xl lg:text-3xl text-foreground">
                          {t('saudi_page.faq_title')}
                        </h3>
                        <p className="text-foreground/70 text-lg mt-5 mb-8">
                           {t('saudi_page.faq_subtitle')}
                        </p>
                        
                        <div className="max-w-4xl mx-auto flex flex-col gap-4 text-start">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <details key={item} className="group bg-white rounded-xl border border-gray-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between cursor-pointer p-5 lg:p-6 font-semibold text-foreground relative">
                                        <span className="pe-4">{t('saudi_page.faq_list.q' + item)}</span>
                                        <span className="transition group-open:rotate-180">
                                            <ChevronDown className="w-5 h-5" />
                                        </span>
                                    </summary>
                                    <div className="bg-white px-5 pb-5 lg:px-6 lg:pb-6 relative before:absolute before:top-0 before:left-5 before:right-5 before:h-px before:bg-gray-100">
                                        <p className="text-[#555] leading-relaxed pt-4">
                                            {t('saudi_page.faq_list.a' + item)}
                                        </p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}
SaudiPage.layout = (page) => <PublicLayout children={page} />;


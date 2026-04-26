import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import DoctorAhmedBadrSection from '@/components/sections/doctor-profile';
import ServicesCarouselSection from '@/components/sections/services-carousel';
import TestimonialsSection from '@/components/sections/testimonials';
import LatestArticlesSection from '@/components/sections/articles';
import BookingFormSection from '@/components/sections/booking';

export default function Welcome({ articles, testimonials, services }) {
    return (
        <>
            <Head title="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان | Badr Dental Center">
                <meta name="description" content="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان — أكثر من ٣٠ استشاري وأخصائي. زراعة الأسنان، تجميل الأسنان، تقويم، حشوات حديثة، علاج جذور. علاج في جلسة واحدة تحت تخدير كلي. فروع في المنصورة والشيخ زايد. متاح التقسيط." />
                <meta name="keywords" content="مركز بدر للأسنان، زراعة الأسنان، تجميل الأسنان، تقويم الأسنان، علاج الجذور، حشوات حديثة، تركيبات ثابتة، علاج أسنان الأطفال، زراعة الفك، تخدير كلي، المنصورة، الشيخ زايد، Badr Dental Center" />
                <meta property="og:title" content="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان" />
                <meta property="og:description" content="أكثر من ٣٠ استشاري وأخصائي. زراعة ومتخصصون في تجميل وتقويم الأسنان. فروع في المنصورة والشيخ زايد. علاج في جلسة واحدة تحت تخدير كلي." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content="https://badrdentalcenter.com/" />
                <meta name="twitter:title" content="مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان" />
                <meta name="twitter:description" content="أكثر من ٣٠ استشاري وأخصائي في زراعة ومتخصصون في تجميل وتقويم الأسنان. فروع المنصورة والشيخ زايد." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>

            <DoctorAhmedBadrSection />
            <ServicesCarouselSection services={services} />

            {/* People Section */}
            <section className="px-4 md:px-8 lg:px-16">
                <div className="rounded-[3rem] ">
                    <img 
                        src="/people.png" 
                        alt="Our Team" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            {/* <TestimonialsSection testimonials={testimonials} /> */}
            <LatestArticlesSection articles={articles} />
            <BookingFormSection services={services} />

            {/* JSON-LD structured data — moved here to avoid any potential sibling conflict with <Head> */}
            <LocalBusinessSchema />
        </>
    );
}

Welcome.layout = (page) => <PublicLayout children={page} />;
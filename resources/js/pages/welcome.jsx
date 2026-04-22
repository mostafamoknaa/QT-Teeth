import React from 'react';
import PublicLayout from '@/layouts/public-layout';
import DoctorAhmedBadrSection from '@/components/sections/doctor-profile';
import ServicesCarouselSection from '@/components/sections/services-carousel';
import TestimonialsSection from '@/components/sections/testimonials';
import LatestArticlesSection from '@/components/sections/articles';
import BookingFormSection from '@/components/sections/booking';

export default function Welcome({ articles, testimonials, services }) {
    return (
        <>
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
        </>
    );
}

Welcome.layout = (page) => <PublicLayout children={page} />;
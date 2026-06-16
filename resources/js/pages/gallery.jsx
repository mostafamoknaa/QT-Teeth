import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import GalleryCarousel from '@/components/sections/gallery-carousel';
import { Sparkles, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

export default function GalleryPage({ gallery_photos = [], canonical_url }) {
    const { t } = useTranslations();
    const pageUrl = canonical_url || 'https://badrdentalcenter.com/gallery';

    return (
        <>
            <Head title="معرض الصور قبل وبعد | مركز بدر لطب الأسنان">
                <meta name="description" content="شاهد صور قبل وبعد لزراعة وتجميل وتقويم الأسنان بمركز بدر للأسنان بالمنصورة والشيخ زايد. نتائج حقيقية لابتسامات رائعة." />
                <meta property="og:title" content="معرض الصور قبل وبعد | مركز بدر لطب الأسنان" />
                <meta property="og:description" content="نتائج حقيقية لحالات زراعة وتجميل وتقويم الأسنان بمركز بدر للأسنان. احصل على الابتسامة التي تتمناها." />
                <meta property="og:image" content="https://badrdentalcenter.com/og-image.png" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="معرض الصور قبل وبعد | مركز بدر لطب الأسنان" />
                <meta name="twitter:description" content="نتائج حقيقية لحالات زراعة وتجميل وتقويم الأسنان بمركز بدر للأسنان. شاهد صور قبل وبعد." />
                <meta name="twitter:image" content="https://badrdentalcenter.com/og-image.png" />
            </Head>

            <div className="py-12 md:py-20">
                {/* Hero / Header Section */}
                <div className="text-center max-w-3xl mx-auto px-6 mb-12 space-y-4">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter text-background">
                        معرض الصور
                    </h1>
                    <p className="text-sm md:text-base text-background/80 font-medium leading-relaxed">
                        نحن فخورون بابتسامتك! هنا نعرض بعض نتائج الحالات الحقيقية التي تشرفنا بعلاجها وتجميلها في عياداتنا.
                    </p>
                </div>

                {/* The Interactive Carousel */}
                <div className="max-w-6xl mx-auto px-6">
                    {gallery_photos && gallery_photos.length > 0 ? (
                        <GalleryCarousel photos={gallery_photos} />
                    ) : (
                        <div className="text-center py-20 bg-secondary/15 rounded-[3rem] border border-dashed border-border/50">
                            <Sparkles className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                            <p className="text-background/60 font-medium italic text-base">
                                سيتم رفع حالات جديدة قريباً. تابعونا!
                            </p>
                        </div>
                    )}
                </div>

                {/* Back to Home Link */}
                <div className="text-center pt-12 border-t border-border/20 max-w-4xl mx-auto mt-16 px-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline group"
                    >
                        <span>العودة للصفحة الرئيسية</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                </div>
            </div>
        </>
    );
}

GalleryPage.layout = (page) => <PublicLayout children={page} />;

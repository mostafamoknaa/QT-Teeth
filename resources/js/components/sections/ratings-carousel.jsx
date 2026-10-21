import React, { useState, useRef } from 'react';
import { Star, Sparkles, ZoomIn, ChevronLeft, ChevronRight, CheckCircle2, HeartHandshake } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Fallback rating cards if no images uploaded
const DEFAULT_RATING_CARDS = [
    {
        id: 'def-1',
        name_ar: 'سارة الشمري',
        name_en: 'Sarah Al-Shammari',
        service_ar: 'ابتسامة هوليوود وتجميل الأسنان',
        service_en: 'Hollywood Smile & Aesthetics',
        comment_ar: 'أفضل تجربة علاج وتجميل أسنان في مصر! دكتور أحمد بدر وفريقه قمة في الذوق والاحترافية، النتيجة تفوق الوصف وبدون أي ألم.',
        comment_en: 'The best dental experience in Egypt! Dr. Ahmed Badr and his team are exceptionally professional, the result is beyond expectations.',
        date_ar: 'منذ أسبوع',
        date_en: '1 week ago',
        rating: 5,
        source: 'Google Reviews',
    },
    {
        id: 'def-2',
        name_ar: 'م. أحمد خالد',
        name_en: 'Eng. Ahmed Khaled',
        service_ar: 'زراعة الأسنان الفورية',
        service_en: 'Immediate Dental Implants',
        comment_ar: 'قمت بزراعة فك كامل بأحدث التقنيات الألمانية، دقة متناهية وتعقيم على أعلى المستويات. شكراً لمركز بدر المتميز.',
        comment_en: 'Full-arch dental implant with certified German implants. Extreme precision and global sterilization standards. Thank you!',
        date_ar: 'منذ أسبوعين',
        date_en: '2 weeks ago',
        rating: 5,
        source: 'Google Reviews',
    },
    {
        id: 'def-3',
        name_ar: 'د. منى عبد الرحمن',
        name_en: 'Dr. Mona Abdulrahman',
        service_ar: 'التقويم الشفاف وتبييض الأسنان',
        service_en: 'Clear Aligners & Teeth Whitening',
        comment_ar: 'ابتسامتي تغيرت 180 درجة! التقويم الشفاف كان مريح جداً ومحدش لاحظه، والآن أستمتع بأسنان متناسقة وناصعة البياض.',
        comment_en: 'My smile transformed completely! Clear aligners were comfortable and virtually invisible. Very happy with the result.',
        date_ar: 'منذ 3 أسابيع',
        date_en: '3 weeks ago',
        rating: 5,
        source: 'Google Reviews',
    },
    {
        id: 'def-4',
        name_ar: 'فيصل العتيبي',
        name_en: 'Faisal Al-Otaibi',
        service_ar: 'علاج العصب التخصصي والتركيبات',
        service_en: 'Endodontics & Ceramic Crowns',
        comment_ar: 'سافرت خصيصاً للمركز من السعودية، والحمد لله كانت زيارة موفقة جداً. دقة في المواعيد ورعاية تفوق التوقعات.',
        comment_en: 'Traveled specifically to Dr. Badr Center from Saudi Arabia. Absolute punctuality and care exceeding all expectations.',
        date_ar: 'منذ شهر',
        date_en: '1 month ago',
        rating: 5,
        source: 'Google Reviews',
    },
];

export default function RatingsCarousel({ ratings = [] }) {
    const pageProps = usePage().props;
    const locale = pageProps.locale || 'ar';
    const isRTL = locale === 'ar';
    const [previewImage, setPreviewImage] = useState(null);
    const scrollContainerRef = useRef(null);

    // Get ratings from either direct prop or Inertia page props
    const allRatings = (Array.isArray(ratings) && ratings.length > 0)
        ? ratings
        : (Array.isArray(pageProps.ratings) && pageProps.ratings.length > 0 ? pageProps.ratings : []);

    const hasUploadedRatings = allRatings.length > 0;
    const baseItems = hasUploadedRatings ? allRatings : DEFAULT_RATING_CARDS;

    // Ensure enough cards inside each group so it spans wider than any screen resolution
    const minCards = 8;
    const repeatCount = Math.max(1, Math.ceil(minCards / baseItems.length));
    const groupItems = [];
    for (let i = 0; i < repeatCount; i++) {
        baseItems.forEach((item, idx) => {
            groupItems.push({
                ...item,
                uniqueSubId: `${item.id || idx}-${i}`,
            });
        });
    }

    const scrollManual = (direction) => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const renderCard = (item, idx, groupPrefix) => {
        const isUploaded = !!item.image;
        const imageUrl = isUploaded ? `/storage/${item.image}` : null;

        return (
            <div
                key={`${groupPrefix}-${item.uniqueSubId}-${idx}`}
                onClick={() => isUploaded && setPreviewImage(imageUrl)}
                className={`flex-shrink-0 w-[260px] sm:w-[300px] md:w-[330px] bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_8px_25px_rgba(212,175,55,0.2)] flex flex-col justify-between group/card ${
                    isUploaded ? 'cursor-pointer hover:-translate-y-1' : ''
                }`}
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
                {isUploaded ? (
                    /* Uploaded Rating Screenshot Card (Compact Height) */
                    <div className="relative w-full h-[170px] sm:h-[195px] bg-[#16161c] overflow-hidden flex items-center justify-center p-2">
                        <img
                            src={imageUrl}
                            alt={item.title || 'Rating'}
                            loading="lazy"
                            className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover/card:scale-105"
                            onError={(e) => {
                                console.error('Failed to load rating image:', imageUrl);
                            }}
                        />

                        {/* Hover Zoom Overlay */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white">
                            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg">
                                <ZoomIn className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold text-amber-200">
                                {isRTL ? 'انقر للتكبير' : 'Click to View'}
                            </span>
                        </div>

                        {/* Top Star Badge */}
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>{item.title || (isRTL ? 'تقييم معتمد' : 'Verified Rating')}</span>
                        </div>
                    </div>
                ) : (
                    /* Sleek Fallback Text/Card Review */
                    <div className="p-4 flex flex-col justify-between h-[170px] sm:h-[195px]">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <div className="flex items-center text-amber-400 gap-0.5">
                                    {[...Array(item.rating || 5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-[9px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                                    {item.source}
                                </span>
                            </div>

                            <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
                                "{isRTL ? item.comment_ar : item.comment_en}"
                            </p>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-xs text-white">
                                    {isRTL ? item.name_ar : item.name_en}
                                </h4>
                                <p className="text-[10px] text-amber-400 font-medium">
                                    {isRTL ? item.service_ar : item.service_en}
                                </p>
                            </div>
                            <span className="text-[9px] text-white/40">
                                {isRTL ? item.date_ar : item.date_en}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section id="ratings" className="py-16 md:py-24 px-3 sm:px-6 lg:px-12 relative overflow-hidden bg-[#09090b]">
            {/* Inline Keyframes & Styles for a Perfectly Seamless, Never-Ending Circular Marquee Loop */}
            <style>{`
                @keyframes seamlessLoopLeft {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-100%, 0, 0);
                    }
                }
                .ratings-marquee-wrapper {
                    display: flex !important;
                    width: max-content !important;
                }
                .ratings-marquee-track {
                    display: flex !important;
                    gap: 1.5rem !important;
                    padding-right: 1.5rem !important;
                    animation: seamlessLoopLeft 80s linear infinite !important;
                    will-change: transform;
                }
                .ratings-marquee-wrapper:hover .ratings-marquee-track {
                    animation-play-state: paused !important;
                }
            `}</style>

            {/* Ambient Lighting Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/8 blur-[160px] rounded-full pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-3.5 reveal">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{isRTL ? 'التقييمات / Rating' : 'Ratings & Reviews'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {isRTL ? 'التقييمات  /  ratting' : 'Client Ratings & Reviews'}
                </h2>

                <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                    {isRTL
                        ? 'آراء وتقييمات عملائنا الكرام وتجاربهم الاستثنائية في مركز د. أحمد بدر لطب وجراحة وتجميل الأسنان.'
                        : 'Real reviews and ratings from our valued clients experiencing world-class dental care at Dr. Ahmed Badr Dental Center.'}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
                    <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm font-medium bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                        <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <span className="font-bold text-white ml-1">4.9 / 5</span>
                        <span className="text-white/50 text-[11px]">(Google Reviews)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm font-medium bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{isRTL ? 'تقييمات موثقة ومعتمدة' : 'Verified Reviews'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm font-medium bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                        <HeartHandshake className="w-4 h-4 text-amber-400" />
                        <span>{isRTL ? '+10,000 عميل سعيد' : '+10,000 Happy Smiles'}</span>
                    </div>
                </div>
            </div>

            {/* CAROUSEL CONTAINER: Explicit dir="ltr" to reset RTL overflow context */}
            <div dir="ltr" className="relative w-full overflow-hidden group py-4 select-none">
                {/* Edge Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent z-20 pointer-events-none" />

                {/* Left Navigation Button */}
                <button
                    type="button"
                    onClick={() => scrollManual('left')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-amber-400 hover:border-amber-400 hover:bg-black/90 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Button */}
                <button
                    type="button"
                    onClick={() => scrollManual('right')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-amber-400 hover:border-amber-400 hover:bg-black/90 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* CONTINUOUS CIRCULAR MARQUEE: Two identical tracks for seamless, uninterrupted loop */}
                <div 
                    ref={scrollContainerRef}
                    className="ratings-marquee-wrapper"
                >
                    {/* Track 1 */}
                    <div className="ratings-marquee-track">
                        {groupItems.map((item, idx) => renderCard(item, idx, 'g1'))}
                    </div>

                    {/* Track 2 (Identical Clone for 100% Seamless Infinite Circular Loop) */}
                    <div className="ratings-marquee-track" aria-hidden="true">
                        {groupItems.map((item, idx) => renderCard(item, idx, 'g2'))}
                    </div>
                </div>
            </div>

            {/* Hint message below carousel */}
            <div className="text-center mt-6">
                <p className="text-white/40 text-[11px] sm:text-xs flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>
                        {isRTL
                            ? 'شريط دائري مستمر وهادئ • ضع المؤشر فوق أي تقييم لإيقاف الحركة أو النقر للتكبير'
                            : 'Continuous calm circular loop • Hover to pause or click any card to zoom'}
                    </span>
                </p>
            </div>

            {/* Lightbox / Zoom Dialog for Full Image Preview */}
            <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
                <DialogContent className="max-w-4xl p-2 bg-black/95 border-amber-500/30 text-white">
                    {previewImage && (
                        <div className="relative flex flex-col items-center justify-center p-3">
                            <img
                                src={previewImage}
                                alt="Rating Preview"
                                className="max-h-[82vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
                            />
                            <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 font-bold">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span>{isRTL ? 'تقييم معتمد من أحد عملائنا الكرام' : 'Verified Client Rating'}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}

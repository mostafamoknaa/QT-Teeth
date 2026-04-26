/**
 * LocalBusinessSchema — Schema.org JSON-LD for Badr Dental Center
 * Inject in the home page <Head> for Google rich results (maps, knowledge panel)
 */
export default function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        "name": "مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان",
        "alternateName": "Badr Dental Center",
        "url": "https://badrdentalcenter.com/",
        "logo": "https://badrdentalcenter.com/logo.png",
        "image": "https://badrdentalcenter.com/og-image.png",
        "description": "مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان — أكثر من ٣٠ استشاري وأخصائي. متخصصون في زراعة الأسنان، التجميل، التقويم، الحشوات الحديثة، علاج الجذور، وتأهيل كامل للفك. علاج في جلسة واحدة تحت تخدير كلي. متاح التقسيط.",
        "priceRange": "$$",
        "telephone": ["+201060000805", "+201030000728"],
        "email": "info@badrdentalcenter.com",
        "foundingDate": "2014",
        "hasMap": [
            "https://maps.app.goo.gl/HzMFLXHveNFaMsi37",
            "https://maps.app.goo.gl/hnnERt4HpXiUg87z5"
        ],
        "location": [
            {
                "@type": "Dentist",
                "name": "مركز بدر للأسنان — المنصورة",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "المنصورة",
                    "addressLocality": "المنصورة",
                    "addressRegion": "الدقهلية",
                    "addressCountry": "EG"
                },
                "telephone": "+201060000805",
                "hasMap": "https://maps.app.goo.gl/HzMFLXHveNFaMsi37"
            },
            {
                "@type": "Dentist",
                "name": "مركز بدر للأسنان — الشيخ زايد",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "الشيخ زايد",
                    "addressLocality": "الشيخ زايد",
                    "addressRegion": "الجيزة",
                    "addressCountry": "EG"
                },
                "telephone": "+201030000728",
                "hasMap": "https://maps.app.goo.gl/hnnERt4HpXiUg87z5"
            }
        ],
        "medicalSpecialty": [
            "Dentistry",
            "Orthodontics",
            "Oral Surgery",
            "Cosmetic Dentistry",
            "Implantology",
            "Pediatric Dentistry"
        ],
        "availableService": [
            { "@type": "MedicalProcedure", "name": "زراعة الأسنان" },
            { "@type": "MedicalProcedure", "name": "الزراعة الفورية" },
            { "@type": "MedicalProcedure", "name": "تجميل الأسنان" },
            { "@type": "MedicalProcedure", "name": "تقويم الأسنان" },
            { "@type": "MedicalProcedure", "name": "تركيبات الأسنان الثابتة" },
            { "@type": "MedicalProcedure", "name": "علاج الجذور" },
            { "@type": "MedicalProcedure", "name": "الحشوات الحديثة" },
            { "@type": "MedicalProcedure", "name": "علاج أسنان الأطفال" },
            { "@type": "MedicalProcedure", "name": "جراحة الأسنان وضروس العقل" },
            { "@type": "MedicalProcedure", "name": "علاج الأسنان في جلسة واحدة تحت تخدير كلي" },
            { "@type": "MedicalProcedure", "name": "زراعة الفك الكامل" }
        ],
        "sameAs": [
            "https://www.facebook.com/badrdentalcenter",
            "https://www.instagram.com/badrdentalcenter"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

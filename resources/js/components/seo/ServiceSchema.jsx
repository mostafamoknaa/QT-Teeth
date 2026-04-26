/**
 * ServiceSchema — Schema.org JSON-LD for service show pages
 */
export default function ServiceSchema({ service, canonicalUrl }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": service.title,
        "description": service.description || service.title,
        "image": service.image
            ? `https://badrdentalcenter.com/storage/${service.image}`
            : "https://badrdentalcenter.com/og-image.png",
        "url": canonicalUrl || `https://badrdentalcenter.com/services/${service.url_key || service.id}`,
        "procedureType": "https://schema.org/PhysicianProcedure",
        "body": { "@type": "AnatomicalStructure", "name": "Tooth" },
        "followup": "متابعة ما بعد العلاج مع الطبيب المختص",
        "medicineSystem": "https://schema.org/WesternConventional",
        "recognizingAuthority": {
            "@type": "Organization",
            "name": "مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان"
        },
        "relevantSpecialty": {
            "@type": "MedicalSpecialty",
            "name": "Dentistry"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

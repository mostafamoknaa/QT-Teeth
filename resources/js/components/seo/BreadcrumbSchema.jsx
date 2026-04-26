/**
 * BreadcrumbSchema — Schema.org JSON-LD BreadcrumbList
 * 
 * @param {Array} items - e.g. [{ name: 'الرئيسية', url: '/' }, { name: 'الخدمات', url: '/services' }, { name: 'زراعة الأسنان' }]
 */
export default function BreadcrumbSchema({ items }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            ...(item.url ? { "item": `https://badrdentalcenter.com${item.url}` } : {})
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * ArticleSchema — Schema.org JSON-LD for article show pages
 */
export default function ArticleSchema({ article, canonicalUrl }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description || article.title,
        "image": article.image
            ? `https://badrdentalcenter.com/storage/${article.image}`
            : "https://badrdentalcenter.com/og-image.png",
        "url": canonicalUrl || `https://badrdentalcenter.com/articles/${article.url_key || article.id}`,
        "datePublished": article.published_at || article.created_at,
        "dateModified": article.updated_at || article.published_at || article.created_at,
        "author": {
            "@type": "Person",
            "name": article.author_name || "مركز بدر للأسنان"
        },
        "publisher": {
            "@type": "Organization",
            "name": "مركز بدر لعلاج وتجميل وزراعة وتقويم الأسنان",
            "logo": {
                "@type": "ImageObject",
                "url": "https://badrdentalcenter.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl || `https://badrdentalcenter.com/articles/${article.url_key || article.id}`
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

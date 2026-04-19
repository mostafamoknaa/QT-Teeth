/**
 * Translates pagination labels from English to Arabic
 */
export function translatePaginationLabel(label, locale) {
    if (locale !== 'ar') return label;

    const translations = {
        '&laquo; Previous': 'السابق &laquo;',
        'Previous': 'السابق',
        'Next &raquo;': '&raquo; التالي',
        'Next': 'التالي',
        '&laquo;': '&laquo;',
        '&raquo;': '&raquo;',
    };

    return translations[label] || label;
}

/**
 * Processes pagination links and translates their labels for the current locale
 */
export function getPaginationLinks(links, locale) {
    return links.map(link => ({
        ...link,
        label: translatePaginationLabel(link.label, locale)
    }));
}

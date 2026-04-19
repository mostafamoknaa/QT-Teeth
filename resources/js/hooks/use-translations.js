import { usePage } from '@inertiajs/react';

export function useTranslations() {
    const { translations } = usePage().props;

    const t = (key, defaultValue) => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }

        return value;
    };

    return { t };
}

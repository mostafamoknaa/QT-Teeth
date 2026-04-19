import { useTranslations } from "@/hooks/use-translations";

export default function SmileSection() {
    const { t } = useTranslations();
    return (
        <section id="smile" className="py-24 px-4 lg:px-24">
            <div className="max-w-7xl mx-auto text-center">
                <img src="/Thumbnail.png" alt={t('smile.alt')} className="mx-auto mb-8 rounded-lg shadow-lg" />
            </div>
        </section>
    );
}
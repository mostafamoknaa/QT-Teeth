import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function LatestArticlesSection({ articles = [] }) {
    const { t } = useTranslations();

    // Use dynamic articles if available, otherwise just return empty or placeholder
    if (!articles || articles.length === 0) return null;

    return (
        <section id="articles" className="py-24 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl lg:text-3xl text-background font-bold tracking-tighter">
                        {t('articles.title')}
                    </h2>
                </div>
                <Link href='/articles' className="text-background text-base cursor-pointer hover:text-primary transition-all pb-1">
                    {t('articles.view_all')}
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                    <div key={index} className="group text-background bg-secondary/30 flex rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-xl">
                        <div className="w-1/3 overflow-hidden">
                            <img 
                                src={article.image ? `/storage/${article.image}` : 'https://placehold.co/600x400'} 
                                alt={article.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                        </div>
                        <div className="p-8 flex flex-col justify-between flex-1 space-y-4">
                            <div className="space-y-3">
                                <h3 className="text-base lg:text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm  leading-relaxed line-clamp-2">
                                    {article.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

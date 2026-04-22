import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Calendar, User } from 'lucide-react';

export default function ArticlesIndex({ articles = [] }) {
    const { t } = useTranslations();

    return (
        <>
            <Head title={t('pages.articles.title')} />

            <section className="py-12 md:py-20 px-6 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-background">
                        {t('pages.articles.title')}
                    </h1>
                    <p className="text-background/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                        {t('pages.articles.subtitle')}
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link 
                            key={article.id} 
                            href={`/articles/${article.id}`}
                            className="group bg-secondary/30 rounded-3xl overflow-hidden border border-border/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img 
                                    src={article.image ? `/storage/${article.image}` : '/clinic-2.png'} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-lg md:text-xl font-bold leading-snug text-background group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-background/60 leading-relaxed line-clamp-3">
                                    {article.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-background/60 pt-2 border-t border-border/30">
                                    {article.author_name && (
                                        <span className="flex items-center gap-1">
                                            <User size={14} />
                                            {article.author_name}
                                        </span>
                                    )}
                                    {article.published_at && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(article.published_at).toLocaleDateString('ar-EG')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {articles.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">{t('pages.articles.empty')}</p>
                    </div>
                )}
            </section>
        </>
    );
}

ArticlesIndex.layout = (page) => <PublicLayout children={page} />;

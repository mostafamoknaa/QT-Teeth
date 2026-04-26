import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useTranslations } from '@/hooks/use-translations';
import { ChevronRight, Calendar, User } from 'lucide-react';
import ArticleSchema from '@/components/seo/ArticleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function ArticleShow({ article, canonical_url }) {
    const { t } = useTranslations();
    const ogImage = article.image
        ? `https://badrdentalcenter.com/storage/${article.image}`
        : 'https://badrdentalcenter.com/og-image.png';
    const articleUrl = canonical_url || `https://badrdentalcenter.com/articles/${article.url_key || article.id}`;

    return (
        <>
            <Head title={`${article.title} | مركز بدر لطب الأسنان`}>
                <meta name="description" content={article.description || `${article.title} — مقال من مركز بدر لطب الأسنان.`} />
                <meta property="og:title" content={`${article.title} | مركز بدر`} />
                <meta property="og:description" content={article.description || article.title} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:url" content={articleUrl} />
                <meta property="og:type" content="article" />
                {article.published_at && (
                    <meta property="article:published_time" content={article.published_at} />
                )}
                {article.author_name && (
                    <meta property="article:author" content={article.author_name} />
                )}
                <meta name="twitter:title" content={`${article.title} | مركز بدر`} />
                <meta name="twitter:description" content={article.description || article.title} />
                <meta name="twitter:image" content={ogImage} />
            </Head>

            <article className="py-12 md:py-20 px-6 lg:px-24">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-background/60 mb-8 max-w-4xl mx-auto">
                    <Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
                    <ChevronRight size={14} />
                    <Link href="/articles" className="hover:text-primary transition-colors">{t('pages.articles.title')}</Link>
                    <ChevronRight size={14} />
                    <span className="text-background font-medium truncate">{article.title}</span>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-background leading-tight">
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-background/60 border-b border-border/30 pb-6">
                        {article.author_name && (
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                {article.author_name}
                            </span>
                        )}
                        {article.published_at && (
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {new Date(article.published_at).toLocaleDateString('ar-EG', { 
                                    year: 'numeric', month: 'long', day: 'numeric' 
                                })}
                            </span>
                        )}
                    </div>

                    {/* Banner Image */}
                    {article.image && (
                        <div className="rounded-3xl overflow-hidden shadow-lg">
                            <img 
                                src={`/storage/${article.image}`} 
                                alt={article.title} 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    {article.description && (
                        <p className="text-xl text-background/80 leading-relaxed font-medium border-r-4 border-primary pr-6">
                            {article.description}
                        </p>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-invert max-w-none text-background leading-relaxed text-justify whitespace-pre-line">
                        {article.content}
                    </div>

                    {/* Back Link */}
                    <div className="pt-8 border-t border-border/30">
                        <Link 
                            href="/articles" 
                            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                        >
                            ← {t('pages.articles.back')}
                        </Link>
                    </div>
                </div>

                {/* JSON-LD structured data — moved here to avoid any potential sibling conflict with <Head> */}
                <ArticleSchema article={article} canonicalUrl={articleUrl} />
                <BreadcrumbSchema items={[
                    { name: 'الرئيسية', url: '/' },
                    { name: 'المقالات', url: '/articles' },
                    { name: article.title },
                ]} />
            </article>
        </>
    );
}

ArticleShow.layout = (page) => <PublicLayout children={page} />;

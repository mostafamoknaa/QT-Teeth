import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Save } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';

export default function ArticleForm({ article = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: article ? 'PUT' : 'POST',
        title: article?.title || '',
        description: article?.description || '',
        content: article?.content || '',
        is_published: !!article?.is_published,
        author_name: article?.author_name || 'Admin',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = article 
            ? `/admin/articles/${article?.id}` 
            : '/admin/articles';
        
        // Use post for both to handle multipart/form-data with _method spoofing
        post(url);
    };

    return (
        <>
            <Head title={article ? t('admin.update_article') : t('admin.create_article')} />
            
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/articles">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {article ? t('admin.update_article') : t('admin.create_article')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('admin.fill_article_details') || 'Fill in the details for your blog post.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title">{t('admin.title')}</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                placeholder={t('admin.title')}
                            />
                            {errors.title && <p className="text-sm text-destructive">{getErrorMessage(errors.title)}</p>}
                        </div>

                        {/* Author */}
                        <div className="space-y-2">
                            <Label htmlFor="author_name">{t('admin.author_name')}</Label>
                            <Input 
                                id="author_name" 
                                value={data.author_name} 
                                onChange={e => setData('author_name', e.target.value)} 
                            />
                            {errors.author_name && <p className="text-sm text-destructive">{getErrorMessage(errors.author_name)}</p>}
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <Label htmlFor="image">{t('admin.banner_image')}</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="image" 
                                    type="file" 
                                    className="cursor-pointer" 
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {article?.image && !data.image && (
                                    <div className="h-10 w-10 rounded border overflow-hidden">
                                        <img src={`/storage/${article.image}`} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="text-sm text-destructive">{getErrorMessage(errors.image)}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">{t('admin.short_description')}</Label>
                            <textarea 
                                id="description"
                                className="w-full min-h-[100px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder={t('admin.short_description')}
                            />
                            {errors.description && <p className="text-sm text-destructive">{getErrorMessage(errors.description)}</p>}
                        </div>

                        {/* Content */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="content">{t('admin.content')}</Label>
                            <textarea 
                                id="content"
                                className="w-full min-h-[300px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder={t('admin.content')}
                            />
                            {errors.content && <p className="text-sm text-destructive">{getErrorMessage(errors.content)}</p>}
                        </div>

                        {/* Publish Status */}
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="is_published" 
                                checked={data.is_published}
                                onCheckedChange={(checked) => setData('is_published', checked)}
                            />
                            <Label htmlFor="is_published" className="font-medium">{t('admin.publish_immediately')}</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-semibold">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/articles">{t('admin.cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {article ? t('admin.update_article') : t('admin.create_article')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

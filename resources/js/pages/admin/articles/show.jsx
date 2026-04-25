import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Edit, Trash2, Calendar, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function ArticleShow({ article }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/articles/${article.id}`, {
            onSuccess: () => setDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title={article.title} />
            
            <div className="p-6 max-w-4xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/articles">
                                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{article.title}</h1>
                            <p className="text-muted-foreground">{t('admin.article_details')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/admin/articles/${article.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> {t('admin.edit')}
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> {t('admin.delete')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-6">
                            {article.image && (
                                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                    <img 
                                        src={`/storage/${article.image}`} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{t('admin.title')}</label>
                                <p className="text-xl font-bold">{article.title}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{t('admin.description')}</label>
                                <p className="text-base text-muted-foreground">{article.description}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">{t('admin.content')}</label>
                                <div className="prose dark:prose-invert max-w-none border p-4 rounded-md bg-muted/20">
                                    {article.content}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-4">
                            <h2 className="font-semibold border-b pb-2">{t('admin.metadata')}</h2>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.status')}</label>
                                <div>
                                    {article.is_published ? (
                                        <Badge variant="success">{t('admin.published')}</Badge>
                                    ) : (
                                        <Badge variant="secondary">{t('admin.draft')}</Badge>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.author')}</label>
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{article.author_name}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.published_at')}</label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString('ar-EG') : 'N/A'}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.created_at')}</label>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(article.created_at).toLocaleDateString('ar-EG')}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.slug')}</label>
                                <div className="text-sm font-mono break-all bg-muted p-2 rounded">
                                    {article.slug}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.delete_warning') || 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف العنصر بشكل دائم.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)}>{t('admin.cancel')}</Button>
                        <Button variant="destructive" onClick={handleDelete}>{t('admin.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

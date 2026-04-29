import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { translatePaginationLabel } from '@/lib/translate-pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ArticlesIndex({ articles, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/articles/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/articles', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/articles', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('admin.articles')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.articles')}</h1>
                        <p className="text-muted-foreground">{t('admin.manage_blog_posts')}</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/articles/create">
                            <Plus className="mr-2 h-4 w-4" /> {t('admin.add_article')}
                        </Link>
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2">
                    <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                        <Input
                            type="text"
                            placeholder={t('admin.search_placeholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit">{t('admin.search')}</Button>
                    </form>
                    {search && (
                        <Button variant="outline" onClick={handleClearSearch}>
                            مسح البحث
                        </Button>
                    )}
                </div>

                <div className="border rounded-lg overflow-x-auto bg-card">
                    <table className="w-full text-sm min-w-[800px] table-auto">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.title')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.author')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.status')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.published_at')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {articles.data.map((article) => (
                                <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">{article.title}</td>
                                    <td className="px-4 py-3">{article.author_name}</td>
                                    <td className="px-4 py-3">
                                        {article.is_published ? (
                                            <Badge variant="success">{t('admin.published')}</Badge>
                                        ) : (
                                            <Badge variant="secondary">{t('admin.draft')}</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {article.published_at ? new Date(article.published_at).toLocaleDateString('ar-EG') : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button variant="ghost" size="icon" asChild title={t('admin.view')}>
                                            <Link href={`/admin/articles/${article.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/articles/${article.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(article.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {articles.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                                        لا توجد مقالات متاحة
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {articles.links && (
                    <div className="flex justify-center gap-2">
                        {articles.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url.replace(window.location.origin, ''), 
                                            search ? { search } : {}, 
                                            { preserveScroll: true }
                                        );
                                    }
                                }}
                                disabled={!link.url}
                                className="text-xs"
                                dangerouslySetInnerHTML={{ __html: translatePaginationLabel(link.label, locale) }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure')}</DialogTitle>
                        <DialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف المقالة وبيانها من الخادم نهائياً.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>{t('admin.cancel')}</Button>
                        <Button variant="destructive" onClick={handleDelete}>{t('admin.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

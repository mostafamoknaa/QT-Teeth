import { Head, Link, useForm, router } from '@inertiajs/react';
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

export default function OffersIndex({ offers, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/offers/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/offers', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/offers', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('nav.offers')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('nav.offers')}</h1>
                        <p className="text-muted-foreground">{t('admin.manage_blog_posts')}</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/offers/create">
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
                                <th className="px-4 py-3 text-start font-medium">{t('admin.image')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.title')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.status')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.created_at')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {offers.data.map((offer) => (
                                <tr key={offer.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                                            {offer.image ? (
                                                <img src={`/storage/${offer.image}`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px]">No img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium truncate">{offer.title}</td>
                                    <td className="px-4 py-3">
                                        {offer.is_active ? (
                                            <Badge variant="success">{t('admin.published')}</Badge>
                                        ) : (
                                            <Badge variant="secondary">{t('admin.draft')}</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {new Date(offer.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <Button variant="ghost" size="icon" asChild title={t('admin.view')}>
                                            <Link href={`/admin/offers/${offer.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/offers/${offer.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(offer.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {offers.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                                        لا توجد عروض متاحة
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {offers.links && (
                    <div className="flex justify-center gap-2">
                        {offers.links.map((link, index) => (
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
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف العرض نهائياً.
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

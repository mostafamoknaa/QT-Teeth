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

export default function UsersIndex({ users, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/users/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/users', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('admin.users')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.users')}</h1>
                        <p className="text-muted-foreground">{t('admin.manage_users')}</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="mr-2 h-4 w-4" /> {t('admin.add_user')}
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
                            {t('admin.clear_search') || 'مسح البحث'}
                        </Button>
                    )}
                </div>

                <div className="border rounded-lg overflow-hidden bg-card">
                    <table className="w-full text-sm [table-layout:fixed]">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">{t('admin.name')}</th>
                                <th className="px-4 py-3 text-left font-medium">{t('admin.email')}</th>
                                <th className="px-4 py-3 text-left font-medium">{t('admin.role')}</th>
                                <th className="px-4 py-3 text-left font-medium">{t('admin.created_at')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users?.data?.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium">{user.name}</td>
                                        <td className="px-4 py-3" dir="ltr">{user.email}</td>
                                        <td className="px-4 py-3">
                                            {user.is_admin ? (
                                                <Badge variant="default">{t('admin.admin')}</Badge>
                                            ) : (
                                                <Badge variant="secondary">{t('admin.user')}</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString('ar-EG')}
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/users/${user.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(user.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                                        {t('admin.no_users')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links && (
                    <div className="flex justify-center gap-2">
                        {users.links.map((link, index) => (
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
                            {t('admin.delete_user_warning') || 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المستخدم بشكل دائم.'}
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

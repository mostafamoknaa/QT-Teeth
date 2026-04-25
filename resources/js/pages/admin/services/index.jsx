import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, HeartPulse, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function ServicesIndex({ services, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/services/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/services', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/services', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('admin.services')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center text-foreground font-black">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.services')}</h1>
                        <p className="text-muted-foreground">إدارة الخدمات والعلاجات السنية المقدمة</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/services/create">
                            <Plus className="mr-2 h-4 w-4" /> {t('admin.add_service')}
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

                <div className="border rounded-lg overflow-hidden bg-card">
                    <table className="w-full text-sm [table-layout:fixed]">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.service_title')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.description')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.order')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {services?.data?.length > 0 ? (
                                services.data.map((service) => (
                                    <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                                                    {service.image ? (
                                                        <img src={`/storage/${service.image}`} className="w-full h-full object-cover rounded-lg" />
                                                    ) : (
                                                        <HeartPulse size={20} className="text-primary" />
                                                    )}
                                                </div>
                                                <span className="font-semibold">{service.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 max-w-xs truncate text-muted-foreground">
                                            {service.description}
                                        </td>
                                        <td className="px-4 py-3">{service.order}</td>
                                        <td className="px-4 py-3 text-right space-x-2 font-black">
                                            <Button variant="ghost" size="icon" asChild title={t('admin.view')}>
                                                <Link href={`/admin/services/${service.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild title="تعديل الخدمة والمقارنات">
                                                <Link href={`/admin/services/${service.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(service.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-muted-foreground">
                                        لا توجد خدمات متاحة. أضف أول خدمة سنية!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {services.links && (
                    <div className="flex justify-center gap-2">
                        {services.links.map((link, index) => (
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
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف الخدمة وجميع المقارنات المرتبطة بها من الخادم نهائياً.
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

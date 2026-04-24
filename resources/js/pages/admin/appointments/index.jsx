import { Head, Link, useForm, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
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

export default function AppointmentsIndex({ appointments, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/appointments/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/appointments', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/appointments', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('admin.appointments')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.appointments')}</h1>
                        <p className="text-muted-foreground">{t('admin.appointments')}</p>
                    </div>
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
                    <table className="w-full text-sm table-fixed">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.patient_name')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.phone')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.service')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('nav.offers')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('booking.form.branch')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.date')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {appointments?.data?.length > 0 ? (
                                appointments.data.map((appointment) => (
                                    <tr key={appointment.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3 font-medium">{appointment.name}</td>
                                        <td className="px-4 py-3" >{appointment.phone}</td>
                                        <td className="px-4 py-3">
                                            {appointment.service ? (
                                                <Badge variant="outline">{appointment.service.title}</Badge>
                                            ) : (
                                                <span className="text-muted-foreground">{t('admin.not_specified') || 'غير محدد'}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-primary">
                                            {appointment.offer || '-'}
                                        </td>
                                        <td className="px-4 py-3">{appointment.branch || t('admin.not_specified') || 'غير محدد'}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(appointment.created_at).toLocaleDateString('ar-EG')}
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/appointments/${appointment.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(appointment.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">
                                        لا توجد مواعيد متاحة
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {appointments.links && (
                    <div className="flex justify-center gap-2">
                        {appointments.links.map((link, index) => (
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
                        <DialogTitle>هل أنت متأكد تماماً؟</DialogTitle>
                        <DialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف الموعد وبيانه من الخادم نهائياً.
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

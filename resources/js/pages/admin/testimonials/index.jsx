import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Video, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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

export default function TestimonialsIndex({ testimonials, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/testimonials/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/testimonials', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/testimonials', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title={t('admin.testimonials')} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.testimonials')}</h1>
                        <p className="text-muted-foreground">إدارة آراء ومراجعات العملاء</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/testimonials/create">
                            <Plus className="mr-2 h-4 w-4" /> {t('admin.add_testimonial')}
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
                                <th className="px-4 py-3 text-start font-medium">{t('admin.client_name')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.service_received')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.rating')}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.media')}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {testimonials?.data?.length > 0 ? (
                                testimonials.data.map((testimonial) => (
                                    <tr key={testimonial.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={testimonial.image ? `/storage/${testimonial.image}` : ''} />
                                                    <AvatarFallback>{testimonial.client_name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold">{testimonial.client_name}</div>
                                                    <div className="text-xs text-muted-foreground">{testimonial.client_title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-semibold">{testimonial.service_name}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-yellow-500">
                                                {testimonial.rating} <Star size={14} className="ml-1 fill-current" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {testimonial.video_url ? (
                                                <div className="flex items-center text-primary">
                                                    <Video size={16} className="mr-1" /> فيديو
                                                </div>
                                            ) : 'صورة'}
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2 font-black">
                                            <Button variant="ghost" size="icon" asChild title={t('admin.view')}>
                                                <Link href={`/admin/testimonials/${testimonial.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(testimonial.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                                        لا توجد تقييمات متاحة
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {testimonials.links && (
                    <div className="flex justify-center gap-2">
                        {testimonials.links.map((link, index) => (
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
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف التقييم وبيانه من الخادم نهائياً.
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

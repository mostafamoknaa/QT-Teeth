import { Head, Link, useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function HomeVideosIndex({ videos }) {
    const { t } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = () => {
        if (deleteId) {
            destroy(`/admin/home-videos/${deleteId}`, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    return (
        <>
            <Head title={t('admin.home_videos') || 'فيديوهات الصفحة الرئيسية'} />
            
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.home_videos') || 'فيديوهات الصفحة الرئيسية'}</h1>
                        <p className="text-muted-foreground">{t('admin.home_videos_desc') || 'إدارة الفيديوهات الأربعة المعروضة في الصفحة الرئيسية'}</p>
                    </div>
                    <Button asChild disabled={videos.total >= 4}>
                        <Link 
                            href={videos.total >= 4 ? '#' : "/admin/home-videos/create"}
                            className={videos.total >= 4 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                        >
                            <Plus className="mr-2 h-4 w-4" /> {t('admin.add_home_video') || 'إضافة فيديو جديد'}
                        </Link>
                    </Button>
                </div>

                <div className="border rounded-lg overflow-x-auto bg-card">
                    <table className="w-full text-sm min-w-[800px] table-auto">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.video_thumbnail') || 'الغلاف'}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.video_title') || 'العنوان'}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.video_type') || 'النوع'}</th>
                                <th className="px-4 py-3 text-start font-medium">{t('admin.video_order') || 'الترتيب'}</th>
                                <th className="px-4 py-3 text-right font-medium">{t('admin.actions') || 'العمليات'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {videos?.data?.length > 0 ? (
                                videos.data.map((video) => (
                                    <tr key={video.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="h-12 w-20 rounded-md border overflow-hidden bg-muted">
                                                <img 
                                                    src={video.thumbnail ? `/storage/${video.thumbnail}` : 'https://placehold.co/120x90?text=No+Cover'} 
                                                    className="w-full h-full object-cover" 
                                                    alt={video.title || 'Thumbnail'} 
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-semibold">{video.title || 'بلا عنوان'}</td>
                                        <td className="px-4 py-3">
                                            {video.youtube_url ? (
                                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{t('admin.video_youtube') || 'YouTube'}</span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{t('admin.video_local') || 'فيديو محلي'}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{video.order}</td>
                                        <td className="px-4 py-3 text-right space-x-2 text-foreground font-black">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/home-videos/${video.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(video.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">
                                        {t('admin.no_home_videos') || 'لا توجد فيديوهات مضافة بعد'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {videos.links && videos.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {videos.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url.replace(window.location.origin, ''), 
                                            {}, 
                                            { preserveScroll: true }
                                        );
                                    }
                                }}
                                disabled={!link.url}
                                className="text-xs"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure') || 'هل أنت متأكد؟'}</DialogTitle>
                        <DialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف الفيديو نهائياً من الخادم وقاعدة البيانات.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>{t('admin.cancel') || 'إلغاء'}</Button>
                        <Button variant="destructive" onClick={handleDelete}>{t('admin.delete') || 'حذف'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

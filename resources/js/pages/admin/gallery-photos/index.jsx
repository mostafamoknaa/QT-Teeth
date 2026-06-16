import { Head, useForm, router, Link } from '@inertiajs/react';
import { Save, Plus, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { translatePaginationLabel } from '@/lib/translate-pagination';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function GalleryPhotosIndex({ photos, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        before_image: null,
        after_image: null,
        order: 0,
    });

    const handleUpload = (e) => {
        e.preventDefault();
        post('/admin/gallery-photos', {
            onSuccess: () => {
                reset();
                toast.success('تمت إضافة الحالة لمعرض الصور بنجاح.');
            },
        });
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/admin/gallery-photos/${deleteId}`, {
                onSuccess: () => {
                    setDeleteId(null);
                    toast.success('تم حذف الحالة من معرض الصور بنجاح.');
                },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/gallery-photos', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/gallery-photos', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="معرض الصور" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-3 text-foreground font-black border-b pb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">معرض الصور (قبل / بعد)</h1>
                        <p className="text-muted-foreground">إدارة صور الحالات السنية لعرضها في معرض الصور والصفحة الرئيسية للموقع</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Photo Form */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleUpload} className="space-y-6 bg-card border rounded-[2rem] p-6 shadow-sm">
                            <h3 className="font-black text-lg text-foreground flex items-center gap-2 border-b pb-2">
                                <Plus className="h-5 w-5 text-primary" />
                                إضافة حالة جديدة للمعرض
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-bold text-muted-foreground">عنوان الحالة (اختياري)</Label>
                                    <Input
                                        id="title"
                                        placeholder="مثال: ابتسامة هوليوود كاملة"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="h-12 rounded-xl"
                                    />
                                    {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="before_image" className="text-sm font-bold text-muted-foreground">صورة قبل العلاج (Before)</Label>
                                        <Input
                                            id="before_image"
                                            type="file"
                                            accept="image/*"
                                            className="h-12 rounded-xl cursor-pointer"
                                            onChange={e => setData('before_image', e.target.files[0])}
                                        />
                                        {errors.before_image && <p className="text-xs text-destructive">{errors.before_image}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="after_image" className="text-sm font-bold text-muted-foreground">صورة بعد العلاج (After)</Label>
                                        <Input
                                            id="after_image"
                                            type="file"
                                            accept="image/*"
                                            className="h-12 rounded-xl cursor-pointer"
                                            onChange={e => setData('after_image', e.target.files[0])}
                                        />
                                        {errors.after_image && <p className="text-xs text-destructive">{errors.after_image}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-sm font-bold text-muted-foreground">ترتيب العرض</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', e.target.value)}
                                        className="h-12 rounded-xl"
                                    />
                                    {errors.order && <p className="text-xs text-destructive">{errors.order}</p>}
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 rounded-xl font-bold" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" /> حفظ الحالة
                            </Button>
                        </form>
                    </div>

                    {/* Gallery Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search Bar */}
                        <div className="flex gap-2">
                            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                                <Input
                                    type="text"
                                    placeholder="ابحث عن حالة بالاسم..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 h-12 rounded-xl"
                                />
                                <Button type="submit" className="h-12 px-6 rounded-xl">بحث</Button>
                            </form>
                            {search && (
                                <Button variant="outline" onClick={handleClearSearch} className="h-12 rounded-xl">
                                    مسح
                                </Button>
                            )}
                        </div>

                        {photos?.data?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {photos.data.map((photo) => (
                                    <div key={photo.id} className="group relative bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                        <div className="grid grid-cols-2 aspect-video">
                                            <div className="relative">
                                                <img src={`/storage/${photo.before_image}`} className="w-full h-full object-cover border-r border-border/50" alt="Before" />
                                                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">قبل</span>
                                            </div>
                                            <div className="relative">
                                                <img src={`/storage/${photo.after_image}`} className="w-full h-full object-cover" alt="After" />
                                                <span className="absolute bottom-2 left-2 bg-primary text-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">بعد</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-muted/20 flex justify-between items-center border-t border-border/30">
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-sm text-foreground truncate max-w-[180px]">{photo.title || 'بدون عنوان'}</h4>
                                                <p className="text-[10px] text-muted-foreground font-mono">الترتيب: {photo.order}</p>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                                                onClick={() => setDeleteId(photo.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/10 rounded-[2rem] border border-dashed border-border/50 flex flex-col items-center justify-center space-y-3">
                                <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                                <p className="text-muted-foreground font-medium italic">لا توجد صور في المعرض حالياً.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {photos.links && (
                            <div className="flex justify-center gap-2 pt-4">
                                {photos.links.map((link, index) => (
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
                                        className="text-xs h-9 w-9 rounded-lg p-0"
                                        dangerouslySetInnerHTML={{ __html: translatePaginationLabel(link.label, locale) }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>تأكيد الحذف</DialogTitle>
                        <DialogDescription>
                            هل أنت متأكد من رغبتك في حذف هذه الصورة من معرض الحالات نهائياً؟ لا يمكن التراجع عن هذا القرار.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>إلغاء</Button>
                        <Button variant="destructive" onClick={handleDelete}>تأكيد الحذف</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

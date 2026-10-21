import { Head, useForm, router, Link } from '@inertiajs/react';
import { Save, Plus, Trash2, Image as ImageIcon, Star, UploadCloud, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useRef } from 'react';
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

export default function RatingsIndex({ ratings, search: initialSearch }) {
    const { t, locale } = useTranslations();
    const [deleteId, setDeleteId] = useState(null);
    const [previewModalImage, setPreviewModalImage] = useState(null);
    const [search, setSearch] = useState(initialSearch || '');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        image: null,
        images: [],
        order: 0,
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 1) {
            setData('image', files[0]);
            setData('images', []);
            setImagePreview(URL.createObjectURL(files[0]));
        } else if (files.length > 1) {
            setData('images', files);
            setData('image', null);
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setData('image', null);
            setData('images', []);
            setImagePreview(null);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!data.image && (!data.images || data.images.length === 0)) {
            toast.error('يرجى اختيار صورة التقييم أولاً');
            return;
        }

        post('/admin/ratings', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                toast.success('تمت إضافة صورة التقييم بنجاح.');
            },
            onError: (err) => {
                toast.error('حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى.');
            }
        });
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/admin/ratings/${deleteId}`, {
                onSuccess: () => {
                    setDeleteId(null);
                    toast.success('تم حذف صورة التقييم بنجاح.');
                },
                onError: () => {
                    toast.error('حدث خطأ أثناء الحذف.');
                }
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/ratings', { search: search || undefined }, {
            preserveScroll: true
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/ratings', {}, {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="إدارة صور التقييمات" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 text-foreground font-black border-b pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">صور التقييمات / Ratings</h1>
                        <p className="text-muted-foreground text-sm">
                            إدارة صور تقييمات وآراء العملاء لعرضها في قسم "التقييمات" في الصفحة الرئيسية للموقع
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Photo Form */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleUpload} className="space-y-6 bg-card border rounded-[2rem] p-6 shadow-sm sticky top-6">
                            <h3 className="font-black text-lg text-foreground flex items-center gap-2 border-b pb-3">
                                <Plus className="h-5 w-5 text-amber-500" />
                                إضافة صورة تقييم جديدة
                            </h3>

                            <div className="space-y-4">
                                {/* Image upload box */}
                                <div className="space-y-2">
                                    <Label htmlFor="image_input" className="text-sm font-bold text-foreground flex items-center justify-between">
                                        <span>صورة التقييم <span className="text-red-500">*</span></span>
                                        <span className="text-xs text-muted-foreground font-normal">JPG, PNG, WebP</span>
                                    </Label>

                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                                            imagePreview ? 'border-amber-500/50 bg-amber-500/5' : 'border-border/60 hover:border-amber-500/40 bg-muted/20'
                                        }`}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            id="image_input"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />

                                        {imagePreview ? (
                                            <div className="space-y-3">
                                                <div className="relative max-h-56 rounded-xl overflow-hidden border border-border/50 mx-auto bg-black/5 flex items-center justify-center">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Preview" 
                                                        className="max-h-56 w-auto object-contain"
                                                    />
                                                </div>
                                                <p className="text-xs text-amber-600 font-semibold">
                                                    {data.images?.length > 1 
                                                        ? `تم اختيار ${data.images.length} صور (انقر للتغيير)`
                                                        : 'تم اختيار الصورة (انقر للتغيير)'}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="py-6 flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                                    <UploadCloud className="w-6 h-6" />
                                                </div>
                                                <p className="text-sm font-bold text-foreground">انقر لاختيار صورة التقييم</p>
                                                <p className="text-xs text-muted-foreground">يمكنك اختيار صورة واحدة أو عدة صور معاً</p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-bold text-muted-foreground">
                                        عنوان أو ملاحظة (اختياري)
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="مثال: تقييم تجربة تجميل الأسنان"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="h-12 rounded-xl"
                                    />
                                    {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-sm font-bold text-muted-foreground">ترتيب الظهور</Label>
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

                            <Button 
                                type="submit" 
                                className="w-full h-12 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-md hover:shadow-lg" 
                                disabled={processing}
                            >
                                <Save className="ml-2 h-4 w-4" /> 
                                {processing ? 'جاري الرفع...' : 'رفع وحفظ صورة التقييم'}
                            </Button>
                        </form>
                    </div>

                    {/* Ratings Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search Bar */}
                        <div className="flex gap-2">
                            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                                <Input
                                    type="text"
                                    placeholder="ابحث في التقييمات بالعنوان..."
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

                        {ratings?.data?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {ratings.data.map((rating) => (
                                    <div 
                                        key={rating.id} 
                                        className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                                    >
                                        <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden cursor-pointer" onClick={() => setPreviewModalImage(`/storage/${rating.image}`)}>
                                            <img 
                                                src={`/storage/${rating.image}`} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                alt={rating.title || 'Rating'} 
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
                                                    <Eye className="w-5 h-5" />
                                                </span>
                                            </div>
                                            <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow">
                                                <Star className="w-3 h-3 fill-slate-950" />
                                                تقييم
                                            </span>
                                        </div>

                                        <div className="p-3.5 bg-muted/20 flex justify-between items-center border-t border-border/40">
                                            <div className="space-y-0.5 truncate pr-2">
                                                <h4 className="font-bold text-xs text-foreground truncate">{rating.title || 'صورة تقييم'}</h4>
                                                <p className="text-[10px] text-muted-foreground font-mono">الترتيب: {rating.order}</p>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full flex-shrink-0"
                                                onClick={() => setDeleteId(rating.id)}
                                                title="حذف"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/10 rounded-[2rem] border border-dashed border-border/50 flex flex-col items-center justify-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <Star className="h-8 w-8 text-amber-500/60" />
                                </div>
                                <p className="text-foreground font-bold">لا توجد صور تقييمات مضافة حتى الآن</p>
                                <p className="text-muted-foreground text-xs max-w-sm">
                                    قم برفع صور لتقييمات عملائك من النموذج المقابل لتظهر في الصفحة الرئيسية في قسم التقييمات.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {ratings?.links && ratings.links.length > 3 && (
                            <div className="flex justify-center gap-2 pt-4">
                                {ratings.links.map((link, index) => (
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

            {/* Image Preview Modal */}
            <Dialog open={!!previewModalImage} onOpenChange={(open) => !open && setPreviewModalImage(null)}>
                <DialogContent className="max-w-3xl p-2 bg-black/90 border-white/20">
                    {previewModalImage && (
                        <div className="relative flex items-center justify-center max-h-[80vh] p-2">
                            <img 
                                src={previewModalImage} 
                                alt="Preview" 
                                className="max-h-[75vh] w-auto object-contain rounded-xl"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>تأكيد الحذف</DialogTitle>
                        <DialogDescription>
                            هل أنت متأكد من رغبتك في حذف صورة التقييم هذه نهائياً؟ لا يمكن التراجع عن هذا الإجراء.
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

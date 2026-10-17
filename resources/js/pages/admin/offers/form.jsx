import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Save, Tag, Percent, DollarSign, Calendar, Layers } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';

export default function OfferForm({ offer = null, services = [] }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: offer ? 'PUT' : 'POST',
        title: offer?.title || '',
        badge_text: offer?.badge_text || '',
        content: offer?.content || '',
        is_active: offer ? !!offer.is_active : true,
        image: null,
        discount_percentage: offer?.discount_percentage || '',
        original_price: offer?.original_price || '',
        discounted_price: offer?.discounted_price || '',
        valid_until: offer?.valid_until ? offer.valid_until.substring(0, 10) : '',
        service_id: offer?.service_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = offer ? `/admin/offers/${offer?.id}` : '/admin/offers';
        post(url);
    };

    const BADGE_SUGGESTIONS = ['عرض محدود', 'جديد', 'الأكثر مبيعاً', 'حصري', 'مميز', 'وفر أكثر'];

    return (
        <>
            <Head title={offer ? 'تعديل عرض' : 'إضافة عرض جديد'} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/offers">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {offer ? 'تعديل عرض' : 'إضافة عرض جديد'}
                        </h1>
                        <p className="text-muted-foreground">أدخل تفاصيل العرض والخصومات المتاحة.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl">
                    {/* ── Section: Basic Info ── */}
                    <div>
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Layers size={15} /> المعلومات الأساسية
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title">{t('admin.title')}</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="مثال: عرض زراعة الأسنان"
                                />
                                {errors.title && <p className="text-sm text-destructive">{getErrorMessage(errors.title)}</p>}
                            </div>

                            {/* Badge Text */}
                            <div className="space-y-2">
                                <Label htmlFor="badge_text" className="flex items-center gap-1.5">
                                    <Tag size={13} /> نص الشارة (Badge)
                                </Label>
                                <Input
                                    id="badge_text"
                                    value={data.badge_text}
                                    onChange={e => setData('badge_text', e.target.value)}
                                    placeholder="مثال: عرض محدود"
                                />
                                {/* Quick suggestion pills */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {BADGE_SUGGESTIONS.map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setData('badge_text', s)}
                                            className={`text-xs px-3 py-1 rounded-full border transition-colors ${data.badge_text === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary hover:text-primary'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                                {errors.badge_text && <p className="text-sm text-destructive">{getErrorMessage(errors.badge_text)}</p>}
                            </div>

                            {/* Service Link */}
                            <div className="space-y-2">
                                <Label htmlFor="service_id">ربط بخدمة (اختياري)</Label>
                                <select
                                    id="service_id"
                                    value={data.service_id}
                                    onChange={e => setData('service_id', e.target.value)}
                                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">-- بدون ربط --</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))}
                                </select>
                                {errors.service_id && <p className="text-sm text-destructive">{getErrorMessage(errors.service_id)}</p>}
                            </div>

                            {/* Image */}
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="image">{t('admin.banner_image')}</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="image"
                                        type="file"
                                        className="cursor-pointer"
                                        onChange={e => setData('image', e.target.files[0])}
                                    />
                                    {offer?.image && !data.image && (
                                        <div className="h-12 w-20 rounded border overflow-hidden shrink-0">
                                            <img src={`/storage/${offer.image}`} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="text-sm text-destructive">{getErrorMessage(errors.image)}</p>}
                            </div>

                            {/* Content */}
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content">{t('admin.content')}</Label>
                                <textarea
                                    id="content"
                                    className="w-full min-h-[160px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="وصف العرض بالتفصيل..."
                                />
                                {errors.content && <p className="text-sm text-destructive">{getErrorMessage(errors.content)}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ── Section: Pricing & Discount ── */}
                    <div className="border-t pt-6">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Percent size={15} /> التسعير والخصم
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Discount % */}
                            <div className="space-y-2">
                                <Label htmlFor="discount_percentage" className="flex items-center gap-1.5">
                                    <Percent size={13} /> نسبة الخصم
                                </Label>
                                <Input
                                    id="discount_percentage"
                                    value={data.discount_percentage}
                                    onChange={e => setData('discount_percentage', e.target.value)}
                                    placeholder="مثال: 30%"
                                />
                                {errors.discount_percentage && <p className="text-sm text-destructive">{getErrorMessage(errors.discount_percentage)}</p>}
                            </div>

                            {/* Original Price */}
                            <div className="space-y-2">
                                <Label htmlFor="original_price" className="flex items-center gap-1.5">
                                    <DollarSign size={13} /> السعر الأصلي
                                </Label>
                                <Input
                                    id="original_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.original_price}
                                    onChange={e => setData('original_price', e.target.value)}
                                    placeholder="0.00"
                                />
                                {errors.original_price && <p className="text-sm text-destructive">{getErrorMessage(errors.original_price)}</p>}
                            </div>

                            {/* Discounted Price */}
                            <div className="space-y-2">
                                <Label htmlFor="discounted_price" className="flex items-center gap-1.5">
                                    <DollarSign size={13} className="text-primary" /> سعر الخصم
                                </Label>
                                <Input
                                    id="discounted_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.discounted_price}
                                    onChange={e => setData('discounted_price', e.target.value)}
                                    placeholder="0.00"
                                />
                                {errors.discounted_price && <p className="text-sm text-destructive">{getErrorMessage(errors.discounted_price)}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ── Section: Validity & Status ── */}
                    <div className="border-t pt-6">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar size={15} /> الصلاحية والحالة
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Valid Until */}
                            <div className="space-y-2">
                                <Label htmlFor="valid_until">صالح حتى (اختياري — سيُخفى تلقائياً بعد هذا التاريخ)</Label>
                                <Input
                                    id="valid_until"
                                    type="date"
                                    value={data.valid_until}
                                    onChange={e => setData('valid_until', e.target.value)}
                                />
                                {errors.valid_until && <p className="text-sm text-destructive">{getErrorMessage(errors.valid_until)}</p>}
                            </div>

                            {/* Is Active */}
                            <div className="flex items-center gap-3 pt-8">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active" className="font-medium cursor-pointer">تفعيل العرض (يظهر للزوار)</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-semibold">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/offers">{t('admin.cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {offer ? t('admin.save') : 'إضافة العرض'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

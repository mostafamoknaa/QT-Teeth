import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Save } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';

export default function OfferForm({ offer = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: offer ? 'PUT' : 'POST',
        title: offer?.title || '',
        content: offer?.content || '',
        is_active: offer ? !!offer.is_active : true,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = offer 
            ? `/admin/offers/${offer?.id}` 
            : '/admin/offers';
        
        post(url);
    };

    return (
        <>
            <Head title={offer ? t('admin.update_article') : t('admin.create_article')} />
            
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
                        <p className="text-muted-foreground">
                            أدخل تفاصيل العرض والخصومات المتاحة.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title">{t('admin.title')}</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                placeholder={t('admin.title')}
                            />
                            {errors.title && <p className="text-sm text-destructive">{getErrorMessage(errors.title)}</p>}
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
                                    <div className="h-10 w-10 rounded border overflow-hidden">
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
                                className="w-full min-h-[300px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder={t('admin.content')}
                            />
                            {errors.content && <p className="text-sm text-destructive">{getErrorMessage(errors.content)}</p>}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="is_active" 
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active" className="font-medium">تفعيل العرض</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-semibold">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/offers">{t('admin.cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {offer ? t('admin.save') : t('admin.add_article')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';

export default function HomeVideoForm({ video = null }) {
    const { t } = useTranslations();
    const [sourceType, setSourceType] = useState(video?.youtube_url ? 'youtube' : 'file');

    const { data, setData, post, processing, errors } = useForm({
        _method: video ? 'PUT' : 'POST',
        title: video?.title || '',
        order: video?.order || 0,
        thumbnail: null,
        video_file: null,
        youtube_url: video?.youtube_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = video 
            ? `/admin/home-videos/${video.id}` 
            : '/admin/home-videos';
        
        post(url);
    };

    return (
        <>
            <Head title={video ? (t('admin.edit_home_video') || 'تعديل الفيديو') : (t('admin.add_home_video') || 'إضافة فيديو جديد')} />
            
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/home-videos">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {video ? (t('admin.edit_home_video') || 'تعديل الفيديو') : (t('admin.add_home_video') || 'إضافة فيديو جديد')}
                        </h1>
                        <p className="text-muted-foreground">
                            قم بملء البيانات التالية لعرض الفيديو في الصفحة الرئيسية
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">{t('admin.video_title') || 'العنوان'}</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                placeholder={t('admin.video_title') || 'العنوان (اختياري)'}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <Label htmlFor="order">{t('admin.video_order') || 'الترتيب'}</Label>
                            <Input 
                                id="order" 
                                type="number"
                                value={data.order} 
                                onChange={e => setData('order', e.target.value)} 
                            />
                            {errors.order && <p className="text-sm text-destructive">{errors.order}</p>}
                        </div>

                        {/* Thumbnail Image */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="thumbnail">{t('admin.video_thumbnail') || 'صورة الغلاف (Thumbnail)'}</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="thumbnail" 
                                    type="file" 
                                    accept="image/*"
                                    className="cursor-pointer" 
                                    onChange={e => setData('thumbnail', e.target.files[0])}
                                />
                                {video?.thumbnail && !data.thumbnail && (
                                    <div className="h-12 w-20 rounded border overflow-hidden bg-muted">
                                        <img src={`/storage/${video.thumbnail}`} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail}</p>}
                            <p className="text-xs text-muted-foreground">الصورة التي ستظهر للمستخدمين قبل الضغط على تشغيل الفيديو (يفضل نسبة أبعاد بورتريه رأسية)</p>
                        </div>

                        {/* Video Source Selection */}
                        <div className="space-y-2 md:col-span-2">
                            <Label>مصدر الفيديو</Label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="sourceType" 
                                        value="file" 
                                        checked={sourceType === 'file'}
                                        onChange={() => {
                                            setSourceType('file');
                                            setData('youtube_url', '');
                                        }}
                                        className="h-4 w-4"
                                    />
                                    <span>تحميل ملف فيديو محلي</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="sourceType" 
                                        value="youtube" 
                                        checked={sourceType === 'youtube'}
                                        onChange={() => {
                                            setSourceType('youtube');
                                            setData('video_file', null);
                                        }}
                                        className="h-4 w-4"
                                    />
                                    <span>رابط فيديو يوتيوب</span>
                                </label>
                            </div>
                        </div>

                        {/* Local Video File Upload */}
                        {sourceType === 'file' && (
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="video_file">{t('admin.video_file') || 'ملف الفيديو'}</Label>
                                <div className="flex items-center gap-4">
                                    <Input 
                                        id="video_file" 
                                        type="file" 
                                        accept="video/*"
                                        className="cursor-pointer" 
                                        onChange={e => setData('video_file', e.target.files[0])}
                                    />
                                    {video?.video_path && !data.video_file && (
                                        <div className="text-xs text-muted-foreground">
                                            ملف الفيديو الحالي: <span className="font-mono">{video.video_path.split('/').pop()}</span>
                                        </div>
                                    )}
                                </div>
                                {errors.video_file && <p className="text-sm text-destructive">{errors.video_file}</p>}
                                <p className="text-xs text-muted-foreground">الملفات المدعومة: MP4, WebM (الحد الأقصى للملف: 25 ميجابايت)</p>
                            </div>
                        )}

                        {/* YouTube URL */}
                        {sourceType === 'youtube' && (
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="youtube_url">{t('admin.video_youtube_url') || 'رابط يوتيوب'}</Label>
                                <Input 
                                    id="youtube_url" 
                                    type="url"
                                    value={data.youtube_url} 
                                    onChange={e => setData('youtube_url', e.target.value)} 
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                {errors.youtube_url && <p className="text-sm text-destructive">{errors.youtube_url}</p>}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-black">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/home-videos">{t('admin.cancel') || 'إلغاء'}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {video ? (t('admin.edit_home_video') || 'تعديل الفيديو') : (t('admin.add_home_video') || 'إضافة الفيديو')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

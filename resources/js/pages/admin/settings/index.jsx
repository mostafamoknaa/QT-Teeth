import { Head, useForm, usePage } from '@inertiajs/react';
import { Save, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { toast } from 'sonner';

export default function SettingsIndex() {
    const { t } = useTranslations();
    const { props } = usePage();
    const currentSettings = props.settings || {};

    const { data, setData, post, processing, errors } = useForm({
        whatsapp_number: currentSettings.whatsapp_number || '',
        copyrights: currentSettings.copyrights || '',
        home_cover_type: currentSettings.home_cover_type || 'image',
        home_cover_youtube_url: currentSettings.home_cover_youtube_url || '',
        home_cover_image: null,
        home_cover_video: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/site-settings', {
            preserveScroll: true,
            onSuccess: () => toast.success(t('admin.settings_saved') || 'Settings saved successfully!'),
        });
    };

    return (
        <>
            <Head title={t('admin.settings') || 'Settings'} />
            
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 text-foreground font-black border-b pb-4">
                    <Settings className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.site_settings') || 'Site Settings'}</h1>
                        <p className="text-muted-foreground">{t('admin.site_settings_desc') || 'Manage website globals like WhatsApp configurations and copyrights.'}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6 bg-card border rounded-lg p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp_number">{t('admin.whatsapp_number')}</Label>
                            <Input
                                id="whatsapp_number"
                                type="text"
                                style={{ direction: 'ltr' }}
                                placeholder="+201234567890"
                                value={data.whatsapp_number}
                                onChange={(e) => setData('whatsapp_number', e.target.value)}
                            />
                            {errors.whatsapp_number && <div className="text-sm text-destructive">{errors.whatsapp_number}</div>}
                            <p className="text-xs text-muted-foreground">{t('admin.whatsapp_number_hint')}</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="copyrights">{t('admin.copyrights_text')}</Label>
                            <Input
                                id="copyrights"
                                type="text"
                                placeholder="جميع الحقوق محفوظة Badr Dental © 2026"
                                value={data.copyrights}
                                onChange={(e) => setData('copyrights', e.target.value)}
                            />
                            {errors.copyrights && <div className="text-sm text-destructive">{errors.copyrights}</div>}
                            <p className="text-xs text-muted-foreground">{t('admin.copyrights_text_hint')}</p>
                        </div>

                        {/* Cover Section */}
                        <div className="border-t pt-6 space-y-6 md:col-span-2">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{t('admin.cover_settings') || 'إعدادات غلاف الصفحة الرئيسية (Hero Cover)'}</h3>
                                <p className="text-sm text-muted-foreground">تحديد نوع ومصدر خلفية الغلاف العلوي في الصفحة الرئيسية للموقع.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <Label>{t('admin.cover_type') || 'نوع الغلاف'}</Label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="home_cover_type" 
                                            value="image" 
                                            checked={data.home_cover_type === 'image'}
                                            onChange={() => setData('home_cover_type', 'image')}
                                            className="h-4 w-4"
                                        />
                                        <span>صورة غلاف</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="home_cover_type" 
                                            value="video" 
                                            checked={data.home_cover_type === 'video'}
                                            onChange={() => setData('home_cover_type', 'video')}
                                            className="h-4 w-4"
                                        />
                                        <span>فيديو غلاف (مرفوع)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="home_cover_type" 
                                            value="youtube" 
                                            checked={data.home_cover_type === 'youtube'}
                                            onChange={() => setData('home_cover_type', 'youtube')}
                                            className="h-4 w-4"
                                        />
                                        <span>رابط فيديو يوتيوب</span>
                                    </label>
                                </div>
                            </div>

                            {data.home_cover_type === 'image' && (
                                <div className="space-y-2">
                                    <Label htmlFor="home_cover_image">{t('admin.cover_image') || 'صورة الغلاف'}</Label>
                                    <div className="flex items-center gap-4">
                                        <Input 
                                            id="home_cover_image" 
                                            type="file" 
                                            accept="image/*"
                                            className="cursor-pointer" 
                                            onChange={e => setData('home_cover_image', e.target.files[0])}
                                        />
                                        {currentSettings.home_cover_image_path && !data.home_cover_image && (
                                            <div className="h-10 w-16 rounded border overflow-hidden">
                                                <img src={`/storage/${currentSettings.home_cover_image_path}`} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.home_cover_image && <div className="text-sm text-destructive">{errors.home_cover_image}</div>}
                                </div>
                            )}

                            {data.home_cover_type === 'video' && (
                                <div className="space-y-2">
                                    <Label htmlFor="home_cover_video">{t('admin.cover_video') || 'فيديو الغلاف'}</Label>
                                    <div className="flex items-center gap-4">
                                        <Input 
                                            id="home_cover_video" 
                                            type="file" 
                                            accept="video/*"
                                            className="cursor-pointer" 
                                            onChange={e => setData('home_cover_video', e.target.files[0])}
                                        />
                                        {currentSettings.home_cover_video_path && !data.home_cover_video && (
                                            <div className="text-xs text-muted-foreground font-mono">
                                                {currentSettings.home_cover_video_path.split('/').pop()}
                                            </div>
                                        )}
                                    </div>
                                    {errors.home_cover_video && <div className="text-sm text-destructive">{errors.home_cover_video}</div>}
                                    <p className="text-xs text-muted-foreground">الحد الأقصى لحجم الفيديو: 25 ميجابايت (يفضل أن يكون خفيفاً وسريع التحميل)</p>
                                </div>
                            )}

                            {data.home_cover_type === 'youtube' && (
                                <div className="space-y-2">
                                    <Label htmlFor="home_cover_youtube_url">{t('admin.cover_youtube') || 'رابط فيديو يوتيوب للغلاف'}</Label>
                                    <Input 
                                        id="home_cover_youtube_url" 
                                        type="url" 
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        value={data.home_cover_youtube_url}
                                        onChange={(e) => setData('home_cover_youtube_url', e.target.value)}
                                    />
                                    {errors.home_cover_youtube_url && <div className="text-sm text-destructive">{errors.home_cover_youtube_url}</div>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                t('admin.settings_saving')
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> {t('admin.settings_save')}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

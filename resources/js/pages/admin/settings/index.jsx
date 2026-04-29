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

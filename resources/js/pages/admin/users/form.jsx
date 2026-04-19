import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft } from 'lucide-react';

export default function UserForm({ user = null }) {
    const { t } = useTranslations();
    const isCreate = !user;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        is_admin: user?.is_admin || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCreate) {
            post('/admin/users');
        } else {
            put(`/admin/users/${user.id}`);
        }
    };

    return (
        <>
            <Head title={isCreate ? t('admin.add_user') : t('admin.edit_user')} />
            
            <div className="p-6 max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isCreate ? t('admin.add_user') : t('admin.edit_user')}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6 bg-card">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('admin.name')}</label>
                        <Input 
                            placeholder={t('admin.enter_name')}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('admin.email')}</label>
                        <Input 
                            type="email"
                            placeholder={t('admin.enter_email')}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t('admin.password')}
                            {!isCreate && <span className="text-muted-foreground text-sm ml-2">(اترك فارغ للاحتفاظ بالكلمة المرور الحالية)</span>}
                        </label>
                        <Input 
                            type="password"
                            placeholder={t('admin.enter_password')}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('admin.password_confirmation')}</label>
                        <Input 
                            type="password"
                            placeholder={t('admin.confirm_password')}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={errors.password_confirmation ? 'border-red-500' : ''}
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                    </div>

                    <div className="flex items-center space-x-3 rounded-md border border-input bg-transparent p-3">
                        <Checkbox
                            checked={data.is_admin}
                            onCheckedChange={(checked) => setData('is_admin', checked)}
                        />
                        <div className="space-y-1 leading-none">
                            <label className="block text-sm font-medium">{t('admin.admin_privileges')}</label>
                            <p className="text-sm text-muted-foreground">{t('admin.admin_description') || 'منح هذا المستخدم صلاحيات المسؤول'}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing ? t('admin.saving') : t('admin.save')}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/users">{t('admin.cancel')}</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

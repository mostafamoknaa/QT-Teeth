import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';

export default function DoctorForm({ doctor = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: doctor ? 'PUT' : 'POST',
        name: doctor?.name || '',
        specialty: doctor?.specialty || '',
        university: doctor?.university || '',
        bio: doctor?.bio || '',
        order: doctor?.order || 0,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = doctor 
            ? `/admin/doctors/${doctor?.id}` 
            : '/admin/doctors';
        
        post(url);
    };

    return (
        <>
            <Head title={doctor ? t('admin.update_doctor') : t('admin.create_doctor')} />
            
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/doctors">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {doctor ? t('admin.update_doctor') : t('admin.create_doctor')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('admin.fill_doctor_details') || 'Update the profile information for this doctor.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('admin.name')}</Label>
                            <Input 
                                id="name" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                placeholder={t('admin.name')}
                            />
                            {errors.name && <p className="text-sm text-destructive">{getErrorMessage(errors.name)}</p>}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <Label htmlFor="order">{t('admin.display_order')}</Label>
                            <Input 
                                id="order" 
                                type="number"
                                value={data.order} 
                                onChange={e => setData('order', e.target.value)} 
                            />
                            {errors.order && <p className="text-sm text-destructive">{getErrorMessage(errors.order)}</p>}
                        </div>

                        {/* Specialty */}
                        <div className="space-y-2">
                            <Label htmlFor="specialty">{t('admin.specialty')}</Label>
                            <Input 
                                id="specialty" 
                                value={data.specialty} 
                                onChange={e => setData('specialty', e.target.value)} 
                                placeholder={t('admin.specialty')}
                            />
                            {errors.specialty && <p className="text-sm text-destructive">{getErrorMessage(errors.specialty)}</p>}
                        </div>

                        {/* University */}
                        <div className="space-y-2">
                            <Label htmlFor="university">{t('admin.university')}</Label>
                            <Input 
                                id="university" 
                                value={data.university} 
                                onChange={e => setData('university', e.target.value)} 
                                placeholder={t('admin.university')}
                            />
                            {errors.university && <p className="text-sm text-destructive">{getErrorMessage(errors.university)}</p>}
                        </div>

                        {/* Image */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="image">{t('admin.profile_image')}</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="image" 
                                    type="file" 
                                    className="cursor-pointer" 
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {doctor?.image && !data.image && (
                                    <div className="h-10 w-10 rounded-full border overflow-hidden">
                                        <img src={`/storage/${doctor.image}`} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="text-sm text-destructive">{getErrorMessage(errors.image)}</p>}
                        </div>

                        {/* Bio */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="bio">{t('admin.bio')}</Label>
                            <textarea 
                                id="bio"
                                className="w-full min-h-[150px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={data.bio}
                                onChange={e => setData('bio', e.target.value)}
                                placeholder={t('admin.bio')}
                            />
                            {errors.bio && <p className="text-sm text-destructive">{getErrorMessage(errors.bio)}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-black">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/doctors">{t('admin.cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {doctor ? t('admin.update_doctor') : t('admin.create_doctor')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

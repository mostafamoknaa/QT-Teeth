import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Edit, Trash2, GraduationCap, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function DoctorShow({ doctor }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/doctors/${doctor.id}`, {
            onSuccess: () => setDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title={doctor.name} />
            
            <div className="p-6 max-w-4xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/doctors">
                                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{doctor.name}</h1>
                            <p className="text-muted-foreground">{t('admin.doctor_details')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/admin/doctors/${doctor.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> {t('admin.edit')}
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> {t('admin.delete')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border bg-muted">
                            {doctor.image ? (
                                <img 
                                    src={`/storage/${doctor.image}`} 
                                    alt={doctor.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Stethoscope className="h-12 w-12 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Stethoscope className="h-5 w-5 text-primary" />
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.specialty')}</label>
                                        <p className="text-lg font-semibold">{doctor.specialty || t('admin.not_specified')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.university')}</label>
                                        <p className="text-lg font-semibold">{doctor.university || t('admin.not_specified')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <label className="text-sm font-medium text-muted-foreground">{t('admin.bio')}</label>
                                <p className="text-base whitespace-pre-wrap">{doctor.bio || t('admin.no_bio_provided')}</p>
                            </div>

                            <div className="flex justify-between items-center border-t pt-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.order')}</label>
                                    <p className="font-mono">{doctor.order}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.created_at')}</label>
                                    <p className="text-sm text-muted-foreground">{new Date(doctor.created_at).toLocaleDateString('ar-EG')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.delete_warning') || 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف العنصر بشكل دائم.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)}>{t('admin.cancel')}</Button>
                        <Button variant="destructive" onClick={handleDelete}>{t('admin.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

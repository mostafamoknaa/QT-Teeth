import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AppointmentShow({ appointment }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/appointments/${appointment.id}`);
    };

    return (
        <>
            <Head title={`${t('admin.appointment')} - ${appointment.name}`} />
            
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/appointments">
                            <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{t('admin.appointment_details')}</h1>
                        <p className="text-muted-foreground">{t('admin.view_appointment_details')} {appointment.name}.</p>
                    </div>
                    <div className="flex-1"></div>
                    <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> {t('admin.delete_appointment')}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.customer_information')}</CardTitle>
                        <CardDescription>{t('admin.submitted_on')} {new Date(appointment.created_at).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('admin.name')}</h3>
                                <p className="text-lg font-medium">{appointment.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('admin.phone')}</h3>
                                <div className="text-lg font-medium" dir="ltr">
                                    <span className='text-right block w-full'>
                                        {appointment.phone}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('admin.email')}</h3>
                                <p className="text-lg font-medium">{appointment.email || t('admin.not_provided')}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('booking.form.branch')}</h3>
                                <p className="text-lg font-medium">{appointment.branch || t('admin.not_specified')}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('admin.service')}</h3>
                                <p className="text-lg font-medium">{appointment.service ? appointment.service.title : t('admin.any_service')}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('admin.chosen_offer')}</h3>
                                <p className="text-lg font-medium text-primary font-bold">{appointment.offer || '-'}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('admin.message')}</h3>
                            <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
                                {appointment.message ? appointment.message : <span className="text-muted-foreground italic">{t('admin.no_message_provided')}</span>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.delete_user_warning')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>{t('admin.cancel')}</Button>
                        <Button variant="destructive" onClick={handleDelete}>{t('admin.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

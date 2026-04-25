import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Edit, Trash2, Star, Video, User } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function TestimonialShow({ testimonial }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/testimonials/${testimonial.id}`, {
            onSuccess: () => setDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title={testimonial.client_name} />
            
            <div className="p-6 max-w-4xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/testimonials">
                                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{testimonial.client_name}</h1>
                            <p className="text-muted-foreground">{t('admin.testimonial_details')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" /> {t('admin.edit')}
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                            <Trash2 className="mr-2 h-4 w-4" /> {t('admin.delete')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
                                    {testimonial.image ? (
                                        <img src={`/storage/${testimonial.image}`} alt={testimonial.client_name} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-8 w-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{testimonial.client_name}</h2>
                                    <p className="text-muted-foreground">{testimonial.client_title}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 border-t pt-4">
                                <label className="text-sm font-medium text-muted-foreground">{t('admin.content')}</label>
                                <div className="p-4 bg-muted/20 rounded-lg italic text-lg leading-relaxed">
                                    "{testimonial.content}"
                                </div>
                            </div>

                            {testimonial.video_url && (
                                <div className="space-y-2 border-t pt-4">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Video className="h-4 w-4" /> {t('admin.video_url')}
                                    </label>
                                    <div className="p-3 bg-muted rounded flex items-center justify-between">
                                        <span className="text-sm font-mono truncate mr-4">{testimonial.video_url}</span>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={testimonial.video_url} target="_blank" rel="noopener noreferrer">View</a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-4">
                            <h2 className="font-semibold border-b pb-2">{t('admin.metadata')}</h2>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.rating')}</label>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.service')}</label>
                                <div className="font-medium text-primary">{testimonial.service_name || t('admin.not_specified')}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.order')}</label>
                                <div>{testimonial.order}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.created_at')}</label>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(testimonial.created_at).toLocaleDateString('ar-EG')}
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

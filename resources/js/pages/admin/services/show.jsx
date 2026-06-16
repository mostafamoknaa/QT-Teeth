import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Edit, Trash2, Layers, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function ServiceShow({ service }) {
    const { t, locale } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/services/${service.id}`, {
            onSuccess: () => setDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title={service.title} />
            
            <div className="p-6 max-w-5xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/services">
                                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{service.title}</h1>
                            <p className="text-muted-foreground">{t('admin.service_details')}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/admin/services/${service.id}/edit`}>
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
                            {service.image && (
                                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                    <img 
                                        src={`/storage/${service.image}`} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">{t('admin.title')}</label>
                                    <p className="text-xl font-bold">{service.title}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">{t('admin.description')}</label>
                                    <p className="text-base text-muted-foreground">{service.description}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">{t('admin.content')}</label>
                                    <div className="prose dark:prose-invert max-w-none border p-4 rounded-md bg-muted/20">
                                        {service.content}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQs Section */}
                        <div className="border rounded-lg p-6 bg-card space-y-6">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <Layers className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">الأسئلة الشائعة (FAQs)</h2>
                            </div>

                            {service.faqs && service.faqs.length > 0 ? (
                                <div className="space-y-4">
                                    {service.faqs.map((faq, index) => (
                                        <div key={index} className="border p-4 rounded-lg bg-muted/20">
                                            <h4 className="font-bold text-sm text-foreground">{faq.question}</h4>
                                            <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic text-center py-4">لا توجد أسئلة شائعة لهذه الخدمة</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-lg p-6 bg-card space-y-4">
                            <h2 className="font-semibold border-b pb-2 flex items-center gap-2">
                                <Layers className="h-4 w-4" /> {t('admin.metadata')}
                            </h2>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.slug')}</label>
                                <div className="text-sm font-mono break-all bg-muted p-2 rounded">
                                    {service.slug}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.order')}</label>
                                <div>{service.order}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground uppercase">{t('admin.created_at')}</label>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(service.created_at).toLocaleDateString('ar-EG')}
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

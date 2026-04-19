import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/use-translations';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function UserShow({ user }) {
    const { t } = useTranslations();
    const { delete: destroy } = useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/users/${user.id}`, {
            onSuccess: () => setDeleteOpen(false),
        });
    };

    return (
        <>
            <Head title={user.name} />
            
            <div className="p-6 max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                        <p className="text-muted-foreground">{t('admin.user_details')}</p>
                    </div>
                </div>

                <div className="border rounded-lg p-6 bg-card space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">{t('admin.name')}</label>
                            <p className="text-base mt-1">{user.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">{t('admin.email')}</label>
                            <p className="text-base mt-1 dir='ltr'">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">{t('admin.role')}</label>
                            <div className="mt-1">
                                {user.is_admin ? (
                                    <Badge variant="default">{t('admin.admin')}</Badge>
                                ) : (
                                    <Badge variant="secondary">{t('admin.user')}</Badge>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">{t('admin.created_at')}</label>
                            <p className="text-base mt-1">{new Date(user.created_at).toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground">{t('admin.updated_at')}</label>
                        <p className="text-base mt-1">{new Date(user.updated_at).toLocaleDateString('ar-EG')}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> {t('admin.edit')}
                        </Link>
                    </Button>
                    <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> {t('admin.delete')}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/users">{t('admin.back')}</Link>
                    </Button>
                </div>
            </div>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.are_you_sure')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.delete_user_warning') || 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المستخدم بشكل دائم.'}
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

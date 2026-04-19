import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ServiceForm({ service = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: service ? 'PUT' : 'POST',
        title: service?.title || '',
        description: service?.description || '',
        content: service?.content || '',
        order: service?.order || 0,
        image: null,
    });

    const comparisonForm = useForm({
        title: '',
        before_image: null,
        after_image: null,
        order: 0,
    });

    const [deleteComparisonId, setDeleteComparisonId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = service 
            ? `/admin/services/${service?.id}` 
            : '/admin/services';
        
        // Use post for both to handle multipart/form-data with _method spoofing
        post(url);
    };

    const handleAddComparison = (e) => {
        e.preventDefault();
        comparisonForm.post(`/admin/services/${service?.id}/comparisons`, {
            onSuccess: () => comparisonForm.reset(),
        });
    };

    const handleDeleteComparison = () => {
        if (deleteComparisonId) {
            comparisonForm.delete(`/admin/comparisons/${deleteComparisonId}`, {
                onSuccess: () => setDeleteComparisonId(null),
            });
        }
    };

    return (
        <>
            <Head title={service ? t('admin.update_service') : t('admin.create_service')} />
            
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/services">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {service ? t('admin.update_service') : t('admin.create_service')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('admin.fill_service_details') || 'Define the details and content for this dental treatment.'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Service Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 border rounded-[2rem] shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('admin.service_title')}</Label>
                                    <Input 
                                        id="title" 
                                        className="h-14 rounded-2xl bg-secondary/20 border-border/50 font-bold text-lg"
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        placeholder={t('admin.service_title')}
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{getErrorMessage(errors.title)}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('admin.display_order')}</Label>
                                    <Input 
                                        id="order" 
                                        type="number"
                                        className="h-14 rounded-2xl bg-secondary/20 border-border/50 font-bold"
                                        value={data.order} 
                                        onChange={e => setData('order', e.target.value)} 
                                    />
                                    {errors.order && <p className="text-sm text-destructive">{getErrorMessage(errors.order)}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('admin.service_image')}</Label>
                                    <div className="flex items-center gap-4">
                                        <Input 
                                            id="image" 
                                            type="file" 
                                            className="h-14 rounded-2xl bg-secondary/20 border-border/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-foreground hover:file:bg-primary/80 cursor-pointer" 
                                            onChange={e => setData('image', e.target.files[0])}
                                        />
                                        {service?.image && !data.image && (
                                            <div className="h-14 w-14 rounded-xl border border-border/50 overflow-hidden shrink-0 shadow-sm">
                                                <img src={`/storage/${service.image}`} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-sm text-destructive">{getErrorMessage(errors.image)}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('admin.description')}</Label>
                                    <textarea 
                                        id="description"
                                        className="w-full min-h-[100px] bg-secondary/20 border border-border/50 p-5 rounded-2xl text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-medium"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder={t('admin.description')}
                                    />
                                    {errors.description && <p className="text-sm text-destructive">{getErrorMessage(errors.description)}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="content" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('admin.content')}</Label>
                                    <textarea 
                                        id="content"
                                        className="w-full min-h-[300px] bg-secondary/20 border border-border/50 p-5 rounded-2xl text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-medium"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        placeholder={t('admin.content')}
                                    />
                                    {errors.content && <p className="text-sm text-destructive">{getErrorMessage(errors.content)}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-8 border-t border-border/50">
                                <Button variant="outline" type="button" className="h-12 px-8 rounded-xl font-bold" asChild>
                                    <Link href="/admin/services">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="h-12 px-8 rounded-xl font-black bg-foreground text-background hover:bg-primary hover:text-foreground">
                                    <Save className="mr-2 h-4 w-4" /> 
                                    {service ? 'Update Service' : 'Create Service'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Comparisons Sidebar */}
                    <div className="space-y-8">
                        {service ? (
                            <div className="bg-card p-6 border rounded-[2rem] shadow-sm space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black text-xl flex items-center gap-2">
                                        <ImageIcon size={24} className="text-primary" />
                                        Before & After
                                    </h3>
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                        {service.comparisons?.length || 0} Cases
                                    </div>
                                </div>

                                {/* Add Comparison Form */}
                                <form onSubmit={handleAddComparison} className="p-4 bg-secondary/20 rounded-2xl border border-border/50 space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Case Title</Label>
                                        <Input 
                                            placeholder="e.g. Full Arch Reconstruction"
                                            className="h-10 text-sm font-bold bg-background border-border/50"
                                            value={comparisonForm.data.title}
                                            onChange={e => comparisonForm.setData('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Before</Label>
                                            <Input 
                                                type="file" 
                                                className="h-10 text-xs bg-background border-border/50" 
                                                onChange={e => comparisonForm.setData('before_image', e.target.files[0])}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">After</Label>
                                            <Input 
                                                type="file" 
                                                className="h-10 text-xs bg-background border-border/50"
                                                onChange={e => comparisonForm.setData('after_image', e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" size="sm" className="w-full font-bold h-10 rounded-xl" disabled={comparisonForm.processing}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Comparison
                                    </Button>
                                    {comparisonForm.errors.before_image && <p className="text-xs text-destructive">{comparisonForm.errors.before_image}</p>}
                                    {comparisonForm.errors.after_image && <p className="text-xs text-destructive">{comparisonForm.errors.after_image}</p>}
                                </form>

                                {/* List Comparisons */}
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {service.comparisons?.map(comp => (
                                        <div key={comp.id} className="group relative bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <div className="grid grid-cols-2 aspect-video">
                                                <img src={`/storage/${comp.before_image}`} className="w-full h-full object-cover border-r border-border/50" alt="Before" />
                                                <img src={`/storage/${comp.after_image}`} className="w-full h-full object-cover" alt="After" />
                                            </div>
                                            <div className="p-3 bg-card flex justify-between items-center">
                                                <span className="text-xs font-bold truncate pr-2">{comp.title || 'Untitled Case'}</span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                                    onClick={() => setDeleteComparisonId(comp.id)}
                                                    disabled={comparisonForm.processing}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!service.comparisons || service.comparisons.length === 0) && (
                                        <div className="text-center py-10 px-4 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                                            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                                            <p className="text-sm text-muted-foreground font-medium italic">No visual cases yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-primary/5 p-8 border border-dashed border-primary/20 rounded-[2rem] text-center space-y-4">
                                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                                    <ImageIcon className="text-primary h-8 w-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-black text-lg">Case Submissions</h3>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                        After creating the service, you will be able to upload Before & After visuals to showcase your results.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={!!deleteComparisonId} onOpenChange={(open) => !open && setDeleteComparisonId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the before/after comparison case.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteComparisonId(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteComparison}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

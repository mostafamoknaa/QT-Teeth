import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';
import { toast } from 'sonner';

export default function ServiceForm({ service = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: service ? 'PUT' : 'POST',
        title: service?.title || '',
        description: service?.description || '',
        content: service?.content || '',
        order: service?.order || 0,
        image: null,
        faqs: service?.faqs || [],
    });

    const [faqs, setFaqs] = useState(service?.faqs || []);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = service 
            ? `/admin/services/${service?.id}` 
            : '/admin/services';
        
        // Use post for both to handle multipart/form-data with _method spoofing
        post(url);
    };

    const handleAddFaq = (e) => {
        e.preventDefault();
        if (!newQuestion.trim() || !newAnswer.trim()) {
            toast.error('يرجى ملء السؤال والجواب معاً');
            return;
        }
        const updated = [...faqs, { question: newQuestion, answer: newAnswer }];
        setFaqs(updated);
        setData('faqs', updated);
        setNewQuestion('');
        setNewAnswer('');
        toast.success('تمت إضافة السؤال مؤقتاً. اضغط على حفظ الخدمة لاعتماده.');
    };

    const handleDeleteFaq = (index) => {
        const updated = faqs.filter((_, i) => i !== index);
        setFaqs(updated);
        setData('faqs', updated);
        toast.success('تم حذف السؤال. اضغط على حفظ الخدمة لتحديث البيانات.');
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
                                    <Link href="/admin/services">{t('admin.cancel') || 'إلغاء'}</Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="h-12 px-8 rounded-xl font-black bg-foreground text-background hover:bg-primary hover:text-foreground">
                                    <Save className="mr-2 h-4 w-4" /> 
                                    {service ? (t('admin.save') || 'حفظ التعديلات') : (t('admin.create') || 'حفظ الخدمة')}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* FAQ Builder Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-card p-6 border rounded-[2rem] shadow-sm space-y-6">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h3 className="font-black text-xl flex items-center gap-2 text-foreground">
                                    <HelpCircle size={24} className="text-primary" />
                                    الأسئلة الشائعة (FAQ)
                                </h3>
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                    {faqs.length} سؤال
                                </div>
                            </div>

                            {/* Add FAQ Form */}
                            <div className="p-4 bg-secondary/20 rounded-2xl border border-border/50 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">السؤال</Label>
                                    <Input 
                                        placeholder="مثال: هل زраعة الأسنان مؤلمة؟"
                                        className="h-10 text-sm font-semibold bg-background border-border/50"
                                        value={newQuestion}
                                        onChange={e => setNewQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">الجواب</Label>
                                    <textarea 
                                        placeholder="اكتب الإجابة هنا..."
                                        className="w-full h-24 p-3 text-sm font-medium bg-background border border-border/50 rounded-xl resize-none outline-none focus:ring-1 focus:ring-primary"
                                        value={newAnswer}
                                        onChange={e => setNewAnswer(e.target.value)}
                                    />
                                </div>
                                <Button type="button" onClick={handleAddFaq} size="sm" className="w-full font-bold h-10 rounded-xl">
                                    <Plus className="mr-2 h-4 w-4" /> إضافة السؤال
                                </Button>
                            </div>

                            {/* List FAQs */}
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="p-4 bg-background border border-border/50 rounded-2xl shadow-sm space-y-2 relative group hover:border-primary/50 transition-colors">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-bold text-sm text-foreground leading-tight pr-6">{faq.question}</h4>
                                            <Button 
                                                type="button"
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-6 w-6 text-destructive hover:bg-destructive/10 rounded-full shrink-0"
                                                onClick={() => handleDeleteFaq(index)}
                                            >
                                                <Trash2 size={12} />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{faq.answer}</p>
                                    </div>
                                ))}
                                {faqs.length === 0 && (
                                    <div className="text-center py-8 px-4 bg-muted/10 rounded-2xl border border-dashed border-border/50">
                                        <HelpCircle className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                                        <p className="text-sm text-muted-foreground font-medium italic">لا توجد أسئلة شائعة مضافة بعد.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

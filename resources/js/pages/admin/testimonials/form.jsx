import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Save, Star } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-messages';
import { useTranslations } from '@/hooks/use-translations';

export default function TestimonialForm({ testimonial = null }) {
    const { t } = useTranslations();
    const { data, setData, post, processing, errors } = useForm({
        _method: testimonial ? 'PUT' : 'POST',
        client_name: testimonial?.client_name || '',
        client_title: testimonial?.client_title || '',
        service_name: testimonial?.service_name || '',
        content: testimonial?.content || '',
        video_url: testimonial?.video_url || '',
        rating: testimonial?.rating || 5,
        order: testimonial?.order || 0,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = testimonial 
            ? `/admin/testimonials/${testimonial?.id}` 
            : '/admin/testimonials';
        
        post(url);
    };

    return (
        <>
            <Head title={testimonial ? t('admin.update_testimonial') : t('admin.create_testimonial')} />
            
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/testimonials">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {testimonial ? t('admin.update_testimonial') : t('admin.create_testimonial')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('admin.fill_testimonial_details') || 'Share a new success story from one of your patients.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 border rounded-xl font-bold">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Client Name */}
                        <div className="space-y-2">
                            <Label htmlFor="client_name">{t('admin.client_name')}</Label>
                            <Input 
                                id="client_name" 
                                value={data.client_name} 
                                onChange={e => setData('client_name', e.target.value)} 
                                placeholder={t('admin.client_name')}
                            />
                            {errors.client_name && <p className="text-sm text-destructive">{getErrorMessage(errors.client_name)}</p>}
                        </div>

                        {/* Client Title/Role */}
                        <div className="space-y-2">
                            <Label htmlFor="client_title">{t('admin.client_title')}</Label>
                            <Input 
                                id="client_title" 
                                value={data.client_title} 
                                onChange={e => setData('client_title', e.target.value)} 
                                placeholder={t('admin.client_title')}
                            />
                            {errors.client_title && <p className="text-sm text-destructive">{getErrorMessage(errors.client_title)}</p>}
                        </div>

                        {/* Service name */}
                        <div className="space-y-2 text-foreground">
                            <Label htmlFor="service_name">{t('admin.service_received')}</Label>
                            <Input 
                                id="service_name" 
                                value={data.service_name} 
                                onChange={e => setData('service_name', e.target.value)} 
                                placeholder={t('admin.service_received')}
                            />
                            {errors.service_name && <p className="text-sm text-destructive">{getErrorMessage(errors.service_name)}</p>}
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <Label htmlFor="rating">{t('admin.rating')}</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="rating" 
                                    type="number"
                                    min="1"
                                    max="5"
                                    className="w-20"
                                    value={data.rating} 
                                    onChange={e => setData('rating', e.target.value)} 
                                />
                                <div className="flex text-yellow-500">
                                    {[...Array(parseInt(data.rating || 0))].map((_, i) => (
                                        <Star key={i} size={20} className="fill-current" />
                                    ))}
                                </div>
                            </div>
                            {errors.rating && <p className="text-sm text-destructive">{getErrorMessage(errors.rating)}</p>}
                        </div>

                        {/* Video URL */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="video_url">{t('admin.video_url')}</Label>
                            <Input 
                                id="video_url" 
                                value={data.video_url} 
                                onChange={e => setData('video_url', e.target.value)} 
                                placeholder={t('admin.video_url')}
                            />
                            {errors.video_url && <p className="text-sm text-destructive">{getErrorMessage(errors.video_url)}</p>}
                        </div>

                        {/* Image */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="image">{t('admin.client_photo')}</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="image" 
                                    type="file" 
                                    className="cursor-pointer" 
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {testimonial?.image && !data.image && (
                                    <div className="h-10 w-10 rounded border overflow-hidden">
                                        <img src={`/storage/${testimonial.image}`} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="text-sm text-destructive">{getErrorMessage(errors.image)}</p>}
                        </div>

                        {/* Content */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="content">{t('admin.testimonial_content')}</Label>
                            <textarea 
                                id="content"
                                className="w-full min-h-[120px] bg-background border p-3 rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder={t('admin.testimonial_content')}
                            />
                            {errors.content && <p className="text-sm text-destructive">{getErrorMessage(errors.content)}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <Button variant="outline" type="button" asChild>
                            <Link href="/admin/testimonials">{t('admin.cancel')}</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> 
                            {testimonial ? t('admin.update_testimonial') : t('admin.create_testimonial')}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

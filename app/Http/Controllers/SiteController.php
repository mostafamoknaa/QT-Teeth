<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Doctor;
use App\Models\Testimonial;
use App\Models\Service;
use App\Models\Offer;
use App\Models\GalleryPhoto;
use App\Models\HomeVideo;
use App\Notifications\WhatsappNotification;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'canonical_url'   => config('app.url') . '/',
            'articles'        => Article::where('is_published', true)->orderBy('published_at', 'desc')->take(6)->get()->map(fn($a) => array_merge($a->toArray(), ['url_key' => $a->url_key]))->values(),
            'testimonials'    => Testimonial::orderBy('order')->get(),
            'services'        => Service::orderBy('order')->get()->map(fn($s) => array_merge($s->toArray(), ['url_key' => $s->url_key]))->values(),
            'active_offers'   => Offer::active()->with('service')->orderBy('created_at', 'desc')->get(),
            'home_videos'     => HomeVideo::orderBy('order')->get(),
            'gallery_photos'  => GalleryPhoto::orderBy('order')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact', [
            'canonical_url' => config('app.url') . '/contact',
            'services'      => Service::orderBy('order')->get(),
            'active_offers' => Offer::active()->with('service')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('about', [
            'canonical_url' => config('app.url') . '/about',
        ]);
    }

    public function articles()
    {
        return Inertia::render('articles/index', [
            'canonical_url' => config('app.url') . '/articles',
            'articles' => Article::where('is_published', true)
                ->orderBy('published_at', 'desc')
                ->get()
                ->map(fn($a) => array_merge($a->toArray(), ['url_key' => $a->url_key])),
        ]);
    }

    public function articleShow(Article $article)
    {
        return Inertia::render('articles/show', [
            'canonical_url' => config('app.url') . '/articles/' . $article->url_key,
            'article' => array_merge($article->toArray(), ['url_key' => $article->url_key]),
        ]);
    }

    public function services()
    {
        return Inertia::render('services/index', [
            'canonical_url' => config('app.url') . '/services',
            'services' => Service::orderBy('order')->get()->map(fn($s) => array_merge($s->toArray(), ['url_key' => $s->url_key])),
        ]);
    }

    public function serviceShow(Service $service)
    {
        return Inertia::render('services/show', [
            'canonical_url' => config('app.url') . '/services/' . $service->url_key,
            'service' => array_merge($service->toArray(), ['url_key' => $service->url_key]),
        ]);
    }

    public function gallery()
    {
        return Inertia::render('gallery', [
            'canonical_url'  => config('app.url') . '/gallery',
            'gallery_photos' => GalleryPhoto::orderBy('order')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function doctors()
    {
        return Inertia::render('doctors/index', [
            'canonical_url' => config('app.url') . '/doctors',
            'doctors' => Doctor::orderBy('order')->get(),
        ]);
    }

    public function clients()
    {
        return Inertia::render('clients/index', [
            'canonical_url' => config('app.url') . '/clients',
            'testimonials' => Testimonial::orderBy('order')->get(),
        ]);
    }

    public function offers()
    {
        return Inertia::render('offers/index', [
            'canonical_url' => config('app.url') . '/offers',
            'offers' => Offer::active()->with('service')->orderBy('created_at', 'desc')->paginate(12),
        ]);
    }

    public function storeAppointment(\Illuminate\Http\Request $request)
    {
        // Normalize empty strings to null for optional integer fields
        if ($request->service_id === '' || $request->service_id === null) {
            $request->merge(['service_id' => null]);
        }

        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'phone'      => 'required|regex:/^(\+?[0-9\s\-\(\)]{7,20})$/',
            'email'      => 'nullable|email|max:255',
            'service_id' => 'nullable|exists:services,id',
            'offer'      => 'nullable|string|max:255',
            'branch'     => 'nullable|string|max:255',
            'message'    => 'nullable|string|max:1000',
        ], [
            'phone.regex'        => 'validation.phone.regex',
            'phone.required'     => 'validation.phone.required',
            'name.required'      => 'validation.name.required',
            'email.email'        => 'validation.email',
            'service_id.exists'  => 'validation.service.exists',
            'message.max'        => 'validation.message.max',
        ]);

        // Cast service_id to int if present
        if (!empty($validated['service_id'])) {
            $validated['service_id'] = (int) $validated['service_id'];
        } else {
            $validated['service_id'] = null;
        }

        $appointment = \App\Models\Appointment::create($validated);
        $appointment->load('service');

        // Build WhatsApp message for admin
        $serviceName = $appointment->service ? $appointment->service->title : ($validated['service_id'] ?? '');
        $lines = [];
        $lines[] = '📋 *طلب حجز جديد - مركز بدر لطب الأسنان*';
        $lines[] = '';
        $lines[] = '👤 *الاسم:* ' . $validated['name'];
        $lines[] = '📞 *الهاتف:* ' . $validated['phone'];
        if (!empty($validated['email'])) {
            $lines[] = '📧 *البريد الإلكتروني:* ' . $validated['email'];
        }
        if ($serviceName) {
            $lines[] = '🦷 *الخدمة:* ' . $serviceName;
        }
        if (!empty($validated['offer'])) {
            $lines[] = '🎁 *العرض:* ' . $validated['offer'];
        }
        if (!empty($validated['branch'])) {
            $lines[] = '📍 *الفرع:* ' . $validated['branch'];
        }
        if (!empty($validated['message'])) {
            $lines[] = '💬 *رسالة:* ' . $validated['message'];
        }
        $lines[] = '';
        $lines[] = '🕐 *وقت الطلب:* ' . now()->format('Y-m-d H:i');

        $whatsappMessage = implode("\n", $lines);
        $adminPhone = '201060000841'; // Egyptian number without leading zero
        $whatsappUrl = 'https://wa.me/' . $adminPhone . '?text=' . rawurlencode($whatsappMessage);

        return back()
            ->with('success', 'Your appointment request has been submitted successfully.')
            ->with('whatsapp_url', $whatsappUrl);
    }
}

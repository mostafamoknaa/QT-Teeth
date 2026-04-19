<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Doctor;
use App\Models\Testimonial;
use App\Models\Service;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'articles' => Article::where('is_published', true)->orderBy('published_at', 'desc')->take(6)->get(),
            'testimonials' => Testimonial::orderBy('order')->get(),
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact', [
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function articles()
    {
        return Inertia::render('articles/index', [
            'articles' => Article::where('is_published', true)->orderBy('published_at', 'desc')->get(),
        ]);
    }

    public function articleShow(Article $article)
    {
        return Inertia::render('articles/show', [
            'article' => $article,
        ]);
    }

    public function services()
    {
        return Inertia::render('services/index', [
            'services' => Service::with('comparisons')->orderBy('order')->get(),
        ]);
    }

    public function serviceShow(Service $service)
    {
        return Inertia::render('services/show', [
            'service' => $service->load('comparisons'),
        ]);
    }

    public function doctors()
    {
        return Inertia::render('doctors/index', [
            'doctors' => Doctor::orderBy('order')->get(),
        ]);
    }

    public function clients()
    {
        return Inertia::render('clients/index', [
            'testimonials' => Testimonial::orderBy('order')->get(),
        ]);
    }

    public function storeAppointment(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|regex:/^(\+?[0-9]{1,3}[-.\s]?)?[0-9]{7,15}$/',
            'email' => 'nullable|email|max:255',
            'service_id' => 'nullable|integer|exists:services,id',
            'branch' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:1000',
        ], [
            'phone.regex' => 'Please enter a valid phone number (7-15 digits, may include +, -, or spaces)',
            'phone.required' => 'Phone number is required',
            'name.required' => 'Name is required',
            'email.email' => 'Please enter a valid email address',
            'service_id.exists' => 'Invalid service selection',
            'message.max' => 'Message cannot exceed 1000 characters',
        ]);

        \App\Models\Appointment::create($validated);

        return back()->with('success', 'Your appointment request has been submitted successfully.');
    }
}

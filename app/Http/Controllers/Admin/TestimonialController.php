<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('client_name', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
        }

        return Inertia::render('admin/testimonials/index', [
            'testimonials' => $query->orderBy('order')->paginate(10),
            'search' => $request->input('search', '')
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/testimonials/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'service_name' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string|url',
            'image' => 'nullable|image|max:2048',
            'rating' => 'integer|min:1|max:5',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        }

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function show(Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/show', [
            'testimonial' => $testimonial
        ]);
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/form', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_title' => 'nullable|string|max:255',
            'service_name' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string|url',
            'image' => 'nullable|image|max:2048',
            'rating' => 'integer|min:1|max:5',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $validated['image'] = $request->file('image')->store('testimonials', 'public');
        } else {
            // Preserve existing image if no new image is uploaded
            unset($validated['image']);
        }

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image) {
            Storage::disk('public')->delete($testimonial->image);
        }
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryPhotoController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryPhoto::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        return Inertia::render('admin/gallery-photos/index', [
            'photos' => $query->orderBy('order')->orderBy('created_at', 'desc')->paginate(12),
            'search' => $request->input('search', '')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'before_image' => 'required|image|max:5120', // Up to 5MB
            'after_image' => 'required|image|max:5120', // Up to 5MB
            'order' => 'integer|min:0',
        ]);

        if ($request->hasFile('before_image')) {
            $validated['before_image'] = $request->file('before_image')->store('gallery', 'public');
        }

        if ($request->hasFile('after_image')) {
            $validated['after_image'] = $request->file('after_image')->store('gallery', 'public');
        }

        GalleryPhoto::create($validated);

        return redirect()->route('admin.gallery-photos.index')->with('success', 'Photo added to gallery successfully.');
    }

    public function destroy($id)
    {
        $photo = GalleryPhoto::findOrFail($id);

        if ($photo->before_image) {
            Storage::disk('public')->delete($photo->before_image);
        }

        if ($photo->after_image) {
            Storage::disk('public')->delete($photo->after_image);
        }

        $photo->delete();

        return redirect()->route('admin.gallery-photos.index')->with('success', 'Photo deleted from gallery successfully.');
    }
}

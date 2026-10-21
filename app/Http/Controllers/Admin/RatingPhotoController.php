<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RatingPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RatingPhotoController extends Controller
{
    public function index(Request $request)
    {
        $query = RatingPhoto::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        return Inertia::render('admin/ratings/index', [
            'ratings' => $query->orderBy('order')->orderBy('created_at', 'desc')->paginate(16),
            'search'  => $request->input('search', '')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'    => 'nullable|string|max:255',
            'order'    => 'nullable|integer|min:0',
            'image'    => 'nullable|image|max:10240',
            'images'   => 'nullable|array',
            'images.*' => 'image|max:10240',
        ]);

        $order = (int) $request->input('order', 0);
        $title = $request->input('title');

        // Multiple images upload
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('ratings', 'public');
                RatingPhoto::create([
                    'title' => $title,
                    'image' => $path,
                    'order' => $order++,
                ]);
            }
            return redirect()->route('admin.ratings.index')->with('success', 'تم رفع صور التقييمات بنجاح.');
        }

        // Single image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('ratings', 'public');
            RatingPhoto::create([
                'title' => $title,
                'image' => $path,
                'order' => $order,
            ]);
            return redirect()->route('admin.ratings.index')->with('success', 'تم إضافة صورة التقييم بنجاح.');
        }

        return back()->withErrors(['image' => 'يرجى اختيار صورة التقييم أولاً.']);
    }

    public function destroy($id)
    {
        $rating = RatingPhoto::findOrFail($id);

        if ($rating->image) {
            Storage::disk('public')->delete($rating->image);
        }

        $rating->delete();

        return redirect()->route('admin.ratings.index')->with('success', 'تم حذف صورة التقييم بنجاح.');
    }
}

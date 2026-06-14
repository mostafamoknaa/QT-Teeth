<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeVideoController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/home-videos/index', [
            'videos' => HomeVideo::orderBy('order')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/home-videos/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'thumbnail' => 'required|image|max:2048',
            'video_file' => 'nullable|file|mimes:mp4,webm,ogg,quicktime|max:25600',
            'youtube_url' => 'nullable|string|url|max:255',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('home_videos', 'public');
        }

        if ($request->hasFile('video_file')) {
            $validated['video_path'] = $request->file('video_file')->store('home_videos', 'public');
        }

        HomeVideo::create($validated);

        return redirect()->route('admin.home-videos.index')->with('success', 'Home video created successfully.');
    }

    public function edit(HomeVideo $homeVideo)
    {
        return Inertia::render('admin/home-videos/form', [
            'video' => $homeVideo
        ]);
    }

    public function update(Request $request, HomeVideo $homeVideo)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'video_file' => 'nullable|file|mimes:mp4,webm,ogg,quicktime|max:25600',
            'youtube_url' => 'nullable|string|url|max:255',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($homeVideo->thumbnail) {
                Storage::disk('public')->delete($homeVideo->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('home_videos', 'public');
        } else {
            unset($validated['thumbnail']);
        }

        if ($request->hasFile('video_file')) {
            if ($homeVideo->video_path) {
                Storage::disk('public')->delete($homeVideo->video_path);
            }
            $validated['video_path'] = $request->file('video_file')->store('home_videos', 'public');
            // If local video file is uploaded, clear YouTube URL
            $validated['youtube_url'] = null;
        }

        // If a YouTube URL is entered, clear local video file
        if ($request->filled('youtube_url')) {
            if ($homeVideo->video_path) {
                Storage::disk('public')->delete($homeVideo->video_path);
            }
            $validated['video_path'] = null;
        }

        $homeVideo->update($validated);

        return redirect()->route('admin.home-videos.index')->with('success', 'Home video updated successfully.');
    }

    public function destroy(HomeVideo $homeVideo)
    {
        if ($homeVideo->thumbnail) {
            Storage::disk('public')->delete($homeVideo->thumbnail);
        }
        if ($homeVideo->video_path) {
            Storage::disk('public')->delete($homeVideo->video_path);
        }
        $homeVideo->delete();

        return redirect()->route('admin.home-videos.index')->with('success', 'Home video deleted successfully.');
    }
}

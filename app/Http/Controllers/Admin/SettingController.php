<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('admin/settings/index');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'whatsapp_number' => 'nullable|string|max:255',
            'copyrights' => 'nullable|string|max:255',
            'home_cover_type' => 'nullable|string|in:image,video,youtube',
            'home_cover_youtube_url' => 'nullable|string|url',
            'home_cover_image' => 'nullable|image|max:5120', // up to 5MB
            'home_cover_video' => 'nullable|file|mimes:mp4,webm,ogg,quicktime|max:25600', // up to 25MB
        ]);

        // Save text settings
        $textKeys = ['whatsapp_number', 'copyrights', 'home_cover_type', 'home_cover_youtube_url'];
        foreach ($textKeys as $key) {
            if ($request->has($key)) {
                \App\Models\Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $request->input($key)]
                );
            }
        }

        // Handle cover image file upload
        if ($request->hasFile('home_cover_image')) {
            $oldSetting = \App\Models\Setting::where('key', 'home_cover_image_path')->first();
            if ($oldSetting && $oldSetting->value) {
                Storage::disk('public')->delete($oldSetting->value);
            }
            $path = $request->file('home_cover_image')->store('settings', 'public');
            \App\Models\Setting::updateOrCreate(
                ['key' => 'home_cover_image_path'],
                ['value' => $path]
            );
        }

        // Handle cover video file upload
        if ($request->hasFile('home_cover_video')) {
            $oldSetting = \App\Models\Setting::where('key', 'home_cover_video_path')->first();
            if ($oldSetting && $oldSetting->value) {
                Storage::disk('public')->delete($oldSetting->value);
            }
            $path = $request->file('home_cover_video')->store('settings', 'public');
            \App\Models\Setting::updateOrCreate(
                ['key' => 'home_cover_video_path'],
                ['value' => $path]
            );
        }

        return redirect()->back()->with('success', __('admin.settings_saved'));
    }
}

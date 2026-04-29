<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
        ]);

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                \App\Models\Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return redirect()->back()->with('success', __('admin.settings_saved'));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceComparison;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceComparisonController extends Controller
{
    public function store(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'before_image' => 'required|image|max:2048',
            'after_image' => 'required|image|max:2048',
            'order' => 'integer',
        ]);

        if ($request->hasFile('before_image')) {
            $validated['before_image'] = $request->file('before_image')->store('comparisons', 'public');
        }

        if ($request->hasFile('after_image')) {
            $validated['after_image'] = $request->file('after_image')->store('comparisons', 'public');
        }

        $service->comparisons()->create($validated);

        return back()->with('success', 'Comparison added successfully.');
    }

    public function destroy(ServiceComparison $comparison)
    {
        if ($comparison->before_image) {
            Storage::disk('public')->delete($comparison->before_image);
        }
        if ($comparison->after_image) {
            Storage::disk('public')->delete($comparison->after_image);
        }
        $comparison->delete();

        return back()->with('success', 'Comparison deleted successfully.');
    }
}

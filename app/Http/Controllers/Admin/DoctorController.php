<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $query = Doctor::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%");
        }

        return Inertia::render('admin/doctors/index', [
            'doctors' => $query->orderBy('order')->paginate(10),
            'search' => $request->input('search', '')
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/doctors/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'bio' => 'nullable|string',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        }

        Doctor::create($validated);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor created successfully.');
    }

    public function edit(Doctor $doctor)
    {
        return Inertia::render('admin/doctors/form', [
            'doctor' => $doctor
        ]);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'bio' => 'nullable|string',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            if ($doctor->image) {
                Storage::disk('public')->delete($doctor->image);
            }
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        } else {
            // Preserve existing image if no new image is uploaded
            unset($validated['image']);
        }

        $doctor->update($validated);

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor updated successfully.');
    }

    public function destroy(Doctor $doctor)
    {
        if ($doctor->image) {
            Storage::disk('public')->delete($doctor->image);
        }
        $doctor->delete();

        return redirect()->route('admin.doctors.index')->with('success', 'Doctor deleted successfully.');
    }
}

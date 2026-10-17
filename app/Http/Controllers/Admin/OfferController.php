<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $query = Offer::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
        }

        return Inertia::render('admin/offers/index', [
            'offers' => $query->orderBy('created_at', 'desc')->paginate(10),
            'search' => $request->input('search', '')
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/offers/form', [
            'services' => Service::orderBy('order')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'badge_text'          => 'nullable|string|max:100',
            'content'             => 'nullable|string',
            'image'               => 'nullable|image|max:2048',
            'is_active'           => 'boolean',
            'discount_percentage' => 'nullable|string|max:20',
            'original_price'      => 'nullable|numeric|min:0',
            'discounted_price'    => 'nullable|numeric|min:0',
            'valid_until'         => 'nullable|date',
            'service_id'          => 'nullable|integer|exists:services,id',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('offers', 'public');
        }

        Offer::create($validated);

        return redirect()->route('admin.offers.index')->with('success', 'Offer created successfully.');
    }

    public function show(Offer $offer)
    {
        return Inertia::render('admin/offers/show', [
            'offer' => $offer->load('service')
        ]);
    }

    public function edit(Offer $offer)
    {
        return Inertia::render('admin/offers/form', [
            'offer'    => $offer,
            'services' => Service::orderBy('order')->get(['id', 'title']),
        ]);
    }

    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'title'               => 'required|string|max:255',
            'badge_text'          => 'nullable|string|max:100',
            'content'             => 'nullable|string',
            'image'               => 'nullable|image|max:2048',
            'is_active'           => 'boolean',
            'discount_percentage' => 'nullable|string|max:20',
            'original_price'      => 'nullable|numeric|min:0',
            'discounted_price'    => 'nullable|numeric|min:0',
            'valid_until'         => 'nullable|date',
            'service_id'          => 'nullable|integer|exists:services,id',
        ]);

        if ($request->hasFile('image')) {
            if ($offer->image) {
                Storage::disk('public')->delete($offer->image);
            }
            $validated['image'] = $request->file('image')->store('offers', 'public');
        } else {
            unset($validated['image']);
        }

        $offer->update($validated);

        return redirect()->route('admin.offers.index')->with('success', 'Offer updated successfully.');
    }

    public function destroy(Offer $offer)
    {
        if ($offer->image) {
            Storage::disk('public')->delete($offer->image);
        }
        $offer->delete();

        return redirect()->route('admin.offers.index')->with('success', 'Offer deleted successfully.');
    }
}

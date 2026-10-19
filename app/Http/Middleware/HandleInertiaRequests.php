<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $translations = \Illuminate\Support\Facades\Cache::remember("translations_{$locale}", 86400, function () use ($locale) {
            $path = lang_path("$locale.json");
            return file_exists($path) ? json_decode(file_get_contents($path), true) : [];
        });

        // Build a canonical URL from the production domain + current path.
        // Individual controller actions can override this by passing their own canonical_url prop.
        $productionUrl = rtrim(config('app.url'), '/');
        $canonicalUrl  = $productionUrl . '/' . ltrim($request->getPathInfo(), '/');

        return [
            ...parent::share($request),
            'name'           => config('app.name'),
            'auth'           => [
                'user' => $request->user(),
            ],
            'locale'         => $locale,
            'translations'   => $translations,
            'canonical_url'  => $canonicalUrl,
            'global_services' => \Illuminate\Support\Facades\Cache::remember('global_services_shared', 3600, function () {
                return \App\Models\Service::orderBy('order')->get()->map(fn($s) => array_merge($s->toArray(), ['url_key' => $s->url_key]));
            }),
            'active_offers'  => \Illuminate\Support\Facades\Cache::remember('active_offers_shared', 1800, function () {
                return \App\Models\Offer::where('is_active', true)->orderBy('created_at', 'desc')->get();
            }),
            'sidebarOpen'    => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'settings'       => \App\Models\Setting::getAllSettings(),
        ];
    }
}

<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\SiteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ServiceComparisonController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Middleware\CheckIsAdmin;

Route::get('/', [SiteController::class, 'index'])->name('home');

Route::get('/about', [SiteController::class, 'about'])->name('about');
Route::inertia('/branches', 'branches')->name('branches');
Route::inertia('/egypt', 'egypt')->name('country.egypt');
Route::inertia('/saudi', 'saudi')->name('country.saudi');
Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
Route::post('/appointments', [SiteController::class, 'storeAppointment'])->name('appointments.store');

Route::get('/articles', [SiteController::class, 'articles'])->name('articles');
Route::get('/articles/{article}', [SiteController::class, 'articleShow'])->name('articles.show');
Route::get('/services', [SiteController::class, 'services'])->name('services');
Route::get('/services/{service}', [SiteController::class, 'serviceShow'])->name('services.show');
Route::get('/doctors', [SiteController::class, 'doctors'])->name('doctors');
Route::get('/clients', [SiteController::class, 'clients'])->name('clients');
Route::get('/offers', [SiteController::class, 'offers'])->name('offers');
Route::get('/gallery', [SiteController::class, 'gallery'])->name('gallery');

Route::middleware(['auth'])->group(function () {
    
    
    Route::middleware([CheckIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('doctors', DoctorController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('services', ServiceController::class);
        Route::resource('offers', OfferController::class);
        Route::resource('home-videos', \App\Http\Controllers\Admin\HomeVideoController::class);
        Route::resource('gallery-photos', \App\Http\Controllers\Admin\GalleryPhotoController::class)->only(['index', 'store', 'destroy']);
        Route::get('site-settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('site-settings.index');
        Route::post('site-settings', [\App\Http\Controllers\Admin\SettingController::class, 'store'])->name('site-settings.store');
        Route::resource('appointments', \App\Http\Controllers\Admin\AppointmentController::class)->only(['index', 'show', 'destroy']);
    });
});

Route::post('/language', function (\Illuminate\Http\Request $request) {
    $request->validate(['locale' => 'required|in:ar,en']);
    session()->put('locale', $request->input('locale'));
    return back();
})->name('language.switch');

// Dynamic sitemap.xml with Multilingual Hreflang & Image Sitemap
Route::get('/sitemap.xml', function () {
    $domain = 'https://badrdentalcenter.com';

    $staticUrls = [
        ['loc' => $domain . '/',         'priority' => '1.0', 'changefreq' => 'daily'],
        ['loc' => $domain . '/services',  'priority' => '0.95', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/gallery',   'priority' => '0.90', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/offers',    'priority' => '0.90', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/about',     'priority' => '0.85', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/articles',  'priority' => '0.85', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/branches',  'priority' => '0.80', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/contact',   'priority' => '0.80', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/doctors',   'priority' => '0.80', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/egypt',     'priority' => '0.75', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/saudi',     'priority' => '0.75', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/clients',   'priority' => '0.70', 'changefreq' => 'monthly'],
    ];

    $services  = \App\Models\Service::select('id', 'title', 'slug', 'image', 'updated_at')->get();
    $articles  = \App\Models\Article::where('is_published', true)->select('id', 'title', 'slug', 'image', 'updated_at')->get();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . PHP_EOL;

    foreach ($staticUrls as $url) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$url['loc']}</loc>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"ar\" href=\"{$url['loc']}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"{$url['loc']}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$url['loc']}\" />\n";
        $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$url['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }

    foreach ($services as $service) {
        $key = $service->slug ?: $service->id;
        $loc = "{$domain}/services/{$key}";
        $lastmod = $service->updated_at ? $service->updated_at->toAtomString() : now()->toAtomString();
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"ar\" href=\"{$loc}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"{$loc}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$loc}\" />\n";
        $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
        $xml .= "    <changefreq>weekly</changefreq>\n";
        $xml .= "    <priority>0.9</priority>\n";
        if ($service->image) {
            $imgUrl = "{$domain}/storage/" . ltrim($service->image, '/');
            $xml .= "    <image:image>\n";
            $xml .= "      <image:loc>{$imgUrl}</image:loc>\n";
            $xml .= "      <image:title>" . htmlspecialchars($service->title ?? 'خدمات مركز بدر للأسنان') . "</image:title>\n";
            $xml .= "    </image:image>\n";
        }
        $xml .= "  </url>\n";
    }

    foreach ($articles as $article) {
        $key = $article->slug ?: $article->id;
        $loc = "{$domain}/articles/{$key}";
        $lastmod = $article->updated_at ? $article->updated_at->toAtomString() : now()->toAtomString();
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"ar\" href=\"{$loc}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"{$loc}\" />\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$loc}\" />\n";
        $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
        $xml .= "    <changefreq>weekly</changefreq>\n";
        $xml .= "    <priority>0.85</priority>\n";
        if ($article->image) {
            $imgUrl = "{$domain}/storage/" . ltrim($article->image, '/');
            $xml .= "    <image:image>\n";
            $xml .= "      <image:loc>{$imgUrl}</image:loc>\n";
            $xml .= "      <image:title>" . htmlspecialchars($article->title ?? 'مقالات طب الأسنان') . "</image:title>\n";
            $xml .= "    </image:image>\n";
        }
        $xml .= "  </url>\n";
    }

    $xml .= '</urlset>';

    // Also persist static sitemap file to public folder
    @file_put_contents(public_path('sitemap.xml'), $xml);

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap');

require __DIR__.'/settings.php';

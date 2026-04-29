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

Route::middleware(['auth'])->group(function () {
    
    
    Route::middleware([CheckIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('doctors', DoctorController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('services', ServiceController::class);
        Route::resource('offers', OfferController::class);
        Route::get('site-settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('site-settings.index');
        Route::post('site-settings', [\App\Http\Controllers\Admin\SettingController::class, 'store'])->name('site-settings.store');
        Route::resource('appointments', \App\Http\Controllers\Admin\AppointmentController::class)->only(['index', 'show', 'destroy']);
        
        Route::post('services/{service}/comparisons', [ServiceComparisonController::class, 'store'])->name('services.comparisons.store');
        Route::delete('comparisons/{comparison}', [ServiceComparisonController::class, 'destroy'])->name('comparisons.destroy');
    });
});

Route::post('/language', function (\Illuminate\Http\Request $request) {
    $request->validate(['locale' => 'required|in:ar,en']);
    session()->put('locale', $request->input('locale'));
    return back();
})->name('language.switch');

// Dynamic sitemap.xml
Route::get('/sitemap.xml', function () {
    $domain = rtrim(config('app.url'), '/');

    $staticUrls = [
        ['loc' => $domain . '/',         'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/about',     'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/services',  'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/articles',  'priority' => '0.8', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/branches',  'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/contact',   'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/doctors',   'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/egypt',     'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/saudi',     'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => $domain . '/offers',    'priority' => '0.7', 'changefreq' => 'weekly'],
        ['loc' => $domain . '/clients',   'priority' => '0.6', 'changefreq' => 'monthly'],
    ];

    $services  = \App\Models\Service::select('id', 'slug', 'updated_at')->get();
    $articles  = \App\Models\Article::where('is_published', true)->select('id', 'slug', 'updated_at')->get();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

    foreach ($staticUrls as $url) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$url['loc']}</loc>\n";
        $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$url['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }

    foreach ($services as $service) {
        $key = $service->slug ?: $service->id;
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$domain}/services/{$key}</loc>\n";
        $xml .= "    <lastmod>{$service->updated_at->toAtomString()}</lastmod>\n";
        $xml .= "    <changefreq>monthly</changefreq>\n";
        $xml .= "    <priority>0.8</priority>\n";
        $xml .= "  </url>\n";
    }

    foreach ($articles as $article) {
        $key = $article->slug ?: $article->id;
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$domain}/articles/{$key}</loc>\n";
        $xml .= "    <lastmod>{$article->updated_at->toAtomString()}</lastmod>\n";
        $xml .= "    <changefreq>monthly</changefreq>\n";
        $xml .= "    <priority>0.7</priority>\n";
        $xml .= "  </url>\n";
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap');

require __DIR__.'/settings.php';

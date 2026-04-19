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

Route::middleware(['auth'])->group(function () {
    
    
    Route::middleware([CheckIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('doctors', DoctorController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('services', ServiceController::class);
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

require __DIR__.'/settings.php';

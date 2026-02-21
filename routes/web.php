<?php

use App\Http\Controllers\Marketing\AboutController;
use App\Http\Controllers\Marketing\BlogController;
use App\Http\Controllers\Marketing\ContactController;
use App\Http\Controllers\Marketing\FeaturesController;
use App\Http\Controllers\Marketing\HomeController;
use App\Http\Controllers\Marketing\LegalController;
use App\Http\Controllers\Marketing\PricingController;
use App\Http\Controllers\Marketing\SitemapController;
use App\Http\Controllers\Marketing\WaitlistController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('marketing.home');
Route::get('/features', [FeaturesController::class, 'index'])->name('marketing.features');
Route::get('/pricing', [PricingController::class, 'index'])->name('marketing.pricing');
Route::get('/about', [AboutController::class, 'index'])->name('marketing.about');
Route::get('/contact', [ContactController::class, 'index'])->name('marketing.contact');
Route::post('/contact', [ContactController::class, 'store'])->name('marketing.contact.store');
Route::get('/blog', [BlogController::class, 'index'])->name('marketing.blog');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('marketing.privacy');
Route::get('/terms', [LegalController::class, 'terms'])->name('marketing.terms');
Route::get('/security', [LegalController::class, 'security'])->name('marketing.security');

Route::post('/waitlist', [WaitlistController::class, 'store'])
    ->middleware('throttle:3,60')
    ->name('marketing.waitlist.store');

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('marketing.sitemap');
Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('marketing.robots');

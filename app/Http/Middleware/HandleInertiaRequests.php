<?php

namespace App\Http\Middleware;

use App\Models\WaitlistEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => 'ServicePro',
            'appUrl' => config('app.url'),
            'launchDate' => 'May 1, 2026',
            'waitlistCount' => Cache::remember('waitlist_count', 60, fn () => WaitlistEntry::count()),
        ];
    }
}

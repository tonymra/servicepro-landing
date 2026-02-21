<?php

namespace App\Http\Controllers\Marketing;

use App\Events\WaitlistEntryCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\WaitlistRequest;
use App\Mail\WaitlistWelcomeMail;
use App\Models\WaitlistEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class WaitlistController extends Controller
{
    public function store(WaitlistRequest $request): JsonResponse
    {
        $entry = WaitlistEntry::updateOrCreate(
            ['email' => $request->input('email')],
            [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'business_type' => $request->input('business_type'),
                'staff_count' => $request->input('staff_count'),
                'utm_source' => $request->input('utm_source'),
                'utm_medium' => $request->input('utm_medium'),
                'utm_campaign' => $request->input('utm_campaign'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]
        );

        if ($entry->wasRecentlyCreated) {
            WaitlistEntryCreated::dispatch($entry);
            Mail::to($entry->email)->queue(new WaitlistWelcomeMail($entry));
        }

        return response()->json([
            'success' => true,
            'already_existed' => ! $entry->wasRecentlyCreated,
            'email' => $entry->email,
        ]);
    }
}

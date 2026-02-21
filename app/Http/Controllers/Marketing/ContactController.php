<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(ContactRequest $request): JsonResponse
    {
        ContactMessage::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'business_name' => $request->input('business_name'),
            'business_type' => $request->input('business_type'),
            'subject' => $request->input('subject'),
            'message' => $request->input('message'),
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['success' => true]);
    }
}

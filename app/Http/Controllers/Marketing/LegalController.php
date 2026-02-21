<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacy(): Response
    {
        return Inertia::render('legal/Privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('legal/Terms');
    }

    public function security(): Response
    {
        return Inertia::render('legal/Security');
    }
}

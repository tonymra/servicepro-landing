<?php

namespace App\Events;

use App\Models\WaitlistEntry;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WaitlistEntryCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(public WaitlistEntry $entry) {}
}

<?php

namespace App\Mail;

use App\Models\WaitlistEntry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WaitlistWelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public WaitlistEntry $entry) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You're on the ServicePro waitlist 🎉",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.waitlist.welcome',
            with: [
                'firstName' => $this->entry->first_name,
                'email' => $this->entry->email,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

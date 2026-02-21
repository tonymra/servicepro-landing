<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WaitlistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', 'not_regex:/^.+@(mailinator|guerrillamail|tempmail|throwam|sharklasers|guerrillamailblock|grr|spam4|trashmail|yopmail|maildrop|dispostable|mailnull|spamgourmet|tempr|discard)\.com$/i'],
            'business_type' => ['nullable', 'string', 'in:HVAC,Plumbing,Electrical,Cleaning,Handyman,Landscaping,Pest Control,Painting,Appliance Repair,Other'],
            'staff_count' => ['nullable', 'string', 'in:Solo,2-3,4-6,7-10'],
            'website' => ['max:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.not_regex' => 'Please use a valid business email address.',
            'website.max' => 'Spam submission detected.',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'email' => ['required', 'email', 'max:255'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'business_type' => ['nullable', 'string', 'in:HVAC,Plumbing,Electrical,Cleaning,Handyman,Landscaping,Pest Control,Other'],
            'subject' => ['required', 'string', 'in:General Enquiry,Sales,Support,Billing,Partnership,Press,Career'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'privacy_agreed' => ['accepted'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'privacy_agreed.accepted' => 'You must agree to the Privacy Policy to submit this form.',
        ];
    }
}

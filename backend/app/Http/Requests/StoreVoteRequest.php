<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'option_id' => ['required', 'integer', 'exists:poll_options,id'],
            'voter_token' => ['required', 'string', 'max:100'],
        ];
    }
}

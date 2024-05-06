<?php

namespace App\Http\Requests;

use App\Models\Children;
use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_id' => 'required',
            'children_id' => 'required',
            'special_needs' => 'required',
            'emergency_contact_no' => 'required',
            'file' => 'required'
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator){
            $event = Event::whereId($this->input('event_id'))->first();
            $children = Children::whereId($this->input('children_id'))->first();
            if($event->age != $children->age) {
                $validator->errors()->add('children_id', 'Age does not matched');
            }
        });
    }
}

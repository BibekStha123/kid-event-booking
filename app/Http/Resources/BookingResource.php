<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => $this->user,
            'event' => $this->event,
            'child_name' => $this->child_name,
            'child_age' => $this->child_age,
            'special_needs' => $this->special_needs,
            'emergency_contact_no' => $this->emergency_contact_no,
            'file' => asset('storage/uploads/' . $this->file)
        ];
    }
}

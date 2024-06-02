<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'id' => $this->id,
            'user' => $this->user,
            'event' => $this->event,
            'child_name' => $this->children->name,
            'child_age' => $this->children->age,
            'special_needs' => $this->special_needs,
            'emergency_contact_no' => $this->emergency_contact_no,
            'file' => asset('storage/uploads/' . $this->file),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s')
        ];
    }
}

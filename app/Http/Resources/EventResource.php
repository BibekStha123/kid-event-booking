<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'name' => $this->name,
            'date_time' => $this->date_time,
            'location' => $this->location,
            'age' => $this->age,
            'amount' => $this->amount,
            'description' => $this->description,
            'file' =>asset('storage/uploads/' . $this->file)
        ];
    }
}

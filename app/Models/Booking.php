<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'child_name',
        'child_age',
        'special_needs',
        'emergency_contact_no'
    ];


    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name']);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

}

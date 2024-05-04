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
        'children_id',
        'special_needs',
        'emergency_contact_no',
        'file'
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

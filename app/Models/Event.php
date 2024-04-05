<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'date_time',
        'location',
        'age',
        'amount',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class)->select(['id', 'name']);
    }

    public function booking()
    {
        return $this->hasMany(Booking::class);
    }
}

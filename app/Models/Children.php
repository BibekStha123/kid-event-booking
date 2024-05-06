<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Children extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'dob',
        'age',
        'gender'
    ];

    public function booking()
    {
        return $this->hasOne(Booking::class);
    }
}

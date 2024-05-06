<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'card_no',
        'expiry_date',
        'cvc',
        'amount_paid'
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}

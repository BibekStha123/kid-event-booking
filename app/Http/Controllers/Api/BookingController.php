<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response([
            'message' => 'Bookings displayed'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookingRequest $request)
    {
        $data = $request->validated();

        Booking::create([
            'user_id' => Auth::id(),
            'event_id' => $data['event_id'],
            'child_name' => $data['child_name'],
            'child_age' => $data['child_age'],
            'special_needs' => $data['special_needs'],
            'emergency_contact_no' => $data['emergency_contact_no']
        ]);

        return response([
            'message' => 'Event Booked Successfully.'
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return response([
            'booking' => new BookingResource($booking)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

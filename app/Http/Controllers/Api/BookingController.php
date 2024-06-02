<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\BookingResource;
use App\Mail\BookingConfirmationMail;
use App\Models\Booking;
use App\Models\Children;
use App\Models\Event;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $userType = User::whereId($userId)->first()->user_type;

        if ($userType === "organizer") {
            $bookings = Booking::whereDelete(0)->paginate(10);
        } else {
            $bookings = Booking::whereDelete(0)->whereUserId($userId)->paginate(10);
        }

        return response([
            'bookings' => BookingResource::collection($bookings),
            'message' => 'Bookings displayed'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookingRequest $request, PaymentRequest $paymentRequest)
    {
        $data = $request->validated();
        $payment = $paymentRequest->validated();

        DB::beginTransaction();

        try {
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = $file->getClientOriginalName();
                $file->storeAs('uploads', $fileName, 'public');
                $booking = Booking::create([
                    'user_id' => Auth::id(),
                    'event_id' => $data['event_id'],
                    'children_id' => $data['children_id'],
                    'special_needs' => $data['special_needs'],
                    'emergency_contact_no' => $data['emergency_contact_no'],
                    'file' => $fileName
                ]);
            }

            Payment::create([
                'booking_id' => $booking->id,
                'card_no' => $payment['card_no'],
                'expiry_date' => $payment['expiry_date'],
                'cvc' => $payment['cvc'],
                'amount_paid' => Event::whereId($data['event_id'])->first()->amount
            ]);

            $user = User::whereId(Auth::id())->first();
            Mail::to($user->email)->send(new BookingConfirmationMail([
                'user' => $user,
                'event' => Event::whereId($data['event_id'])->first(),
                'child' => Children::whereId($data['children_id'])->first()
            ]));

            DB::commit();

        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
        }


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
    public function destroy(Booking $booking)
    {
        Booking::whereId($booking->id)->update([
            'delete' => true
        ]);

        return response([
            'message' => "Booking Deleted Successfully"
        ], 200);
    }

    public function upcomingEvents()
    {
        $userId = Auth::id();

        $currentDateTime = Carbon::now();
        $upcomingEvents = Booking::whereUserId($userId)
            ->whereHas('event', function ($query) use ($currentDateTime) {
                $query->where('date_time', '>', $currentDateTime);
            })->paginate(10);

        return response([
            'bookings' => BookingResource::collection($upcomingEvents)
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Children;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    //
    public function parents()
    {
        $userId = Auth::id();
        $currentDateTime = Carbon::now();

        $upcomingEvents = Booking::whereUserId($userId)
            ->whereHas('event', function ($query) use ($currentDateTime) {
                $query->where('date_time', '>', $currentDateTime);
            })->paginate(10);

        $bookings = Booking::whereUserId($userId)->paginate(10);
        $children = Children::whereUserId($userId)->get();

        return response([
            'bookings_count' => count($bookings),
            'events_count' => count($upcomingEvents),
            'children_count' => count($children)
        ]);
    }

    public function organizer()
    {
        $userId = Auth::id();
        $currentDateTime = Carbon::now();

        $events = Event::whereUserId($userId);
        $totalEvents = $events->get();
        $upcomingEvents = $events->where('date_time', '>' , $currentDateTime)->get();
        $parents = User::where('user_type', 'parent')->get();
        $bookings = $events->with('booking')->get()->pluck('booking')->flatten();

        return response([
            'bookings_count' => count($bookings),
            'total_events_count' => count($totalEvents),
            'upcoming_events_count' => count($upcomingEvents),
            'parents_count' => count($parents)
        ]);
    }
}

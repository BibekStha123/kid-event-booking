<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api', 'organizer'])->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::where('date_time', '>', Carbon::now())->paginate(10);

        return response([
            'events' => EventResource::collection($events)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $file->storeAs('uploads', $fileName, 'public');
            $event = Event::create([
                'user_id' => Auth::id(),
                'name' => $data['name'],
                'date_time' => $data['date_time'],
                'location' =>  $data['location'],
                'age' =>  $data['age'],
                'amount' =>  $data['amount'],
                'description' =>  $data['description'],
                'file' => $fileName
            ]);
        }

        return response([
            'message' => 'Event Created Successfully.',
            'event' => $event
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return response([
            'event' => new EventResource($event)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventRequest $request, Event $event)
    {
        $data = $request->validated();

        $updatedEvent = $event->update($data);

        return response([
            'message' => 'Event Updated Successfully.',
            'event' => $updatedEvent
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response([
            'message' => 'Event Deleted Successfully.'
        ], 200);
    }

    public function pastEvents()
    {
        $events = Event::where('date_time', '<', Carbon::now())->paginate(10);

        return response([
            'events' => EventResource::collection($events)
        ], 200);
    }
}

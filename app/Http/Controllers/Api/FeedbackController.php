<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api'])->except('index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $feedbacks = Feedback::latest()->take(3)->get();

        return response([
            'feedbacks' => FeedbackResource::collection($feedbacks)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeedbackRequest $request)
    {        
        $data = $request->validated();

        Feedback::create([
            'user_id' => Auth::id(),
            'feedback' => $data['feedback']
        ]);

        return response([
            'message' => 'Feeback Submitted Successfully.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

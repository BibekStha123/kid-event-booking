<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChildrenRequest;
use App\Http\Resources\ChildrenResource;
use App\Models\Children;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChildrenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $children = Children::whereUserId($userId)->paginate(10);

        return response([
            'children' => ChildrenResource::collection($children)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ChildrenRequest $request)
    {
        $data = $request->validated();
        $currentDate = Carbon::now();
        $date = Carbon::parse($data['dob']);
        $age = $currentDate->diffInYears($date);

        Children::create([
            'name' => $data['name'],
            'user_id' => Auth::id(),
            'dob' => $data['dob'],
            'gender' => $data['gender'],
            'age' => $age
        ]);

        return response([
            'message' => "Children Added Successfully"
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(Children $children)
    {
        $children->delete();

        return response([
            'message' => 'Deleted Successfully'
        ], 200);
    }
}

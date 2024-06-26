<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'user_type' =>  $data['user_type'],
            'address' =>  $data['address'],
            'contact_no' =>  $data['contact_no'],
        ]);

        return response([
            'message' => "User Created Successfully",
            'user' => new UserResource($user)
        ], 200);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        if (Auth::attempt($data)) {
            /** @var \App\Models\User $user **/
            $user = Auth::user();
            $token = Auth::claims(['user_type' => $user->user_type])->attempt($data);
            return response([
                'user' => new UserResource($user),
                'access_token' => $token
            ], 200);
        }

        return response([
            'message' => 'Credentials does not match.'
        ], 401);
    }

    public function logout()
    {
        Auth::invalidate(true);
        auth()->logout(true);

        return response([
            'message' => "Logged Out Successfully"
        ], 200);
    }

    public function getParents()
    {
        $parents = User::where('user_type', '=', 'parent')->paginate(10);

        return response([
            'parents' => UserResource::collection($parents)
        ], 200);
    }

    public function updateProfile(UpdateProfileRequest $request, User $user)
    {
        $data = $request->validated();

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'address' => $data['address'],
            'contact_no' => $data['contact_no']
        ]);

        return response([
            'user' => $user,
            'message' => 'User Updated Successfully.'
        ], 200);
    }

    public function redirectToGoogle()
    {
        return response([
            'url' =>  Socialite::driver('google')
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    public function googleCallback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->user();
            return $socialiteUser;
        } catch (\Throwable $th) {
            //throw $th;
            return response([
                'error' => $th->getMessage()
            ]);
        }
    }
}

<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/get-parents', [AuthController::class, 'getParents']);
    Route::get('/upcoming-events', [BookingController::class, 'upcomingEvents']);
    Route::get('/count', [BookingController::class, 'getCounts']);
    Route::apiResource('/bookings', BookingController::class);
    Route::apiResource('/events', EventController::class);
    

    Route::delete('/logout', [AuthController::class, 'logout']);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

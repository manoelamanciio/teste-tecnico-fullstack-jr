<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/polls/latest', [PollController::class, 'latest']);
    Route::post('/polls', [PollController::class, 'store']);
    Route::post('/polls/{poll}/votes', [VoteController::class, 'store']);
});

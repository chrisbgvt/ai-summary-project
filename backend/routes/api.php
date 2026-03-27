<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsSummaryController;

Route::get('/news', [NewsSummaryController::class, 'index']);
Route::get('/news/latest', [NewsSummaryController::class, 'latest']);
Route::get('/news/by-date', [NewsSummaryController::class, 'byDate']);
Route::get('/news/latest-by-date', [NewsSummaryController::class, 'latestByDate']);
Route::get('/news/{id}', [NewsSummaryController::class, 'show'])
    ->where('id', '[0-9]+');

Route::fallback(function () {
    return response()->json([
        'status' => 'error',
        'message' => 'Resource not found'
    ], 404);
});
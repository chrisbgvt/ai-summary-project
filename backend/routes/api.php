<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsSummaryController;

Route::get('/', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API is running',
        'endpoints' => [
            '/api/news',
            '/api/news/latest',
            '/api/news/by-date',
            '/api/news/latest-by-date',
            '/api/news/{id}'
        ]
    ]);
});

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
<?php

use Illuminate\Support\Facades\Route;

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

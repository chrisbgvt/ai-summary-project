<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

trait ApiResponse
{
    /**
     * Handle a controller action and return JSON response.
     *
     * @param callable $callback
     * @param int $defaultErrorCode HTTP status code if exception occurs (default 500)
     * @return JsonResponse
    */
    protected function handleRequest(callable $callback, int $defaultErrorCode = 500): JsonResponse
    {
        try {
            return $callback();
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage() ?: 'Internal server error'
            ], $defaultErrorCode);
        }
    }
}
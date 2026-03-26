<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsSummaryService;
use App\Http\Controllers\Traits\ApiResponse;

class NewsSummaryController extends Controller
{
    use ApiResponse;
    
    protected $newsService;

    public function __construct(NewsSummaryService $newsService)
    {
        $this->newsService = $newsService;
    }

    /**
     * Get all news summaries.
    */
    public function index(Request $request)
    {
        return $this->handleRequest(function() use ($request) {
            $perPage = (int) $request->input('per_page', 10);
            $summaries = $this->newsService->getAllNews($perPage);

            return response()->json([
                'status' => 'success',
                'data' => $summaries
            ], 200);
        });
    }

    /**
     * Get latest N news.
    */
    public function latest(Request $request)
    {
        return $this->handleRequest(function() use ($request) {
            $limit = (int) $request->input('limit', 7);
            $summaries = $this->newsService->getLatestNews($limit);

            return response()->json([
                'status' => 'success',
                'data' => $summaries
            ], 200);
        });
    }

    /**
     * Get news by date
    */
    public function byDate(Request $request)
    {
        return $this->handleRequest(function() use ($request) {
            $date = $request->input('date'); // YYYY-MM-DD
            $summaries = $this->newsService->getNewsByDate($date);

            return response()->json([
                'status' => 'success',
                'data' => $summaries
            ], 200);
        });
    }

    /**
     * Get news by ID.
    */
    public function show(int $id)
    {
        return $this->handleRequest(function() use ($id) {
            $summary = $this->newsService->getNewsById($id);

            if (!$summary) {
                throw new \Exception('Summary not found');
            }

            return response()->json([
                'status' => 'success',
                'data' => $summary
            ], 200);
        }, 404);
    }
}
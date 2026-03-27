<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsSummaryService;
use Illuminate\Http\JsonResponse;

class NewsSummaryController extends Controller
{   
    protected $newsService;

    public function __construct(NewsSummaryService $newsService)
    {
        $this->newsService = $newsService;
    }

    /**
     * Get all news summaries.
    */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 10);
        $summaries = $this->newsService->getAllNews($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $summaries
        ]);
    }

    /**
     * Get latest N news.
    */
    public function latest(Request $request): JsonResponse
    {
        $limit = (int) $request->input('limit', 7);
        $summaries = $this->newsService->getLatestNews($limit);

        return response()->json([
            'status' => 'success',
            'data' => $summaries
        ]);
    }

    /**
     * Get news by date.
    */
    public function byDate(Request $request): JsonResponse
    {
        $date = $request->input('date'); // YYYY-MM-DD
        $summaries = $this->newsService->getNewsByDate($date);

        return response()->json([
            'status' => 'success',
            'data' => $summaries
        ]);
    }

    /**
     * Get latest news grouped by date.
    */
    public function latestByDate(Request $request): JsonResponse
    {
        $days = (int) $request->input('days', 7);
        
        $groupedNews = $this->newsService->getLatestNewsGroupedByDate($days);

        return response()->json([
            'status' => 'success',
            'days_period' => $days,
            'data' => $groupedNews
        ]);
    }

    /**
     * Get news by ID.
    */
    public function show(int $id): JsonResponse
    {
        $summary = $this->newsService->getNewsById($id);

        return response()->json([
            'status' => 'success',
            'data' => $summary
        ]);
    }
}
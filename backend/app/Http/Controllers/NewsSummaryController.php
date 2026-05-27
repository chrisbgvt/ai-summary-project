<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsSummaryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class NewsSummaryController extends Controller
{   
    protected $newsService;
    protected $cacheTtl = 43200;

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
        $page = (int) $request->input('page', 1);
        $date = $request->input('date', null);

        $cacheKey = "news:index:per_page_{$perPage}:page_{$page}:date_{$date}";

        $summaries = Cache::tags(['news'])->remember($cacheKey, $this->cacheTtl, fn() => 
            $this->newsService->getAllNews($perPage, $date)->toArray()
        );

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

        $cacheKey = "news:grouped:days_{$days}";

        $groupedNews = Cache::tags(['news'])->remember($cacheKey, $this->cacheTtl, fn() => 
            $this->newsService->getLatestNewsGroupedByDate($days)->toArray()
        );

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
        $cacheKey = "news:id_{$id}";

        $summary = Cache::tags(['news'])->remember($cacheKey, $this->cacheTtl, fn() => 
            $this->newsService->getNewsById($id)->toArray()
        );

        return response()->json([
            'status' => 'success',
            'data' => $summary
        ]);
    }
}
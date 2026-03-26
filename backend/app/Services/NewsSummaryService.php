<?php

namespace App\Services;

use App\Models\NewsSummary;
use Carbon\Carbon;

class NewsSummaryService
{
    /**
     * Get all news summaries.
     *
     * @return \Illuminate\Database\Eloquent\Collection
    */
    public function getAllNews(int $perPage = 10)
    {
        return NewsSummary::orderBy('published_at', 'desc')->paginate($perPage);
    }

    /**
     * Get latest N news.
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
    */
    public function getLatestNews(int $limit = 7)
    {
        return NewsSummary::orderBy('published_at', 'desc')
            ->take($limit)
            ->get();
    }

    /**
     * Get news by date.
     * $date should be a string 'YYYY-MM-DD'. Defaults to today.
    */
    public function getNewsByDate(string $date = null)
    {
        $date = $date ? Carbon::parse($date) : Carbon::today();

        return NewsSummary::whereDate('published_at', $date)
            ->orderBy('published_at', 'desc')
            ->get();
    }

    /**
     * Get news by ID.
     *
     * @param int $id
     * @return NewsSummary|null
    */
    public function getNewsById(int $id)
    {
        return NewsSummary::find($id);
    }
}
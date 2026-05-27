<?php

namespace App\Services;

use App\Models\NewsSummary;
use App\Exceptions\NewsSummaryNotFoundException;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class NewsSummaryService
{
    /**
     * Get all news summaries.
     *
     * @return \Illuminate\Database\Eloquent\Collection
    */
    public function getAllNews(int $perPage = 10, ?string $date = null): LengthAwarePaginator
    {
        return NewsSummary::query()
            ->when($date, function ($query, $date) {
                $query->whereDate('published_at', $date);
            })
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get news from the last N days grouped by date.
     *
     * @return \Illuminate\Support\Collection
    */
    public function getLatestNewsGroupedByDate(int $days = 7)
    {
        return NewsSummary::where('published_at', '>=', Carbon::today()->subDays(max(1, $days) - 1)->startOfDay())
            ->orderBy('published_at', 'desc')
            ->get()
            ->groupBy(function ($item) {
                return $item->published_at->format('Y-m-d');
            });
    }

    /**
     * Get news by ID.
     *
     * @param int $id
     * @return NewsSummary|null
    */
    public function getNewsById(int $id): NewsSummary
    {
        return NewsSummary::findOrFail($id);
    }
}
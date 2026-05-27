<?php

namespace App\Observers;

use App\Models\NewsSummary;
use Illuminate\Support\Facades\Cache;

class NewsSummaryObserver
{
    /**
     * Handle the NewsSummary "created" event.
     */
    public function created(NewsSummary $newsSummary): void
    {
        Cache::tags(['news'])->flush();
    }

    /**
     * Handle the NewsSummary "updated" event.
     */
    public function updated(NewsSummary $newsSummary): void
    {
        Cache::tags(['news'])->flush();
    }

    /**
     * Handle the NewsSummary "deleted" event.
     */
    public function deleted(NewsSummary $newsSummary): void
    {
        Cache::tags(['news'])->flush();
    }

    /**
     * Handle the NewsSummary "restored" event.
     */
    public function restored(NewsSummary $newsSummary): void
    {
        //
    }

    /**
     * Handle the NewsSummary "force deleted" event.
     */
    public function forceDeleted(NewsSummary $newsSummary): void
    {
        //
    }
}

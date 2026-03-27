<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use App\Models\NewsSummary;

class ProcessDailyNews extends Command
{
    protected $signature = 'news:daily';
    protected $description = 'Fetch daily news from Python script and store summary in database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dispatching news processing job...');
    
        \App\Jobs\ProcessNewsJob::dispatch();

        $this->info('Job dispatched successfully.');
        return 0;
    }
}

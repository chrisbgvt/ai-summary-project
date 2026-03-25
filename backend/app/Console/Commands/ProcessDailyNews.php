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
        $pythonScript = base_path('scripts/news_summarizer.py');

        $process = new Process(['python', $pythonScript]);
        $process->run();

        if (!$process->isSuccessful()) {
            $this->error('Python script failed: ' . $process->getErrorOutput());
            return 1;
        }

        $output = $process->getOutput();

        $data = json_decode($output, true);

        if (isset($data['error'])) {
            $this->error('Python Error: ' . $data['error']);
            return 1;
        }

        NewsSummary::create($data);

        $this->info('Daily news summary fetched and stored successfully.');
        return 0;
    }
}

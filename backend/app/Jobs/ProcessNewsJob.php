<?php

namespace App\Jobs;

use App\Models\NewsSummary;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Symfony\Component\Process\Process;

class ProcessNewsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = 60;
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pythonScript = base_path('scripts/news_summarizer.py');
        
        $process = new Process(['python', $pythonScript]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \Exception('Python process failed: ' . $process->getErrorOutput());
        }

        $data = json_decode($process->getOutput(), true);

        if (json_last_error() !== JSON_ERROR_NONE || isset($data['error'])) {
            throw new \Exception('Invalid JSON or Python logic error');
        }

        NewsSummary::createFromPythonData($data);
    }
}

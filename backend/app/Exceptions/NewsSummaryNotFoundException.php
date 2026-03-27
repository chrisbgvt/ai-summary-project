<?php

namespace App\Exceptions;

class NewsSummaryNotFoundException extends ApiException
{
    public function __construct(string $message = 'News summary not found')
    {
        parent::__construct($message, 404);
    }
}
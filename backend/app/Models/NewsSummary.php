<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsSummary extends Model
{
    protected $fillable = ['title', 'summary', 'source', 'published_at'];
}

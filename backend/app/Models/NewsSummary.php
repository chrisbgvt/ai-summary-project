<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NewsSummary extends Model
{
    protected $fillable = ['title', 'summary', 'source', 'published_at'];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public static function createFromPythonData(array $data)
    {
        $validated = static::validateData($data);

        return self::updateOrCreate(
        ['title' => $validated['title']],    
        [
            'summary' => $validated['summary'],
            'source' => $validated['source'],
            'published_at' => $validated['published_at'],
        ]);
    }

    protected static function validateData(array $data): array
    {
        $validator = Validator::make($data, [
            'title' => 'required|string|max:500',
            'summary' => 'required|string|min:10|max:10000',
            'source' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}

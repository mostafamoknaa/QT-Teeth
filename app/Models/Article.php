<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'is_published',
        'author_name',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Resolve route binding by slug first, then fall back to id.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('slug', $value)->first()
            ?? $this->where('id', $value)->firstOrFail();
    }

    /**
     * Return slug for URL generation when available, else id.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Helper: the canonical URL key (slug ?? id).
     */
    public function getUrlKeyAttribute(): string
    {
        return $this->slug ?: (string) $this->id;
    }
}

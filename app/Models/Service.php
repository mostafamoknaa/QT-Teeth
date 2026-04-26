<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'order',
    ];

    public function comparisons()
    {
        return $this->hasMany(ServiceComparison::class);
    }

    /**
     * Resolve route binding by slug first, then fall back to id.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('slug', $value)->first()
            ?? $this->where('id', $value)->firstOrFail();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getUrlKeyAttribute(): string
    {
        return $this->slug ?: (string) $this->id;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Offer extends Model
{
    protected $fillable = [
        'title',
        'badge_text',
        'content',
        'image',
        'is_active',
        'discount_percentage',
        'original_price',
        'discounted_price',
        'valid_until',
        'service_id',
    ];

    protected $casts = [
        'is_active'        => 'boolean',
        'valid_until'      => 'date',
        'original_price'   => 'decimal:2',
        'discounted_price' => 'decimal:2',
    ];

    /** Only active + not yet expired offers */
    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->where(function (Builder $q) {
                $q->whereNull('valid_until')
                  ->orWhere('valid_until', '>=', Carbon::today());
            });
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

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
}

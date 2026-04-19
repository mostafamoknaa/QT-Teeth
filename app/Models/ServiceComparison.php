<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceComparison extends Model
{
    protected $fillable = [
        'service_id',
        'title',
        'before_image',
        'after_image',
        'order',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

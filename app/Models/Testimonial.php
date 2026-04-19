<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'client_name',
        'client_title',
        'service_name',
        'content',
        'video_url',
        'image',
        'rating',
        'order',
    ];
}

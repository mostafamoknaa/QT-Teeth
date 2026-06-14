<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeVideo extends Model
{
    protected $fillable = [
        'title',
        'thumbnail',
        'video_path',
        'youtube_url',
        'order',
    ];
}

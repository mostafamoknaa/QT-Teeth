<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RatingPhoto extends Model
{
    protected $fillable = [
        'image',
        'title',
        'order',
    ];
}

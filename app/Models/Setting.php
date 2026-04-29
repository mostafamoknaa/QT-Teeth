<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function getAllSettings()
    {
        return cache()->rememberForever('settings', function () {
            return self::pluck('value', 'key')->toArray();
        });
    }

    protected static function booted()
    {
        static::saved(function () {
            cache()->forget('settings');
        });
        
        static::deleted(function () {
            cache()->forget('settings');
        });
    }
}

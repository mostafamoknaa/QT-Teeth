<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'service_id',
        'offer',
        'branch',
        'message',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

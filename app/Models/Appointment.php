<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Appointment extends Model
{
    use Notifiable;

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

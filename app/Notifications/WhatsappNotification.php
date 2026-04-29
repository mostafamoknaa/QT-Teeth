<?php

namespace App\Notifications;

use App\Channels\Messages\WhatsAppMessage;
use App\Channels\WhatsAppChannel;
use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WhatsappNotification extends Notification
{
    use Queueable;

    public $appointment;

    /**
     * Create a new notification instance.
     */
    public function __construct(Appointment $appointment)
    {
        //
        $this->appointment = $appointment;
    }

    public function via()
    {
        return [WhatsAppChannel::class];
    }
    
    public function toWhatsApp($notifiable)
    {
        $message = "مرحبا " . $this->appointment->name . "،\nتم استلام طلب الحجز الخاص بك بنجاح. سنتواصل معك قريباً لتأكيد الموعد.";
        
        return (new WhatsAppMessage())
            ->content($message)
            ->to($this->appointment->phone);
    }
}

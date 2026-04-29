<?php
namespace App\Channels;

use Illuminate\Notifications\Notification;
use Twilio\Rest\Client;

class WhatsAppChannel
{
    public function send($notifiable, Notification $notification)
    {
        if (!method_exists($notification, 'toWhatsApp')) {
            return;
        }

        /** @var \App\Notifications\WhatsappNotification $notification */
        $message = $notification->toWhatsApp($notifiable);
        
        $phone = preg_replace('/[^0-9\+]/', '', $message->to);
        if (!str_starts_with($phone, '+')) {
            $phone = '+' . ltrim($phone, '0');
        }

        $from = config('services.twilio.whatsapp_from');

        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        return $twilio->messages->create('whatsapp:' . $phone, [
            "from" => 'whatsapp:' . $from,
            "body" => $message->content
        ]);
    }
}
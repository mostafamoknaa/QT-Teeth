<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Service;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_appointments' => Appointment::count(),
            'total_doctors' => Doctor::count(),
            'total_services' => Service::count(),
        ];

        $latest_appointments = Appointment::with(['service'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn($appointment) => [
                'id' => $appointment->id,
                'name' => $appointment->name,
                'phone' => $appointment->phone,
                'email' => $appointment->email,
                'service_id' => $appointment->service_id,
                'service_title' => $appointment->service?->title ?? 'N/A',
                'branch' => $appointment->branch,
                'created_at' => $appointment->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'latestAppointments' => $latest_appointments,
        ]);
    }
}

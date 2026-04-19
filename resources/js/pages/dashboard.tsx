import { Head } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface Appointment {
    id: number;
    name: string;
    phone: string;
    email: string;
    service_id: number | null;
    service_title: string;
    branch: string;
    created_at: string;
}

interface DashboardProps {
    stats: {
        total_appointments: number;
        total_doctors: number;
        total_services: number;
    };
    latestAppointments: Appointment[];
}

export default function Dashboard({ stats, latestAppointments }: DashboardProps) {
    const { t } = useTranslations();

    return (
        <>
            <Head title={t('admin.dashboard')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Total Appointments Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('admin.total_appointments')}</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_appointments}</div>
                            <p className="text-xs text-muted-foreground">{t('admin.total_appointments')}</p>
                        </CardContent>
                    </Card>

                    {/* Total Doctors Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('admin.total_doctors')}</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 16c0 .346-.023.69-.066 1.029a4 4 0 0 1-3.935 3.971M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_doctors}</div>
                            <p className="text-xs text-muted-foreground">{t('admin.total_doctors')}</p>
                        </CardContent>
                    </Card>

                    {/* Total Services Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t('admin.total_services')}</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_services}</div>
                            <p className="text-xs text-muted-foreground">{t('admin.total_services')}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Latest Appointments Table */}
                <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">{t('admin.latest_appointments')}</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="px-4 py-3 text-start font-medium">{t('admin.patient_name')}</th>
                                        <th className="px-4 py-3 text-start font-medium">{t('admin.phone')}</th>
                                        <th className="px-4 py-3 text-start font-medium">{t('admin.service')}</th>
                                        <th className="px-4 py-3 text-start font-medium">{t('booking.form.branch')}</th>
                                        <th className="px-4 py-3 text-start font-medium">{t('booking.form.email')}</th>
                                        <th className="px-4 py-3 text-start font-medium">تاريخ الحجز</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {latestAppointments.length > 0 ? (
                                        latestAppointments.map((appointment) => (
                                            <tr key={appointment.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-4 py-3 font-medium">{appointment.name}</td>
                                                <td className="px-4 py-3">{appointment.phone}</td>
                                                <td className="px-4 py-3">{appointment.service_title}</td>
                                                <td className="px-4 py-3">{appointment.branch}</td>
                                                <td className="px-4 py-3">{appointment.email || 'N/A'}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{appointment.created_at}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                                لا توجد مواعيد حالياً
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ],
};

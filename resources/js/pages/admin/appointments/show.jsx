import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AppointmentShow({ appointment }) {
    const { delete: destroy } = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        destroy(`/admin/appointments/${appointment.id}`);
    };

    return (
        <>
            <Head title={`Appointment - ${appointment.name}`} />
            
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/appointments">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
                        <p className="text-muted-foreground">View request details from {appointment.name}.</p>
                    </div>
                    <div className="flex-1"></div>
                    <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Appointment
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                        <CardDescription>Submitted on {new Date(appointment.created_at).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                                <p className="text-lg font-medium">{appointment.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                                <p className="text-lg font-medium" dir="ltr">{appointment.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                                <p className="text-lg font-medium">{appointment.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Branch</h3>
                                <p className="text-lg font-medium">{appointment.branch || 'Not specified'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested Service</h3>
                                <p className="text-lg font-medium">{appointment.service ? appointment.service.title : 'Any Service'}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Message</h3>
                            <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
                                {appointment.message ? appointment.message : <span className="text-muted-foreground italic">No message provided.</span>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the appointment
                            and remove its data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

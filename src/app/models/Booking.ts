export interface Booking {
    id: number;
    clientName: string;
    service: string;
    date: string;
    time: string;
    status: 'pending' | 'approved' | 'declined';
}
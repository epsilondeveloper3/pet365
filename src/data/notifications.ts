export interface NotificationItem {
  id: number;
  type: 'Booking' | 'Message' | 'Appointment' | 'Request' | 'Completion' | 'All';
  user?: string;
  role?: string;
  title?: string;
  msg: string;
  time: string;
}

export const notifications: NotificationItem[] = [
  { 
    id: 1, 
    type: 'Message', 
    user: 'Philip', 
    role: 'Groomer', 
    time: '1:20 PM', 
    msg: '2 new messages received from Philip Groomer' 
  },
  { 
    id: 2, 
    type: 'Booking', 
    title: 'Booking Confirmed', 
    msg: 'Your grooming appointment with Joe Kit is confirmed for March 5 at 3:10 PM.', 
    time: '12:45 AM' 
  },
  { 
    id: 3, 
    type: 'Appointment', 
    title: 'Upcoming Appointment', 
    msg: 'Your booking session with Alex Trainer starts in 1 hour.', 
    time: '11:45 AM' 
  },
  { 
    id: 4, 
    type: 'Request', 
    user: 'Dr. Palo', 
    role: 'Vet', 
    msg: 'Dr. Palo has accepted your veterinary consultation request.', 
    time: '10:30 AM' 
  },
  { 
    id: 5, 
    type: 'Completion', 
    title: 'Booking Completed', 
    msg: 'Your grooming appointment with Joe Kit has been completed. Please leave a review.', 
    time: '9:20 AM' 
  }
];

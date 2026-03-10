export interface BookingData {
  id: number | string;
  service: string;
  provider: string;
  status: 'Confirm' | 'Completed';
  price: string;
  pet: string;
  date: string;
  time: string;
  feedback?: boolean;
}

export const bookings: BookingData[] = [
  {
    id: 1,
    service: 'Grooming',
    provider: 'Paws & Claws Spa',
    status: 'Confirm',
    price: '$90.00',
    pet: 'Monty',
    date: 'March 25, 2026',
    time: '3:00 AM'
  },
  {
    id: 2,
    service: 'Vet Consultation',
    provider: 'Dr. Emily Jose',
    status: 'Confirm',
    price: '$120.00',
    pet: 'Bella',
    date: 'March 28, 2026',
    time: '10:00 AM'
  },
  {
    id: 4,
    service: 'Grooming',
    provider: 'Paws & Claws Spa',
    status: 'Completed',
    price: '$90.00',
    pet: 'Monty',
    date: 'March 2, 2026',
    time: '3:00 AM',
    feedback: true
  },
  {
    id: 5,
    service: 'Vaccination',
    provider: 'City Pet Clinic',
    status: 'Completed',
    price: '$50.00',
    pet: 'Charlie',
    date: 'February 20, 2026',
    time: '11:00 AM',
    feedback: false
  }
];

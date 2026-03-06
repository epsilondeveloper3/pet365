import { Calendar, Clock, Dog } from 'lucide-preact';
import { useState, useMemo } from 'preact/hooks';
import { MainLayout } from '../components/MainLayout';

interface Props {
  path?: string;
}

export function Booking({ path: _path }: Props) {
  const [activeTab, setActiveTab] = useState('All');

  const bookings = [
    { id: 1, service: 'Grooming', provider: 'Paws & Claws Spa', status: 'Confirm', price: '$90.00', pet: 'Monty', date: 'March 25, 2026', time: '3:00 AM' },
    { id: 2, service: 'Vet Consultation', provider: 'Dr. Emily Jose', status: 'Confirm', price: '$120.00', pet: 'Bella', date: 'March 28, 2026', time: '10:00 AM' },
    { id: 3, service: 'Grooming', provider: 'Paws & Claws Spa', status: 'Confirm', price: '$90.00', pet: 'Monty', date: 'March 15, 2026', time: '3:00 AM' },
    { id: 4, service: 'Grooming', provider: 'Paws & Claws Spa', status: 'Completed', price: '$90.00', pet: 'Monty', date: 'March 2, 2026', time: '3:00 AM', feedback: true },
    { id: 5, service: 'Vaccination', provider: 'City Pet Clinic', status: 'Completed', price: '$50.00', pet: 'Charlie', date: 'February 20, 2026', time: '11:00 AM', feedback: false },
  ];

  const filteredBookings = useMemo(() => {
    if (activeTab === 'All') return bookings;
    if (activeTab === 'Complete') return bookings.filter(b => b.status === 'Completed');
    if (activeTab === 'Upcoming') return bookings.filter(b => b.status === 'Confirm');
    return bookings;
  }, [activeTab]);

  return (
    <MainLayout activeTab="booking">
      <div className="section-header" style={{ padding: '20px 20px 10px', backgroundColor: 'white' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Booking History</h3>
      </div>

      <div className="tabs" style={{ backgroundColor: 'white', margin: 0, padding: '10px 20px', borderRadius: 0 }}>
        <div style={{ display: 'flex', background: '#F5F5F5', borderRadius: '30px', padding: '4px', width: '100%' }}>
          {['All', 'Complete', 'Upcoming'].map(tab => (
            <div 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ padding: '10px' }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 0 20px' }}>
        {filteredBookings.length > 0 ? filteredBookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div className="booking-header">
              <div className="booking-type">
                <h4 style={{ margin: 0 }}>{b.service}</h4>
                <p style={{ margin: '2px 0 0', color: 'var(--primary)', fontWeight: '500' }}>{b.provider}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div className={`status-badge ${b.status === 'Confirm' ? 'confirm' : 'completed'}`}>
                   {b.status}
                 </div>
                 <div className="price-text" style={{ marginTop: '5px', fontSize: '15px' }}>{b.price}</div>
              </div>
            </div>
            
            <div className="booking-details" style={{ borderTop: '1px solid #f9f9f9', marginTop: '15px', paddingTop: '15px' }}>
              <div className="detail-item">
                <Dog size={14} color="var(--primary)" />
                <span style={{ fontWeight: '600' }}>{b.pet}</span>
              </div>
              <div className="detail-item">
                <Calendar size={14} color="var(--primary)" />
                <span style={{ fontWeight: '600' }}>{b.date}</span>
              </div>
              <div className="detail-item">
                <Clock size={14} color="var(--primary)" />
                <span style={{ fontWeight: '600' }}>{b.time}</span>
              </div>
            </div>

            {b.feedback && (
              <button className="feedback-btn" style={{ marginTop: '15px', padding: '12px' }}>Give a Feedback</button>
            )}
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
             <p>No bookings found in this category.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

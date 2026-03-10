import './Booking.css';
import { Menu, User, Calendar, Clock, Dog } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { useState, useMemo } from 'preact/hooks';
import { route } from 'preact-router';
import { useSidebar } from '../../context/SidebarContext';
interface Props {
  path?: string;
}
export function Booking({
  path: _path
}: Props) {
  const {
    openSidebar
  } = useSidebar();
  const [activeTab, setActiveTab] = useState('All');
  const bookings = [{
    id: 1,
    service: 'Grooming',
    provider: 'Paws & Claws Spa',
    status: 'Confirm',
    price: '$90.00',
    pet: 'Monty',
    date: 'March 25, 2026',
    time: '3:00 AM'
  }, {
    id: 2,
    service: 'Vet Consultation',
    provider: 'Dr. Emily Jose',
    status: 'Confirm',
    price: '$120.00',
    pet: 'Bella',
    date: 'March 28, 2026',
    time: '10:00 AM'
  }, {
    id: 3,
    service: 'Grooming',
    provider: 'Paws & Claws Spa',
    status: 'Confirm',
    price: '$90.00',
    pet: 'Monty',
    date: 'March 15, 2026',
    time: '3:00 AM'
  }, {
    id: 4,
    service: 'Grooming',
    provider: 'Paws & Claws Spa',
    status: 'Completed',
    price: '$90.00',
    pet: 'Monty',
    date: 'March 2, 2026',
    time: '3:00 AM',
    feedback: true
  }, {
    id: 5,
    service: 'Vaccination',
    provider: 'City Pet Clinic',
    status: 'Completed',
    price: '$50.00',
    pet: 'Charlie',
    date: 'February 20, 2026',
    time: '11:00 AM',
    feedback: false
  }];
  const filteredBookings = useMemo(() => {
    if (activeTab === 'All') return bookings;
    if (activeTab === 'Complete') return bookings.filter(b => b.status === 'Completed');
    if (activeTab === 'Upcoming') return bookings.filter(b => b.status === 'Confirm');
    return bookings;
  }, [activeTab]);
  return <div className="-booking-style-1">
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-booking-style-2" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="section-header -booking-style-3">
        <h3 className="-booking-style-4">Booking History</h3>
      </div>

      <div className="tabs -booking-style-5">
        <div className="-booking-style-6">
          {['All', 'Complete', 'Upcoming'].map(tab => <div key={tab} className={`tab ${activeTab === tab ? 'active' : ''} -booking-style-7`} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>)}
        </div>
      </div>

      <div className="-booking-style-8">
        {filteredBookings.length > 0 ? filteredBookings.map(b => <div key={b.id} className="booking-card">
            <div className="booking-header">
              <div className="booking-type">
                <h4 className="-booking-style-9">{b.service}</h4>
                <p className="-booking-style-10">{b.provider}</p>
              </div>
              <div className="-booking-style-11">
                 <div className={`status-badge ${b.status === 'Confirm' ? 'confirm' : 'completed'}`}>
                   {b.status}
                 </div>
                 <div className="price-text -booking-style-12">{b.price}</div>
              </div>
            </div>
            
            <div className="booking-details -booking-style-13">
              <div className="detail-item">
                <Dog size={14} color="var(--primary)" />
                <span className="-booking-style-14">{b.pet}</span>
              </div>
              <div className="detail-item">
                <Calendar size={14} color="var(--primary)" />
                <span className="-booking-style-15">{b.date}</span>
              </div>
              <div className="detail-item">
                <Clock size={14} color="var(--primary)" />
                <span className="-booking-style-16">{b.time}</span>
              </div>
            </div>

            {b.feedback && <button className="feedback-btn -booking-style-17">Give a Feedback</button>}
          </div>) : <div className="-booking-style-18">
             <p>No bookings found in this category.</p>
          </div>}
      </div>

      <BottomNav activeTab="booking" />
    </div>;
}
import './Booking.css';
import { Menu, User, Calendar, Clock, Dog } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { useState, useMemo, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { useSidebar } from '../../context/SidebarContext';
interface Props {
  path?: string;
}
import { bookings as staticBookings } from '../../data/bookings';

export function Booking({
  path: _path
}: Props) {
  const {
    openSidebar
  } = useSidebar();
  const [activeTab, setActiveTab] = useState('All');
  const [dynamicBookings, setDynamicBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pet365_bookings');
    if (saved) {
      const parsed = JSON.parse(saved).map((b: any, idx: number) => ({
        id: `dyn-${idx}`,
        service: 'Service',
        provider: b.providerName,
        status: 'Confirm',
        price: '$129.99',
        pet: 'My Pet',
        date: `Jan ${b.date}, 2026`,
        time: b.time
      }));
      setDynamicBookings(parsed);
    }
  }, []);

  const allBookings = [...dynamicBookings, ...staticBookings];

  const filteredBookings = useMemo(() => {
    if (activeTab === 'All') return allBookings;
    if (activeTab === 'Complete') return allBookings.filter(b => b.status === 'Completed');
    if (activeTab === 'Upcoming') return allBookings.filter(b => b.status === 'Confirm');
    return allBookings;
  }, [activeTab, dynamicBookings]);
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
import './ProviderDashboard.css';
import { useState } from 'preact/hooks';
import { Menu, Bell, User, ChevronDown, DollarSign, Calendar, Star, Clock, Dog, MessageSquare, Briefcase } from 'lucide-preact';
import { useSidebar } from '../../context/SidebarContext';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function ProviderDashboard({ path: _path }: Props) {
  const { openSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState<'requests' | 'schedule'>('requests');

  const stats = [
    { label: 'Total Earnings', value: '$2,450.00', trend: '+2.0%', icon: <DollarSign size={18} /> },
    { label: 'Active Bookings', value: '05', trend: '', icon: <Clock size={18} /> },
    { label: 'Total Bookings', value: '34', trend: '+2.0%', icon: <Calendar size={18} /> },
    { label: 'Rating', value: '34', trend: '+2.0%', icon: <Star size={18} /> }
  ];

  const bookings = [
    { id: 1, service: 'Grooming', provider: 'Paws & Claws Spa', pet: 'Monty', date: 'March 2, 2026', time: '3:00 AM', price: '$90.00', status: 'Pending' },
    { id: 2, service: 'Grooming', provider: 'Paws & Claws Spa', pet: 'Monty', date: 'March 2, 2026', time: '3:00 AM', price: '$90.00', status: 'Pending' }
  ];

  return (
    <div className="container dashboard-container provider-dash-page">
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ width: '100px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="icon-btn" onClick={() => route('/notifications')}>
            <Bell size={20} />
          </div>
          <div className="icon-btn" onClick={() => route('/profile')}>
            <User size={20} />
          </div>
        </div>
      </div>

      <div className="welcome-section">
        <h2 className="welcome-title">Welcome back! 👋</h2>
        <p className="welcome-sub">Here's what's happening with your business today</p>
      </div>

      <div className="dash-filter-row">
        <h3>Month</h3>
        <button className="month-picker">
          Feb 2026 <ChevronDown size={16} />
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-circ">
                {stat.icon}
              </div>
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-body">
              <span className="stat-value">{stat.value}</span>
              {stat.trend && (
                <div className="stat-trend">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                     <path d="m19 12-7-7-7 7M12 19V5"/>
                   </svg>
                   {stat.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="tab-switcher-container">
        <div className="tab-switcher-pill">
           <button 
             className={`tab-btn-lg ${activeTab === 'requests' ? 'active' : ''}`}
             onClick={() => setActiveTab('requests')}
           >
             Booking Requests
           </button>
           <button 
             className={`tab-btn-lg ${activeTab === 'schedule' ? 'active' : ''}`}
             onClick={() => setActiveTab('schedule')}
           >
             Today's Schedule
           </button>
        </div>
      </div>

      <div className="dash-list-section">
        {bookings.map(b => (
          <div key={b.id} className="provider-booking-card">
            <div className="card-top">
              <div className="type-row">
                <h4>{b.service} <span className="pnd-tag">{b.status}</span></h4>
                <span className="price-tag">{b.price}</span>
              </div>
              <p className="provider-sub">{b.provider}</p>
            </div>
            
            <div className="card-details-row">
               <div className="det-item"><Dog size={14} color="var(--primary)" /> {b.pet}</div>
               <div className="det-item"><Calendar size={14} color="var(--primary)" /> {b.date}</div>
               <div className="det-item"><Clock size={14} color="var(--primary)" /> {b.time}</div>
            </div>

            <div className="card-actions">
               {activeTab === 'requests' ? (
                 <>
                   <button className="btn-sec-outline">Cancel</button>
                   <button className="btn-prim-full">Accept</button>
                 </>
               ) : (
                 <>
                   <button className="btn-sec-outline"><MessageSquare size={16} /> Chats</button>
                   <button className="btn-prim-full"><Briefcase size={16} /> Start Service</button>
                 </>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

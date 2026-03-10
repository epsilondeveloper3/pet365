import './Notifications.css';
import { useState } from 'preact/hooks';
import { ChevronLeft, Filter, MessageSquare, Calendar, CheckCircle2 } from 'lucide-preact';
import { route } from 'preact-router';
import { BottomNav } from '../../components/BottomNav';

interface Props {
  path?: string;
}

export function Notifications({ path: _path }: Props) {
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    { id: 1, type: 'Message', user: 'Philip', role: 'Groomer', time: '1:20 PM', msg: '2 new messages received from Philip Groomer', icon: <MessageSquare size={16} /> },
    { id: 2, type: 'Booking', title: 'Booking Confirmed', msg: 'Your grooming appointment with Joe Kit is confirmed for March 5 at 3:10 PM.', time: '12:45 AM', icon: <Calendar size={16} /> },
    { id: 3, type: 'Appointment', title: 'Upcoming Appointment', msg: 'Your booking session with Alex Trainer starts in 1 hour.', time: '11:45 AM', icon: <Calendar size={16} /> },
    { id: 4, type: 'Request', user: 'Dr. Palo', role: 'Vet', msg: 'Dr. Palo has accepted your veterinary consultation request.', time: '10:30 AM', icon: <CheckCircle2 size={16} /> },
    { id: 5, type: 'Completion', title: 'Booking Completed', msg: 'Your grooming appointment with Joe Kit has been completed. Please leave a review.', time: '9:20 AM', icon: <CheckCircle2 size={16} /> }
  ];

  return (
    <div className="container notifications-page">
      <div className="page-header">
        <div className="icon-btn-sm" onClick={() => route('/dashboard')}>
          <ChevronLeft size={20} />
        </div>
        <h3>Notifications</h3>
        <div className="icon-btn-sm">
          <Filter size={20} />
        </div>
      </div>

      <div className="tabs-container">
        {['All', 'Booking', 'Message'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="notification-list">
        {notifications.map(notif => (
          <div key={notif.id} className="notification-card">
            <div className="card-header-row">
              <div className="icon-circle">{notif.icon}</div>
              <div className="content">
                <div className="title-row">
                  <h4>{notif.user ? `${notif.user} ${notif.role}` : notif.title}</h4>
                  <span className="notif-time">{notif.time}</span>
                </div>
                <p>{notif.msg}</p>
                {notif.type === 'Completion' && <span className="review-link">Please leave a review.</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}

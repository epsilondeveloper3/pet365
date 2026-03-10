import './Notifications.css';
import { useState } from 'preact/hooks';
import { ChevronLeft, Filter, MessageSquare, Calendar, CheckCircle2 } from 'lucide-preact';
import { route } from 'preact-router';
import { BottomNav } from '../../components/BottomNav';

interface Props {
  path?: string;
}

import { notifications as allNotifications } from '../../data/notifications';

export function Notifications({ path: _path }: Props) {
  const [activeTab, setActiveTab] = useState('All');

  const getIcon = (type: string) => {
    switch(type) {
      case 'Message': return <MessageSquare size={16} />;
      case 'Booking':
      case 'Appointment': return <Calendar size={16} />;
      default: return <CheckCircle2 size={16} />;
    }
  };

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
        {allNotifications.filter(n => activeTab === 'All' || n.type === activeTab).map(notif => (
          <div key={notif.id} className="notification-card">
            <div className="card-header-row">
              <div className="icon-circle">{getIcon(notif.type)}</div>
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

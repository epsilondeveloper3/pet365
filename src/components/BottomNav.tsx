import { Home, Search as SearchIcon, MessageCircle, Calendar, PlusCircle } from 'lucide-preact';
import { route } from 'preact-router';

interface BottomNavProps {
  activeTab: string;
}

export function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <div className="bottom-nav">
      <div 
        className={`nav-item ${activeTab === 'home' ? 'active-pill' : ''}`}
        onClick={() => route('/dashboard')}
      >
        <Home size={20} />
        {activeTab === 'home' && <span>Home</span>}
      </div>
      
      <div 
        className={`nav-item ${activeTab === 'search' ? 'active-pill' : ''}`}
        onClick={() => route('/search')}
      >
        <SearchIcon size={20} />
        {activeTab === 'search' && <span>Search</span>}
      </div>

      <div 
        className={`nav-item ${activeTab === 'chats' ? 'active-pill' : ''}`}
        onClick={() => route('/chats')}
      >
        <MessageCircle size={20} />
        {activeTab === 'chats' && <span>Chats</span>}
      </div>

      <div 
        className={`nav-item ${activeTab === 'booking' ? 'active-pill' : ''}`}
        onClick={() => route('/booking')}
      >
        <Calendar size={20} />
        {activeTab === 'booking' && <span>Booking</span>}
      </div>

      <div 
        className={`nav-item ${activeTab === 'profile' ? 'active-pill' : ''}`}
        onClick={() => route('/profile')}
      >
        <PlusCircle size={20} />
        {activeTab === 'profile' && <span>Profile</span>}
      </div>
    </div>
  );
}

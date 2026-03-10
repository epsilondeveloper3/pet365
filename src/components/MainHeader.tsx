import { Menu, Bell, User } from 'lucide-preact';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';

export function MainHeader() {
  const { openSidebar } = useSidebar();

  return (
    <div className="top-bar">
      <div className="icon-btn" onClick={openSidebar}>
        <Menu size={20} />
      </div>
      <img src="/logo.png" alt="Pet365 Logo" className="logo-image" style={{ width: '100px', height: 'auto' }} />
      <div className="header-right-icons" style={{ display: 'flex', gap: '10px' }}>
        <div className="icon-btn" onClick={() => route('/notifications')}>
          <Bell size={20} />
        </div>
        <div className="icon-btn" onClick={() => route('/profile')}>
          <User size={20} />
        </div>
      </div>
    </div>
  );
}

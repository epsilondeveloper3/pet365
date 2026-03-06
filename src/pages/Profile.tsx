import { ChevronRight, Menu, RefreshCw, User, CreditCard, ShieldCheck, HelpCircle, LogOut, Phone, Mail, MapPin, Edit3 } from 'lucide-preact';
import { route } from 'preact-router';
import { BottomNav } from '../components/BottomNav';
import { useSidebar } from '../context/SidebarContext';

interface Props {
  path?: string;
}

export function Profile({ path: _path }: Props) {
  const { openSidebar } = useSidebar();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ height: '30px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        <div className="profile-header-card">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop" className="profile-avatar-large" alt="Wade Warren" />
          <div>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Wade Warren</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <Phone size={14} color="var(--primary)" /> (201) 555-0124
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <Mail size={14} color="var(--primary)" /> john@example.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <MapPin size={14} color="var(--primary)" /> 3890 Poplar Dr.
              </div>
            </div>
          </div>
          <div className="owner-badge">Owner</div>
          <div 
            onClick={() => route('/edit-profile')} 
            style={{ 
              position: 'absolute', 
              bottom: '15px', 
              right: '15px', 
              background: 'var(--bg-color)',
              padding: '6px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer' 
            }}
          >
            <Edit3 size={16} color="var(--primary)" />
          </div>
        </div>

        <div style={{ padding: '0 20px', marginBottom: '10px' }}>
          <button className="btn btn-primary" style={{ borderRadius: '15px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }} onClick={() => route('/become-provider-1')}>
            <RefreshCw size={18} /> Switch To Provider
          </button>
        </div>

        <div className="menu-list" style={{ marginTop: '10px' }}>
          <div onClick={() => route('/edit-profile')} className="menu-item">
            <div className="menu-item-left">
              <User size={20} color="var(--primary)" />
              <span>Edit Profile</span>
            </div>
            <ChevronRight size={18} color="#D1D5DB" />
          </div>

          <div className="menu-item">
            <div className="menu-item-left">
              <CreditCard size={20} color="var(--primary)" />
              <span>Payment Method</span>
            </div>
            <ChevronRight size={18} color="#D1D5DB" />
          </div>

          <div onClick={() => route('/privacy')} className="menu-item">
            <div className="menu-item-left">
              <ShieldCheck size={20} color="var(--primary)" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight size={18} color="#D1D5DB" />
          </div>

          <div onClick={() => route('/support')} className="menu-item">
            <div className="menu-item-left">
              <HelpCircle size={20} color="var(--primary)" />
              <span>Help & Support</span>
            </div>
            <ChevronRight size={18} color="#D1D5DB" />
          </div>
        </div>

        <button className="logout-btn" onClick={() => route('/')}>
          Log Out <LogOut size={18} />
        </button>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}


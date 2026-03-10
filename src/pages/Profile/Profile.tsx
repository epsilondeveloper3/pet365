import './Profile.css';
import { ChevronRight, Menu, RefreshCw, User, CreditCard, ShieldCheck, HelpCircle, LogOut, Phone, Mail, MapPin, Edit3 } from 'lucide-preact';
import { route } from 'preact-router';
import { BottomNav } from '../../components/BottomNav';
import { useSidebar } from '../../context/SidebarContext';
interface Props {
  path?: string;
}
export function Profile({
  path: _path
}: Props) {
  const {
    openSidebar
  } = useSidebar();
  return <div className="-profile-style-1">
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-profile-style-2" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="-profile-style-3">
        <div className="profile-header-card">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop" className="profile-avatar-large" alt="Wade Warren" />
          <div>
            <h2 className="-profile-style-4">Wade Warren</h2>
            <div className="-profile-style-5">
              <div className="-profile-style-6">
                <Phone size={14} color="var(--primary)" /> (201) 555-0124
              </div>
              <div className="-profile-style-7">
                <Mail size={14} color="var(--primary)" /> john@example.com
              </div>
              <div className="-profile-style-8">
                <MapPin size={14} color="var(--primary)" /> 3890 Poplar Dr.
              </div>
            </div>
          </div>
          <div className="owner-badge">Owner</div>
          <div onClick={() => route('/edit-profile')} className="-profile-style-9">
            <Edit3 size={16} color="var(--primary)" />
          </div>
        </div>

        <div className="-profile-style-10">
          <button className="btn btn-primary -profile-style-11" onClick={() => route('/become-provider-1')}>
            <RefreshCw size={18} /> Switch To Provider
          </button>
        </div>

        <div className="menu-list -profile-style-12">
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
    </div>;
}
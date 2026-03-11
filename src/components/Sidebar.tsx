import { X, User, RefreshCw, ShieldCheck, HelpCircle, LogOut, ChevronRight, Briefcase } from 'lucide-preact';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  const handleNavigate = (path: string) => {
    closeSidebar();
    route(path);
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar Content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ padding: '40px 25px 30px', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <img src="/logo.png" style={{ height: '35px' }} />
           <div className="icon-btn" onClick={closeSidebar}>
              <X size={20} color="var(--text-muted)" />
           </div>
        </div>
        
        <div style={{ padding: '20px', flex: 1 }}>
           <div className="menu-list" style={{ margin: 0 }}>
             <div onClick={() => handleNavigate('/profile')} className="menu-item">
                <div className="menu-item-left">
                  <User size={18} color="var(--primary)" />
                  <span>Profile</span>
                </div>
                <ChevronRight size={16} color="#D1D5DB" />
             </div>

              <div onClick={() => handleNavigate('/become-provider-1')} className="menu-item">
                 <div className="menu-item-left">
                   <RefreshCw size={18} color="var(--primary)" />
                   <span>Switch to Provider</span>
                 </div>
                 <ChevronRight size={16} color="#D1D5DB" />
              </div>

              <div onClick={() => handleNavigate('/provider-dashboard')} className="menu-item">
                 <div className="menu-item-left">
                   <Briefcase size={18} color="var(--primary)" />
                   <span>Provider Dashboard</span>
                 </div>
                 <ChevronRight size={16} color="#D1D5DB" />
              </div>

             <div onClick={() => handleNavigate('/privacy')} className="menu-item">
                <div className="menu-item-left">
                  <ShieldCheck size={18} color="var(--primary)" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight size={16} color="#D1D5DB" />
             </div>

             <div onClick={() => handleNavigate('/support')} className="menu-item">
                <div className="menu-item-left">
                  <HelpCircle size={18} color="var(--primary)" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight size={16} color="#D1D5DB" />
             </div>
           </div>
        </div>

        <div style={{ padding: '20px' }}>
           <button className="logout-btn" onClick={() => handleNavigate('/')} style={{ width: '100%', margin: 0 }}>
              Log Out <LogOut size={18} />
           </button>
        </div>
      </div>
    </>
  );
}

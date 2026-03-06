import { Menu, User, ChevronLeft } from 'lucide-preact';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';
import { BottomNav } from './BottomNav';

interface MainLayoutProps {
  children: any;
  activeTab?: string;
  showTopBar?: boolean;
  showBottomNav?: boolean;
  showBackButton?: boolean;
  title?: string;
  customCenter?: any;
  footer?: any;
  contentStyle?: any;
}

export function MainLayout({ 
  children, 
  activeTab, 
  showTopBar = true, 
  showBottomNav = true,
  showBackButton = false,
  title,
  customCenter,
  footer,
  contentStyle = {}
}: MainLayoutProps) {
  const { openSidebar } = useSidebar();

  const handleBack = () => {
    history.back();
  };

  return (
    <div className="main-layout-container">
      {showTopBar && (
        <div className="top-bar-fixed">
          <div className="top-bar-content">
            {showBackButton ? (
              <div className="icon-btn" onClick={handleBack}>
                <ChevronLeft size={20} />
              </div>
            ) : (
              <div className="icon-btn" onClick={openSidebar}>
                <Menu size={20} />
              </div>
            )}
            
            {customCenter ? (
              <div className="top-bar-custom-center">
                {customCenter}
              </div>
            ) : title ? (
              <h1 className="top-bar-title">{title}</h1>
            ) : (
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="top-bar-logo"
                onClick={() => route('/dashboard')} 
              />
            )}

            <div className="icon-btn" onClick={() => route('/profile')}>
              <User size={20} />
            </div>
          </div>
        </div>
      )}

      <main 
        className={`main-content ${showTopBar ? 'has-top-bar' : ''} ${showBottomNav ? 'has-bottom-nav' : ''}`}
        style={contentStyle}
      >
        {children}
      </main>

      {footer}

      {showBottomNav && activeTab && <BottomNav activeTab={activeTab} />}
    </div>
  );
}

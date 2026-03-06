import { ChevronLeft } from 'lucide-preact';

export function PrivacyPolicy({ path: _path }: { path?: string }) {
  return (
    <div className="container">
      <div className="top-bar" style={{ padding: '0 0 20px 0' }}>
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Privacy Policy</h2>
        <div style={{ width: '40px' }}></div>
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
        <h3>1. Information Collection</h3>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request services, or communicate with us.</p>
        <h3 style={{ marginTop: '20px' }}>2. Use of Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, develop new features, and protect Pet365 and our users.</p>
      </div>
    </div>
  );
}

export function HelpSupport({ path: _path }: { path?: string }) {
  return (
    <div className="container">
      <div className="top-bar" style={{ padding: '0 0 20px 0' }}>
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <h2 style={{ fontSize: '18px', margin: 0 }}>Help & Support</h2>
        <div style={{ width: '40px' }}></div>
      </div>
      <div className="form-group">
        <label>How can we help?</label>
        <textarea style={{ width: '100%', minHeight: '150px', background: 'white', border: 'none', borderRadius: '12px', padding: '15px' }} placeholder="Describe your issue..."></textarea>
      </div>
      <button className="btn btn-primary">Send Message</button>
    </div>
  );
}

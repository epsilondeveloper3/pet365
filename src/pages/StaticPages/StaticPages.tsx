import './StaticPages.css';
import { ChevronLeft } from 'lucide-preact';
export function PrivacyPolicy({
  path: _path
}: {
  path?: string;
}) {
  return <div className="container">
      <div className="top-bar -static-pages-style-1">
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <h2 className="-static-pages-style-2">Privacy Policy</h2>
        <div className="-static-pages-style-3"></div>
      </div>
      <div className="-static-pages-style-4">
        <h3>1. Information Collection</h3>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request services, or communicate with us.</p>
        <h3 className="-static-pages-style-5">2. Use of Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, develop new features, and protect Pet365 and our users.</p>
      </div>
    </div>;
}
export function HelpSupport({
  path: _path
}: {
  path?: string;
}) {
  return <div className="container">
      <div className="top-bar -static-pages-style-6">
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <h2 className="-static-pages-style-7">Help & Support</h2>
        <div className="-static-pages-style-8"></div>
      </div>
      <div className="form-group">
        <label>How can we help?</label>
        <textarea placeholder="Describe your issue..." className="-static-pages-style-9"></textarea>
      </div>
      <button className="btn btn-primary">Send Message</button>
    </div>;
}
import './ServiceDetail.css';
import { ChevronLeft, Star, Dog, Clock, User } from 'lucide-preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
interface Props {
  path?: string;
}
export function ServiceDetail({
  path: _path
}: Props) {
  const [activeTab, setActiveTab] = useState('About');
  return <div className="-service-detail-style-1">
      <div className="top-bar -service-detail-style-2">
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-service-detail-style-3" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="-service-detail-style-4">
        {/* Profile Card Section */}
        <div className="provider-hero-card">
           <div className="-service-detail-style-5">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop" className="provider-hero-img" alt="Emily Jose" />
              <div className="-service-detail-style-6">
                 <div className="-service-detail-style-7">
                    <h2 className="-service-detail-style-8">I'M EMILY JOSE</h2>
                 </div>
                 <p className="-service-detail-style-9">A cat sitter in Ridgewood, NY</p>
                 
                 <div className="-service-detail-style-10">
                    <div className="tag-chip">
                       <Dog size={12} /> Dog, Cat
                    </div>
                    <div className="tag-chip">
                       <Clock size={12} /> 2 Year Exp
                    </div>
                 </div>

                 <div className="-service-detail-style-11">
                    <div>
                        <span className="-service-detail-style-12">Rating</span>
                        <div className="-service-detail-style-13">
                            <Star size={14} color="#FFD700" fill="#FFD700" />
                            <span className="-service-detail-style-14">4.5</span>
                        </div>
                    </div>
                    <div className="-service-detail-style-15"></div>
                    <div>
                        <span className="-service-detail-style-16">Price</span>
                        <h3 className="-service-detail-style-17">$129.99</h3>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Custom Tabs */}
        <div className="tab-container-rounded">
          {['About', 'Reviews'].map(tab => <div key={tab} className={`tab-item-rounded ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>)}
        </div>

        {/* Content Section */}
        <div className="about-content">
          {activeTab === 'About' ? <p className="-service-detail-style-18">
              Emily is a lifelong pet lover. They're available for overnight stays on weekends and can administer topical, eye/ear, and oral meds. Your furry family will be treated with love and care while you're away! 🐱✨ <br /><br />
              They have extensive experience with senior pets and special needs. They provide regular photo updates and a detailed report after each visit.
            </p> : <div className="-service-detail-style-19">
                No reviews yet for this provider.
             </div>}
        </div>

        <button className="book-now-btn" onClick={() => route('/dashboard')}>
           Book This Provider
        </button>
      </div>
    </div>;
}
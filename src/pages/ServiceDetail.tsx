import { Star, Dog, Clock } from 'lucide-preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { MainLayout } from '../components/MainLayout';

interface Props {
  path?: string;
}

export function ServiceDetail({ path: _path }: Props) {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <MainLayout showBackButton showBottomNav={false}>
      <div style={{ padding: '20px', paddingBottom: '30px' }}>
        {/* Profile Card Section */}
        <div className="provider-hero-card">
           <div style={{ display: 'flex', gap: '15px' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop" className="provider-hero-img" alt="Emily Jose" />
              <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, textTransform: 'uppercase' }}>I'M EMILY JOSE</h2>
                 </div>
                 <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', margin: '4px 0' }}>A cat sitter in Ridgewood, NY</p>
                 
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
                    <div className="tag-chip">
                       <Dog size={12} /> Dog, Cat
                    </div>
                    <div className="tag-chip">
                       <Clock size={12} /> 2 Year Exp
                    </div>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                    <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Rating</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Star size={14} color="#FFD700" fill="#FFD700" />
                            <span style={{ fontSize: '14px', fontWeight: '800' }}>4.5</span>
                        </div>
                    </div>
                    <div style={{ width: '1px', height: '25px', backgroundColor: '#eee', margin: '0 5px' }}></div>
                    <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Price</span>
                        <h3 style={{ fontSize: '18px', margin: '2px 0 0', color: 'var(--primary)', fontWeight: '800' }}>$129.99</h3>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Custom Tabs */}
        <div className="tab-container-rounded">
          {['About', 'Reviews'].map(tab => (
            <div 
              key={tab} 
              className={`tab-item-rounded ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="about-content">
          {activeTab === 'About' ? (
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-main)', margin: 0 }}>
              Emily is a lifelong pet lover. They're available for overnight stays on weekends and can administer topical, eye/ear, and oral meds. Your furry family will be treated with love and care while you're away! 🐱✨ <br/><br/>
              They have extensive experience with senior pets and special needs. They provide regular photo updates and a detailed report after each visit.
            </p>
          ) : (
             <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                No reviews yet for this provider.
             </div>
          )}
        </div>

        <button className="book-now-btn" onClick={() => route('/dashboard')}>
           Book This Provider
        </button>
      </div>
    </MainLayout>
  );
}

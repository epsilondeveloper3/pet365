import './ServiceDetail.css';
import { ChevronLeft, Star, Dog, Clock, Bell, User, MapPin, ChevronLeft as PrevIcon, ChevronRight as NextIcon, MessageSquare } from 'lucide-preact';
import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import { providers, type Provider } from '../../data/providers';

interface Props {
  path?: string;
  id?: string;
}

export function ServiceDetail({ id }: Props) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [activeTab, setActiveTab] = useState('About');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('24');
  const [selectedTime, setSelectedTime] = useState('10:30 PM');

  useEffect(() => {
    if (id) {
      const found = providers.find(p => p.id === id);
      if (found) setProvider(found);
    }
  }, [id]);

  if (!provider) return <div className="container">Loading...</div>;

  return (
    <div className="container dashboard-container service-detail-page">
      <div className="top-bar">
        <div className="icon-btn" onClick={() => window.history.back()}>
          <ChevronLeft size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ width: '100px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="icon-btn" onClick={() => route('/notifications')}>
            <Bell size={20} />
          </div>
          <div className="icon-btn" onClick={() => route('/profile')}>
            <User size={20} />
          </div>
        </div>
      </div>

      <div className="provider-header-card">
         <div className="ph-content">
            <img src={provider.img} className="ph-avatar" alt={provider.name} />
            <div className="ph-info">
               <h2>I'M {provider.name}</h2>
               <p className="ph-loc">A {provider.type.toLowerCase()} in {provider.location}</p>
               <div className="ph-tags">
                  <span className="ph-tag"><Dog size={12} /> {provider.pets}</span>
                  <span className="ph-tag"><Clock size={12} /> Exp: {provider.exp}</span>
               </div>
               <div className="ph-stats">
                  <div className="ph-stat">
                     <span className="stat-lbl">Rating</span>
                     <div className="stat-val"><Star size={14} fill="#FFD700" color="#FFD700" /> {provider.rating}</div>
                  </div>
                  <div className="stat-div"></div>
                  <div className="ph-stat">
                     <span className="stat-lbl">Price</span>
                     <div className="stat-val price">${provider.price}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="certification-section">
         <p>Certification</p>
         <div className="cert-icons">
            {provider.certifications.map((cert, idx) => (
               <img key={idx} src={cert} alt={`Cert ${idx + 1}`} />
            ))}
         </div>
      </div>

      <div className="detail-tabs">
        {['About', 'Reviews', 'Availability'].map(tab => (
          <button 
            key={tab} 
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content-area">
        {activeTab === 'About' && (
          <div className="about-tab">
            <p className="bio-text">{provider.bio}</p>
            
            <div className="service-rates">
               <h3>{provider.name.split(' ')[0]}'s Service Area & Rates</h3>
               <div className="rate-item">
                  <div className="rate-ic"><MessageSquare size={16} /></div>
                  <div className="rate-info">
                     <h4>Meet & Greets</h4>
                  </div>
               </div>
               <div className="rate-item">
                  <div className="rate-ic"><MapPin size={16} /></div>
                  <div className="rate-info">
                     <h4>Drop-in visits to your home</h4>
                     <ul>
                        <li>$25.00 / 20min</li>
                        <li>$39.25 / 45min</li>
                        <li>$50.00 / 60min</li>
                     </ul>
                  </div>
               </div>
               {/* Functional Map Embed */}
               <div className="map-wrapper" style={{ margin: '15px 0', height: '200px', borderRadius: '15px', overflow: 'hidden' }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=-73.91%2C40.70%2C-73.89%2C40.71&layer=mapnik`}
                  ></iframe>
               </div>
            </div>

            <div className="cancel-policy">
               <h3>Cancellation Policy</h3>
               <p>Cat parents may cancel within 24 hours of making their reservation and receive a full refund...</p>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="reviews-tab">
            <div className="reviews-header">
               <h3>{provider.name.split(' ')[0]}'s Reviews</h3>
               <button className="sort-btn">Sort By <ChevronDown size={14} /></button>
            </div>
            {provider.reviews.length > 0 ? provider.reviews.map(r => (
               <div key={r.id} className="review-card">
                  <div className="review-user-row">
                     <img src={r.avatar} alt={r.user} />
                     <div className="ru-info">
                        <h4>{r.user}</h4>
                        <span>{r.date}</span>
                     </div>
                     <div className="ru-rating"><Star size={12} fill="#FFD700" color="#FFD700" /> {r.rating}</div>
                  </div>
                  <p>{r.comment}</p>
               </div>
            )) : <p className="empty-txt">No reviews yet.</p>}
          </div>
        )}

        {activeTab === 'Availability' && (
          <div className="availability-tab">
            <div className="calendar-box">
               <div className="cal-header">
                  <PrevIcon size={18} />
                  <span>January - 2026</span>
                  <NextIcon size={18} />
               </div>
               <div className="cal-grid">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} className="cal-day-label">{d}</span>)}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const d = i + 1;
                    const isBusy = d % 5 === 0;
                    return (
                      <span 
                        key={i} 
                        className={`cal-date ${isBusy ? 'red' : selectedDate === d.toString() ? 'active' : ''}`}
                        onClick={() => !isBusy && setSelectedDate(d.toString())}
                      >
                        {d}
                      </span>
                    );
                  })}
               </div>
               <div className="cal-legend">
                  <span className="leg-item"><div className="dot available"></div> Available</span>
                  <span className="leg-item"><div className="dot busy"></div> Not Available</span>
               </div>
            </div>
            <div className="bottom-btns">
               <button className="btn-book-primary" onClick={() => setShowBooking(true)}>Book Service</button>
               <button className="btn-chats-sec" onClick={() => route(`/chat-detail/${provider.id}`)}><MessageSquare size={18} /> Chats</button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Side Sheet / Modal */}
      {showBooking && (
        <div className="booking-overlay" onClick={() => setShowBooking(false)}>
           <div className="booking-sheet" onClick={e => e.stopPropagation()}>
              <div className="sheet-handle"></div>
              <h3>Book Service</h3>
              <p className="sheet-sub">Pick Date & Time</p>
              
              <div className="date-scroll">
                 {['22 Mon', '23 Tue', '24 Wed', '25 Thu', '26 Fri'].map(d => (
                    <div 
                      key={d} 
                      className={`date-pill ${selectedDate === d.split(' ')[0] ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d.split(' ')[0])}
                    >
                       <span>{d.split(' ')[0]}</span>
                       <small>{d.split(' ')[1]}</small>
                    </div>
                 ))}
              </div>

              <div className="time-grid">
                 {['09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'].map(t => (
                    <button 
                      key={t} 
                      className={`time-btn ${selectedTime === t ? 'active' : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                 ))}
              </div>

              <button className="btn-confirm-booking" onClick={() => {
                 const booking = {
                   providerId: provider.id,
                   providerName: provider.name,
                   date: selectedDate,
                   time: selectedTime,
                   timestamp: new Date().toISOString()
                 };
                 const saved = localStorage.getItem('pet365_bookings');
                 const bookings = saved ? JSON.parse(saved) : [];
                 bookings.push(booking);
                 localStorage.setItem('pet365_bookings', JSON.stringify(bookings));
                 alert(`Service with ${provider.name} Booked Successfully for Jan ${selectedDate} at ${selectedTime}!`);
                 setShowBooking(false); 
              }}>
                 Book Service Now
              </button>
           </div>
        </div>
      )}
    </div>
  );
}


function ChevronDown(props: any) {
  return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
}
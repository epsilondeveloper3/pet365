import { Menu, User, MapPin, Calendar, Search, Filter, Dog, Clock } from 'lucide-preact';
import { BottomNav } from '../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';

interface Props {
  path?: string;
}

export function Dashboard({ path: _path }: Props) {
  const { openSidebar } = useSidebar();

  const categories = [
    { name: 'Vets', icon: '/vet.png' },
    { name: 'Trainee', icon: '/traine.png' },
    { name: 'Groomers', icon: '/groomer.png' },
    { name: 'Boarding', icon: '/Boarding.png' },
  ];

  const providers = [
    { 
      name: 'Jose Will', 
      type: 'Trainee', 
      rating: '4.5', 
      exp: '2 Year', 
      pets: 'Dog, Cat',
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'
    },
    { 
      name: 'Philip', 
      type: 'Groomers', 
      rating: '5.0', 
      exp: '3 Year', 
      pets: 'Dog, Cat',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ height: '30px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar-rounded" onClick={() => route('/search')}>
          <div className="location-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--primary)" />
              <span>Location</span>
            </div>
            <span>Lose vegas, 949</span>
          </div>
          <div style={{ width: '1px', height: '25px', backgroundColor: '#E0E0E0', margin: '0 10px' }}></div>
          <div className="date-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} color="var(--primary)" />
              <span>Date</span>
            </div>
            <span>24, Oct 2026</span>
          </div>
          <div className="search-icon-only">
            <Search size={22} />
          </div>
        </div>
        <div className="filter-btn-circle">
           <Filter size={22} />
        </div>
      </div>

      <div className="promo-banner">
        <div className="banner-content">
          <h2>Find <span>Trusted Pet Care</span> <br/> Near You</h2>
          <button className="explore-btn" onClick={() => route('/search')}>Explore Now</button>
        </div>
        <img 
          src="/banerbg.png" 
          alt="Pets" 
          className="banner-img" 
        />
      </div>

      <div className="section-header">
        <h3>Services</h3>
      </div>

      <div className="categories-scroll" style={{ paddingBottom: '20px' }}>
        {categories.map(cat => (
          <div key={cat.name} className="category-item" onClick={() => route('/search')}>
            <div className="category-icon">
              <img src={cat.icon} alt={cat.name} />
            </div>
            <span style={{ color: 'var(--text-main)', fontSize: '13px', fontWeight: '600' }}>{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h3>Featured Providers</h3>
      </div>

      <div className="providers-list" style={{ paddingBottom: '100px' }}>
        {providers.map((p, j) => (
          <div key={j} className="provider-card" onClick={() => route('/service-detail')}>
            <div className="provider-img-container">
              <img src={p.img} alt={p.name} className="provider-img" />
              <div className="rating-badge">
                <span style={{ color: '#FFD700' }}>★</span> {p.rating}
              </div>
            </div>
            <div className="provider-info">
              <h4>{p.name}</h4>
              <p>{p.type}</p>
              <div className="provider-tags">
                 <div className="tag"><Dog size={12} color="var(--primary)" /> {p.pets}</div>
                 <div className="tag"><Clock size={12} color="var(--primary)" /> Exp: {p.exp}</div>
              </div>
              <button className="book-btn-sm">Book Now</button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}

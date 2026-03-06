import { useState, useMemo } from 'preact/hooks';
import { Menu, User, MapPin, Search as SearchIcon, Star, Navigation, X, Dog, Clock } from 'lucide-preact';
import { BottomNav } from '../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';

interface Props {
  path?: string;
}

export function Search({ path: _path }: Props) {
  const { openSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Lose vegas, 949');

  const allProviders = [
    { name: 'Philip', type: 'Groomer', rating: '5.0', exp: '4 Year', dist: '200m Away', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', pet: 'Dog' },
    { name: 'Gladys', type: 'Vet', rating: '4.5', exp: '1 Year', dist: '130m Away', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', pet: 'Cat' },
    { name: 'Dianne', type: 'Groomer', rating: '4.0', exp: '2 Year', dist: '500m Away', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', pet: 'Dog, Cat' },
    { name: 'Emily Jose', type: 'Cat Sitter', rating: '4.8', exp: '2 Year', dist: '1.2km Away', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', pet: 'Cat' },
    { name: 'Wade Warren', type: 'Dog Walker', rating: '4.2', exp: '3 Year', dist: '800m Away', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', pet: 'Dog' },
  ];

  const filteredProviders = useMemo(() => {
    return allProviders.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
      <div className="top-bar" style={{ backgroundColor: 'white' }}>
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ height: '30px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="map-container" style={{ position: 'relative', height: '300px', flexShrink: 0 }}>
        {/* Mock Map Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'url("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-76.6122,39.2904,12/450x300?access_token=none") cover',
          backgroundColor: '#e5e5e5' 
        }}></div>
        
        <div style={{ position: 'absolute', top: '15px', left: '20px', right: '20px', zIndex: 10 }}>
          <div className="search-bar-rounded" style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <MapPin size={18} color="var(--primary)" />
            <input 
              type="text" 
              value={location} 
              onInput={(e: any) => setLocation(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'none', fontSize: '13px', fontWeight: '500' }} 
            />
            <SearchIcon size={18} color="var(--text-muted)" />
          </div>
        </div>

        {/* Mock Map Markers for filtered results */}
        {filteredProviders.slice(0, 3).map((p, i) => (
          <div 
            key={i} 
            className="map-marker" 
            style={{ 
              top: `${80 + (i * 40)}px`, 
              left: `${50 + (i * 80)}px`,
              transition: '0.5s'
            }}
          >
            <div style={{ 
              background: 'white', 
              padding: '4px', 
              borderRadius: '50%', 
              border: '2px solid var(--primary)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src={p.img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="search-results-panel">
        <div style={{ width: '40px', height: '4px', background: '#E0E0E0', borderRadius: '2px', margin: '0 auto 15px' }}></div>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div className="input-container" style={{ backgroundColor: '#F5F5F5', borderRadius: '15px' }}>
            <input 
              type="text" 
              placeholder="Search by name or service..." 
              value={searchQuery}
              onInput={(e: any) => setSearchQuery(e.target.value)}
              style={{ padding: '12px 15px' }}
            />
            {searchQuery && (
              <div className="input-icon" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </div>
            )}
          </div>
        </div>

        <div className="section-header" style={{ padding: 0 }}>
          <h3>{searchQuery ? `Results for "${searchQuery}"` : 'Best Around Your Area'}</h3>
          <a href="#">See All</a>
        </div>

        <div style={{ marginTop: '15px' }}>
          {filteredProviders.length > 0 ? filteredProviders.map((res, i) => (
            <div key={i} className="result-card" onClick={() => route('/service-detail')}>
              <img src={res.img} className="chat-avatar" alt={res.name} style={{ width: '55px', height: '55px' }} />
              <div className="chat-info">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{res.name} <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '12px' }}>• {res.type}</span></h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '13px', fontWeight: '800' }}>
                    <Star size={12} color="#FFD700" fill="#FFD700" /> {res.rating}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                   <div className="tag"><Dog size={12} color="var(--primary)" /> {res.pet}</div>
                   <div className="tag"><Clock size={12} color="var(--primary)" /> {res.exp}</div>
                   <div className="tag" style={{ color: 'var(--primary)' }}><Navigation size={10} /> {res.dist}</div>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
               <p>No providers found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab="search" />
    </div>
  );
}

import './Search.css';
import { useState, useMemo } from 'preact/hooks';
import { Menu, User, MapPin, Search as SearchIcon, Star, Navigation, X, Dog, Clock } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../../context/SidebarContext';
interface Props {
  path?: string;
}
export function Search({
  path: _path
}: Props) {
  const {
    openSidebar
  } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Lose vegas, 949');
  const allProviders = [{
    name: 'Philip',
    type: 'Groomer',
    rating: '5.0',
    exp: '4 Year',
    dist: '200m Away',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    pet: 'Dog'
  }, {
    name: 'Gladys',
    type: 'Vet',
    rating: '4.5',
    exp: '1 Year',
    dist: '130m Away',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    pet: 'Cat'
  }, {
    name: 'Dianne',
    type: 'Groomer',
    rating: '4.0',
    exp: '2 Year',
    dist: '500m Away',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    pet: 'Dog, Cat'
  }, {
    name: 'Emily Jose',
    type: 'Cat Sitter',
    rating: '4.8',
    exp: '2 Year',
    dist: '1.2km Away',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    pet: 'Cat'
  }, {
    name: 'Wade Warren',
    type: 'Dog Walker',
    rating: '4.2',
    exp: '3 Year',
    dist: '800m Away',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    pet: 'Dog'
  }];
  const filteredProviders = useMemo(() => {
    return allProviders.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);
  return <div className="-search-style-1">
      <div className="top-bar -search-style-2">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-search-style-3" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="map-container -search-style-4">
        {/* Mock Map Background */}
        <div className="-search-style-5"></div>
        
        <div className="-search-style-6">
          <div className="search-bar-rounded -search-style-7">
            <MapPin size={18} color="var(--primary)" />
            <input type="text" value={location} onInput={(e: any) => setLocation(e.target.value)} className="-search-style-8" />
            <SearchIcon size={18} color="var(--text-muted)" />
          </div>
        </div>

        {/* Mock Map Markers for filtered results */}
        {filteredProviders.slice(0, 3).map((p, i) => <div key={i} className="map-marker -search-style-9" style={{
        top: `${80 + i * 40}px`,
        left: `${50 + i * 80}px`
      }}>
            <div className="-search-style-10">
              <img src={p.img} className="-search-style-11" />
            </div>
          </div>)}
      </div>

      <div className="search-results-panel">
        <div className="-search-style-12"></div>
        
        <div className="form-group -search-style-13">
          <div className="input-container -search-style-14">
            <input type="text" placeholder="Search by name or service..." value={searchQuery} onInput={(e: any) => setSearchQuery(e.target.value)} className="-search-style-15" />
            {searchQuery && <div className="input-icon" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </div>}
          </div>
        </div>

        <div className="section-header -search-style-16">
          <h3>{searchQuery ? `Results for "${searchQuery}"` : 'Best Around Your Area'}</h3>
          <a href="#">See All</a>
        </div>

        <div className="-search-style-17">
          {filteredProviders.length > 0 ? filteredProviders.map((res, i) => <div key={i} className="result-card" onClick={() => route('/service-detail')}>
              <img src={res.img} className="chat-avatar -search-style-18" alt={res.name} />
              <div className="chat-info">
                <div className="-search-style-19">
                  <h4 className="-search-style-20">{res.name} <span className="-search-style-21">• {res.type}</span></h4>
                  <div className="-search-style-22">
                    <Star size={12} color="#FFD700" fill="#FFD700" /> {res.rating}
                  </div>
                </div>
                <div className="-search-style-23">
                   <div className="tag"><Dog size={12} color="var(--primary)" /> {res.pet}</div>
                   <div className="tag"><Clock size={12} color="var(--primary)" /> {res.exp}</div>
                   <div className="tag -search-style-24"><Navigation size={10} /> {res.dist}</div>
                </div>
              </div>
            </div>) : <div className="-search-style-25">
               <p>No providers found matching your search.</p>
            </div>}
        </div>
      </div>

      <BottomNav activeTab="search" />
    </div>;
}
import { useState, useMemo } from 'preact/hooks';
import { Menu, User, Search, X, Dog, Clock } from 'lucide-preact';
import { BottomNav } from '../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../context/SidebarContext';

interface Props {
  path?: string;
}

export function Chats({ path: _path }: Props) {
  const { openSidebar } = useSidebar();
  const [search, setSearch] = useState('');

  const allChats = [
    { id: 1, name: 'Philip', type: 'Groomer', lastMsg: 'I have Booked Grooming Services...', unread: 2, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', pets: 'Dog', exp: '4 Year', time: '10:30 AM' },
    { id: 2, name: 'Gladys', type: 'Vet', lastMsg: 'Are You available on 25 Oct', unread: 3, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', pets: 'Cat', exp: '1 Year', time: 'Yesterday' },
    { id: 3, name: 'Dianne', type: 'Groomer', lastMsg: 'Hello, Jorje. How is your pet?', unread: 12, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', pets: 'Dog, Cat', exp: '2 Year', time: 'March 5' },
    { id: 4, name: 'Dr. Smith', type: 'Vet', lastMsg: 'The prescription is ready.', unread: 0, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', pets: 'Dog', exp: '10 Year', time: 'March 4' },
    { id: 5, name: 'Pet Spa', type: 'Groomer', lastMsg: 'Your appointment is confirmed.', unread: 0, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', pets: 'Cat', exp: '5 Year', time: 'March 3' },
  ];

  const filteredChats = useMemo(() => {
    return allChats.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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

      <div style={{ padding: '15px 20px', backgroundColor: 'white' }}>
        <div className="search-bar-rounded" style={{ backgroundColor: '#F5F5F5' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={search}
            onInput={(e: any) => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'none', padding: '10px 0' }}
          />
          {search && <X size={16} onClick={() => setSearch('')} style={{ cursor: 'pointer' }} />}
        </div>
      </div>

      <div className="section-header" style={{ padding: '20px 20px 10px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800' }}>All Chats</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        <div className="chat-list">
          {filteredChats.length > 0 ? filteredChats.map((chat) => (
            <div key={chat.id} className="chat-item" onClick={() => route('/chat-detail')}>
              <img src={chat.img} className="chat-avatar" alt={chat.name} />
              <div className="chat-info">
                <div className="chat-name-row">
                  <h4 style={{ fontSize: '15px', fontWeight: '700' }}>{chat.name} <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '12px' }}>• {chat.type}</span></h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{chat.time}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', margin: '4px 0' }}>
                   <div className="tag" style={{ border: 'none', background: '#F8FCFB', padding: '2px 6px' }}>
                     <Dog size={10} color="var(--primary)" /> {chat.pets}
                   </div>
                   <div className="tag" style={{ border: 'none', background: '#F8FCFB', padding: '2px 6px' }}>
                     <Clock size={10} color="var(--primary)" /> {chat.exp}
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <p className="message-preview" style={{ margin: 0 }}>{chat.lastMsg}</p>
                  {chat.unread > 0 && (
                    <div style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '20px', 
                      height: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '700'
                    }}>
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <p>No chats found.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab="chats" />
    </div>
  );
}

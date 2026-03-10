import './Chats.css';
import { useState, useMemo } from 'preact/hooks';
import { Menu, User, Search, X, Dog, Clock } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../../context/SidebarContext';
interface Props {
  path?: string;
}
export function Chats({
  path: _path
}: Props) {
  const {
    openSidebar
  } = useSidebar();
  const [search, setSearch] = useState('');
  const allChats = [{
    id: 1,
    name: 'Philip',
    type: 'Groomer',
    lastMsg: 'I have Booked Grooming Services...',
    unread: 2,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    pets: 'Dog',
    exp: '4 Year',
    time: '10:30 AM'
  }, {
    id: 2,
    name: 'Gladys',
    type: 'Vet',
    lastMsg: 'Are You available on 25 Oct',
    unread: 3,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    pets: 'Cat',
    exp: '1 Year',
    time: 'Yesterday'
  }, {
    id: 3,
    name: 'Dianne',
    type: 'Groomer',
    lastMsg: 'Hello, Jorje. How is your pet?',
    unread: 12,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    pets: 'Dog, Cat',
    exp: '2 Year',
    time: 'March 5'
  }, {
    id: 4,
    name: 'Dr. Smith',
    type: 'Vet',
    lastMsg: 'The prescription is ready.',
    unread: 0,
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    pets: 'Dog',
    exp: '10 Year',
    time: 'March 4'
  }, {
    id: 5,
    name: 'Pet Spa',
    type: 'Groomer',
    lastMsg: 'Your appointment is confirmed.',
    unread: 0,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    pets: 'Cat',
    exp: '5 Year',
    time: 'March 3'
  }];
  const filteredChats = useMemo(() => {
    return allChats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()));
  }, [search]);
  return <div className="-chats-style-1">
      <div className="top-bar -chats-style-2">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-chats-style-3" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="-chats-style-4">
        <div className="search-bar-rounded -chats-style-5">
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search messages..." value={search} onInput={(e: any) => setSearch(e.target.value)} className="-chats-style-6" />
          {search && <X size={16} onClick={() => setSearch('')} className="-chats-style-7" />}
        </div>
      </div>

      <div className="section-header -chats-style-8">
        <h3 className="-chats-style-9">All Chats</h3>
      </div>

      <div className="-chats-style-10">
        <div className="chat-list">
          {filteredChats.length > 0 ? filteredChats.map(chat => <div key={chat.id} className="chat-item" onClick={() => route('/chat-detail')}>
              <img src={chat.img} className="chat-avatar" alt={chat.name} />
              <div className="chat-info">
                <div className="chat-name-row">
                  <h4 className="-chats-style-11">{chat.name} <span className="-chats-style-12">• {chat.type}</span></h4>
                  <span className="-chats-style-13">{chat.time}</span>
                </div>
                <div className="-chats-style-14">
                   <div className="tag -chats-style-15">
                     <Dog size={10} color="var(--primary)" /> {chat.pets}
                   </div>
                   <div className="tag -chats-style-16">
                     <Clock size={10} color="var(--primary)" /> {chat.exp}
                   </div>
                </div>
                <div className="-chats-style-17">
                  <p className="message-preview -chats-style-18">{chat.lastMsg}</p>
                  {chat.unread > 0 && <div className="-chats-style-19">
                      {chat.unread}
                    </div>}
                </div>
              </div>
            </div>) : <div className="-chats-style-20">
              <p>No chats found.</p>
            </div>}
        </div>
      </div>

      <BottomNav activeTab="chats" />
    </div>;
}
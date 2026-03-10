import './Chats.css';
import { useState, useMemo } from 'preact/hooks';
import { Menu, User, Search, X, Dog, Clock, Bell } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { route } from 'preact-router';
import { useSidebar } from '../../context/SidebarContext';

interface Props {
  path?: string;
}

import { chats as allChats } from '../../data/chats';

export function Chats({ path: _path }: Props) {
  const { openSidebar } = useSidebar();
  const [search, setSearch] = useState('');

  const filteredChats = useMemo(() => {
    return allChats.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="container dashboard-container chats-page">
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
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

      <div className="chats-search-container">
        <div className="search-bar-rounded">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={search} 
            onInput={(e: any) => setSearch(e.target.value)} 
          />
          {search && <X size={16} onClick={() => setSearch('')} />}
        </div>
      </div>

      <div className="section-header">
        <h3>All Chats</h3>
      </div>

      <div className="chat-list-container">
        {filteredChats.map(chat => (
          <div key={chat.id} className="chat-item" onClick={() => route(`/chat-detail/${chat.id}`)}>
            <img src={chat.img} className="chat-avatar" alt={chat.name} />
            <div className="chat-info">
              <div className="chat-name-row">
                <h4>{chat.name} <span className="chat-type">• {chat.type}</span></h4>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="chat-tags">
                 <div className="tag"><Dog size={10} color="var(--primary)" /> {chat.pets}</div>
                 <div className="tag"><Clock size={10} color="var(--primary)" /> {chat.exp}</div>
              </div>
              <div className="msg-preview-row">
                <p className="message-preview">{chat.lastMsg}</p>
                {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="chats" />
    </div>
  );
}
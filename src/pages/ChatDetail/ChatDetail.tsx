import './ChatDetail.css';
import { ChevronLeft, MoreVertical, Paperclip, Send, Dog, Clock, Calendar } from 'lucide-preact';
import { useState, useEffect } from 'preact/hooks';
import { chats, type ChatMessage } from '../../data/chats';

interface Props {
  path?: string;
  id?: string;
}

export function ChatDetail({ id }: Props) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatMessage | null>(null);

  useEffect(() => {
    if (id) {
      const foundChat = chats.find(c => c.id === parseInt(id));
      if (foundChat) {
        setChat(foundChat);
      }
    }
  }, [id]);

  if (!chat) return <div className="container dashboard-container">Loading chat...</div>;

  return (
    <div className="container dashboard-container chat-detail-page">
      <div className="top-bar detail-header">
        <div className="icon-btn" onClick={() => window.history.back()}>
          <ChevronLeft size={20} />
        </div>
        
        <div className="header-user-info">
          <img src={chat.img} className="sub-avatar" />
          <div className="sub-info">
            <h4>{chat.name} <span className="sub-role">• {chat.type}</span></h4>
            <div className="sub-tags">
               <div className="sub-tag-item"><Dog size={10} color="var(--primary)" /> {chat.pets}</div>
               <div className="sub-tag-item"><Clock size={10} color="var(--primary)" /> {chat.exp}</div>
            </div>
          </div>
        </div>

        <div className="icon-btn">
          <MoreVertical size={20} />
        </div>
      </div>

      <div className="chat-date-divider">
        <div className="date-pill-sm">
          <Calendar size={12} /> <span>{chat.time}</span>
        </div>
      </div>

      <div className="messages-scroll-area">
        {chat.messages && chat.messages.map(msg => (
          <div key={msg.id} className={`msg-row ${msg.sender === 'provider' ? 'incoming' : 'outgoing'}`}>
            {msg.sender === 'provider' && <img src={chat.img} className="msg-avatar" alt={chat.name} />}
            <div className="msg-content-wrapper">
              <div className="msg-bubble">
                {msg.text}
              </div>
              <div className="msg-status-row">
                <span className="msg-time">{msg.time}</span>
                {msg.sender === 'user' && <span className="read-status">✔✔</span>}
              </div>
            </div>
          </div>
        ))}
        {!chat.messages && (
          <div className="msg-row incoming">
            <img src={chat.img} className="msg-avatar" alt={chat.name} />
            <div className="msg-content-wrapper">
               <div className="msg-bubble">
                 {chat.lastMsg}
               </div>
               <span className="msg-time">{chat.time}</span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-bar">
        <div className="input-field-box">
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message}
            onInput={(e: any) => setMessage(e.target.value)}
          />
          <Paperclip size={20} className="attach-btn" />
        </div>
        <button className="send-btn-circle" onClick={() => setMessage('')}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
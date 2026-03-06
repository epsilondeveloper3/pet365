import { Paperclip, Send, Dog, Clock, Calendar } from 'lucide-preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { MainLayout } from '../components/MainLayout';

interface Props {
  path?: string;
}

export function ChatDetail({ path: _path }: Props) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, Jorje. How can I help you and your pet today?",
      time: "3:00 AM",
      isMe: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      text: "I have Booked Grooming Services. Are You available on 25 Oct?",
      time: "6:30 AM",
      isMe: true,
      status: "✔✔"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: "✔"
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const contactInfo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="chat-avatar" style={{ width: '35px', height: '35px' }} />
      <div style={{ textAlign: 'left' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>Dianne <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '10px' }}>• Groomer</span></h4>
        <div style={{ display: 'flex', gap: '8px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '9px', color: 'var(--text-muted)' }}>
             <Dog size={8} color="var(--primary)" /> Dog, Cat
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '9px', color: 'var(--text-muted)' }}>
             <Clock size={8} color="var(--primary)" /> 2 Year
           </div>
        </div>
      </div>
    </div>
  );

  const footer = (
    <form onSubmit={handleSend} style={{ padding: '15px 20px', background: 'white', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 -5px 20px rgba(0,0,0,0.05)', zIndex: 10 }}>
      <div style={{ flex: 1, background: '#F5F5F5', borderRadius: '25px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={inputText}
          onInput={(e: any) => setInputText(e.target.value)}
          style={{ flex: 1, border: 'none', background: 'none', fontSize: '14px', outline: 'none' }} 
        />
        <Paperclip size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
      </div>
      <button type="submit" className="search-trigger" style={{ margin: 0, border: 'none', cursor: 'pointer', background: 'var(--primary)', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Send size={18} />
      </button>
    </form>
  );

  return (
    <MainLayout 
      showBackButton 
      customCenter={contactInfo} 
      showBottomNav={false}
      footer={footer}
      contentStyle={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F9FFFF' }}
    >
      <div style={{ flex: 1, padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', background: 'rgba(23, 123, 119, 0.08)', padding: '6px 15px', borderRadius: '30px', color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={12} /> March 5, 2026
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} style={{ 
            display: 'flex', 
            flexDirection: msg.isMe ? 'column' : 'row',
            alignItems: msg.isMe ? 'flex-end' : 'flex-start',
            gap: '10px',
            alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
            maxWidth: '85%' 
          }}>
            {!msg.isMe && <img src={msg.avatar} className="chat-avatar" style={{ width: '32px', height: '32px' }} />}
            <div>
              <div style={{ 
                background: msg.isMe ? 'var(--primary)' : 'white', 
                color: msg.isMe ? 'white' : 'var(--text-main)',
                padding: '12px 16px', 
                borderRadius: msg.isMe ? '18px 18px 0 18px' : '0 18px 18px 18px',
                fontSize: '14px', 
                boxShadow: msg.isMe ? '0 10px 20px rgba(23, 123, 119, 0.1)' : '0 2px 10px rgba(0,0,0,0.02)',
                lineHeight: '1.4' 
              }}>
                {msg.text}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', justifyContent: msg.isMe ? 'flex-end' : 'flex-start' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{msg.time}</span>
                {msg.isMe && <span style={{ fontSize: '10px', color: 'var(--primary)' }}>{msg.status}</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </MainLayout>
  );
}

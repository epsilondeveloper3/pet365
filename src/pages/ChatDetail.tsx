import { ChevronLeft, MoreVertical, Paperclip, Send, Dog, Clock, Calendar } from 'lucide-preact';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function ChatDetail({ path: _path }: Props) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FFFF' }}>
      <div className="top-bar" style={{ background: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <div className="icon-btn" onClick={() => route('/chats')}>
          <ChevronLeft size={20} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="chat-avatar" style={{ width: '40px', height: '40px' }} />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>Dianne <span style={{ color: 'var(--primary)', fontWeight: '400', fontSize: '11px' }}>• Groomer</span></h4>
            <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: 'var(--text-muted)' }}>
                 <Dog size={10} color="var(--primary)" /> Dog, Cat
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: 'var(--text-muted)' }}>
                 <Clock size={10} color="var(--primary)" /> 2 Year
               </div>
            </div>
          </div>
        </div>
        <div className="icon-btn">
          <MoreVertical size={20} />
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <span style={{ fontSize: '12px', background: '#EBF7F6', padding: '6px 15px', borderRadius: '30px', color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Calendar size={12} /> March 5, 2026
        </span>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '85%' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="chat-avatar" style={{ width: '32px', height: '32px' }} />
          <div>
            <div style={{ background: 'white', padding: '12px 16px', borderRadius: '0 18px 18px 18px', fontSize: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', color: 'var(--text-main)' }}>
              Hello, Jorje. How can I help you and your pet today?
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>3:00 AM</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', alignSelf: 'flex-end', maxWidth: '85%' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '12px 16px', borderRadius: '18px 18px 0 18px', fontSize: '14px', boxShadow: '0 4px 15px rgba(17, 102, 102, 0.1)' }}>
            I have Booked Grooming Services. Are You available on 25 Oct?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>6:30 AM</span>
            <span style={{ fontSize: '10px', color: 'var(--primary)' }}>✔✔</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', background: 'white', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 -5px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: 1, background: '#F5F5F5', borderRadius: '25px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="text" placeholder="Type a message..." style={{ flex: 1, border: 'none', background: 'none', fontSize: '14px' }} />
          <Paperclip size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>
        <button className="search-trigger" style={{ margin: 0, border: 'none', cursor: 'pointer' }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

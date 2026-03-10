import './ChatDetail.css';
import { ChevronLeft, MoreVertical, Paperclip, Send, Dog, Clock, Calendar } from 'lucide-preact';
import { route } from 'preact-router';
interface Props {
  path?: string;
}
export function ChatDetail({
  path: _path
}: Props) {
  return <div className="-chat-detail-style-1">
      <div className="top-bar -chat-detail-style-2">
        <div className="icon-btn" onClick={() => route('/chats')}>
          <ChevronLeft size={20} />
        </div>
        <div className="-chat-detail-style-3">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="chat-avatar -chat-detail-style-4" />
          <div>
            <h4 className="-chat-detail-style-5">Dianne <span className="-chat-detail-style-6">• Groomer</span></h4>
            <div className="-chat-detail-style-7">
               <div className="-chat-detail-style-8">
                 <Dog size={10} color="var(--primary)" /> Dog, Cat
               </div>
               <div className="-chat-detail-style-9">
                 <Clock size={10} color="var(--primary)" /> 2 Year
               </div>
            </div>
          </div>
        </div>
        <div className="icon-btn">
          <MoreVertical size={20} />
        </div>
      </div>

      <div className="-chat-detail-style-10">
        <span className="-chat-detail-style-11">
          <Calendar size={12} /> March 5, 2026
        </span>
      </div>

      <div className="-chat-detail-style-12">
        <div className="-chat-detail-style-13">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="chat-avatar -chat-detail-style-14" />
          <div>
            <div className="-chat-detail-style-15">
              Hello, Jorje. How can I help you and your pet today?
            </div>
            <span className="-chat-detail-style-16">3:00 AM</span>
          </div>
        </div>

        <div className="-chat-detail-style-17">
          <div className="-chat-detail-style-18">
            I have Booked Grooming Services. Are You available on 25 Oct?
          </div>
          <div className="-chat-detail-style-19">
            <span className="-chat-detail-style-20">6:30 AM</span>
            <span className="-chat-detail-style-21">✔✔</span>
          </div>
        </div>
      </div>

      <div className="-chat-detail-style-22">
        <div className="-chat-detail-style-23">
          <input type="text" placeholder="Type a message..." className="-chat-detail-style-24" />
          <Paperclip size={20} color="var(--text-muted)" className="-chat-detail-style-25" />
        </div>
        <button className="search-trigger -chat-detail-style-26">
          <Send size={18} />
        </button>
      </div>
    </div>;
}
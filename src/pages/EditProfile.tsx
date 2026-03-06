import { ChevronLeft, Save, Camera, User } from 'lucide-preact';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function EditProfile({ path: _path }: Props) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      <div className="top-bar" style={{ backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <img src="/logo.png" alt="Logo" style={{ height: '30px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="container" style={{ padding: '30px 20px', flex: 1, overflowY: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop" 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '5px', 
              right: '5px', 
              background: 'var(--primary)', 
              color: 'white', 
              padding: '8px', 
              borderRadius: '50%', 
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Camera size={18} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value="Wade Warren" style={{ background: 'white' }} />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value="john@example.com" style={{ background: 'white' }} />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value="(201) 555-0124" style={{ background: 'white' }} />
        </div>

        <div className="form-group">
          <label>Location / Address</label>
          <input type="text" value="3890 Poplar Dr. Baltimore, MD" style={{ background: 'white' }} />
        </div>

        <div style={{ marginTop: '30px' }}>
          <button className="book-now-btn" style={{ padding: '16px' }} onClick={() => history.back()}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

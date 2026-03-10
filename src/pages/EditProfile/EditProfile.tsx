import './EditProfile.css';
import { ChevronLeft, Save, Camera, User } from 'lucide-preact';
import { route } from 'preact-router';
interface Props {
  path?: string;
}
export function EditProfile({
  path: _path
}: Props) {
  return <div className="-edit-profile-style-1">
      <div className="top-bar -edit-profile-style-2">
        <div className="icon-btn" onClick={() => history.back()}>
          <ChevronLeft size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-edit-profile-style-3" />
        <div className="icon-btn" onClick={() => route('/profile')}>
           <User size={20} />
        </div>
      </div>

      <div className="container -edit-profile-style-4">
        <div className="-edit-profile-style-5">
          <div className="-edit-profile-style-6">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop" className="-edit-profile-style-7" />
            <div className="-edit-profile-style-8">
              <Camera size={18} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value="Wade Warren" className="-edit-profile-style-9" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value="john@example.com" className="-edit-profile-style-10" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value="(201) 555-0124" className="-edit-profile-style-11" />
        </div>

        <div className="form-group">
          <label>Location / Address</label>
          <input type="text" value="3890 Poplar Dr. Baltimore, MD" className="-edit-profile-style-12" />
        </div>

        <div className="-edit-profile-style-13">
          <button className="book-now-btn -edit-profile-style-14" onClick={() => history.back()}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>;
}
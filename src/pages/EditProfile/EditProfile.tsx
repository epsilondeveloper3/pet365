import './EditProfile.css';
import { ChevronLeft, MoreVertical, Phone, Mail, Award, Edit3, ChevronDown, ChevronsUpDown } from 'lucide-preact';
import { useState, useRef } from 'preact/hooks';

interface Props {
  path?: string;
}

export function EditProfile({ path: _path }: Props) {
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ep-container">
      <div className="ep-header">
        <div className="icon-btn-circle" onClick={() => history.back()}>
          <ChevronLeft size={20} color="var(--primary)" />
        </div>
        <h2 className="ep-title">Profile</h2>
        <div className="icon-btn-circle">
           <MoreVertical size={20} color="var(--primary)" />
        </div>
      </div>

      <div className="ep-content">
        <div className="ep-profile-section">
          <input 
             type="file" 
             ref={fileInputRef} 
             accept="image/*" 
             onChange={handleFileChange} 
             style={{ display: 'none' }} 
          />
          <img 
             src={profileImage} 
             className="ep-profile-img" 
             onClick={handleImageClick} 
             alt="Profile"
          />
          <h3 className="ep-name">Wade Warren</h3>
          
          <div className="ep-contact-row">
            <div className="ep-contact-chip">
              <Phone size={14} color="var(--primary)" />
              <span>(201) 555-0124</span>
            </div>
            <div className="ep-contact-chip">
              <Mail size={14} color="var(--primary)" />
              <span>john@example.com</span>
            </div>
          </div>
          
          <div className="ep-badges-row">
            <div className="ep-badge-owner">
              <Award size={14} /> Owner
            </div>
            <div className="ep-badge-edit" onClick={handleImageClick}>
              <Edit3 size={14} /> Edit
            </div>
          </div>
        </div>

        <div className="ep-form">
          <div className="ep-form-group">
            <label>Pet Name</label>
            <input type="text" value="Monty" />
          </div>

          <div className="ep-form-group">
            <label>Pet Type</label>
            <div className="ep-input-wrapper">
              <select defaultValue="Grooming" className="ep-select-teal">
                <option value="Grooming">Grooming</option>
                <option value="Walking">Walking</option>
                <option value="Boarding">Boarding</option>
                <option value="Vet">Vet</option>
              </select>
              <ChevronDown size={20} className="ep-select-icon" />
            </div>
          </div>

          <div className="ep-form-group">
            <label>Age Of your pet</label>
            <div className="ep-input-wrapper">
              <select defaultValue="3 Years" className="ep-select-teal">
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4+ Years">4+ Years</option>
              </select>
              <ChevronsUpDown size={20} className="ep-select-icon" />
            </div>
          </div>

          <div className="ep-form-group">
            <label>Street Address</label>
            <input type="text" value="123 apartment tel road," />
          </div>

          <div className="ep-form-row">
            <div className="ep-form-group">
              <label>State</label>
              <input type="text" value="Dallas" />
            </div>
            <div className="ep-form-group">
              <label>City</label>
              <input type="text" value="Mork" />
            </div>
          </div>

          <div className="ep-form-group">
            <label>Zip code</label>
            <input type="text" value="234103" />
          </div>

          <div className="ep-form-group">
            <label>Short Bio</label>
            <textarea rows={4}>Ally is a lifelong cat owner. They're available for overnight stays on weekends and can administer topical, eye/ear, and oral meds.</textarea>
          </div>
        </div>

        <button className="ep-save-btn" onClick={() => history.back()}>
          Edit Profile Details
        </button>
      </div>
    </div>
  );
}
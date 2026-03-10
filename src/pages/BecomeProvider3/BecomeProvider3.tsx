import './BecomeProvider3.css';
import { useState, useRef } from 'preact/hooks';
import { UploadCloud, X, ChevronDown, ChevronUp, MapPin } from 'lucide-preact';
import { route } from 'preact-router';
import { Dropdown } from '../../components/Dropdown/Dropdown';

interface Props {
  path?: string;
}

export function BecomeProvider3({
  path: _path
}: Props) {
  const [serviceCategory, setServiceCategory] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [experience, setExperience] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const serviceOptions = [
    { label: 'Veterinary', value: 'vet' },
    { label: 'Grooming', value: 'grooming' },
    { label: 'Boarding', value: 'boarding' },
    { label: 'Training', value: 'training' }
  ];

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: any) => {
    e.stopPropagation();
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const incrementExp = () => setExperience(prev => prev + 1);
  const decrementExp = () => setExperience(prev => Math.max(0, prev - 1));

  return (
    <div className="container become-provider-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Become Provider</h1>
        <p>Verify Your Professional Profile</p>
      </div>

      <div className="form-group">
        <label>Upload Profile</label>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
        <div className="upload-card profile-upload" onClick={handleUploadClick}>
          {profileImage ? (
            <div className="profile-preview-container">
              <img src={profileImage} alt="Profile" className="profile-preview-img" />
              <div onClick={removeImage} className="remove-profile-btn">
                <X size={16} />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="icon">
                <UploadCloud size={24} />
              </div>
              <div className="upload-text">
                <h3>Upload Profile Picture</h3>
                <p>Profile must be png or jpeg, jpg</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Business Name</label>
        <input type="text" placeholder="Enter name" />
      </div>

      <Dropdown 
        label="Service Category"
        options={serviceOptions}
        value={serviceCategory}
        onChange={setServiceCategory}
        placeholder="Select Service"
      />

      <div className="form-group">
        <label>Years of Experience</label>
        <div className="experience-stepper">
          <input type="text" value={`${experience} exp`} readOnly />
          <div className="stepper-controls">
            <button onClick={(e) => { e.preventDefault(); incrementExp(); }}>
              <ChevronUp size={14} />
            </button>
            <button onClick={(e) => { e.preventDefault(); decrementExp(); }}>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Street Address</label>
        <div className="address-input">
          <input type="text" placeholder="123 apartment/rd road," />
          <MapPin size={18} className="address-icon" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label>State</label>
          <input type="text" placeholder="Enter State" />
        </div>
        <div className="form-group col">
          <label>City</label>
          <input type="text" placeholder="Enter city" />
        </div>
      </div>

      <div className="form-group">
        <label>Zip-code</label>
        <input type="text" placeholder="23455" />
      </div>

      <div className="form-group">
        <label>Short Bio</label>
        <textarea placeholder="Enter About Your Self" className="bio-textarea"></textarea>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={() => route('/dashboard')}>Submit</button>
      </div>
    </div>
  );
}


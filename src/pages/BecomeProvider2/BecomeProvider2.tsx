import './BecomeProvider2.css';
import { UploadCloud, MapPin, ChevronDown, X } from 'lucide-preact';
import { route } from 'preact-router';
import { useState, useRef } from 'preact/hooks';
interface Props {
  path?: string;
}
export function BecomeProvider2({
  path: _path
}: Props) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
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
  const removeImage = (e: any) => {
    e.stopPropagation();
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return <div className="container -become-provider2-style-1">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Become Provider</h1>
        <p>Verify Your Professional Profile</p>
      </div>

      <div className="form-group">
        <label>Upload Profile</label>
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="-become-provider2-style-2" />
        <div className="upload-card -become-provider2-style-3" onClick={handleUploadClick} style={{
        padding: profileImage ? '10px' : '20px'
      }}>
          {profileImage ? <div className="-become-provider2-style-4">
              <img src={profileImage} alt="Profile Preview" className="-become-provider2-style-5" />
              <div onClick={removeImage} className="-become-provider2-style-6">
                <X size={16} />
              </div>
            </div> : <>
              <div className="icon">
                <UploadCloud size={24} />
              </div>
              <div className="-become-provider2-style-7">
                <h3 className="-become-provider2-style-8">Upload Profile Picture</h3>
                <p className="-become-provider2-style-9">Profile must be png or jpeg, jpg</p>
              </div>
            </>}
        </div>
      </div>

      <div className="form-group">
        <label>Business Name</label>
        <input type="text" placeholder="Enter name" />
      </div>

      <div className="form-group">
        <label>Service Category</label>
        <div className="input-container">
          <input type="text" placeholder="Select Service" readOnly />
          <div className="input-icon">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Years of Experience</label>
        <div className="input-container">
          <input type="number" placeholder="3 exp" />
          <div className="input-icon">
             <div className="-become-provider2-style-10">
                <ChevronDown size={14} className="-become-provider2-style-11" />
                <ChevronDown size={14} />
             </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Business Address</label>
        <div className="input-container">
          <input type="text" placeholder="Address" />
          <div className="input-icon -become-provider2-style-12">
            <MapPin size={20} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Short Bio</label>
        <textarea placeholder="Enter About Your Self" className="-become-provider2-style-13" />
      </div>

      <button className="btn btn-primary" onClick={() => route('/')}>Submit</button>
    </div>;
}
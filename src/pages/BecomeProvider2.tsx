import { UploadCloud, MapPin, ChevronDown, X } from 'lucide-preact';
import { route } from 'preact-router';
import { useState, useRef } from 'preact/hooks';
import { MainLayout } from '../components/MainLayout';

interface Props {
  path?: string;
}

export function BecomeProvider2({ path: _path }: Props) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

  return (
    <MainLayout showBackButton title="Become Provider" showBottomNav={false}>
      <div style={{ padding: '20px' }}>
        <div className="header" style={{ textAlign: 'left', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px' }}>Business Details</h1>
          <p>Tell us more about your service</p>
        </div>

        <div className="form-group">
          <label>Upload Profile</label>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <div className="upload-card" onClick={handleUploadClick} style={{ padding: profileImage ? '10px' : '20px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {profileImage ? (
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img 
                  src={profileImage} 
                  alt="Profile Preview" 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div 
                  onClick={removeImage} 
                  style={{ 
                    position: 'absolute', 
                    top: '-5px', 
                    right: '-5px', 
                    backgroundColor: 'var(--error)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    padding: '2px',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </div>
              </div>
            ) : (
              <>
                <div className="icon">
                  <UploadCloud size={24} />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <h3 style={{ fontSize: '14px', margin: 0 }}>Upload Profile Picture</h3>
                  <p style={{ fontSize: '11px', margin: 0 }}>Profile must be png or jpeg, jpg</p>
                </div>
              </>
            )}
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
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                  <ChevronDown size={14} />
               </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Business Address</label>
          <div className="input-container">
            <input type="text" placeholder="Address" />
            <div className="input-icon" style={{ color: 'var(--primary)' }}>
              <MapPin size={20} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Short Bio</label>
          <textarea 
            placeholder="Enter About Your Self" 
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              borderRadius: '12px', 
              border: '1px solid transparent', 
              backgroundColor: 'var(--white)', 
              minHeight: '100px',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ paddingBottom: '30px' }}>
          <button className="btn btn-primary" onClick={() => route('/')}>Submit</button>
        </div>
      </div>
    </MainLayout>
  );
}

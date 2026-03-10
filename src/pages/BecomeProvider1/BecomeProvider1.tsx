import './BecomeProvider1.css';
import { useState, useRef } from 'preact/hooks';
import { UploadCloud, FileText, X, CheckCircle2 } from 'lucide-preact';
import { route } from 'preact-router';
import { Dropdown } from '../../components/Dropdown/Dropdown';

interface Props {
  path?: string;
}

export function BecomeProvider1({
  path: _path
}: Props) {
  const [idType, setIdType] = useState('');
  const [certType, setCertType] = useState('');
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [certDocument, setCertDocument] = useState<File | null>(null);
  
  const idOptions = [
    { label: 'Aadhar Card', value: 'aadhar' },
    { label: 'PAN Card', value: 'pan' },
    { label: 'Voter ID', value: 'voter' }
  ];

  const certOptions = [
    { label: 'Veterinary License', value: 'vet' },
    { label: 'Grooming Certification', value: 'grooming' },
    { label: 'Training Certification', value: 'training' }
  ];

  const idInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  const handleIdUploadClick = () => idInputRef.current?.click();
  const handleCertUploadClick = () => certInputRef.current?.click();

  const handleIdFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setIdDocument(file);
  };

  const handleCertFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setCertDocument(file);
  };

  const removeIdFile = (e: any) => {
    e.stopPropagation();
    setIdDocument(null);
    if (idInputRef.current) idInputRef.current.value = '';
  };

  const removeCertFile = (e: any) => {
    e.stopPropagation();
    setCertDocument(null);
    if (certInputRef.current) certInputRef.current.value = '';
  };

  return (
    <div className="container become-provider-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>KYC Proof</h1>
        <p>Verify Your Professional Profile</p>
      </div>

      <Dropdown 
        label="Type ID"
        options={idOptions}
        value={idType}
        onChange={setIdType}
        placeholder="Select Type"
      />

      <div className="form-group">
        <label>Enter ID Number</label>
        <input type="text" placeholder="Enter number" />
      </div>

      <div className="form-group">
        <label>Upload Document</label>
        <input 
          type="file" 
          ref={idInputRef} 
          accept=".png,.jpg,.jpeg" 
          onChange={handleIdFileChange} 
          style={{ display: 'none' }} 
        />
        <div className="upload-card" onClick={handleIdUploadClick}>
          {idDocument ? (
            <div className="file-preview">
              <div className="file-info">
                <FileText size={32} color="var(--primary)" />
                <div className="file-details">
                  <h3>{idDocument.name}</h3>
                  <p>{(idDocument.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div onClick={removeIdFile} className="remove-btn">
                <X size={20} />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="icon">
                <UploadCloud size={32} />
              </div>
              <h3>Drop Your Document Here</h3>
              <p>doc must be png or jpeg, jpg</p>
            </div>
          )}
        </div>
      </div>

      <div className="divider-dashed"></div>

      <Dropdown 
        label="Certifications"
        options={certOptions}
        value={certType}
        onChange={setCertType}
        placeholder="Select Type"
      />

      <div className="form-group">
        <label>Upload Document</label>
        <input 
          type="file" 
          ref={certInputRef} 
          accept=".png,.jpg,.jpeg" 
          onChange={handleCertFileChange} 
          style={{ display: 'none' }} 
        />
        <div className="upload-card" onClick={handleCertUploadClick}>
          {certDocument ? (
            <div className="file-preview">
              <div className="file-info">
                <FileText size={32} color="var(--primary)" />
                <div className="file-details">
                  <h3>{certDocument.name}</h3>
                  <p>{(certDocument.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div onClick={removeCertFile} className="remove-btn">
                <X size={20} />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="icon">
                <UploadCloud size={32} />
              </div>
              <h3>Drop Your Document Here</h3>
              <p>doc must be png or jpeg, jpg</p>
            </div>
          )}
        </div>
      </div>

      <div className="requirements-box">
        <div className="requirements-header">
           <CheckCircle2 size={16} color="var(--primary)" />
           <h3>Document Requirements:</h3>
        </div>
        <ul>
          <li>Document must be valid and not expired</li>
          <li>All text must be clearly visible</li>
          <li>Upload both front and back sides</li>
          <li>File formats: JPG, PNG (max 10MB)</li>
        </ul>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={() => route('/become-provider-2')}>Next</button>
      </div>
    </div>
  );
}

import './BecomeProvider2.css';
import { useState, useRef } from 'preact/hooks';
import { UploadCloud, FileText, X } from 'lucide-preact';
import { route } from 'preact-router';
import { Dropdown } from '../../components/Dropdown/Dropdown';

interface Props {
  path?: string;
}

export function BecomeProvider2({
  path: _path
}: Props) {
  const [bankType, setBankType] = useState('');
  const [bankDocument, setBankDocument] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bankOptions = [
    { label: 'State Bank of India', value: 'sbi' },
    { label: 'HDFC Bank', value: 'hdfc' },
    { label: 'ICICI Bank', value: 'icici' },
    { label: 'Axis Bank', value: 'axis' }
  ];

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setBankDocument(file);
  };

  const removeFile = (e: any) => {
    e.stopPropagation();
    setBankDocument(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container become-provider-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Bank Details</h1>
        <p>Where are you located?</p>
      </div>

      <Dropdown 
        label="Bank Type"
        options={bankOptions}
        value={bankType}
        onChange={setBankType}
        placeholder="Select Bank"
      />

      <div className="form-group">
        <label>IFSC Code</label>
        <input type="text" placeholder="Enter Code" />
      </div>

      <div className="form-group">
        <label>Upload Document</label>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".png,.jpg,.jpeg" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
        <div className="upload-card" onClick={handleUploadClick}>
          {bankDocument ? (
            <div className="file-preview">
              <div className="file-info">
                <FileText size={32} color="var(--primary)" />
                <div className="file-details">
                  <h3>{bankDocument.name}</h3>
                  <p>{(bankDocument.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div onClick={removeFile} className="remove-btn">
                <X size={20} />
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="icon">
                <UploadCloud size={32} />
              </div>
              <h3>Upload Profile Picture</h3>
              <p>Profile must be png or jpeg, jpg</p>
            </div>
          )}
        </div>
      </div>

      <div className="button-group" style={{ marginTop: 'auto' }}>
        <button className="btn btn-primary" onClick={() => route('/become-provider-3')}>Next</button>
      </div>
    </div>
  );
}

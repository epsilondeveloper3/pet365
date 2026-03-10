import './BecomeProvider1.css';
import { useState, useRef } from 'preact/hooks';
import { UploadCloud, FileText, X } from 'lucide-preact';
import { route } from 'preact-router';
interface Props {
  path?: string;
}
export function BecomeProvider1({
  path: _path
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const removeFile = (e: any) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return <div className="container -become-provider1-style-1">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Become Provider</h1>
        <p>Verify Your Professional Profile</p>
      </div>

      <div className="form-group">
        <label>Govt ID</label>
        <input type="text" placeholder="Enter ID Number" />
      </div>

      <div className="form-group">
        <label>Bank details</label>
        <input type="text" placeholder="Enter Bank Details" />
      </div>

      <div className="form-group">
        <label>Professional license</label>
        <input type="file" ref={fileInputRef} accept=".png,.jpg,.jpeg" onChange={handleFileChange} className="-become-provider1-style-2" />
        <div className="upload-card" onClick={handleUploadClick}>
          {selectedFile ? <div className="-become-provider1-style-3">
              <div className="-become-provider1-style-4">
                <FileText size={32} color="var(--primary)" />
                <div className="-become-provider1-style-5">
                  <h3 className="-become-provider1-style-6">{selectedFile.name}</h3>
                  <p className="-become-provider1-style-7">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div onClick={removeFile} className="-become-provider1-style-8">
                <X size={20} />
              </div>
            </div> : <>
              <div className="icon">
                <UploadCloud size={32} />
              </div>
              <h3>Drop Your Document Here</h3>
              <p>Doc must be png or jpeg, jpg</p>
            </>}
        </div>
      </div>

      <div className="-become-provider1-style-9">
        <button className="btn btn-primary" onClick={() => route('/become-provider-2')}>Next</button>
      </div>
    </div>;
}
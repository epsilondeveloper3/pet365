import { useState, useRef } from 'preact/hooks';
import { UploadCloud, FileText, X } from 'lucide-preact';
import { route } from 'preact-router';
import { MainLayout } from '../components/MainLayout';

interface Props {
  path?: string;
}

export function BecomeProvider1({ path: _path }: Props) {
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

  return (
    <MainLayout showBackButton title="Become Provider" showBottomNav={false}>
      <div style={{ padding: '20px' }}>
        <div className="header" style={{ textAlign: 'left', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px' }}>Professional Profile</h1>
          <p>Verify your details to get started</p>
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
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".png,.jpg,.jpeg" 
            onChange={handleFileChange}
          />
          <div className="upload-card" onClick={handleUploadClick}>
            {selectedFile ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={32} color="var(--primary)" />
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0, fontSize: '14px' }}>{selectedFile.name}</h3>
                    <p style={{ margin: 0, fontSize: '12px' }}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <div onClick={removeFile} style={{ color: 'var(--error)', cursor: 'pointer' }}>
                  <X size={20} />
                </div>
              </div>
            ) : (
              <>
                <div className="icon">
                  <UploadCloud size={32} />
                </div>
                <h3>Drop Your Document Here</h3>
                <p>Doc must be png or jpeg, jpg</p>
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <button className="btn btn-primary" onClick={() => route('/become-provider-2')}>Next</button>
        </div>
      </div>
    </MainLayout>
  );
}

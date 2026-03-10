import './Register.css';
import { useState } from 'preact/hooks';
import { Eye, EyeOff, ChevronDown } from 'lucide-preact';
import { route } from 'preact-router';
interface Props {
  path?: string;
}
export function Register({
  path: _path
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Provider');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const handleChange = (e: any) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      // Add +91 prefix to phone if missing
      const phoneNumber = formData.phone.startsWith('+') ? formData.phone : `+91${formData.phone.replace(/^0+/, '')}`;

      const response = await fetch('http://10.0.2.2:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: phoneNumber,
          role,
          password: formData.password
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store userId, phone, and role locally for the OTP verify step
      sessionStorage.setItem('pet365_temp_userId', data.userId);
      sessionStorage.setItem('pet365_temp_phone', phoneNumber);
      sessionStorage.setItem('pet365_temp_role', role);

      route('/otp');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Register</h1>
        <p>Enter your information to get started</p>
      </div>

      <form onSubmit={handleRegister}>
        {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</div>}
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="Enter full name" value={formData.fullName} onInput={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onInput={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-container">
            <div className="-register-style-1">
              <img src="https://flagcdn.com/w20/in.png" width="20" alt="India" />
              <span className="-register-style-2">+91</span>
              <ChevronDown size={14} />
            </div>
            <input type="tel" name="phone" placeholder="e.g. 9428..." value={formData.phone} onInput={handleChange} className="-register-style-3" required />
          </div>
        </div>

        <div className="form-group">
          <label>Select Role</label>
          <div className="role-selector">
            {['Provider', 'Find Service', 'Both'].map(r => <div key={r} className={`role-option ${role === r ? 'active' : ''}`} onClick={() => setRole(r)}>
                <div className="radio-circle"></div>
                {r}
              </div>)}
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-container">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="**********" value={formData.password} onInput={handleChange} required />
            <div className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="footer-text">
        You have an account? <a href="/">Login</a>
      </div>
    </div>;
}
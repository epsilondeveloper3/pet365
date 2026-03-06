import { useState } from 'preact/hooks';
import { Eye, EyeOff, ChevronDown } from 'lucide-preact';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function Register({ path: _path }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Provider');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    console.log("Registering with:", { ...formData, role });
    if (role === 'Provider') {
      route('/become-provider-1');
    } else {
      route('/otp');
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Register</h1>
        <p>Enter your information to get started</p>
      </div>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="fullName"
            placeholder="Enter full name" 
            value={formData.fullName}
            onInput={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="Enter Email" 
            value={formData.email}
            onInput={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-container">
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img src="https://flagcdn.com/w20/gh.png" width="20" alt="Ghana" />
              <span style={{ fontSize: '14px' }}>+233</span>
              <ChevronDown size={14} />
            </div>
            <input 
              type="tel" 
              name="phone"
              style={{ paddingLeft: '90px' }} 
              value={formData.phone}
              onInput={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Select Role</label>
          <div className="role-selector">
            {['Provider', 'Find Service', 'Both'].map((r) => (
              <div 
                key={r}
                className={`role-option ${role === r ? 'active' : ''}`}
                onClick={() => setRole(r)}
              >
                <div className="radio-circle"></div>
                {r}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-container">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="**********" 
              value={formData.password}
              onInput={handleChange}
            />
            <div className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      <div className="footer-text">
        You have an account? <a href="/">Login</a>
      </div>
    </div>
  );
}


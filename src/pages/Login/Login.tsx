import './Login.css';
import { useState } from 'preact/hooks';
import { Eye, EyeOff } from 'lucide-preact';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function Login({ path: _path }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://10.0.2.2:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password
        })
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.userId) {
           sessionStorage.setItem('pet365_temp_userId', data.userId);
           sessionStorage.setItem('pet365_temp_phone', formData.name); // Usually we need to check if unverified
           route('/otp');
           return;
        }
        throw new Error(data.error || 'Login failed');
      }

      // Store auth session
      sessionStorage.setItem('pet365_user', JSON.stringify(data.user));
      route('/dashboard');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleLogin}>
        {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</div>}
        <div className="form-group">
          <label>Name or Email</label>
          <input 
            type="text" 
            name="name"
            placeholder="Enter Name, Email or Phone" 
            value={formData.name}
            onInput={handleChange}
            required 
          />
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
              required 
            />
            <div className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      <div className="social-btns">
        <button className="btn btn-outline" type="button">
          <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
          Sign In with Google
        </button>
        <button className="btn btn-outline" type="button">
          <img src="https://www.apple.com/favicon.ico" width="18" alt="Apple" />
          Sign In with Apple
        </button>
      </div>

      <div className="footer-text">
        Don't have an account? <a href="/register">SignUp</a>
      </div>
    </div>
  );
}

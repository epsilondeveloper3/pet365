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
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    console.log("Logging in with:", formData);
    setTimeout(() => {
      setLoading(false);
      route('/dashboard');
    }, 2000);
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
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name"
            placeholder="Enter name" 
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
        <button className="btn btn-outline">
          <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
          Sign In with Google
        </button>
        <button className="btn btn-outline">
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

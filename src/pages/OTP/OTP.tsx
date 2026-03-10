import './OTP.css';
import { useState, useEffect, useRef } from 'preact/hooks';
import { route } from 'preact-router';

interface Props {
  path?: string;
}

export function OTP({
  path: _path
}: Props) {
  const [timer, setTimer] = useState(80); // 1:20 in seconds
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const phone = typeof window !== 'undefined' ? sessionStorage.getItem('pet365_temp_phone') : null;
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('pet365_temp_userId') : null;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleChange = (index: number, e: any) => {
    const value = e.target.value;
    if (value && !/^\d+$/.test(value)) {
       e.target.value = '';
       return;
    }
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpValues.join('');
    if (otp.length < 6) {
      setErrorMessage("Please enter the full 6-digit OTP.");
      return;
    }
    if (!userId) {
      setErrorMessage("Missing user information. Please register again.");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://10.0.2.2:5001/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          otp
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed');
      }

      // After successful verification, clear the temp storage and route to the correct screen
      const role = sessionStorage.getItem('pet365_temp_role');
      sessionStorage.removeItem('pet365_temp_userId');
      sessionStorage.removeItem('pet365_temp_phone');
      sessionStorage.removeItem('pet365_temp_role');
      
      if (role === 'Provider') {
         route('/become-provider-1');
      } else if (role === 'Find Service') {
         route('/pet-owner-details');
      } else {
         route('/dashboard'); // Both or fallback
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <div className="container otp-page">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Verify Your Number</h1>
        <p>Enter the 6-digit code sent to</p>
        <p className="-o-t-p-style-1">{phone || '+91 9428 425 380'}</p>
      </div>

      {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</div>}

      <div className="otp-container">
        {[0, 1, 2, 3, 4, 5].map(i => <input 
          key={i} 
          type="text" 
          className="otp-input" 
          maxLength={1} 
          value={otpValues[i]}
          onInput={(e) => handleChange(i, e)} 
        />)}
      </div>

      <p className="-o-t-p-style-2">
        Didn't receive the code? {formatTime(timer)} in <a href="#" className="-o-t-p-style-3">Resend OTP</a>
      </p>

      <div className="-o-t-p-style-4">
        <button className="btn btn-primary" onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>;
}
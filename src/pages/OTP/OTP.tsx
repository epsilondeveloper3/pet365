import './OTP.css';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
interface Props {
  path?: string;
}
export function OTP({
  path: _path
}: Props) {
  const [timer, setTimer] = useState(80); // 1:20 in seconds

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
  return <div className="container">
      <div className="logo-container">
        <img src="/logo.png" alt="Pet365 Logo" className="logo-image" />
      </div>

      <div className="header">
        <h1>Verify Your Number</h1>
        <p>Enter the 6-digit code sent to</p>
        <p className="-o-t-p-style-1">+233 551 234 567</p>
      </div>

      <div className="otp-container">
        {[1, 2, 3, 4, 5, 6].map(i => <input key={i} type="text" className="otp-input" maxLength={1} onInput={(e: any) => {
        if (e.target.value && e.target.nextSibling) {
          (e.target.nextSibling as HTMLInputElement).focus();
        }
      }} />)}
      </div>

      <p className="-o-t-p-style-2">
        Didn't receive the code? {formatTime(timer)} in <a href="#" className="-o-t-p-style-3">Resend OTP</a>
      </p>

      <div className="-o-t-p-style-4">
        <button className="btn btn-primary" onClick={() => route('/dashboard')}>Verify</button>
      </div>
    </div>;
}
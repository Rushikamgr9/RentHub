import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(email, password, role);
      const redirect = user.role === 'tenant' ? '/tenant' : '/landlord';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Sign in</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Login as</label>
            <div className="role-tabs">
              <button type="button" className={`role-tab ${role === 'tenant' ? 'active' : ''}`} onClick={() => setRole('tenant')}>
                Tenant (Rent)
              </button>
              <button type="button" className={`role-tab ${role === 'landlord' ? 'active' : ''}`} onClick={() => setRole('landlord')}>
                Landlord
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Signing you in…' : 'Sign in'}
          </button>
        </form>
        <p className="form-hint">
          Demo: <strong>tenant@test.com</strong> or <strong>landlord@test.com</strong> — password: <strong>password123</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;

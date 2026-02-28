import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './AuthPage.css';

export default function LoginPage() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error } = await signIn(email, password);
        setLoading(false);
        if (error) {
            setError(error.message || 'Invalid email or password.');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-inner">
                    <div className="auth-brand">
                        <div className="auth-brand-icon">B</div>
                        <span>BetterEdge</span>
                    </div>
                    <h2 className="auth-quote">"Correct idea. Right timing. Consistent edge."</h2>
                    <div className="auth-chart-decoration">
                        {[0.4, 0.6, 0.8, 0.65, 0.9, 0.75, 0.85, 0.7, 0.95, 0.8, 0.7, 0.6].map((h, i) => (
                            <div key={i} className="auth-bar" style={{ height: `${h * 80}%` }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <Link to="/" className="auth-back">
                    <ArrowLeft size={16} /> Back to home
                </Link>

                <div className="auth-form-container">
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to your BetterEdge account</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                id="login-email"
                                type="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="auth-input-icon">
                                <input
                                    id="login-password"
                                    type={showPass ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button type="button" className="auth-eye" onClick={() => setShowPass(v => !v)}>
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-form-footer">
                            <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                            {loading ? <span className="spinner" style={{ width: 20, height: 20 }} /> : 'Sign In'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/register" className="auth-link">Create one for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

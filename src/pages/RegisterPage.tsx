import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './AuthPage.css';

export default function RegisterPage() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        setLoading(true);
        const { error } = await signUp(email, password, fullName);
        setLoading(false);
        if (error) {
            setError(error.message || 'Registration failed. Please try again.');
        } else {
            setSuccess('Account created! Please check your email to confirm your account, then log in.');
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
                    <h2 className="auth-quote">"The edge belongs to those who measure it."</h2>
                    <div className="auth-chart-decoration">
                        {[0.5, 0.7, 0.6, 0.85, 0.75, 0.9, 0.8, 0.65, 0.7, 0.85, 0.9, 0.95].map((h, i) => (
                            <div key={i} className="auth-bar" style={{ height: `${h * 80}%`, background: i > 8 ? '#10B981' : undefined }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <Link to="/" className="auth-back">
                    <ArrowLeft size={16} /> Back to home
                </Link>

                <div className="auth-form-container">
                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Start with a free account. Upgrade anytime.</p>

                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">{success}</div>}

                    {!success && (
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    id="reg-name"
                                    type="text"
                                    className="form-input"
                                    placeholder="John Smith"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    id="reg-email"
                                    type="email"
                                    className="form-input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="auth-input-icon">
                                    <input
                                        id="reg-password"
                                        type={showPass ? 'text' : 'password'}
                                        className="form-input"
                                        placeholder="Min. 6 characters"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="auth-eye" onClick={() => setShowPass(v => !v)}>
                                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <p className="auth-terms">
                                By creating an account, you agree to our <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>.
                            </p>
                            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                                {loading ? <span className="spinner" style={{ width: 20, height: 20 }} /> : 'Create Account'}
                            </button>
                        </form>
                    )}

                    {success && (
                        <Link to="/login" className="btn btn-primary btn-lg auth-submit" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
                            Go to Login
                        </Link>
                    )}

                    <p className="auth-switch">
                        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

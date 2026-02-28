import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, Bell } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export default function Navbar() {
    const { theme, toggle } = useTheme();
    const { profile, signOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/tutorials', label: 'Tutorial' },
        { path: '/bonus', label: 'Bonus Program' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard" className="navbar-logo">
                    <span className="navbar-logo-icon">B</span>
                    <span>BetterEdge</span>
                </Link>
            </div>

            <div className="navbar-links">
                {navLinks.map(l => (
                    <Link
                        key={l.path}
                        to={l.path}
                        className={`navbar-link ${location.pathname.startsWith(l.path) ? 'active' : ''}`}
                    >
                        {l.label}
                    </Link>
                ))}
            </div>

            <div className="navbar-actions">
                <button className="navbar-icon-btn" onClick={toggle} title="Toggle theme">
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button className="navbar-icon-btn" title="Notifications">
                    <Bell size={18} />
                </button>
                <Link to="/settings/profile" className="navbar-profile">
                    <div className="navbar-avatar">
                        {profile?.full_name?.charAt(0).toUpperCase() || profile?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="navbar-profile-info">
                        <span className="navbar-name">{profile?.full_name || 'Member'}</span>
                        <span className="navbar-status">{profile?.institutional_status}</span>
                    </div>
                </Link>
                <button className="navbar-icon-btn navbar-signout" onClick={handleSignOut} title="Sign out">
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    );
}

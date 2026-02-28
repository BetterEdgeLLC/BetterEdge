import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, CreditCard, Gift, Settings, LogOut } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import './SettingsLayout.css';

export default function SettingsLayout() {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { path: '/settings/profile', label: 'Profile', icon: <User size={16} /> },
        { path: '/settings/subscriptions', label: 'Subscriptions', icon: <CreditCard size={16} /> },
        { path: '/settings/referral', label: 'Referral', icon: <Gift size={16} /> },
        { path: '/settings/preferences', label: 'Preferences', icon: <Settings size={16} /> },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
            <Navbar />
            <div className="settings-layout" style={{ marginTop: 'var(--navbar-height)' }}>
                <aside className="settings-sidebar">
                    <div className="settings-sidebar-title">Account Settings</div>
                    <nav className="settings-nav">
                        {navItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `settings-nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <button className="settings-nav-item settings-signout" onClick={handleSignOut}>
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </aside>
                <main className="settings-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

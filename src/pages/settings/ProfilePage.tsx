import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../supabaseClient';
import './SettingsLayout.css';

export default function ProfilePage() {
    const { profile, refreshProfile } = useAuth();
    const [fullName, setFullName] = useState(profile?.full_name || '');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setSaving(true); setError('');
        const { error } = await supabase.from('profiles').update({ full_name: fullName, updated_at: new Date().toISOString() }).eq('id', profile.id);
        setSaving(false);
        if (error) { setError(error.message); return; }
        await refreshProfile();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div>
            <h1 className="settings-page-title">Profile</h1>
            <p className="settings-page-subtitle">Manage your personal information and account details.</p>

            {/* Avatar section */}
            <div className="settings-section" style={{ marginBottom: 20 }}>
                <div className="settings-section-header">
                    <span className="settings-section-title">Identity</span>
                </div>
                <div className="settings-section-body" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: 16, background: 'var(--color-accent)',
                        color: 'white', fontSize: '2rem', fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                        {(profile?.full_name || profile?.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 'var(--fs-lg)', color: 'var(--color-text-primary)', marginBottom: 4 }}>
                            {profile?.full_name || 'Member'}
                        </div>
                        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>{profile?.email}</div>
                        <span className="badge badge-blue">{profile?.institutional_status || 'Member'}</span>
                    </div>
                </div>
            </div>

            {/* Edit form */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Personal Information</span>
                </div>
                <div className="settings-section-body">
                    {error && <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>}
                    {saved && <div className="auth-success" style={{ marginBottom: 16 }}>Profile updated successfully.</div>}
                    <form onSubmit={handleSave}>
                        <div className="settings-field-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input className="form-input" value={profile?.email || ''} disabled style={{ opacity: 0.6 }} />
                            </div>
                        </div>
                        <div className="settings-field-row">
                            <div className="form-group">
                                <label className="form-label">Referral Code</label>
                                <input className="form-input" value={profile?.referral_code || ''} disabled style={{ opacity: 0.6, fontFamily: 'monospace' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Institutional Status</label>
                                <input className="form-input" value={profile?.institutional_status || 'Member'} disabled style={{ opacity: 0.6 }} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

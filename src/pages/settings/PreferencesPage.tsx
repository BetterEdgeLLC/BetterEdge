import { useTheme } from '../../hooks/useTheme';
import './SettingsLayout.css';

export default function PreferencesPage() {
    const { theme, toggle } = useTheme();

    return (
        <div>
            <h1 className="settings-page-title">Preferences</h1>
            <p className="settings-page-subtitle">Customize your BetterEdge experience.</p>

            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Appearance</span>
                </div>
                <div className="settings-section-body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>Color Theme</div>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>
                                Switch between Noble Light and Noble Dark mode.
                            </div>
                        </div>
                        <div style={{ display: 'flex', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 4, gap: 4 }}>
                            <button
                                onClick={() => theme === 'dark' && toggle()}
                                className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ minWidth: 90 }}
                            >
                                ☀️ Light
                            </button>
                            <button
                                onClick={() => theme === 'light' && toggle()}
                                className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ minWidth: 90 }}
                            >
                                🌙 Dark
                            </button>
                        </div>
                    </div>
                    <hr className="divider" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>Timezone</div>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>All chart data is displayed in this timezone.</div>
                        </div>
                        <select className="form-input" style={{ width: 200 }} defaultValue="UTC+1">
                            <option value="UTC+1">UTC+1 (CET)</option>
                            <option value="UTC+0">UTC+0 (GMT)</option>
                            <option value="UTC+2">UTC+2 (EET)</option>
                            <option value="UTC-5">UTC-5 (EST)</option>
                        </select>
                    </div>
                    <hr className="divider" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>Default Timeframe</div>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>The timeframe shown when you open the dashboard.</div>
                        </div>
                        <select className="form-input" style={{ width: 200 }} defaultValue="Daily">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Notifications</span>
                </div>
                <div className="settings-section-body">
                    {[
                        { label: 'New data updates', desc: 'Get notified when fresh statistical data is available.' },
                        { label: 'Referral credits', desc: 'Get notified when a referral earns you a credit.' },
                        { label: 'Subscription reminders', desc: 'Reminders before your subscription expires.' },
                    ].map(n => (
                        <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 3 }}>{n.label}</div>
                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>{n.desc}</div>
                            </div>
                            <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
                                <span style={{
                                    position: 'absolute', cursor: 'pointer', inset: 0,
                                    background: 'var(--color-accent)', borderRadius: 12,
                                    display: 'flex', alignItems: 'center',
                                }}>
                                    <span style={{ position: 'absolute', left: 22, width: 18, height: 18, background: 'white', borderRadius: '50%', top: 3 }} />
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary">Save Preferences</button>
            </div>
        </div>
    );
}

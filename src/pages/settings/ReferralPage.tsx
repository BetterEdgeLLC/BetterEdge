import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_REFERRALS } from '../../data/mockData';
import './SettingsLayout.css';

export default function ReferralPage() {
    const { profile } = useAuth();
    const [copied, setCopied] = useState(false);

    const referralCode = profile?.referral_code || 'XXXXXXXX';
    const referralLink = `https://betteredge.io/ref/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2600);
    };

    return (
        <div>
            <h1 className="settings-page-title">Referral Program</h1>
            <p className="settings-page-subtitle">Earn 20% credit for every successful referral.</p>

            {/* Summary stats */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Your Referral Stats</span>
                </div>
                <div className="settings-section-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                        {[
                            { label: 'Total Referrals', value: '3' },
                            { label: 'Active Members', value: '2' },
                            { label: 'Total Earned', value: '€59.60' },
                        ].map(s => (
                            <div key={s.label} style={{ textAlign: 'center', padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--color-accent)', marginBottom: 4 }}>{s.value}</div>
                                <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Referral link */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Your Referral Link</span>
                </div>
                <div className="settings-section-body">
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                        Share this link. When someone subscribes, you earn 20% of their payment as account credit automatically.
                    </p>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                        <div style={{
                            flex: 1, background: 'var(--color-bg-secondary)', border: '1.5px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)', padding: '11px 16px', overflow: 'hidden'
                        }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 'var(--fs-sm)', color: 'var(--color-accent)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {referralLink}
                            </span>
                        </div>
                        <button className={`btn ${copied ? 'btn-secondary' : 'btn-primary'}`} onClick={handleCopy}>
                            {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                        </button>
                    </div>
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
                        Your code: <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>{referralCode}</strong>
                    </p>
                </div>
            </div>

            {/* Referral table */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Referral History</span>
                </div>
                <table className="bonus-table">
                    <thead>
                        <tr>
                            <th>Referred User</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Credit Earned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_REFERRALS.map((r, i) => (
                            <tr key={i}>
                                <td>{r.email}</td>
                                <td>{r.date}</td>
                                <td>
                                    <span className={`badge ${r.status === 'Credited' ? 'badge-green' : r.status === 'Active' ? 'badge-blue' : 'badge-silver'}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td style={{ fontWeight: r.credit !== '€0.00' ? 700 : 400, color: r.credit !== '€0.00' ? 'var(--color-green)' : 'inherit' }}>
                                    {r.credit}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

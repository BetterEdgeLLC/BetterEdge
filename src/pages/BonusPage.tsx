import { useState } from 'react';
import { Copy, CheckCircle, Gift, Users, DollarSign, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { MOCK_REFERRALS } from '../data/mockData';
import './BonusPage.css';

export default function BonusPage() {
    const { profile } = useAuth();
    const [copied, setCopied] = useState(false);
    const [activeSymbol] = useState('EURUSD');

    const referralCode = profile?.referral_code || 'XXXXXXXX';
    const referralLink = `https://betteredge.io/ref/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2600);
    };

    return (
        <div className="dashboard-layout" onContextMenu={e => e.preventDefault()}>
            <Sidebar activeSymbol={activeSymbol} onSelectSymbol={() => { }} />
            <div className="dashboard-main">
                <Navbar />
                <div className="dashboard-content no-select" style={{ marginTop: 'var(--navbar-height)' }}>

                    {/* Header */}
                    <div className="bonus-header">
                        <div className="bonus-header-left">
                            <div className="section-label">Loyalty Program</div>
                            <h1 className="db-title">Bonus Program</h1>
                            <p className="db-subtitle">Earn 20% credit on every successful referral — credited directly to your account.</p>
                        </div>
                        <div className="bonus-highlight-badge">
                            <Gift size={20} />
                            <span>20% Credit</span>
                            <span className="bonus-badge-sub">per referral</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid-4 bonus-stats">
                        <div className="card bonus-stat-card">
                            <div className="bonus-stat-icon"><Users size={18} /></div>
                            <div className="bonus-stat-value">3</div>
                            <div className="bonus-stat-label">Total Referrals</div>
                        </div>
                        <div className="card bonus-stat-card">
                            <div className="bonus-stat-icon bonus-stat-icon-green"><CheckCircle size={18} /></div>
                            <div className="bonus-stat-value text-green">2</div>
                            <div className="bonus-stat-label">Active Members</div>
                        </div>
                        <div className="card bonus-stat-card">
                            <div className="bonus-stat-icon bonus-stat-icon-accent"><DollarSign size={18} /></div>
                            <div className="bonus-stat-value text-accent">€59.60</div>
                            <div className="bonus-stat-label">Total Earned</div>
                        </div>
                        <div className="card bonus-stat-card">
                            <div className="bonus-stat-icon"><TrendingUp size={18} /></div>
                            <div className="bonus-stat-value">€0.00</div>
                            <div className="bonus-stat-label">Pending Credits</div>
                        </div>
                    </div>

                    {/* Referral link */}
                    <div className="card bonus-link-card">
                        <div className="bonus-link-header">
                            <h3>Your Unique Referral Link</h3>
                            <p>Share this link — when someone subscribes, you earn 20% of their payment as account credit.</p>
                        </div>
                        <div className="bonus-link-row">
                            <div className="bonus-link-display">
                                <span className="bonus-link-text">{referralLink}</span>
                            </div>
                            <button className={`btn ${copied ? 'btn-secondary' : 'btn-primary'} bonus-copy-btn`} onClick={handleCopy}>
                                {copied ? <><CheckCircle size={15} /> Copied!</> : <><Copy size={15} /> Copy Link</>}
                            </button>
                        </div>
                        <div className="bonus-link-code">
                            Your referral code: <strong>{referralCode}</strong>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="card bonus-how-card">
                        <h3 className="bonus-how-title">How It Works</h3>
                        <div className="bonus-steps">
                            <div className="bonus-step">
                                <div className="bonus-step-num">1</div>
                                <div>
                                    <div className="bonus-step-title">Share Your Link</div>
                                    <div className="bonus-step-desc">Send your unique referral link to traders in your network.</div>
                                </div>
                            </div>
                            <div className="bonus-step">
                                <div className="bonus-step-num">2</div>
                                <div>
                                    <div className="bonus-step-title">They Subscribe</div>
                                    <div className="bonus-step-desc">When they purchase any BetterEdge plan, you get credited.</div>
                                </div>
                            </div>
                            <div className="bonus-step">
                                <div className="bonus-step-num">3</div>
                                <div>
                                    <div className="bonus-step-title">Earn 20% Credit</div>
                                    <div className="bonus-step-desc">20% of their payment is applied to your next renewal. Automatically.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Referral table */}
                    <div className="card bonus-table-card">
                        <div className="bonus-table-header">
                            <h3>Referral History</h3>
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
                                        <td className={r.credit !== '€0.00' ? 'text-green fw-700' : ''}>{r.credit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

import { useAuth } from '../../hooks/useAuth';
import { INVOICES } from '../../data/mockData';
import './SettingsLayout.css';

export default function SubscriptionsPage() {
    const { subscription } = useAuth();

    const tier = subscription?.subscription_tier || 'free';
    const tierLabel = tier === 'premium' ? 'Premium' : tier === 'basic' ? 'Basic' : 'Free';
    const expires = subscription?.subscription_expires
        ? new Date(subscription.subscription_expires).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
        : '—';

    return (
        <div>
            <h1 className="settings-page-title">Subscriptions & Billing</h1>
            <p className="settings-page-subtitle">Manage your active plan, payment methods, and invoices.</p>

            {/* Active Plan */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Active Plan</span>
                    <span className={`badge ${tier !== 'free' ? 'badge-green' : 'badge-silver'}`}>
                        {tier !== 'free' ? 'ACTIVE' : 'FREE TIER'}
                    </span>
                </div>
                <div className="settings-section-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                        <div>
                            <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)', marginBottom: 6 }}>Plan</div>
                            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>{subscription?.plan_name || `${tierLabel} Plan`}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)', marginBottom: 6 }}>Expires</div>
                            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>{expires}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--color-text-muted)', marginBottom: 6 }}>Symbols</div>
                            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                                {subscription?.subscribed_symbols?.length ?? 0} active
                            </div>
                        </div>
                    </div>
                    <hr className="divider" style={{ margin: '20px 0' }} />
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button className="btn btn-primary">Upgrade Plan</button>
                        <button className="btn btn-secondary">Cancel Subscription</button>
                    </div>
                </div>
            </div>

            {/* Payment method placeholder */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Payment Method</span>
                </div>
                <div className="settings-section-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                            borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12
                        }}>
                            <span style={{ fontSize: 20 }}>💳</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', color: 'var(--color-text-primary)' }}>Visa ending in 4242</div>
                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>Expires 09/2028</div>
                            </div>
                        </div>
                        <button className="btn btn-secondary btn-sm">Update Card</button>
                    </div>
                </div>
            </div>

            {/* Invoice table */}
            <div className="settings-section">
                <div className="settings-section-header">
                    <span className="settings-section-title">Invoice History</span>
                </div>
                <table className="bonus-table">
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Date</th>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {INVOICES.map(inv => (
                            <tr key={inv.id}>
                                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{inv.id}</td>
                                <td>{inv.date}</td>
                                <td>{inv.plan}</td>
                                <td style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{inv.amount}</td>
                                <td><span className="badge badge-green">{inv.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

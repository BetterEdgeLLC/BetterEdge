import { Link } from 'react-router-dom';
import { Lock, TrendingUp, BarChart2, Bitcoin, Gem } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { SYMBOL_GROUPS } from '../data/mockData';
import './Sidebar.css';

interface SidebarProps {
    activeSymbol: string;
    onSelectSymbol: (symbol: string) => void;
}

export default function Sidebar({ activeSymbol, onSelectSymbol }: SidebarProps) {
    const { subscription } = useAuth();
    const subscribedSymbols = subscription?.subscribed_symbols || [];

    const groupIcons: Record<string, React.ReactNode> = {
        'Forex Majors': <TrendingUp size={14} />,
        'Forex Crosses': <TrendingUp size={14} />,
        Indices: <BarChart2 size={14} />,
        Crypto: <Bitcoin size={14} />,
        Commodities: <Gem size={14} />,
    };

    const isLocked = (symbol: string, defaultLocked: boolean) => {
        if (subscription?.subscription_tier === 'premium') return false;
        if (subscribedSymbols.includes(symbol)) return false;
        return defaultLocked;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">B</div>
                <span className="sidebar-logo-text">BetterEdge</span>
            </div>

            <div className="sidebar-section-label">Markets</div>

            {Object.entries(SYMBOL_GROUPS).map(([group, symbols]) => (
                <div key={group} className="sidebar-group">
                    <div className="sidebar-group-header">
                        {groupIcons[group]}
                        <span>{group}</span>
                    </div>
                    {symbols.map(({ symbol, name, locked }) => {
                        const isLockedSymbol = isLocked(symbol, locked);
                        const isActive = activeSymbol === symbol;
                        return (
                            <button
                                key={symbol}
                                className={`sidebar-item ${isActive ? 'active' : ''} ${isLockedSymbol ? 'locked' : ''}`}
                                onClick={() => !isLockedSymbol && onSelectSymbol(symbol)}
                                title={isLockedSymbol ? `Upgrade to access ${name}` : name}
                            >
                                <span className="sidebar-symbol">{symbol}</span>
                                {isLockedSymbol && <Lock size={11} className="sidebar-lock" />}
                            </button>
                        );
                    })}
                </div>
            ))}

            <div className="sidebar-footer">
                <Link to="/settings/subscriptions" className="sidebar-upgrade-btn">
                    Upgrade Plan
                </Link>
            </div>
        </aside>
    );
}

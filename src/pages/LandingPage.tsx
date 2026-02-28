import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, BookOpen, ArrowRight, Check, Shield, Clock, Star } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { PRICING_PLANS } from '../data/mockData';
import './LandingPage.css';

export default function LandingPage() {
    const { theme, toggle } = useTheme();

    return (
        <div className="landing" onContextMenu={e => e.preventDefault()}>
            {/* ─── NAV ─── */}
            <header className="landing-header">
                <div className="container landing-header-inner">
                    <div className="landing-logo">
                        <div className="landing-logo-icon">B</div>
                        <span>BetterEdge</span>
                    </div>
                    <nav className="landing-nav">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#about">About</a>
                    </nav>
                    <div className="landing-header-actions">
                        <button className="btn btn-ghost btn-sm" onClick={toggle}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                        <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                    </div>
                </div>
            </header>

            {/* ─── HERO ─── */}
            <section className="landing-hero">
                <div className="container landing-hero-inner">
                    <div className="landing-hero-content">
                        <div className="landing-hero-badge">
                            <Star size={12} />
                            <span>Professional Trading Analytics</span>
                        </div>
                        <h1 className="landing-hero-title">
                            World-Class Statistics to Perfect Your Trading Strategy
                        </h1>
                        <p className="landing-hero-sub">
                            Access over 35,000 time series of historical 30-minute market data.
                            Identify exactly when institutional highs and lows form — with mathematical precision.
                        </p>
                        <div className="landing-hero-actions">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Start Your Edge <ArrowRight size={18} />
                            </Link>
                            <a href="#features" className="btn btn-secondary btn-lg">See How It Works</a>
                        </div>
                        <div className="landing-hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-num">35,000+</span>
                                <span className="hero-stat-label">Time Series</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-num">20+</span>
                                <span className="hero-stat-label">Symbols</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-num">3</span>
                                <span className="hero-stat-label">Timeframes</span>
                            </div>
                        </div>
                    </div>
                    <div className="landing-hero-visual">
                        <div className="hero-chart-preview">
                            <div className="hero-chart-header">
                                <span className="hero-chart-symbol">EURUSD</span>
                                <span className="badge badge-green">Bullish Session</span>
                            </div>
                            <div className="hero-chart-bars">
                                {[0.3, 0.5, 0.6, 0.45, 0.7, 0.85, 0.9, 0.75, 0.6, 0.5, 0.65, 0.8, 0.7, 0.55, 0.4, 0.6, 0.75, 0.8, 0.65, 0.5, 0.45, 0.55, 0.6, 0.4].map((h, i) => (
                                    <div key={i} className="hero-bar" style={{ height: `${h * 100}%` }} />
                                ))}
                            </div>
                            <div className="hero-chart-footer">
                                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:30</span>
                            </div>
                            <div className="hero-chart-overlay">
                                <div className="hero-overlay-card">
                                    <span className="hero-overlay-label">High Probability Window</span>
                                    <span className="hero-overlay-value">09:00 – 10:30 UTC+1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── VIDEO SECTION ─── */}
            <section className="landing-video" id="about">
                <div className="container">
                    <div className="section-label">The Problem</div>
                    <h2 className="section-title">Correct Idea. Wrong Timing.</h2>
                    <p className="section-sub">
                        Most traders understand market direction — but lose money on timing. BetterEdge gives you
                        the statistical foundation to enter at precisely the right moment, every session.
                    </p>
                    <div className="landing-video-player">
                        <div className="video-placeholder">
                            <div className="video-play-btn">
                                <div className="video-play-icon" />
                            </div>
                            <span>Introduction to BetterEdge — 3:42</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="landing-features" id="features">
                <div className="container">
                    <div className="section-label">What You Get</div>
                    <h2 className="section-title">Your Professional Trading Edge</h2>
                    <div className="grid-3 landing-features-grid">
                        <div className="feature-card">
                            <div className="feature-icon feature-icon-blue">
                                <BarChart2 size={24} />
                            </div>
                            <h3>35,000+ Time Series</h3>
                            <p>Every 30-minute window across 5 years of market data. Frequency scored and statistically validated across Forex, Indices, and Crypto.</p>
                        </div>
                        <div className="feature-card feature-card-accent">
                            <div className="feature-icon feature-icon-white">
                                <TrendingUp size={24} />
                            </div>
                            <h3>Market High/Low Prediction</h3>
                            <p>Know the exact 30-minute window with the highest historical probability for the daily high or low to form — for bullish and bearish sessions separately.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon feature-icon-blue">
                                <BookOpen size={24} />
                            </div>
                            <h3>Strategic Hub</h3>
                            <p>Complete tutorial vault + bonus referral program. Learn the system, deepen your edge, and earn credits for every successful referral.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="landing-how">
                <div className="container">
                    <div className="section-label">Simple Process</div>
                    <h2 className="section-title">How BetterEdge Works</h2>
                    <div className="landing-steps">
                        <div className="landing-step">
                            <div className="step-num">01</div>
                            <h4>Choose Your Symbols</h4>
                            <p>Select the instruments you trade from our library of Forex pairs, Indices, and Crypto assets.</p>
                        </div>
                        <div className="landing-step-arrow">→</div>
                        <div className="landing-step">
                            <div className="step-num">02</div>
                            <h4>Select Your Timeframe</h4>
                            <p>View Daily, Weekly, or Monthly data windows. Each timeframe reveals different patterns.</p>
                        </div>
                        <div className="landing-step-arrow">→</div>
                        <div className="landing-step">
                            <div className="step-num">03</div>
                            <h4>Trade With Confidence</h4>
                            <p>Enter your trades during the statistically highest-probability 30-minute windows. Stop guessing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PRICING ─── */}
            <section className="landing-pricing" id="pricing">
                <div className="container">
                    <div className="section-label">Investment</div>
                    <h2 className="section-title">Transparent Pricing</h2>
                    <p className="section-sub">Choose the plan that fits your trading journey. All plans include full access to the analytics dashboard.</p>
                    <div className="pricing-grid">
                        {PRICING_PLANS.map(plan => (
                            <div
                                key={plan.id}
                                className={`pricing-card ${plan.color === 'blue' ? 'pricing-card-blue' : ''} ${plan.color === 'silver' ? 'pricing-card-silver' : ''}`}
                            >
                                {plan.tag && (
                                    <div className={`pricing-tag ${plan.color === 'blue' ? 'pricing-tag-blue' : 'pricing-tag-silver'}`}>
                                        {plan.tag}
                                    </div>
                                )}
                                <div className="pricing-name">{plan.name}</div>
                                <div className="pricing-price">
                                    <span className="pricing-amount">{plan.price}</span>
                                    <span className="pricing-period">{plan.period}</span>
                                </div>
                                <div className="pricing-monthly">{plan.monthly}</div>
                                <ul className="pricing-features">
                                    {plan.features.map(f => (
                                        <li key={f}>
                                            <Check size={14} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/register"
                                    className={`btn ${plan.color === 'blue' ? 'btn-primary' : 'btn-secondary'} pricing-cta`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TRUST ─── */}
            <section className="landing-trust">
                <div className="container landing-trust-inner">
                    <div className="trust-item">
                        <Shield size={20} />
                        <span>Institutional-grade data security</span>
                    </div>
                    <div className="trust-divider" />
                    <div className="trust-item">
                        <Clock size={20} />
                        <span>Daily updated statistics</span>
                    </div>
                    <div className="trust-divider" />
                    <div className="trust-item">
                        <Star size={20} />
                        <span>Built by professional traders</span>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="landing-footer-top">
                        <div className="landing-logo">
                            <div className="landing-logo-icon">B</div>
                            <span>BetterEdge</span>
                        </div>
                        <div className="landing-footer-links">
                            <a href="#features">Features</a>
                            <a href="#pricing">Pricing</a>
                            <Link to="/login">Member Login</Link>
                        </div>
                    </div>
                    <hr className="divider" />
                    <p className="landing-disclaimer">
                        <strong>Risk Disclaimer:</strong> Trading financial instruments involves significant risk of loss and is not suitable for every investor. Past statistical patterns do not guarantee future results. BetterEdge provides analytical tools only and does not constitute financial advice. Always trade responsibly and within your risk tolerance. © 2026 BetterEdge. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

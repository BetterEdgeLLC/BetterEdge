import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { TUTORIALS } from '../data/mockData';
import './TutorialsPage.css';

export default function TutorialsPage() {
    const [activeSymbol] = useState('EURUSD');
    const featured = TUTORIALS[0];

    return (
        <div className="dashboard-layout" onContextMenu={e => e.preventDefault()}>
            <Sidebar activeSymbol={activeSymbol} onSelectSymbol={() => { }} />
            <div className="dashboard-main">
                <Navbar />
                <div className="dashboard-content no-select" style={{ marginTop: 'var(--navbar-height)' }}>

                    <div className="tutorials-header">
                        <div className="section-label">Member Education</div>
                        <h1 className="db-title">Strategy Vault</h1>
                        <p className="db-subtitle">Master the BetterEdge system — from fundamentals to advanced execution.</p>
                    </div>

                    {/* Featured video */}
                    <div className="card tutorials-featured">
                        <div className="tutorials-featured-video">
                            <div className="video-placeholder" style={{ height: 340 }}>
                                <div className="video-play-btn">
                                    <div className="video-play-icon" />
                                </div>
                                <span>{featured.title}</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{featured.duration}</span>
                            </div>
                        </div>
                        <div className="tutorials-featured-info">
                            <div className="badge badge-blue" style={{ marginBottom: 10 }}>Featured Lesson</div>
                            <h2 className="tutorials-featured-title">{featured.title}</h2>
                            <p className="tutorials-featured-desc">
                                Learn the foundational structure that powers the BetterEdge statistical system.
                                This lesson covers how markets form their daily high and low, and how to use
                                frequency data to anticipate these moves.
                            </p>
                            <div className="tutorials-progress-row">
                                <div className="tutorials-progress-bar">
                                    <div className="tutorials-progress-fill" style={{ width: `${featured.progress}%`, background: 'var(--color-green)' }} />
                                </div>
                                <span className="tutorials-progress-label">{featured.progress}% complete</span>
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: 16 }}>
                                {featured.progress === 100 ? 'Rewatch Lesson' : 'Continue Lesson'}
                            </button>
                        </div>
                    </div>

                    {/* Lessons grid */}
                    <div className="tutorials-grid-label">All Lessons</div>
                    <div className="grid-2 tutorials-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                        {TUTORIALS.map(t => (
                            <div key={t.id} className="card tutorials-lesson-card">
                                <div className="tutorials-lesson-thumb" style={{ background: 'var(--color-sidebar-bg)', position: 'relative' }}>
                                    <img src={t.thumbnail} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    <div className="tutorials-play-overlay">
                                        <div className="tutorials-mini-play">
                                            <div className="video-play-icon" style={{ borderWidth: '6px 0 6px 10px' }} />
                                        </div>
                                    </div>
                                    <span className="tutorials-duration">{t.duration}</span>
                                </div>
                                <div className="tutorials-lesson-body">
                                    <div className="tutorials-lesson-num">Lesson {t.id}</div>
                                    <div className="tutorials-lesson-title">{t.title}</div>
                                    <div className="tutorials-progress-bar" style={{ marginTop: 10 }}>
                                        <div
                                            className="tutorials-progress-fill"
                                            style={{ width: `${t.progress}%`, background: t.progress === 100 ? 'var(--color-green)' : 'var(--color-accent)' }}
                                        />
                                    </div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', marginTop: 5 }}>
                                        {t.progress === 0 ? 'Not started' : t.progress === 100 ? '✓ Completed' : `${t.progress}% done`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

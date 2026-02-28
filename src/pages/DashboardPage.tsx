import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement, Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useSymbolStats, ALL_SLOTS } from '../hooks/useSymbolStats';
import { useWeeklyStats, WEEKDAYS as WEEKLY_DAYS } from '../hooks/useWeeklyStats';
import type { Direction, Weekday } from '../hooks/useSymbolStats';
import { SYMBOL_GROUPS } from '../data/mockData';
import './DashboardPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Timeframe = 'Daily' | 'Weekly' | 'Monthly';
type StatType = 'high' | 'low';

const COLOR_MAP: Record<Direction, { bg: string; label: string }> = {
    all: { bg: 'rgba(19,91,236,0.75)', label: 'All Weeks/Days' },
    bull: { bg: 'rgba(16,185,129,0.75)', label: 'Bullish' },
    bear: { bg: 'rgba(220,38,38,0.75)', label: 'Bearish' },
};

const WEEKDAYS: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Daily fallback
function generateFallback(day: number): number[] {
    return Array.from({ length: 48 }, (_, i) =>
        Math.max(0.01, Math.min(0.99, 0.3 + Math.sin((i + day) * 0.45) * 0.25))
    );
}

// Weekly fallback – 5 random-ish bars
function generateWeeklyFallback(): number[] {
    return [0.18, 0.22, 0.24, 0.20, 0.16];
}

export default function DashboardPage() {
    const [activeSymbol, setActiveSymbol] = useState('EURUSD');
    const [timeframe, setTimeframe] = useState<Timeframe>('Daily');
    const [activeDay, setActiveDay] = useState(0);
    const [colorMode, setColorMode] = useState<Direction>('all');
    const [statType, setStatType] = useState<StatType>('high');

    // Daily stats
    const { data: dailyData, loading: dailyLoading, error: dailyError } = useSymbolStats(activeSymbol);
    // Weekly stats
    const { data: weeklyData, loading: weeklyLoading, error: weeklyError } = useWeeklyStats(activeSymbol);

    const isWeekly = timeframe === 'Weekly';

    // ── Daily chart data ─────────────────────────────────────────────────────
    const statsDay = dailyData?.[WEEKDAYS[activeDay]]?.[colorMode];
    const dailyValues = statsDay ? statsDay[statType] : generateFallback(activeDay);

    // ── Weekly chart data (5 bars: Mon–Fri) ──────────────────────────────────
    const weeklyDirData = weeklyData?.[colorMode];
    const weeklyValues: number[] = weeklyDirData
        ? WEEKLY_DAYS.map(wd => (statType === 'high' ? weeklyDirData[wd].pct_high : weeklyDirData[wd].pct_low))
        : generateWeeklyFallback();

    // Active values and labels depend on timeframe
    const values = isWeekly ? weeklyValues : dailyValues;
    const labels = isWeekly ? WEEKLY_DAYS : ALL_SLOTS;

    // Auto-scale Y axis
    const dataMax = values.length > 0 ? Math.max(...values) : 1;
    const yMax = dataMax > 0 ? Math.min(1, dataMax * 1.15) : 1;

    const { bg, label } = COLOR_MAP[colorMode];

    const chartData = {
        labels,
        datasets: [{
            label: `${label} — ${statType === 'high' ? 'High' : 'Low'} Probability`,
            data: values,
            backgroundColor: bg,
            borderRadius: isWeekly ? 4 : 2,
            borderSkipped: false,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: { formattedValue: string }) =>
                        `Probability: ${(parseFloat(ctx.formattedValue) * 100).toFixed(1)}%`,
                },
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(128,128,128,0.08)' },
                ticks: {
                    color: '#8A9CBE',
                    font: { size: isWeekly ? 12 : 10 },
                    maxTicksLimit: isWeekly ? 5 : 12,
                },
            },
            y: {
                grid: { color: 'rgba(128,128,128,0.08)' },
                ticks: {
                    color: '#8A9CBE',
                    font: { size: 10 },
                    callback: (v: number | string) => `${Math.round(+v * 100)}%`,
                },
                min: 0,
                max: yMax,
                suggestedMax: yMax,
            },
        },
    };

    // Symbol display name
    const allSymbols = Object.values(SYMBOL_GROUPS).flat();
    const activeName = allSymbols.find(s => s.symbol === activeSymbol)?.name || activeSymbol;

    // Loading/error state
    const loading = isWeekly ? weeklyLoading : dailyLoading;
    const error = isWeekly ? weeklyError : dailyError;
    const data = isWeekly ? weeklyData : dailyData;

    // Summary cards
    const bullStat = dailyData?.[WEEKDAYS[activeDay]]?.bull;
    const bearStat = dailyData?.[WEEKDAYS[activeDay]]?.bear;
    const maxHighBull = bullStat ? Math.max(...bullStat.high) : null;
    const maxLowBear = bearStat ? Math.max(...bearStat.low) : null;

    // Weekly summary: find weekday dominating high/low for current direction
    const weeklyDomHigh = weeklyDirData
        ? WEEKLY_DAYS.reduce((best, wd) =>
            weeklyDirData[wd].pct_high > weeklyDirData[best].pct_high ? wd : best, WEEKLY_DAYS[0])
        : null;
    const weeklyDomLow = weeklyDirData
        ? WEEKLY_DAYS.reduce((best, wd) =>
            weeklyDirData[wd].pct_low > weeklyDirData[best].pct_low ? wd : best, WEEKLY_DAYS[0])
        : null;

    const probCards = isWeekly ? [
        {
            label: 'Timeframe',
            value: 'Weekly',
            sub: 'ISO Week Analysis',
        },
        {
            label: 'High Forms On',
            value: weeklyDomHigh ?? '—',
            sub: `${label} weeks — most frequent`,
        },
        {
            label: 'Low Forms On',
            value: weeklyDomLow ?? '—',
            sub: `${label} weeks — most frequent`,
        },
        {
            label: 'Data Status',
            value: loading ? 'Loading…' : error ? 'Error' : data ? 'Live' : 'Pending',
            sub: loading ? 'Fetching from database' : error ? error.slice(0, 40) : 'BetterEdge Statistical Engine',
        },
    ] : [
        {
            label: 'Current Day',
            value: WEEKDAYS[activeDay],
            sub: 'Selected Trading Day',
        },
        {
            label: 'High Probability',
            value: maxHighBull !== null ? `${(maxHighBull * 100).toFixed(0)}%` : '—',
            sub: `Bullish Days — Peak High Window`,
        },
        {
            label: 'Low Probability',
            value: maxLowBear !== null ? `${(maxLowBear * 100).toFixed(0)}%` : '—',
            sub: `Bearish Days — Peak Low Window`,
        },
        {
            label: 'Data Status',
            value: loading ? 'Loading…' : error ? 'Error' : data ? 'Live' : 'Pending',
            sub: loading ? 'Fetching from database' : error ? error.slice(0, 40) : 'BetterEdge Statistical Engine',
        },
    ];

    return (
        <div className="dashboard-layout" onContextMenu={e => e.preventDefault()}>
            <Sidebar activeSymbol={activeSymbol} onSelectSymbol={setActiveSymbol} />
            <div className="dashboard-main">
                <Navbar />
                <div className="dashboard-content" style={{ marginTop: 'var(--navbar-height)' }}>

                    {/* ─── Header ─── */}
                    <div className="db-header">
                        <div>
                            <h1 className="db-title no-select">
                                <span className="db-symbol">{activeSymbol}</span>
                                <span className="db-symbol-name">{activeName}</span>
                            </h1>
                            <p className="db-subtitle no-select">Statistical frequency analysis — {timeframe} windows</p>
                        </div>
                        <div className="db-controls">
                            {(['Daily', 'Weekly', 'Monthly'] as Timeframe[]).map(tf => (
                                <button
                                    key={tf}
                                    className={`db-tab ${timeframe === tf ? 'active' : ''}`}
                                    onClick={() => setTimeframe(tf)}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ─── Probability Hub ─── */}
                    <div className="grid-4 db-prob-grid no-select">
                        {probCards.map((card, i) => (
                            <div key={i} className={`card db-prob-card ${i === 0 ? 'db-prob-card-day' : ''}`}>
                                <div className="db-prob-label">{card.label}</div>
                                <div className="db-prob-value">{card.value}</div>
                                <div className="db-prob-sub">{card.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* ─── Day tabs (Daily only) ─── */}
                    {!isWeekly && (
                        <div className="db-day-tabs">
                            {WEEKDAYS.map((day, i) => (
                                <button
                                    key={day}
                                    className={`db-day-tab ${activeDay === i ? 'active' : ''}`}
                                    onClick={() => setActiveDay(i)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ─── Color mode + Stat type ─── */}
                    <div className="db-color-controls">
                        {(['all', 'bull', 'bear'] as Direction[]).map(m => (
                            <button
                                key={m}
                                className={`db-color-btn db-color-btn-${m} ${colorMode === m ? 'active' : ''}`}
                                onClick={() => setColorMode(m)}
                            >
                                <span className={`db-color-dot db-dot-${m}`} />
                                {COLOR_MAP[m].label}
                            </button>
                        ))}
                        <div className="db-stat-type-toggle">
                            {(['high', 'low'] as StatType[]).map(t => (
                                <button
                                    key={t}
                                    className={`db-stat-type-btn ${statType === t ? 'active' : ''}`}
                                    onClick={() => setStatType(t)}
                                >
                                    {t === 'high' ? '▲ High' : '▼ Low'}
                                </button>
                            ))}
                        </div>
                        <span className="db-timezone no-select">UTC+1 Timezone</span>
                    </div>

                    {/* ─── Chart ─── */}
                    <div className="card db-chart-card">
                        <div className="db-chart-header no-select">
                            <div>
                                <span className="db-chart-title">
                                    {isWeekly ? 'Weekly Weekday Frequency Analysis' : '30-Minute Frequency Analysis'}
                                </span>
                                <span className="db-chart-sub">
                                    {isWeekly
                                        ? `Historical ${statType === 'high' ? 'High' : 'Low'} Probability by Weekday (${label} Weeks)`
                                        : `Historical ${statType === 'high' ? 'High' : 'Low'} Probability Windows — ${WEEKDAYS[activeDay]}`
                                    }
                                    {loading && ' (loading…)'}
                                    {!loading && !data && !error && ' (no data yet)'}
                                </span>
                            </div>
                            <div className={`badge ${data && !loading ? 'badge-blue' : 'badge-gray'}`}>
                                {loading ? 'Loading' : data ? 'Live Data' : 'No Data'}
                            </div>
                        </div>
                        <div className="db-chart-wrapper" style={{ position: 'relative' }}>
                            <div className="data-overlay" style={{ zIndex: 5 }} />
                            <div style={{ height: 320, position: 'relative', zIndex: 1 }}>
                                <Bar data={chartData} options={chartOptions as never} />
                            </div>
                        </div>
                        <div className="db-chart-footer no-select">
                            <span>Data Range: Jan 2023 – Dec 2025</span>
                            <span>
                                {data
                                    ? isWeekly
                                        ? `Weekly data loaded — ${WEEKLY_DAYS.length} weekdays`
                                        : `Data loaded — ${Object.keys(data).length} weekdays`
                                    : loading
                                        ? 'Fetching statistics…'
                                        : error
                                            ? `Error: ${error}`
                                            : 'Run the data processor to populate statistics'}
                            </span>
                            <span>Source: BetterEdge Statistical Engine</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

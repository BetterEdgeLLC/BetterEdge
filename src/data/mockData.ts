// Mock data for all placeholder content

// ─── Symbols ──────────────────────────────
export const SYMBOL_GROUPS = {
    'Forex Majors': [
        { symbol: 'EURUSD', name: 'Euro / US Dollar', locked: false },
        { symbol: 'GBPUSD', name: 'British Pound / US Dollar', locked: false },
        { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', locked: false },
        { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', locked: false },
        { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', locked: false },
        { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', locked: false },
        { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', locked: false },
        { symbol: 'DXY', name: 'US Dollar Index', locked: false },
    ],
    'Forex Crosses': [
        { symbol: 'EURAUD', name: 'Euro / Australian Dollar', locked: false },
        { symbol: 'EURCAD', name: 'Euro / Canadian Dollar', locked: false },
        { symbol: 'EURCHF', name: 'Euro / Swiss Franc', locked: false },
        { symbol: 'EURGBP', name: 'Euro / British Pound', locked: false },
        { symbol: 'EURJPY', name: 'Euro / Japanese Yen', locked: false },
        { symbol: 'EURNZD', name: 'Euro / New Zealand Dollar', locked: false },
        { symbol: 'GBPAUD', name: 'British Pound / Australian Dollar', locked: false },
        { symbol: 'GBPCAD', name: 'British Pound / Canadian Dollar', locked: false },
        { symbol: 'GBPCHF', name: 'British Pound / Swiss Franc', locked: false },
        { symbol: 'GBPJPY', name: 'British Pound / Japanese Yen', locked: false },
        { symbol: 'GBPNZD', name: 'British Pound / New Zealand Dollar', locked: false },
    ],
    Indices: [
        { symbol: 'DE40', name: 'DAX 40 Index', locked: false },
        { symbol: 'US100', name: 'NASDAQ 100', locked: false },
        { symbol: 'US500', name: 'S&P 500 Index', locked: false },
    ],
    Crypto: [
        { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', locked: false },
        { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', locked: false },
    ],
    Commodities: [
        { symbol: 'XAUUSD', name: 'Gold / US Dollar', locked: false },
        { symbol: 'XAGUSD', name: 'Silver / US Dollar', locked: false },
        { symbol: 'USOIL', name: 'US Crude Oil (WTI)', locked: false },
        { symbol: 'COPPER', name: 'Copper', locked: false },
    ],
};

// ─── 30-Min Bar Chart Data (48 bars = 00:00–23:30) ──────────────────────
function generateBarData(seed: number, bias: number = 0) {
    return Array.from({ length: 48 }, (_, i) => {
        const base = 0.3 + Math.sin((i + seed) * 0.4) * 0.25 + Math.cos((i + seed * 0.3) * 0.7) * 0.15;
        return Math.max(0.05, Math.min(1, base + bias + (Math.random() * 0.08 - 0.04)));
    });
}

export const TIME_LABELS = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2).toString().padStart(2, '0');
    const m = i % 2 === 0 ? '00' : '30';
    return `${h}:${m}`;
});

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const CHART_DATA: Record<string, Record<string, { all: number[]; bull: number[]; bear: number[] }>> = {
    EURUSD: {
        Monday: { all: generateBarData(1), bull: generateBarData(1, 0.1), bear: generateBarData(1, -0.1) },
        Tuesday: { all: generateBarData(2), bull: generateBarData(2, 0.1), bear: generateBarData(2, -0.1) },
        Wednesday: { all: generateBarData(3), bull: generateBarData(3, 0.1), bear: generateBarData(3, -0.1) },
        Thursday: { all: generateBarData(4), bull: generateBarData(4, 0.1), bear: generateBarData(4, -0.1) },
        Friday: { all: generateBarData(5), bull: generateBarData(5, 0.1), bear: generateBarData(5, -0.1) },
    },
};

// ─── Probability Hub Cards ────────────────────────────────────────────────
export const PROBABILITY_CARDS = [
    { label: 'Current Day', value: 'Monday', sub: 'Trading Session' },
    { label: 'High Probability', value: '73%', sub: 'Bullish Days — High forms AM' },
    { label: 'Low Probability', value: '68%', sub: 'Bearish Days — Low forms AM' },
    { label: 'Avg. Move', value: '0.48%', sub: 'Historical avg. Mon range move' },
];

// ─── Tutorials ────────────────────────────────────────────────────────────
export const TUTORIALS = [
    { id: 1, title: 'Introduction to Market Structure', duration: '18:42', progress: 100, thumbnail: 'https://placehold.co/400x225/1B3A6B/white?text=Lesson+1' },
    { id: 2, title: 'Reading 30-Minute Statistical Windows', duration: '24:15', progress: 65, thumbnail: 'https://placehold.co/400x225/135bec/white?text=Lesson+2' },
    { id: 3, title: 'Bullish vs. Bearish Day Identification', duration: '31:08', progress: 30, thumbnail: 'https://placehold.co/400x225/0D1526/white?text=Lesson+3' },
    { id: 4, title: 'High/Low Probability Strategy', duration: '22:50', progress: 0, thumbnail: 'https://placehold.co/400x225/1B3A6B/white?text=Lesson+4' },
    { id: 5, title: 'Weekly & Monthly Data Integration', duration: '19:33', progress: 0, thumbnail: 'https://placehold.co/400x225/135bec/white?text=Lesson+5' },
    { id: 6, title: 'Risk Management with Statistical Edge', duration: '27:44', progress: 0, thumbnail: 'https://placehold.co/400x225/0D1526/white?text=Lesson+6' },
    { id: 7, title: 'Building a Trading Plan', duration: '15:20', progress: 0, thumbnail: 'https://placehold.co/400x225/1B3A6B/white?text=Lesson+7' },
    { id: 8, title: 'Advanced Confluence Techniques', duration: '38:10', progress: 0, thumbnail: 'https://placehold.co/400x225/135bec/white?text=Lesson+8' },
];

// ─── Invoices ─────────────────────────────────────────────────────────────
export const INVOICES = [
    { id: 'INV-0042', date: '2026-01-01', amount: '€149.00', plan: '6 Month Access', status: 'PAID' },
    { id: 'INV-0035', date: '2025-07-01', amount: '€149.00', plan: '6 Month Access', status: 'PAID' },
    { id: 'INV-0028', date: '2025-01-01', amount: '€89.00', plan: '3 Month Access', status: 'PAID' },
];

// ─── Referrals ────────────────────────────────────────────────────────────
export const MOCK_REFERRALS = [
    { email: 'j.smith@email.com', date: '2026-02-10', status: 'Credited', credit: '€29.80' },
    { email: 'm.jones@email.com', date: '2026-01-28', status: 'Active', credit: '€29.80' },
    { email: 'k.lee@email.com', date: '2026-01-15', status: 'Pending', credit: '€0.00' },
];

// ─── Pricing Plans ────────────────────────────────────────────────────────
export const PRICING_PLANS = [
    {
        id: '3month',
        name: '3 Month',
        tag: null,
        price: '€89',
        period: '/ 3 months',
        monthly: '≈ €29.67/mo',
        features: ['Access to 3 symbols', 'Daily & Weekly data', 'Email support', '30-min analytics charts'],
        cta: 'Get Started',
        highlight: false,
        color: 'default',
    },
    {
        id: '6month',
        name: '6 Month',
        tag: 'Best Value',
        price: '€149',
        period: '/ 6 months',
        monthly: '≈ €24.83/mo',
        features: ['Access to 10 symbols', 'Daily, Weekly & Monthly', 'Priority support', '30-min analytics charts', 'Bonus program access'],
        cta: 'Get Best Value',
        highlight: true,
        color: 'blue',
    },
    {
        id: '12month',
        name: '12 Month',
        tag: 'Longterm Option',
        price: '€249',
        period: '/ 12 months',
        monthly: '≈ €20.75/mo',
        features: ['Full access all symbols', 'All timeframes', 'Priority support', '30-min analytics charts', 'Bonus program access', 'Early feature access'],
        cta: 'Go Longterm',
        highlight: false,
        color: 'silver',
    },
];

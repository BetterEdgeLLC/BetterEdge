/**
 * useSymbolStats.ts
 * Fetches 30-min frequency statistics for a given symbol from Supabase.
 *
 * Returns data shaped as:
 *   { weekday: { direction: number[48] } }
 * where each number[48] maps to ALL_SLOTS (00:00, 00:30 … 23:30) pct_high or pct_low.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// 48-slot labels (00:00–23:30 in 30-min steps)
export const ALL_SLOTS = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2).toString().padStart(2, '0');
    const m = i % 2 === 0 ? '00' : '30';
    return `${h}:${m}`;
});

export type Direction = 'all' | 'bull' | 'bear';
export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface DayStats {
    /** pct_high indexed by slot position 0–47 */
    high: number[];
    /** pct_low indexed by slot position 0–47 */
    low: number[];
}

export type SymbolStatsMap = Record<Weekday, Record<Direction, DayStats>>;

interface SupabaseRow {
    weekday: string;
    direction: string;
    time_slot: string;
    pct_high: number;
    pct_low: number;
}

const WEEKDAYS: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DIRECTIONS: Direction[] = ['all', 'bull', 'bear'];

function buildEmpty(): SymbolStatsMap {
    const result = {} as SymbolStatsMap;
    for (const wd of WEEKDAYS) {
        result[wd] = {} as Record<Direction, DayStats>;
        for (const dir of DIRECTIONS) {
            result[wd][dir] = {
                high: new Array(48).fill(0),
                low: new Array(48).fill(0),
            };
        }
    }
    return result;
}

function rowsToMap(rows: SupabaseRow[]): SymbolStatsMap {
    const map = buildEmpty();
    const slotIndex: Record<string, number> = {};
    ALL_SLOTS.forEach((s, i) => { slotIndex[s] = i; });

    for (const row of rows) {
        const wd = row.weekday as Weekday;
        const dir = row.direction as Direction;
        const idx = slotIndex[row.time_slot];

        if (idx === undefined) continue;
        if (!WEEKDAYS.includes(wd)) continue;
        if (!DIRECTIONS.includes(dir)) continue;

        map[wd][dir].high[idx] = row.pct_high ?? 0;
        map[wd][dir].low[idx] = row.pct_low ?? 0;
    }
    return map;
}

export function useSymbolStats(symbol: string) {
    const [data, setData] = useState<SymbolStatsMap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!symbol) return;

        let cancelled = false;
        setLoading(true);
        setError(null);
        setData(null);

        (async () => {
            try {
                const { data: rows, error: err } = await supabase
                    .from('symbol_stats')
                    .select('weekday, direction, time_slot, pct_high, pct_low')
                    .eq('symbol', symbol);

                if (err) throw new Error(err.message);
                if (cancelled) return;

                if (!rows || rows.length === 0) {
                    // No data available yet for this symbol
                    setData(null);
                } else {
                    setData(rowsToMap(rows as SupabaseRow[]));
                }
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : String(e));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [symbol]);

    return { data, loading, error };
}

/**
 * useWeeklyStats.ts
 * Fetches weekday frequency statistics for a given symbol from Supabase.
 * Table: symbol_stats_weekly
 *
 * Returns data shaped as:
 *   { direction: Record<Weekday, { count_high, pct_high, count_low, pct_low }> }
 */

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export type Direction = 'all' | 'bull' | 'bear';
export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface WeekdayStats {
    count_high: number;
    pct_high: number;
    count_low: number;
    pct_low: number;
}

export type WeeklyStatsMap = Record<Direction, Record<Weekday, WeekdayStats>>;

interface SupabaseRow {
    direction: string;
    weekday: string;
    count_high: number;
    pct_high: number;
    count_low: number;
    pct_low: number;
}

const WEEKDAYS: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DIRECTIONS: Direction[] = ['all', 'bull', 'bear'];

function buildEmpty(): WeeklyStatsMap {
    const result = {} as WeeklyStatsMap;
    for (const dir of DIRECTIONS) {
        result[dir] = {} as Record<Weekday, WeekdayStats>;
        for (const wd of WEEKDAYS) {
            result[dir][wd] = { count_high: 0, pct_high: 0, count_low: 0, pct_low: 0 };
        }
    }
    return result;
}

function rowsToMap(rows: SupabaseRow[]): WeeklyStatsMap {
    const map = buildEmpty();
    for (const row of rows) {
        const dir = row.direction as Direction;
        const wd = row.weekday as Weekday;
        if (!DIRECTIONS.includes(dir)) continue;
        if (!WEEKDAYS.includes(wd)) continue;
        map[dir][wd] = {
            count_high: row.count_high ?? 0,
            pct_high: row.pct_high ?? 0,
            count_low: row.count_low ?? 0,
            pct_low: row.pct_low ?? 0,
        };
    }
    return map;
}

export function useWeeklyStats(symbol: string) {
    const [data, setData] = useState<WeeklyStatsMap | null>(null);
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
                    .from('symbol_stats_weekly')
                    .select('direction, weekday, count_high, pct_high, count_low, pct_low')
                    .eq('symbol', symbol);

                if (err) throw new Error(err.message);
                if (cancelled) return;

                if (!rows || rows.length === 0) {
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

export { WEEKDAYS };

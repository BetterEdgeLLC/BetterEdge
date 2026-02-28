import { useState, useEffect, createContext, useContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    institutional_status: string;
    referral_code: string;
}

interface Subscription {
    subscription_tier: 'free' | 'basic' | 'premium';
    subscribed_symbols: string[];
    subscription_expires: string | null;
    plan_name: string | null;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    subscription: Subscription | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        const { data: subData } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (profileData) setProfile(profileData);
        if (subData) setSubscription(subData);
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) fetchProfile(session.user.id);
            setLoading(false);
        });

        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) fetchProfile(session.user.id);
            else { setProfile(null); setSubscription(null); }
        });

        return () => authSub.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
        });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const refreshProfile = async () => {
        if (user) await fetchProfile(user.id);
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, subscription, loading, signIn, signUp, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}

import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowser, createServerSupabaseClient } from './supabaseClient';

export async function getProfileForUser(userId: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function upsertProfile(profile: { id: string; full_name?: string; email?: string; role?: string }) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('profiles').upsert(profile).single();
  if (error) throw error;
  return data;
}

export function clientSignInWithEmail(email: string) {
  const supabaseBrowser = getSupabaseBrowser();
  return supabaseBrowser.auth.signInWithOtp({ email });
}

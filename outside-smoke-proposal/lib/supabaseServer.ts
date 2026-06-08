import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const serverCookieMethods = {
  getAll: async () => {
    const requestCookies = await cookies();
    return requestCookies.getAll().map((cookie) => ({ name: cookie.name, value: cookie.value }));
  }
};

/**
 * Server-side Supabase client that uses request cookies for auth in Server Components.
 * Use this to obtain the current user session on server pages.
 */
export async function getServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY for server Supabase client');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: serverCookieMethods
  });
}

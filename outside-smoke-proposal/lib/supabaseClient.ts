import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseBrowserInstance: SupabaseClient | null = null;

// Lazily initialize browser client only when accessed and in browser context
export function getSupabaseBrowser(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('supabaseBrowser should only be used in the browser');
  }
  if (!supabaseBrowserInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    supabaseBrowserInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseBrowserInstance;
}

/**
 * Create a server-side Supabase client using the service role key.
 * Use server-only (API routes, server components). Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
 */
export function createServerSupabaseClient(): SupabaseClient {
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRole) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL on server');
  }
  return createClient(supabaseUrl, serviceRole, {
    // Use service role on server with elevated privileges
  });
}

// Default export - lazy for build compatibility
export default (() => {
  if (typeof window !== 'undefined') {
    return getSupabaseBrowser();
  }
  return null;
})() as unknown as SupabaseClient;


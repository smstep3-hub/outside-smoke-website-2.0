import { createServerSupabaseClient } from './supabaseClient';

/**
 * Server-side helper to check admin status.
 * Use this in server components or API routes to restrict access to admin users.
 *
 * Example:
 * const isAdmin = await requireAdmin(requestUserId);
 * if (!isAdmin) throw new Error('Forbidden');
 */
export async function requireAdmin(userId?: string) {
  if (!userId) return false;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('admin_users').select('*').eq('user_id', userId).single();
  if (error) return false;
  return !!data;
}

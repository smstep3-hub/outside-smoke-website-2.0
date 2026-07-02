import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Simple placeholder admin protection using env var for now.
    // Replace this with stronger auth later (Supabase session + admin_users table).
    const adminEmail = process.env.ADMIN_EMAIL || 'scott@outsidesmoke.net';
    const authHeader = req.headers.get('x-admin-email');

    if (!authHeader || authHeader.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    }

    const { createServerSupabaseClient } = await import('../../../../lib/supabaseClient');
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('consultation_leads').select('*').order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ leads: data || [] });
  } catch (error) {
    console.error('Admin lead fetch failed:', error);
    return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
  }
}

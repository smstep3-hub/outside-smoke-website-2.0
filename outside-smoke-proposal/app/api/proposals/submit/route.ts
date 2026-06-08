import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Import Supabase inside route handler to avoid build-time initialization
  const { createServerSupabaseClient } = await import('../../../../lib/supabaseClient');
  
  const body = await req.json();
  const user_id = body.user_id ?? null;

  const supabase = createServerSupabaseClient();

  try {
    const payload = {
      id: body.id, // optional
      user_id,
      program_name: body.answers?.program_name ?? null,
      contact_name: body.answers?.contact_name ?? null,
      contact_email: body.answers?.contact_email ?? null,
      status: 'submitted',
      current_section: null,
      answers: body.answers ?? {},
      submitted_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('questionnaire_responses').upsert(payload).select().single();
    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'unknown' }, { status: 500 });
  }
}

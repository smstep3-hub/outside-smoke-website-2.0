import { NextRequest, NextResponse } from 'next/server';

function formatEmailBody(formData: Record<string, unknown>) {
  const sections: Array<[string, string[]]> = [
    ['Contact Information', ['primary_contact_name', 'role_title', 'email_address', 'phone_number', 'preferred_contact_method', 'best_time_to_contact']],
    ['Program Information', ['program_name', 'website', 'social_media_links', 'team_type', 'primary_facility', 'secondary_facility', 'current_athlete_count', 'number_of_coaches', 'number_of_board_members', 'approximate_annual_budget']],
    ['Goals', ['main_goal_next_12_months', 'top_priorities', 'success_one_year_from_now', 'what_makes_program_unique']],
    ['Challenges', ['biggest_current_challenge', 'non_coaching_headaches', 'tasks_take_most_time', 'delayed_projects', 'one_problem_in_30_days']],
    ['Sponsorships', ['currently_have_sponsors', 'number_of_active_sponsors', 'annual_sponsorship_revenue', 'current_sponsorship_materials', 'sponsorship_efforts_that_worked', 'sponsorship_efforts_not_worked', 'ideal_local_businesses', 'meaningful_sponsorship_goal']],
    ['Fundraising', ['currently_run_fundraisers', 'fundraisers_per_year', 'most_successful_fundraisers', 'least_successful_fundraisers', 'estimated_annual_fundraising_revenue', 'fundraising_targets', 'fundraising_goal_next_year']],
    ['Social Media', ['platforms_used', 'social_media_manager', 'post_frequency', 'content_calendar', 'branded_templates', 'best_performing_content', 'missing_from_social_media', 'branding_assets']],
    ['Streaming & Digital Media', ['livestream_meets', 'streaming_platform', 'current_streaming_tools', 'improving_livestream_quality', 'digital_advertising_opportunities', 'scoreboard_livestream_assets']],
    ['Operations', ['team_management_platform', 'family_communication_methods', 'biggest_communication_challenge', 'operational_systems_need_improvement', 'parent_volunteer_involvement']],
    ['Growth & Retention', ['current_athlete_count_growth', 'desired_athlete_count_3_years', 'athlete_growth_trend', 'biggest_growth_obstacle', 'biggest_retention_obstacle', 'actively_recruit_new_athletes', 'track_retention_metrics']],
    ['Budget & Decision Making', ['worked_with_outside_consultants_before', 'who_approves_investments', 'budget_allocated_for_growth', 'preferred_support_type', 'decision_timeline']],
    ['Final Details', ['service_interest', 'why_reach_out', 'anything_else', 'file_upload_placeholder']],
  ];

  return sections
    .map(([title, fields]) => {
      const lines = fields.map((field: string) => {
        const value = formData[field];
        const printable = Array.isArray(value) ? value.join(', ') : value ?? '';
        return `- ${field.replace(/_/g, ' ')}: ${printable || '(blank)'}`;
      });
      return `\n${title}\n${lines.join('\n')}`;
    })
    .join('\n');
}

function summarizeServiceInterest(formData: Record<string, unknown>) {
  const value = formData.service_interest;
  if (Array.isArray(value)) return value.join(', ');
  return String(value || 'Not specified');
}

async function sendEmail(formData: Record<string, unknown>) {
  const apiKey = process.env.EMAIL_API_KEY;
  const toEmail = process.env.TO_EMAIL || 'scott@outsidesmoke.net';
  const fromEmail = process.env.FROM_EMAIL || 'questionnaire@outsidesmoke.net';

  if (!apiKey) {
    throw new Error('EMAIL_API_KEY is not configured');
  }

  // Email provider setup goes here. This route uses Resend-style API.
  // Replace the fetch call with your preferred provider (Resend, SendGrid, Nodemailer, etc.).
  const subject = `New Program Questionnaire Submission - ${String(formData.program_name || 'Untitled Program')}`;
  const html = `<h2>New Program Consultation Questionnaire</h2><pre style="font-family:Arial, sans-serif; white-space:pre-wrap;">${formatEmailBody(formData)}\n</pre>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      text: formatEmailBody(formData),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email provider error: ${error}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    await sendEmail(formData);

    // Store only minimal lead metadata. Do not store full questionnaire answers.
    const { createServerSupabaseClient } = await import('../../../lib/supabaseClient');
    const supabase = createServerSupabaseClient();

    const payload = {
      program_name: String(formData.program_name || ''),
      contact_name: String(formData.primary_contact_name || ''),
      contact_email: String(formData.email_address || ''),
      contact_phone: String(formData.phone_number || ''),
      service_interest_summary: summarizeServiceInterest(formData),
      email_received_at: new Date().toISOString(),
      status: 'New Submission',
      followed_up: false,
      consultation_scheduled: false,
      proposal_needed: false,
      proposal_sent: false,
      agreement_sent: false,
      agreement_signed: false,
      client_won: false,
      client_lost: false,
      admin_notes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('consultation_leads').insert(payload);
    if (error) {
      console.error('Lead metadata insert failed:', error);
      return NextResponse.json({ error: 'Unable to save follow-up metadata.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('Questionnaire submission failed:', error);
    return NextResponse.json({ error: 'Something went wrong while submitting your questionnaire. Please try again or email scott@outsidesmoke.net directly.' }, { status: 500 });
  }
}

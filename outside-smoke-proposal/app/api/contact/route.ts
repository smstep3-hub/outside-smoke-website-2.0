import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || process.env.TO_EMAIL || 'scott@outsidesmoke.net';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || process.env.FROM_EMAIL || 'contact@outsidesmoke.net';

// Safe diagnostics: only report whether each env var exists (no secret values)
console.log('RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
console.log('CONTACT_TO_EMAIL loaded:', !!process.env.CONTACT_TO_EMAIL);
console.log('CONTACT_FROM_EMAIL loaded:', !!process.env.CONTACT_FROM_EMAIL);
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmailHtml(formData: Record<string, string>) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
    <p><strong>Swim Team Name:</strong> ${escapeHtml(formData.swimTeamName)}</p>
    <p><strong>State:</strong> ${escapeHtml(formData.state)}</p>
    <p><strong>Time Zone:</strong> ${escapeHtml(formData.timeZone)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(formData.message)}</p>
  `;
}

function buildEmailText(formData: Record<string, string>) {
  return [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Swim Team Name: ${formData.swimTeamName}`,
    `State: ${formData.state}`,
    `Time Zone: ${formData.timeZone}`,
    'Message:',
    formData.message,
  ].join('\n\n');
}

async function sendEmail(formData: Record<string, string>) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    subject: `Contact form submission from ${formData.name}`,
    replyTo: formData.email,
    html: buildEmailHtml(formData),
    text: buildEmailText(formData),
  });

  // Log presence of data/error (safe) and log full error object if one exists
  console.log('Resend returned data:', !!data, 'error:', !!error);
  if (error) {
    console.error('Resend error object:', error);
    return { success: false, error } as const;
  }

  return { success: true, data } as const;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const formData = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      message: String(body.message || '').trim(),
      swimTeamName: String(body.swimTeamName || '').trim(),
      state: String(body.state || '').trim(),
      timeZone: String(body.timeZone || '').trim(),
    };

    const requiredFields = ['name', 'email', 'message', 'swimTeamName', 'state', 'timeZone'] as const;
    const missing = requiredFields.filter((field) => !formData[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Please complete every required field before submitting.' },
        { status: 400 },
      );
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server email configuration is missing.' },
        { status: 500 },
      );
    }

    const result = await sendEmail(formData);

    if (!result || (result as any).success === false) {
      const err = (result as any)?.error;
      console.error('Contact API - resend failed:', err);
      // Return the resend error message if available, but avoid leaking secrets
      const clientMessage = err?.message || (typeof err === 'string' ? err : 'Unable to send your message right now. Please try again.');
      return NextResponse.json({ error: clientMessage }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again later.' },
      { status: 500 },
    );
  }
}


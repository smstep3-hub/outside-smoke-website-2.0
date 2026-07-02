import { NextRequest, NextResponse } from 'next/server';

const TO_EMAIL = process.env.TO_EMAIL || 'scott@outsidesmoke.net';
const FROM_EMAIL = process.env.FROM_EMAIL || 'consultation@outsidesmoke.net';

function buildEmailHtml(formData: Record<string, string>) {
  return `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Swim Team Name:</strong> ${formData.swimTeamName}</p>
    <p><strong>State:</strong> ${formData.state}</p>
    <p><strong>Time Zone:</strong> ${formData.timeZone}</p>
    <p><strong>How can we help your program?</strong></p>
    <p>${formData.helpText.replace(/\n/g, '<br />')}</p>
  `;
}

async function sendEmail(formData: Record<string, string>) {
  const apiKey = process.env.EMAIL_API_KEY;

  if (!apiKey) {
    console.info('[consultation-request] EMAIL_API_KEY not configured. Request logged locally.', {
      to: TO_EMAIL,
      formData,
    });
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Consultation Request from ${formData.name}`,
      html: buildEmailHtml(formData),
      text: [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Swim Team Name: ${formData.swimTeamName}`,
        `State: ${formData.state}`,
        `Time Zone: ${formData.timeZone}`,
        'How can we help your program?',
        formData.helpText,
      ].join('\n\n'),
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
    const requiredFields = ['name', 'email', 'swimTeamName', 'state', 'timeZone', 'helpText'];
    const missing = requiredFields.filter((field) => !String(formData[field] || '').trim());

    if (missing.length > 0) {
      return NextResponse.json({ error: 'Please complete every required field.' }, { status: 400 });
    }

    await sendEmail(formData);

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('Consultation request failed:', error);
    return NextResponse.json({ error: 'Something went wrong while sending your consultation request.' }, { status: 500 });
  }
}

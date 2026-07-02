-- Minimal lead tracking only; do not store full questionnaire answers.
create table if not exists consultation_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  program_name text,
  contact_name text,
  contact_email text,
  contact_phone text,
  service_interest_summary text,
  email_received_at timestamptz,
  status text default 'New Submission',
  followed_up boolean default false,
  follow_up_date date,
  consultation_scheduled boolean default false,
  consultation_date date,
  proposal_needed boolean default false,
  proposal_sent boolean default false,
  proposal_sent_date date,
  agreement_sent boolean default false,
  agreement_signed boolean default false,
  client_won boolean default false,
  client_lost boolean default false,
  admin_notes text,
  updated_at timestamptz default now()
);

create index if not exists idx_consultation_leads_status on consultation_leads(status);
create index if not exists idx_consultation_leads_email on consultation_leads(contact_email);

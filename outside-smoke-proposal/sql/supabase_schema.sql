-- Supabase schema for Proposal Questionnaire
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Profiles table linked to auth.users
create table if not exists profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  email text,
  role text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- Admin users table (list of admin emails or user_ids)
create table if not exists admin_users (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  email text,
  created_at timestamptz default now()
);

-- Questionnaire responses
create table if not exists questionnaire_responses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  program_name text,
  contact_name text,
  contact_email text,
  status text default 'draft', -- draft / submitted / reviewed
  current_section text,
  answers jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  submitted_at timestamptz
);

-- Index to speed lookups
create index if not exists idx_questionnaire_user on questionnaire_responses (user_id);
create index if not exists idx_questionnaire_status on questionnaire_responses (status);

-- Row level security policies
-- Allow users to insert profiles for themselves
alter table profiles enable row level security;
create policy "profiles_insert_own" on profiles for insert using (auth.role() = 'authenticated' and auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_select_own" on profiles for select using (auth.role() = 'authenticated' and auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.role() = 'authenticated' and auth.uid() = id) with check (auth.uid() = id);

-- Admin users: only server/service role should be able to insert. We'll rely on service role for managing admin_users.
alter table admin_users enable row level security;
create policy "admin_users_select" on admin_users for select using (exists (select 1 from admin_users au where (auth.uid() = au.user_id) ));

-- Questionnaire responses RLS
alter table questionnaire_responses enable row level security;

-- Allow authenticated users to insert their own responses
create policy "q_insert_own" on questionnaire_responses for insert using (auth.role() = 'authenticated') with check (auth.uid() = user_id);

-- Allow users to select/update their own draft or submitted records
create policy "q_select_own" on questionnaire_responses for select using (auth.role() = 'authenticated' and (user_id = auth.uid()));
create policy "q_update_own" on questionnaire_responses for update using (auth.role() = 'authenticated' and (user_id = auth.uid())) with check (user_id = auth.uid());

-- Admins can select all; rely on admin_users table via view in functions or service role for admin operations
-- It's common to bypass RLS for admin queries using the service role key on server side.

-- Trigger to keep updated_at in sync
create or replace function trigger_set_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_timestamp
before update on questionnaire_responses
for each row execute function trigger_set_timestamp();

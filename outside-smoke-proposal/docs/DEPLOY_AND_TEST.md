Deployment and Testing — Outside Smoke Proposal Questionnaire

Environment setup (local)

- Copy `.env.example` to `.env.local` and fill values:
  - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
  - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role (server only)
  - `NEXT_PUBLIC_APP_NAME` — optional app display name
  - `ADMIN_EMAILS` — optional comma-separated admin emails for initial setup

- Create the database objects in Supabase:
  1. Open the Supabase dashboard → SQL editor.
  2. Run the SQL in `sql/supabase_schema.sql`.
  3. (Optional) Run `scripts/seed_admin.sql` with the service role key to seed an admin user email.

Running locally

```bash
# install deps (if not already)
npm install

# run dev server
npm run dev
```

Open: `http://localhost:3000/proposal-questionnaire`

Auth notes

- The app uses Supabase email OTP (magic link). Configure your Supabase project's SMTP settings if you want real emails.
- For server-side operations (saving drafts, admin reads) the app uses `SUPABASE_SERVICE_ROLE_KEY`. Keep it server-only.

Vercel deployment

1. Push your repository to Git (GitHub/GitLab/Bitbucket).
2. Create a project on Vercel and link the repo.
3. Add the environment variables in the Vercel project settings (Production and Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (mark as secret)
   - Optional: `NEXT_PUBLIC_APP_NAME`, `ADMIN_EMAILS`
4. Deploy — Vercel will build and publish the app.

Security checklist before production

- Verify RLS policies in Supabase for `profiles` and `questionnaire_responses`.
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is NOT present on the client or in repo files.
- Confirm `admin_users` is populated with trusted admin user IDs or manage via Supabase dashboard.
- Test with a non-admin authenticated user to verify they cannot access `/admin` pages.

Minimal manual test plan

1. Dev sanity
   - Start dev server and open the landing page.
2. Sign-in flow
   - Click `Start Questionnaire` → enter an email → receive sign-in link (configure SMTP) → sign in.
3. Save draft
   - Fill Program Info → click `Save Draft` → verify success message.
   - Reload, sign back in, verify draft answers re-populate (server loads answers by `user_id`).
4. Submit
   - Complete form → `Submit` → confirm redirect to confirmation page and record status becomes `submitted` in database.
5. Admin review
   - Sign in as an admin user (seeded or added in Supabase) → visit `/admin/proposals` → filter by status → open a submission detail.

Quick troubleshooting

- No sign-in email: check Supabase Auth SMTP configuration or check the Supabase Auth logs.
- API 500 on save/submit: confirm `SUPABASE_SERVICE_ROLE_KEY` is set in server env and SQL schema was applied.
- RLS denies access: test with service role to confirm data exists; then verify policies allow auth.uid() for the user's id.

Files of interest

- `sql/supabase_schema.sql` — DB schema and RLS policies
- `scripts/seed_admin.sql` — seed admin helper
- `lib/supabaseClient.ts` and `lib/supabaseServer.ts` — client/server supabase helpers
- `app/api/proposals/*` — draft and submit API routes

If you want, I can:

- Add a simple CI step for running TypeScript type checks and linting on push.
- Create a GitHub Actions workflow to run tests and typechecks before deployment.

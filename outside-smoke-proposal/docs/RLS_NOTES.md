Row Level Security (RLS) notes for Outside Smoke Proposal

- `profiles` and `questionnaire_responses` have RLS enabled in `sql/supabase_schema.sql`.
- Policies allow authenticated users to insert/select/update their own records using `auth.uid()` checks.
- Admin users are tracked in `admin_users` and should be managed via the Supabase dashboard or the `scripts/seed_admin.sql` script.

Server-side operations

- The app uses the `SUPABASE_SERVICE_ROLE_KEY` for server-side upserts and admin reads. This key bypasses RLS — store it only in server environment variables.
- When performing actions on behalf of a user, prefer to use Supabase session cookies and server-side `auth` helpers to determine `user_id`, not client-supplied values.

Recommendations

- Add middleware to protect `/admin` routes that verifies the current user is in `admin_users`.
- Audit RLS policies in Supabase and test with a non-admin, authenticated user to ensure they cannot access others' drafts/submissions.
- For ease of development, you may allow service-role writes locally, but disable service role access in client builds.

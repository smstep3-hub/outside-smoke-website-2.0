# Outside Smoke — Proposal Questionnaire

This project implements a multi-page proposal questionnaire for Outside Smoke Consulting.

Quick setup

1. Copy `.env.example` to `.env.local` and fill in Supabase credentials.
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Important env vars

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role (server only)

Additional recommended env vars

- `NEXT_PUBLIC_APP_NAME` — App display name
- `ADMIN_EMAILS` — Comma-separated list of admin emails (optional; for initial admin checks)

Running the Supabase schema

1. Open your Supabase project dashboard.
2. Go to SQL editor and run the SQL in `sql/supabase_schema.sql` to create tables and policies.
3. If you need to seed an admin user, run `scripts/seed_admin.sql` using the SQL editor with the service role key.

Row Level Security (RLS) notes

- This project enables RLS for `profiles` and `questionnaire_responses`.
- Server-side functions and API routes use the `SUPABASE_SERVICE_ROLE_KEY` to perform upserts and admin reads. Never expose the service role key to the browser.
- For production, derive `user_id` from the authenticated session on the server instead of accepting it from the client.
- Ensure `admin_users` is populated with trusted admin user IDs or manage via Supabase dashboard.

Deployment to Vercel

1. Create a Vercel project and link your repository.
2. Add environment variables in the Vercel dashboard (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Set any optional variables like `ADMIN_EMAILS` and `NEXT_PUBLIC_APP_NAME`.
4. Deploy — Vercel will build the Next.js App Router project automatically.

Security checklist before going live

- Verify RLS policies in Supabase for `questionnaire_responses` and `profiles`.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is only present in server-side environment variables (Vercel Project > Environment Variables, set to Production only).
- Implement server-side admin checks or middleware (see `lib/admin.ts`) to restrict `/admin` pages to approved admins.
- Rotate service role keys if leaked and monitor audit logs.

Deployment

Deploy to Vercel and add the same environment variables in the Vercel dashboard.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

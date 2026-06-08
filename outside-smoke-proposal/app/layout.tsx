import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Outside Smoke — Proposal Questionnaire',
  description: 'Questionnaire to collect info for a customized proposal'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="brand-header p-4">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-4">
            <div className="text-2xl font-semibold">Outside Smoke Consulting</div>
            <nav className="ml-6 space-x-4">
              <a href="/proposal-questionnaire" className="text-white/90 hover:underline">
                Questionnaire
              </a>
              <a href="/admin/proposals" className="text-white/90 hover:underline">
                Admin
              </a>
            </nav>
            <div className="ml-auto text-sm">Proposal Questionnaire</div>
          </div>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto p-6">{children}</main>
        <footer className="border-t mt-8 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Outside Smoke Consulting
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Outside Smoke Consulting — Helping Swim Teams Grow',
  description: 'Helping swim teams grow outside the pool. Sponsorships, fundraising, social media, and growth strategies.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 w-full">{children}</main>
        <footer className="bg-navy text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold text-gold mb-4">Outside Smoke</h3>
                <p className="text-white/80 text-sm">Helping swim teams grow outside the pool.</p>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-gold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-white/80 hover:text-gold transition-colors">Home</a></li>
                  <li><a href="/services" className="text-white/80 hover:text-gold transition-colors">Services</a></li>
                  <li><a href="/about" className="text-white/80 hover:text-gold transition-colors">About</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-gold transition-colors">Contact</a></li>
                </ul>
              </div>
              {/* Contact */}
              <div>
                <h3 className="text-lg font-bold text-gold mb-4">Get In Touch</h3>
                <a href="mailto:scott@outsidesmoke.net" className="text-white/80 hover:text-gold transition-colors text-sm">scott@outsidesmoke.net</a>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
              © {new Date().getFullYear()} Outside Smoke Consulting. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

"use client";
import React, { useState } from 'react';
import { clientSignInWithEmail } from '../lib/auth';

export default function AuthForm({ onSuccessUrl = '/proposal-questionnaire/form' }: { onSuccessUrl?: string }) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await clientSignInWithEmail(email);
      setMessage('Check your email for the login link.');
    } catch (err) {
      console.error(err);
      setMessage('Unable to send sign-in email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 block w-full border rounded px-3 py-2"
        placeholder="you@swimteam.org"
      />

      <div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Sign-In Link'}
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </form>
  );
}

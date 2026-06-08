"use client";
import Link from 'next/link';
import AuthForm from '../../../components/AuthForm';

export default function StartPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#0B2545]">Sign in or create an account</h2>
      <p className="text-gray-700">Enter your email and we will send a sign-in link to continue the questionnaire.</p>

      <div className="mt-4">
        <AuthForm />
      </div>

      <div className="pt-6">
        <Link href="/proposal-questionnaire" className="text-sm text-gray-600">
          Back to overview
        </Link>
      </div>
    </div>
  );
}

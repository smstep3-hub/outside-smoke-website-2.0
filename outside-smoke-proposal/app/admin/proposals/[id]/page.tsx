'use client';

import React, { useEffect, useState } from 'react';

export default function ProposalDetail({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadProposal() {
      try {
        // In a real app, verify admin status and fetch from server
        // For now, just return empty state
        setIsAdmin(true);
        setRecord(null);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load proposal');
        setLoading(false);
      }
    }
    loadProposal();
  }, [params.id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!isAdmin) return <div className="p-6 text-red-600">Access denied. Admins only.</div>;
  if (!record) return <div className="p-6">Proposal not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">{record.program_name ?? 'Proposal'}</h1>
      <div className="bg-white rounded shadow p-6">
        <h3 className="font-semibold">Contact</h3>
        <p>{record.contact_name} — {record.contact_email}</p>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h3 className="font-semibold">Answers</h3>
        <pre className="whitespace-pre-wrap text-sm mt-2">{JSON.stringify(record.answers, null, 2)}</pre>
      </div>
    </div>
  );
}

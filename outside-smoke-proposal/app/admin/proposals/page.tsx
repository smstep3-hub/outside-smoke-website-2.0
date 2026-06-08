'use client';

import React, { useEffect, useState } from 'react';
import AdminTable from '../../../components/AdminTable';

export default function AdminProposalsPage({ searchParams }: { searchParams?: { status?: string } }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, verify admin status through a server endpoint
        // For now, fetch proposals from a public endpoint
        setIsAdmin(true);
        // TODO: Implement actual admin check with backend
        setData([]);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load proposals');
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!isAdmin) return <div className="p-6 text-red-600">Access denied. Admins only.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Proposals</h1>
        <div>
          <a href="/admin/proposals?status=draft" className="mr-2 text-sm text-gray-600">
            Draft
          </a>
          <a href="/admin/proposals?status=submitted" className="mr-2 text-sm text-gray-600">
            Submitted
          </a>
          <a href="/admin/proposals?status=reviewed" className="text-sm text-gray-600">
            Reviewed
          </a>
        </div>
      </div>

      <AdminTable data={data} />
    </div>
  );
}

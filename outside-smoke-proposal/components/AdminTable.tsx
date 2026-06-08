import React from 'react';
import Link from 'next/link';

type Proposal = {
  id: string;
  program_name?: string;
  contact_name?: string;
  contact_email?: string;
  status?: string;
  created_at?: string;
};

export default function AdminTable({ data }: { data: Proposal[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-3">Program</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.program_name}</td>
              <td className="px-4 py-2">{p.contact_name}</td>
              <td className="px-4 py-2">{p.contact_email}</td>
              <td className="px-4 py-2">{p.status}</td>
              <td className="px-4 py-2">{p.created_at ? new Date(p.created_at).toLocaleString() : ''}</td>
              <td className="px-4 py-2">
                <Link href={`/admin/proposals/${p.id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminSummaryCard from '@/components/AdminSummaryCard';
import ChecklistToggle from '@/components/ChecklistToggle';
import LeadDetailPanel from '@/components/LeadDetailPanel';
import LeadTable from '@/components/LeadTable';
import StatusBadge from '@/components/StatusBadge';

const statusOptions = ['New Submission', 'Follow-Up Needed', 'Followed Up', 'Consultation Scheduled', 'Proposal Needed', 'Proposal Sent', 'Agreement Sent', 'Agreement Signed', 'Won', 'Lost', 'On Hold'];

export default function ConsultationAdminPage() {
  const [authorized, setAuthorized] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/admin/consultations');
        if (!response.ok) {
          setAuthorized(false);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setLeads(data.leads || []);
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const summary = useMemo(() => ({
    newSubmissions: leads.filter((lead) => lead.status === 'New Submission').length,
    followUpsNeeded: leads.filter((lead) => !lead.followed_up).length,
    proposalsNeeded: leads.filter((lead) => lead.proposal_needed && !lead.proposal_sent).length,
    proposalsSent: leads.filter((lead) => lead.proposal_sent).length,
    wonClients: leads.filter((lead) => lead.client_won).length,
    lostClients: leads.filter((lead) => lead.client_lost).length,
  }), [leads]);

  if (loading) return <main className="min-h-screen bg-slate-50 p-8 text-slate-700">Loading admin dashboard…</main>;
  if (!authorized) return <main className="min-h-screen bg-slate-50 p-8 text-slate-700">Access denied.</main>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-navy text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Outside Smoke Consulting</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Consultation Admin</h1>
          <p className="mt-3 max-w-2xl text-white/90">Track questionnaire submissions and proposal follow-up without storing full questionnaire answers.</p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <AdminSummaryCard label="New Submissions" value={summary.newSubmissions} accent="gold" />
        <AdminSummaryCard label="Follow-Ups Needed" value={summary.followUpsNeeded} accent="navy" />
        <AdminSummaryCard label="Proposals Needed" value={summary.proposalsNeeded} accent="slate" />
        <AdminSummaryCard label="Proposals Sent" value={summary.proposalsSent} accent="navy" />
        <AdminSummaryCard label="Won Clients" value={summary.wonClients} accent="gold" />
        <AdminSummaryCard label="Lost Clients" value={summary.lostClients} accent="slate" />
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-navy">Lead Workflow</h2>
              <p className="text-sm text-slate-600">Minimal lead metadata only.</p>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <LeadTable leads={leads} onSelect={setSelectedLead} />
          </div>
        </article>

        <aside className="space-y-6">
          <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
          {selectedLead ? (
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy">Checklist</h3>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ['Email received', 'email_received_at'],
                  ['Followed up', 'followed_up'],
                  ['Consultation scheduled', 'consultation_scheduled'],
                  ['Proposal needed', 'proposal_needed'],
                  ['Proposal sent', 'proposal_sent'],
                  ['Agreement sent', 'agreement_sent'],
                  ['Agreement signed', 'agreement_signed'],
                  ['Client won', 'client_won'],
                  ['Client lost', 'client_lost'],
                ].map(([label, key]) => (
                  <ChecklistToggle
                    key={key}
                    label={String(label)}
                    checked={Boolean((selectedLead as any)[key])}
                    onToggle={() => {
                      const nextValue = !Boolean((selectedLead as any)[key]);
                      setSelectedLead((prev: any) => ({ ...prev, [key]: nextValue }));
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <label className="block text-sm text-slate-700">Status
                  <select value={selectedLead.status || 'New Submission'} onChange={(event) => setSelectedLead((prev: any) => ({ ...prev, status: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800">
                    {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label className="block text-sm text-slate-700">Admin Notes
                  <textarea value={selectedLead.admin_notes || ''} onChange={(event) => setSelectedLead((prev: any) => ({ ...prev, admin_notes: event.target.value }))} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800" />
                </label>
                <button type="button" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
              </div>
            </article>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

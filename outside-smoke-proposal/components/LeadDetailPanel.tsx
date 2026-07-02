type LeadDetailPanelProps = {
  lead: any;
  onClose: () => void;
};

export default function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  if (!lead) return null;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Lead Details</p>
          <h3 className="mt-2 text-xl font-semibold text-navy">{lead.program_name || 'Untitled Program'}</h3>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600">Close</button>
      </div>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700">
        <div><dt className="font-semibold text-slate-800">Contact Name</dt><dd>{lead.contact_name || '—'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Contact Email</dt><dd>{lead.contact_email || '—'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Contact Phone</dt><dd>{lead.contact_phone || '—'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Service Interest</dt><dd>{lead.service_interest_summary || '—'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Email Received</dt><dd>{lead.email_received_at ? new Date(lead.email_received_at).toLocaleString() : '—'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Status</dt><dd>{lead.status || 'New Submission'}</dd></div>
        <div><dt className="font-semibold text-slate-800">Admin Notes</dt><dd>{lead.admin_notes || 'No notes yet.'}</dd></div>
      </dl>
    </aside>
  );
}

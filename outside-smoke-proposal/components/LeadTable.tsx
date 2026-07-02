import StatusBadge from './StatusBadge';

type Lead = {
  id: string;
  created_at: string;
  program_name: string;
  contact_name: string;
  contact_email: string;
  service_interest_summary: string;
  status: string;
  followed_up: boolean;
  consultation_scheduled: boolean;
  proposal_needed: boolean;
  proposal_sent: boolean;
};

type LeadTableProps = {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
};

export default function LeadTable({ leads, onSelect }: LeadTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Date Received</th>
            <th className="px-4 py-3">Program</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Service Interest</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Next Action</th>
            <th className="px-4 py-3">View</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3 text-slate-600">{new Date(lead.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3 font-semibold text-slate-800">{lead.program_name || '—'}</td>
              <td className="px-4 py-3">{lead.contact_name || '—'}</td>
              <td className="px-4 py-3 text-slate-600">{lead.contact_email || '—'}</td>
              <td className="px-4 py-3 text-slate-600">{lead.service_interest_summary || '—'}</td>
              <td className="px-4 py-3"><StatusBadge status={lead.status || 'New Submission'} /></td>
              <td className="px-4 py-3 text-slate-600">{lead.followed_up ? 'Follow-up complete' : 'Send follow-up email'}</td>
              <td className="px-4 py-3"><button type="button" onClick={() => onSelect(lead)} className="rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-navy">Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

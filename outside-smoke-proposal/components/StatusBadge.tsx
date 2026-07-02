type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const tone = {
    'New Submission': 'bg-amber-100 text-amber-800',
    'Follow-Up Needed': 'bg-sky-100 text-sky-800',
    'Followed Up': 'bg-emerald-100 text-emerald-800',
    'Consultation Scheduled': 'bg-violet-100 text-violet-800',
    'Proposal Needed': 'bg-rose-100 text-rose-800',
    'Proposal Sent': 'bg-indigo-100 text-indigo-800',
    'Agreement Sent': 'bg-cyan-100 text-cyan-800',
    'Agreement Signed': 'bg-green-100 text-green-800',
    Won: 'bg-emerald-200 text-emerald-900',
    Lost: 'bg-slate-200 text-slate-700',
    'On Hold': 'bg-orange-100 text-orange-800',
  }[status] || 'bg-slate-100 text-slate-700';

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

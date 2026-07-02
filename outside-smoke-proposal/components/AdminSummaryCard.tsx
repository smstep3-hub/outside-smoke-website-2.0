type AdminSummaryCardProps = {
  label: string;
  value: string | number;
  accent?: 'navy' | 'gold' | 'slate';
};

export default function AdminSummaryCard({ label, value, accent = 'navy' }: AdminSummaryCardProps) {
  const accentClasses = {
    navy: 'border-navy/10 bg-navy text-white',
    gold: 'border-gold/20 bg-gold text-navy',
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
  };

  return (
    <article className={`rounded-3xl border p-5 shadow-sm ${accentClasses[accent]}`}>
      <p className="text-sm uppercase tracking-[0.2em] opacity-80">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </article>
  );
}

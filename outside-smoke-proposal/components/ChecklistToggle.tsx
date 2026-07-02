type ChecklistToggleProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export default function ChecklistToggle({ label, checked, onToggle }: ChecklistToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm shadow-sm ${checked ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-700'}`}
    >
      <span>{label}</span>
      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${checked ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'}`}>{checked ? 'Done' : 'Pending'}</span>
    </button>
  );
}

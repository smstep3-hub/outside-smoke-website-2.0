type ProgressBarProps = {
  value: number;
  label: string;
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <strong className="text-navy">{value}%</strong>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-gradient-to-r from-gold to-amber-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

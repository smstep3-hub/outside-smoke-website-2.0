type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}: TextAreaProps) {
  return (
    <label className="block space-y-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/25"
      />
    </label>
  );
}

type TextInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: 'text' | 'email' | 'number';
  placeholder?: string;
  required?: boolean;
  helperText?: string;
};

export default function TextInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  helperText,
}: TextInputProps) {
  return (
    <label className="block space-y-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/25"
      />
      {helperText ? <span className="text-xs text-slate-500">{helperText}</span> : null}
    </label>
  );
}

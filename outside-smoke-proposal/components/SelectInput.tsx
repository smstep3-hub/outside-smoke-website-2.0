type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
};

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
}: SelectInputProps) {
  return (
    <label className="block space-y-2 text-sm text-slate-700">
      <span className="font-semibold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/25"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

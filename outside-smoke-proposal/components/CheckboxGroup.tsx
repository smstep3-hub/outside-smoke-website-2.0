type CheckboxGroupProps = {
  label: string;
  name: string;
  values: string[];
  options: string[];
  onChange: (name: string, value: string[]) => void;
  required?: boolean;
};

export default function CheckboxGroup({ label, name, values, options, onChange, required = false }: CheckboxGroupProps) {
  function toggleOption(option: string) {
    if (values.includes(option)) {
      onChange(name, values.filter((item) => item !== option));
      return;
    }

    onChange(name, [...values, option]);
  }

  return (
    <fieldset className="space-y-2 text-sm text-slate-700">
      <legend className="font-semibold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 shadow-sm">
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggleOption(option)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-gold focus:ring-gold"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

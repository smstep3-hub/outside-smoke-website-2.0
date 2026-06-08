import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  name?: string;
  register?: UseFormRegisterReturn;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox';
  options?: string[];
};

export default function QuestionField({ label, register, type = 'text', options }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'textarea' ? (
        <textarea {...(register ?? {})} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
      ) : type === 'select' ? (
        <select {...(register ?? {})} className="mt-1 block w-full border rounded px-3 py-2">
          <option value="">Select…</option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...(register ?? {})} type={type} className="mt-1 block w-full border rounded px-3 py-2" />
      )}
    </div>
  );
}

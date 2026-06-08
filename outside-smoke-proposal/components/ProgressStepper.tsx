import React from 'react';

export default function ProgressStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${i === current ? 'bg-navy text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {i + 1}
          </div>
          <div className="hidden md:block text-sm text-gray-700">{s}</div>
        </div>
      ))}
    </div>
  );
}

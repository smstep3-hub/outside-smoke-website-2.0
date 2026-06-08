import React from 'react';

export default function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded shadow p-6">
      <h3 className="text-xl font-semibold text-navy mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

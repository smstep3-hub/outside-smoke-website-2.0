"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormSection from '../../../components/FormSection';
import QuestionField from '../../../components/QuestionField';
import ProgressStepper from '../../../components/ProgressStepper';
import { baseQuestionnaireSchema } from '../../../lib/validation/schemas';

const sections = [
  { key: 'program', title: 'Program Information' },
  { key: 'contact', title: 'Primary Contact' },
  { key: 'size', title: 'Team Size & Demographics' },
  { key: 'challenges', title: 'Current Challenges' }
];

export default function QuestionnaireForm() {
  const [current, setCurrent] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resolver = zodResolver(baseQuestionnaireSchema);
  const { register, handleSubmit, getValues, watch } = useForm({ resolver });

  // Autosave when values change (debounced)
  useEffect(() => {
    const subscription = watch(() => {
      // simple debounce: save after a short delay
      const timer = setTimeout(() => {
        saveDraft().catch(() => {});
      }, 1500);
      return () => clearTimeout(timer);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  function next() {
    setCurrent((c) => Math.min(c + 1, sections.length - 1));
  }
  function back() {
    setCurrent((c) => Math.max(c - 1, 0));
  }

  async function saveDraft() {
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        answers: getValues(),
        current_section: sections[current].key,
        status: 'draft'
      };
      const res = await fetch('/api/proposals/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('Draft saved');
    } catch (err) {
      console.error(err);
      setMessage('Unable to save draft');
    } finally {
      setSaving(false);
    }
  }

  async function onSubmit(values: any) {
    setSaving(true);
    try {
      const payload = { answers: values, status: 'submitted' };
      const res = await fetch('/api/proposals/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Submit failed');
      // redirect to confirmation
      window.location.href = '/proposal-questionnaire/confirmation';
    } catch (err) {
      console.error(err);
      setMessage('Unable to submit');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <ProgressStepper steps={sections.map((s) => s.title)} current={current} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {current === 0 && (
          <FormSection title="Program Information">
            <QuestionField label="Program name" register={register('program_name' as any)} />
            <QuestionField label="Program type" register={register('program_type' as any)} />
            <QuestionField label="Brief notes" type="textarea" register={register('notes' as any)} />
          </FormSection>
        )}

        {current === 1 && (
          <FormSection title="Primary Contact">
            <QuestionField label="Contact name" register={register('contact_name' as any)} />
            <QuestionField label="Contact email" register={register('contact_email' as any)} />
          </FormSection>
        )}

        {current === 2 && (
          <FormSection title="Team Size & Demographics">
            <QuestionField label="Estimated number of swimmers" type="number" register={register('team_size' as any)} />
            <QuestionField label="Age ranges / notes" type="textarea" register={register('demographics' as any)} />
          </FormSection>
        )}

        {current === 3 && (
          <FormSection title="Current Challenges">
            <QuestionField label="Describe current challenges" type="textarea" register={register('challenges' as any)} />
          </FormSection>
        )}

        <div className="flex items-center gap-3">
          <button type="button" onClick={back} className="btn btn-ghost">
            Back
          </button>
          {current < sections.length - 1 ? (
            <button type="button" onClick={next} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-gold">
              Submit
            </button>
          )}

          <button type="button" onClick={saveDraft} className="ml-auto btn btn-ghost" disabled={saving}>
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
        </div>

        {message && <div className="text-sm text-gray-700">{message}</div>}
      </form>
    </div>
  );
}

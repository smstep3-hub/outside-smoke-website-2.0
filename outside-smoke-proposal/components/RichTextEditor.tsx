"use client";
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export default function RichTextEditor({ value, onChange }: { value?: string; onChange?: (val: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Write your response...' })],
    content: value ?? '',
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    }
  });

  return <div className="prose max-w-full border p-2 rounded"><EditorContent editor={editor} /></div>;
}

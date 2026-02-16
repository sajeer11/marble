'use client';
import React, { useState, useEffect } from 'react';

interface FormField {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const ContactForm: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFields = async () => {
      try {
        const res = await fetch('/api/page-sections?page=contact');
        if (res.ok) {
          const data = await res.json();
          const formSec = data.find((s: any) => s.sectionId === 'form');
          if (formSec && formSec.settings?.fields) {
            setFields(formSec.settings.fields);
          } else {
            // Defaults if not found
            setFields([
              { label: 'Your Name', type: 'text', placeholder: 'Abc' },
              { label: 'Email Address', type: 'email', placeholder: 'Abc@def.com' },
              { label: 'Subject', type: 'text', placeholder: 'This is an optional' },
              { label: 'Message', type: 'textarea', placeholder: 'Hi! I\'d like to ask about...' }
            ]);
          }
        }
      } catch (e) {
        console.error('Error loading form fields:', e);
      } finally {
        setLoading(false);
      }
    };
    loadFields();
  }, []);

  if (loading) return <div className="text-center py-10">Loading form...</div>;

  return (
    <form className="space-y-8 bg-white dark:bg-surface-dark p-10 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.filter(f => f.type !== 'textarea').slice(0, 2).map((f, i) => (
          <InputField key={i} label={f.label} placeholder={f.placeholder} type={f.type} />
        ))}
      </div>

      {fields.filter(f => f.type !== 'textarea').slice(2).map((f, i) => (
        <InputField key={i} label={f.label} placeholder={f.placeholder} type={f.type} />
      ))}

      {fields.filter(f => f.type === 'textarea').map((f, i) => (
        <div key={i}>
          <label className="block text-sm font-semibold mb-3">{f.label}</label>
          <textarea
            rows={5}
            placeholder={f.placeholder}
            className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all resize-none"
          ></textarea>
        </div>
      ))}

      <button
        type="button"
        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-16 rounded shadow-lg transition-all transform active:scale-95 duration-200"
      >
        Submit
      </button>
    </form>
  );
};

// Reusable input field component
interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputProps> = ({ label, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm font-semibold mb-3">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all"
    />
  </div>
);

export default ContactForm;

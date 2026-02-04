import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form className="space-y-8 bg-white dark:bg-surface-dark p-10 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField label="Your Name" placeholder="Abc" />
        <InputField label="Email Address" placeholder="Abc@def.com" type="email" />
      </div>

      <InputField label="Subject" placeholder="This is an optional" />
      <div>
        <label className="block text-sm font-semibold mb-3">Message</label>
        <textarea
          rows={5}
          placeholder="Hi! I'd like to ask about..."
          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark focus:ring-primary focus:border-primary transition-all resize-none"
        ></textarea>
      </div>

      <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-16 rounded shadow-lg transition-all transform active:scale-95 duration-200">
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

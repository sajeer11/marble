import React from 'react';

const BillingDetailsForm: React.FC = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold font-display dark:text-white">Billing details</h2>
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" />
          <InputField label="Last Name" />
        </div>

        <InputField label="Company Name (Optional)" />
        <SelectField label="Country / Region" options={['Indonesia', 'United States', 'Italy', 'Brazil']} />
        <InputField label="Street address" />
        <InputField label="Town / City" />
        <SelectField label="Province" options={['Western Indonesia', 'Central Java', 'East Java']} />
        <InputField label="ZIP code" />
        <InputField label="Phone" type="tel" />
        <InputField label="Email address" type="email" />

        <div className="pt-4">
          <input
            type="text"
            placeholder="Additional information"
            className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all px-4"
          />
        </div>
      </form>
    </div>
  );
};

// Subcomponents for inputs and selects
interface FieldProps {
  label: string;
  type?: string;
}

const InputField: React.FC<FieldProps> = ({ label, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold dark:text-gray-200">{label}</label>
    <input
      type={type}
      className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all px-4"
    />
  </div>
);

interface SelectProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectProps> = ({ label, options }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold dark:text-gray-200">{label}</label>
    <select className="w-full h-14 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all px-4">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default BillingDetailsForm;

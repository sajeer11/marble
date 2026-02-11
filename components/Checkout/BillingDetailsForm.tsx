'use client';

import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  notes: string;
}

interface Errors {
  [key: string]: string;
}

const BillingDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Indonesia',
    streetAddress: '',
    city: '',
    province: 'Western Indonesia',
    zipCode: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!/^\d{5,}$/.test(formData.zipCode)) newErrors.zipCode = 'ZIP code must be at least 5 digits';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (touched.has(name) && errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => new Set([...prev, name]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      // Handle form submission here - you can save to localStorage or send to backend
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold font-display dark:text-white mb-2">Billing Details</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Please provide your billing information</p>
      </div>

      {submitted && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg">
          ✓ Billing details saved successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('firstName') ? errors.firstName : ''}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('lastName') ? errors.lastName : ''}
            required
          />
        </div>

        {/* Company (Optional) */}
        <InputField
          label="Company Name (Optional)"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your company name"
        />

        {/* Country */}
        <SelectField
          label="Country / Region"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          options={['Indonesia', 'United States', 'Italy', 'Brazil', 'United Kingdom', 'Canada', 'Australia']}
        />

        {/* Address Fields */}
        <InputField
          label="Street Address"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.has('streetAddress') ? errors.streetAddress : ''}
          placeholder="House number and street name"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Town / City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('city') ? errors.city : ''}
            required
          />
          <SelectField
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            onBlur={handleBlur}
            options={['Western Indonesia', 'Central Java', 'East Java', 'Bali', 'Sumatera', 'Kalimantan']}
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('zipCode') ? errors.zipCode : ''}
            placeholder="12345"
            required
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('phone') ? errors.phone : ''}
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.has('email') ? errors.email : ''}
          placeholder="you@example.com"
          required
        />

        {/* Additional Notes */}
        <div className="space-y-2">
          <label className="text-sm font-semibold dark:text-gray-200">Order Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Add special instructions for your order (e.g., delivery preferences, special requests)..."
            rows={4}
            className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 py-3 text-sm dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">check_circle</span>
            Save Billing Details
          </button>
        </div>
      </form>
    </div>
  );
};

// Subcomponents for inputs and selects
interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<FieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold dark:text-gray-200">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full h-12 rounded-lg border-2 transition-all px-4 dark:bg-surface-dark dark:text-white ${
        error
          ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50'
          : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent'
      }`}
    />
    {error && <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><span className="material-icons text-xs">error</span> {error}</p>}
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectField: React.FC<SelectProps> = ({ label, name, value, onChange, onBlur, options }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold dark:text-gray-200">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all px-4 dark:text-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default BillingDetailsForm;

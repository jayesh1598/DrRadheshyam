import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'number' | 'date' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string | number; label: string }>;
  maxLength?: number;
  rows?: number;
  help?: string;
}

export interface CRUDDialogProps {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  data: Record<string, any>;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  loading?: boolean;
  submitButtonLabel?: string;
}

export function CRUDDialog({
  isOpen,
  title,
  fields,
  data,
  onClose,
  onSubmit,
  loading = false,
  submitButtonLabel = 'Save',
}: CRUDDialogProps) {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];
        if (value === undefined || value === null || value === '') {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200 sticky top-0 bg-white gap-2">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex-1 truncate">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Form-level error */}
          {errors.form && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.form}
            </div>
          )}

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {fields.map((field) => {
              const value = formData[field.name] ?? '';
              const error = errors[field.name];

              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                    <textarea
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={field.rows || 4}
                      maxLength={field.maxLength}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                        error ? 'border-red-500 focus:border-red-600 focus:ring-red-200' : 'border-gray-300 focus:border-blue-600 focus:ring-blue-200'
                      }`}
                    />
                    {field.help && (
                      <p className="text-xs text-gray-500 mt-1">{field.help}</p>
                    )}
                    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                  </div>
                );
              }

              if (field.type === 'select') {
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        error ? 'border-red-500 focus:border-red-600 focus:ring-red-200' : 'border-gray-300 focus:border-blue-600 focus:ring-blue-200'
                      }`}
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-600 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type || 'text'}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {field.help && (
                    <p className="text-xs text-gray-500 mt-1">{field.help}</p>
                  )}
                  {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              variant="default"
              size="sm"
              className="flex-1 text-xs sm:text-sm"
            >
              {isSubmitting || loading ? 'Saving...' : submitButtonLabel}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || loading}
              variant="outline"
              size="sm"
              className="flex-1 text-xs sm:text-sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

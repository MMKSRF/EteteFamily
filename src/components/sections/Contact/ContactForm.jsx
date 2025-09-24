// src/components/sections/Contact/ContactForm.jsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { formConfig, formFields, validateField, validateForm } from './formConfig';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import IconButton from '../../ui/buttons/IconButton';

const ContactForm = ({ onSubmit, isLoading }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    reason: 'general',
    name: '',
    email: '',
    phone: '',
    relationship: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Form entrance animation
    gsap.fromTo(form,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Floating animation for form elements
    gsap.to('.form-element', {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1
    });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Mark field as touched
    if (!touched[field]) {
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const handleBlur = (field) => {
    if (!touched[field]) {
      setTouched(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Validate field on blur
    const fieldErrors = validateField(field, formData[field]);
    if (fieldErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors[0]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      
      // Animate error fields
      Object.keys(validation.errors).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
          gsap.to(field, {
            x: 10,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      });
      
      return;
    }

    // Submit form
    onSubmit(formData);
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name],
      onChange: (e) => handleInputChange(field.name, e.target.value),
      onBlur: () => handleBlur(field.name),
      placeholder: field.placeholder,
      className: `w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
        errors[field.name] 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
      }`,
      required: field.required
    };

    return (
      <div key={field.name} className="form-element relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="text-lg mr-2">{field.icon}</span>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === 'textarea' ? (
          <textarea {...commonProps} rows={field.rows} />
        ) : field.type === 'select' ? (
          <select {...commonProps}>
            <option value="">{field.placeholder}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input {...commonProps} type={field.type} />
        )}

        {errors[field.name] && (
          <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center space-x-1">
            <span>⚠️</span>
            <span>{errors[field.name]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden max-w-2xl mx-auto"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Connect with the Family</h2>
        <p className="opacity-90">Share your news, updates, and memories with the EteteFamily</p>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Contact Reason Selection */}
        <div className="form-element">
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <span className="text-lg mr-2">🎯</span>
            What's this about?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formConfig.contactReasons.map(reason => (
              <button
                key={reason.value}
                type="button"
                onClick={() => handleInputChange('reason', reason.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                  formData.reason === reason.value
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{reason.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{reason.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{reason.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(field => (
            <div key={field.name} className={field.name === 'message' ? 'md:col-span-2' : ''}>
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Character Counter for Message */}
        <div className="form-element flex justify-between items-center text-sm text-gray-500">
          <span>{formData.message.length} / 1000 characters</span>
          <span className={formData.message.length > 800 ? 'text-orange-500' : ''}>
            {1000 - formData.message.length} remaining
          </span>
        </div>

        {/* Submit Button */}
        <div className="form-element pt-4">
          <PrimaryButton
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            icon={isLoading ? "⏳" : "✈️"}
          >
            {isLoading ? 'Sending Message...' : 'Send Family Message'}
          </PrimaryButton>
        </div>

        {/* Privacy Notice */}
        <div className="form-element text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          <p>💖 Your message will be shared with relevant family members. We respect your privacy.</p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-xl animate-bounce">✨</div>
      </div>
    </form>
  );
};

export default ContactForm;
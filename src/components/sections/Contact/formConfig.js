// src/components/sections/Contact/formConfig.js

export const formConfig = {
  contactReasons: [
    {
      value: 'general',
      label: 'General Update',
      description: 'Share family news and updates',
      icon: '📢'
    },
    {
      value: 'celebration',
      label: 'Celebration',
      description: 'Birthdays, anniversaries, achievements',
      icon: '🎉'
    },
    {
      value: 'support',
      label: 'Support Needed',
      description: 'Help with family matters',
      icon: '🤝'
    },
    {
      value: 'memory',
      label: 'Family Memory',
      description: 'Share photos and stories',
      icon: '📸'
    }
  ],

  // Add successMessages configuration
  successMessages: {
    general: {
      title: "Message Sent!",
      message: "Thank you for sharing your update with the family! We've received your message and will connect with you soon."
    },
    celebration: {
      title: "Celebration Shared!",
      message: "Your joyful news has been shared with the family! 🎉 We're excited to celebrate with you and will be in touch soon."
    },
    support: {
      title: "Support Request Received",
      message: "We've received your request for support. The family is here for you, and we'll reach out to discuss how we can help."
    },
    memory: {
      title: "Memory Preserved!",
      message: "Thank you for sharing this precious family memory. It's been added to our family archives and will be cherished forever. 📸"
    }
  }
};


export const formFields = [
  {
    name: 'name',
    label: 'Your Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    icon: '👤',
    validation: {
      required: 'Name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' },
      maxLength: { value: 50, message: 'Name must be less than 50 characters' }
    }
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    icon: '📧',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    required: false,
    icon: '📱',
    validation: {
      pattern: {
        value: /^[+]?[\d\s\-()]+$/,
        message: 'Invalid phone number'
      }
    }
  },
  {
    name: 'relationship',
    label: 'Relationship',
    type: 'select',
    placeholder: 'Select your relationship',
    required: true,
    icon: '💝',
    options: [
      { value: '', label: 'Select relationship' },
      { value: 'immediate', label: 'Immediate Family' },
      { value: 'extended', label: 'Extended Family' },
      { value: 'close_friend', label: 'Close Family Friend' },
      { value: 'relative', label: 'Relative' },
      { value: 'other', label: 'Other' }
    ],
    validation: {
      required: 'Please select your relationship to the family'
    }
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Brief summary of your message',
    required: true,
    icon: '💬',
    validation: {
      required: 'Subject is required',
      minLength: { value: 5, message: 'Subject must be at least 5 characters' },
      maxLength: { value: 100, message: 'Subject must be less than 100 characters' }
    }
  },
  {
    name: 'message',
    label: 'Your Message',
    type: 'textarea',
    placeholder: 'Share your news, updates, memories, or anything you\'d like to tell the family...',
    required: true,
    rows: 6,
    icon: '📝',
    validation: {
      required: 'Message is required',
      minLength: { value: 10, message: 'Message must be at least 10 characters' },
      maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
    }
  }
];

// Helper function to get field configuration by name
export const getFieldConfig = (fieldName) => {
  return formFields.find(field => field.name === fieldName);
};

// Validate a single field
export const validateField = (fieldName, value) => {
  const fieldConfig = getFieldConfig(fieldName);
  const errors = [];

  if (!fieldConfig) {
    console.warn(`No configuration found for field: ${fieldName}`);
    return errors;
  }

  const { validation, required } = fieldConfig;

  // Check if field is required
  if (required && (!value || value.trim() === '')) {
    errors.push(validation?.required || 'This field is required');
    return errors; // Return early if required field is empty
  }

  // Skip further validation if field is empty and not required
  if (!value || value.trim() === '') {
    return errors;
  }

  // Validate minLength
  if (validation?.minLength && value.length < validation.minLength.value) {
    errors.push(validation.minLength.message);
  }

  // Validate maxLength
  if (validation?.maxLength && value.length > validation.maxLength.value) {
    errors.push(validation.maxLength.message);
  }

  // Validate pattern
  if (validation?.pattern && !validation.pattern.value.test(value)) {
    errors.push(validation.pattern.message);
  }

  return errors;
};

// Validate entire form
export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  formFields.forEach(field => {
    const fieldErrors = validateField(field.name, formData[field.name]);
    if (fieldErrors.length > 0) {
      errors[field.name] = fieldErrors[0];
      isValid = false;
    }
  });

  return {
    isValid,
    errors
  };
};

// Get initial form state
export const getInitialFormState = () => {
  const initialState = {};
  formFields.forEach(field => {
    initialState[field.name] = '';
  });
  initialState.reason = 'general';
  return initialState;
};

// Format form data for submission
export const formatFormData = (formData) => {
  return {
    ...formData,
    _subject: `Family Message: ${formData.reason} - ${formData.subject}`,
    _template: 'table',
    _autoresponse: `Thank you for your message, ${formData.name}! We've received your family update and will get back to you soon. 💖 - The EteteFamily`,
    _cc: 'perezendale247@gmail.com'
  };
};
// src/components/sections/Contact/formConfig.js
export const formConfig = {
  contactReasons: [
    {
      value: 'family-update',
      label: 'Family News Update',
      icon: '📢',
      description: 'Share news about births, weddings, or other family milestones'
    },
    {
      value: 'tree-correction',
      label: 'Family Tree Correction',
      icon: '🌳',
      description: 'Update information or add missing family members'
    },
    {
      value: 'memory-sharing',
      label: 'Share Memories',
      icon: '📸',
      description: 'Contribute photos, stories, or videos to our family archive'
    },
    {
      value: 'event-invitation',
      label: 'Event Invitation',
      icon: '🎉',
      description: 'Invite family to reunions, celebrations, or gatherings'
    },
    {
      value: 'support',
      label: 'Family Support',
      icon: '🤝',
      description: 'Request or offer help within the family network'
    },
    {
      value: 'general',
      label: 'General Message',
      icon: '💬',
      description: 'Any other family-related communication'
    }
  ],

  // Form validation rules
  validation: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: false,
      pattern: /^[+]?[1-9][\d]{0,15}$/,  
    //   pattern: /^[\+]?[1-9][\d]{0,15}$/
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000
    }
  },

  // Error messages
  errorMessages: {
    name: {
      required: 'Please enter your name',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be less than 50 characters',
      pattern: 'Name can only contain letters and spaces'
    },
    email: {
      required: 'Please enter your email',
      pattern: 'Please enter a valid email address'
    },
    phone: {
      pattern: 'Please enter a valid phone number'
    },
    subject: {
      required: 'Please enter a subject',
      minLength: 'Subject must be at least 5 characters',
      maxLength: 'Subject must be less than 100 characters'
    },
    message: {
      required: 'Please enter your message',
      minLength: 'Message must be at least 10 characters',
      maxLength: 'Message must be less than 1000 characters'
    }
  },

  // Success messages based on contact reason
  successMessages: {
    'family-update': {
      title: '🎉 Update Received!',
      message: 'Thank you for sharing your family news! We\'ll update our records and share the joy with the family.'
    },
    'tree-correction': {
      title: '🌳 Tree Updated!',
      message: 'Thanks for helping keep our family tree accurate! Your changes will be reviewed and applied soon.'
    },
    'memory-sharing': {
      title: '📸 Memories Added!',
      message: 'Your contribution to our family archive is precious! These memories will be cherished for generations.'
    },
    'event-invitation': {
      title: '🎉 Invitation Sent!',
      message: 'Your event invitation has been shared with the family! We look forward to celebrating together.'
    },
    'support': {
      title: '🤝 Support Activated!',
      message: 'Your message has been sent to the family network. Help and support are on the way!'
    },
    'general': {
      title: '💌 Message Sent!',
      message: 'Thank you for reaching out! We\'ll get back to you soon with a family response.'
    }
  }
};

// Form field configurations
export const formFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    icon: '👤',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'your@email.com',
    icon: '📧',
    required: true
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    icon: '📱',
    required: false
  },
  {
    name: 'relationship',
    type: 'select',
    label: 'Family Relationship',
    placeholder: 'Select your relationship',
    icon: '👨‍👩‍👧‍👦',
    options: [
      { value: 'immediate', label: 'Immediate Family' },
      { value: 'extended', label: 'Extended Family' },
      { value: 'married', label: 'Married Into Family' },
      { value: 'descendant', label: 'Family Descendant' },
      { value: 'friend', label: 'Family Friend' },
      { value: 'other', label: 'Other' }
    ],
    required: true
  },
  {
    name: 'subject',
    type: 'text',
    label: 'Subject',
    placeholder: 'Brief summary of your message',
    icon: '💭',
    required: true
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Your Message',
    placeholder: 'Share your thoughts, updates, or questions with the family...',
    icon: '✍️',
    required: true,
    rows: 6
  }
];

// Helper functions
export const validateField = (name, value, config = formConfig) => {
  const rules = config.validation[name];
  const errors = [];

  if (rules.required && (!value || value.trim() === '')) {
    errors.push(config.errorMessages[name].required);
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    errors.push(config.errorMessages[name].minLength);
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    errors.push(config.errorMessages[name].maxLength);
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    errors.push(config.errorMessages[name].pattern);
  }

  return errors;
};

export const validateForm = (formData, config = formConfig) => {
  const errors = {};
  
  Object.keys(formData).forEach(fieldName => {
    const fieldErrors = validateField(fieldName, formData[fieldName], config);
    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors[0]; // Show only first error per field
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
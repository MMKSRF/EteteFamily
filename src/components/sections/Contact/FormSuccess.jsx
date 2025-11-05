// src/components/sections/Contact/FormSuccess.jsx

import { formConfig } from './formConfig';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

const FormSuccess = ({ formData, onReset, onClose }) => {


  // Default success messages in case formConfig is incomplete
  const defaultSuccessMessages = {
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
  };

  // Safe configuration access with fallbacks
  const getSuccessConfig = () => {
    const reason = formData?.reason || 'general';
    
    // Use formConfig if available, otherwise use defaults
    const successMessages = formConfig?.successMessages || defaultSuccessMessages;
    
    // Return the specific reason config or fallback to general
    return successMessages[reason] || successMessages.general || defaultSuccessMessages.general;
  };

  const successConfig = getSuccessConfig();

  // Safe contact reason lookup
  const getContactReasonLabel = () => {
    const reason = formData?.reason || 'general';
    const contactReason = formConfig?.contactReasons?.find(r => r.value === reason);
    return contactReason?.label || 'General Update';
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 shadow-2xl border-2 border-green-200/50 max-w-2xl mx-auto">
      {/* Success Content */}
      <div className="relative z-10 text-center">
        {/* Animated Checkmark */}
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl">
              ✓
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Success Title */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
          {successConfig.title}
        </h2>

        {/* Success Message */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {successConfig.message}
        </p>

        {/* Message Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-lg mr-2">📨</span>
            Message Preview
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>From:</strong> {formData?.name || 'N/A'} ({formData?.email || 'N/A'})</p>
            <p><strong>Subject:</strong> {formData?.subject || 'N/A'}</p>
            <p><strong>Category:</strong> {getContactReasonLabel()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton
            icon="✉️"
            onClick={onReset}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Send Another Message
          </PrimaryButton>
          <PrimaryButton
            icon="🏠"
            onClick={onClose}
            variant="secondary"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            Back to Home
          </PrimaryButton>
        </div>

        {/* Family Quote */}
        <div className="mt-8 pt-6 border-t border-green-200/50">
          <blockquote className="text-gray-600 italic">
            "Family is the compass that guides us. They are the inspiration to reach great heights, 
            and our comfort when we occasionally falter."
          </blockquote>
          <cite className="text-green-600 font-semibold mt-2 block">— EteteFamily Wisdom</cite>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-2xl animate-bounce">✨</div>
      </div>
    </div>
  );
};

export default FormSuccess;
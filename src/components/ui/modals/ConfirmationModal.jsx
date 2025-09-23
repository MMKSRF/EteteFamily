// src/components/ui/modals/ConfirmationModal.jsx
import BaseModal from './BaseModal';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger, warning, success, info
  icon = "⚠️"
}) => {
  const variants = {
    danger: {
      color: 'from-red-500 to-pink-500',
      icon: '⚠️'
    },
    warning: {
      color: 'from-yellow-500 to-orange-500',
      icon: '💡'
    },
    success: {
      color: 'from-green-500 to-teal-500',
      icon: '✅'
    },
    info: {
      color: 'from-blue-500 to-cyan-500',
      icon: 'ℹ️'
    }
  };

  const currentVariant = variants[variant] || variants.danger;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-md"
    >
      <div className="p-6 text-center">
        {/* Animated Icon */}
        <div className={`text-6xl mb-4 animate-bounce`}>
          {icon || currentVariant.icon}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold bg-gradient-to-r ${currentVariant.color} bg-clip-text text-transparent mb-2`}>
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <SecondaryButton
            onClick={onClose}
            variant="default"
            className="flex-1"
          >
            {cancelText}
          </SecondaryButton>
          <PrimaryButton
            onClick={onConfirm}
            className={`flex-1 bg-gradient-to-r ${currentVariant.color}`}
          >
            {confirmText}
          </PrimaryButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;
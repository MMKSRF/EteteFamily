// src/components/sections/Gallery/LightboxModal.jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const LightboxModal = ({ 
  isOpen, 
  onClose, 
  media, 
  mediaType, 
  onNext, 
  onPrev 
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !media) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={handleOverlayClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white text-2xl p-2 hover:bg-white/20 rounded"
      >
        ✕
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 z-10 text-white text-2xl p-3 hover:bg-white/20 rounded"
      >
        ‹
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-4 z-10 text-white text-2xl p-3 hover:bg-white/20 rounded"
      >
        ›
      </button>

      {/* Media Content */}
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        {mediaType === 'photo' ? (
          <img
            src={media.image}
            alt={media.title}
            className="max-w-full max-h-full object-contain rounded"
          />
        ) : (
          <div className="w-full aspect-video">
            <iframe
              src={media.videoUrl}
              className="w-full h-full rounded"
              title={media.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </div>

      {/* Media Info */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-center">
        <h3 className="text-lg font-semibold">{media.title}</h3>
      </div>
    </div>,
    document.body
  );
};

export default LightboxModal;
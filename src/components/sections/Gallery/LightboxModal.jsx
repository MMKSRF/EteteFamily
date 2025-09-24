// src/components/sections/Gallery/LightboxModal.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { createPortal } from 'react-dom';
import IconButton from '../../ui/buttons/IconButton';

const LightboxModal = ({ 
  isOpen, 
  onClose, 
  media, 
  mediaType, 
  currentIndex, 
  onNext, 
  onPrev 
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen && media) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      
      // Entrance animation
      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' })
        .fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(contentRef.current,
          { 
            scale: 0.8, 
            opacity: 0,
            y: 50 
          },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "back.out(1.5)" 
          },
          "-=0.2"
        );

      // Load media with transition
      if (mediaType === 'photo') {
        const img = new Image();
        img.src = media.image;
        img.onload = () => {
          setIsLoading(false);
          gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
          );
        };
      }
    } else {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (modalRef.current) {
            modalRef.current.style.display = 'none';
          }
          document.body.style.overflow = 'unset';
          setIsLoading(true);
        }
      });

      tl.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power2.in"
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2");
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, media, mediaType]);

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
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !media) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 hidden items-center justify-center p-4"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <span className="font-semibold">{currentIndex + 1} / ?</span>
          </div>
          
          <div className="flex space-x-2">
            <IconButton
              icon="⬅️"
              onClick={onPrev}
              className="bg-black/50 hover:bg-black/70"
              tooltip="Previous"
            />
            <IconButton
              icon="➡️"
              onClick={onNext}
              className="bg-black/50 hover:bg-black/70"
              tooltip="Next"
            />
            <IconButton
              icon="✕"
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70"
              tooltip="Close"
            />
          </div>
        </div>

        {/* Media Content */}
        <div className="relative h-full flex items-center justify-center p-4">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}

          {mediaType === 'photo' ? (
            <img
              ref={imageRef}
              src={media.image}
              alt={media.title}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="w-full aspect-video">
              <iframe
                src={media.videoUrl}
                className="w-full h-full rounded-2xl"
                title={media.title}
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Footer Info */}
        {/* <div className='p-25 bg-black'>Hello folks </div> */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{media.title}</h3>
          <p className="text-white/90 mb-2">{media.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>📅 {new Date(media.date).toLocaleDateString()}</span>
            <span>📍 {media.location}</span>
            {media.duration && <span>⏱️ {media.duration}</span>}
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 rounded-full p-3 text-white text-xl">
            ←
          </div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 rounded-full p-3 text-white text-xl">
            →
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LightboxModal;
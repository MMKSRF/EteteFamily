// src/components/ui/modals/BaseModal.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { createPortal } from 'react-dom';
import IconButton from '../buttons/IconButton';

const BaseModal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  className = '',
  closeOnOverlay = true 
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Entrance animation
      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' })
        .fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        )
        .fromTo(contentRef.current,
          { 
            scale: 0.5, 
            rotation: 15, 
            opacity: 0,
            y: 100 
          },
          { 
            scale: 1, 
            rotation: 0, 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "back.out(1.5)" 
          },
          "-=0.2"
        );
    } else {
      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          if (modalRef.current) {
            modalRef.current.style.display = 'none';
          }
          document.body.style.overflow = 'unset';
        }
      });

      tl.to(contentRef.current, {
        scale: 0.5,
        rotation: -15,
        opacity: 0,
        y: 100,
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
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current && closeOnOverlay) {
      onClose();
    }
  };

  if (!isOpen && !modalRef.current) return null;

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`
          relative bg-gradient-to-br from-white to-gray-50 
          rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden
          border-2 border-white/20
          ${className}
        `}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-yellow-400/10"></div>
        
        {/* Header */}
        {title && (
          <div className="relative z-10 flex items-center justify-between p-6 border-b border-gray-200/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h2>
            <IconButton
              icon="✕"
              onClick={onClose}
              className="hover:scale-110 transition-transform"
              tooltip="Close"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 overflow-y-auto max-h-[calc(90vh-100px)]">
          {children}
        </div>

        {/* Floating particles in background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float 6s ease-in-out ${i * 0.8}s infinite`
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BaseModal;
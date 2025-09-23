// src/components/sections/FamilyTree/TreeModal.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { createPortal } from 'react-dom';
import FamilyMemberCard from './FamilyMemberCard';
import IconButton from '../../ui/buttons/IconButton';

const TreeModal = ({ isOpen, onClose, member, onMemberSelect }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen && member) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
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
            rotation: 5, 
            opacity: 0,
            y: 50 
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

      // Background particles
      createFloatingParticles();
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
        scale: 0.8,
        rotation: -5,
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
  }, [isOpen, member]);

  const createFloatingParticles = () => {
    const particles = ['❤️', '✨', '🌟', '💫', '👨‍👩‍👧‍👦', '🏠'];
    particles.forEach((particle, i) => {
      const element = document.createElement('div');
      element.className = 'absolute text-2xl opacity-20 pointer-events-none';
      element.innerHTML = particle;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      overlayRef.current?.appendChild(element);

      gsap.to(element, {
        y: -30,
        x: Math.random() * 40 - 20,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !member) return null;

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
        className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <FamilyMemberCard 
          member={member} 
          onClose={onClose}
          onSelect={onMemberSelect}
        />
      </div>
    </div>,
    document.body
  );
};

export default TreeModal;
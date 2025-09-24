// src/components/sections/Contact/FormSuccess.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { formConfig } from './formConfig';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import IconButton from '../../ui/buttons/IconButton';

const FormSuccess = ({ formData, onReset, onClose }) => {
  const successRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    const success = successRef.current;
    const confetti = confettiRef.current;
    if (!success) return;

    // Success animation sequence
    const tl = gsap.timeline();

    // Main content entrance
    tl.fromTo(success,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
    );

    // Create confetti particles
    createConfetti(confetti);

    // Floating animation for success elements
    gsap.to('.success-element', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    return () => {
      tl.kill();
    };
  }, []);

  const createConfetti = (container) => {
    if (!container) return;

    const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F'];
    const confettiShapes = ['■', '●', '▲', '★', '❤️', '✨'];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute text-xl pointer-events-none';
      particle.innerHTML = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
      particle.style.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      container.appendChild(particle);

      // Animate confetti
      gsap.to(particle, {
        y: -100,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        opacity: 1,
        duration: Math.random() * 2 + 1,
        ease: "power2.out",
        delay: Math.random() * 0.5
      });

      // Remove after animation
      gsap.to(particle, {
        opacity: 0,
        duration: 0.5,
        delay: Math.random() * 2 + 1,
        onComplete: () => particle.remove()
      });
    }
  };

  const successConfig = formConfig.successMessages[formData.reason] || formConfig.successMessages.general;

  return (
    <div 
      ref={successRef}
      className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 shadow-2xl border-2 border-green-200/50 max-w-2xl mx-auto"
    >
      {/* Confetti Container */}
      <div ref={confettiRef} className="absolute inset-0 overflow-hidden rounded-3xl" />

      {/* Success Content */}
      <div className="relative z-10 text-center">
        {/* Animated Checkmark */}
        <div className="success-element mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl">
              ✓
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Success Title */}
        <h2 className="success-element text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
          {successConfig.title}
        </h2>

        {/* Success Message */}
        <p className="success-element text-lg text-gray-700 mb-6 leading-relaxed">
          {successConfig.message}
        </p>

        {/* Message Preview */}
        <div className="success-element bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-lg mr-2">📨</span>
            Message Preview
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>From:</strong> {formData.name} ({formData.email})</p>
            <p><strong>Subject:</strong> {formData.subject}</p>
            <p><strong>Category:</strong> {formConfig.contactReasons.find(r => r.value === formData.reason)?.label}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-element flex flex-col sm:flex-row gap-4 justify-center">
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
        <div className="success-element mt-8 pt-6 border-t border-green-200/50">
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
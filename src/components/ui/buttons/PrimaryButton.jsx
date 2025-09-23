// src/components/ui/buttons/PrimaryButton.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PrimaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  icon = null,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const magneticAreaRef = useRef(null);
//   const rippleRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const magneticArea = magneticAreaRef.current;

    if (!button || !magneticArea) return;

    // Magnetic effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = magneticArea.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(button, {
        x: x * 15,
        y: y * 15,
        rotation: x * 5,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    };

    magneticArea.addEventListener('mousemove', handleMouseMove);
    magneticArea.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magneticArea.removeEventListener('mousemove', handleMouseMove);
      magneticArea.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = (e) => {
    if (disabled) return;

    // Ripple effect
    const button = buttonRef.current;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
    `;

    button.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    });

    // Click animation
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    onClick?.(e);
  };

  return (
    <div 
      ref={magneticAreaRef}
      className="inline-block relative group"
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 
          text-white font-bold py-4 px-8 rounded-2xl shadow-2xl
          transform transition-all duration-300
          hover:shadow-3xl hover:brightness-110
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          group-hover:scale-105
          ${className}
        `}
        {...props}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
        
        {/* Continuous glow animation */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 group-hover:opacity-20 blur-md group-hover:animate-pulse"></div>
        
        {/* Border shine effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-padding opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center space-x-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span>{children}</span>
        </span>

        {/* Floating particles (appear on hover) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                left: `${20 + i * 15}%`,
                top: '20%',
                animation: `float 3s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </button>

      {/* Outer glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default PrimaryButton;
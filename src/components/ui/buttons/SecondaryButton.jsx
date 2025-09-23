// src/components/ui/buttons/SecondaryButton.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SecondaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  icon = null,
  variant = 'default',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const shineRef = useRef(null);

  const variants = {
    default: 'border-white/50 text-white hover:bg-white/10',
    purple: 'border-purple-400 text-purple-400 hover:bg-purple-400/10',
    blue: 'border-blue-400 text-blue-400 hover:bg-blue-400/10',
    pink: 'border-pink-400 text-pink-400 hover:bg-pink-400/10'
  };

  useEffect(() => {
    const button = buttonRef.current;
    const shine = shineRef.current;

    if (!button || !shine) return;

    // Shine animation on hover
    const handleMouseEnter = () => {
      gsap.to(shine, {
        x: '200%',
        duration: 0.7,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(shine, {
        x: '-100%',
        duration: 0.3,
        ease: "power2.in"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = (e) => {
    if (disabled) return;

    // Click animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden border-2 bg-transparent 
        font-bold py-3 px-6 rounded-xl backdrop-blur-sm
        transform transition-all duration-300
        hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        group ${variants[variant]} ${className}
      `}
      {...props}
    >
      {/* Shine effect */}
      <div
        ref={shineRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full"
      />

      {/* Animated border */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-padding rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </span>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              left: `${10 + i * 40}%`,
              top: '30%',
              animation: `bounce 2s ease-in-out ${i * 0.3}s infinite`
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default SecondaryButton;
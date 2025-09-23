// src/components/ui/buttons/IconButton.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const IconButton = ({ 
  icon, 
  onClick, 
  disabled = false, 
  className = '',
  size = 'md',
  tooltip = '',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-20 h-20 text-3xl'
  };

  useEffect(() => {
    const button = buttonRef.current;
    const tooltip = tooltipRef.current;

    if (!button) return;

    // Floating animation
    gsap.to(button, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Rotation on hover
    const handleMouseEnter = () => {
      gsap.to(button, {
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.5)"
      });

      if (tooltip) {
        gsap.fromTo(tooltip,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });

      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          y: 10,
          duration: 0.2
        });
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tooltip]);

  const handleClick = (e) => {
    if (disabled) return;

    // Click animation - bubble effect
    gsap.to(buttonRef.current, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Create ripple circles
    for (let i = 0; i < 3; i++) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute inset-0 border-2 border-current rounded-full opacity-0';
      buttonRef.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2,
        opacity: 0.3,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
        delay: i * 0.1
      });
    }

    onClick?.(e);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative bg-gradient-to-br from-purple-500 to-pink-500 
          text-white rounded-full shadow-lg
          transform transition-all duration-300
          hover:shadow-xl hover:brightness-110
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center
          ${sizes[size]} ${className}
        `}
        {...props}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-red-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
        
        {/* Icon */}
        <span className="relative z-10">{icon}</span>

        {/* Sparkle particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
              style={{
                left: `${25 + (i % 2) * 50}%`,
                top: `${25 + Math.floor(i / 2) * 50}%`,
                animation: `sparkle 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </button>

      {/* Tooltip */}
      {tooltip && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
        >
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
        </div>
      )}
    </div>
  );
};

export default IconButton;
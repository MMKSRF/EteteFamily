// src/components/ui/loaders/Spinner.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Spinner = ({ 
  size = 'md', 
  color = 'gradient', 
  text = '' 
}) => {
  const spinnerRef = useRef(null);
  const ringsRef = useRef([]);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colors = {
    gradient: 'bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    pink: 'bg-gradient-to-r from-pink-400 to-pink-600'
  };

  useEffect(() => {
    const spinner = spinnerRef.current;
    if (!spinner) return;

    // Create multiple rings
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = `absolute border-4 border-transparent rounded-full ${colors[color]}`;
      ring.style.borderTopColor = 'currentColor';
      ring.style.width = `${100 - i * 25}%`;
      ring.style.height = `${100 - i * 25}%`;
      ring.style.top = `${i * 12.5}%`;
      ring.style.left = `${i * 12.5}%`;
      spinner.appendChild(ring);
      rings.push(ring);
    }
    ringsRef.current = rings;

    // Animate rings
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: 360,
        duration: 2 + i * 0.5,
        repeat: -1,
        ease: "linear"
      });
    });

    // Pulsing effect
    gsap.to(spinner, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      rings.forEach(ring => ring.remove());
    };
  }, [color]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        ref={spinnerRef}
        className={`relative ${sizes[size]} flex items-center justify-center`}
      >
        {/* Central dot */}
        <div className={`w-2 h-2 rounded-full ${colors[color]}`} />
      </div>
      
      {text && (
        <p className="text-gray-600 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Spinner;
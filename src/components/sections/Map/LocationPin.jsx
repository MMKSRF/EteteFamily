// src/components/sections/Map/LocationPin.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import IconButton from '../../ui/buttons/IconButton';

const LocationPin = ({ 
  location, 
  isActive, 
  onClick, 
  onHover,
  delay = 0 
}) => {
  const pinRef = useRef(null);
  const pulseRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const pin = pinRef.current;
    const pulse = pulseRef.current;
    if (!pin) return;

    // Entrance animation
    const tl = gsap.timeline({ delay });
    tl.fromTo(pin,
      { scale: 0, opacity: 0, y: 100 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(1.5)" 
      }
    );

    // Continuous pulse animation
    gsap.to(pulse, {
      scale: 2,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "sine.inOut",
      delay: delay + 0.5
    });

    // Floating animation
    gsap.to(pin, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 1
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  useEffect(() => {
    // Active state animation
    if (isActive) {
      gsap.to(pinRef.current, {
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(pinRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isActive]);

  const handleClick = () => {
    // Click animation
    gsap.to(pinRef.current, {
      scale: 1.5,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => onClick(location)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(location, true);
    
    gsap.to(pinRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(location, false);
    
    if (!isActive) {
      gsap.to(pinRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={pinRef}
      className={`relative cursor-pointer transform transition-all duration-300 ${
        isActive ? 'z-50' : 'z-30'
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pulse effect */}
      <div
        ref={pulseRef}
        className={`absolute inset-0 rounded-full ${
          location.type === 'family-home' ? 'bg-blue-400' :
          location.type === 'current-residence' ? 'bg-green-400' :
          location.type === 'business' ? 'bg-gray-400' :
          location.type === 'vacation-home' ? 'bg-cyan-400' :
          location.type === 'celebration' ? 'bg-pink-400' :
          location.type === 'heritage' ? 'bg-purple-400' :
          location.type === 'travel' ? 'bg-orange-400' : 'bg-yellow-400'
        }`}
        style={{ 
          width: '60px', 
          height: '60px',
          margin: '-20px 0 0 -20px'
        }}
      />

      {/* Main pin */}
      <div className={`relative rounded-full p-3 shadow-2xl border-4 border-white transform transition-all duration-300 ${
        isActive ? 'scale-110' : ''
      } ${
        location.type === 'family-home' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
        location.type === 'current-residence' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
        location.type === 'business' ? 'bg-gradient-to-r from-gray-600 to-gray-800' :
        location.type === 'vacation-home' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
        location.type === 'celebration' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
        location.type === 'heritage' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
        location.type === 'travel' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-yellow-500 to-amber-500'
      }`}>
        <span className="text-white text-xl font-bold">{location.icon}</span>
        
        {/* Pin point */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-current rotate-45"></div>
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white rounded-lg whitespace-nowrap text-sm font-semibold">
          {location.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
        </div>
      )}

      {/* Active state indicator */}
      {isActive && (
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </div>
      )}
    </div>
  );
};

export default LocationPin;
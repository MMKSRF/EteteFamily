// src/components/ui/cards/InfoCard.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const InfoCard = ({ 
  title, 
  description, 
  icon, 
  color = 'purple',
  onClick,
  className = ''
}) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const colorSchemes = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-teal-500',
    orange: 'from-orange-500 to-red-500',
    yellow: 'from-yellow-500 to-amber-500'
  };

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card) return;

    // 3D tilt effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(content, {
        x: x * 20,
        y: -y * 20,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        relative group cursor-pointer transform-gpu
        ${onClick ? 'hover:scale-105' : ''}
        transition-all duration-500
        ${className}
      `}
    >
      {/* Main Card */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-white/20">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorSchemes[color]} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${colorSchemes[color]} bg-clip-padding opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div ref={contentRef} className="relative z-10 p-6">
          {/* Icon */}
          {icon && (
            <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
          )}
          
          {/* Title */}
          <h3 className={`text-xl font-bold bg-gradient-to-r ${colorSchemes[color]} bg-clip-text text-transparent mb-2`}>
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colorSchemes[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      </div>

      {/* Shadow Enhancement */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colorSchemes[color]} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
    </div>
  );
};

export default InfoCard;
// src/components/ui/cards/ImageCard.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ImageCard = ({ 
  image, 
  title, 
  description, 
  onClick,
  className = '',
  overlayContent 
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!card || !isLoaded) return;

    // Parallax effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(image, {
        x: x * 20,
        y: y * 20,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(content, {
        y: -y * 30,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });

      gsap.to(content, {
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
  }, [isLoaded]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    // Animate image in
    gsap.fromTo(imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl
        transform-gpu ${onClick ? 'hover:scale-105' : ''}
        transition-all duration-500
        ${className}
      `}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          ref={imageRef}
          src={image}
          alt={title}
          onLoad={handleImageLoad}
          className="w-full h-64 object-cover transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div 
          ref={contentRef}
          className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
          {overlayContent}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
// src/components/sections/Games/MemoryGame/MemoryCard.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MemoryCard = ({ 
  card, 
  isFlipped, 
  isMatched, 
  onClick, 
  index 
}) => {
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    // Card entrance animation
    gsap.fromTo(cardElement,
      { scale: 0, rotation: -180, opacity: 0 },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "back.out(1.5)" 
      }
    );

    // Continuous subtle floating
    gsap.to(cardElement, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2
    });
  }, [index]);

  useEffect(() => {
    if (isFlipped) {
      // Flip to front animation
      gsap.to(cardRef.current, {
        rotationY: 180,
        duration: 0.6,
        ease: "power2.out"
      });
    } else {
      // Flip to back animation
      gsap.to(cardRef.current, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [isFlipped]);

  useEffect(() => {
    if (isMatched) {
      // Matched animation
      gsap.to(cardRef.current, {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      // Sparkle effect
      for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute text-xl pointer-events-none';
        sparkle.innerHTML = '✨';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        cardRef.current?.appendChild(sparkle);

        gsap.to(sparkle, {
          y: -30,
          x: Math.random() * 40 - 20,
          rotation: 360,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => sparkle.remove()
        });
      }
    }
  }, [isMatched]);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      // Click animation
      gsap.to(cardRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => onClick()
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="relative w-full h-full cursor-pointer transform-style-preserve-3d transition-transform duration-600"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card Back */}
      <div
        ref={backRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center backface-hidden"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="text-white text-4xl">?</div>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-2 text-lg">🎴</div>
          <div className="absolute bottom-2 right-2 text-lg">🎴</div>
        </div>
      </div>

      {/* Card Front */}
      <div
        ref={frontRef}
        className="absolute inset-0 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center backface-hidden transform-rotate-y-180"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className="text-4xl">{card.icon}</div>
        <div className="absolute bottom-2 text-sm font-bold text-gray-700">
          {card.name}
        </div>
        
        {/* Matched overlay */}
        {isMatched && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20 rounded-2xl"></div>
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
    </div>
  );
};

export default MemoryCard;
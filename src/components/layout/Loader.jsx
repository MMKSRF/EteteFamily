// src/components/layout/Loader.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Create floating particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 1
      });
    }
    particlesRef.current = particles;

    // Main animation sequence
    tl.fromTo(loaderRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    .fromTo(textRef.current,
      { scale: 0, rotation: -180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)" 
      }
    )
    .add(() => {
      // Animate particles floating around
      particles.forEach((particle, i) => {
        gsap.to(`.particle-${i}`, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          rotation: 360,
          scale: Math.random() + 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: particle.delay
        });
      });
    })
    .to(textRef.current, {
      scale: 1.2,
      rotation: 10,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    })
    .to(loaderRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particlesRef.current.map((particle, i) => (
          <div
            key={i}
            className={`particle-${i} absolute w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              scale: particle.scale
            }}
          />
        ))}
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
        >
          EtetFamily
        </h1>
        <p className="text-white text-xl mt-4 font-light animate-pulse">
          Loading Family Memories...
        </p>
        
        {/* Spinning Loader Ring */}
        <div className="mt-8 relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-yellow-400 border-r-pink-500 rounded-full animate-spin mx-auto"></div>
          <div className="w-16 h-16 border-4 border-transparent border-b-blue-400 border-l-green-400 rounded-full animate-spin-reverse absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
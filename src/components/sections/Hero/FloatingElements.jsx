// src/components/sections/Hero/FloatingElements.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingElements = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const particles = [];
    const emojis = ['❤️', '✨', '🌟', '🎊', '💖', '👨‍👩‍👧‍👦', '🏠', '💫', '🎉', '🌈'];
    const shapes = ['circle', 'square', 'triangle', 'star'];

    // Create particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      const isEmoji = Math.random() > 0.5;
      
      if (isEmoji) {
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.className = 'text-2xl md:text-4xl absolute pointer-events-none';
      } else {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        particle.className = `absolute rounded-${
          shape === 'circle' ? 'full' : 
          shape === 'square' ? 'lg' : 
          shape === 'triangle' ? '0' : 'sm'
        } bg-gradient-to-r from-yellow-400/30 to-pink-500/30 pointer-events-none`;
        particle.style.width = `${Math.random() * 30 + 10}px`;
        particle.style.height = `${Math.random() * 30 + 10}px`;
      }

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }
    particlesRef.current = particles;

    // Animate particles
    particles.forEach((particle) => {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      
      // Floating animation
      gsap.to(particle, {
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });

      // Pulsing glow effect
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 2
      });
    });

    // Background gradient animation
    gsap.to(containerRef.current, {
      backgroundPosition: '100% 50%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-pink-400/10 bg-[size:200%_200%]"
      style={{ backgroundPosition: '0% 50%' }}
    />
  );
};

export default FloatingElements;
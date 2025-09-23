// src/components/sections/Hero/TypewriterText.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const TypewriterText = ({ texts, speed = 100, loop = true }) => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // Cursor blinking animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Text reveal animation
    const textReveal = gsap.to(textRef.current, {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      paused: true
    });

    const typeWriter = () => {
      if (currentIndex < texts[currentTextIndex].length) {
        setCurrentText(prev => prev + texts[currentTextIndex][currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Trigger subtle animation on each character
        if (currentIndex % 3 === 0) {
          textReveal.restart();
        }
      } else {
        // Text complete - wait then delete or move to next
        setTimeout(() => {
          if (loop) {
            backspace();
          }
        }, 2000);
      }
    };

    const backspace = () => {
      if (currentText.length > 0) {
        setCurrentText(prev => prev.slice(0, -1));
        setTimeout(backspace, speed / 2);
      } else {
        // Move to next text
        setCurrentTextIndex(prev => (prev + 1) % texts.length);
        setCurrentIndex(0);
        setTimeout(typeWriter, 500);
      }
    };

    const timer = setTimeout(typeWriter, speed);
    return () => clearTimeout(timer);
  }, [currentIndex, currentTextIndex, texts, speed, loop]);

  return (
    <div className="relative inline-block">
      <span 
        ref={textRef}
        className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent"
      >
        {currentText}
      </span>
      <span 
        ref={cursorRef}
        className="ml-1 w-2 h-12 bg-gradient-to-b from-yellow-400 to-pink-500 inline-block"
      ></span>
      
      {/* Floating emojis that appear during typing */}
      <div className="absolute -top-8 -right-8">
        {currentIndex > 0 && (
          <div className="text-2xl animate-bounce">
            {['✨', '🌟', '🎉', '💫'][currentIndex % 4]}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypewriterText;
// src/components/animations/hooks/useTypingEffect.js
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useTypingEffect = (texts, options = {}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
//   const animationRef = useRef(null);

  const {
    speed = 100,
    delay = 2000,
    loop = true,
    onStart = null,
    onComplete = null,
    cursor = true,
    cursorBlinkSpeed = 500
  } = options;

  useEffect(() => {
    let timer;
    const currentText = texts[textIndex];

    const type = () => {
      if (isDeleting) {
        // Deleting text
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else {
        // Typing text
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }

      // Calculate typing speed (faster when deleting)
      const typeSpeed = isDeleting ? speed / 2 : speed;

      if (!isDeleting && currentIndex === currentText.length) {
        // Finished typing, start deleting after delay
        if (loop) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        } else if (onComplete) {
          onComplete();
        }
      } else if (isDeleting && currentIndex === 0) {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % texts.length);
        timer = setTimeout(() => {}, 500);
      } else {
        timer = setTimeout(type, typeSpeed);
      }
    };

    if (onStart && currentIndex === 0 && !isDeleting) {
      onStart();
    }

    timer = setTimeout(type, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, textIndex, texts, speed, delay, loop]);

  // Cursor blinking effect
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  // Text animation effects
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Add subtle animation on each character
    gsap.to(textRef.current, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }, [displayText]);

  return {
    displayText,
    cursor: cursorVisible ? '|' : ' ',
    textRef,
    isTyping: !isDeleting && currentIndex < texts[textIndex]?.length,
    currentTextIndex: textIndex
  };
};

// Advanced typing effects
export const useTypewriter = (texts, options) => useTypingEffect(texts, options);
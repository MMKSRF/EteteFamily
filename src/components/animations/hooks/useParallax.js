// src/components/animations/hooks/useParallax.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (options = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const {
    speed = 100,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
    ease = 'none',
    scrub = true,
    markers = false
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const parallaxConfig = {
      ease,
      scrub: scrub ? 1 : false,
      markers
    };

    if (direction === 'vertical') {
      animationRef.current = gsap.to(element, {
        y: speed,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          ...parallaxConfig
        }
      });
    } else if (direction === 'horizontal') {
      animationRef.current = gsap.to(element, {
        x: speed,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          ...parallaxConfig
        }
      });
    } else if (direction === 'rotate') {
      animationRef.current = gsap.to(element, {
        rotation: speed,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          ...parallaxConfig
        }
      });
    } else if (direction === 'scale') {
      animationRef.current = gsap.to(element, {
        scale: 1 + (speed / 100),
        scrollTrigger: {
          trigger: element,
          start,
          end,
          ...parallaxConfig
        }
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [speed, direction, start, end, ease, scrub, markers]);

  return elementRef;
};

// Quick parallax hooks
export const useVerticalParallax = (speed = 100, options = {}) =>
  useParallax({ speed, direction: 'vertical', ...options });

export const useHorizontalParallax = (speed = 100, options = {}) =>
  useParallax({ speed, direction: 'horizontal', ...options });

export const useRotateParallax = (rotation = 360, options = {}) =>
  useParallax({ speed: rotation, direction: 'rotate', ...options });

export const useScaleParallax = (scale = 50, options = {}) =>
  useParallax({ speed: scale, direction: 'scale', ...options });
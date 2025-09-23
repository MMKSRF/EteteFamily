// src/components/animations/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const {
    trigger = null,
    start = 'top 80%',
    end = 'bottom 20%',
    animation = 'fadeInUp',
    duration = 1,
    delay = 0,
    stagger = 0,
    once = true,
    markers = false,
    onEnter = null,
    onLeave = null,
    onEnterBack = null,
    onLeaveBack = null
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get animation preset
    const animationPreset = getAnimationPreset(animation, { duration, delay });

    // Create the animation
    animationRef.current = gsap.fromTo(element, 
      animationPreset.from,
      {
        ...animationPreset.to,
        scrollTrigger: {
          trigger: trigger || element,
          start,
          end,
          once,
          markers,
          onEnter: () => {
            if (onEnter) onEnter(element);
          },
          onLeave: () => {
            if (onLeave) onLeave(element);
          },
          onEnterBack: () => {
            if (onEnterBack) onEnterBack(element);
          },
          onLeaveBack: () => {
            if (onLeaveBack) onLeaveBack(element);
          }
        }
      }
    );

    // Handle stagger for multiple children
    if (stagger > 0) {
      gsap.fromTo(element.children, 
        animationPreset.from,
        {
          ...animationPreset.to,
          stagger,
          scrollTrigger: {
            trigger: trigger || element,
            start,
            end,
            once,
            markers
          }
        }
      );
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [trigger, start, end, animation, duration, delay, stagger, once, markers]);

  return elementRef;
};

// Animation presets
const getAnimationPreset = (animation, options) => {
  const presets = {
    fadeInUp: {
      from: { opacity: 0, y: 100 },
      to: { opacity: 1, y: 0, ease: "power2.out", ...options }
    },
    fadeInDown: {
      from: { opacity: 0, y: -100 },
      to: { opacity: 1, y: 0, ease: "power2.out", ...options }
    },
    fadeInLeft: {
      from: { opacity: 0, x: -100 },
      to: { opacity: 1, x: 0, ease: "power2.out", ...options }
    },
    fadeInRight: {
      from: { opacity: 0, x: 100 },
      to: { opacity: 1, x: 0, ease: "power2.out", ...options }
    },
    scaleIn: {
      from: { opacity: 0, scale: 0.5 },
      to: { opacity: 1, scale: 1, ease: "back.out(1.5)", ...options }
    },
    flipIn: {
      from: { opacity: 0, rotationX: 90 },
      to: { opacity: 1, rotationX: 0, ease: "back.out(1.5)", ...options }
    },
    bounceIn: {
      from: { opacity: 0, scale: 0.3 },
      to: { 
        opacity: 1, 
        scale: 1, 
        ease: "bounce.out",
        ...options 
      }
    },
    zoomIn: {
      from: { opacity: 0, scale: 1.5 },
      to: { opacity: 1, scale: 1, ease: "power2.out", ...options }
    },
    slideIn: {
      from: { opacity: 0, x: -100, rotation: -10 },
      to: { opacity: 1, x: 0, rotation: 0, ease: "elastic.out(1, 0.5)", ...options }
    }
  };

  return presets[animation] || presets.fadeInUp;
};

// Quick usage hooks
export const useFadeInUp = (options = {}) => 
  useScrollAnimation({ animation: 'fadeInUp', ...options });

export const useScaleIn = (options = {}) => 
  useScrollAnimation({ animation: 'scaleIn', ...options });

export const useBounceIn = (options = {}) => 
  useScrollAnimation({ animation: 'bounceIn', ...options });
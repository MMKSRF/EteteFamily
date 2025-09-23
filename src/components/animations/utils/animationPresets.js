// src/components/animations/utils/animationPresets.js
import { gsap } from './gsapConfig';

export const animationPresets = {
  // Entrance animations
  fadeInUp: {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0, ease: "power2.out", duration: 1 }
  },
  
  fadeInDown: {
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0, ease: "power2.out", duration: 1 }
  },
  
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, ease: "power2.out", duration: 1 }
  },
  
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, ease: "power2.out", duration: 1 }
  },

  // Scale animations
  scaleIn: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1, ease: "back.out(1.5)", duration: 0.8 }
  },
  
  popIn: {
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1, ease: "elastic.out(1, 0.5)", duration: 1 }
  },

  // Rotation animations
  flipInX: {
    from: { opacity: 0, rotationX: 90 },
    to: { opacity: 1, rotationX: 0, ease: "back.out(1.5)", duration: 1 }
  },
  
  flipInY: {
    from: { opacity: 0, rotationY: 90 },
    to: { opacity: 1, rotationY: 0, ease: "back.out(1.5)", duration: 1 }
  },

  // Special effects
  bounceIn: {
    from: { opacity: 0, scale: 0.3 },
    to: { opacity: 1, scale: 1, ease: "bounce.out", duration: 1.2 }
  },
  
  wobbleIn: {
    from: { opacity: 0, scale: 0.8, rotation: -10 },
    to: { opacity: 1, scale: 1, rotation: 0, ease: "elastic.out(1, 0.5)", duration: 1 }
  },

  // Stagger animations
  staggerFadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out", duration: 0.6 }
  },
  
  staggerScaleIn: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1, stagger: 0.15, ease: "back.out(1.5)", duration: 0.8 }
  }
};

// Quick preset functions
export const createAnimation = (target, presetName, options = {}) => {
  const preset = animationPresets[presetName] || animationPresets.fadeInUp;
  return gsap.fromTo(target, preset.from, { ...preset.to, ...options });
};

export const createStaggerAnimation = (targets, presetName, options = {}) => {
  const preset = animationPresets[presetName] || animationPresets.staggerFadeIn;
  return gsap.fromTo(targets, preset.from, { ...preset.to, ...options });
};

// Export individual presets
export const {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  popIn,
  flipInX,
  flipInY,
  bounceIn,
  wobbleIn,
  staggerFadeIn,
  staggerScaleIn
} = animationPresets;
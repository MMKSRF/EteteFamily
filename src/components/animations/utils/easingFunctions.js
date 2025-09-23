// src/components/animations/utils/easingFunctions.js
import { gsap } from './gsapConfig';

// Custom easing functions
export const registerCustomEases = () => {
  // Smooth bounce
  gsap.registerEase("smoothBounce", (progress) => {
    if (progress < 0.5) {
      return 2 * progress * progress;
    } else {
      return -2 * progress * progress + 4 * progress - 1;
    }
  });

  // Elastic bounce
  gsap.registerEase("elasticBounce", (progress) => {
    return 1 - Math.cos(progress * Math.PI * 4) * Math.exp(-progress * 5);
  });

  // Smooth step
  gsap.registerEase("smoothStep", (progress) => {
    return progress * progress * (3 - 2 * progress);
  });

  // Exponential pulse
  gsap.registerEase("pulse", (progress) => {
    return Math.sin(progress * Math.PI * 2) * Math.exp(-progress * 2);
  });

  // Back and forth
  gsap.registerEase("backAndForth", (progress) => {
    return Math.sin(progress * Math.PI * 4) * (1 - progress);
  });

  // Custom elastic
  gsap.registerEase("customElastic", (progress) => {
    return 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 3);
  });
};

// Register all custom eases
registerCustomEases();

// Easing presets for common use cases
export const easingPresets = {
  entrance: "back.out(1.5)",
  exit: "power2.in",
  bounce: "bounce.out",
  elastic: "elastic.out(1, 0.5)",
  smooth: "smoothStep",
  pulse: "pulse",
  dramatic: "customElastic"
};

// Quick easing functions
export const getEasing = (type) => easingPresets[type] || "power2.out";

export default easingPresets;
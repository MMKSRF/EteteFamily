// src/components/animations/utils/gsapConfig.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global GSAP configuration
export const configureGSAP = () => {
  // Set default easing
  gsap.defaults({
    ease: "power2.out",
    duration: 0.8
  });

  // Custom easing curves
  gsap.registerEase("smoothStep", (progress) => {
    return progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;
  });

  gsap.registerEase("elasticSoft", (progress) => {
    return 1 - Math.cos(progress * Math.PI * 2) * Math.exp(-progress * 4);
  });
};

// ScrollTrigger default configuration
export const scrollTriggerConfig = {
  scroller: window,
  toggleActions: "play none none reverse",
  start: "top 80%",
  end: "bottom 20%"
};

// Apply configuration
configureGSAP();

export default gsap;
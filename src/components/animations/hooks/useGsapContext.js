// src/components/animations/hooks/useGsapContext.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGsapContext = (scope = null) => {
  const ctx = useRef(null);
  const scopeRef = useRef(scope);

  useEffect(() => {
    // Create GSAP context
    ctx.current = gsap.context(() => {}, scopeRef.current);

    return () => {
      // Cleanup context
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);

  // Add animation to context
  const addAnimation = (animation, target, vars) => {
    if (!ctx.current) return null;
    
    return ctx.current.add(() => {
      if (typeof animation === 'string') {
        return gsap[animation](target, vars);
      }
      return animation(target, vars);
    });
  };

  // Get all animations in context
  const getAnimations = () => {
    return ctx.current ? ctx.current.animations : [];
  };

  // Kill all animations in context
  const killAll = () => {
    if (ctx.current) {
      ctx.current.kill();
    }
  };

  return {
    context: ctx.current,
    addAnimation,
    getAnimations,
    killAll,
    gsap
  };
};

// Hook for creating animations with automatic cleanup
export const useAnimation = (setup, dependencies = []) => {
  const { addAnimation, killAll } = useGsapContext();

  useEffect(() => {
    const animations = setup(addAnimation);
    
    return () => {
      if (animations && Array.isArray(animations)) {
        animations.forEach(anim => anim && anim.kill());
      }
      killAll();
    };
  }, dependencies);
};
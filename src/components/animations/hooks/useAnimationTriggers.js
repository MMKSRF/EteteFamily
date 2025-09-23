// src/components/animations/hooks/useAnimationTriggers.js
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const useAnimationTriggers = (triggers = {}) => {
  const elementRef = useRef(null);
  const [activeTrigger, setActiveTrigger] = useState(null);
  const animationsRef = useRef(new Map());

  const {
    onHover = null,
    onClick = null,
    onFocus = null,
    // onScroll = null,
    onViewport = null,
    // onSequence = null,
    delay = 0,
    repeat = false,
    yoyo = false
  } = triggers;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Hover trigger
    if (onHover) {
      const handleMouseEnter = () => {
        setActiveTrigger('hover');
        const anim = gsap.to(element, {
          ...onHover.enter,
          delay,
          onComplete: () => {
            if (yoyo) {
              gsap.to(element, {
                ...onHover.leave,
                delay: onHover.delay || 0
              });
            }
          }
        });
        animationsRef.current.set('hover', anim);
      };

      const handleMouseLeave = () => {
        if (onHover.leave && !yoyo) {
          gsap.to(element, onHover.leave);
        }
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Click trigger
    if (onClick) {
      const handleClick = () => {
        setActiveTrigger('click');
        const anim = gsap.to(element, {
          ...onClick,
          delay,
          yoyo: yoyo && !repeat,
          repeat: repeat ? -1 : 0
        });
        animationsRef.current.set('click', anim);
      };

      element.addEventListener('click', handleClick);

      return () => {
        element.removeEventListener('click', handleClick);
      };
    }
  }, [onHover, onClick, onFocus, delay, repeat, yoyo]);

  // Viewport trigger using Intersection Observer
  useEffect(() => {
    if (!onViewport) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTrigger('viewport');
            gsap.to(elementRef.current, {
              ...onViewport.enter,
              delay
            });
          } else if (onViewport.leave) {
            gsap.to(elementRef.current, onViewport.leave);
          }
        });
      },
      { threshold: onViewport.threshold || 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [onViewport, delay]);

  return {
    ref: elementRef,
    activeTrigger,
    play: (triggerName) => {
      const anim = animationsRef.current.get(triggerName);
      if (anim) anim.play();
    },
    pause: (triggerName) => {
      const anim = animationsRef.current.get(triggerName);
      if (anim) anim.pause();
    },
    restart: (triggerName) => {
      const anim = animationsRef.current.get(triggerName);
      if (anim) anim.restart();
    }
  };
};

// Pre-built trigger hooks
export const useHoverAnimation = (enterVars, leaveVars) =>
  useAnimationTriggers({
    onHover: { enter: enterVars, leave: leaveVars }
  });

export const useClickAnimation = (animationVars) =>
  useAnimationTriggers({ onClick: animationVars });

export const useViewportAnimation = (enterVars, leaveVars, threshold = 0.5) =>
  useAnimationTriggers({
    onViewport: { enter: enterVars, leave: leaveVars, threshold }
  });
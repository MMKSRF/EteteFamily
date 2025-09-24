// src/components/animations/components/ScrollTriggerWrapper.jsx
import { useRef, useEffect, cloneElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerWrapper = ({
  children,
  animation = 'fadeInUp',
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  delay = 0,
  stagger = 0,
  once = true,
  markers = false,
  className = '',
  onStart,
  onComplete,
  ...props
}) => {
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const animationConfig = getAnimationConfig(animation, { duration, delay });

    let animationInstance;

    if (stagger > 0 && element.children.length > 0) {
      // Animate children with stagger
      animationInstance = gsap.fromTo(element.children, 
        animationConfig.from,
        {
          ...animationConfig.to,
          stagger,
          scrollTrigger: {
            trigger: triggerRef.current || element,
            start,
            end,
            once,
            markers,
            onEnter: onStart,
            onEnterBack: onStart,
            onLeave: onComplete,
            onLeaveBack: onComplete
          }
        }
      );
    } else {
      // Animate single element
      animationInstance = gsap.fromTo(element, 
        animationConfig.from,
        {
          ...animationConfig.to,
          scrollTrigger: {
            trigger: triggerRef.current || element,
            start,
            end,
            once,
            markers,
            onEnter: onStart,
            onEnterBack: onStart,
            onLeave: onComplete,
            onLeaveBack: onComplete
          }
        }
      );
    }

    return () => {
      if (animationInstance) {
        animationInstance.kill();
      }
    };
  }, [animation, start, end, duration, delay, stagger, once, markers]);

  const getAnimationConfig = (anim, options) => {
    const configs = {
      fadeInUp: {
        from: { opacity: 50, y: 100 },
        to: { opacity: 1, y: 0, ease: "power2.out", ...options }
      },
      fadeInDown: {
        from: { opacity: 0, y: -100 },
        to: { opacity: 1, y: 0, ease: "power2.out", ...options }
      },
      slideInLeft: {
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0, ease: "power2.out", ...options }
      },
      slideInRight: {
        from: { opacity: 0, x: 100 },
        to: { opacity: 1, x: 0, ease: "power2.out", ...options }
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1, ease: "back.out(1.5)", ...options }
      },
      flipIn: {
        from: { opacity: 0, rotationY: 90 },
        to: { opacity: 1, rotationY: 0, ease: "back.out(1.5)", ...options }
      },
      bounceIn: {
        from: { opacity: 0, scale: 0.5 },
        to: { opacity: 1, scale: 1, ease: "bounce.out", ...options }
      }
    };

    return configs[anim] || configs.fadeInUp;
  };

  return (
    <div 
      ref={triggerRef}
      className={className}
      {...props}
    >
      {cloneElement(children, { ref: wrapperRef })}
    </div>
  );
};

export default ScrollTriggerWrapper;
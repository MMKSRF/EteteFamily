// src/components/animations/components/StaggerChildren.jsx
import { useRef, useEffect, cloneElement, Children } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StaggerChildren = ({
  children,
  animation = 'fadeInUp',
  stagger = 0.1,
  duration = 0.5,
  delay = 0,
  start = 'top 80%',
  once = true,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childrenElements = container.children;

    const animationConfig = getAnimationConfig(animation, { duration, delay });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        once,
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(childrenElements, 
      animationConfig.from,
      {
        ...animationConfig.to,
        stagger
      }
    );

    return () => {
      tl.kill();
    };
  }, [animation, stagger, duration, delay, start, once]);

  const getAnimationConfig = (anim, options) => {
    const configs = {
      fadeInUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, ease: "power2.out", ...options }
      },
      fadeInLeft: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, ease: "power2.out", ...options }
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1, ease: "back.out(1.5)", ...options }
      },
      slideIn: {
        from: { opacity: 0, x: -30, y: 30 },
        to: { opacity: 1, x: 0, y: 0, ease: "power2.out", ...options }
      }
    };

    return configs[anim] || configs.fadeInUp;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      {...props}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          key: index,
          style: { ...child.props.style, opacity: 0 } // Start hidden
        })
      )}
    </div>
  );
};

export default StaggerChildren;
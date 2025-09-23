// src/components/animations/components/ParallaxElement.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxElement = ({
  children,
  speed = 50,
  direction = 'vertical',
  start = 'top bottom',
  end = 'bottom top',
  ease = 'none',
  scrub = true,
  className = '',
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const parallaxConfig = {
      ease,
      scrub: scrub ? 1 : false
    };

    let animation;

    switch (direction) {
      case 'vertical':
        animation = gsap.to(element, {
          y: speed,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            ...parallaxConfig
          }
        });
        break;
      
      case 'horizontal':
        animation = gsap.to(element, {
          x: speed,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            ...parallaxConfig
          }
        });
        break;
      
      case 'rotate':
        animation = gsap.to(element, {
          rotation: speed,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            ...parallaxConfig
          }
        });
        break;
      
      case 'scale':
        animation = gsap.to(element, {
          scale: 1 + (speed / 100),
          scrollTrigger: {
            trigger: element,
            start,
            end,
            ...parallaxConfig
          }
        });
        break;
      
      default:
        animation = gsap.to(element, {
          y: speed,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            ...parallaxConfig
          }
        });
    }

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [speed, direction, start, end, ease, scrub]);

  return (
    <div
      ref={elementRef}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

// Specific parallax components
export const VerticalParallax = (props) => 
  <ParallaxElement direction="vertical" {...props} />;

export const HorizontalParallax = (props) => 
  <ParallaxElement direction="horizontal" {...props} />;

export const RotateParallax = (props) => 
  <ParallaxElement direction="rotate" {...props} />;

export const ScaleParallax = (props) => 
  <ParallaxElement direction="scale" {...props} />;

export default ParallaxElement;
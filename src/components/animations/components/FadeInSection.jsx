// src/components/animations/components/FadeInSection.jsx
// import { useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FadeInSection = ({
  children,
  direction = 'up',
  duration = 1,
  delay = 0,
  threshold = 0.5,
  className = '',
  style = {},
  ...props
}) => {
  const animationRef = useScrollAnimation({
    animation: `fadeIn${direction.charAt(0).toUpperCase() + direction.slice(1)}`,
    duration,
    delay,
    start: `top ${threshold * 100}%`
  });

  return (
    <div
      ref={animationRef}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

// Specific direction components
export const FadeInUp = (props) => <FadeInSection direction="up" {...props} />;
export const FadeInDown = (props) => <FadeInSection direction="down" {...props} />;
export const FadeInLeft = (props) => <FadeInSection direction="left" {...props} />;
export const FadeInRight = (props) => <FadeInSection direction="right" {...props} />;

export default FadeInSection;
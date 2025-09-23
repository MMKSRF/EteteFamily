// src/components/ui/loaders/ProgressBar.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ProgressBar = ({ 
  progress = 0, 
  duration = 3000,
  color = 'gradient',
  height = 'md',
  showPercentage = true,
  animated = true 
}) => {
  const progressRef = useRef(null);
  const fillRef = useRef(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };

  const colors = {
    gradient: 'bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    green: 'bg-gradient-to-r from-green-400 to-green-600'
  };

  useEffect(() => {
    if (!animated) {
      setAnimatedProgress(progress);
      return;
    }

    const tl = gsap.timeline();
    tl.to({}, {
      duration: duration / 1000,
      onUpdate: function() {
        setAnimatedProgress(this.progress() * progress);
      },
      ease: "power2.out"
    });

    // Animate the fill with wave effect
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        backgroundPosition: '100% 0%',
        duration: 2,
        repeat: -1,
        ease: "linear"
      });
    }

    return () => tl.kill();
  }, [progress, duration, animated]);

  return (
    <div className="w-full space-y-2">
      {/* Progress Bar Container */}
      <div
        ref={progressRef}
        className={`relative ${heights[height]} bg-gray-200 rounded-full overflow-hidden`}
      >
        {/* Progress Fill */}
        <div
          ref={fillRef}
          className={`absolute top-0 left-0 h-full rounded-full ${colors[color]} transition-all duration-300 ease-out`}
          style={{ 
            width: `${animatedProgress}%`,
            backgroundSize: '200% 100%'
          }}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-70"
                style={{
                  left: `${20 + i * 30}%`,
                  top: '25%',
                  animation: `float 2s ease-in-out ${i * 0.5}s infinite`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {showPercentage && (
          <div 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold"
            style={{ left: `calc(${animatedProgress}% - 20px)` }}
          >
            {Math.round(animatedProgress)}%
          </div>
        )}
      </div>

      {/* Optional Labels */}
      <div className="flex justify-between text-xs text-gray-600">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
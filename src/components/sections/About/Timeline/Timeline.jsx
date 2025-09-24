// src/components/sections/About/Timeline/Timeline.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './timelineData';
import TimelineItem from './TimelineItem';
import { useScrollAnimation } from '../../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const timelineRef = useRef(null);
  const titleRef = useScrollAnimation({ 
    animation: 'fadeInDown', 
    duration: 1.5 
  });

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Animate timeline line growth
    const line = timeline.querySelector('.timeline-line');
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1
          }
        }
      );
    }

    // Floating background elements
    const floatingElements = [];
    for (let i = 0; i < 8; i++) {
      const element = document.createElement('div');
      element.className = 'absolute text-4xl opacity-10 pointer-events-none';
      element.innerHTML = ['❤️', '✨', '🌟', '🎊'][i % 4];
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      timeline.appendChild(element);
      floatingElements.push(element);

      gsap.to(element, {
        y: -50,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      floatingElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <section ref={timelineRef} className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-pink-400/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Our Family Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to a global family network, follow the timeline of EteteFamily's incredible story through generations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-200 via-purple-400 to-pink-500 origin-top"></div>
          
          {/* Timeline Items */}
          <div className="space-y-0">
            {timelineData.map((event, index) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          {/* Start and End Decorations */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
              <span className="text-white text-lg">🌱</span>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
              <span className="text-white text-lg">✨</span>
            </div>
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Timeline Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries({
              '🌱': 'Foundation',
              '📈': 'Growth', 
              '🏆': 'Achievement',
              '🚀': 'Expansion',
              '💡': 'Innovation',
              '👑': 'Legacy'
            }).map(([icon, label]) => (
              <div key={label} className="flex items-center space-x-2 text-gray-700">
                <span className="text-2xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
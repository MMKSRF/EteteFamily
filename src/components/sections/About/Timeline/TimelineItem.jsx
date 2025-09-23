// src/components/sections/About/Timeline/TimelineItem.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { familyMembers } from './timelineData';
import IconButton from '../../../ui/buttons/IconButton';

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ event, index, isEven }) => {
  const itemRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    // Timeline item entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(item,
      { opacity: 0, x: isEven ? 100 : -100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power2.out",
        delay: index * 0.2 
      }
    );

    // Continuous floating animation for the icon
    gsap.to(`.timeline-icon-${index}`, {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [index, isEven]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Animate content expansion
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isExpanded ? 'auto' : '100%',
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleImageHover = (isHovering) => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: isHovering ? 1.1 : 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={itemRef}
      className={`relative flex ${isEven ? 'justify-start' : 'justify-end'} mb-12 md:mb-20`}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500"></div>
      
      {/* Timeline Dot */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-gradient-to-r ${event.color} border-4 border-white shadow-2xl`}></div>

      {/* Content Card */}
      <div 
        className={`relative w-full md:w-96 ${isEven ? 'md:ml-8' : 'md:mr-8'} group`}
        style={{ marginTop: `${index * 10}px` }}
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20 transform transition-all duration-500 hover:shadow-3xl">
          {/* Gradient Header */}
          <div className={`bg-gradient-to-r ${event.color} p-6 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-4xl timeline-icon">{event.icon}</span>
              <span className="text-2xl font-bold bg-white/20 px-3 py-1 rounded-full">
                {event.year}
              </span>
            </div>
            <h3 className="text-xl font-bold">{event.title}</h3>
          </div>

          {/* Image */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => handleImageHover(true)}
            onMouseLeave={() => handleImageHover(false)}
          >
            <img
              ref={imageRef}
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover transition-transform duration-500"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="p-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {event.description}
            </p>

            {/* Location & Significance */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>⭐</span>
                <span>{event.significance}</span>
              </div>
            </div>

            {/* Family Members Involved */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-lg mr-2">👥</span>
                Family Members
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.members.map(memberId => {
                  const member = familyMembers[memberId];
                  return member ? (
                    <span 
                      key={memberId}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm text-gray-700 border"
                    >
                      {member.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Expandable Details */}
            {isExpanded && (
              <div className="mt-4 space-y-3 animate-fadeIn">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <span className="text-lg mr-2">🏆</span>
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {event.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Expand Button */}
            <div className="flex justify-center mt-4">
              <IconButton
                icon={isExpanded ? "▲" : "▼"}
                onClick={handleExpand}
                size="sm"
                className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
                tooltip={isExpanded ? "Show less" : "Show more"}
              />
            </div>
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${
          isEven ? 'right-full' : 'left-full'
        }`}>
          <div className={`w-0 h-0 border-t-8 border-b-8 border-transparent ${
            isEven 
              ? 'border-r-8 border-r-white' 
              : 'border-l-8 border-l-white'
          }`}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-2xl animate-bounce">✨</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
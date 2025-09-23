// src/components/sections/Map/LocationCard.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { familyData } from '../FamilyTree/familyData';
import IconButton from '../../ui/buttons/IconButton';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

const LocationCard = ({ location, onClose, onMemberSelect }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Card entrance animation
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { scale: 0.8, opacity: 0, rotation: -5 },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 0, 
        duration: 0.6, 
        ease: "back.out(1.5)" 
      }
    )
    .fromTo(imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Continuous subtle animation
    gsap.to(cardRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Animate content expansion
    gsap.to(cardRef.current, {
      height: isExpanded ? 'auto' : '100%',
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const getMemberInfo = (memberId) => {
    const allMembers = familyData.children.flatMap(gen => gen.members);
    return allMembers.find(member => member.id === memberId);
  };

  return (
    <div 
      ref={cardRef}
      className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden transform transition-all duration-500 hover:shadow-3xl"
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${location.color} p-6 relative overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-2xl">📍</div>
          <div className="absolute bottom-4 right-4 text-2xl">🌍</div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{location.name}</h3>
            <p className="text-white/90">{location.description}</p>
          </div>
          <IconButton
            icon="✕"
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30"
            tooltip="Close"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Image and Basic Info */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <img
              ref={imageRef}
              src={location.image}
              alt={location.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            {/* Type Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
              {location.type.replace('-', ' ')}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>Since {location.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{location.significance}</span>
              </div>
              <div className="flex items-center space-x-1 col-span-2">
                <span>📍</span>
                <span className="truncate">
                  {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Members */}
        {location.members && location.members.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-lg mr-2">👥</span>
              Family Members
            </h4>
            <div className="flex flex-wrap gap-2">
              {location.members.map(memberId => {
                const member = getMemberInfo(memberId);
                return member ? (
                  <button
                    key={memberId}
                    onClick={() => onMemberSelect(memberId)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-sm">{member.name}</span>
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Stories */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-lg mr-2">📖</span>
            Family Stories
          </h4>
          <div className="space-y-2">
            {location.stories.slice(0, isExpanded ? location.stories.length : 2).map((story, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>{story}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && location.stories.length > 2 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-fadeIn">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-lg mr-2">💫</span>
              More Memories
            </h4>
            <div className="space-y-2">
              {location.stories.slice(2).map((story, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{story}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200/50">
        <div className="flex space-x-4">
          <PrimaryButton
            icon="🗺️"
            onClick={() => {
              // Open in Google Maps
              const url = `https://www.google.com/maps?q=${location.coordinates[0]},${location.coordinates[1]}`;
              window.open(url, '_blank');
            }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            View on Map
          </PrimaryButton>
          <IconButton
            icon={isExpanded ? "▲" : "▼"}
            onClick={handleExpand}
            className="bg-gradient-to-r from-gray-400 to-gray-600"
            tooltip={isExpanded ? "Show less" : "Show more"}
          />
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="text-xl animate-bounce">✨</div>
      </div>
    </div>
  );
};

export default LocationCard;
// src/components/sections/FamilyTree/FamilyMemberCard.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import IconButton from '../../ui/buttons/IconButton';
import {getMemberById,familyData} from './familyData'

const FamilyMemberCard = ({ member, onClose, onSelect }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Card entrance animation
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { scale: 0.8, opacity: 0, rotation: -10 },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 0, 
        duration: 0.6, 
        ease: "back.out(1.5)" 
      }
    )
    .fromTo(imageRef.current,
      { scale: 1.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // Continuous subtle animations
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

  const handleFamilySelect = (memberId) => {
    if (onSelect) {
      // Add click animation
      gsap.to(cardRef.current, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => onSelect(memberId)
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative bg-white rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden transform transition-all duration-500 hover:shadow-3xl"
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${member.color} p-6 relative overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-2xl">❤️</div>
          <div className="absolute bottom-4 right-4 text-2xl">✨</div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{member.name}</h3>
            <p className="text-white/90">{member.role}</p>
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
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            {/* Generation Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Gen {member.parents.length > 0 ? 
                familyData.children.find(gen => 
                  gen.members.some(m => m.id === member.parents[0])
                )?.generation + 1 : 1}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-1">
                <span>🎂</span>
                <span>{new Date(member.birthDate).getFullYear()}</span>
              </div>
              {member.deathDate && (
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>Lived {new Date(member.deathDate).getFullYear() - new Date(member.birthDate).getFullYear()} years</span>
                </div>
              )}
              <div className="flex items-center space-x-1 col-span-2">
                <span>📍</span>
                <span className="truncate">{member.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 mb-4 leading-relaxed">{member.bio}</p>

        {/* Fun Facts */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <span className="text-lg mr-2">💫</span>
            Fun Fact
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            {member.funFact}
          </p>
        </div>

        {/* Family Connections */}
        <div className="space-y-3">
          {member.spouse && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-lg mr-2">💑</span>
                Spouse
              </h4>
              <button
                onClick={() => handleFamilySelect(member.spouse)}
                className="w-full text-left p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">{getMemberById(member.spouse)?.name}</span>
              </button>
            </div>
          )}

          {member.children && member.children.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-lg mr-2">👶</span>
                Children ({member.children.length})
              </h4>
              <div className="space-y-2">
                {member.children.map(childId => {
                  const child = getMemberById(childId);
                  return child ? (
                    <button
                      key={childId}
                      onClick={() => handleFamilySelect(childId)}
                      className="w-full text-left p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                    >
                      <img 
                        src={child.image} 
                        alt={child.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{child.name}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {member.parents && member.parents.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="text-lg mr-2">👴👵</span>
                Parents
              </h4>
              <div className="space-y-2">
                {member.parents.map(parentId => {
                  const parent = getMemberById(parentId);
                  return parent ? (
                    <button
                      key={parentId}
                      onClick={() => handleFamilySelect(parentId)}
                      className="w-full text-left p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                    >
                      <img 
                        src={parent.image} 
                        alt={parent.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{parent.name}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Expandable Memories */}
        {isExpanded && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-fadeIn">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-lg mr-2">📖</span>
              Favorite Memory
            </h4>
            <p className="text-sm text-gray-700 italic">"{member.favoriteMemory}"</p>
          </div>
        )}
      </div>

      {/* Expand Button */}
      <div className="absolute bottom-4 right-4">
        <IconButton
          icon={isExpanded ? "▲" : "▼"}
          onClick={handleExpand}
          size="sm"
          className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
          tooltip={isExpanded ? "Show less" : "Show more"}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="text-xl animate-bounce">✨</div>
      </div>
    </div>
  );
};

export default FamilyMemberCard;
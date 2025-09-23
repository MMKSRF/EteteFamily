// src/components/sections/Map/InteractiveMap.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {  getAllLocations } from './locationsData';
import LocationPin from './LocationPin';
import LocationCard from './LocationCard';
import IconButton from '../../ui/buttons/IconButton';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

const InteractiveMap = ({ onMemberSelect }) => {
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [mapStyle, setMapStyle] = useState('standard'); // standard, satellite, dark

  const locations = getAllLocations();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Map entrance animation
    gsap.fromTo(map,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "power2.out" 
      }
    );

    // Animated background elements
    createAnimatedBackground();

    return () => {
      // Cleanup animations
    };
  }, []);

  const createAnimatedBackground = () => {
    // Create animated map background elements
    const elements = ['🌍', '🗺️', '📍', '✨', '🌟'];
    elements.forEach((element, i) => {
      const el = document.createElement('div');
      el.className = 'absolute text-4xl opacity-10 pointer-events-none';
      el.innerHTML = element;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      mapRef.current.appendChild(el);

      gsap.to(el, {
        y: -30,
        x: Math.random() * 60 - 30,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 2
      });
    });
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleLocationHover = (location, isHovering) => {
    setHoveredLocation(isHovering ? location : null);
  };

  const handleCloseCard = () => {
    setSelectedLocation(null);
  };

  const getFilteredLocations = () => {
    if (activeFilter === 'all') return locations;
    return locations.filter(location => location.type === activeFilter);
  };

  const getMapBackground = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'bg-gradient-to-br from-blue-900 via-green-900 to-brown-900';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
      default:
        return 'bg-gradient-to-br from-blue-100 via-green-100 to-blue-200';
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-gray-700 mb-2">Map Style</span>
          {['standard', 'satellite', 'dark'].map(style => (
            <IconButton
              key={style}
              icon={style === 'standard' ? '🗺️' : style === 'satellite' ? '🛰️' : '🌙'}
              onClick={() => setMapStyle(style)}
              className={mapStyle === style ? 
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : 
                "bg-gray-100"
              }
              tooltip={`${style.charAt(0).toUpperCase() + style.slice(1)} View`}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-gray-700 mb-2">Filter Locations</span>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Locations
          </button>
          {[...new Set(locations.map(loc => loc.type))].map(type => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                activeFilter === type
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className={`relative w-full h-screen ${getMapBackground()} transition-all duration-500`}
      >
        {/* Animated Map Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🌎</div>
          <div className="absolute bottom-10 right-10 text-6xl">🗺️</div>
        </div>

        {/* Location Pins */}
        {getFilteredLocations().map((location, index) => (
          <div
            key={location.id}
            className="absolute"
            style={{
              left: `${50 + (location.coordinates[1] / 180) * 40}%`,
              top: `${50 - (location.coordinates[0] / 90) * 40}%`
            }}
          >
            <LocationPin
              location={location}
              isActive={selectedLocation?.id === location.id}
              onClick={handleLocationClick}
              onHover={handleLocationHover}
              delay={index * 0.1}
            />
          </div>
        ))}

        {/* Connection Lines */}
        {hoveredLocation && hoveredLocation.members && (
          <>
            {hoveredLocation.members.map((memberId) => {
              const memberLocations = locations.filter(loc => 
                loc.members && loc.members.includes(memberId)
              );
              
              return memberLocations.map((memberLoc, locIndex) => {
                if (memberLoc.id === hoveredLocation.id) return null;
                
                return (
                  <div
                    key={`${memberId}-${locIndex}`}
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: `${50 + (hoveredLocation.coordinates[1] / 180) * 40}%`,
                      top: `${50 - (hoveredLocation.coordinates[0] / 90) * 40}%`
                    }}
                  >
                    <div
                      className="absolute bg-gradient-to-r from-green-400 to-blue-500 h-1 rounded-full transform origin-left"
                      style={{
                        width: '100px',
                        transform: `rotate(${Math.atan2(
                          (50 - (memberLoc.coordinates[0] / 90) * 40) - (50 - (hoveredLocation.coordinates[0] / 90) * 40),
                          (50 + (memberLoc.coordinates[1] / 180) * 40) - (50 + (hoveredLocation.coordinates[1] / 180) * 40)
                        ) * 180 / Math.PI}deg)`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                );
              });
            })}
          </>
        )}

        {/* Location Card */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 z-30 max-w-md">
            <LocationCard
              location={selectedLocation}
              onClose={handleCloseCard}
              onMemberSelect={onMemberSelect}
            />
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
          <h4 className="font-semibold text-gray-700 mb-2">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span>Family Homes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
              <span>Current Residences</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-800"></div>
              <span>Business Locations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
              <span>Celebrations</span>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-20 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/20">
          <div className="flex flex-col space-y-2">
            <IconButton
              icon="➕"
              onClick={() => {
                gsap.to(mapRef.current, { scale: 1.2, duration: 0.5, ease: "power2.out" });
              }}
              tooltip="Zoom In"
              size="sm"
            />
            <IconButton
              icon="➖"
              onClick={() => {
                gsap.to(mapRef.current, { scale: 0.8, duration: 0.5, ease: "power2.out" });
              }}
              tooltip="Zoom Out"
              size="sm"
            />
            <IconButton
              icon="↻"
              onClick={() => {
                gsap.to(mapRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
              }}
              tooltip="Reset Zoom"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
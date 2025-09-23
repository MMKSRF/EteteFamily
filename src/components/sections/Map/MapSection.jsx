// src/components/sections/Map/MapSection.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { locationsData, getFamilyStats } from './locationsData';
import InteractiveMap from './InteractiveMap';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import InfoCard from '../../ui/cards/InfoCard';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const sectionRef = useRef(null);
  const statsRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1 });
  const featuresRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1, delay: 0.2 });

  const stats = getFamilyStats();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Floating background elements
    const floatingIcons = ['🌍', '🗺️', '📍', '✨', '🏠', '✈️'];
    floatingIcons.forEach((icon) => {
      const element = document.createElement('div');
      element.className = 'absolute text-4xl opacity-10 pointer-events-none';
      element.innerHTML = icon;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      section.appendChild(element);

      gsap.to(element, {
        y: -30,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  const handleMemberSelect = (memberId) => {
    setSelectedMember(memberId);
    // You could add navigation to family tree or member profile
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Family <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">World Map</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Explore {stats.totalLocations} family locations across {stats.countries} countries. 
              Discover where our family lives, works, and creates memories together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <PrimaryButton 
                icon="🗺️" 
                onClick={() => document.getElementById('interactive-map').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore the Map
              </PrimaryButton>
              <PrimaryButton 
                icon="📊" 
                variant="secondary"
                onClick={() => document.getElementById('map-stats').scrollIntoView({ behavior: 'smooth' })}
              >
                View Statistics
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Floating map icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['🌍', '🗺️', '📍', '🏠'].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-float"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Map Statistics */}
      <section id="map-stats" className="py-20">
        <div className="container mx-auto px-6">
          <div ref={statsRef} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Family Footprint
            </h2>
            <p className="text-xl text-gray-600">Our global presence by the numbers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <InfoCard
              title="Total Locations"
              description={stats.totalLocations.toString()}
              icon="📍"
              color="green"
            />
            <InfoCard
              title="Countries"
              description={stats.countries.toString()}
              icon="🌍"
              color="blue"
            />
            <InfoCard
              title="Generations"
              description={stats.generations.toString()}
              icon="👨‍👩‍👧‍👦"
              color="purple"
            />
            <InfoCard
              title="Years Span"
              description={`${stats.years}+ years`}
              icon="📅"
              color="orange"
            />
          </div>

          {/* Location Types */}
          <div ref={featuresRef}>
            <h3 className="text-2xl font-bold text-center mb-8">Types of Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🏠', name: 'Family Homes', count: locationsData.familyMembers.length, color: 'from-blue-500 to-cyan-500' },
                { icon: '💼', name: 'Business Locations', count: locationsData.significantLocations.filter(l => l.type === 'business').length, color: 'from-gray-600 to-gray-800' },
                { icon: '🏖️', name: 'Vacation Homes', count: locationsData.significantLocations.filter(l => l.type === 'vacation-home').length, color: 'from-cyan-500 to-blue-500' },
                { icon: '💒', name: 'Celebration Spots', count: locationsData.significantLocations.filter(l => l.type === 'celebration').length, color: 'from-pink-500 to-rose-500' },
                { icon: '⛪', name: 'Heritage Sites', count: locationsData.significantLocations.filter(l => l.type === 'heritage').length, color: 'from-purple-500 to-indigo-500' },
                { icon: '✈️', name: 'Travel Destinations', count: locationsData.travelDestinations.length, color: 'from-orange-500 to-red-500' }
              ].map((type) => (
                <div key={type.name} className="text-center">
                  <div className={`bg-gradient-to-r ${type.color} text-white text-4xl font-bold rounded-2xl p-6 mb-3`}>
                    {type.icon}
                  </div>
                  <p className="font-semibold text-gray-800">{type.name}</p>
                  <p className="text-gray-600">{type.count} locations</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section id="interactive-map" className="min-h-screen">
        <InteractiveMap onMemberSelect={handleMemberSelect} />
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Share Your Location</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Moved to a new city or have a special family location to add? 
            Help us keep our family map updated and complete.
          </p>
          <PrimaryButton icon="📍" size="lg" onClick={() => window.location.href = '/contact'}>
            Add a New Location
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
};

export default MapSection;
// src/components/sections/FamilyTree/FamilyTreeSection.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {  getMemberById, getFamilyStats, getFamilyGenerations } from './familyData';
import TreeVisualization from './TreeVisualization';
import TreeModal from './TreeModal';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import InfoCard from '../../ui/cards/InfoCard';
import { useScrollAnimation } from '../../animations/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

const FamilyTreeSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1 });
  const generationsRef = useScrollAnimation({ animation: 'fadeInUp', duration: 1, delay: 0.2 });

  const stats = getFamilyStats();
  const generations = getFamilyGenerations();

  useEffect(() => {
    if (selectedMember) {
      setIsModalOpen(true);
    }
  }, [selectedMember]);

  const handleMemberSelect = (memberId) => {
    setSelectedMember(getMemberById(memberId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300); // Wait for animation
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Etete <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Family Tree</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Explore {stats.totalMembers} family members across {stats.generations} generations. 
              Click on any member to discover their story and connections.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <PrimaryButton 
                icon="👆" 
                onClick={() => document.getElementById('tree-visualization').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Tree
              </PrimaryButton>
              <PrimaryButton 
                icon="📊" 
                variant="secondary"
                onClick={() => document.getElementById('family-stats').scrollIntoView({ behavior: 'smooth' })}
              >
                View Stats
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Floating family icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['👴', '👵', '👨', '👩', '👦', '👧'].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-float"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </section>

      {/* Family Statistics */}
      <section id="family-stats" className="py-20">
        <div className="container mx-auto px-6">
          <div ref={statsRef} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Family Statistics
            </h2>
            <p className="text-xl text-gray-600">By the numbers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <InfoCard
              title="Total Members"
              description={stats.totalMembers.toString()}
              icon="👥"
              color="purple"
            />
            <InfoCard
              title="Living Members"
              description={stats.livingMembers.toString()}
              icon="❤️"
              color="pink"
            />
            <InfoCard
              title="Countries"
              description={stats.countries.toString()}
              icon="🌎"
              color="blue"
            />
            <InfoCard
              title="Average Age"
              description={`${stats.averageAge} years`}
              icon="🎂"
              color="green"
            />
          </div>

          {/* Generations */}
          <div ref={generationsRef}>
            <h3 className="text-2xl font-bold text-center mb-8">Family Generations</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {generations.map(gen => (
                <div key={gen.generation} className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-4xl font-bold rounded-2xl p-6 mb-3">
                    Gen {gen.generation}
                  </div>
                  <p className="font-semibold text-gray-800">{gen.count} members</p>
                  <p className="text-gray-600 text-sm">{gen.years}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tree Visualization */}
      <section id="tree-visualization" className="min-h-screen">
        <TreeVisualization 
          onMemberSelect={handleMemberSelect}
          selectedMember={selectedMember?.id}
        />
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Help Grow Our Family Tree</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have information about missing family members or want to update details? 
            Help us keep our family tree accurate and complete.
          </p>
          <PrimaryButton icon="💌" size="lg" onClick={() => window.location.href = '/contact'}>
            Contribute to Family Tree
          </PrimaryButton>
        </div>
      </section>

      {/* Member Modal */}
      <TreeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        onMemberSelect={handleMemberSelect}
      />
    </div>
  );
};

export default FamilyTreeSection;
// src/components/sections/FamilyTree/TreeVisualization.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { familyData, getMemberById, getFamilyStats } from './familyData';
import IconButton from '../../ui/buttons/IconButton';

const TreeVisualization = ({ onMemberSelect, selectedMember }) => {
  const treeRef = useRef(null);
  const nodesRef = useRef(new Map());
  const connectionsRef = useRef(new Map());
  const [view, setView] = useState('tree'); // 'tree', 'grid', 'timeline'
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!treeRef.current) return;

    // Initial tree animation
    animateTreeEntrance();

    // Continuous animations
    animateFloatingElements();
    animateConnections();

    return () => {
      // Cleanup animations
      nodesRef.current.forEach(node => {
        gsap.killTweensOf(node);
      });
    };
  }, [view]);

  const animateTreeEntrance = () => {
    // const nodes = Array.from(nodesRef.current.values());
    const connections = Array.from(connectionsRef.current.values());

    // Stagger node animations based on generation
    familyData.children.forEach((generation, genIndex) => {
      generation.members.forEach((member, memberIndex) => {
        const node = nodesRef.current.get(member.id);
        if (node) {
          gsap.fromTo(node,
            { scale: 0, opacity: 0, rotation: -180 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              delay: (genIndex * 0.3) + (memberIndex * 0.1),
              ease: "elastic.out(1, 0.8)"
            }
          );
        }
      });
    });

    // Animate connections
    connections.forEach((connection, index) => {
      gsap.fromTo(connection,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          delay: 1 + (index * 0.1),
          ease: "power2.out"
        }
      );
    });
  };

  const animateFloatingElements = () => {
    // Floating background elements
    for (let i = 0; i < 12; i++) {
      const element = document.createElement('div');
      element.className = 'absolute text-2xl opacity-10 pointer-events-none';
      element.innerHTML = ['❤️', '✨', '🌟', '👨‍👩‍👧‍👦'][i % 4];
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      treeRef.current.appendChild(element);

      gsap.to(element, {
        y: -40,
        x: Math.random() * 60 - 30,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  };

  const animateConnections = () => {
    // Pulse animation for connections
    connectionsRef.current.forEach(connection => {
      gsap.to(connection, {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  };

  const handleNodeClick = (memberId) => {
    const node = nodesRef.current.get(memberId);
    if (node) {
      // Click animation
      gsap.to(node, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          onMemberSelect(memberId);
        }
      });
    }
  };

  const handleNodeHover = (memberId, isHovering) => {
    const node = nodesRef.current.get(memberId);
    if (node) {
      gsap.to(node, {
        scale: isHovering ? 1.1 : 1,
        y: isHovering ? -5 : 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Highlight connections
      const member = getMemberById(memberId);
      if (member) {
        // Highlight spouse connection
        if (member.spouse) {
          const spouseConnection = connectionsRef.current.get(`${member.id}-${member.spouse}`);
          if (spouseConnection) {
            gsap.to(spouseConnection, {
              stroke: isHovering ? '#ec4899' : '#6b7280',
              strokeWidth: isHovering ? 3 : 2,
              duration: 0.3
            });
          }
        }

        // Highlight parent-child connections
        if (member.children) {
          member.children.forEach(childId => {
            const childConnection = connectionsRef.current.get(`${member.id}-${childId}`);
            if (childConnection) {
              gsap.to(childConnection, {
                stroke: isHovering ? '#3b82f6' : '#6b7280',
                strokeWidth: isHovering ? 3 : 2,
                duration: 0.3
              });
            }
          });
        }
      }
    }
  };

  const renderTreeView = () => {
    const stats = getFamilyStats();
    
    return (
      <div className="relative w-full h-full min-h-screen overflow-auto bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Tree Header */}
        <div className="text-center py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <h2 className="text-4xl font-bold mb-2">Etete Family Tree</h2>
          <p className="text-xl opacity-90">{stats.totalMembers} members across {stats.generations} generations</p>
        </div>

        {/* Tree Visualization */}
        <div className="relative p-8" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
          {/* Generations */}
          {familyData.children.map((generation) => (
            <div key={generation.id} className="flex justify-center mb-16 relative">
              {/* Generation Label */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                  Generation {generation.generation}
                </div>
              </div>

              {/* Members in this generation */}
              <div className="flex flex-wrap justify-center gap-8">
                {generation.members.map((member) => (
                  <div key={member.id} className="relative">
                    {/* Member Node */}
                    <div
                      ref={el => nodesRef.current.set(member.id, el)}
                      onClick={() => handleNodeClick(member.id)}
                      onMouseEnter={() => handleNodeHover(member.id, true)}
                      onMouseLeave={() => handleNodeHover(member.id, false)}
                      className={`relative group cursor-pointer transform transition-all duration-300 ${
                        selectedMember === member.id ? 'scale-110 z-10' : ''
                      }`}
                    >
                      {/* Node Content */}
                      <div className={`relative bg-gradient-to-r ${member.color} rounded-2xl p-4 shadow-2xl border-4 border-white transform group-hover:scale-105 transition-transform duration-300`}>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white mx-auto mb-2"
                        />
                        <h3 className="text-white font-bold text-center text-sm truncate max-w-[120px]">
                          {member.name.split(' ')[0]}
                        </h3>
                        <p className="text-white/80 text-xs text-center truncate max-w-[120px]">
                          {member.role.split(' ')[0]}
                        </p>
                      </div>

                      {/* Connection point */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Spouse Connection */}
                    {member.spouse && (
                      <div
                        ref={el => connectionsRef.current.set(`${member.id}-${member.spouse}`, el)}
                        className="absolute top-1/2 left-full w-8 h-1 bg-gradient-to-r from-pink-400 to-pink-600 transform -translate-y-1/2"
                      ></div>
                    )}

                    {/* Parent-Child Connections */}
                    {member.children && member.children.length > 0 && (
                      <div className="absolute top-full left-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 transform -translate-x-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
          <div className="flex flex-col space-y-2">
            <IconButton
              icon="➕"
              onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
              tooltip="Zoom In"
              size="sm"
            />
            <IconButton
              icon="➖"
              onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
              tooltip="Zoom Out"
              size="sm"
            />
            <IconButton
              icon="↻"
              onClick={() => setZoom(1)}
              tooltip="Reset Zoom"
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {familyData.children.flatMap(gen => gen.members).map(member => (
        <div
          key={member.id}
          onClick={() => handleNodeClick(member.id)}
          className="bg-white rounded-2xl p-4 shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <img src={member.image} alt={member.name} className="w-full h-32 object-cover rounded-xl mb-3" />
          <h3 className="font-bold text-gray-800 text-center">{member.name}</h3>
          <p className="text-gray-600 text-sm text-center">{member.role}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={treeRef} className="relative">
      {/* View Controls */}
      <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 z-20">
        <div className="flex space-x-2">
          <IconButton
            icon="🌳"
            onClick={() => setView('tree')}
            tooltip="Tree View"
            variant={view === 'tree' ? 'primary' : 'secondary'}
          />
          <IconButton
            icon="📱"
            onClick={() => setView('grid')}
            tooltip="Grid View"
            variant={view === 'grid' ? 'primary' : 'secondary'}
          />
        </div>
      </div>

      {/* Render current view */}
      {view === 'tree' ? renderTreeView() : renderGridView()}
    </div>
  );
};

export default TreeVisualization;